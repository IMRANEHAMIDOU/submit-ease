import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  BarChart3,
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number; // facultatif
  color: string;
  description?: string;
  loading?: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend = 0,
  color,
  description,
  loading = false,
}) => {
  return (
    <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300/50">
      <div className="card-body p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div
              className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 shadow-lg text-base-100`}
            >
              {icon}
            </div>
            <h3 className="text-base-content/70 text-sm font-medium mb-1">{title}</h3>
            {loading ? (
              <div className="skeleton h-8 w-20"></div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-base-content">{value}</span>
                {trend !== undefined && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      trend >= 0 ? "bg-success/10 text-success" : "bg-error/10 text-error"
                    }`}
                  >
                    {trend >= 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(trend)}%
                  </div>
                )}
              </div>
            )}
            {description && (
              <p className="text-base-content/50 text-xs mt-2">{description}</p>
            )}
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
              <MoreHorizontal className="w-4 h-4" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
            >
              <li>
                <a className="text-sm">
                  <Eye className="w-4 h-4" /> Voir détails
                </a>
              </li>
              <li>
                <a className="text-sm">
                  <BarChart3 className="w-4 h-4" /> Statistiques
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
