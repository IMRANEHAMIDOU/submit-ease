import { useState } from 'react';
import {
  UserPlus,
  Building2,
  User,
  Upload,
  Globe,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

export default function SignUp() {
  const [userType, setUserType] = useState<'candidat' | 'organisation'>('candidat');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Organisation fields
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [domaine, setDomaine] = useState('');
  const [contact, setContact] = useState('');
  const [adresse, setAdresse] = useState('');
  const [siteWeb, setSiteWeb] = useState('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Form data:', {
        userType,
        email,
        password,
        ...(userType === 'organisation' && {
          nom,
          description,
          domaine,
          contact,
          adresse,
          siteWeb,
          logo: logo?.name,
        }),
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (userType === 'organisation') {
        alert('Inscription réussie ! Votre compte sera validé sous 24-48h.');
      } else {
        alert('Inscription réussie ! Bienvenue sur SubmitEase.');
      }

      // Reset
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setNom('');
      setDescription('');
      setDomaine('');
      setContact('');
      setAdresse('');
      setSiteWeb('');
      setLogo(null);
    } catch (err) {
      console.error(err);
      setError("Erreur d'inscription : vérifiez vos informations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-16 bg-gradient-to-br from-sky-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors w-full">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
            <UserPlus className="w-10 h-10 text-accent" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-2">
          Créer un compte
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Rejoignez SubmitEase et simplifiez vos processus de candidature
        </p>

        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
          </div>
        )}

        <div className="tabs tabs-boxed justify-center mb-8 bg-base-200 p-1">
          <button
            type="button"
            className={`tab tab-lg ${userType === 'candidat' ? 'tab-active' : ''}`}
            onClick={() => setUserType('candidat')}
          >
            <User className="w-5 h-5 mr-2" />
            Candidat
          </button>
          <button
            type="button"
            className={`tab tab-lg ${userType === 'organisation' ? 'tab-active' : ''}`}
            onClick={() => setUserType('organisation')}
          >
            <Building2 className="w-5 h-5 mr-2" />
            Organisation
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </span>
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mot de passe *</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmer le mot de passe *</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
          </div>

          {userType === 'organisation' && (
            <>
              <div className="divider">
                <span className="text-sm text-gray-500">Informations de l'organisation</span>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Nom de l'organisation *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: ONG SubmitEase..."
                  className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label block">
                  <span className="label-text">Description *</span>
                </label>
                <textarea
                  placeholder="Décrivez votre organisation..."
                  className="textarea textarea-bordered h-24 w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Domaine d'activité *</span>
                  </label>
                  <select
                    className="select select-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                    value={domaine}
                    onChange={(e) => setDomaine(e.target.value)}
                    required
                  >
                    <option value="">Sélectionner un domaine</option>
                    <option value="education">Éducation</option>
                    <option value="sante">Santé</option>
                    <option value="technologie">Technologie</option>
                    <option value="finance">Finance</option>
                    <option value="ong">ONG / Humanitaire</option>
                    <option value="gouvernement">Gouvernement</option>
                    <option value="commerce">Commerce</option>
                    <option value="industrie">Industrie</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="autres">Autres</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Téléphone *
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+227 XX XX XX XX"
                    className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Adresse *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Adresse complète"
                  className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Site web
                    </span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://votre-site.com"
                    className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                    value={siteWeb}
                    onChange={(e) => setSiteWeb(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Logo
                    </span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                    onChange={handleLogoChange}
                  />
                </div>
              </div>

              <div className="alert alert-info text-sm mt-4">
                Votre compte sera vérifié avant activation. Un email vous sera envoyé sous 24-48h.
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn btn-accent w-full btn-lg mt-6 dark:bg-accent dark:text-accent-content hover:dark:bg-accent-focus"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Inscription en cours...
              </>
            ) : (
              <>
                S'inscrire
                {userType === 'organisation' ? ' (Validation requise)' : ''}
              </>
            )}
          </button>
        </form>

        <div className="divider mt-8"></div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="text-accent hover:underline font-medium">
            Se connecter
          </a>
        </p>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          En vous inscrivant, vous acceptez nos{" "}
          <a href="/terms" className="text-accent hover:underline">
            conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="/privacy" className="text-accent hover:underline">
            politique de confidentialité
          </a>
        </p>
      </div>
    </div>
  );
}
