import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_ACTIVITY_LOGS } from "../data/mocData";
import { useAuth } from "./useAuth";

export const DismissalContext = createContext(null);

export function DismissalProvider({ children }) {
  const navigate = useNavigate();
  const { student, parentUser } = useAuth();

  // Scenario Simulation
  const [currentScenario, setCurrentScenario] = useState("morning_regular");
  const [currentTime, setCurrentTime] = useState("8:02 AM");
  const [isLateMorning, setIsLateMorning] = useState(false);
  const [isLateAfternoon, setIsLateAfternoon] = useState(false);
  const [lateFeeMinutes, setLateFeeMinutes] = useState(0);
  const [lateFeeTotal, setLateFeeTotal] = useState(0);

  // Process States
  const [dropOffStatus, setDropOffStatus] = useState("in_progress"); // 'in_progress' | 'confirmed' | 'late_checked_in'
  const [pickUpStatus, setPickUpStatus] = useState("not_checked_in"); // 'not_checked_in' | 'in_queue' | 'pole_assigned' | 'completed'
  const [selectedLane, setSelectedLane] = useState(2);

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);

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
        navigate("/dashboard/dropoff");
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
        navigate("/dashboard/dropoff");
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
        navigate("/dashboard/pickup");
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
        navigate("/dashboard/pickup");
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
        navigate("/dashboard/pickup");
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
      student: `${student?.name || "Student"} (${student?.id || "ID"})`,
      transporter: receipt?.transporter || "Parent",
      vehicle: receipt?.vehicle || parentUser?.vehicle || "Vehicle",
      location: `Gate 2 - ${receipt?.lane || "Lane " + selectedLane}`,
      status: "Confirmed Present",
      notes: "Drop-off timestamp recorded in system.",
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const handleCheckInLate = (receipt) => {
    setDropOffStatus("late_checked_in");
    const newLog = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      date: "Today, Sept 14, 2026",
      time: currentTime,
      type: "Late Morning Drop-Off",
      student: `${student?.name || "Student"} (${student?.id || "ID"})`,
      transporter: receipt?.transporter || "Parent",
      vehicle: receipt?.vehicle || parentUser?.vehicle || "Vehicle",
      location: "School Lobby (Post-Gate Close)",
      status: "Lobby Check-In",
      notes:
        "Checked in late after 8:30 AM gate closure. Escorted to reception.",
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const handleCheckInPickUp = () => {
    setPickUpStatus("pole_assigned");
  };

  const handleConfirmPickUp = () => {
    setPickUpStatus("completed");
    const newLog = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      date: "Today, Sept 14, 2026",
      time: currentTime,
      type: isLateAfternoon ? "Late Afternoon Pick-Up" : "Afternoon Pick-Up",
      student: `${student?.name || "Student"} (${student?.id || "ID"})`,
      transporter: `Parent (${parentUser?.name || "Parent"})`,
      vehicle: parentUser?.vehicle || "Vehicle",
      location: isLateAfternoon
        ? "School Lobby Reception"
        : `Pole ${student?.assignedPole || 7} (Lane ${selectedLane})`,
      status: "Student Released",
      lateFee: isLateAfternoon ? `$${lateFeeTotal}.00` : null,
      verifiedBy: "Ms. Higgins (Teacher QR Scan)",
      notes: isLateAfternoon
        ? "Released in lobby after gate closure."
        : "Student safely released curbside.",
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const value = {
    currentScenario,
    setCurrentScenario,
    currentTime,
    setCurrentTime,
    isLateMorning,
    setIsLateMorning,
    isLateAfternoon,
    setIsLateAfternoon,
    lateFeeMinutes,
    setLateFeeMinutes,
    lateFeeTotal,
    setLateFeeTotal,
    dropOffStatus,
    setDropOffStatus,
    pickUpStatus,
    setPickUpStatus,
    selectedLane,
    setSelectedLane,
    activityLogs,
    setActivityLogs,
    handleSelectScenario,
    handleConfirmDropOff,
    handleCheckInLate,
    handleCheckInPickUp,
    handleConfirmPickUp,
  };

  return (
    <DismissalContext.Provider value={value}>
      {children}
    </DismissalContext.Provider>
  );
}
