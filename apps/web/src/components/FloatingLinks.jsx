const links = [
  {
    key: 'emlakjet',
    label: 'Emlakjet',
    href: 'https://www.emlakjet.com/',
    className: 'emlakjet',
    icon: 'https://www.google.com/s2/favicons?domain=emlakjet.com&sz=128',
  },
  {
    key: 'sahibinden',
    label: 'Sahibinden',
    href: 'https://korkuteliemlak.sahibinden.com/',
    className: 'sahibinden',
    icon: 'https://www.google.com/s2/favicons?domain=sahibinden.com&sz=128',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    className: 'facebook',
    icon: 'https://www.google.com/s2/favicons?domain=facebook.com&sz=128',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/905315936649',
    className: 'whatsapp',
    icon: 'https://www.google.com/s2/favicons?domain=whatsapp.com&sz=128',
  },
]

function FloatingLinks() {
  return (
    <aside className="floating-links" aria-label="Sosyal baglantilar">
      {links.map((item) => (
        <a
          key={item.key}
          className={`floating-link ${item.className}`}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          title={item.label}
        >
          <img src={item.icon} alt="" aria-hidden="true" className="floating-icon" />
        </a>
      ))}
    </aside>
  )
}

export default FloatingLinks
