import { useState } from 'react';
import { 
  Eye, 
  Mail, 
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import type { CandidateApplicationType } from '../../types/type';
import { formatDate } from '../../utils/utils';
import CandidateApplicationShow from './candidate-application-show';
import { apiGetCandidateApplication } from '../../services/candidate-application-api';



const CandidateApplicationsTable = ({candidate_applications}: {candidate_applications:CandidateApplicationType[]}) => {
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplicationType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [loadingDetails, setLoadingDetails] = useState(false)

  // === Utils ===
  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "badge-warning",
      accepted: "badge-success",
      rejected: "badge-error"
    };
    const texts = {
      pending: "En attente",
      accepted: "Acceptée",
      rejected: "Rejetée"
    };
    return { style: styles[status] || "badge-neutral", text: texts[status] || "Inconnu" };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };


const handleViewDetails = async (id: number) => {
  setLoadingDetails(true)
  try {
    const data = await apiGetCandidateApplication(id);
    setSelectedApplication(data);
    setIsDetailModalOpen(true);
  } catch (error) {
    console.error("Erreur lors du chargement des détails:", error);
  } finally {
    setLoadingDetails(false);
  }
}

  // === Filtrage ===
  const filteredApplications = candidate_applications.filter((app:CandidateApplicationType) => 
    statusFilter === 'all' || app.application_status == statusFilter
  );

  console.log(candidate_applications)

  // === Render ===
  return (
    <div className="min-h-screen bg-base-200/50 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-base-content mb-2">Candidatures</h1>
          <p className="text-base-content/70">Gérez les candidatures reçues pour vos campagnes</p>
        </div>

        {/* Filtres */}
        <div className="card bg-base-100 shadow-sm border border-base-300 mb-6">
          <div className="card-body">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-medium">Statut :</span>
                <select 
                  className="select select-bordered select-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous</option>
                  <option value="pending">En attente</option>
                  <option value="accepted">Acceptées</option>
                  <option value="rejected">Rejetées</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <span>Total : {filteredApplications.length} candidature{filteredApplications.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Numéro Dossier</th>
                    <th>Candidat</th>
                    <th>Contact</th>
                    <th>Statut</th>
                    <th>Note Dossier</th>
                    <th>Note Test Écrit</th>
                    <th>Date</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app: CandidateApplicationType) => {
                    const badge = getStatusBadge(app.application_status);
                    return (
                      <tr key={app.id} className="hover">
                        <td>
                          <div className="font-medium">{app.registration_number}</div>
                        </td>
                        <td>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-3 h-3" />
                              <span>{app.user?.email || '-'}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-medium">{app.user?.phone}</div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(app.application_status)}
                            <span className={`badge ${badge.style} badge-sm`}>{badge.text}</span>
                          </div>
                        </td>
                        <td>{app.application_score ?? '-'}</td>
                        <td>{app.writen_test_average ?? '-'}</td>
                        <td>{formatDate(app.created_at)}</td>
                        <td>
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              className="btn btn-ghost btn-xs"
                              onClick={() => handleViewDetails(app.id)}
                              title="Voir les détails"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal détails */}
        {isDetailModalOpen && selectedApplication && (
          <CandidateApplicationShow application={selectedApplication} onClose={() => setIsDetailModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default CandidateApplicationsTable;
