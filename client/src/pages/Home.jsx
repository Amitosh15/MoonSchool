import React, { useState, useEffect } from "react";
import {
  Clock,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bus,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
  User,
  Users,
  MapPin,
  RefreshCw,
} from "lucide-react";

export default function Home({
  student,
  parentUser,
  currentTime,
  onNavigate,
  dropOffStatus,
  pickUpStatus,
  onOpenCarTag,
  onOpenTeacherScan,
  lateFeeTotal,
}) {
  // Status overrides for interactive toggling
  const [statusOverrides, setStatusOverrides] = useState({
    dropOff: null,
    atSchool: null,
    pickUp: null,
  });

  // Reset local overrides whenever system scenario or live props change
  useEffect(() => {
    setStatusOverrides({
      dropOff: null,
      atSchool: null,
      pickUp: null,
    });
  }, [currentTime, dropOffStatus, pickUpStatus]);

  // Drop-off status
  const dropOffConfirmed =
    statusOverrides.dropOff !== null
      ? statusOverrides.dropOff === "confirm"
      : dropOffStatus === "confirmed" || dropOffStatus === "late_checked_in";

  // Pick-up status
  const pickUpConfirmed =
    statusOverrides.pickUp !== null
      ? statusOverrides.pickUp === "confirm"
      : pickUpStatus === "completed";

  const atSchoolConfirmed =
    statusOverrides.atSchool !== null
      ? statusOverrides.atSchool === "confirm"
      : false;

  const dropOffState = dropOffConfirmed ? "confirm" : "pending";
  const atSchoolState = atSchoolConfirmed ? "confirm" : "pending";
  const pickUpState = pickUpConfirmed ? "confirm" : "pending";

  const toggleStatus = (itemKey) => {
    setStatusOverrides((prev) => {
      const current =
        itemKey === "dropOff"
          ? dropOffState
          : itemKey === "atSchool"
            ? atSchoolState
            : pickUpState;
      const next = current === "confirm" ? "pending" : "confirm";
      return { ...prev, [itemKey]: next };
    });
  };

  const hasOverrides =
    statusOverrides.dropOff !== null ||
    statusOverrides.atSchool !== null ||
    statusOverrides.pickUp !== null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #091e32 0%, #134074 100%)",
          borderRadius: "20px",
          color: "white",
          padding: "28px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ zIndex: 2, maxWidth: "650px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.15)",
              padding: "4px 12px",
              borderRadius: "99px",
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            <ShieldCheck size={14} color="#38bdf8" />
            <span>Moon School Student Transportation & Safety Portal</span>
          </div>
          <h2
            style={{
              fontFamily: "Outfit",
              fontSize: "2rem",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Welcome back, {parentUser.name.split(" ")[0]}!
          </h2>
          <p
            style={{
              color: "#cbd5e1",
              fontSize: "0.95rem",
              marginTop: "8px",
              lineHeight: 1.5,
            }}
          >
            Automated gate protocols are currently active. Use the quick cards
            below to confirm morning arrival, track dismissal queue staging, or
            display your vehicle tag.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
            <button
              className="pill-status-btn"
              style={{
                background: "#f4a261",
                color: "#091e32",
                border: "none",
                fontWeight: 800,
              }}
              onClick={() => onNavigate("dropoff")}
            >
              <ArrowDownToLine size={16} />
              <span>Morning Drop-Off</span>
            </button>
            <button
              className="pill-status-btn"
              style={{
                background: "white",
                color: "#091e32",
                border: "none",
                fontWeight: 800,
              }}
              onClick={() => onNavigate("pickup")}
            >
              <ArrowUpFromLine size={16} />
              <span>Afternoon Pick-Up</span>
            </button>
            <button
              className="pill-status-btn"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              onClick={onOpenCarTag}
            >
              <QrCode size={16} />
              <span>Car Tag: {student.carTag}</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermark / Circle */}
        <div
          style={{
            position: "absolute",
            right: "-40px",
            bottom: "-40px",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background: "rgba(0, 168, 150, 0.1)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Today's Status & Live Staging Overview Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {/* Student & Guardian Profile Summary */}
        <div className="ms-card">
          <div className="ms-card-header">
            <div className="ms-card-title-group">
              <div
                className="icon-box"
                style={{ background: "#ecfdf5", color: "#059669" }}
              >
                <Users size={20} />
              </div>
              <div>
                <h3>Student Profile</h3>
                <p>Registered for Car Tag {student.carTag}</p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "12px",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <img
              src={student.avatar}
              alt=""
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
            <div>
              <div style={{ fontWeight: 800, color: "#091e32" }}>
                {student.name}
              </div>
              {/* <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                {student.grade} • {student.homeroom} • Teacher:{" "}
                {student.teacher}
              </div> */}
            </div>
          </div>

          <div
            style={{
              fontSize: "0.82rem",
              color: "#475569",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Student ID:</span>
              <span style={{ fontWeight: 700, color: "#091e32" }}>
                {/* {parentUser.name} */} MS-001
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Grade:</span>
              <span style={{ fontWeight: 700, color: "#091e32" }}>
                {/* {parentUser.phone} */}3
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Homeroom:</span>
              <span style={{ fontWeight: 700, color: "#091e32" }}>
                {/* {parentUser.vehicle} */}3A
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Registered Vehical:</span>
              <span style={{ fontWeight: 700, color: "#091e32" }}>
                {parentUser.vehicle}
              </span>
            </div>
          </div>

          {/* <button
            className="pill-status-btn"
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "6px",
            }}
            onClick={onOpenTeacherScan}
          >
            <span>Simulate Teacher Verification Scan</span>
          </button> */}
        </div>

        {/* Exact "Today's Status" Card matching user's design reference */}
        <div
          className="ms-card"
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(9, 30, 50, 0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "18px",
          }}
        >
          {/* Header with Title and Live Timestamp */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
            }}
          >
            <h3
              style={{
                fontFamily: "Outfit",
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#091e32",
                margin: 0,
              }}
            >
              Today's Status
            </h3>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#f8fafc",
                padding: "4px 10px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#0284c7",
              }}
            >
              <Clock size={13} color="#0284c7" />
              <span>
                Timestamp: <strong>{currentTime || "8:02 AM"}</strong>
              </span>
            </div>
          </div>

          {/* Vertical Stepper Timeline matching image */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "4px 0",
            }}
          >
            {/* Step 1: Drop-Off */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                {/* Green Checkmark Circle */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#059669",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(5, 150, 105, 0.28)",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                {/* Drop-Off Label & Time */}
                <div>
                  <div
                    style={{
                      fontFamily: "Outfit",
                      fontSize: "1.08rem",
                      fontWeight: 800,
                      color: "#091e32",
                      lineHeight: 1.2,
                    }}
                  >
                    Drop-Off
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#64748b",
                      marginTop: "2px",
                    }}
                  >
                    {dropOffConfirmed
                      ? `Timestamp: ${dropOffStatus === "late_checked_in" ? "8:35 AM" : currentTime.includes("8:") ? currentTime : "8:14 AM"}`
                      : "Timestamp: 8:05 – 8:30 AM"}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <button
                onClick={() => toggleStatus("dropOff")}
                title="Click to toggle Pending / Confirm"
                style={{
                  background:
                    dropOffState === "confirm" ? "#ecfdf5" : "#f1f5f9",
                  color: dropOffState === "confirm" ? "#059669" : "#334155",
                  border: `1px solid ${dropOffState === "confirm" ? "#a7f3d0" : "#e2e8f0"}`,
                  padding: "5px 14px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {dropOffState === "confirm" ? "Confirm" : "Pending"}
              </button>
            </div>

            {/* Vertical Connector Line 1 */}
            <div
              style={{
                width: "32px",
                display: "flex",
                justifyContent: "center",
                padding: "3px 0",
              }}
            >
              <div
                style={{
                  width: "2px",
                  height: "24px",
                  background: dropOffConfirmed ? "#86efac" : "#cbd5e1",
                }}
              />
            </div>

            {/* Step 2: At School */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                {/* Gray/Green Checkmark Circle */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: atSchoolConfirmed ? "#059669" : "#cbd5e1",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: atSchoolConfirmed
                      ? "0 2px 8px rgba(5, 150, 105, 0.28)"
                      : "none",
                    flexShrink: 0,
                    transition: "background 0.2s ease",
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                {/* At School Label & Time */}
                <div>
                  <div
                    style={{
                      fontFamily: "Outfit",
                      fontSize: "1.08rem",
                      fontWeight: 800,
                      color: "#091e32",
                      lineHeight: 1.2,
                    }}
                  >
                    At School
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#64748b",
                      marginTop: "2px",
                    }}
                  >
                    {atSchoolConfirmed
                      ? "Timestamp: 8:20 AM – 3:30 PM"
                      : "Timestamp: Starts 8:30 AM"}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <button
                onClick={() => toggleStatus("atSchool")}
                title="Click to toggle Pending / Confirm"
                style={{
                  background:
                    atSchoolState === "confirm" ? "#ecfdf5" : "#f1f5f9",
                  color: atSchoolState === "confirm" ? "#059669" : "#334155",
                  border: `1px solid ${atSchoolState === "confirm" ? "#a7f3d0" : "#e2e8f0"}`,
                  padding: "5px 14px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {atSchoolState === "confirm" ? "Confirm" : "Pending"}
              </button>
            </div>

            {/* Vertical Connector Line 2 */}
            <div
              style={{
                width: "32px",
                display: "flex",
                justifyContent: "center",
                padding: "3px 0",
              }}
            >
              <div
                style={{
                  width: "2px",
                  height: "24px",
                  background: pickUpConfirmed ? "#86efac" : "#cbd5e1",
                }}
              />
            </div>

            {/* Step 3: Pick-Up */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                {/* Gray/Green Checkmark Circle */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: pickUpConfirmed ? "#059669" : "#cbd5e1",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: pickUpConfirmed
                      ? "0 2px 8px rgba(5, 150, 105, 0.28)"
                      : "none",
                    flexShrink: 0,
                    transition: "background 0.2s ease",
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                {/* Pick-Up Label & Time */}
                <div>
                  <div
                    style={{
                      fontFamily: "Outfit",
                      fontSize: "1.08rem",
                      fontWeight: 800,
                      color: "#091e32",
                      lineHeight: 1.2,
                    }}
                  >
                    Pick-Up
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#64748b",
                      marginTop: "2px",
                    }}
                  >
                    {pickUpConfirmed
                      ? `Timestamp: ${currentTime.includes("3:") || currentTime.includes("4:") ? currentTime : "3:38 PM"}`
                      : "Timestamp: 3:30 – 4:00 PM"}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <button
                onClick={() => toggleStatus("pickUp")}
                title="Click to toggle Pending / Confirm"
                style={{
                  background: pickUpState === "confirm" ? "#ecfdf5" : "#f1f5f9",
                  color: pickUpState === "confirm" ? "#059669" : "#334155",
                  border: `1px solid ${pickUpState === "confirm" ? "#a7f3d0" : "#e2e8f0"}`,
                  padding: "5px 14px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {pickUpState === "confirm" ? "Confirm" : "Pending"}
              </button>
            </div>
          </div>

          {/* Quick Helper Note / Reset */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.72rem",
              color: "#94a3b8",
              borderTop: "1px solid #f1f5f9",
              paddingTop: "10px",
            }}
          >
            {/* <span>Click any badge to toggle status</span>
            {hasOverrides && (
              <button
                onClick={() =>
                  setStatusOverrides({
                    dropOff: null,
                    atSchool: null,
                    pickUp: null,
                  })
                }
                style={{
                  color: "#0284c7",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <RefreshCw size={10} />
                <span>Reset to System</span>
              </button>
            )} */}
          </div>
        </div>
      </div>

      {/* Two-part lower section: Process Workflow Map + Children overview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "20px",
        }}
      >
        {/* Accompanying Live Transportation Staging Details Card */}
        <div
          className="ms-card"
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(9, 30, 50, 0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <ShieldCheck size={18} color="#0284c7" />
                <h3
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#091e32",
                    margin: 0,
                  }}
                >
                  Active Transportation Overview
                </h3>
              </div>
              {/* <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: "#059669",
                  background: "#ecfdf5",
                  padding: "3px 10px",
                  borderRadius: "99px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10b981",
                  }}
                />
                Live Gate Closed
              </span> */}
            </div>
            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>
              Tracking student status for <strong>{student.name}</strong> (
              {student.grade} • {student.homeroom}) with Car Tag{" "}
              <strong>{student.carTag}</strong>.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#64748b",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Morning Drop-off
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  color: "#091e32",
                  marginTop: "2px",
                }}
              >
                8:05 – 8:30 AM
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: dropOffConfirmed ? "#059669" : "#0284c7",
                  fontWeight: 700,
                  marginTop: "4px",
                }}
              >
                {dropOffConfirmed ? "✓ Completed" : "Gate 2 • Lane 2"}
              </div>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#64748b",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Afternoon Pick-up
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  color: "#091e32",
                  marginTop: "2px",
                }}
              >
                3:30 – 4:00 PM
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: pickUpConfirmed ? "#059669" : "#d97706",
                  fontWeight: 700,
                  marginTop: "4px",
                }}
              >
                {pickUpConfirmed
                  ? "✓ Released"
                  : `Pole #${student.assignedPole || 7}`}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button
              onClick={() => onNavigate("dropoff")}
              style={{
                flex: 1,
                padding: "9px 14px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #091e32 0%, #134074 100%)",
                color: "white",
                fontSize: "0.82rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <ArrowDownToLine size={14} />
              <span>Drop-Off Portal</span>
            </button>
            <button
              onClick={() => onNavigate("pickup")}
              style={{
                flex: 1,
                padding: "9px 14px",
                borderRadius: "8px",
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                color: "#091e32",
                fontSize: "0.82rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <ArrowUpFromLine size={14} />
              <span>Pick-Up Portal</span>
            </button>
          </div>
        </div>

        {/* Process Flow Breakdown (from Page 2 of PDF) */}
        <div className="ms-card">
          <div className="ms-card-header">
            <div className="ms-card-title-group">
              <div
                className="icon-box"
                style={{ background: "#e0f2fe", color: "#0284c7" }}
              >
                <Clock size={20} />
              </div>
              <div>
                <h3>Official Arrival & Dismissal Guidelines</h3>
                <p>
                  Standard operating procedures for parents, buses, and
                  caregivers.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div
              style={{
                display: "flex",
                gap: "14px",
                padding: "12px",
                background: "#f8fafc",
                borderRadius: "10px",
                borderLeft: "4px solid #0284c7",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "#0284c7",
                  fontSize: "0.9rem",
                }}
              >
                01
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: "#091e32",
                  }}
                >
                  Morning Drop-Off (8:05 AM – 8:30 AM)
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  Automated gate opens at 8:05 AM. Parents, buses, or caregivers
                  confirm in-app. Lane & vehicle captured. Gate closes at 8:30
                  AM. Late arrivals check in at lobby.
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                padding: "12px",
                background: "#f8fafc",
                borderRadius: "10px",
                borderLeft: "4px solid #f59e0b",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "#d97706",
                  fontSize: "0.9rem",
                }}
              >
                02
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: "#091e32",
                  }}
                >
                  Afternoon Pick-Up (3:30 PM – 4:00 PM)
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  Queue in designated lanes with car tag displayed. Front desk
                  receives queue notification. Students staged at numbered poles
                  1–14 and escorted out by teachers.
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                padding: "12px",
                background: "#f8fafc",
                borderRadius: "10px",
                borderLeft: "4px solid #ef4444",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "#dc2626",
                  fontSize: "0.9rem",
                }}
              >
                03
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: "#091e32",
                  }}
                >
                  Late Pick-Up Fee Engine (After 4:00 PM)
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  Automated gate closes at 4:00 PM. $1/minute late fee accrues
                  automatically. Parents park in visitors bay and proceed to the
                  front desk lobby for student release.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
