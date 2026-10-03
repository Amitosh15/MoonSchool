import {
  Users,
  UserCheck,
  Bus,
  ShieldCheck,
  Sunrise,
  ArrowRight,
  Clock,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminOverviewDashboard({ onShowNotice }) {
  const navigate = useNavigate();

  const handleAction = (link, msg) => {
    if (link) navigate(link);
    if (onShowNotice && msg) onShowNotice(msg);
  };

  const statCards = [
    {
      id: "students",
      label: "Total Students",
      value: "842",
      badge: "+14 This Term",
      badgeType: "positive",
      icon: Users,
      color: "#00a896",
      link: "/admin/students",
    },
    {
      id: "parents",
      label: "Registered Guardians",
      value: "612",
      badge: "608 Verified",
      badgeType: "positive",
      icon: UserCheck,
      color: "#134074",
      link: "/admin/parents",
    },
    {
      id: "buses",
      label: "Transit Fleet",
      value: "8 Buses",
      badge: "GPS Active",
      badgeType: "positive",
      icon: Bus,
      color: "#f4a261",
      link: "/admin/buses",
    },
    {
      id: "gates",
      label: "Automated Gates",
      value: "2 Gates",
      badge: "Auto Open",
      badgeType: "positive",
      icon: ShieldCheck,
      color: "#10b981",
      link: "/admin/gates",
    },
  ];

  return (
    <div className="admin-overview-dashboard">
      {/* Featured Banner: Morning School Drop-Off */}
      <div className="admin-banner-card">
        <div className="admin-banner-content">
          <span className="admin-banner-badge">
            <Sunrise size={13} />
            <span>Active Operations • 8:05 AM – 8:30 AM</span>
          </span>
          <h2>Morning School Drop-Off Dashboard</h2>
          <p>
            Real-time telemetry, automated gate loop sensors, Parent/Bus/Third Party verification,
            and lobby check-in for late arrivals (post-8:30 AM).
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="admin-stats-grid">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="stat-metric-card"
              onClick={() => navigate(stat.link)}
              style={{ cursor: "pointer" }}
              title={`Click to view ${stat.label}`}
            >
              <div className="stat-card-top">
                <span className="stat-card-label">{stat.label}</span>
                <div
                  className="stat-card-icon"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    color: stat.color,
                  }}
                >
                  <Icon size={20} />
                </div>
              </div>
              <div className="stat-card-val-row">
                <span className="stat-card-value">{stat.value}</span>
                <span className={`stat-card-badge ${stat.badgeType}`}>
                  {stat.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
