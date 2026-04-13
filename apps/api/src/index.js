const path = require('path')
const fs = require('fs')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const multer = require('multer')
const {
  listListings,
  findListingById,
  createListing,
  updateListing,
  deleteListing,
} = require('./listings')

const app = express()
const port = Number(process.env.PORT) || 4000
const adminPassword = String(process.env.ADMIN_PASSWORD || 'korkuteli-admin-2026')
const adminSessionTtlMs = Number(process.env.ADMIN_SESSION_TTL_MS) || 1000 * 60 * 60 * 8
const adminSessions = new Map()
const uploadDir = path.resolve(__dirname, '../uploads')
const maxUploadSizeMb = Number(process.env.MAX_UPLOAD_SIZE_MB) || 5
const maxUploadSizeBytes = maxUploadSizeMb * 1024 * 1024
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

fs.mkdirSync(uploadDir, { recursive: true })

const uploadStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir)
  },
  filename: (_req, file, cb) => {
    const extFromMime = file.mimetype === 'image/png' ? '.png' : file.mimetype === 'image/webp' ? '.webp' : '.jpg'
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extFromMime}`
    cb(null, uniqueName)
  },
})

const uploadImage = multer({
  storage: uploadStorage,
  limits: { fileSize: maxUploadSizeBytes },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(String(file.mimetype || '').toLowerCase())) {
      cb(new Error('Sadece JPG, PNG veya WEBP görseller yüklenebilir.'))
      return
    }

    cb(null, true)
  },
})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(uploadDir))

const createAdminSession = () => {
  const token = crypto.randomBytes(32).toString('hex')
  adminSessions.set(token, Date.now() + adminSessionTtlMs)
  return token
}

const readBearerToken = (req) => {
  const header = String(req.headers.authorization || '')
  if (!header.startsWith('Bearer ')) {
    return ''
  }

  return header.slice(7).trim()
}

const hasValidSession = (token) => {
  const expiresAt = adminSessions.get(token)

  if (!expiresAt) {
    return false
  }

  if (expiresAt <= Date.now()) {
    adminSessions.delete(token)
    return false
  }

  return true
}

const requireAdminAuth = (req, res, next) => {
  const token = readBearerToken(req)

  if (!token || !hasValidSession(token)) {
    return res.status(401).json({ message: 'Admin yetkisi gerekiyor.' })
  }

  return next()
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'korkuteli-emlak-api' })
})

app.get('/api/listings', (req, res) => {
  const { q = '' } = req.query
  const query = String(q).trim().toLowerCase()
  const listings = listListings()

  if (!query) {
    return res.json(listings)
  }

  const filtered = listings.filter((item) => {
    return [item.title, item.district, item.rooms, item.description]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })

  return res.json(filtered)
})

app.get('/api/listings/:id', (req, res) => {
  const item = findListingById(req.params.id)

  if (!item) {
    return res.status(404).json({ message: 'Ilan bulunamadi' })
  }

  return res.json(item)
})

app.post('/api/admin/login', (req, res) => {
  const password = String(req.body?.password || '')

  if (!password) {
    return res.status(400).json({ message: 'Sifre zorunludur.' })
  }

  if (password !== adminPassword) {
    return res.status(401).json({ message: 'Sifre hatali.' })
  }

  const token = createAdminSession()
  return res.json({ token, expiresInMs: adminSessionTtlMs })
})

app.get('/api/admin/verify', requireAdminAuth, (_req, res) => {
  return res.json({ ok: true })
})

app.post('/api/uploads/image', requireAdminAuth, (req, res) => {
  uploadImage.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: `Gorsel boyutu en fazla ${maxUploadSizeMb} MB olabilir.` })
    }

    if (err) {
      return res.status(400).json({ message: err.message || 'Gorsel yuklenemedi.' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Gorsel dosyasi zorunludur.' })
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`
    const url = `${baseUrl}/uploads/${req.file.filename}`

    return res.status(201).json({
      url,
      filename: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
    })
  })
})

app.post('/api/listings', requireAdminAuth, (req, res) => {
  const payload = req.body || {}

  if (!payload.title || !payload.district) {
    return res.status(400).json({ message: 'Baslik ve konum alanlari zorunludur.' })
  }

  const created = createListing(payload)
  return res.status(201).json(created)
})

app.put('/api/listings/:id', requireAdminAuth, (req, res) => {
  const updated = updateListing(req.params.id, req.body || {})

  if (!updated) {
    return res.status(404).json({ message: 'Guncellenecek ilan bulunamadi.' })
  }

  return res.json(updated)
})

app.delete('/api/listings/:id', requireAdminAuth, (req, res) => {
  const isDeleted = deleteListing(req.params.id)

  if (!isDeleted) {
    return res.status(404).json({ message: 'Silinecek ilan bulunamadi.' })
  }

  return res.status(204).send()
})

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})
