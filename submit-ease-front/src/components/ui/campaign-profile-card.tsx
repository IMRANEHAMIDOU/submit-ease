import { X } from "lucide-react";
import type { CampaignProfileType } from "../../types/type";

type Props = {
  profile: CampaignProfileType;
  index: number;
  onUpdate: (index: number, profile: CampaignProfileType) => void;
  onDelete: (index: number) => void;
};

export default function CampaignProfileCard({ profile, index, onUpdate, onDelete }: Props) {
  const handleInputChange = (key: keyof CampaignProfileType, value: any) => {
    onUpdate(index, {
      ...profile,
      [key]: value
    });
  };

  return (
    <div className="card bg-base-100 border border-base-300 p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-md">Profil {index + 1}</h4>
        <button 
          type="button"
          className="btn btn-sm btn-circle btn-error"
          onClick={() => onDelete(index)}
        >
          <X className="text-white"/>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Nom du profil */}
        <div className="form-control">
          <label className="label block">
            <span className="label-text">Nom du profil *</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Développeur Frontend"
            className="input input-bordered input-sm"
            value={profile.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        {/* Positions disponibles */}
        <div className="form-control">
          <label className="label block">
            <span className="label-text">Nombre disponibles *</span>
          </label>
          <input
            type="number"
            min="1"
            placeholder="1"
            className="input input-bordered input-sm"
            value={profile.positions_available}
            onChange={(e) => handleInputChange('positions_available', Number(e.target.value))}
            required
          />
        </div>

        {/* Description */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="Description du profil recherché"
            className="textarea textarea-bordered textarea-sm h-20"
            value={profile.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}