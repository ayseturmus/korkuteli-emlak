import { Link } from 'react-router-dom'

const BRANCH_IMAGES = {
  korkuteliOne:
    'https://korkuteliemlak.com.tr/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-26-at-15.37.23.jpeg',
  korkuteliTwo:
    'https://korkuteliemlak.com.tr/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-29-at-21.38.38.jpeg',
  yelten:
    'https://korkuteliemlak.com.tr/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-29-at-22.14.38-e1759329777423-1024x734.jpeg',
  tabela:
    'https://korkuteliemlak.com.tr/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-25-at-22.32.55-1024x576.jpeg',
}

const locations = ['Korkuteli', 'Yelten', 'Antalya', 'Bozova']

const aboutCards = [
  {
    title: 'Korkuteli Merkez Şubemiz',
    image: BRANCH_IMAGES.korkuteliOne,
    alt: 'Korkuteli şubemizden dış cephe görünümü',
    text: 'Korkuteli merkezdeki ofisimizde alım, satım ve tapu sürecini baştan sona net bir şekilde yönetiyoruz.',
  },
  {
    title: 'Bozova Şubemizden Görünüm',
    image: BRANCH_IMAGES.korkuteliTwo,
    alt: 'Bozova şubemizden görünüm',
    text: 'Müşterilerimizi Bozova şubemizde düzenli ve planlı bir şekilde ağırlıyor, süreci anlaşılır bir dille anlatıyoruz.',
  },
  {
    title: 'Yelten Şubemiz',
    image: BRANCH_IMAGES.yelten,
    alt: 'Yelten şubemiz',
    text: 'Yelten ve çevresindeki arsa, tarla ve yatırım fırsatlarında yerinde destek veriyor, doğru portföy eşleştirmesi yapıyoruz.',
  },
  {
    title: 'Kurumsal Ofis Görselimiz',
    image: BRANCH_IMAGES.tabela,
    alt: 'Korkuteli Emlak tabela görseli',
    text: 'Patentli marka kimliğimizle hizmet veriyoruz. Tabelamız, resmi ve güvenilir çalışma anlayışımızın bir göstergesidir.',
  },
]

function AboutPage() {
  return (
    <div className="simple-page about-page">
      <header className="simple-header">
        <img
          className="brand-logo"
          src="/korkuteli-logo-original.png"
          alt="Korkuteli Emlak logosu"
        />
        <nav className="menu">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/hakkimizda">Hakkımızda</Link>
          <Link to="/iletisim">İletişim</Link>
        </nav>
      </header>

      <section className="simple-hero">
        <p className="kicker about-kicker">Hakkımızda</p>
        <h1 className="about-title">
          Patentli, yerel ve <span>güvenilir</span> emlak hizmeti
        </h1>
        <p className="about-lead">
          Karmaşık dil yok, gizli süreç yok. Alım ve satımda her adımı açık şekilde
          anlatıyor, güvenli sonuç odaklı çalışıyoruz.
        </p>
        <div className="about-branch-badges" aria-label="Hizmet verdiğimiz bölgeler">
          {locations.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="about-proof-points" aria-label="Güven unsurları">
          <span>Patentli Marka</span>
          <span>Net Süreç</span>
          <span>Yerel Uzmanlık</span>
        </div>

        <div className="about-quick-links" aria-label="Hızlı bağlantılar">
          <a
            className="action action-whatsapp"
            href="https://wa.me/905315936649"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="action action-map"
            href="https://korkuteliemlak.sahibinden.com/"
            target="_blank"
            rel="noreferrer"
          >
            Sahibinden
          </a>
          <a
            className="action action-primary"
            href="https://www.emlakjet.com/"
            target="_blank"
            rel="noreferrer"
          >
            Emlakjet
          </a>
          <a className="action action-phone" href="tel:+905315936649">
            Hemen Ara
          </a>
        </div>
      </section>

      <section className="about-layout clean-about-layout">
        <article className="card-lite about-summary">
          <h2>Kısaca neden biz?</h2>
          <p>
            Doğru fiyatlama, net bilgilendirme ve hızlı geri dönüş ile süreci
            yormadan yönetiyoruz.
          </p>
        </article>

        <article className="card-lite about-patent-note">
          <h2>Patentli marka güvencesi</h2>
          <p>
            Korkuteli Emlak patentli bir markadır. Resmi ve güvenilir hizmet
            anlayışıyla hareket ediyoruz.
          </p>
        </article>
      </section>

      <section className="about-slider-section" aria-label="Şube ve kurumsal görseller">
        <div className="about-slider-head">
          <h2>Şubelerimiz ve kurumsal görsellerimiz</h2>
        </div>

        <div className="about-showcase">
          {aboutCards.map((item) => (
            <article className="about-showcase-card card-lite" key={item.title}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage
