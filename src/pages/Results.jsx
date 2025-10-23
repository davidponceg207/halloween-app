import { useEffect, useState } from 'react'
import { db } from '../services/firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'


export default function Results() {
    const [ranking, setRanking] = useState([])


    useEffect(() => {
        const q = query(collection(db, 'costumes'), orderBy('votes', 'desc'))
        const unsub = onSnapshot(q, snap => {
            setRanking(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        })
        return () => unsub()
    }, [])


    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">🏆 Resultados</h2>


            <ol className="space-y-3">
                {ranking.map((r, i) => (
                    <li key={r.id} className="bg-[#0f1724] p-4 rounded-lg flex items-center gap-4">
                        <div className="w-12 text-center">
                            <div className="text-xl font-bold text-orange-400">{i + 1}</div>
                        </div>
                        <img src={r.photoUrl} alt={r.costumeName} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-1">
                            <div className="font-semibold">{r.costumeName}</div>
                            <div className="text-sm text-[#94a3b8]">por {r.name}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-[#94a3b8]">Votos</div>
                            <div className="font-bold text-lg text-orange-400">{r.votes}</div>
                        </div>
                    </li>
                ))}
            </ol>


            {ranking.length === 0 && <p className="mt-6 text-center text-[#94a3b8]">No hay votos todavía.</p>}
        </div>
    )
}