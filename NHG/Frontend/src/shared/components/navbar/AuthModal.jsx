import Login from "../../../features/auth/pages/Login";
import Register from "../../../features/auth/pages/Register";

export default function AuthModal({ isOpen, mode, onClose, onModeChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4">
      <div className="max-h-[90vh] overflow-y-auto">
        {mode === "register" ? (
          <Register
            onClose={onClose}
            onSwitchToLogin={() => onModeChange("login")}
            onRegistrationSuccess={() => onModeChange("login")}
          />
        ) : (
          <Login
            onClose={onClose}
            onSwitchToRegister={() => onModeChange("register")}
          />
        )}
      </div>
    </div>
  );
}
