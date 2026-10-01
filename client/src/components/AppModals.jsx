import React from "react";
import CarTagModal from "../pages/CarTagModal";
// import TeacherScanModal from "./TeacherScanModal";
// import BusTrackingModal from "./BusTrackingModal";
// import PaymentsModal from "./PaymentsModal";
import NotificationsModal from "../pages/NotificationModal";
import { useAuth, useDismissal, useUI } from "../context";

export default function AppModals() {
  const { student, parentUser } = useAuth();
  const { lateFeeTotal, handleConfirmPickUp } = useDismissal();
  const {
    isCarTagOpen,
    closeCarTag,
    isTeacherScanOpen,
    openTeacherScan,
    closeTeacherScan,
    isBusTrackingOpen,
    closeBusTracking,
    isPaymentsOpen,
    closePayments,
    isNotificationsOpen,
    closeNotifications,
  } = useUI();

  return (
    <>
      <CarTagModal
        isOpen={isCarTagOpen}
        onClose={closeCarTag}
        student={student}
        parentUser={parentUser}
        onLaunchTeacherScan={openTeacherScan}
      />

      {/* <TeacherScanModal
        isOpen={isTeacherScanOpen}
        onClose={closeTeacherScan}
        student={student}
        parentUser={parentUser}
        onStudentReleased={handleConfirmPickUp}
      /> */}

      {/* <BusTrackingModal
        isOpen={isBusTrackingOpen}
        onClose={closeBusTracking}
        student={student}
        parentUser={parentUser}
      /> */}

      {/* <PaymentsModal
        isOpen={isPaymentsOpen}
        onClose={closePayments}
        lateFeeTotal={lateFeeTotal}
        parentUser={parentUser}
      /> */}

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={closeNotifications}
      />
    </>
  );
}
