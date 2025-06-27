import { useState } from 'react'
import api from '../../services/api'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

export default function Login() {
  const signIn = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/login', {
        user: { email, password }
      })

      console.log(res.headers)

      const token = res.headers.authorization

      const user = res.data.user 

      const success = signIn({
        auth: {
          token: token,
          type: 'Bearer',
        },
        userState: {
          id: user.id,
          email: user.email
        },
      })

      if (success) {
        window.location.href = '/'
      } else {
        setError("Échec de connexion")
      }

    } catch (err) {
      console.error(err)
      setError("Email ou mot de passe incorrect")
    }finally{
       setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-primary text-xl font-bold">Se connecter</h2>
      {error && (
        <p className='text-sm text-left bg-red-600 text-white p-2 rounded'>{error}</p>
      )}
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="input input-bordered w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        Se connecter
      </button>
    </form>
  )
}
