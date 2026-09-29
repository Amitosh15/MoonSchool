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
import Home from "./pages/Home";
import AuthPortal from "./pages/auth/AuthPortal";
import { AppProviders, useAuth, useDismissal, useUI } from "./context";

function MyChildrenView() {
  return (
    <div style={{ padding: "24px", color: "#e2e8f0" }}>
      My Children view is coming soon.
    </div>
  );
}

function ActivityHistory() {
  return (
    <div style={{ padding: "24px", color: "#e2e8f0" }}>
      Activity History is coming soon.
    </div>
  );
}

function HelpView() {
  return (
    <div style={{ padding: "24px", color: "#e2e8f0" }}>
      Help &amp; Safety Policy is coming soon.
    </div>
  );
}

// Protected Route component: Redirects unauthenticated users to /login
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Root redirect: Send authenticated users to /dashboard/home, unauthenticated to /login
function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return (
    <Navigate to={isAuthenticated ? "/dashboard/home" : "/login"} replace />
  );
}

// Dashboard layout component that syncs active tab with URL and context
function DashboardLayout() {
  const { tabParam } = useParams();
  const navigate = useNavigate();
  const activeTab = tabParam || "home";

  const { student, studentsList, setSelectedStudentId, parentUser, logout } =
    useAuth();
  const {
    currentScenario,
    currentTime,
    isLateMorning,
    dropOffStatus,
    selectedLane,
    setSelectedLane,
    handleSelectScenario,
    handleConfirmDropOff,
    handleCheckInLate,
  } = useDismissal();
  const { openCarTag, openBusTracking, openPayments } = useUI();

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
        currentTime={currentTime}
        parentUser={parentUser}
        onLogout={logout}
        currentScenario={currentScenario}
        onSelectScenario={handleSelectScenario}
      />

      {/* Quick Scenario Bar directly under header */}
      <div className="scenario-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontWeight: 800,
              color: "#f4a261",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            System Time & Stage:
          </span>
          <span style={{ color: "#cbd5e1" }}>
            Select scenario to preview each workflow:
          </span>
        </div>
        <div className="scenario-buttons-group">
          <button
            className={`scenario-chip ${currentScenario === "morning_regular" ? "active" : ""}`}
            onClick={() => handleSelectScenario("morning_regular")}
          >
            <span>☀️ Morning On-Time (8:02 AM)</span>
          </button>
          <button
            className={`scenario-chip ${currentScenario === "morning_late" ? "active" : ""}`}
            onClick={() => handleSelectScenario("morning_late")}
          >
            <span>⚠️ Morning Late (8:35 AM)</span>
          </button>
          <button
            className={`scenario-chip ${currentScenario === "afternoon_queue" ? "active" : ""}`}
            onClick={() => handleSelectScenario("afternoon_queue")}
          >
            <span>🚗 Afternoon Queue (3:15 PM)</span>
          </button>
          <button
            className={`scenario-chip ${currentScenario === "afternoon_open" ? "active" : ""}`}
            onClick={() => handleSelectScenario("afternoon_open")}
          >
            <span>🏁 Gate Open & Pole 7 (3:35 PM)</span>
          </button>
          <button
            className={`scenario-chip late ${currentScenario === "afternoon_late" ? "active" : ""}`}
            onClick={() => handleSelectScenario("afternoon_late")}
          >
            <span>🚨 Late Fee $1/min (4:08 PM)</span>
          </button>
        </div>
      </div>

      <div className="main-body">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          student={student}
        />

        {/* Content Area */}
        <main className="content-area">
          {activeTab === "home" && (
            <Home
              student={student}
              parentUser={parentUser}
              currentTime={currentTime}
              onNavigate={handleTabChange}
              dropOffStatus={dropOffStatus}
              pickUpStatus={null}
              onOpenCarTag={openCarTag}
              onOpenTeacherScan={() => {}}
              lateFeeTotal={0}
            />
          )}
          {activeTab === "dropoff" && (
            <MorningDropOff
              student={student}
              studentsList={studentsList}
              onSelectStudent={setSelectedStudentId}
              parentUser={parentUser}
              currentTime={currentTime}
              isLateMorning={isLateMorning}
              dropOffStatus={dropOffStatus}
              onConfirmDropOff={handleConfirmDropOff}
              onCheckInLate={handleCheckInLate}
              onOpenCarTag={openCarTag}
              selectedLane={selectedLane}
              setSelectedLane={setSelectedLane}
            />
          )}
          {activeTab === "pickup" && <AfternoonPickUp />}
          {activeTab === "children" && <MyChildrenView />}
          {activeTab === "history" && <ActivityHistory />}
          {activeTab === "help" && <HelpView />}
        </main>
      </div>

      {/* All Application Modals Connected via Context */}
      {/* <AppModals /> */}
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

        {/* Dashboard Routes - Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:tabParam"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* Default Fallback Routes */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </AppProviders>
  );
}
