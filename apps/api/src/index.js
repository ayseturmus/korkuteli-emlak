const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
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

app.use(cors())
app.use(express.json())

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
