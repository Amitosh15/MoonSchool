# Moon School — Dropoff & Pickup Web System
### Freelance Project Plan & Weekly Progress Tracker

**Timeline:** 8 weeks | **Stack:** React (frontend) + Node.js/Express (backend) + PostgreSQL + WebSockets | **Team:** Solo

---

## 1. Project Summary (from client concept doc)

> Confirmed from `Moon_School_Dropoff_Pickup_Web_System_Concept.pdf` — the doc is largely mockup/diagram images; text below is what was extractable. Two pages (the process-flow diagram and the screen mockups) are visual only — **open those two pages yourself and skim them once** before Week 1 kickoff so you can validate/adjust the assumptions marked ⚠️ below.

- **Product:** A web system to manage student **arrival, dismissal & transportation** at a school ("Moon School").
- **Two user experiences:**
  - **Parent app/portal** — *mobile-first and action-oriented* (e.g. check-in on arrival, request pickup, get notified, see live status).
  - **Admin dashboard** — *a real-time operational command center* for **queues, lanes, buses, poles, alerts and exceptions**.
- **Section 1 – "Complete Arrival & Dismissal Process Flow"** — a diagram (page 2). ⚠️ Review it and note the exact step sequence (queue → lane assignment → call-out → pickup confirmation → exception handling, etc.) — adjust Week 4–5 tasks if the real flow differs.
- **Section 2 – "Sample Parent & Admin Web Screens"** — mockups (page 4). ⚠️ Use these as the visual source of truth for the design phase (Week 1–2).
- **Section 3 – "Recommended Web Application Screens"** — a screen list (page 5) that could not be fully extracted. ⚠️ Copy/paste or re-type this list from the PDF and slot it into the **Screens Checklist** (§4) before Week 1 planning — a draft list is provided based on the domain, but confirm against the real doc.

---

## 2. Scope Assumptions (confirm with client before Week 1 ends)

| Area | Assumption | Needs client confirmation? |
|---|---|---|
| Users | Parents, School Admin/Staff, (optional) Bus drivers | ✅ |
| Identification method | QR code / student ID / license plate recognition for car-line | ✅ |
| Notifications | Email + SMS/push for "your child is ready", "bus delayed", etc. | ✅ |
| Multi-school support | Single school vs multi-tenant | ✅ |
| Payment | None assumed (not mentioned in doc) | ✅ |
| Hosting | Cloud (e.g. Render/Railway/AWS) — TBD | ✅ |
| Mobile | Responsive web only (not native app) unless stated otherwise | ✅ |

---

## 3. Tech Stack

- **Frontend:** React + TypeScript, React Router, TanStack Query, Tailwind CSS
- **Backend:** Node.js + Express (or Fastify), REST API + WebSocket (Socket.IO) for live queue/lane/bus updates
- **Database:** PostgreSQL (Prisma ORM)
- **Auth:** JWT + role-based access (Parent / Admin / Staff)
- **Notifications:** Email (Resend/SendGrid), SMS (Twilio) — optional based on client budget
- **Hosting:** Frontend on Vercel/Netlify, backend + DB on Railway/Render, or single VPS
- **Testing:** Vitest/Jest (unit), Playwright (E2E for critical flows)

---

## 4. Screens Checklist (build this out from PDF page 5, draft below)

**Parent Portal**
- [ ] Login / Signup
- [ ] Student(s) profile & linking
- [ ] Daily pickup/dropoff request (mode: car line / bus / walker)
- [ ] Live queue/ETA status
- [ ] Notifications feed (child ready, delay, exception)
- [ ] Pickup history log
- [ ] Profile & settings (authorized pickup persons, contact info)

**Admin Dashboard**
- [ ] Live command center (queues, lanes, buses, poles overview)
- [ ] Lane / pole management (assign, open/close)
- [ ] Student roster & check-in/out status board
- [ ] Bus tracking & route status
- [ ] Alerts & exceptions panel (late pickup, unauthorized pickup, no-show)
- [ ] Staff/user management & roles
- [ ] Reports & analytics (daily dismissal time, exception frequency)
- [ ] School/settings configuration

> Replace/reorder this list once you've confirmed it against the actual "Recommended Web Application Screens" page.

---

## 5. Weekly Task Breakdown

### Week 1 — Discovery, Requirements & UX Wireframes
**Goal:** Lock scope, confirm assumptions, produce wireframes.
- [ ] Client kickoff call — walk through PDF concept doc together, confirm §2 assumptions
- [ ] Finalize Screens Checklist (§4) from actual PDF content
- [ ] Define user roles & permissions matrix (Parent, Admin, Staff)
- [ ] Define data entities: School, Student, Parent/Guardian, Vehicle, Bus, Lane/Pole, PickupEvent, Alert
- [ ] Low-fidelity wireframes for Parent Portal (5–7 screens)
- [ ] Low-fidelity wireframes for Admin Dashboard (5–7 screens)
- [ ] Get written client sign-off on scope + wireframes
**Deliverable:** Approved scope doc + wireframes.

### Week 2 — UI Design & Project Setup
- [ ] High-fidelity UI design (Figma or code-first component design) for both portals
- [ ] Initialize repo (frontend + backend), CI basics, linting/formatting
- [ ] Set up PostgreSQL schema (Prisma models for entities above)
- [ ] Set up auth (JWT, role-based middleware)
- [ ] Set up base API structure + error handling conventions
- [ ] Deploy a "hello world" staging environment (frontend + backend + DB)
**Deliverable:** Working staging skeleton, DB schema migrated, client can log in (empty shell).

### Week 3 — Core Data & Admin Foundations
- [ ] CRUD: Students, Parents/Guardians, Vehicles
- [ ] CRUD: School settings, Lanes/Poles, Buses & Routes
- [ ] Admin: Staff/user management + role assignment
- [ ] Student roster view (list/search/filter)
- [ ] Seed data script for demo/testing
**Deliverable:** Admin can fully manage school roster/config data.

### Week 4 — Parent Portal Core Flow
- [ ] Parent signup/login + link to student(s)
- [ ] Daily pickup/dropoff request flow (per ⚠️ process-flow diagram)
- [ ] Authorized pickup person management
- [ ] Parent notification feed (UI, no live push yet)
- [ ] Pickup history view
**Deliverable:** Parent can complete a full request end-to-end (no real-time yet).

### Week 5 — Admin Real-Time Command Center
- [ ] WebSocket infrastructure (Socket.IO) — live event bus
- [ ] Live queue/lane view (updates as parents check in)
- [ ] Lane/pole open-close controls with live status broadcast
- [ ] Bus live status/tracking view
- [ ] Exception/alert flagging (late pickup, unauthorized, no-show) — admin side
**Deliverable:** Admin dashboard reflects live state changes as parents interact.

### Week 6 — Notifications, Alerts & Exception Handling
- [ ] Wire parent-facing live status (queue position/ETA) via WebSocket
- [ ] Push/email/SMS notifications for key events (configurable)
- [ ] Exception workflows end-to-end (admin flags → parent notified → resolution logged)
- [ ] Reports/analytics screen (daily summary, exception counts, dismissal time trends)
**Deliverable:** Full parent ↔ admin real-time loop working, including exceptions.

### Week 7 — Testing, Hardening & Polish
- [ ] Cross-browser/responsive QA (mobile-first parent flows especially)
- [ ] E2E tests for critical paths (login, pickup request, admin exception flow)
- [ ] Security pass: input validation, authz checks on every endpoint, rate limiting
- [ ] Performance pass on live dashboard (large roster/queue scenarios)
- [ ] Bug bash + fix list from client UAT round
**Deliverable:** Stable, tested build ready for production.

### Week 8 — Deployment, Training & Handover
- [ ] Production deployment (frontend, backend, DB, env secrets)
- [ ] Set up monitoring/error tracking (Sentry or similar) + backups
- [ ] Write admin user guide + parent quick-start guide
- [ ] Client training session (screen share walkthrough)
- [ ] Final client sign-off + invoice
- [ ] Handover repo access, documentation, credentials
**Deliverable:** Live production system + documentation + trained client.

---

## 6. Weekly Progress Tracker

Fill this in every week and send the "Client Update" row to the client as a status email.

| Week | Dates | Planned Focus | % Complete | Hours Spent | Blockers / Notes | Client Update Sent |
|---|---|---|---|---|---|---|
| 1 |  | Discovery & Wireframes |  |  |  | ☐ |
| 2 |  | UI Design & Setup |  |  |  | ☐ |
| 3 |  | Core Data & Admin Foundations |  |  |  | ☐ |
| 4 |  | Parent Portal Core Flow |  |  |  | ☐ |
| 5 |  | Admin Real-Time Dashboard |  |  |  | ☐ |
| 6 |  | Notifications & Exceptions |  |  |  | ☐ |
| 7 |  | Testing & Hardening |  |  |  | ☐ |
| 8 |  | Deployment & Handover |  |  |  | ☐ |

---

## 7. Open Questions to Send the Client Now

1. Confirm the exact identification method for car-line pickup (QR code, license plate, ID card)?
2. Single school or must this scale to multiple schools/districts?
3. Is SMS notification required (has cost implications — Twilio), or is email/push enough?
4. Do bus drivers need their own portal, or is bus tracking admin-only for now?
5. Any existing branding/design system to follow, or full creative freedom?
6. Preferred hosting provider, or freelancer's choice?
