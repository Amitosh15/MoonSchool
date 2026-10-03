import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MorningDropOff from "./pages/MorningDropOff";
import AfternoonPickUp from "./pages/AfternoonPickUp";
import HomeOverview from "./pages/HomeOverview";
import MyChildrenView from "./pages/MyChildrenView";
import ActivityHistory from "./pages/ActivityHistory";
import HelpView from "./pages/HelpView"
import AuthPortal from "./pages/auth/AuthPortal";
import { AppProviders, useAuth, useDismissal, useUI } from "./context";
import AppModals from "./components/AppModals";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Dashboard layout component that syncs active tab with URL and context
function DashboardLayout() {
  const { tabParam } = useParams();
  const navigate = useNavigate();
  const activeTab = tabParam || "dropoff";
  const { parentUser, logout } = useAuth();

  const { currentScenario, handleSelectScenario } = useDismissal();
  const {
    openCarTag,
    openBusTracking,
    openPayments,
    openNotifications,
    unreadNotifications,
  } = useUI();

  const handleTabChange = (tab) => {
    if (tab === "bus") {
      openBusTracking();
    } else if (tab === "payments") {
      openPayments();
    } else {
      navigate(`/dashboard/${tab}`);
    }
  };

  return (
    <div className="app-container">
      {/* Top Header with Brand, Clock, and Scenario Switcher */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenNotifications={openNotifications}
        unreadNotifications={unreadNotifications}
        parentUser={parentUser}
        onLogout={logout}
      />

      <div className="main-body">
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

        {/* Content Area */}
        <main className="content-area">
          {activeTab === "home" && (
            <HomeOverview
              onNavigate={handleTabChange}
              onOpenCarTag={openCarTag}
            />
          )}
          {activeTab === "dropoff" && <MorningDropOff />}
          {activeTab === "pickup" && <AfternoonPickUp />}
          {activeTab === "children" && <MyChildrenView />}
          {activeTab === "history" && <ActivityHistory />}
          {activeTab === "help" && <HelpView />}
        </main>
      </div>

      {/* All Application Modals Connected via Context */}
      <AppModals />
    </div>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Routes>
        {/* Auth Portal Routes */}
        <Route path="/login" element={<AuthPortal initialTab="login" />} />
        <Route path="/signup" element={<AuthPortal initialTab="signup" />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />

        {/* Parent Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/dashboard/:tabParam" element={<DashboardLayout />} />

        {/* Admin Command Center Dashboard Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/:tabParam" element={<AdminDashboard />} />

        {/* Default Fallback Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AppProviders>
  );
}
