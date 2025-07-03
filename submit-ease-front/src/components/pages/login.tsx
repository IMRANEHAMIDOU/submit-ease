import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { UserCheck } from 'lucide-react'
import { apiLogin } from '../../services/auth-api'
import type { UserType } from '../../types/type'

export default function Login() {
  const signIn = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const res = await apiLogin({ email, password });

    const token = res.headers.authorization;
    const user = res.data.user as UserType;

    const success = signIn({
      auth: {
        token,
        type: 'Bearer',
      },
      userState: {
        id: user!.id,
        email: user!.email,
        organization_id: user?.organization_id,
        role: user?.role,
        avatar: user.avatar
      },
    });

    if (success) {
         // Redirection en fonction du rôle
      if (user!.role === "superadmin") {
        window.location.href = "/superadmin";
      } else if (user!.role === "admin") {
        window.location.href = "/admin";
      } else if (user!.role === "candidate") {
        window.location.href = "/candidate";
      } else {
        window.location.href = "/";
      }
    } else {
      setError("Échec de connexion");
    }
  } catch (err: unknown) {
    console.log("Erreur API complète :", err);

    if (err && typeof err === 'object' && 'data' in err) {
      setError("Email ou mot de passe incorrect");
    } else {
      setError("Une erreur inattendue s'est produite");
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200/50 px-4 w-full">
      <div className="w-full max-w-md bg-base-100 rounded-lg shadow-2xl border border-base-300 p-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
            <UserCheck className="w-10 h-10 text-success" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-base-content mb-4">
          Se connecter
        </h2>

        {error && (
          <div className="alert alert-error mb-4">
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-success w-full transition-all"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-base-content/70">
          Vous n'avez pas de compte ?{" "}
          <Link
            to="/signup"
            className="text-success hover:underline font-medium transition-colors"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}