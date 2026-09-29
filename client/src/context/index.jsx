import { AuthProvider, AuthContext } from "./AuthContext";
import { DismissalProvider, DismissalContext } from "./DismissalContext";
import { UIProvider, UIContext } from "./ULContext";
import { useAuth } from "./useAuth";
import { useDismissal } from "./useDismissal";
import { useUI } from "./useUI";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <DismissalProvider>
        <UIProvider>{children}</UIProvider>
      </DismissalProvider>
    </AuthProvider>
  );
}

export {
  AuthProvider,
  AuthContext,
  useAuth,
  DismissalProvider,
  DismissalContext,
  useDismissal,
  UIProvider,
  UIContext,
  useUI,
};
