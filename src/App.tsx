import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { useReveal } from './components/useReveal'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import Tours from './pages/Tours'
import Gallery from './pages/Gallery'
import Contacts from './pages/Contacts'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

function Layout() {
  useReveal()
  return (
    <div className="frame">
      <ScrollManager />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
