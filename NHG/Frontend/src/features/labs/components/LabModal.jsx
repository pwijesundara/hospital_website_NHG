import { X } from "lucide-react";
import LabField from "./LabField";

export default function LabModal({
  mode,
  form,
  errors,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Lab Account
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#002325]">
              {mode === "create" ? "Register Lab Account" : "Edit Lab Account"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close lab form"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <LabField label="First Name" error={errors.firstName}>
            <input
              value={form.firstName}
              onChange={(event) => onChange("firstName", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="Lab"
            />
          </LabField>

          <LabField label="Last Name" error={errors.lastName}>
            <input
              value={form.lastName}
              onChange={(event) => onChange("lastName", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="User"
            />
          </LabField>

          <LabField label="NIC" error={errors.nic}>
            <input
              value={form.nic}
              onChange={(event) => onChange("nic", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="199912345678"
            />
          </LabField>

          <LabField label="Date of Birth" error={errors.dob}>
            <input
              type="date"
              value={form.dob}
              onChange={(event) => onChange("dob", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </LabField>

          <LabField label="Mobile" error={errors.mobile}>
            <input
              value={form.mobile}
              onChange={(event) => onChange("mobile", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="0771234567"
            />
          </LabField>

          <LabField label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(event) => onChange("email", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="lab@example.com"
            />
          </LabField>

          <LabField label="Address" error={errors.address}>
            <input
              value={form.address}
              onChange={(event) => onChange("address", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="Galle"
            />
          </LabField>

          {mode === "create" && <div className="hidden md:block" />}

          {mode === "create" && (
            <>
              <LabField label="Password" error={errors.password}>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => onChange("password", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="password123"
                />
              </LabField>

              <LabField label="Confirm Password" error={errors.confirmPassword}>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) =>
                    onChange("confirmPassword", event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="password123"
                />
              </LabField>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-lg bg-[#1f6b50] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#19553f]"
          >
            {mode === "create" ? "Register Lab" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
