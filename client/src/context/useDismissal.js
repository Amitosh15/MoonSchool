import { useContext } from "react";
import { DismissalContext } from "./DismissalContext";

export function useDismissal() {
  const context = useContext(DismissalContext);
  if (!context) {
    throw new Error("useDismissal must be used within a DismissalProvider");
  }
  return context;
}
