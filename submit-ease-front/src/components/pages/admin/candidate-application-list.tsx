import { useState } from 'react';
import { 
  Eye, 
  Mail, 
  Phone, 
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Trash2
} from 'lucide-react';
import type { CandidateApplicationType } from '../../../types/type';
import { formatDate } from '../../../utils/utils';
import CandidateApplicationShow from './candidate-application-show';

// Données mock
const mockApplications: CandidateApplicationType[] = [
  {
    id: 1,
    registration_number: "CA-2025-001",
    user_id: 1,
    campaign_id: 1,
    campaign_profile_id: 1,
    organization_id: 1,
    application_status: 'pending',
    status_reason: "",
    application_score: 8,
    writen_test_average: 15.5,
    interview_test_authorized: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    registration_number: "CA-2025-002",
    user_id: 2,
    campaign_id: 1,
    campaign_profile_id: 2,
    organization_id: 1,
    application_status: 'pending',
    status_reason: "",
    application_score: 9,
    writen_test_average: 17.0,
    interview_test_authorized: true,
    created_at: "2024-01-14T14:15:00Z",
    updated_at: "2024-01-16T09:00:00Z",
  },
  {
    id: 3,
    registration_number: "CA-2025-003",
    user_id: 3,
    campaign_id: 1,
    campaign_profile_id: 1,
    organization_id: 1,
    application_status: 'rejected',
    status_reason: "Expérience insuffisante",
    application_score: 5,
    writen_test_average: 9.0,
    interview_test_authorized: false,
    created_at: "2024-01-13T16:45:00Z",
    updated_at: "2024-01-17T11:30:00Z",
  },
];

const CandidateApplicationsTable = () => {
  const [applications, setApplications] = useState<CandidateApplicationType[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplicationType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

  // === Actions ===
  const handleViewDetails = (application: CandidateApplicationType) => {
    setSelectedApplication(application);
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = (applicationId: number, newStatus: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId
          ? { ...app, application_status: newStatus as 'pending' | 'accepted' | 'rejected' }
          : app
      )
    );
  };

  const handleDeleteApplication = (applicationId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      setApplications(prev => prev.filter(app => app.id !== applicationId));
    }
  };

  // === Filtrage ===
  const filteredApplications = applications.filter(app => 
    statusFilter === 'all' || app.application_status === statusFilter
  );

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
              <div className="flex items-center gap-2">
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
                  {filteredApplications.map((app) => {
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
                            {app.user?.phone && (
                              <div className="flex items-center gap-2 text-sm text-base-content/70">
                                <Phone className="w-3 h-3" />
                                <span>{app.user.phone}</span>
                              </div>
                            )}
                          </div>
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
                              onClick={() => handleViewDetails(app)}
                              title="Voir les détails"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                                <MoreVertical className="w-4 h-4" />
                              </div>
                              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                                {app.application_status === 'pending' && (
                                  <>
                                    <li>
                                      <a onClick={() => handleUpdateStatus(app.id, 'accepted')}>
                                        <CheckCircle className="w-4 h-4 text-success" /> Accepter
                                      </a>
                                    </li>
                                    <li>
                                      <a onClick={() => handleUpdateStatus(app.id, 'rejected')}>
                                        <XCircle className="w-4 h-4 text-error" /> Rejeter
                                      </a>
                                    </li>
                                  </>
                                )}
                                {app.application_status !== 'pending' && (
                                  <li>
                                    <a onClick={() => handleUpdateStatus(app.id, 'pending')}>
                                      <Clock className="w-4 h-4 text-warning" /> Remettre en attente
                                    </a>
                                  </li>
                                )}
                                <li>
                                  <a onClick={() => handleDeleteApplication(app.id)}>
                                    <Trash2 className="w-4 h-4 text-error" /> Supprimer
                                  </a>
                                </li>
                              </ul>
                            </div>
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
