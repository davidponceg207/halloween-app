import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Results from './pages/Results'
import Header from './components/Header'


export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-white bg-black">
        <Header />
        <main className="p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}