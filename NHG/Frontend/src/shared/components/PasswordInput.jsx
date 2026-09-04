import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Password text field with a show / hide toggle (eye icon).
 * Spreads any extra props onto the underlying <input>, so it is a drop-in
 * replacement for `<input type="password" ... />`.
 */
export default function PasswordInput({ className = "", ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`${className} pr-11`}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition hover:text-slate-600 disabled:opacity-50"
        disabled={props.disabled}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
