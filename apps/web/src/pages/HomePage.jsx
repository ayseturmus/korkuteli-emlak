import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroBrand from '../assets/hero-brand.png'
import backgroundImage from '../assets/Adsız tasarım (10).png'

const listingTypeLabel = (type) => {
  switch (type) {
    case 'arsa':
      return 'Arsa'
    case 'tarla':
      return 'Tarla'
    case 'bahce':
      return 'Bahçe'
    case 'isyeri':
      return 'İş yeri'
    case 'konut':
      return 'Konut'
    default:
      return 'Diğer'
  }
}

const stats = [
  { label: 'Yıllık deneyim', value: '12+' },
  { label: 'Satılan portföy', value: '420+' },
  { label: 'Mutlu müşteri', value: '510+' },
]

const services = [
  {
    title: 'Dogru Fiyat Analizi',
    text: 'Bölge emsallerini anlık takip edip gayrimenkulünüz için rekabetçi ve gerçekçi fiyatlama yapıyoruz.',
  },
  {
    title: 'Uçtan Uca Süreç',
    text: 'İlan hazırlığı, tanıtım, müşteri görüşmeleri ve tapu sürecini tek noktadan yönetiyoruz.',
  },
  {
    title: 'Güvenli Yatırım Danışmanlığı',
    text: 'Yatırım amacınıza göre kira getirisi ve değer artış potansiyeli yüksek seçenekleri filtreliyoruz.',
  },
]

const testimonials = [
  {
    name: 'Sibel K.',
    role: 'Arsa Satıcısı',
    text: 'Arsamız için doğru fiyatı birlikte belirledik. Kısa sürede ciddi alıcılarla görüşüp satışı tamamladık.',
  },
  {
    name: 'Hakan T.',
    role: 'Tarla Yatırımcısı',
    text: 'Bölge analizleri netti. Sulama ve yol avantajı yüksek bir tarla için güvenle yatırım yaptım.',
  },
  {
    name: 'Merve A.',
    role: 'Arsa Alıcısı',
    text: 'Yelten tarafında aradığımız arsayı kısa sürede bulduk. Tapu aşamasında çok net destek oldular.',
  },
  {
    name: 'Mustafa B.',
    role: 'Bahçe Satıcısı',
    text: 'Bahçemiz için hazırlanan ilan sunumu çok etkiliydi. Gereksiz zaman kaybı olmadan satış sonuçlandı.',
  },
  {
    name: 'Elif Y.',
    role: 'Arsa Yatırımcısı',
    text: 'Bütçeme uygun arsa seçeneklerini net şekilde filtrelediler. İletişimleri samimi ve çok düzenliydi.',
  },
  {
    name: 'Ahmet D.',
    role: 'Tarla Satıcısı',
    text: 'Tarlamızın değerini doğru belirledik. Süreç boyunca her adımı önceden bilerek rahat ilerledik.',
  },
  {
    name: 'Zeynep C.',
    role: 'Bahçe Alıcısı',
    text: 'Telefonla her soruma hızlı dönüş aldım. Özellikle resmi evrak kısmında çok rahat ettik.',
  },
  {
    name: 'Ömer U.',
    role: 'Portföy Sahibi',
    text: 'Bölgeyi iyi bildikleri için arsa portföyüm doğru müşteriyle hızlı eşleşti. Sonuçtan çok memnunum.',
  },
  {
    name: 'Fatma G.',
    role: 'Tarla Alıcısı',
    text: 'Üretime uygun, yolu açık bir tarla arıyorduk. Kısa sürede tam istediğimiz yeri bulduk.',
  },
  {
    name: 'İsmail R.',
    role: 'Arsa Satıcısı',
    text: 'Arsamızın tanıtımı profesyonel yapıldı. Ciddi alıcılarla hızlıca görüşüp güvenle devir yaptık.',
  },
  {
    name: 'Burcu N.',
    role: 'Bahçe Yatırımcısı',
    text: 'Bahçe yatırımı için lokasyon seçimi çok doğru yapıldı. Hem fiyat hem potansiyel açısından memnun kaldım.',
  },
  {
    name: 'Yusuf E.',
    role: 'Tarla Satıcısı',
    text: 'Tapu ve resmi işlemler boyunca yanımızda oldular. Tarlamız beklediğimiz süreden daha hızlı satıldı.',
  },
]

function HomePage() {
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const sliderRef = useRef(null)
  const testimonialItems = [...testimonials, ...testimonials]

  useEffect(() => {
    let isMounted = true

    const fetchListings = async () => {
      try {
        const response = await fetch('https://korkuteli-emlak.onrender.com/api/listings')
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

  const formatPrice = (value) => {
    return new Intl.NumberFormat('tr-TR').format(value)
  }

  const slideBy = (direction) => {
    if (!sliderRef.current) {
      return
    }

    const amount = Math.max(sliderRef.current.clientWidth * 0.82, 260)
    sliderRef.current.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <img
          className="brand-logo"
          src="/korkuteli-logo-original.png"
          alt="Korkuteli Emlak logosu"
        />
        <nav className="menu">
          <Link to="/ilanlar">İlanlar</Link>
          <Link to="/hakkimizda">Hakkımızda</Link>
          <Link to="/iletisim">İletişim</Link>
        </nav>
      </header>

      <section className="hero">
        <img
          className="hero-bg-image"
          src={backgroundImage}
          alt="Korkuteli Emlak tanıtım görseli"
        />
      </section>

      <section className="intro-panel">
        <h1>Korkuteli'nde hayalindeki evi daha hızlı bul.</h1>
        <p className="subtitle">
          Veri odaklı fiyatlama ve yerel pazar bilgisi ile satın alma veya satma
          sürecini daha güvenli hale getiriyoruz.
        </p>
      </section>

      <div className="hero-badge-row">
        <p className="badge">Yerel uzmanlık, güçlü portföy</p>
      </div>

      <section className="stats" aria-label="Başarı metrikleri">
        {stats.map((item) => (
          <article key={item.label}>
            <p className="value">{item.value}</p>
            <p className="label">{item.label}</p>
          </article>
        ))}
      </section>

      <main>
        {isLoading && <p className="state">İlanlar yükleniyor...</p>}
        {error && !isLoading && <p className="state error">{error}</p>}

        {!isLoading && !error && (
          <>
            <section className="section-head" id="ilanlar">
              <p className="kicker">Öne Çıkan İlanlar</p>
              <h2>Seçili satılık ilanlar</h2>
            </section>

            <p className="results-info">{listings.length} ilan listeleniyor.</p>

            <div className="slider-controls">
              <button type="button" onClick={() => slideBy(-1)}>
                Sola kaydır
              </button>
              <Link className="all-listings-link" to="/ilanlar">
                Tüm ilanları listele
              </Link>
              <button type="button" onClick={() => slideBy(1)}>
                Sağa kaydır
              </button>
            </div>

            <section className="listing-slider" ref={sliderRef}>
              {listings.map((item) => (
                <article className="card slider-card" key={item.id}>
                  <Link className="card-link" to={`/ilan/${item.id}`}>
                    <span className="tag">{item.rooms?.includes('Kiralık') ? 'Kiralık' : 'Satılık'}</span>
                    <span className="tag tag-type">{listingTypeLabel(item.listingType)}</span>
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

            <section className="services" id="hizmetler">
              <div className="section-head">
                <p className="kicker">Neden Biz</p>
                <h2>Emlak sürecini kolaylaştıran hizmetler</h2>
              </div>

              <div className="service-grid">
                {services.map((item) => (
                  <article key={item.title} className="service-card">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="testimonials" id="yorumlar">
              <div className="section-head">
                <p className="kicker">Müşteri Yorumları</p>
                <h2>Bizimle çalışanlar ne diyor?</h2>
              </div>

              <div className="testimonials-slider" aria-label="Otomatik kayan müşteri yorumları">
                <div className="testimonial-track">
                  {testimonialItems.map((item, index) => (
                    <article key={`${item.name}-${index}`} className="quote-card">
                    <p>{item.text}</p>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

    </div>
  )
}

export default HomePage
