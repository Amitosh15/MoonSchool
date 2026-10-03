import React from "react";
import {
  Users,
  UserCheck,
  Clock,
  Bus,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Shield,
  Settings,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Info,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MODULES = {
  students: {
    title: "Students",
    simpleText: "Students",
    description:
      "Manage student records, enrollment status, grade rosters, and dismissal RFID tags.",
    badge: "842 Enrolled Students",
    icon: Users,
    items: [
      {
        id: "STU-1001",
        name: "Leo Davis",
        grade: "Grade 4",
        homeroom: "Room 204",
        tag: "RFID-9812",
        status: "Checked In",
        bus: "Route 04",
      },
      {
        id: "STU-1002",
        name: "Maya Lin",
        grade: "Grade 2",
        homeroom: "Room 108",
        tag: "RFID-9813",
        status: "Checked In",
        bus: "Parent Pickup",
      },
      {
        id: "STU-1003",
        name: "Lucas Miller",
        grade: "Grade 3",
        homeroom: "Room 112",
        tag: "RFID-9814",
        status: "Checked In",
        bus: "Route 02",
      },
      {
        id: "STU-1004",
        name: "Sophia Martinez",
        grade: "Grade 5",
        homeroom: "Room 301",
        tag: "RFID-9815",
        status: "Checked In",
        bus: "Route 08",
      },
      {
        id: "STU-1005",
        name: "Ethan Walker",
        grade: "Grade 1",
        homeroom: "Room 102",
        tag: "RFID-9816",
        status: "Checked In",
        bus: "Parent Pickup",
      },
      {
        id: "STU-1006",
        name: "Olivia Taylor",
        grade: "Grade 4",
        homeroom: "Room 205",
        tag: "RFID-9817",
        status: "Checked In",
        bus: "Route 01",
      },
    ],
  },
  parents: {
    title: "Parents / Guardians",
    simpleText: "Parents / Guardians",
    description:
      "View authorized guardians, verified emergency contacts, and mobile pickup authorization passes.",
    badge: "612 Verified Guardians",
    icon: UserCheck,
    items: [
      {
        id: "PAR-401",
        name: "Amanda Davis",
        phone: "(555) 234-5678",
        student: "Leo Davis",
        relationship: "Mother",
        passType: "Digital QR + RFID",
      },
      {
        id: "PAR-402",
        name: "Kevin Lin",
        phone: "(555) 345-6789",
        student: "Maya Lin",
        relationship: "Father",
        passType: "Digital QR",
      },
      {
        id: "PAR-403",
        name: "Sarah Miller",
        phone: "(555) 456-7890",
        student: "Lucas Miller",
        relationship: "Mother",
        passType: "Digital QR + RFID",
      },
      {
        id: "PAR-404",
        name: "Carlos Martinez",
        phone: "(555) 567-8901",
        student: "Sophia Martinez",
        relationship: "Father",
        passType: "Digital QR",
      },
    ],
  },
  queue: {
    title: "Live Queue",
    simpleText: "Live Queue",
    description:
      "Real-time vehicle queue management, lane assignments, and automated RFID gate clearance monitoring.",
    badge: "Lane System Active",
    icon: Clock,
    items: [
      {
        id: "Q-01",
        lane: "Pole 1 (Main Entrance)",
        vehicle: "Silver Honda Odyssey",
        driver: "Amanda Davis",
        student: "Leo Davis",
        wait: "1.2 min",
      },
      {
        id: "Q-02",
        lane: "Pole 3 (Carpool Express)",
        vehicle: "Blue Subaru Outback",
        driver: "Kevin Lin",
        student: "Maya Lin",
        wait: "2.1 min",
      },
      {
        id: "Q-03",
        lane: "Pole 5 (West Gate)",
        vehicle: "White Ford Explorer",
        driver: "Sarah Miller",
        student: "Lucas Miller",
        wait: "3.0 min",
      },
    ],
  },
  buses: {
    title: "Bus Management",
    simpleText: "Bus Management",
    description:
      "Fleet GPS tracking, driver rosters, route waypoints, and automated depot clearance logs.",
    badge: "8 Active Bus Routes",
    icon: Bus,
    items: [
      {
        id: "BUS-01",
        route: "Route 01 - East Valley",
        driver: "Marcus Bell",
        students: 38,
        status: "On Schedule",
        eta: "Normal",
      },
      {
        id: "BUS-02",
        route: "Route 02 - North Ridge",
        driver: "David Sterling",
        students: 42,
        status: "On Schedule",
        eta: "Normal",
      },
      {
        id: "BUS-04",
        route: "Route 04 - West End Express",
        driver: "Patricia Gomez",
        students: 34,
        status: "At Campus",
        eta: "Docked",
      },
      {
        id: "BUS-08",
        route: "Route 08 - South Hills",
        driver: "Elena Rostova",
        students: 29,
        status: "On Schedule",
        eta: "Normal",
      },
    ],
  },
  gates: {
    title: "Gate Control",
    simpleText: "Gate Control",
    description:
      "Automated barrier gate diagnostics, RFID reader hardware sensors, and manual safety override controls.",
    badge: "Automated Mode",
    icon: ShieldCheck,
    items: [
      {
        id: "GATE-01",
        name: "Main North Entrance (Lane 1)",
        mode: "Automatic Schedule",
        sensor: "RFID + Camera",
        status: "Operational",
      },
      {
        id: "GATE-02",
        name: "South Bus Depot Barrier (Lane 2)",
        mode: "Automatic Schedule",
        sensor: "RFID Reader",
        status: "Operational",
      },
      {
        id: "GATE-03",
        name: "Emergency Pedestrian Gate",
        mode: "Secured Access",
        sensor: "Keycard + Pin",
        status: "Operational",
      },
    ],
  },
  late: {
    title: "Late Arrivals & Fees",
    simpleText: "Late Arrivals & Fees",
    description:
      "Automated dismissal grace period tracker, after-hours late fee calculations ($1/min), and payment ledger.",
    badge: "Policy: $1.00 / Min",
    icon: AlertTriangle,
    items: [
      {
        id: "LATE-101",
        date: "Today",
        student: "Marcus Vance",
        timeIn: "8:35 AM",
        reason: "Heavy traffic",
        fee: "$0.00 (Excused)",
      },
      {
        id: "LATE-102",
        date: "Yesterday",
        student: "Chloe Bennett",
        timeIn: "4:12 PM",
        reason: "Late pickup",
        fee: "$12.00 (Pending)",
      },
    ],
  },
  reports: {
    title: "Reports & Audit",
    simpleText: "Reports & Audit",
    description:
      "Download daily dismissal logs, arrival punctuality statistics, and security compliance audit trails.",
    badge: "Compliance Ready",
    icon: FileText,
    items: [
      {
        id: "REP-01",
        report: "Daily Student Attendance & Check-in Roster",
        generated: "Today, 8:30 AM",
        format: "PDF / CSV",
      },
      {
        id: "REP-02",
        report: "Fleet Route Departure & Depot Arrival Log",
        generated: "Today, 8:40 AM",
        format: "CSV",
      },
      {
        id: "REP-03",
        report: "Gate RFID Sensor Diagnostic & Access Audit",
        generated: "Yesterday, 5:00 PM",
        format: "PDF",
      },
    ],
  },
  users: {
    title: "Users & Roles",
    simpleText: "Users & Roles",
    description:
      "Staff directory, security officer access credentials, front desk permissions, and role management.",
    badge: "Role-Based Access",
    icon: Shield,
    items: [
      {
        id: "USR-01",
        name: "Officer Vance",
        role: "Lead Safety Administrator",
        permissions: "Full Access (Gates + Fleet + Fees)",
      },
      {
        id: "USR-02",
        name: "Principal Higgins",
        role: "Campus Principal",
        permissions: "Super Admin",
      },
      {
        id: "USR-03",
        name: "Elena Ramos",
        role: "Front Desk Dispatcher",
        permissions: "Student & Parent Roster",
      },
    ],
  },
  settings: {
    title: "Settings",
    simpleText: "Settings",
    description:
      "System configurations, bell schedules, SMS notification gateways, and hardware integration parameters.",
    badge: "System Version 2.4.0",
    icon: Settings,
    items: [
      {
        id: "SET-01",
        setting: "Morning Arrival Window",
        value: "8:05 AM – 8:30 AM",
      },
      {
        id: "SET-02",
        setting: "Afternoon Dismissal Window",
        value: "3:30 PM – 4:00 PM",
      },
      { id: "SET-03", setting: "Late Fee Grace Period", value: "10 Minutes" },
      {
        id: "SET-04",
        setting: "Automated SMS Alerts",
        value: "Enabled (Twilio Gateway)",
      },
    ],
  },
};

export default function AdminModuleView({ activeNav, onShowNotice }) {
  const navigate = useNavigate();
  const moduleData = MODULES[activeNav] || {
    title: activeNav
      ? activeNav.charAt(0).toUpperCase() + activeNav.slice(1)
      : "Module",
    simpleText: activeNav || "Module",
    description: `Information and records for ${activeNav}.`,
    badge: "Admin Module",
    icon: Info,
    items: [],
  };

  const Icon = moduleData.icon;

  return (
    <div className="admin-module-page">
      {/* Breadcrumb & Navigation Back */}
      <div className="module-top-nav">
        <div className="module-breadcrumbs">
          <span className="crumb" onClick={() => navigate("/admin")}>
            Admin
          </span>
          <ChevronRight size={14} className="crumb-sep" />
          <span className="crumb active">{moduleData.title}</span>
        </div>
      </div>
    </div>
  );
}
