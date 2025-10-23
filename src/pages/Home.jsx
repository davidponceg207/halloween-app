import { useEffect, useState } from 'react'
import { db } from '../services/firebase'
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import CostumeCard from '../components/CostumeCard'


export default function Home() {
    const [costumes, setCostumes] = useState([])
    const [votedIds, setVotedIds] = useState(() => JSON.parse(localStorage.getItem('votedIds') || '[]'))


    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'costumes'), snapshot => {
            setCostumes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
        })
        return () => unsub()
    }, [])


    const handleVote = async (id) => {
        if (votedIds.includes(id)) return alert('Ya votaste por este concurso 🎃')
        const c = costumes.find(x => x.id === id)
        if (!c) return
        const refDoc = doc(db, 'costumes', id)
        await updateDoc(refDoc, { votes: (c.votes || 0) + 1 })
        const next = [...votedIds, id]
        setVotedIds(next)
        localStorage.setItem('votedIds', JSON.stringify(next))
    }


    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">🕸️ Disfraces Participantes</h2>


            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {costumes.map(c => (
                    <CostumeCard key={c.id} costume={c} onVote={handleVote} voted={votedIds.includes(c.id)} />
                ))}
            </div>


            {costumes.length === 0 && (
                <p className="mt-8 text-center text-[#94a3b8]">Aún no hay disfraces. Sé el primero en registrarte!</p>
            )}
        </div>
    )
}