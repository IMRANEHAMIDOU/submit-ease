import { Link } from 'react-router-dom'
import { Ghost, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-base-100 to-base-200 text-center px-4">
      <div className="flex flex-col items-center animate-fade-in-up">
        <div className="rounded-full bg-accent/10 p-6 mb-6 shadow-lg">
          <Ghost className="w-16 h-16 text-accent" />
        </div>
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 dark:text-gray-200">Oups ! Page introuvable</h2>
        <p className="text-base-content/70 mb-6 max-w-md">
          La page que vous recherchez n'existe pas ou a été déplacée. Revenez à l'accueil pour continuer votre exploration.
        </p>
        <Link to="/" className="btn bg-accent text-white hover:bg-accent/90 transition-all">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Link>
      </div>

     
    </div>
  )
}
