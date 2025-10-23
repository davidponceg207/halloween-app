import { motion } from 'framer-motion'


export default function CostumeCard({ costume, onVote, voted }) {
    return (
        <motion.div layout whileHover={{ scale: 1.02 }} className="bg-[#0f1724] rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-64">
                <img src={costume.photoUrl} alt={costume.costumeName} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-black/40 px-3 py-1 rounded backdrop-blur">
                    <span className="text-xs text-[#fef3c7] font-semibold">{costume.costumeName}</span>
                </div>
            </div>


            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-[#94a3b8]">por</p>
                        <p className="font-semibold">{costume.name}</p>
                    </div>


                    <div className="text-right">
                        <p className="text-xs text-[#94a3b8]">Votos</p>
                        <p className="font-bold text-xl text-orange-400">{costume.votes}</p>
                    </div>
                </div>


                <button
                    onClick={() => onVote(costume.id)}
                    disabled={voted}
                    className={`mt-4 w-full py-2 rounded-lg font-semibold ${voted ? 'bg-gray-600/40 cursor-not-allowed' : 'bg-orange-600 hover:scale-105'}`}
                >
                    {voted ? 'Ya votaste' : 'Votar'}
                </button>
            </div>
        </motion.div>
    )
}