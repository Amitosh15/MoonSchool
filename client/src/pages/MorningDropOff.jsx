import React, { useState } from "react";
import {
  CheckCircle,
  MapPin,
  Car,
  User,
  Bus,
  Users2,
  RotateCw,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Info,
  QrCode,
  CheckCircle2,
  Building,
  AlertTriangle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth, useDismissal, useUI } from "../context";

export default function MorningDropOff({
  student: propStudent,
  studentsList: propStudentsList,
  onSelectStudent: propOnSelectStudent,
  parentUser: propParentUser,
  currentTime: propCurrentTime,
  isLateMorning: propIsLateMorning,
  dropOffStatus: propDropOffStatus,
  onConfirmDropOff: propOnConfirmDropOff,
  onCheckInLate: propOnCheckInLate,
  onOpenCarTag: propOnOpenCarTag,
  selectedLane: propSelectedLane,
  setSelectedLane: propSetSelectedLane,
}) {
  const auth = useAuth();
  const dismissal = useDismissal();
  const ui = useUI();

  const student = propStudent ?? auth.student;
  const studentsList = propStudentsList ?? auth.studentsList;
  const onSelectStudent = propOnSelectStudent ?? auth.setSelectedStudentId;
  const parentUser = propParentUser ?? auth.parentUser;
  const currentTime = propCurrentTime ?? dismissal.currentTime;
  const isLateMorning = propIsLateMorning ?? dismissal.isLateMorning;
  const dropOffStatus = propDropOffStatus ?? dismissal.dropOffStatus;
  const onConfirmDropOff =
    propOnConfirmDropOff ?? dismissal.handleConfirmDropOff;
  const onCheckInLate = propOnCheckInLate ?? dismissal.handleCheckInLate;
  const onOpenCarTag = propOnOpenCarTag ?? ui.openCarTag;
  const selectedLane = propSelectedLane ?? dismissal.selectedLane;
  const setSelectedLane = propSetSelectedLane ?? dismissal.setSelectedLane;

  const [transporterType, setTransporterType] = useState("Parent");
  const [thirdPartyName, setThirdPartyName] = useState("");
  const [thirdPartyRelation, setThirdPartyRelation] = useState("Nanny");
  const [vehicleType, setVehicleType] = useState(
    "SUV - Toyota Highlander (Gray)",
  );
  const [isRefreshingGps, setIsRefreshingGps] = useState(false);
  const [gpsMessage, setGpsMessage] = useState(
    "Detected: School Gate - Lane " + (selectedLane || 2),
  );
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const handleRefreshGps = () => {
    setIsRefreshingGps(true);
    setTimeout(() => {
      setIsRefreshingGps(false);
      setGpsMessage(
        `Detected: School Gate - Lane ${selectedLane} (GPS ±2m precision)`,
      );
    }, 700);
  };

  const handleConfirm = () => {
    const receipt = {
      studentName: student.name,
      studentId: student.id,
      timestamp: currentTime,
      transporter:
        transporterType === "Third Party"
          ? `${thirdPartyName || "Caregiver"} (${thirdPartyRelation})`
          : `${transporterType} (${parentUser.name})`,
      vehicle: vehicleType,
      lane: `Lane ${selectedLane}`,
      status: isLateMorning
        ? "Late Arrival Lobby Check-In"
        : "Gate Drop-Off Confirmed",
      confirmationNumber:
        "MS-DO-" + Math.floor(100000 + Math.random() * 900000),
    };

    setLastReceipt(receipt);
    setShowReceiptModal(true);

    if (isLateMorning) {
      onCheckInLate(receipt);
    } else {
      onConfirmDropOff(receipt);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  return (
    <div>
      {/* Top Greeting Row */}
      <div className="page-greeting-row">
        <div className="greeting-titles">
          <h2>
            Good Morning, {parentUser.name.split(" ")[0]}!
            <span style={{ fontSize: "1.2rem" }}>☀️</span>
          </h2>
          <p>Let's get {student.name.split(" ")[0]} to school safely today.</p>
        </div>
        <div className="header-actions-group">
          <div className="pill-status-btn" title="Automated gate hours">
            <Clock size={16} color="#028090" />
            <span>Gate Window: 8:05 AM – 8:30 AM</span>
          </div>
          <button className="pill-status-btn" onClick={onOpenCarTag}>
            <QrCode size={16} color="#0d2b45" />
            <span>Car Tag: {student.carTag}</span>
          </button>
        </div>
      </div>

      {/* Late Arrival Alert Banner if after 8:30 AM */}
      {isLateMorning && (
        <div
          className="gate-hours-alert-banner"
          style={{
            background: "#fff7ed",
            borderColor: "#fdba74",
            marginBottom: "24px",
          }}
        >
          <AlertTriangle size={24} color="#ea580c" style={{ flexShrink: 0 }} />
          <div>
            <h4
              style={{ color: "#9a3412", fontWeight: 800, fontSize: "0.95rem" }}
            >
              Gate Closed (After 8:30 AM) — Late Arrival Process Active
            </h4>
            <p
              style={{
                color: "#c2410c",
                fontSize: "0.85rem",
                marginTop: "2px",
              }}
            >
              The automated school gate closed at 8:30 AM. Please check in
              below, park in the visitor bays, and walk{" "}
              {student.name.split(" ")[0]} to the School Lobby for verification.
            </p>
          </div>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Student Card + Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Student Information Strip */}
          <div className="student-profile-strip">
            <div className="student-meta-left">
              <img
                src={student.avatar}
                alt={student.name}
                className="student-avatar"
              />
              <div className="student-info">
                <h4>{student.name}</h4>
                <div className="student-pills">
                  <span className="badge-tag badge-id">ID: {student.id}</span>
                  <span className="badge-tag badge-grade">{student.grade}</span>
                  <span className="badge-tag badge-room">
                    {student.homeroom}
                  </span>
                  <span
                    className="badge-tag"
                    style={{ background: "#e0f2fe", color: "#0369a1" }}
                  >
                    Teacher: {student.teacher}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#64748b",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Select Child:
              </label>
              <select
                className="child-switcher-select"
                value={student.id}
                onChange={(e) => onSelectStudent(e.target.value)}
              >
                {studentsList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Today's Status Tracker */}
          <div className="today-status-strip">
            <div
              className={`status-step-box ${dropOffStatus === "confirmed" ? "complete" : "active"}`}
            >
              <span className="status-step-label">1. Morning Drop-Off</span>
              <div className="status-step-val">
                {dropOffStatus === "confirmed" ? (
                  <>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span style={{ color: "#059669" }}>Confirmed</span>
                  </>
                ) : dropOffStatus === "late_checked_in" ? (
                  <>
                    <Building size={16} color="#ea580c" />
                    <span style={{ color: "#ea580c" }}>Lobby Check-In</span>
                  </>
                ) : (
                  <>
                    <span className="status-pulse-dot" />
                    <span>In Progress</span>
                  </>
                )}
              </div>
            </div>

            <div
              className={`status-step-box ${dropOffStatus === "confirmed" || dropOffStatus === "late_checked_in" ? "active" : ""}`}
            >
              <span className="status-step-label">2. At School</span>
              <div className="status-step-val">
                {dropOffStatus === "confirmed" ||
                dropOffStatus === "late_checked_in" ? (
                  <>
                    <span className="status-pulse-dot green" />
                    <span style={{ color: "#0284c7" }}>In Class (Safe)</span>
                  </>
                ) : (
                  <span style={{ color: "#94a3b8" }}>Pending Arrival</span>
                )}
              </div>
            </div>

            <div className="status-step-box">
              <span className="status-step-label">3. Afternoon Pick-Up</span>
              <div className="status-step-val">
                <span style={{ color: "#94a3b8" }}>Opens 3:30 PM</span>
              </div>
            </div>
          </div>

          {/* Main Action Card: Confirm Drop-Off */}
          <div className="ms-card">
            <div className="ms-card-header">
              <div className="ms-card-title-group">
                <div
                  className="icon-box"
                  style={{ background: "#e0f2fe", color: "#0284c7" }}
                >
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3>
                    {isLateMorning
                      ? "Late Arrival Lobby Check-In"
                      : "Confirm Drop-Off"}
                  </h3>
                  <p>
                    {isLateMorning
                      ? "Record arrival time and proceed to school lobby for student check-in."
                      : `Please confirm when you drop off ${student.name.split(" ")[0]} at school.`}
                  </p>
                </div>
              </div>
              <span
                className="badge-tag"
                style={{
                  background: "#f1f5f9",
                  color: "#334155",
                  fontWeight: 800,
                }}
              >
                {currentTime}
              </span>
            </div>

            {/* Who is dropping off? */}
            <div className="form-section">
              <label className="form-label">
                <span>Who is dropping off?</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  Required
                </span>
              </label>
              <div className="radio-pills-row">
                <button
                  type="button"
                  className={`radio-pill-btn ${transporterType === "Parent" ? "selected" : ""}`}
                  onClick={() => setTransporterType("Parent")}
                >
                  <User size={16} />
                  <span>Parent</span>
                </button>
                <button
                  type="button"
                  className={`radio-pill-btn ${transporterType === "School Bus" ? "selected" : ""}`}
                  onClick={() => setTransporterType("School Bus")}
                >
                  <Bus size={16} />
                  <span>School Bus</span>
                </button>
                <button
                  type="button"
                  className={`radio-pill-btn ${transporterType === "Third Party" ? "selected" : ""}`}
                  onClick={() => setTransporterType("Third Party")}
                >
                  <Users2 size={16} />
                  <span>Third Party</span>
                </button>
              </div>

              {/* Third Party Details if chosen */}
              {transporterType === "Third Party" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Caregiver Name (e.g. Beatrice Osei)"
                    value={thirdPartyName}
                    onChange={(e) => setThirdPartyName(e.target.value)}
                    className="vehicle-select-custom"
                  />
                  <select
                    value={thirdPartyRelation}
                    onChange={(e) => setThirdPartyRelation(e.target.value)}
                    className="vehicle-select-custom"
                  >
                    <option value="Nanny">Authorized Nanny</option>
                    <option value="Driver">Authorized Driver</option>
                    <option value="Relative / Grandparent">
                      Grandparent / Aunt
                    </option>
                    <option value="Carpool">Carpool Parent</option>
                  </select>
                </div>
              )}
            </div>

            {/* Vehicle Type */}
            <div className="form-section">
              <label className="form-label">
                <span>Vehicle Type & Description</span>
                <span style={{ fontSize: "0.75rem", color: "#0284c7" }}>
                  Car Tag: {student.carTag}
                </span>
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="vehicle-select-custom"
              >
                <option value="SUV - Toyota Highlander (Gray)">
                  SUV — Toyota Highlander (Gray) • Reg: 7XYZ90
                </option>
                <option value="Sedan - Honda Accord (Silver)">
                  Sedan — Honda Accord (Silver)
                </option>
                <option value="Van - Honda Odyssey (White)">
                  Van / Minivan — Honda Odyssey (White)
                </option>
                <option value="Truck - Ford F-150 (Black)">
                  Truck — Ford F-150 (Black)
                </option>
                <option value="School Bus - Route 4">
                  School Bus — Bus #12 (Route 4)
                </option>
                <option value="Walking / Lobby">
                  Walking to Lobby (No Vehicle)
                </option>
              </select>
            </div>

            {/* GPS Location */}
            <div className="form-section">
              <div className="gps-lane-banner">
                <div className="gps-info-left">
                  <div className="gps-pulse-beacon">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="gps-text-title">GPS Geofence Verified</div>
                    <div className="gps-text-detail">{gpsMessage}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-refresh-gps"
                  onClick={handleRefreshGps}
                  disabled={isRefreshingGps}
                >
                  <RotateCw
                    size={12}
                    className={isRefreshingGps ? "animate-spin" : ""}
                  />
                  <span>{isRefreshingGps ? "Locating..." : "Refresh GPS"}</span>
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            {dropOffStatus === "confirmed" ? (
              <div
                style={{
                  background: "#ecfdf5",
                  border: "1.5px solid #a7f3d0",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <CheckCircle2 size={24} color="#059669" />
                  <div>
                    <div style={{ fontWeight: 800, color: "#065f46" }}>
                      Drop-Off Completed for Today
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#047857" }}>
                      Timestamp captured & transmitted to Front Desk.
                    </div>
                  </div>
                </div>
                <button
                  className="pill-status-btn"
                  onClick={() => setShowReceiptModal(true)}
                  style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                >
                  View Receipt
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-primary-confirm"
                onClick={handleConfirm}
              >
                {isLateMorning ? (
                  <>
                    <Building size={18} />
                    <span>Check In as Late Arrival (Report to Lobby)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    <span>Confirm Drop-Off Now</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Lane Alignment & Important Reminders */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Interactive Lane Alignment Schematic */}
          <div className="lane-schematic-wrap">
            <div className="lane-schematic-header">
              <span>Interactive Lane Alignment</span>
              <span>School Gate Sensor Active</span>
            </div>
            <div className="lane-tracks">
              {[1, 2, 3].map((lane) => (
                <div
                  key={lane}
                  className={`lane-track ${selectedLane === lane ? "active-lane" : ""}`}
                  onClick={() => {
                    setSelectedLane(lane);
                    setGpsMessage(`Detected: School Gate - Lane ${lane}`);
                  }}
                >
                  <Car size={16} />
                  <span>Gate Lane {lane}</span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: selectedLane === lane ? "#38bdf8" : "#64748b",
                    }}
                  >
                    {selectedLane === lane ? "● Your Vehicle" : "Available"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Reminders Card */}
          <div className="reminders-card">
            <div className="ms-card-title-group">
              <div className="reminder-icon">
                <Info size={18} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "#0d2b45",
                  }}
                >
                  Important Reminders
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#64748b" }}>
                  Arrival Policy & Safety Guidelines
                </p>
              </div>
            </div>

            <div className="reminder-item">
              <div
                className="reminder-icon"
                style={{ background: "#e0f2fe", color: "#0284c7" }}
              >
                <Clock size={16} />
              </div>
              <div className="reminder-text">
                <h5>Gate Hours: 8:05 AM – 8:30 AM</h5>
                <p>
                  Automated gate opens at 8:05 AM and closes promptly at 8:30 AM
                  (Moon Time).
                </p>
              </div>
            </div>

            <div className="reminder-item">
              <div
                className="reminder-icon"
                style={{ background: "#fef3c7", color: "#b45309" }}
              >
                <Building size={16} />
              </div>
              <div className="reminder-text">
                <h5>Late Arrivals After 8:30 AM</h5>
                <p>
                  If you arrive after 8:30 AM, please check in on the app, park
                  your car, and escort your child into the school lobby for
                  manual check-in.
                </p>
              </div>
            </div>

            <div className="reminder-item">
              <div
                className="reminder-icon"
                style={{ background: "#ecfdf5", color: "#059669" }}
              >
                <Bus size={16} />
              </div>
              <div className="reminder-text">
                <h5>Bus Transportation</h5>
                <p>
                  For bus riders, please confirm drop-off in the app when the
                  bus arrives. Real-time GPS is accessible in the Bus tab.
                </p>
              </div>
            </div>

            <div className="reminder-item">
              <div
                className="reminder-icon"
                style={{ background: "#fae8ff", color: "#a21caf" }}
              >
                <QrCode size={16} />
              </div>
              <div className="reminder-text">
                <h5>Car Tag QR Code</h5>
                <p>
                  Keep your dual-sided car tag displayed on your windshield or
                  rear window so teachers can scan upon arrival.
                </p>
              </div>
            </div>

            <div className="community-quote-box">
              <div>"Safe Students, Bright Futures"</div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#0284c7",
                  marginTop: "4px",
                  fontWeight: 500,
                }}
              >
                ONE SCHOOL • ONE COMMUNITY • BRIGHTER TOMORROWS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Receipt Modal */}
      {showReceiptModal && lastReceipt && (
        <div
          className="modal-overlay"
          onClick={() => setShowReceiptModal(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: "#065f46" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CheckCircle2 size={20} color="#34d399" />
                <h3>Drop-Off Recorded Successfully</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowReceiptModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="success-receipt-card">
                <div style={{ textAlign: "center", marginBottom: "8px" }}>
                  <span
                    className="badge-tag"
                    style={{
                      background: "#059669",
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  >
                    {lastReceipt.status}
                  </span>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#047857",
                      marginTop: "4px",
                    }}
                  >
                    Ref #: {lastReceipt.confirmationNumber}
                  </div>
                </div>

                <div className="receipt-row">
                  <span className="receipt-label">Student:</span>
                  <span className="receipt-value">
                    {lastReceipt.studentName} ({lastReceipt.studentId})
                  </span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Transporter:</span>
                  <span className="receipt-value">
                    {lastReceipt.transporter}
                  </span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Vehicle:</span>
                  <span className="receipt-value">{lastReceipt.vehicle}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Location / Gate:</span>
                  <span className="receipt-value">{lastReceipt.lane}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Recorded Time:</span>
                  <span className="receipt-value">{lastReceipt.timestamp}</span>
                </div>
              </div>

              {isLateMorning ? (
                <div
                  style={{
                    background: "#fff7ed",
                    padding: "12px",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    color: "#9a3412",
                  }}
                >
                  <strong>Next Step:</strong> Escort{" "}
                  {student.name.split(" ")[0]} to the Front Desk Reception
                  inside the school lobby. Staff will complete the biometric/ID
                  sign-in.
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#475569",
                    textAlign: "center",
                  }}
                >
                  Thank you! Have a wonderful day. You will receive an afternoon
                  pick-up reminder at 3:15 PM.
                </div>
              )}

              <button
                className="btn-primary-confirm"
                onClick={() => setShowReceiptModal(false)}
                style={{ background: "#059669" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
