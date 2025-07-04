import { useEffect, useState } from 'react';
import CampaignCard from './campaign-card';
import { apiPublicCampaigns } from '../../../services/campaign-api';
import type { CampaignType } from '../../../types/type';
import Loading from '../../ui/loading';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await apiPublicCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error("Erreur lors du chargement des campagnes :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors pt-20">
      <section className="py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-4">
              Campagnes de <span className="text-accent">Recrutement</span>
            </h1>
            <p className="text-center text-base-content/70 max-w-2xl mx-auto">
              Découvrez nos opportunités de carrière et postulez aux postes qui correspondent à votre profil.
            </p>
          </div>

          {loading ? (
            <Loading />
          ) : campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <CampaignCard campaign={campaign} key={campaign.id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">Aucune campagne disponible</h3>
              <p className="text-base-content/70">
                Revenez bientôt pour découvrir de nouvelles opportunités !
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Campaigns;
