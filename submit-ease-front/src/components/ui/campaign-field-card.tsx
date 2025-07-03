import type { CampaignFieldType, FieldType } from "../../types/type";

type Props = {
  field: CampaignFieldType;
  index: number;
  onUpdate: (index: number, field: CampaignFieldType) => void;
  onDelete: (index: number) => void;
};

const fieldTypeOptions: { value: FieldType; label: string }[] = [
  { value: "text", label: "Texte" },
  { value: "textarea", label: "Zone de texte" },
  { value: "file", label: "Fichier" },
  { value: "radio", label: "Choix unique" },
  { value: "checkbox", label: "Cases à cocher" },
];

export default function CampaignFieldCard({ field, index, onUpdate, onDelete }: Props) {
  const handleInputChange = (key: keyof CampaignFieldType, value: any) => {
    onUpdate(index, {
      ...field,
      [key]: value,
    });
  };

  const needsOptions = field.field_type === "radio" || field.field_type === "checkbox";

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm p-4 mb-5">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-base text-gray-800">Champ {index + 1}</h4>
        <button
          type="button"
          className="btn btn-sm btn-circle btn-error"
          onClick={() => onDelete(index)}
          title="Supprimer ce champ"
        >
          ×
        </button>
      </div>

      {/* Contenu du champ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Label *</span>
          </label>
          <input
            type="text"
            placeholder="Nom du champ"
            className="input input-bordered input-sm focus:input-primary"
            value={field.label}
            onChange={(e) => handleInputChange("label", e.target.value)}
            required
          />
        </div>

        {/* Type de champ */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Type *</span>
          </label>
          <select
            className="select select-bordered select-sm focus:select-primary"
            value={field.field_type}
            onChange={(e) => handleInputChange("field_type", e.target.value as FieldType)}
          >
            {fieldTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea
            placeholder="Description du champ"
            className="textarea textarea-bordered textarea-sm focus:textarea-primary h-16 resize-none"
            value={field.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        {/* Options si besoin */}
        {needsOptions && (
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Options (une par ligne)</span>
            </label>
            <textarea
              placeholder="Option 1&#10;Option 2&#10;Option 3"
              className="textarea textarea-bordered textarea-sm focus:textarea-primary h-20 resize-none"
              value={field.options || ""}
              onChange={(e) => handleInputChange("options", e.target.value)}
            />
          </div>
        )}

        {/* Ordre */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Ordre</span>
          </label>
          <input
            type="number"
            min="1"
            className="input input-bordered input-sm focus:input-primary"
            value={field.order_number}
            onChange={(e) => handleInputChange("order_number", Number(e.target.value))}
          />
        </div>

        {/* Obligatoire */}
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={field.is_required}
              onChange={(e) => handleInputChange("is_required", e.target.checked)}
            />
            <span className="label-text font-medium">Obligatoire</span>
          </label>
        </div>
      </div>
    </div>
  );
}
