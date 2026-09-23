import React, { useState } from "react";
import {
  QrCode,
  Car,
  Smartphone,
  Printer,
  RotateCw,
  CheckCircle,
  ShieldCheck,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function CarTagModal({
  isOpen,
  onClose,
  student,
  parentUser,
  onLaunchTeacherScan,
}) {
  const [side, setSide] = useState("front"); // 'front' | 'back'

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        style={{ maxWidth: "560px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <QrCode size={20} color="#f4a261" />
            <h3>Parent Vehicle Car Tag & QR Sticker</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Side Selector Tabs */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              background: "#f1f5f9",
              padding: "4px",
              borderRadius: "10px",
            }}
          >
            <button
              type="button"
              className={`radio-pill-btn ${side === "front" ? "selected" : ""}`}
              style={{ flex: 1, padding: "8px" }}
              onClick={() => setSide("front")}
            >
              <span>FRONT SIDE (Windshield View)</span>
            </button>
            <button
              type="button"
              className={`radio-pill-btn ${side === "back" ? "selected" : ""}`}
              style={{ flex: 1, padding: "8px" }}
              onClick={() => setSide("back")}
            >
              <span>BACK SIDE (Rear View)</span>
            </button>
          </div>

          {/* High-Fidelity Car Tag Recreation (Page 3 of Document) */}
          <div className="car-tag-hanger">
            {/* Top Bar with School Crest & Branding */}
            <div
              style={{
                width: "100%",
                background:
                  side === "front"
                    ? "linear-gradient(90deg, #091e32 0%, #134074 100%)"
                    : "linear-gradient(90deg, #064e3b 0%, #047857 100%)",
                color: "white",
                borderRadius: "12px 12px 0 0",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f4a261, #e76f51)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    border: "2px solid white",
                  }}
                >
                  MS
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    MOON SCHOOL
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "#93c5fd",
                      letterSpacing: "0.5px",
                    }}
                  >
                    SAFE STUDENTS. BRIGHT FUTURES.
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontSize: "0.68rem",
                  background: "rgba(255,255,255,0.2)",
                  padding: "3px 8px",
                  borderRadius: "99px",
                  fontWeight: 700,
                }}
              >
                {side === "front" ? "WINDSHIELD" : "REAR GLASS"}
              </span>
            </div>

            {/* Middle Section with QR Code and Side Icons */}
            <div className="car-tag-qr-center">
              {/* Left Side Instruction */}
              <div style={{ textAlign: "center", width: "90px" }}>
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    lineHeight: "1.1",
                    color: "#091e32",
                    marginBottom: "8px",
                  }}
                >
                  SCAN FOR STUDENT DETAILS
                </div>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    margin: "0 auto",
                    background: "#f1f5f9",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#134074",
                  }}
                >
                  <Smartphone size={24} />
                </div>
              </div>

              {/* Center Authentic QR Code with Center Emblem */}
              <div className="qr-box-bordered" style={{ position: "relative" }}>
                <svg
                  viewBox="0 0 160 160"
                  style={{ width: "150px", height: "150px", display: "block" }}
                >
                  <rect width="160" height="160" fill="white" />

                  {/* Outer corner positioning boxes */}
                  {/* Top-Left */}
                  <rect
                    x="10"
                    y="10"
                    width="40"
                    height="40"
                    fill="#091e32"
                    rx="4"
                  />
                  <rect
                    x="16"
                    y="16"
                    width="28"
                    height="28"
                    fill="white"
                    rx="2"
                  />
                  <rect
                    x="22"
                    y="22"
                    width="16"
                    height="16"
                    fill="#091e32"
                    rx="2"
                  />

                  {/* Top-Right */}
                  <rect
                    x="110"
                    y="10"
                    width="40"
                    height="40"
                    fill="#091e32"
                    rx="4"
                  />
                  <rect
                    x="116"
                    y="16"
                    width="28"
                    height="28"
                    fill="white"
                    rx="2"
                  />
                  <rect
                    x="122"
                    y="22"
                    width="16"
                    height="16"
                    fill="#091e32"
                    rx="2"
                  />

                  {/* Bottom-Left */}
                  <rect
                    x="10"
                    y="110"
                    width="40"
                    height="40"
                    fill="#091e32"
                    rx="4"
                  />
                  <rect
                    x="16"
                    y="116"
                    width="28"
                    height="28"
                    fill="white"
                    rx="2"
                  />
                  <rect
                    x="22"
                    y="122"
                    width="16"
                    height="16"
                    fill="#091e32"
                    rx="2"
                  />

                  {/* Matrix Patterns */}
                  <rect x="58" y="12" width="10" height="10" fill="#091e32" />
                  <rect x="74" y="12" width="10" height="10" fill="#091e32" />
                  <rect x="90" y="12" width="10" height="10" fill="#091e32" />

                  <rect x="12" y="58" width="10" height="10" fill="#091e32" />
                  <rect x="28" y="58" width="10" height="10" fill="#091e32" />
                  <rect x="44" y="58" width="10" height="10" fill="#091e32" />

                  <rect x="58" y="30" width="10" height="10" fill="#091e32" />
                  <rect x="90" y="30" width="10" height="10" fill="#091e32" />

                  <rect x="58" y="46" width="10" height="10" fill="#091e32" />
                  <rect x="74" y="46" width="10" height="10" fill="#091e32" />
                  <rect x="90" y="46" width="10" height="10" fill="#091e32" />

                  <rect x="110" y="58" width="10" height="10" fill="#091e32" />
                  <rect x="126" y="58" width="10" height="10" fill="#091e32" />
                  <rect x="142" y="58" width="10" height="10" fill="#091e32" />

                  <rect x="58" y="104" width="10" height="10" fill="#091e32" />
                  <rect x="74" y="104" width="10" height="10" fill="#091e32" />
                  <rect x="90" y="104" width="10" height="10" fill="#091e32" />

                  <rect x="110" y="90" width="10" height="10" fill="#091e32" />
                  <rect x="130" y="90" width="10" height="10" fill="#091e32" />

                  <rect x="110" y="120" width="10" height="10" fill="#091e32" />
                  <rect x="126" y="136" width="14" height="14" fill="#091e32" />

                  {/* Center School Shield Overlay */}
                  <rect
                    x="62"
                    y="62"
                    width="36"
                    height="36"
                    fill="white"
                    rx="6"
                  />
                  <rect
                    x="66"
                    y="66"
                    width="28"
                    height="28"
                    fill="#f4a261"
                    rx="4"
                  />
                  <circle cx="80" cy="80" r="8" fill="#091e32" />
                  <polygon points="76,80 80,74 84,80" fill="white" />
                </svg>
              </div>

              {/* Right Side Purpose */}
              <div style={{ textAlign: "center", width: "90px" }}>
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    lineHeight: "1.1",
                    color: "#091e32",
                    marginBottom: "8px",
                  }}
                >
                  MORNING DROP-OFF & AFTERNOON PICK-UP
                </div>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    margin: "0 auto",
                    background: "#f1f5f9",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#134074",
                  }}
                >
                  <Car size={24} />
                </div>
              </div>
            </div>

            {/* Tag Code Header */}
            <div className="car-tag-huge-code">{student.carTag}</div>

            {/* Sub Labels */}
            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "1rem",
                fontWeight: 800,
                letterSpacing: "1px",
                color: "#091e32",
                marginTop: "6px",
              }}
            >
              PARENT CAR TAG
            </div>

            <div className="car-tag-sub-banner">
              THANK YOU FOR KEEPING OUR STUDENTS SAFE
            </div>

            {/* View Subtitle */}
            <div
              style={{
                fontSize: "0.72rem",
                color: "#64748b",
                marginTop: "10px",
                fontWeight: 600,
              }}
            >
              {side === "front"
                ? "FRONT SIDE (Windshield View) — Scan this side for student details"
                : "BACK SIDE (Rear View) — Scan this side for student details"}
            </div>

            <div
              style={{
                fontSize: "0.65rem",
                letterSpacing: "1px",
                color: "#94a3b8",
                marginTop: "4px",
                fontWeight: 700,
              }}
            >
              ONE SCHOOL • ONE COMMUNITY • BRIGHTER TOMORROWS
            </div>
          </div>

          {/* Privacy Note from Page 5 */}
          {/* <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "12px 14px",
              fontSize: "0.78rem",
              color: "#475569",
              lineHeight: 1.4,
            }}
          >
            <strong style={{ color: "#091e32" }}>
              Safety & Privacy Protocol:
            </strong>{" "}
            This QR code contains a rotatable, cryptographic tag identifier. No
            child personal information, telephone numbers, or home addresses are
            exposed in the raw QR payload. Only authenticated Moon School staff
            can decode student release permissions.
          </div> */}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn-primary-confirm"
              style={{ flex: 1.4 }}
              onClick={() => {
                onClose();
                onLaunchTeacherScan();
              }}
            >
              <Smartphone size={16} />
              <span>Simulate Teacher Scanning This Tag</span>
            </button>
            <button
              className="pill-status-btn"
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => window.print()}
            >
              <Printer size={16} />
              <span>Print Tag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
