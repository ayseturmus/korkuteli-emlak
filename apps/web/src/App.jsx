import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ListingDetailPage from './pages/ListingDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ListingsPage from './pages/ListingsPage'
import AdminPage from './pages/AdminPage'
import FloatingLinks from './components/FloatingLinks'
import SiteFooter from './components/SiteFooter'

function App() {
  return (
    <div className="app-layout">
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ilanlar" element={<ListingsPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/ilan/:id" element={<ListingDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
      <FloatingLinks />
    </div>
  )
}

export default App
