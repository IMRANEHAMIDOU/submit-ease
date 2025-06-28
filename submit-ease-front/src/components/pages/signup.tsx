import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { UserPlus } from 'lucide-react'

export default function SignUp() {
  const signIn = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/signup', {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        }
      })

      const token = res.headers.authorization
      const user = res.data.user

      const success = signIn({
        auth: {
          token: token,
          type: 'Bearer',
        },
        userState: {
          id: user.id,
          email: user.email,
        },
      })

      if (success) {
        window.location.href = '/'
      } else {
        setError("Échec de connexion après inscription")
      }

    } catch (err) {
      console.error(err)
      setError("Erreur d'inscription : vérifiez vos informations")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors w-full">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 transition-colors">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
            <UserPlus className="w-10 h-10 text-emerald-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Créer un compte
        </h2>

        {error && (
          <p className="text-sm bg-red-600 text-white p-2 rounded mb-2 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn bg-emerald-500 text-white w-full hover:bg-emerald-600 transition-all"
            disabled={loading}
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-emerald-500 hover:underline font-medium"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
