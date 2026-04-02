# Korkuteli Emlak

Bu klasor, React tabanli web arayuzu ve Express tabanli API iceren tam bir baslangic projesidir.

## Klasorler

- apps/web: Vite + React frontend
- apps/api: Express API

## Komutlar

Kok klasorden:

- pnpm dev: API ve web uygulamasini birlikte baslatir
- pnpm dev:web: Sadece frontend
- pnpm dev:api: Sadece backend
- pnpm build: Frontend build alir
- pnpm start: API'yi production modda calistirir

## API Endpointleri

- GET /health
- GET /api/listings
- GET /api/listings?q=arama
- GET /api/listings/:id
- POST /api/admin/login
- GET /api/admin/verify
- POST /api/listings (admin yetkisi gerekir)
- PUT /api/listings/:id (admin yetkisi gerekir)
- DELETE /api/listings/:id (admin yetkisi gerekir)

## Admin Guvenligi

- Admin paneli adresi: /admin
- Bu ekran menude gosterilmez ve sifre ile giris ister.
- API tarafinda ilan ekleme, duzenleme ve silme islemleri sadece admin oturumu ile yapilabilir.

`apps/api/.env` icine sunlari ekleyin:

- ADMIN_PASSWORD=guclu_bir_sifre
- ADMIN_SESSION_TTL_MS=28800000

## Not

API varsayilan olarak http://localhost:4000 adresinde calisir.
Frontend bu adrese dogrudan istek atar.
