import { Link } from 'react-router-dom'
import IconPumpkin from './IconPumpkin'


export default function Header() {
    return (
        <header className="bg-gradient-to-r from-[#0b1220] to-[#071028] shadow-lg">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    {/* <IconPumpkin className="w-10 h-10" /> */}
                    <Link to="/">
                        <h1 className="text-2xl font-extrabold tracking-tight">🎃 JALOWEEN 🎃</h1>
                        <p className="text-xs text-[#94a3b8]">¡Vota por el mejor disfraz!</p>
                    </Link>
                </div>


                <nav className="flex gap-4 items-center">
                    {/* <Link to="/" className="text-sm px-3 py-1 rounded-md hover:bg-white/5">Inicio</Link> */}
                    <Link to="/register" className="bg-orange-600 px-3 py-1 rounded-md text-black font-semibold shadow hover:scale-105 hidden transition">Registrar</Link>
                    <Link to="/results" className="bg-orange-600 px-3 py-1 rounded-md text-black font-semibold shadow hover:scale-105 transition">Resultados 🔥</Link>
                </nav>
            </div>
        </header>
    )
}