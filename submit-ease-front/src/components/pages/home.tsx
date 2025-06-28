import React, { useState, useEffect } from 'react'
import {
  ChevronRight,
  Users,
  FileText,
  CheckCircle,
  Shield,
  Zap,
  Target,
  Building2,
  GraduationCap,
  Briefcase,
  Heart,
  ArrowRight,
  Play,
  TrendingUp,
  Award,
  UserCheck,
  Search,
  BarChart3
} from 'lucide-react'

// === Types ===

type AnimatedCounterProps = {
  end: number
  duration?: number
  suffix?: string
}

type FeatureCardProps = {
  icon: React.ElementType
  title: string
  description: string
  delay?: number
}

type ProcessStepProps = {
  number: string
  title: string
  description: string
  icon: React.ElementType
  isLast?: boolean
}

// === Components ===

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="card-body items-center text-center">
        <div className="rounded-full bg-accent/10 p-4 mb-4">
          <Icon className="w-8 h-8 text-accent" />
        </div>
        <h3 className="card-title text-xl mb-2">{title}</h3>
        <p className="text-base-content/70">{description}</p>
      </div>
    </div>
  )
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, icon: Icon, isLast = false }) => (
  <div className="flex items-start gap-4 mb-8">
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-accent text-accent-content w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
        {number}
      </div>
      {!isLast && <div className="w-0.5 bg-accent/30 h-16 mt-4"></div>}
    </div>
    <div className="flex-1 pt-2">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-base-content/70 leading-relaxed">{description}</p>
    </div>
  </div>
)

// === Main Page ===

export default function Home() {
  const [activeTab, setActiveTab] = useState<'candidats' | 'organisations'>('candidats')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden w-full">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Submit<span className="text-accent">Ease</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              La plateforme qui transforme la gestion de vos candidatures.
              <span className="text-accent font-semibold"> Simple, sécurisé, centralisé.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection('features')}
                className="btn bg-accent text-accent-content btn-lg shadow-lg hover:bg-accent-focus transition-all"
              >
                Découvrir la plateforme
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="btn border-accent text-accent btn-lg hover:bg-accent hover:text-accent-content transition-all">
                <Play className="w-5 h-5 mr-2" />
                Voir la démo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <p className="text-base-content/70">Organisations</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  <AnimatedCounter end={10000} suffix="+" />
                </div>
                <p className="text-base-content/70">Candidatures</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <p className="text-base-content/70">Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  <AnimatedCounter end={85} suffix="%" />
                </div>
                <p className="text-base-content/70">Gain de temps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pourquoi choisir <span className="text-accent">SubmitEase</span> ?
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Une solution complète qui révolutionne la façon dont vous gérez vos processus de recrutement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={Zap} title="Rapidité" description="Créez vos campagnes en quelques minutes et suivez les candidatures en temps réel" delay={0} />
            <FeatureCard icon={Shield} title="Sécurité" description="Vos données sont protégées avec les plus hauts standards de sécurité" delay={200} />
            <FeatureCard icon={Target} title="Précision" description="Système de filtrage intelligent pour identifier les meilleurs candidats" delay={400} />
            <FeatureCard icon={Users} title="Collaboration" description="Travaillez en équipe avec des permissions et rôles personnalisés" delay={600} />
            <FeatureCard icon={BarChart3} title="Analytics" description="Tableaux de bord détaillés pour analyser vos campagnes" delay={800} />
            <FeatureCard icon={CheckCircle} title="Simplicité" description="Interface intuitive qui ne nécessite aucune formation" delay={1000} />
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comment ça fonctionne ?
            </h2>
            <p className="text-xl text-base-content/70">
              Découvrez le processus simple et efficace pour candidats et organisations
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="tabs tabs-boxed justify-center mb-12 bg-base-200 p-1">
            <button 
              className={`tab tab-lg ${activeTab === 'candidats' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('candidats')}
            >
              <Users className="w-5 h-5 mr-2" />
              Pour les candidats
            </button>
            <button 
              className={`tab tab-lg ${activeTab === 'organisations' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('organisations')}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Pour les organisations
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              {activeTab === 'candidats' ? (
                <div>
                  <ProcessStep 
                    number="1"
                    title="Accédez au lien"
                    description="Cliquez sur le lien de la campagne partagé sur les réseaux ou sites d'emploi"
                    icon={Search}
                  />
                  <ProcessStep 
                    number="2"
                    title="Consultez les détails"
                    description="Lisez attentivement les critères, exigences et pièces à fournir pour la candidature"
                    icon={FileText}
                  />
                  <ProcessStep 
                    number="3"
                    title="Soumettez votre dossier"
                    description="Remplissez le formulaire intelligent et attachez tous les documents requis"
                    icon={UserCheck}
                  />
                  <ProcessStep 
                    number="4"
                    title="Suivez votre candidature"
                    description="Vérifiez l'état de votre dossier à tout moment avec votre email ou téléphone"
                    icon={TrendingUp}
                    isLast={true}
                  />
                </div>
              ) : (
                <div>
                  <ProcessStep 
                    number="1"
                    title="Créez votre compte"
                    description="Inscription simple avec vérification par nos administrateurs pour garantir la légitimité"
                    icon={UserCheck}
                  />
                  <ProcessStep 
                    number="2"
                    title="Lancez votre campagne"
                    description="Définissez les critères, pièces requises, dates limites et générez votre lien public"
                    icon={Target}
                  />
                  <ProcessStep 
                    number="3"
                    title="Gérez les candidatures"
                    description="Suivez en temps réel, filtrez, acceptez ou rejetez les dossiers depuis votre tableau de bord"
                    icon={BarChart3}
                  />
                  <ProcessStep 
                    number="4"
                    title="Finalisez le processus"
                    description="Organisez les étapes suivantes (tests, entretiens) et communiquez les résultats finaux"
                    icon={Award}
                    isLast={true}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div className="mockup-phone border-accent">
                <div className="camera"></div>
                <div className="display">
                  <div className="artboard artboard-demo phone-1 bg-gradient-to-br from-accent/10 to-primary/10 p-6">
                    <div className="text-center">
                      <div className="avatar mb-4">
                        <div className="w-16 rounded-full bg-accent/20">
                          {activeTab === 'candidats' ? 
                            <Users className="w-8 h-8 text-accent m-4" /> : 
                            <Building2 className="w-8 h-8 text-accent m-4" />
                          }
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        {activeTab === 'candidats' ? 'Interface Candidat' : 'Dashboard Organisation'}
                      </h3>
                      <p className="text-sm text-base-content/70 mb-4">
                        {activeTab === 'candidats' ? 
                          "Suivez facilement l'état de vos candidatures" : 
                          "Gérez toutes vos campagnes en un seul endroit"}
                      </p>
                      <div className="flex justify-center gap-2">
                        <div className="badge badge-accent badge-sm">En cours</div>
                        <div className="badge badge-success badge-sm">Accepté</div>
                        <div className="badge badge-error badge-sm">Rejeté</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Qui peut utiliser <span className="text-accent">SubmitEase</span> ?
            </h2>
            <p className="text-xl text-base-content/70">
              Notre plateforme s'adapte à tous types d'organisations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <Heart className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="card-title text-xl mb-2">ONG</h3>
                <p className="text-base-content/70">
                  Recrutement de bénévoles, sélection de bénéficiaires, appels à projets
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <GraduationCap className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="card-title text-xl mb-2">Écoles & Universités</h3>
                <p className="text-base-content/70">
                  Admissions, concours d'entrée, sélection de bourses
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <Briefcase className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="card-title text-xl mb-2">Entreprises</h3>
                <p className="text-base-content/70">
                  Recrutement d'employés, stages, formations professionnelles
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <Building2 className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="card-title text-xl mb-2">Institutions</h3>
                <p className="text-base-content/70">
                  Concours publics, sélections officielles, appels d'offres
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à révolutionner vos recrutements ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les centaines d'organisations qui font confiance à SubmitEase
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-lg bg-white text-accent hover:bg-base-100 border-none shadow-lg transform hover:scale-105 transition-all duration-300">
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-accent transition-all duration-300">
              Demander une démo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Submit<span className="text-accent">Ease</span>
              </h3>
              <p className="text-base-content/70">
                La plateforme de gestion de candidatures qui simplifie vos processus de recrutement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-base-content/70">
                <li><a href="#" className="hover:text-accent transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Sécurité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-base-content/70">
                <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-base-content/70">
                <li><a href="#" className="hover:text-accent transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Carrières</a></li>
              </ul>
            </div>
          </div>
          <div className="divider"></div>
          <div className="text-center text-base-content/70">
            <p>&copy; 2025 SubmitEase. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}



