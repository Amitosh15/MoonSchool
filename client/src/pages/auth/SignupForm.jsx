import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Car,
  GraduationCap,
  Users,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bus,
  Footprints,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

export default function SignupForm({ onSuccess, onSwitchToLogin }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1: Guardian Info
  const [guardian, setGuardian] = useState({
    fullName: "",
    relationship: "Mother",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Step 2: Children List
  const [children, setChildren] = useState([
    {
      id: "MS-" + Math.floor(100 + Math.random() * 900),
      name: "",
      grade: "Grade 2",
      homeroom: "Gr. 2B",
      emergencyContact: "",
      avatar:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
    },
  ]);

  // Step 3: Vehicle & Transportation Info
  const [transport, setTransport] = useState({
    vehicleMakeModel: "",
    vehicleColor: "",
    licensePlate: "",
    dismissalMethod: "carline", // 'carline' | 'bus' | 'walker'
    agreedToTerms: false,
  });

  // Calculate Password Strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: "Empty", color: "#64748b" };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score: 25, text: "Weak", color: "#f43f5e" };
    if (score === 3) return { score: 55, text: "Medium", color: "#f59e0b" };
    if (score >= 4) return { score: 100, text: "Strong", color: "#10b981" };
    return { score: 20, text: "Weak", color: "#f43f5e" };
  };

  const pwdStrength = getPasswordStrength(guardian.password);

  // Add child helper
  const handleAddChild = () => {
    setChildren([
      ...children,
      {
        id: "MS-" + Math.floor(100 + Math.random() * 900),
        name: "",
        grade: "Grade 1",
        homeroom: "Gr. 1A",
        emergencyContact: guardian.phone || "",
        avatar:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80",
      },
    ]);
  };

  // Remove child helper
  const handleRemoveChild = (index) => {
    if (children.length <= 1) return;
    setChildren(children.filter((_, idx) => idx !== index));
  };

  // Update specific child field
  const handleChildChange = (index, field, value) => {
    const updated = [...children];
    updated[index][field] = value;
    setChildren(updated);
  };

  // 1-Click Sample Pre-Fill
  const handleQuickSampleFill = () => {
    setGuardian({
      fullName: "Dr. Evelyn & Maya Chen",
      relationship: "Mother",
      email: "evelyn.chen@example.com",
      phone: "704-555-8822",
      password: "MoonSchool@2026!",
      confirmPassword: "MoonSchool@2026!",
    });
    setChildren([
      {
        id: "MS-104",
        name: "Kai Chen",
        grade: "Grade 3",
        homeroom: "Gr. 3C",
        emergencyContact: "704-555-8822",
        avatar:
          "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
      },
    ]);
    setTransport({
      vehicleMakeModel: "Volvo XC90 Recharge",
      vehicleColor: "Silver Metallic",
      licensePlate: "9KAI88",
      dismissalMethod: "carline",
      agreedToTerms: true,
    });
    setErrorMsg("");
  };

  // Navigation between steps with validation
  const handleNextStep = () => {
    setErrorMsg("");

    if (currentStep === 1) {
      if (!guardian.fullName.trim()) {
        setErrorMsg("Please enter your full parent/guardian name.");
        return;
      }
      if (!guardian.email.trim() || !guardian.email.includes("@")) {
        setErrorMsg("Please enter a valid parent email address.");
        return;
      }
      if (!guardian.phone.trim()) {
        setErrorMsg("Please provide a mobile phone number for carline alerts.");
        return;
      }
      if (!guardian.password || guardian.password.length < 6) {
        setErrorMsg("Password must be at least 6 characters.");
        return;
      }
      if (guardian.password !== guardian.confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      for (let i = 0; i < children.length; i++) {
        if (!children[i].name.trim()) {
          setErrorMsg(`Please specify Child #${i + 1}'s full name.`);
          return;
        }
      }
      setCurrentStep(3);
    }
  };

  // Final Submission
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (
      transport.dismissalMethod === "carline" &&
      !transport.vehicleMakeModel.trim()
    ) {
      setErrorMsg(
        "Please specify your vehicle make & model for carline identification.",
      );
      return;
    }
    if (!transport.agreedToTerms) {
      setErrorMsg(
        "You must agree to the Moon School Student Safety & Car Tag protocols.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback if canvas-confetti issues
    }

    setTimeout(() => {
      setIsSubmitting(false);

      // Create new user & student payloads
      const newParentUser = {
        name: guardian.fullName,
        phone: guardian.phone,
        email: guardian.email,
        relation: guardian.relationship,
        carTag: children[0]?.id || "MS-099",
        vehicle: transport.vehicleMakeModel
          ? `${transport.vehicleMakeModel} (${transport.vehicleColor || "Registered"})`
          : "Carline Registered",
        plateNumber: transport.licensePlate || "PENDING",
        defaultTransporter: "Parent",
        authorizedPickups: [
          {
            id: 1,
            name: guardian.fullName,
            relation: `${guardian.relationship} (Primary)`,
            phone: guardian.phone,
            verified: true,
            isDefault: true,
          },
        ],
      };

      const newStudentsList = children.map((c, idx) => ({
        id: c.id,
        name: c.name,
        grade: c.grade,
        homeroom: c.homeroom,
        teacher: "Assigned Homeroom Staff",
        avatar: c.avatar,
        carTag: c.id,
        emergencyContact: c.emergencyContact || guardian.phone,
        assignedPole: 7 + idx,
        assignedLane: "Lane 2",
      }));

      onSuccess(newParentUser, newStudentsList);
    }, 1000);
  };

  return (
    <div className="signup-wizard-container">
      {/* Step Progress Bar */}
      <div className="wizard-steps-indicator">
        <div className="wizard-progress-bar-bg">
          <div
            className="wizard-progress-bar-active"
            style={{
              width:
                currentStep === 1 ? "15%" : currentStep === 2 ? "65%" : "100%",
            }}
          />
        </div>

        <div
          className={`step-node ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`}
          onClick={() => currentStep > 1 && setCurrentStep(1)}
        >
          <div className="step-circle">
            {currentStep > 1 ? <CheckCircle2 size={18} /> : "1"}
          </div>
          <span className="step-label">Parent Info</span>
        </div>

        <div
          className={`step-node ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`}
          onClick={() => currentStep > 2 && setCurrentStep(2)}
        >
          <div className="step-circle">
            {currentStep > 2 ? <CheckCircle2 size={18} /> : "2"}
          </div>
          <span className="step-label">Children Link</span>
        </div>

        <div className={`step-node ${currentStep === 3 ? "active" : ""}`}>
          <div className="step-circle">3</div>
          <span className="step-label">Carline / Bus</span>
        </div>
      </div>

      {errorMsg && (
        <div className="auth-alert-box error">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ================= STEP 1: GUARDIAN DETAILS ================= */}
      {currentStep === 1 && (
        <div className="wizard-step-pane">
          <div className="auth-form-header">
            <h2>Parent Guardian Registration</h2>
            <p>
              Step 1 of 3: Provide your primary guardian contact details for
              automated alerts.
            </p>
          </div>

          <div className="auth-grid-2">
            {/* Full Name */}
            <div className="auth-form-group">
              <label className="auth-label">
                <span>Parent Full Name</span>
                <span className="required">*</span>
              </label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" size={18} />
                <input
                  type="text"
                  className="auth-input-field"
                  placeholder="e.g. John Agyeman"
                  value={guardian.fullName}
                  onChange={(e) =>
                    setGuardian({ ...guardian, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Relationship */}
            <div className="auth-form-group">
              <label className="auth-label">
                <span>Relationship to Student</span>
                <span className="required">*</span>
              </label>
              <select
                className="auth-input-field"
                value={guardian.relationship}
                onChange={(e) =>
                  setGuardian({ ...guardian, relationship: e.target.value })
                }
              >
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Legal Guardian">Legal Guardian</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Authorized Caregiver">
                  Authorized Caregiver / Nanny
                </option>
              </select>
            </div>
          </div>

          <div className="auth-grid-2">
            {/* Email */}
            <div className="auth-form-group">
              <label className="auth-label">
                <span>Email Address</span>
                <span className="required">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" size={18} />
                <input
                  type="email"
                  className="auth-input-field"
                  placeholder="name@example.com"
                  value={guardian.email}
                  onChange={(e) =>
                    setGuardian({ ...guardian, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Mobile Phone */}
            <div className="auth-form-group">
              <label className="auth-label">
                <span>Mobile Number</span>
                <span className="required">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Phone className="auth-input-icon" size={18} />
                <input
                  type="tel"
                  className="auth-input-field"
                  placeholder="704-555-0192"
                  value={guardian.phone}
                  onChange={(e) =>
                    setGuardian({ ...guardian, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="auth-grid-2">
            {/* Password */}
            <div className="auth-form-group">
              <label className="auth-label">
                <span>Create Password</span>
                <span className="required">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input-field"
                  placeholder="Min 6 characters"
                  value={guardian.password}
                  onChange={(e) =>
                    setGuardian({ ...guardian, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="auth-form-group">
              <label className="auth-label">
                <span>Confirm Password</span>
                <span className="required">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="auth-input-field"
                  placeholder="Re-enter password"
                  value={guardian.confirmPassword}
                  onChange={(e) =>
                    setGuardian({
                      ...guardian,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {guardian.password && (
            <div className="password-strength-container">
              <div className="strength-bar-bg">
                <div
                  className="strength-bar-fill"
                  style={{
                    width: `${pwdStrength.score}%`,
                    backgroundColor: pwdStrength.color,
                  }}
                />
              </div>
              <div
                className="strength-text"
                style={{ color: pwdStrength.color }}
              >
                <span>Security Strength:</span>
                <span>{pwdStrength.text}</span>
              </div>
            </div>
          )}

          <button
            type="button"
            className="auth-submit-btn"
            onClick={handleNextStep}
          >
            <span>Continue to Student Linkage</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* ================= STEP 2: STUDENT DETAILS ================= */}
      {currentStep === 2 && (
        <div className="wizard-step-pane">
          <div className="auth-form-header">
            <h2>Link Your Children / Students</h2>
            <p>
              Step 2 of 3: Connect your enrolled students to receive real-time
              arrival & carline tracking.
            </p>
          </div>

          {children.map((child, index) => (
            <div key={index} className="child-card-repeater">
              <div className="child-card-header">
                <div className="child-badge-title">
                  <GraduationCap size={18} />
                  <span>
                    Student #{index + 1} {child.name ? `— ${child.name}` : ""}
                  </span>
                </div>
                {children.length > 1 && (
                  <button
                    type="button"
                    className="remove-child-btn"
                    onClick={() => handleRemoveChild(index)}
                    title="Remove sibling"
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="auth-grid-2">
                {/* Child Name */}
                <div className="auth-form-group">
                  <label className="auth-label">
                    <span>Child's Full Name</span>
                    <span className="required">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <User className="auth-input-icon" size={18} />
                    <input
                      type="text"
                      className="auth-input-field"
                      placeholder="e.g. Ama Safranie"
                      value={child.name}
                      onChange={(e) =>
                        handleChildChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Student ID / Tag */}
                <div className="auth-form-group">
                  <label className="auth-label">
                    <span>Student / Car Tag ID</span>
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="auth-input-field"
                    style={{ paddingLeft: "14px" }}
                    value={child.id}
                    onChange={(e) =>
                      handleChildChange(index, "id", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="auth-grid-2">
                {/* Grade */}
                <div className="auth-form-group">
                  <label className="auth-label">
                    <span>Current Grade Level</span>
                  </label>
                  <select
                    className="auth-input-field"
                    value={child.grade}
                    onChange={(e) => {
                      const grade = e.target.value;
                      handleChildChange(index, "grade", grade);
                      handleChildChange(
                        index,
                        "homeroom",
                        grade.replace("Grade ", "Gr. ") + "A",
                      );
                    }}
                  >
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                  </select>
                </div>

                {/* Emergency Contact */}
                <div className="auth-form-group">
                  <label className="auth-label">
                    <span>Emergency Contact</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Phone className="auth-input-icon" size={18} />
                    <input
                      type="tel"
                      className="auth-input-field"
                      placeholder={guardian.phone || "704-555-1234"}
                      value={child.emergencyContact}
                      onChange={(e) =>
                        handleChildChange(
                          index,
                          "emergencyContact",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Sibling Button */}
          <button
            type="button"
            className="add-child-btn"
            onClick={handleAddChild}
          >
            <Plus size={18} />
            <span>+ Link Sibling / Additional Child</span>
          </button>

          <div className="wizard-actions-group">
            <button
              type="button"
              className="wizard-back-btn"
              onClick={() => setCurrentStep(1)}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button
              type="button"
              className="auth-submit-btn"
              style={{ flex: 1 }}
              onClick={handleNextStep}
            >
              <span>Continue to Transportation</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: VEHICLE & CARLINE ================= */}
      {currentStep === 3 && (
        <form onSubmit={handleFinalSubmit} className="wizard-step-pane">
          <div className="auth-form-header">
            <h2>Carline & Dismissal Registration</h2>
            <p>
              Step 3 of 3: Configure your vehicle details for digital RFID/QR
              curb pickup verification.
            </p>
          </div>

          {/* Dismissal Method Picker */}
          <div className="auth-form-group">
            <label className="auth-label">
              <span>Primary Dismissal Mode</span>
              <span className="required">*</span>
            </label>
            <div className="dismissal-mode-options">
              <div
                className={`mode-option-card ${transport.dismissalMethod === "carline" ? "selected" : ""}`}
                onClick={() =>
                  setTransport({ ...transport, dismissalMethod: "carline" })
                }
              >
                <Car className="mode-icon" size={24} />
                <span>Carline Pick-Up</span>
              </div>

              <div
                className={`mode-option-card ${transport.dismissalMethod === "bus" ? "selected" : ""}`}
                onClick={() =>
                  setTransport({ ...transport, dismissalMethod: "bus" })
                }
              >
                <Bus className="mode-icon" size={24} />
                <span>School Bus Route</span>
              </div>

              <div
                className={`mode-option-card ${transport.dismissalMethod === "walker" ? "selected" : ""}`}
                onClick={() =>
                  setTransport({ ...transport, dismissalMethod: "walker" })
                }
              >
                <Footprints className="mode-icon" size={24} />
                <span>Lobby Walker</span>
              </div>
            </div>
          </div>

          {transport.dismissalMethod === "carline" && (
            <>
              <div className="auth-grid-2">
                {/* Vehicle Make / Model */}
                <div className="auth-form-group">
                  <label className="auth-label">
                    <span>Vehicle Make & Model</span>
                    <span className="required">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Car className="auth-input-icon" size={18} />
                    <input
                      type="text"
                      className="auth-input-field"
                      placeholder="e.g. Toyota Highlander"
                      value={transport.vehicleMakeModel}
                      onChange={(e) =>
                        setTransport({
                          ...transport,
                          vehicleMakeModel: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Vehicle Color */}
                <div className="auth-form-group">
                  <label className="auth-label">
                    <span>Vehicle Color</span>
                  </label>
                  <input
                    type="text"
                    className="auth-input-field"
                    style={{ paddingLeft: "14px" }}
                    placeholder="e.g. Metallic Gray / White"
                    value={transport.vehicleColor}
                    onChange={(e) =>
                      setTransport({
                        ...transport,
                        vehicleColor: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* License Plate */}
              <div className="auth-form-group">
                <label className="auth-label">
                  <span>License Plate Number</span>
                </label>
                <input
                  type="text"
                  className="auth-input-field"
                  style={{
                    paddingLeft: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: "bold",
                  }}
                  placeholder="e.g. 7XYZ90"
                  value={transport.licensePlate}
                  onChange={(e) =>
                    setTransport({
                      ...transport,
                      licensePlate: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
            </>
          )}

          {/* Safety & Protocol Checkbox */}
          <div className="auth-form-group" style={{ marginTop: "16px" }}>
            <label
              className="auth-checkbox-label"
              style={{ alignItems: "flex-start" }}
            >
              <input
                type="checkbox"
                style={{ marginTop: "3px" }}
                checked={transport.agreedToTerms}
                onChange={(e) =>
                  setTransport({
                    ...transport,
                    agreedToTerms: e.target.checked,
                  })
                }
              />
              <span style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>
                I agree to the{" "}
                <strong>Moon School Safe Arrival & Dismissal Protocol</strong>.
                I acknowledge that student release requires valid digital Car
                Tag or teacher QR verification curbside.
              </span>
            </label>
          </div>

          <div className="wizard-actions-group">
            <button
              type="button"
              className="wizard-back-btn"
              onClick={() => setCurrentStep(2)}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="auth-submit-btn"
              style={{ flex: 1 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Sparkles size={18} className="animate-spin" />
                  <span>Creating Parent Account...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Complete Parent Registration</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
