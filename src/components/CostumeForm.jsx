import { useState } from 'react'
import { db, storage } from '../services/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import imageCompression from 'browser-image-compression'

export default function CostumeForm() {
  const [name, setName] = useState('')
  const [costumeName, setCostumeName] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    // 🔍 Validaciones básicas
    if (!selectedFile.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen (jpg o png)')
      return
    }
    if (selectedFile.size > 3 * 1024 * 1024) {
      setError('La imagen no puede superar los 2MB')
      return
    }

    // 🧩 Compresión
    const options = {
      maxSizeMB: 0.5,           // Reducir a ~500KB
      maxWidthOrHeight: 500,    // Escalar máximo 500px
      useWebWorker: true,
    }

    try {
      const compressedFile = await imageCompression(selectedFile, options)
      setFile(compressedFile)
      setPreview(URL.createObjectURL(compressedFile))
      setError('')
    } catch (err) {
      console.error('Error al comprimir imagen:', err)
      setError('No se pudo procesar la imagen')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return alert('Selecciona una imagen válida')
    setLoading(true)

    try {
      const filename = `${Date.now()}_${file.name}`
      const storageRef = ref(storage, `costumes/${filename}`)
      await uploadBytes(storageRef, file)
      const photoUrl = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'costumes'), {
        name,
        costumeName,
        photoUrl,
        votes: 0,
        createdAt: Date.now(),
      })

      setName('')
      setCostumeName('')
      setFile(null)
      setPreview(null)
      alert('🎉 Disfraz registrado correctamente')
    } catch (err) {
      console.error(err)
      alert('Error al subir el disfraz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#071028] p-6 rounded-2xl max-w-xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-orange-400">Registrar nuevo disfraz</h3>

      <input
        className="w-full mb-3 p-2 rounded bg-transparent border border-gray-700"
        placeholder="Nombre del participante"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 rounded bg-transparent border border-gray-700"
        placeholder="Nombre del disfraz"
        value={costumeName}
        onChange={e => setCostumeName(e.target.value)}
      />

      <label className="block mb-3">
        <span className="text-sm text-[#94a3b8]">Foto del disfraz</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 text-white"
        />
      </label>

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="w-40 h-40 object-cover rounded-lg mx-auto mb-4 border border-gray-700"
        />
      )}

      <button
        disabled={loading}
        className={`w-full py-2 rounded font-semibold transition-colors ${
          loading ? 'bg-gray-600' : 'bg-orange-600 hover:bg-orange-700'
        }`}
      >
        {loading ? 'Subiendo...' : 'Registrar disfraz'}
      </button>
    </form>
  )
}
