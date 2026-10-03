import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  ShieldCheck,
  ArrowLeftRight,
  LayoutDashboard,
  Users,
  UserCheck,
  Bus,
  AlertTriangle,
  FileText,
  Shield,
  Settings,
  Activity,
  Sunrise,
  Sunset,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDismissal } from "../../context";

const NAV_TITLES = {
  dashboard: { label: "Admin Dashboard", icon: LayoutDashboard },
  "morning-drop-off": { label: "Morning Drop-Off", icon: Sunrise },
  "afternoon-pick-up": { label: "Afternoon Pick-Up", icon: Sunset },
  students: { label: "Students", icon: Users },
  parents: { label: "Parents / Guardians", icon: UserCheck },
  queue: { label: "Live Queue", icon: Clock },
  buses: { label: "Bus Management", icon: Bus },
  gates: { label: "Gate Control", icon: ShieldCheck },
  late: { label: "Late Arrivals & Fees", icon: AlertTriangle },
  reports: { label: "Reports & Audit", icon: FileText },
  users: { label: "Users & Roles", icon: Shield },
  settings: { label: "Settings", icon: Settings },
};

const formatCurrentDate = (date = new Date()) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function AdminHeader({
  activeNav = "dashboard",
  currentTime: propCurrentTime,
  currentDate: propCurrentDate,
  dateString,
}) {
  const navigate = useNavigate();
  const dismissal = useDismissal();

  const [liveDate, setLiveDate] = useState(() => formatCurrentDate());

  useEffect(() => {
    const updateDate = () => {
      setLiveDate(formatCurrentDate());
    };
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  const currentInfo = NAV_TITLES[activeNav] || {
    label: "Admin Workspace",
    icon: LayoutDashboard,
  };
  const Icon = currentInfo.icon;

  const displayTime = propCurrentTime ?? dismissal?.currentTime;
  const displayDate =
    dateString ??
    propCurrentDate ??
    dismissal?.formattedDate ??
    liveDate;

  return (
    <header className="admin-top-bar">
      {/* Left: Active Page Title */}
      <div className="admin-header-left">
        <div className="admin-page-title-group">
          <h1>
            <Icon size={22} className="admin-header-icon" />
            <span>{currentInfo.label}</span>
          </h1>
          <span className="admin-command-tag">
            <Activity size={12} />
            <span>Live Campus Systems</span>
          </span>
        </div>
      </div>

      {/* Right: Date, Clock & Parent App Switch */}
      <div className="admin-header-right">
        {/* Date & System Clock */}
        <div
          className="admin-time-pill"
          title="Moon School Automated System Clock"
        >
          <Calendar size={15} color="#0284c7" />
          <span>{displayDate}</span>
          <span style={{ color: "#94a3b8", margin: "0 2px" }}>|</span>
          <Clock size={15} color="#0284c7" />
          <span>{displayTime || "8:25 AM"}</span>
        </div>

        {/* Switch to Parent App */}
        <button
          className="admin-parent-app-btn"
          onClick={() => navigate("/dashboard")}
          title="Return to parent app view"
        >
          <ArrowLeftRight size={15} />
          <span>Parent App</span>
        </button>
      </div>
    </header>
  );
}
