import { useState } from 'react'
import api from '../../services/api'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

export default function SignUp() {
  const signIn = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/signup', {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation
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
          email: user.email
        },
      })

      if (success) {
        alert("Compte créé avec succès et connecté !")
      } else {
        alert("Échec de connexion après inscription")
      }

    } catch (err) {
      console.error(err)
      alert("Erreur d'inscription : " + err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
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
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        className="input input-bordered w-full"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button type="submit" className="btn btn-success w-full">
        S'inscrire
      </button>
    </form>
  )
}
