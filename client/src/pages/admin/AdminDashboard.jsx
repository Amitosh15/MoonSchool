import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDismissal } from "../../context";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminOverviewDashboard from "./AdminOverviewDashboard";
import AdminMorningDropOff from "./AdminMorningDropOff";
import AdminModuleView from "./AdminModuleView";
import "./admin.css";

export default function AdminDashboard() {
  const { tabParam } = useParams();
  const navigate = useNavigate();
  const dismissal = useDismissal();

  // Active navigation synced with URL parameter (/admin/:tabParam)
  const activeNav = tabParam || "dashboard";

  const [noticeMessage, setNoticeMessage] = useState(null);

  // Auto-dismiss notice banner
  useEffect(() => {
    if (noticeMessage) {
      const timer = setTimeout(() => setNoticeMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [noticeMessage]);

  const handleShowNotice = (msg) => {
    setNoticeMessage(msg);
  };

  return (
    <div className="admin-container">
      {/* Admin Sidebar Navigation (Fixed, not scrollable) */}
      <AdminSidebar activeNav={activeNav} onShowNotice={handleShowNotice} />

      {/* Main Admin Workspace */}
      <div className="admin-main">
        {/* Admin Top Bar */}
        <AdminHeader
          activeNav={activeNav}
          currentTime={dismissal?.currentTime}
          currentDate={dismissal?.formattedDate}
        />

        {/* Informational Toast Notice */}
        {noticeMessage && (
          <div className="admin-hint-banner">
            <span>ℹ️ {noticeMessage}</span>
            <button
              onClick={() => setNoticeMessage(null)}
              className="admin-hint-close"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        )}

        {/* Scrollable Main Content Area */}
        <div className="admin-content-scrollable">
          {activeNav === "dashboard" ? (
            <AdminOverviewDashboard onShowNotice={handleShowNotice} />
          ) : activeNav === "morning-drop-off" ? (
            <AdminMorningDropOff onShowNotice={handleShowNotice} />
          ) : (
            <AdminModuleView
              activeNav={activeNav}
              onShowNotice={handleShowNotice}
            />
          )}
        </div>
      </div>
    </div>
  );
}
