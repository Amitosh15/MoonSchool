import { useState, useMemo } from "react";
import {
  Sunrise,
  Clock,
  Users,
  UserCheck,
  Bus,
  Car,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Radio,
  Search,
  Plus,
  Video,
  AlertCircle,
  X,
  FileText,
  Check,
  Eye,
  Building,
} from "lucide-react";
import { useDismissal } from "../../context";
import "./admin-morning.css";

const INITIAL_DROP_OFFS = [
  {
    id: "DROP-101",
    time: "08:24 AM",
    studentName: "Ama Afranie",
    studentId: "MS-001",
    grade: "Grade 2",
    homeroom: "Hr. 2A",
    transporterType: "Parent",
    transporterName: "John Afranie (Father)",
    vehicle: "SUV • Toyota Highlander (Gray)",
    plate: "7XYZ90",
    lane: "Lane 1 (North Gate)",
    gpsLocation: "Detected School Gate (35.227, -80.843)",
    status: "Verified",
    timestamp: "8:24:12 AM",
    isLate: false,
  },
  {
    id: "DROP-102",
    time: "08:21 AM",
    studentName: "Lucas Miller",
    studentId: "MS-002",
    grade: "Grade 3",
    homeroom: "Hr. 3B",
    transporterType: "Bus",
    transporterName: "Bus Route 04 (Driver M. Jenkins)",
    vehicle: "Bus #4 • International Blue Bird",
    plate: "BUS-04",
    lane: "Gate 1 (Bus Loop)",
    gpsLocation: "North Gate RFID Loop Reader",
    status: "Verified",
    timestamp: "8:21:05 AM",
    isLate: false,
  },
  {
    id: "DROP-103",
    time: "08:32 AM",
    studentName: "David Cho",
    studentId: "MS-003",
    grade: "Grade 4",
    homeroom: "Hr. 4A",
    transporterType: "Parent",
    transporterName: "Michael Cho (Father)",
    vehicle: "Sedan • Blue Civic",
    plate: "4ABC12",
    lane: "School Lobby Curbside",
    gpsLocation: "Lobby Front Desk Terminal",
    status: "Late Arrival (Lobby)",
    timestamp: "8:32:44 AM",
    isLate: true,
    lateReason: "Heavy traffic on Exit 25",
  },
  {
    id: "DROP-104",
    time: "08:18 AM",
    studentName: "Maya Lin",
    studentId: "MS-004",
    grade: "Grade 2",
    homeroom: "Hr. 2B",
    transporterType: "Third Party",
    transporterName: "Beatrice (Authorized Nanny)",
    vehicle: "Minivan • Silver Odyssey",
    plate: "8XK-92",
    lane: "Lane 2 (Express Drop)",
    gpsLocation: "Detected School Gate GPS Beacon",
    status: "Verified",
    timestamp: "8:18:22 AM",
    isLate: false,
  },
  {
    id: "DROP-105",
    time: "08:15 AM",
    studentName: "Leo Davis",
    studentId: "MS-005",
    grade: "Grade 4",
    homeroom: "Hr. 4B",
    transporterType: "Bus",
    transporterName: "Bus Route 08 (Driver T. Vance)",
    vehicle: "Bus #8 • Blue Bird Transit",
    plate: "BUS-08",
    lane: "Gate 2 (South Depot)",
    gpsLocation: "South Depot RFID Receiver",
    status: "Verified",
    timestamp: "8:15:39 AM",
    isLate: false,
  },
  {
    id: "DROP-106",
    time: "08:12 AM",
    studentName: "Sophia Martinez",
    studentId: "MS-006",
    grade: "Grade 1",
    homeroom: "Hr. 1A",
    transporterType: "Parent",
    transporterName: "Elena Martinez (Mother)",
    vehicle: "SUV • White RAV4",
    plate: "9MNO34",
    lane: "Lane 1 (North Gate)",
    gpsLocation: "Detected School Gate (35.228, -80.842)",
    status: "Verified",
    timestamp: "8:12:18 AM",
    isLate: false,
  },
  {
    id: "DROP-107",
    time: "08:09 AM",
    studentName: "Marcus Vance",
    studentId: "MS-007",
    grade: "Grade 2",
    homeroom: "Hr. 2A",
    transporterType: "Parent",
    transporterName: "Rachel Vance (Mother)",
    vehicle: "SUV • Black Tahoe",
    plate: "2VNC88",
    lane: "Lane 2 (Express Drop)",
    gpsLocation: "Detected School Gate GPS Beacon",
    status: "Verified",
    timestamp: "8:09:40 AM",
    isLate: false,
  },
  {
    id: "DROP-108",
    time: "08:06 AM",
    studentName: "Sarah Jenkins",
    studentId: "MS-008",
    grade: "Grade 3",
    homeroom: "Hr. 3A",
    transporterType: "Third Party",
    transporterName: "Lisa Jenkins (Aunt)",
    vehicle: "Sedan • Gray Accord",
    plate: "5JNK77",
    lane: "Lane 1 (North Gate)",
    gpsLocation: "Detected School Gate GPS Beacon",
    status: "Verified",
    timestamp: "8:06:55 AM",
    isLate: false,
  },
];

const INITIAL_BUS_ARRIVALS = [
  {
    route: "Route 04",
    name: "North Ridge Route",
    driver: "M. Jenkins",
    phone: "704-555-8833",
    studentsCount: 32,
    arrivalTime: "8:16 AM",
    gate: "Gate 1 (RFID Scanner)",
    status: "Arrived",
    statusClass: "positive",
  },
  {
    route: "Route 08",
    name: "Westwood Express",
    driver: "T. Vance",
    phone: "704-555-4422",
    studentsCount: 28,
    arrivalTime: "8:12 AM",
    gate: "South Bus Depot",
    status: "Arrived",
    statusClass: "positive",
  },
  {
    route: "Route 12",
    name: "Highland Park Line",
    driver: "S. Ramos",
    phone: "704-555-7711",
    studentsCount: 24,
    arrivalTime: "8:22 AM (ETA)",
    gate: "Gate 1 Bus Loop",
    status: "Delayed (+6m)",
    statusClass: "warning",
    delayNote: "Congestion at Main & 4th intersection",
  },
  {
    route: "Route 02",
    name: "Downtown Shuttle",
    driver: "B. Wright",
    phone: "704-555-9900",
    studentsCount: 18,
    arrivalTime: "8:28 AM (ETA)",
    gate: "South Bus Depot",
    status: "En Route",
    statusClass: "info",
    delayNote: "On track, 1.2 miles away",
  },
];

export default function AdminMorningDropOff({ onShowNotice }) {
  const dismissal = useDismissal();

  // State
  const [dropOffs, setDropOffs] = useState(INITIAL_DROP_OFFS);
  const [buses, setBuses] = useState(INITIAL_BUS_ARRIVALS);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [gateStatus, setGateStatus] = useState("open"); // 'open' | 'closed' | 'closing'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showLobbyModal, setShowLobbyModal] = useState(false);
  const [selectedLobbyStudent, setSelectedLobbyStudent] = useState(null);

  // Manual Log Form State
  const [newLogData, setNewLogData] = useState({
    studentName: "",
    studentId: "MS-009",
    grade: "Grade 3",
    transporterType: "Parent",
    transporterName: "",
    vehicle: "SUV (Gray Honda)",
    plate: "3ABC89",
    lane: "Lane 1 (North Gate)",
    isLate: false,
    notes: "",
  });

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const totalArrived = 138 + (dropOffs.length - INITIAL_DROP_OFFS.length);
    const lateCount = dropOffs.filter((d) => d.isLate).length;
    const busArrivedCount = buses.filter((b) => b.status === "Arrived").length;
    return {
      arrived: totalArrived,
      late: lateCount,
      busArrived: busArrivedCount,
      busTotal: buses.length,
      absent: 7,
    };
  }, [dropOffs, buses]);

  // Filtered Records
  const filteredDropOffs = useMemo(() => {
    return dropOffs.filter((item) => {
      const matchesType =
        filterType === "all" ||
        (filterType === "parent" && item.transporterType === "Parent") ||
        (filterType === "bus" && item.transporterType === "Bus") ||
        (filterType === "third-party" &&
          item.transporterType === "Third Party") ||
        (filterType === "late" && item.isLate);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.studentName.toLowerCase().includes(q) ||
        item.studentId.toLowerCase().includes(q) ||
        item.vehicle.toLowerCase().includes(q) ||
        item.lane.toLowerCase().includes(q) ||
        item.transporterName.toLowerCase().includes(q);

      return matchesType && matchesSearch;
    });
  }, [dropOffs, filterType, searchQuery]);

  // Handle Manual Log Submission
  const handleSaveManualLog = (e) => {
    e.preventDefault();
    if (!newLogData.studentName.trim()) {
      alert("Please enter a student name");
      return;
    }

    const currentTimeStr = dismissal?.currentTime || "8:25 AM";
    const newEntry = {
      id: `DROP-${Date.now().toString().slice(-4)}`,
      time: currentTimeStr,
      studentName: newLogData.studentName,
      studentId: newLogData.studentId || `MS-${Math.floor(100 + Math.random() * 900)}`,
      grade: newLogData.grade,
      homeroom: "Gr. Room",
      transporterType: newLogData.transporterType,
      transporterName: newLogData.transporterName || "Authorized Guardian",
      vehicle: newLogData.vehicle,
      plate: newLogData.plate || "7XXX00",
      lane: newLogData.lane,
      gpsLocation: "Detected School Gate GPS Beacon",
      status: newLogData.isLate ? "Late Arrival (Lobby)" : "Verified",
      timestamp: new Date().toLocaleTimeString(),
      isLate: newLogData.isLate,
      lateReason: newLogData.isLate ? newLogData.notes || "Recorded by Admin" : "",
    };

    setDropOffs([newEntry, ...dropOffs]);
    setShowLogModal(false);
    setNewLogData({
      studentName: "",
      studentId: "MS-009",
      grade: "Grade 3",
      transporterType: "Parent",
      transporterName: "",
      vehicle: "SUV (Gray Honda)",
      plate: "3ABC89",
      lane: "Lane 1 (North Gate)",
      isLate: false,
      notes: "",
    });

    if (onShowNotice) {
      onShowNotice(
        `✓ Drop-off logged successfully for ${newEntry.studentName} (${newEntry.studentId}).`
      );
    }
  };

  // Verify Late Student in Lobby
  const handleVerifyLobbyStudent = (record, reason = "Approved by Front Desk") => {
    setDropOffs((prev) =>
      prev.map((d) =>
        d.id === record.id
          ? {
            ...d,
            status: "Front Desk Cleared",
            lateReason: reason,
            verifiedAt: dismissal?.currentTime || "8:35 AM",
          }
          : d
      )
    );
    setShowLobbyModal(false);
    setSelectedLobbyStudent(null);
    if (onShowNotice) {
      onShowNotice(
        `✓ Late arrival for ${record.studentName} verified and cleared to homeroom.`
      );
    }
  };

  // Toggle Gate Barrier
  const handleToggleGate = () => {
    const nextState = gateStatus === "open" ? "closed" : "open";
    setGateStatus(nextState);
    if (onShowNotice) {
      onShowNotice(
        nextState === "open"
          ? "Automated Barrier Gate 1 & 2 opened for morning arrival window (8:05 - 8:30 AM)."
          : "Automated Barrier Gate closed. Remaining morning arrivals redirected to front desk lobby."
      );
    }
  };

  return (
    <div className="admin-morning-container">
      {/* Top Banner & Arrival Window Telemetry */}
      <div className="morning-top-banner">
        <div className="morning-banner-main">
          <div className="morning-title-badge">
            <Sunrise size={14} />
            <span>Core Process • Arrival Window: 8:05 AM – 8:30 AM (Moon Time)</span>
          </div>
          <h2>Morning School Drop-Off Command Center</h2>
          <p>
            Real-time capture of Student ID, transporter type (Parent / Bus / Third Party), vehicle details,
            GPS lane telemetry and automated gate security. Gate closes at 8:30 AM; late arrivals report to lobby.
          </p>
        </div>

        {/* Gate Status & Live Controls */}
        <div className="morning-banner-controls">
          <div className={`gate-status-pill ${gateStatus}`}>
            <span className="gate-status-dot" />
            <div className="gate-status-texts">
              <strong>
                {gateStatus === "open"
                  ? "Gate Open (8:05 – 8:30 AM)"
                  : gateStatus === "closing"
                    ? "Gate Auto-Closing..."
                    : "Gate Closed (After 8:30 AM)"}
              </strong>
              <span>
                {gateStatus === "open"
                  ? "Sensors Active • Loops Detecting"
                  : "Late Arrivals Directed to Lobby"}
              </span>
            </div>
          </div>

          <div className="morning-header-btns">
            <button
              className={`btn-gate-toggle ${gateStatus === "open" ? "close-mode" : "open-mode"}`}
              onClick={handleToggleGate}
              title="Manual Gate Override"
            >
              <ShieldCheck size={16} />
              <span>{gateStatus === "open" ? "Manual Close (8:30 AM)" : "Open Gate"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid (Matching PDF Page 4: 138 Arrived, 4 Late, 6 Buses, 7 Absent) */}
      <div className="admin-stats-grid">
        {/* Card 1: Students Arrived */}
        <div className="stat-metric-card">
          <div className="stat-card-top">
            <span className="stat-card-label">Checked In (Live)</span>
            <div
              className="stat-card-icon"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}
            >
              <UserCheck size={20} />
            </div>
          </div>
          <div className="stat-card-val-row">
            <span className="stat-card-value">{stats.arrived}</span>
            <span className="stat-card-badge positive">+14 in last 10m</span>
          </div>
          <div className="stat-card-footer-sub">
            <span>82% of student body on campus</span>
          </div>
        </div>

        {/* Card 2: Late Arrivals */}
        <div
          className="stat-metric-card"
          onClick={() => setFilterType("late")}
          style={{ cursor: "pointer" }}
          title="Filter for Late Arrivals"
        >
          <div className="stat-card-top">
            <span className="stat-card-label">Late Arrivals</span>
            <div
              className="stat-card-icon"
              style={{ backgroundColor: "rgba(245, 158, 11, 0.12)", color: "#f59e0b" }}
            >
              <Clock size={20} />
            </div>
          </div>
          <div className="stat-card-val-row">
            <span className="stat-card-value" style={{ color: "#d97706" }}>
              {stats.late}
            </span>
            <span
              className="stat-card-badge"
              style={{ background: "#fef3c7", color: "#b45309", border: "1px solid #fde68a" }}
            >
              Lobby Check-In
            </span>
          </div>
          <div className="stat-card-footer-sub">
            <span>Arrived after 8:30 AM cutoff</span>
          </div>
        </div>

        {/* Card 3: Bus Arrivals */}
        <div className="stat-metric-card">
          <div className="stat-card-top">
            <span className="stat-card-label">Bus Arrivals</span>
            <div
              className="stat-card-icon"
              style={{ backgroundColor: "rgba(2, 132, 199, 0.12)", color: "#0284c7" }}
            >
              <Bus size={20} />
            </div>
          </div>
          <div className="stat-card-val-row">
            <span className="stat-card-value">{stats.busArrived}</span>
            <span
              className="stat-card-badge"
              style={{ background: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd" }}
            >
              {stats.busArrived} of {stats.busTotal} Arrived
            </span>
          </div>
          <div className="stat-card-footer-sub">
            <span>2 routes en route with live GPS</span>
          </div>
        </div>

        {/* Card 4: Unreported Absences */}
        <div className="stat-metric-card">
          <div className="stat-card-top">
            <span className="stat-card-label">Unreported Absences</span>
            <div
              className="stat-card-icon"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.12)", color: "#ef4444" }}
            >
              <ShieldAlert size={20} />
            </div>
          </div>
          <div className="stat-card-val-row">
            <span className="stat-card-value" style={{ color: "#dc2626" }}>
              {stats.absent}
            </span>
            <span
              className="stat-card-badge"
              style={{ background: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca" }}
            >
              Pending Arrival
            </span>
          </div>
          <div className="stat-card-footer-sub">
            <span>Automated SMS sent to parents</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Matching PDF Page 4) */}
      <div className="morning-main-grid">
        {/* Left Column: Recent Drop-Offs (Live) & Bus Arrivals */}
        <div className="morning-left-col">
          {/* Table Card 1: Recent Drop-Offs (Live) */}
          <div className="morning-card">
            <div className="morning-card-header">
              <div className="morning-card-title-group">
                <div className="title-with-badge">
                  <h3>Recent Drop-Offs (Live)</h3>
                  <span className="live-data-badge">
                    <span className="pulse-dot" />
                    <span>Real-Time Stream</span>
                  </span>
                </div>
                <p>
                  Live telemetry captured at Gate 1, Gate 2 & Curbside sensor loops
                </p>
              </div>

              {/* Filters & Search */}
              <div className="morning-card-actions">
                <div className="filter-pill-group">
                  <button
                    className={`filter-btn ${filterType === "all" ? "active" : ""}`}
                    onClick={() => setFilterType("all")}
                  >
                    All ({dropOffs.length})
                  </button>
                  <button
                    className={`filter-btn ${filterType === "parent" ? "active" : ""}`}
                    onClick={() => setFilterType("parent")}
                  >
                    Parent
                  </button>
                  <button
                    className={`filter-btn ${filterType === "bus" ? "active" : ""}`}
                    onClick={() => setFilterType("bus")}
                  >
                    Bus
                  </button>
                  <button
                    className={`filter-btn ${filterType === "third-party" ? "active" : ""}`}
                    onClick={() => setFilterType("third-party")}
                  >
                    Third Party
                  </button>
                  <button
                    className={`filter-btn late-pill ${filterType === "late" ? "active" : ""}`}
                    onClick={() => setFilterType("late")}
                  >
                    Late ({stats.late})
                  </button>
                </div>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="table-search-row">
              <div className="table-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by student name, ID, vehicle, or lane..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="clear-search-btn"
                    onClick={() => setSearchQuery("")}
                  >
                    ✕
                  </button>
                )}
              </div>
              <span className="table-results-counter">
                Showing {filteredDropOffs.length} of {dropOffs.length} arrival events
              </span>
            </div>

            {/* Drop-Offs Table (Specified on PDF pages 1, 2, 4, 5) */}
            <div className="morning-table-wrap">
              <table className="morning-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Student</th>
                    <th>Drop-Off Type</th>
                    <th>Vehicle</th>
                    <th>Lane</th>
                    <th>GPS Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDropOffs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="empty-table-cell">
                        <AlertCircle size={22} color="#94a3b8" />
                        <p>No arrival records found matching your filter criteria.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredDropOffs.map((item) => (
                      <tr
                        key={item.id}
                        className={item.isLate ? "late-row-highlight" : ""}
                      >
                        <td>
                          <div className="table-time-box">
                            <Clock size={12} color="#0284c7" />
                            <span>{item.time}</span>
                          </div>
                        </td>
                        <td>
                          <div className="table-student-box">
                            <strong className="student-name-text">{item.studentName}</strong>
                            <div className="student-sub-row">
                              <span className="student-id-pill">{item.studentId}</span>
                              <span className="student-grade-text">{item.grade} • {item.homeroom}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`transporter-badge ${item.transporterType.toLowerCase().replace(/\s+/g, "-")}`}>
                            {item.transporterType === "Parent" && <UserCheck size={12} />}
                            {item.transporterType === "Bus" && <Bus size={12} />}
                            {item.transporterType === "Third Party" && <Users size={12} />}
                            <span>{item.transporterType}</span>
                          </span>
                        </td>
                        <td>
                          <div className="table-vehicle-box">
                            <span className="vehicle-title">{item.vehicle}</span>
                            <span className="plate-badge">{item.plate}</span>
                          </div>
                        </td>
                        <td>
                          <span className="lane-tag">{item.lane}</span>
                        </td>
                        <td>
                          <div className="table-gps-box" title={item.gpsLocation}>
                            <MapPin size={11} color="#0284c7" />
                            <span>{item.gpsLocation.replace("Detected ", "")}</span>
                          </div>
                        </td>
                        <td>
                          {item.isLate ? (
                            <span
                              className={`status-chip ${item.status.includes("Cleared")
                                ? "cleared"
                                : "late-lobby"
                                }`}
                            >
                              {item.status}
                            </span>
                          ) : (
                            <span className="status-chip verified">
                              <CheckCircle2 size={12} />
                              <span>{item.status}</span>
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="table-row-actions">
                            <button
                              className="btn-view-details"
                              onClick={() => setSelectedRecord(item)}
                              title="Inspect Arrival Metadata"
                            >
                              <Eye size={12} />
                              <span>Details</span>
                            </button>
                            {item.isLate && !item.status.includes("Cleared") && (
                              <button
                                className="btn-verify-lobby"
                                onClick={() => {
                                  setSelectedLobbyStudent(item);
                                  setShowLobbyModal(true);
                                }}
                                title="Verify Late Arrival in School Lobby"
                              >
                                <Check size={12} />
                                <span>Verify</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Card 2: Bus Arrivals (Today) (Matching PDF Page 4 Screenshot) */}
          <div className="morning-card">
            <div className="morning-card-header">
              <div className="morning-card-title-group">
                <div className="title-with-badge">
                  <h3>Bus Arrivals (Today)</h3>
                  <span className="bus-fleet-tag">
                    <Bus size={12} />
                    <span>8 Active Routes</span>
                  </span>
                </div>
                <p>Transit fleet telemetry, student rosters, driver contacts, and gate clearance</p>
              </div>
            </div>

            <div className="morning-table-wrap">
              <table className="morning-table">
                <thead>
                  <tr>
                    <th>Bus Route</th>
                    <th>Driver Contact</th>
                    <th>Students</th>
                    <th>Arrival / ETA</th>
                    <th>Gate Location</th>
                    <th>Route Status</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.route}>
                      <td>
                        <div className="bus-route-group">
                          <strong>{bus.route}</strong>
                          <span>{bus.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="driver-cell">
                          <span>{bus.driver}</span>
                          <span className="driver-phone">{bus.phone}</span>
                        </div>
                      </td>
                      <td>
                        <span className="students-count-pill">
                          <Users size={12} />
                          <span>{bus.studentsCount}</span>
                        </span>
                      </td>
                      <td>
                        <div className="table-time-box">
                          <Clock size={12} color="#0284c7" />
                          <strong>{bus.arrivalTime}</strong>
                        </div>
                      </td>
                      <td>
                        <span className="gate-tag">{bus.gate}</span>
                      </td>
                      <td>
                        <span className={`bus-status-badge ${bus.statusClass}`}>
                          {bus.status === "Arrived" && <CheckCircle2 size={12} />}
                          {bus.status.includes("Delayed") && <AlertTriangle size={12} />}
                          {bus.status === "En Route" && <Radio size={12} />}
                          <span>{bus.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Gate & Traffic View + Alerts & Exceptions */}
        <div className="morning-right-col">
          {/* Card 1: Gate & Traffic Live Telemetry (Matching PDF Page 4 Screenshot) */}


          {/* Card 2: Alerts & Exceptions (Matching PDF Page 4 Screenshot) */}
          <div className="morning-card">
            <div className="morning-card-header">
              <div className="morning-card-title-group">
                <div className="title-with-badge">
                  <h3>Alerts & Exceptions</h3>
                  <span className="alerts-count-badge">3 Attention Required</span>
                </div>
                <p>System irregularities, late arrivals, and gate alerts</p>
              </div>
            </div>

            <div className="alerts-stack">
              {/* Alert 1: Late Arrival */}
              <div className="exception-item amber">
                <div className="exception-icon-box">
                  <AlertTriangle size={18} />
                </div>
                <div className="exception-content">
                  <div className="exception-top">
                    <strong>Late Arrival (Post-8:30 AM Cutoff)</strong>
                    <span className="exception-time">08:32 AM</span>
                  </div>
                  <p>
                    David Cho (MS-003) arrived at 8:32 AM after gate closure. Parent Michael Cho escorted student to lobby.
                  </p>
                  <div className="exception-actions">
                    <button
                      className="btn-alert-action primary"
                      onClick={() => {
                        const davidRecord = dropOffs.find((d) => d.studentId === "MS-003");
                        setSelectedLobbyStudent(davidRecord);
                        setShowLobbyModal(true);
                      }}
                    >
                      <Building size={13} />
                      <span>Verify in Lobby</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert 2: Unregistered Vehicle */}
              <div className="exception-item red">
                <div className="exception-icon-box">
                  <ShieldAlert size={18} />
                </div>
                <div className="exception-content">
                  <div className="exception-top">
                    <strong>Third-Party Caregiver Verification</strong>
                    <span className="exception-time">08:18 AM</span>
                  </div>
                  <p>
                    Minivan (Plate 8XK-92) driven by Beatrice. Verified against secondary authorized pickup list.
                  </p>
                  <div className="exception-actions">
                    <button
                      className="btn-alert-action secondary"
                      onClick={() => {
                        const mayaRecord = dropOffs.find((d) => d.studentId === "MS-004");
                        setSelectedRecord(mayaRecord);
                      }}
                    >
                      <UserCheck size={13} />
                      <span>Review Record</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert 3: Bus Delay */}
              <div className="exception-item blue">
                <div className="exception-icon-box">
                  <Bus size={18} />
                </div>
                <div className="exception-content">
                  <div className="exception-top">
                    <strong>Transit Fleet Delay • Route 12</strong>
                    <span className="exception-time">08:14 AM</span>
                  </div>
                  <p>
                    Route 12 delayed +6 minutes due to Main St roadworks. Revised ETA 8:22 AM. 24 families notified via SMS.
                  </p>
                  <div className="exception-actions">
                    <button
                      className="btn-alert-action secondary"
                      onClick={() => {
                        if (onShowNotice) {
                          onShowNotice("Sent automated ETA update SMS to parents of Route 12 passengers.");
                        }
                      }}
                    >
                      <Radio size={13} />
                      <span>Resend SMS Alert</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Late Arrival Process Reference (PDF Page 2 Flow) */}
          <div className="morning-card late-flow-reference">
            <div className="late-flow-header">
              <Clock size={16} color="#d97706" />
              <h4>Late Arrival Standard Operating Procedure</h4>
            </div>
            <ol className="late-steps-list">
              <li>
                <strong>Gate Closes 8:30 AM:</strong> Automated barriers close promptly at 8:30 AM (Moon Time).
              </li>
              <li>
                <strong>App Late Check-In:</strong> Parents log arrival as "LATE ARRIVAL" on the parent app.
              </li>
              <li>
                <strong>Escort to Lobby:</strong> Parents park and walk student to the school front lobby.
              </li>
              <li>
                <strong>Front Desk Verification:</strong> Front desk verifies guardian identity, records arrival time, and clears student.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: STUDENT DROP-OFF RECORD DETAILS
          ========================================================================= */}
      {selectedRecord && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedRecord(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <FileText size={20} color="#0284c7" />
                <div>
                  <h3>Arrival Telemetry Record: {selectedRecord.studentName}</h3>
                  <span className="modal-subtitle">System ID: {selectedRecord.id} • Recorded: {selectedRecord.timestamp}</span>
                </div>
              </div>
              <button className="btn-close-modal" onClick={() => setSelectedRecord(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body-content">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Student Name</span>
                  <strong>{selectedRecord.studentName}</strong>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Student ID</span>
                  <span className="student-id-tag">{selectedRecord.studentId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Class & Homeroom</span>
                  <span>{selectedRecord.grade} ({selectedRecord.homeroom})</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Transporter Type</span>
                  <span className="transporter-badge parent">{selectedRecord.transporterType}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Transporter / Guardian</span>
                  <strong>{selectedRecord.transporterName}</strong>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Vehicle Information</span>
                  <span>{selectedRecord.vehicle}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">License Plate</span>
                  <span className="plate-badge">{selectedRecord.plate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Arrival Lane</span>
                  <span>{selectedRecord.lane}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Arrival Timestamp</span>
                  <strong>{selectedRecord.time} ({selectedRecord.timestamp})</strong>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">GPS & RFID Telemetry</span>
                  <code>{selectedRecord.gpsLocation}</code>
                </div>
                {selectedRecord.isLate && (
                  <div className="detail-item full-width late-callout">
                    <span className="detail-label">Late Arrival Note</span>
                    <p>{selectedRecord.lateReason || "Arrived after 8:30 AM gate cutoff."}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-modal-close"
                onClick={() => setSelectedRecord(null)}
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: MANUAL LOG DROP-OFF (ADMIN OVERRIDE)
          ========================================================================= */}
      {showLogModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowLogModal(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Plus size={20} color="#00a896" />
                <div>
                  <h3>Log Manual Student Drop-Off</h3>
                  <span className="modal-subtitle">Front Desk & Gate Security Entry</span>
                </div>
              </div>
              <button className="btn-close-modal" onClick={() => setShowLogModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveManualLog}>
              <div className="modal-body-content">
                <div className="form-group-grid">
                  <div className="form-field">
                    <label>Student Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Leo Davis"
                      value={newLogData.studentName}
                      onChange={(e) =>
                        setNewLogData({ ...newLogData, studentName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Student ID Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. MS-009"
                      value={newLogData.studentId}
                      onChange={(e) =>
                        setNewLogData({ ...newLogData, studentId: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>Transporter Type</label>
                    <select
                      value={newLogData.transporterType}
                      onChange={(e) =>
                        setNewLogData({ ...newLogData, transporterType: e.target.value })
                      }
                    >
                      <option value="Parent">Parent / Legal Guardian</option>
                      <option value="Bus">Bus Transit Fleet</option>
                      <option value="Third Party">Third Party (Caregiver/Nanny)</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Transporter Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Miller"
                      value={newLogData.transporterName}
                      onChange={(e) =>
                        setNewLogData({ ...newLogData, transporterName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>Vehicle Description</label>
                    <input
                      type="text"
                      placeholder="e.g. SUV • Toyota RAV4"
                      value={newLogData.vehicle}
                      onChange={(e) =>
                        setNewLogData({ ...newLogData, vehicle: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>Drop-Off Lane</label>
                    <select
                      value={newLogData.lane}
                      onChange={(e) =>
                        setNewLogData({ ...newLogData, lane: e.target.value })
                      }
                    >
                      <option value="Lane 1 (North Gate)">Lane 1 (North Gate)</option>
                      <option value="Lane 2 (Express Drop)">Lane 2 (Express Drop)</option>
                      <option value="Gate 1 (Bus Loop)">Gate 1 (Bus Loop)</option>
                      <option value="School Lobby Curbside">School Lobby Curbside</option>
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newLogData.isLate}
                        onChange={(e) =>
                          setNewLogData({ ...newLogData, isLate: e.target.checked })
                        }
                      />
                      <span>Mark as Late Arrival (After 8:30 AM Cutoff)</span>
                    </label>
                  </div>

                  {newLogData.isLate && (
                    <div className="form-field full-width">
                      <label>Late Reason / Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Doctor appointment, traffic, bus delay"
                        value={newLogData.notes}
                        onChange={(e) =>
                          setNewLogData({ ...newLogData, notes: e.target.value })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-modal-close"
                  onClick={() => setShowLogModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  Confirm & Log Drop-Off
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: LOBBY LATE ARRIVAL VERIFICATION (PAGE 2 PDF FLOW)
          ========================================================================= */}
      {showLobbyModal && selectedLobbyStudent && (
        <div className="admin-modal-backdrop" onClick={() => setShowLobbyModal(false)}>
          <div className="admin-modal-card lobby-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Building size={20} color="#d97706" />
                <div>
                  <h3>School Lobby Late Verification</h3>
                  <span className="modal-subtitle">Step 5: Front Desk Receives & Verifies Late Student</span>
                </div>
              </div>
              <button className="btn-close-modal" onClick={() => setShowLobbyModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body-content">
              <div className="lobby-alert-box">
                <AlertTriangle size={20} color="#b45309" />
                <div>
                  <strong>Parent & Student Present in Lobby</strong>
                  <p>
                    Parent {selectedLobbyStudent.transporterName} has parked and escorted{" "}
                    <strong>{selectedLobbyStudent.studentName} ({selectedLobbyStudent.studentId})</strong> into the front lobby.
                  </p>
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Student Name</span>
                  <strong>{selectedLobbyStudent.studentName}</strong>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Grade & Homeroom</span>
                  <span>{selectedLobbyStudent.grade}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Arrival Timestamp</span>
                  <span>{selectedLobbyStudent.time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Escorting Guardian</span>
                  <span>{selectedLobbyStudent.transporterName}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Reason Stated</span>
                  <p>{selectedLobbyStudent.lateReason || "Late arrival reported via Parent App."}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-modal-close"
                onClick={() => setShowLobbyModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-modal-submit verify-btn"
                onClick={() => handleVerifyLobbyStudent(selectedLobbyStudent)}
              >
                <Check size={16} />
                <span>Verify & Check In to Homeroom</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
