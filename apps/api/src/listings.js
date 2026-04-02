const initialListings = [
  {
    id: '1275697517',
    title: 'Korkuteli Yelten Köyün Dibinde 2.530 m² Satılık Arsa',
    district: 'Antalya / Korkuteli / Yelten Mh.',
    price: 2200000,
    area: 2530,
    rooms: 'Satılık Arsa',
    m2Price: 870,
    adaNo: '153',
    parselNo: '7',
    tapuDurumu: 'Müstakil Tapulu',
    takas: 'Evet',
    kimden: 'Emlak Ofisinden',
    listingDate: '2026-01-31',
    listingNo: '1275697517',
    sourceUrl:
      'https://www.sahibinden.com/ilan/emlak-arsa-satilik-korkuteli-yeltende-koyun-dibinde-2.530-m2-elektrik-su-dibinde-1275697517/detay',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    description:
      'Köy merkezine yakın ve manzaralı. Elektrik ile su hattı dibinde. Ada 153, Parsel 7. Tapu durumu müstakil tapuludur.',
  },
  {
    id: '1300148375',
    title: 'Korkuteli Küçükköy Ovasında Resmî Yolu Olan 2.000 m² Arsa',
    district: 'Antalya / Korkuteli / Küçükköy Mh.',
    price: 750000,
    area: 2000,
    rooms: 'Satılık Arsa',
    m2Price: 375,
    adaNo: '418',
    parselNo: '217',
    tapuDurumu: 'Müstakil Tapulu',
    takas: 'Evet',
    kimden: 'Emlak Ofisinden',
    listingDate: '2026-03-01',
    listingNo: '1300148375',
    sourceUrl:
      'https://www.sahibinden.com/ilan/emlak-arsa-satilik-korkuteli-kucukkoy-ovasinda-resmi-yolu-sulama-suyu-mezcut-2donum-1300148375/detay',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    description:
      'Resmî yolu ve sulama suyu mevcut. Bahçe veya prefabrik ev yapımına uygun. Ada 418, Parsel 217.',
  },
  {
    id: '1296140127',
    title: 'Trabzon Araklı Yolgören 300 m² Kiralık/Satılık İşyeri',
    district: 'Trabzon / Araklı / Yolgören Mh.',
    price: 25000,
    area: 300,
    rooms: 'Kiralık İş Yeri 4+1',
    m2Price: null,
    adaNo: '-',
    parselNo: '-',
    tapuDurumu: 'Müstakil Tapulu',
    takas: '-',
    kimden: 'Emlak Ofisinden',
    listingDate: '2026-02-27',
    listingNo: '1296140127',
    sourceUrl:
      'https://www.sahibinden.com/ilan/emlak-is-yeri-kiralik-trabzon-arakli-yolgorende-kiralik-satlik-isyeri-1296140127/detay',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    description:
      'TOKİ 2. etapta, 300 m² kullanım alanına sahip dubleks dükkân. Market, ofis veya şirket binası için uygundur.',
  },
  {
    id: '1138510981',
    title: 'Korkuteli Yelten 3.000 m² Resmî Yola Cephe Tarla',
    district: 'Antalya / Korkuteli / Yelten Mh.',
    price: 2200000,
    area: 3000,
    rooms: 'Satılık Arsa',
    m2Price: 733,
    adaNo: '0',
    parselNo: '0',
    tapuDurumu: 'Müstakil Tapulu',
    takas: 'Hayır',
    kimden: 'Emlak Ofisinden',
    listingDate: '2026-01-31',
    listingNo: '1138510981',
    sourceUrl:
      'https://www.sahibinden.com/ilan/emlak-arsa-satilik-korkuteli-yeltende-suyu-onunde-3-donum-resmi-yola-cehpe-tarla-1138510981/detay',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
    description:
      '3.000 m² resmî yola cephe, suyu önünde; manzaralı ve etrafında komşuları bulunan tarla.',
  },
  {
    id: '1275536050',
    title: 'Korkuteli Yelten 6.800 m² Ana Yola Sıfır Ticari Uygun Arsa',
    district: 'Antalya / Korkuteli / Yelten Mh.',
    price: 7000000,
    area: 6800,
    rooms: 'Satılık Arsa',
    m2Price: 1029,
    adaNo: '107',
    parselNo: '34',
    tapuDurumu: 'Müstakil Tapulu',
    takas: 'Hayır',
    kimden: 'Emlak Ofisinden',
    listingDate: '2026-01-31',
    listingNo: '1275536050',
    sourceUrl:
      'https://www.sahibinden.com/ilan/emlak-arsa-satilik-korkuteli-yeltende-6.800-m2-ana-yola-sifir-1275536050/detay',
    image:
      'https://images.unsplash.com/photo-1460355976672-71c3f0a4bdac?auto=format&fit=crop&w=1200&q=80',
    description:
      '6.800 m² ana yola sıfır, ticari kullanıma uygun arazi. Ada 107, Parsel 34. Tapu durumu müstakil tapuludur.',
  },
  {
    id: '1098315071',
    title: 'Korkuteli Büyükköy’de 360 m², 2 Kat İmarlı Arsa',
    district: 'Antalya / Korkuteli / Büyükköy Mh.',
    price: 1400000,
    area: 360,
    rooms: 'Satılık Arsa',
    m2Price: 3889,
    adaNo: '0',
    parselNo: '0',
    tapuDurumu: 'Müstakil Tapulu',
    takas: 'Hayır',
    kimden: 'Emlak Ofisinden',
    listingDate: '2026-01-31',
    listingNo: '1098315071',
    sourceUrl:
      'https://www.sahibinden.com/ilan/emlak-arsa-satilik-korkuteli-buyukkoyde-villalar-bolgesinde-360m2-2-kat-imarli-arsa-1098315071/detay',
    image:
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80',
    description:
      'Yelten-Büyükköy arası villalar bölgesinde 360 m² arsa. 2 kat imarlı, 105 m² yapı izinli; manzaralı ve altyapıya yakındır.',
  },
  {
    id: '1275542409',
    title: 'Korkuteli Yelten 14.300 m² Resmî Yolu Mevcut Arsa',
    district: 'Antalya / Korkuteli / Yelten Mh.',
    price: 3300000,
    area: 14300,
    rooms: 'Satılık Arsa',
    m2Price: 231,
    adaNo: '345',
    parselNo: '1',
    tapuDurumu: 'Müstakil Tapulu',
    takas: 'Hayır',
    kimden: 'Emlak Ofisinden',
    listingDate: '2026-01-31',
    listingNo: '1275542409',
    sourceUrl:
      'https://www.sahibinden.com/ilan/emlak-arsa-satilik-korkuteli-yeltende-14.300-m2-resmi-yolu-mevcut-1275542409/detay',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    description:
      '14.300 m² büyük parsel. Resmî yolu mevcut, Büyükköy tapulu ve yatırım amaçlı değerli bir arazidir.',
  },
  {
    id: '1275539320',
    title: 'Korkuteli Yelten 457 m² İmarlı, Ana Yola Sıfır Parsel',
    district: 'Antalya / Korkuteli / Yelten Mh.',
    price: 1900000,
    area: 457,
    rooms: 'Satılık Arsa',
    m2Price: 4158,
    adaNo: '498',
    parselNo: '20',
    tapuDurumu: 'Müstakil Tapulu',
    takas: 'Hayır',
    kimden: 'Emlak Ofisinden',
    listingDate: '2026-01-31',
    listingNo: '1275539320',
    sourceUrl:
      'https://www.sahibinden.com/ilan/emlak-arsa-satilik-korkuteli-yeltende-457-m2-imarli-ana-yola-sifir-parsel-1275539320/detay',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    description:
      '457 m² parsel, ana yola sıfır konumda. 3 kat imarlı, krediye uygun ve müstakil tapuludur.',
  },
]

let listings = []

const inferListingTypeFromText = (...values) => {
  const text = values
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('tr-TR')

  if (text.includes('tarla')) {
    return 'tarla'
  }

  if (text.includes('bahçe') || text.includes('bahce')) {
    return 'bahce'
  }

  if (text.includes('iş yeri') || text.includes('isyeri') || text.includes('dükkan')) {
    return 'isyeri'
  }

  if (text.includes('daire') || text.includes('konut') || text.includes('villa')) {
    return 'konut'
  }

  if (text.includes('arsa')) {
    return 'arsa'
  }

  return 'diger'
}

const normalizeListingType = (value, fallbackTextValues = []) => {
  const raw = String(value || '')
    .trim()
    .toLocaleLowerCase('tr-TR')

  const compact = raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')

  if (compact === 'arsa') {
    return 'arsa'
  }

  if (compact === 'tarla') {
    return 'tarla'
  }

  if (compact === 'bahce') {
    return 'bahce'
  }

  if (compact === 'isyeri') {
    return 'isyeri'
  }

  if (compact === 'konut') {
    return 'konut'
  }

  if (compact === 'diger') {
    return 'diger'
  }

  return inferListingTypeFromText(...fallbackTextValues)
}

const toNumber = (value, fallback = 0) => {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : fallback
}

const toNullableNumber = (value, fallback = null) => {
  if (value === '' || value === null || value === undefined) {
    return fallback
  }

  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : fallback
}

const normalizeListingPayload = (payload, existing = null) => {
  const source = payload || {}
  const base = existing || {}
  const listingType = normalizeListingType(source.listingType || base.listingType, [
    source.rooms,
    source.title,
    source.description,
    base.rooms,
    base.title,
    base.description,
  ])

  return {
    id: String(source.id || base.id || Date.now()),
    title: String(source.title || base.title || '').trim(),
    district: String(source.district || base.district || '').trim(),
    price: toNumber(source.price, toNumber(base.price, 0)),
    area: toNumber(source.area, toNumber(base.area, 0)),
    rooms: String(source.rooms || base.rooms || 'Satılık Arsa').trim(),
    m2Price:
      source.m2Price === null
        ? null
        : toNumber(source.m2Price, base.m2Price == null ? 0 : toNumber(base.m2Price, 0)),
    adaNo: String(source.adaNo || base.adaNo || '-').trim(),
    parselNo: String(source.parselNo || base.parselNo || '-').trim(),
    tapuDurumu: String(source.tapuDurumu || base.tapuDurumu || 'Müstakil Tapulu').trim(),
    takas: String(source.takas || base.takas || 'Hayır').trim(),
    kimden: String(source.kimden || base.kimden || 'Emlak Ofisinden').trim(),
    listingDate: String(source.listingDate || base.listingDate || '').trim(),
    listingNo: String(source.listingNo || base.listingNo || '').trim(),
    sourceUrl: String(source.sourceUrl || base.sourceUrl || '').trim(),
    image: String(source.image || base.image || '').trim(),
    description: String(source.description || base.description || '').trim(),
    listingType,
    badge: String(source.badge || base.badge || '').trim(),
    mapAddress: String(source.mapAddress || base.mapAddress || '').trim(),
    mapLat: toNullableNumber(source.mapLat, toNullableNumber(base.mapLat, null)),
    mapLng: toNullableNumber(source.mapLng, toNullableNumber(base.mapLng, null)),
  }
}

listings = initialListings.map((item) => normalizeListingPayload(item))

const listListings = () => listings

const findListingById = (id) => listings.find((item) => item.id === id)

const createListing = (payload) => {
  const item = normalizeListingPayload(payload)
  listings = [item, ...listings]
  return item
}

const updateListing = (id, payload) => {
  const index = listings.findIndex((item) => item.id === id)

  if (index === -1) {
    return null
  }

  const current = listings[index]
  const updated = normalizeListingPayload(payload, current)
  updated.id = current.id

  listings[index] = updated
  return updated
}

const deleteListing = (id) => {
  const before = listings.length
  listings = listings.filter((item) => item.id !== id)
  return listings.length !== before
}

module.exports = {
  listListings,
  findListingById,
  createListing,
  updateListing,
  deleteListing,
}
