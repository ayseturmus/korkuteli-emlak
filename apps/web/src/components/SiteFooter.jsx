const branches = ['Korkuteli', 'Yelten', 'Antalya', 'Bozova']

function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site alt bilgi">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="site-footer-brand-head">
            <img className="site-footer-logo" src="/korkuteli-logo-original.png" alt="Korkuteli Emlak logosu" />
            <div className="site-footer-brand-meta">
              <h3>Korkuteli Emlak</h3>
              <p className="site-footer-badge">Patentli Marka</p>
            </div>
          </div>
          <p className="site-footer-text">
            Korkuteli Emlak, patentli marka güvencesi ile açık ve güvenilir emlak hizmeti sunar.
          </p>
        </div>

        <div className="site-footer-branches">
          <h3>Şubelerimiz</h3>
          <ul>
            {branches.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="site-footer-contact">
          <h3>İletişim</h3>
          <p>Salih Turmuş ile hızlıca iletişime geçin.</p>
          <div className="site-footer-actions">
            <a className="action action-whatsapp" href="https://wa.me/905315936649" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="action action-phone" href="tel:+905315936649">
              Hemen Ara
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <div className="site-footer-credit">
          <span>Ayşe Turmuş tarafından yapıldı.</span>
          <span className="site-footer-legal">
            Korkuteli Emlak patentli markadır. Tüm hakları saklıdır.
          </span>
        </div>
        <a href="https://ayseturmus.com/" target="_blank" rel="noreferrer">
          ayseturmus.com
        </a>
      </div>
    </footer>
  )
}

export default SiteFooter
