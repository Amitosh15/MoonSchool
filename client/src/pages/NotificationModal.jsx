import React from "react";
import {
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Car,
  Bus,
  Building,
} from "lucide-react";

export default function NotificationsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "Afternoon Automated Gate Open",
      desc: "Gate opened at 3:30 PM. Parents may begin staging in front of assigned poles 1–14.",
      time: "3:30 PM",
      icon: Car,
      bg: "#e0f2fe",
      color: "#0284c7",
    },
    {
      id: 2,
      title: "Curbside Pole Assigned: Pole 7",
      desc: "Ama Safranie has been staged at Pole 7 in Lane 3 with Ms. Higgins.",
      time: "3:18 PM",
      icon: CheckCircle2,
      bg: "#ecfdf5",
      color: "#059669",
    },
    {
      id: 3,
      title: "Morning Drop-Off Confirmed",
      desc: "Ama Safranie was safely dropped off at Gate 2 - Lane 2. Attendance marked present.",
      time: "8:02 AM",
      icon: CheckCircle2,
      bg: "#f0fdf4",
      color: "#16a34a",
    },
    {
      id: 4,
      title: "Bus #12 En Route",
      desc: "Route #4 driver Robert Lee started regular school pickup run.",
      time: "7:40 AM",
      icon: Bus,
      bg: "#fef3c7",
      color: "#b45309",
    },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        style={{ maxWidth: "500px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: "#091e32" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Bell size={18} color="#38bdf8" />
            <h3>Transportation Notifications</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: n.bg,
                      color: n.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: "0.88rem",
                          color: "#091e32",
                        }}
                      >
                        {n.title}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                        {n.time}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#475569",
                        marginTop: "2px",
                        lineHeight: 1.4,
                      }}
                    >
                      {n.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="btn-primary-confirm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
