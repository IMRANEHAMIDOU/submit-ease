import { Ghost, X } from 'lucide-react'

type InfoModalProps = {
  message: string
  onClose: () => void
}

export default function ModalInfo({ message, onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-base-100 rounded-lg shadow-lg p-8 w-full max-w-md text-center animate-fade-in-up relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="rounded-full bg-accent/10 p-4 mb-4 mx-auto w-fit">
          <Ghost className="w-12 h-12 text-accent" />
        </div>

        <p className="text-base-content mb-6">{message}</p>

        <button
          onClick={onClose}
          className="btn bg-accent text-white hover:bg-accent/90 transition-all"
        >
          D'accord
        </button>
      </div>
    </div>
  )
}
