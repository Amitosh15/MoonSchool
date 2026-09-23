import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MorningDropOff from "./pages/MorningDropOff";
import AfternoonPickUp from "./pages/AfternoonPickUp";
// import HomeOverview from "./components/HomeOverview";
// import MyChildrenView from "./components/MyChildrenView";
// import ActivityHistory from "./components/ActivityHistory";
// import HelpView from "./components/HelpView";
import CarTagModal from "./pages/CarTagModal";
// import TeacherScanModal from "./components/TeacherScanModal";
// import BusTrackingModal from "./components/BusTrackingModal";
// import PaymentsModal from "./components/PaymentsModal";
import NotificationsModal from "./pages/NotificationModal";

import { STUDENTS, PARENT_USER, INITIAL_ACTIVITY_LOGS } from "./data/mocData";
import Home from "./pages/Home";

export default function App() {
  // Navigation & Child Selection
  const [activeTab, setActiveTab] = useState("home");
  const [selectedStudentId, setSelectedStudentId] = useState("MS-001");
  const [selectedLane, setSelectedLane] = useState(2);

  // Scenario Simulation
  const [currentScenario, setCurrentScenario] = useState("morning_regular");
  const [currentTime, setCurrentTime] = useState("8:02 AM");
  const [isLateMorning, setIsLateMorning] = useState(false);
  const [isLateAfternoon, setIsLateAfternoon] = useState(false);
  // const [lateFeeMinutes, setLateFeeMinutes] = useState(0);
  const [lateFeeTotal, setLateFeeTotal] = useState(0);

  // Process States
  const [dropOffStatus, setDropOffStatus] = useState("in_progress"); // 'in_progress' | 'confirmed' | 'late_checked_in'
  const [pickUpStatus, setPickUpStatus] = useState("not_checked_in"); // 'not_checked_in' | 'in_queue' | 'pole_assigned' | 'completed'

  // Modals
  const [isCarTagOpen, setIsCarTagOpen] = useState(false);
  // const [isTeacherScanOpen, setIsTeacherScanOpen] = useState(false);
  // const [isBusTrackingOpen, setIsBusTrackingOpen] = useState(false);
  // const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);

  const student =
    STUDENTS.find((s) => s.id === selectedStudentId) || STUDENTS[0];

  // Scenario Switcher Logic
  const handleSelectScenario = (scenarioKey) => {
    setCurrentScenario(scenarioKey);

    switch (scenarioKey) {
      case "morning_regular":
        setCurrentTime("8:02 AM");
        setIsLateMorning(false);
        setIsLateAfternoon(false);
        setDropOffStatus("in_progress");
        setPickUpStatus("not_checked_in");
        setLateFeeMinutes(0);
        setLateFeeTotal(0);
        setSelectedLane(2);
        setActiveTab("dropoff");
        break;

      case "morning_late":
        setCurrentTime("8:35 AM");
        setIsLateMorning(true);
        setIsLateAfternoon(false);
        setDropOffStatus("in_progress");
        setPickUpStatus("not_checked_in");
        setLateFeeMinutes(0);
        setLateFeeTotal(0);
        setSelectedLane(1);
        setActiveTab("dropoff");
        break;

      case "afternoon_queue":
        setCurrentTime("3:15 PM");
        setIsLateMorning(false);
        setIsLateAfternoon(false);
        setDropOffStatus("confirmed");
        setPickUpStatus("in_queue");
        setLateFeeMinutes(0);
        setLateFeeTotal(0);
        setSelectedLane(3);
        setActiveTab("pickup");
        break;

      case "afternoon_open":
        setCurrentTime("3:35 PM");
        setIsLateMorning(false);
        setIsLateAfternoon(false);
        setDropOffStatus("confirmed");
        setPickUpStatus("pole_assigned");
        setLateFeeMinutes(0);
        setLateFeeTotal(0);
        setSelectedLane(3);
        setActiveTab("pickup");
        break;

      case "afternoon_late":
        setCurrentTime("4:08 PM");
        setIsLateMorning(false);
        setIsLateAfternoon(true);
        setDropOffStatus("confirmed");
        setPickUpStatus("in_queue");
        setLateFeeMinutes(8);
        setLateFeeTotal(8);
        setSelectedLane(3);
        setActiveTab("pickup");
        break;

      default:
        break;
    }
  };

  // Actions
  const handleConfirmDropOff = (receipt) => {
    setDropOffStatus("confirmed");
    const newLog = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      date: "Today, Sept 14, 2026",
      time: currentTime,
      type: "Morning Drop-Off",
      student: `${student.name} (${student.id})`,
      transporter: receipt.transporter,
      vehicle: receipt.vehicle,
      location: `Gate 2 - ${receipt.lane}`,
      status: "Confirmed Present",
      notes: "Drop-off timestamp recorded in system.",
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  const handleCheckInLate = (receipt) => {
    setDropOffStatus("late_checked_in");
    const newLog = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      date: "Today, Sept 14, 2026",
      time: currentTime,
      type: "Late Morning Drop-Off",
      student: `${student.name} (${student.id})`,
      transporter: receipt.transporter,
      vehicle: receipt.vehicle,
      location: "School Lobby (Post-Gate Close)",
      status: "Lobby Check-In",
      notes:
        "Checked in late after 8:30 AM gate closure. Escorted to reception.",
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  const handleCheckInPickUp = (data) => {
    setPickUpStatus("pole_assigned");
  };

  const handleConfirmPickUp = () => {
    setPickUpStatus("completed");
    const newLog = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      date: "Today, Sept 14, 2026",
      time: currentTime,
      type: isLateAfternoon ? "Late Afternoon Pick-Up" : "Afternoon Pick-Up",
      student: `${student.name} (${student.id})`,
      transporter: `Parent (${PARENT_USER.name})`,
      vehicle: PARENT_USER.vehicle,
      location: isLateAfternoon
        ? "School Lobby Reception"
        : `Pole ${student.assignedPole || 7} (Lane ${selectedLane})`,
      status: "Student Released",
      lateFee: isLateAfternoon ? `$${lateFeeTotal}.00` : null,
      verifiedBy: "Ms. Higgins (Teacher QR Scan)",
      notes: isLateAfternoon
        ? "Released in lobby after gate closure."
        : "Student safely released curbside.",
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  return (
    <div className="app-container">
      {/* Top Header with Brand, Clock, and Scenario Switcher */}
      <Header
        currentScenario={currentScenario}
        onSelectScenario={handleSelectScenario}
        currentTime={currentTime}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadNotifications={unreadNotifications}
        onOpenNotifications={() => {
          setIsNotificationsOpen(true);
          setUnreadNotifications(0);
        }}
        parentUser={PARENT_USER}
      />

      {/* Quick Scenario Bar directly under header */}
      {/* <div className="scenario-bar">
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
      </div> */}

      <div className="main-body">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === "bus") {
              setIsBusTrackingOpen(true);
            } else if (tab === "payments") {
              setIsPaymentsOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          onOpenCarTag={() => setIsCarTagOpen(true)}
          onOpenTeacherScan={() => setIsTeacherScanOpen(true)}
          lateFeeTotal={lateFeeTotal}
          student={student}
        />

        {/* Content Area */}
        <main className="content-area">
          {activeTab === "home" && (
            <Home
              student={student}
              parentUser={PARENT_USER}
              currentTime={currentTime}
              onNavigate={(tab) => {
                if (tab === "bus") setIsBusTrackingOpen(true);
                else setActiveTab(tab);
              }}
              dropOffStatus={dropOffStatus}
              pickUpStatus={pickUpStatus}
              onOpenCarTag={() => setIsCarTagOpen(true)}
              onOpenTeacherScan={() => setIsTeacherScanOpen(true)}
              lateFeeTotal={lateFeeTotal}
            />
          )}

          {/* {activeTab === "dropoff" && (
            <MorningDropOff
              student={student}
              studentsList={STUDENTS}
              onSelectStudent={setSelectedStudentId}
              parentUser={PARENT_USER}
              currentTime={currentTime}
              isLateMorning={isLateMorning}
              dropOffStatus={dropOffStatus}
              onConfirmDropOff={handleConfirmDropOff}
              onCheckInLate={handleCheckInLate}
              onOpenCarTag={() => setIsCarTagOpen(true)}
              selectedLane={selectedLane}
              setSelectedLane={setSelectedLane}
            />
          )} */}

          {/* {activeTab === "pickup" && (
            <AfternoonPickUp
              student={student}
              studentsList={STUDENTS}
              onSelectStudent={setSelectedStudentId}
              parentUser={PARENT_USER}
              currentTime={currentTime}
              isLateAfternoon={isLateAfternoon}
              pickUpStatus={pickUpStatus}
              onCheckInPickUp={handleCheckInPickUp}
              onConfirmPickUp={handleConfirmPickUp}
              onOpenCarTag={() => setIsCarTagOpen(true)}
              onOpenTeacherScan={() => setIsTeacherScanOpen(true)}
              lateFeeMinutes={lateFeeMinutes}
              lateFeeTotal={lateFeeTotal}
              selectedLane={selectedLane}
              setSelectedLane={setSelectedLane}
            />
          )} */}

          {/* {activeTab === "children" && (
            <MyChildrenView
              studentsList={STUDENTS}
              selectedStudentId={selectedStudentId}
              onSelectStudent={setSelectedStudentId}
              parentUser={PARENT_USER}
              onOpenCarTag={() => setIsCarTagOpen(true)}
            />
          )} */}

          {/* {activeTab === "history" && (
            <ActivityHistory
              activityLogs={activityLogs}
              parentUser={PARENT_USER}
            />
          )} */}

          {/* {activeTab === "help" && (
            <HelpView onOpenCarTag={() => setIsCarTagOpen(true)} />
          )} */}
        </main>
      </div>

      {/* Modals */}
      <CarTagModal
        isOpen={isCarTagOpen}
        onClose={() => setIsCarTagOpen(false)}
        student={student}
        parentUser={PARENT_USER}
        onLaunchTeacherScan={() => setIsTeacherScanOpen(true)}
      />

      {/* <TeacherScanModal
        isOpen={isTeacherScanOpen}
        onClose={() => setIsTeacherScanOpen(false)}
        student={student}
        parentUser={PARENT_USER}
        onStudentReleased={handleConfirmPickUp}
      /> */}

      {/* <BusTrackingModal
        isOpen={isBusTrackingOpen}
        onClose={() => setIsBusTrackingOpen(false)}
        student={student}
        parentUser={PARENT_USER}
      /> */}
      {/* 
      <PaymentsModal
        isOpen={isPaymentsOpen}
        onClose={() => setIsPaymentsOpen(false)}
        lateFeeTotal={lateFeeTotal}
        parentUser={PARENT_USER}
      />*/}

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
