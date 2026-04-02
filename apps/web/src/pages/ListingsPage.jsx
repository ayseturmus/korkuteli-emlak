import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const LISTING_TYPE_OPTIONS = [
  { value: 'all', label: 'Tümü' },
  { value: 'arsa', label: 'Arsa' },
  { value: 'tarla', label: 'Tarla' },
  { value: 'bahce', label: 'Bahçe' },
  { value: 'isyeri', label: 'İş yeri' },
  { value: 'konut', label: 'Konut' },
  { value: 'diger', label: 'Diğer' },
]

const listingTypeLabel = (type) => {
  const matched = LISTING_TYPE_OPTIONS.find((item) => item.value === type)
  return matched ? matched.label : 'Diğer'
}

function ListingsPage() {
  const [listings, setListings] = useState([])
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/listings')
        if (!response.ok) {
          throw new Error('İlanlar yüklenemedi.')
        }

        const data = await response.json()
        if (isMounted) {
          setListings(data)
          setError('')
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchListings()

    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const source =
      typeFilter === 'all' ? listings : listings.filter((item) => (item.listingType || 'diger') === typeFilter)

    if (!normalized) {
      return source
    }

    return source.filter((item) => {
      return [item.title, item.district, item.rooms, item.description, item.listingType]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    })
  }, [listings, query, typeFilter])

  const formatPrice = (value) => new Intl.NumberFormat('tr-TR').format(value)

  return (
    <div className="simple-page">
      <header className="simple-header">
        <img
          className="brand-logo"
          src="/korkuteli-logo-original.png"
          alt="Korkuteli Emlak logosu"
        />
        <nav className="menu">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/ilanlar">İlanlarım</Link>
          <Link to="/hakkimizda">Hakkımızda</Link>
          <Link to="/iletisim">İletişim</Link>
        </nav>
      </header>

      <section className="simple-hero">
        <p className="kicker">İlanlarım</p>
        <h1>Tüm ilanlarımıza buradan ulaşabilirsiniz.</h1>
        <p>Filtreleyin, karşılaştırın ve detay sayfasına geçin.</p>

        <div className="search-wrap">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="İlan ara: bölge, tip, açıklama"
            aria-label="İlan ara"
          />
        </div>

        <div className="listing-filters" role="group" aria-label="İlan türüne göre filtrele">
          {LISTING_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`listing-filter-chip ${typeFilter === option.value ? 'is-active' : ''}`}
              onClick={() => setTypeFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {isLoading && <p className="state">İlanlar yükleniyor...</p>}
      {error && !isLoading && <p className="state error">{error}</p>}

      {!isLoading && !error && (
        <>
          <p className="results-info page-results">{filtered.length} ilan listeleniyor.</p>
          <section className="grid listings-grid-page">
            {filtered.map((item) => (
              <article className="card" key={item.id}>
                <Link className="card-link" to={`/ilan/${item.id}`}>
                  <span className="tag">{item.rooms?.includes('Kiralık') ? 'Kiralık' : 'Satılık'}</span>
                  <span className="tag tag-type">{listingTypeLabel(item.listingType || 'diger')}</span>
                  {item.badge ? <span className="tag tag-badge">{item.badge}</span> : null}
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="card-body">
                    <p className="district">{item.district}</p>
                    <h2>{item.title}</h2>
                    <p className="description">{item.description}</p>

                    <div className="meta">
                      <span>{item.rooms}</span>
                      <span>{item.area} m²</span>
                    </div>

                    <p className="price">{formatPrice(item.price)} TL</p>
                    <span className="cta">Detay sayfasına git</span>
                  </div>
                </Link>
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  )
}

export default ListingsPage
