import { createContext, useState } from "react";

export const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [isCarTagOpen, setIsCarTagOpen] = useState(false);
  const [isTeacherScanOpen, setIsTeacherScanOpen] = useState(false);
  const [isBusTrackingOpen, setIsBusTrackingOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const openCarTag = () => setIsCarTagOpen(true);
  const closeCarTag = () => setIsCarTagOpen(false);

  const openTeacherScan = () => setIsTeacherScanOpen(true);
  const closeTeacherScan = () => setIsTeacherScanOpen(false);

  const openBusTracking = () => setIsBusTrackingOpen(true);
  const closeBusTracking = () => setIsBusTrackingOpen(false);

  const openPayments = () => setIsPaymentsOpen(true);
  const closePayments = () => setIsPaymentsOpen(false);

  const openNotifications = () => {
    setIsNotificationsOpen(true);
    setUnreadNotifications(0);
  };
  const closeNotifications = () => setIsNotificationsOpen(false);

  const value = {
    isCarTagOpen,
    setIsCarTagOpen,
    openCarTag,
    closeCarTag,
    isTeacherScanOpen,
    setIsTeacherScanOpen,
    openTeacherScan,
    closeTeacherScan,
    isBusTrackingOpen,
    setIsBusTrackingOpen,
    openBusTracking,
    closeBusTracking,
    isPaymentsOpen,
    setIsPaymentsOpen,
    openPayments,
    closePayments,
    isNotificationsOpen,
    setIsNotificationsOpen,
    openNotifications,
    closeNotifications,
    unreadNotifications,
    setUnreadNotifications,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
