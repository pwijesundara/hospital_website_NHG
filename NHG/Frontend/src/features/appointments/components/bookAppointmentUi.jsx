export const inputBase =
  "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all";

const labelBase =
  "block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5";

export function IconWrapper({ children, size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function Field({ label, hint, required, children }) {
  return (
    <div className="flex flex-col">
      <label className={labelBase}>
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-[10px] font-medium text-slate-400 mt-1.5 leading-normal">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SectionHeader({ icon, color, title }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
      <div
        className={`w-8 h-8 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0 border border-current/10 shadow-sm`}
      >
        <IconWrapper className={color.icon} size={16}>
          {icon}
        </IconWrapper>
      </div>
      <p className="text-sm font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
    </div>
  );
}
