import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const TAPU_SORGU_URL = 'https://parselsorgu.tkgm.gov.tr/'
const WHATSAPP_PHONE = '905315936649'

function ListingDetailPage() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/listings/${id}`)

        if (!response.ok) {
          throw new Error('İlan detayı bulunamadı.')
        }

        const data = await response.json()

        if (isMounted) {
          setListing(data)
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

    fetchListing()

    return () => {
      isMounted = false
    }
  }, [id])

  const formatPrice = (value) => new Intl.NumberFormat('tr-TR').format(value)

  if (isLoading) {
    return <p className="state">İlan detayı yükleniyor...</p>
  }

  if (error || !listing) {
    return (
      <div className="detail-shell">
        <p className="state error">{error || 'İlan bulunamadı'}</p>
        <Link className="detail-back" to="/">
          Ana sayfaya dön
        </Link>
      </div>
    )
  }

  const whatsappText = encodeURIComponent(
    `Merhaba, ${listing.title} (İlan No: ${listing.listingNo || listing.id}) hakkında bilgi alabilir miyim?`,
  )

  const hasParcelData =
    listing.adaNo &&
    listing.adaNo !== '-' &&
    listing.parselNo &&
    listing.parselNo !== '-'

  const mapQuerySource = [
    listing.mapAddress,
    hasParcelData ? `Ada ${listing.adaNo} Parsel ${listing.parselNo}` : '',
    listing.district,
  ]
    .filter(Boolean)
    .join(', ')

  const mapQuery = encodeURIComponent(mapQuerySource || 'Korkuteli Antalya')
  const hasMapData = Boolean(listing.mapAddress || listing.mapLat != null || listing.mapLng != null || hasParcelData)
  const mapEmbedSrc =
    listing.mapLat != null && listing.mapLng != null
      ? `https://www.google.com/maps?q=${listing.mapLat},${listing.mapLng}&z=15&output=embed`
      : `https://www.google.com/maps?q=${mapQuery}&output=embed`

  const highlights = (listing.description || '')
    .split('.')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5)

  const infoCards = [
    { label: 'Ada No', value: listing.adaNo || '-' },
    { label: 'Parsel No', value: listing.parselNo || '-' },
    { label: 'Nitelik', value: listing.rooms || '-' },
    { label: 'Tapu', value: listing.tapuDurumu || 'Müstakil Tapulu' },
    { label: 'Takas', value: listing.takas || '-' },
    { label: 'Kimden', value: listing.kimden || 'Korkuteli Emlak' },
  ]

  return (
    <div className="detail-shell">
      <header className="detail-top">
        <img
          className="brand-logo"
          src="/korkuteli-logo-original.png"
          alt="Korkuteli Emlak logosu"
        />
        <Link className="detail-back" to="/">
          Ana sayfaya dön
        </Link>
      </header>

      <article className="detail-card">
        <div className="detail-media">
          <img src={listing.image} alt={listing.title} />
        </div>

        <div className="detail-body">
          <p className="district">{listing.district}</p>
          {listing.badge ? <span className="listing-badge-detail">{listing.badge}</span> : null}
          <h1>{listing.title}</h1>
          <p className="detail-price">{formatPrice(listing.price)} TL</p>

          <ul className="detail-highlights">
            {highlights.length > 0 ? (
              highlights.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>Detaylı bilgi için iletişime geçebilirsiniz.</li>
            )}
          </ul>

          <div className="detail-grid">
            <div>
              <span className="detail-label">İlan No</span>
              <strong>{listing.listingNo || listing.id}</strong>
            </div>
            <div>
              <span className="detail-label">İlan Tarihi</span>
              <strong>{listing.listingDate || '-'}</strong>
            </div>
            <div>
              <span className="detail-label">Emlak Tipi</span>
              <strong>{listing.rooms}</strong>
            </div>
            <div>
              <span className="detail-label">m²</span>
              <strong>{listing.area}</strong>
            </div>
            <div>
              <span className="detail-label">m² Fiyatı</span>
              <strong>{listing.m2Price ? `${formatPrice(listing.m2Price)} TL` : '-'}</strong>
            </div>
          </div>

          <div className="detail-info-cards">
            {infoCards.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>

          <p className="detail-description">{listing.description}</p>

          {hasMapData ? (
            <section className="detail-map-section">
              <h2>Konum Haritası</h2>
              <p>
                {listing.mapAddress
                  ? listing.mapAddress
                  : hasParcelData
                    ? `Ada ${listing.adaNo} / Parsel ${listing.parselNo}`
                    : listing.district}
              </p>
              <div className="detail-map-frame-wrap">
                <iframe
                  title={`${listing.title} harita konumu`}
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </section>
          ) : null}

          <div className="detail-actions">
            <a className="action action-primary" href={listing.sourceUrl} target="_blank" rel="noreferrer">
              Sahibinden'de incele
            </a>
            <a
              className="action action-phone"
              href="tel:+905315936649"
            >
              Ara
            </a>
            <a
              className="action action-whatsapp"
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <a className="action action-soft" href={TAPU_SORGU_URL} target="_blank" rel="noreferrer">
              Parsel konumunu sorgula (TKGM)
            </a>
            <a
              className="action action-map"
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
            >
              Konumu haritada aç
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ListingDetailPage
