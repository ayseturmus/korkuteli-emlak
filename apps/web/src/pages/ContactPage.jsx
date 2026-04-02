import { Link } from 'react-router-dom'
import branchPhoto from '../assets/Korkuteli emlak -01.png'

function ContactPage() {
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
          <Link to="/hakkimizda">Hakkımızda</Link>
          <Link to="/iletisim">İletişim</Link>
        </nav>
      </header>

      <section className="simple-hero">
        <p className="kicker">İletişim</p>
        <h1>Bizimle hemen iletişime geçin.</h1>
        <p>
          Portföy, yatırım ve tapu süreçleriyle ilgili tüm sorularınız için bize
          ulaşabilirsiniz.
        </p>
      </section>

      <section className="contact-grid">
        <article className="card-lite">
          <h2>Telefon</h2>
          <p>+90 531 593 66 49</p>
          <a className="action action-primary" href="tel:+905315936649">
            Şimdi ara
          </a>
        </article>

        <article className="card-lite">
          <h2>WhatsApp</h2>
          <p>Hızlı mesaj için tek tıkla ulaşın.</p>
          <a
            className="action action-whatsapp"
            href="https://wa.me/905315936649"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp'tan Yaz
          </a>
        </article>

        <article className="card-lite">
          <h2>E-Posta</h2>
          <p>korkuteliemlak@gmail.com</p>
          <a className="action action-soft" href="mailto:korkuteliemlak@gmail.com">
            E-posta gönder
          </a>
        </article>
      </section>

      <section className="contact-showcase" aria-label="Şube görseli">
        <article className="contact-showcase-card card-lite">
          <img
            src={branchPhoto}
            alt="Şubelerimizden bir görünüm"
            loading="lazy"
          />
          <div className="contact-showcase-copy">
            <p className="kicker">Şubelerimiz</p>
            <h2>Her şubemizde misafir ağırlamaktan memnun oluruz.</h2>
            <p>
              Korkuteli, Bozova ve çevre bölgelerde ofislerimizde sizi kahvemize
              bekliyoruz. Taşınmaz sürecini yüz yüze, net ve güvenli biçimde anlatıyoruz.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}

export default ContactPage
