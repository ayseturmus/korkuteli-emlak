import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const API_ROOT = 'https://korkuteli-emlak.onrender.com/api'
const API_LISTINGS = `${API_ROOT}/listings`
const API_ADMIN_LOGIN = `${API_ROOT}/admin/login`
const API_ADMIN_VERIFY = `${API_ROOT}/admin/verify`
const API_UPLOAD_IMAGE = `${API_ROOT}/uploads/image`
const ADMIN_TOKEN_KEY = 'korkuteli_admin_token'

const initialForm = {
  title: '',
  district: '',
  listingType: 'arsa',
  price: '',
  area: '',
  rooms: 'Satılık Arsa',
  description: '',
  image: '',
  sourceUrl: '',
  listingNo: '',
  listingDate: '',
  adaNo: '',
  parselNo: '',
  badge: '',
  mapAddress: '',
  mapLat: '',
  mapLng: '',
  tapuDurumu: 'Müstakil Tapulu',
  takas: 'Hayır',
  kimden: 'Emlak Ofisinden',
}

function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(ADMIN_TOKEN_KEY) || '')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [password, setPassword] = useState('')
  const [listings, setListings] = useState([])
  const [query, setQuery] = useState('')
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const loadListings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(API_LISTINGS)

      if (!response.ok) {
        throw new Error('İlanlar alınamadı.')
      }

      const data = await response.json()
      setListings(data)
      setError('')
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    const verifyToken = async () => {
      if (!token) {
        if (isMounted) {
          setIsAuthenticated(false)
          setIsAuthChecked(true)
          setIsLoading(false)
        }
        return
      }

      try {
        const response = await fetch(API_ADMIN_VERIFY, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) {
          throw new Error('Yetki doğrulaması başarısız.')
        }

        if (isMounted) {
          setIsAuthenticated(true)
        }
      } catch {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY)
        if (isMounted) {
          setToken('')
          setIsAuthenticated(false)
        }
      } finally {
        if (isMounted) {
          setIsAuthChecked(true)
        }
      }
    }

    verifyToken()

    return () => {
      isMounted = false
    }
  }, [token])

  useEffect(() => {
    if (!isAuthenticated) {
      setListings([])
      setIsLoading(false)
      return
    }

    loadListings()
  }, [isAuthenticated])

  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    setNotice('')
    setError('')

    if (!password.trim()) {
      setError('Şifre zorunludur.')
      return
    }

    try {
      setIsAuthenticating(true)
      const response = await fetch(API_ADMIN_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || 'Giriş başarısız.')
      }

      const body = await response.json()
      sessionStorage.setItem(ADMIN_TOKEN_KEY, body.token)
      setToken(body.token)
      setPassword('')
      setIsAuthenticated(true)
      setNotice('Admin oturumu açıldı.')
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsAuthenticating(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
    setToken('')
    setIsAuthenticated(false)
    setNotice('Oturum kapatıldı.')
    setError('')
    resetForm()
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) {
      return listings
    }

    return listings.filter((item) => {
      return [item.title, item.district, item.rooms, item.description, item.listingType]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    })
  }, [listings, query])

  const setField = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(initialForm)
    setEditingId('')
  }

  const startEdit = (item) => {
    setEditingId(item.id)
    setForm({
      title: item.title || '',
      district: item.district || '',
      listingType: item.listingType || 'arsa',
      price: String(item.price ?? ''),
      area: String(item.area ?? ''),
      rooms: item.rooms || 'Satılık Arsa',
      description: item.description || '',
      image: item.image || '',
      sourceUrl: item.sourceUrl || '',
      listingNo: item.listingNo || '',
      listingDate: item.listingDate || '',
      adaNo: item.adaNo || '',
      parselNo: item.parselNo || '',
      badge: item.badge || '',
      mapAddress: item.mapAddress || '',
      mapLat: item.mapLat == null ? '' : String(item.mapLat),
      mapLng: item.mapLng == null ? '' : String(item.mapLng),
      tapuDurumu: item.tapuDurumu || 'Müstakil Tapulu',
      takas: item.takas || 'Hayır',
      kimden: item.kimden || 'Emlak Ofisinden',
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toPayload = () => {
    const parseNullableNumber = (value) => {
      if (String(value || '').trim() === '') {
        return null
      }

      const numeric = Number(value)
      return Number.isFinite(numeric) ? numeric : null
    }

    return {
      ...form,
      price: Number(form.price || 0),
      area: Number(form.area || 0),
      mapLat: parseNullableNumber(form.mapLat),
      mapLng: parseNullableNumber(form.mapLng),
    }
  }

  const getImageSize = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      const timeoutId = window.setTimeout(() => {
        image.src = ''
        reject(new Error('Görsel doğrulaması zaman aşımına uğradı.'))
      }, 10000)

      image.onload = () => {
        window.clearTimeout(timeoutId)
        resolve({ width: image.naturalWidth, height: image.naturalHeight })
      }

      image.onerror = () => {
        window.clearTimeout(timeoutId)
        reject(new Error('Görsel URL yüklenemedi.'))
      }

      image.src = url
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setNotice('')
    setError('')

    if (!form.title.trim() || !form.district.trim()) {
      setError('Başlık ve konum zorunludur.')
      return
    }

    if (!form.image.trim()) {
      setError('Görsel zorunludur. Dosya yükleyin veya URL girin.')
      return
    }

    try {
      const { width, height } = await getImageSize(form.image.trim())
      const ratio = width / height
      const targetRatio = 16 / 9
      const tolerance = 0.015

      if (Math.abs(ratio - targetRatio) > tolerance) {
        setError(
          `Görsel oranı 16:9 olmalıdır. Girilen görsel: ${width}x${height}. Lütfen 1600x900 gibi bir görsel kullanın.`,
        )
        return
      }
    } catch (validationError) {
      setError(`Görsel doğrulanamadı: ${validationError.message}`)
      return
    }

    try {
      setIsSaving(true)
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `${API_LISTINGS}/${editingId}` : API_LISTINGS

      const response = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(toPayload()),
      })

      if (response.status === 401) {
        logout()
        throw new Error('Oturum süreniz doldu. Tekrar giriş yapın.')
      }

      if (!response.ok) {
        const responseBody = await response.json().catch(() => ({}))
        throw new Error(responseBody.message || 'Kayıt işlemi başarısız oldu.')
      }

      await loadListings()
      setNotice(editingId ? 'İlan güncellendi.' : 'Yeni ilan eklendi.')
      resetForm()
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setError('')
    setNotice('')

    if (!String(file.type || '').startsWith('image/')) {
      setError('Lütfen yalnızca görsel dosyası seçin.')
      event.target.value = ''
      return
    }

    try {
      setIsUploadingImage(true)
      const payload = new FormData()
      payload.append('image', file)

      const response = await fetch(API_UPLOAD_IMAGE, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      })

      if (response.status === 401) {
        logout()
        throw new Error('Oturum süreniz doldu. Tekrar giriş yapın.')
      }

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || 'Görsel yüklenemedi.')
      }

      const body = await response.json()
      setForm((prev) => ({ ...prev, image: body.url || '' }))
      setNotice('Görsel başarıyla yüklendi.')
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setIsUploadingImage(false)
      event.target.value = ''
    }
  }

  const handleDelete = async (id) => {
    const approved = window.confirm('Bu ilanı silmek istediğinizden emin misiniz?')
    if (!approved) {
      return
    }

    setNotice('')
    setError('')

    try {
      const response = await fetch(`${API_LISTINGS}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) {
        logout()
        throw new Error('Oturum süreniz doldu. Tekrar giriş yapın.')
      }

      if (!response.ok) {
        throw new Error('İlan silinemedi.')
      }

      setListings((prev) => prev.filter((item) => item.id !== id))
      if (editingId === id) {
        resetForm()
      }
      setNotice('İlan silindi.')
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  const formatPrice = (value) => new Intl.NumberFormat('tr-TR').format(value)

  if (!isAuthChecked) {
    return (
      <div className="simple-page admin-page">
        <section className="simple-hero">
          <p className="kicker">Admin</p>
          <h1>Yetki kontrolü yapılıyor...</h1>
        </section>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="simple-page admin-page">
        <header className="simple-header">
          <img
            className="brand-logo"
            src="/korkuteli-logo-original.png"
            alt="Korkuteli Emlak logosu"
          />
          <nav className="menu">
            <Link to="/">Ana Sayfa</Link>
            <Link to="/ilanlar">İlanlar</Link>
            <Link to="/hakkimizda">Hakkımızda</Link>
            <Link to="/iletisim">İletişim</Link>
          </nav>
        </header>

        <section className="admin-login-wrap">
          <article className="card-lite admin-login-card">
            <p className="kicker">Admin Girişi</p>
            <h1>Bu ekran şifre ile korunur.</h1>
            <p>Yönetim paneline erişmek için yönetici şifresini girin.</p>

            <form className="admin-form" onSubmit={handleLogin}>
              <label>
                Şifre
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Yönetici şifresi"
                  required
                />
              </label>

              <div className="admin-actions">
                <button className="action action-primary" disabled={isAuthenticating} type="submit">
                  {isAuthenticating ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </button>
              </div>
            </form>

            {notice && <p className="admin-notice">{notice}</p>}
            {error && <p className="state error admin-error">{error}</p>}
          </article>
        </section>
      </div>
    )
  }

  return (
    <div className="simple-page admin-page">
      <header className="simple-header">
        <img
          className="brand-logo"
          src="/korkuteli-logo-original.png"
          alt="Korkuteli Emlak logosu"
        />
        <nav className="menu">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/ilanlar">İlanlar</Link>
          <Link to="/hakkimizda">Hakkımızda</Link>
          <Link to="/iletisim">İletişim</Link>
        </nav>
      </header>

      <section className="simple-hero">
        <p className="kicker">Admin Paneli</p>
        <h1>İlan yönetimi tek ekranda.</h1>
        <p>Yeni ilan ekleyin, mevcut ilanları düzenleyin veya hızlıca silin.</p>
        <div className="admin-actions">
          <button className="action action-soft" type="button" onClick={logout}>
            Oturumu Kapat
          </button>
        </div>
      </section>

      <section className="admin-layout">
        <article className="card-lite admin-form-card">
          <h2>{editingId ? 'İlanı düzenle' : 'Yeni ilan ekle'}</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Başlık *
              <input name="title" value={form.title} onChange={setField} required />
            </label>

            <label>
              Konum *
              <input name="district" value={form.district} onChange={setField} required />
            </label>

            <div className="admin-form-grid">
              <label>
                Fiyat (TL)
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={setField}
                />
              </label>

              <label>
                Alan (m²)
                <input
                  name="area"
                  type="number"
                  min="0"
                  value={form.area}
                  onChange={setField}
                />
              </label>
            </div>

            <label>
              İlan türü *
              <select name="listingType" value={form.listingType} onChange={setField} required>
                <option value="arsa">Arsa</option>
                <option value="tarla">Tarla</option>
                <option value="bahce">Bahçe</option>
                <option value="isyeri">İş yeri</option>
                <option value="konut">Konut</option>
                <option value="diger">Diğer</option>
              </select>
            </label>

            <label>
              İlan niteliği
              <input name="rooms" value={form.rooms} onChange={setField} placeholder="Örn: Satılık Arsa" />
            </label>

            <label>
              Açıklama
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={setField}
              />
            </label>

            <label>
              Badge metni
              <input
                name="badge"
                value={form.badge}
                onChange={setField}
                placeholder="Kaçırılmayacak Fırsat"
              />
            </label>

            <label>
              Görsel Yükle
              <div className="admin-upload-row">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                />
                <span>{isUploadingImage ? 'Yükleniyor...' : 'Telefon veya bilgisayardan dosya seçin.'}</span>
              </div>
              <small>JPG, PNG, WEBP desteklenir. Yükleme sonrası görsel URL otomatik doldurulur.</small>
            </label>

            <label>
              Görsel URL
              <input
                name="image"
                value={form.image}
                onChange={setField}
                placeholder="Dosya yükleyin veya manuel URL girin"
                required
              />
              <small>16:9 zorunlu (ör. 1600x900). Bu sayede tüm ilan görselleri eşit ve boşluksuz görünür.</small>
            </label>

            <div className="admin-form-grid">
              <label>
                Kaynak URL
                <input name="sourceUrl" value={form.sourceUrl} onChange={setField} />
              </label>

              <label>
                İlan No
                <input name="listingNo" value={form.listingNo} onChange={setField} />
              </label>
            </div>

            <div className="admin-form-grid">
              <label>
                İlan Tarihi
                <input
                  name="listingDate"
                  type="date"
                  value={form.listingDate}
                  onChange={setField}
                />
              </label>

              <label>
                Kimden
                <input name="kimden" value={form.kimden} onChange={setField} />
              </label>
            </div>

            <div className="admin-form-grid">
              <label>
                Ada No
                <input name="adaNo" value={form.adaNo} onChange={setField} />
              </label>

              <label>
                Parsel No
                <input name="parselNo" value={form.parselNo} onChange={setField} />
              </label>
            </div>

            <label>
              Harita adresi / konum notu
              <input
                name="mapAddress"
                value={form.mapAddress}
                onChange={setField}
                placeholder="Örn: Bozova Mahallesi, Korkuteli"
              />
            </label>

            <div className="admin-form-grid">
              <label>
                Enlem (opsiyonel)
                <input
                  name="mapLat"
                  type="number"
                  step="any"
                  value={form.mapLat}
                  onChange={setField}
                  placeholder="36.89"
                />
              </label>

              <label>
                Boylam (opsiyonel)
                <input
                  name="mapLng"
                  type="number"
                  step="any"
                  value={form.mapLng}
                  onChange={setField}
                  placeholder="30.47"
                />
              </label>
            </div>

            <div className="admin-form-grid">
              <label>
                Tapu Durumu
                <input name="tapuDurumu" value={form.tapuDurumu} onChange={setField} />
              </label>

              <label>
                Takas
                <input name="takas" value={form.takas} onChange={setField} />
              </label>
            </div>

            <div className="admin-actions">
              <button className="action action-primary" disabled={isSaving} type="submit">
                {isSaving ? 'Kaydediliyor...' : editingId ? 'Güncelle' : 'İlan Ekle'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="action action-soft"
                  onClick={resetForm}
                  disabled={isSaving}
                >
                  Düzenlemeyi iptal et
                </button>
              )}
            </div>
          </form>

          {notice && <p className="admin-notice">{notice}</p>}
          {error && <p className="state error admin-error">{error}</p>}
        </article>

        <article className="card-lite admin-list-card">
          <div className="admin-list-head">
            <h2>İlanlar</h2>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="İlan ara"
              aria-label="İlan ara"
            />
          </div>

          {isLoading && <p className="state">İlanlar yükleniyor...</p>}

          {!isLoading && (
            <ul className="admin-list">
              {filtered.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.district}</span>
                    <span>{formatPrice(item.price)} TL</span>
                  </div>
                  <div className="admin-row-actions">
                    <button type="button" className="action action-map" onClick={() => startEdit(item)}>
                      Düzenle
                    </button>
                    <button
                      type="button"
                      className="action action-phone"
                      onClick={() => handleDelete(item.id)}
                    >
                      Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </div>
  )
}

export default AdminPage
