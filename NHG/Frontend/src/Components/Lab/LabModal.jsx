import { X } from "lucide-react";
import LabField from "./LabField";
import { LAB_STATUSES } from "./labUtils";

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
              Laboratory
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#002325]">
              {mode === "create" ? "Add Lab Test" : "Edit Lab Test"}
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
          <LabField label="Test Name" error={errors.testName}>
            <input
              value={form.testName}
              onChange={(event) => onChange("testName", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="Full Blood Count"
            />
          </LabField>

          <LabField label="Category" error={errors.category}>
            <input
              value={form.category}
              onChange={(event) => onChange("category", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="Haematology"
            />
          </LabField>

          <LabField label="Price" error={errors.price}>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(event) => onChange("price", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="1500"
            />
          </LabField>

          <LabField label="Turnaround Time" error={errors.turnaroundTime}>
            <input
              value={form.turnaroundTime}
              onChange={(event) =>
                onChange("turnaroundTime", event.target.value)
              }
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="24 hours"
            />
          </LabField>

          <LabField label="Status" error={errors.status}>
            <select
              value={form.status}
              onChange={(event) => onChange("status", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              {LAB_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </LabField>

          <LabField label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={(event) => onChange("description", event.target.value)}
              className="min-h-24 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="Short notes about sample type or preparation"
            />
          </LabField>
        </div>

        {mode === "create" && (
          <div className="mt-6 border-t border-slate-100 pt-6">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Lab user account
              </p>
              <p className="mt-1 text-sm text-slate-500">
                This creates the login user through /api/auth/lab/register.
              </p>
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
                  placeholder="Technician"
                />
              </LabField>

              <LabField label="NIC" error={errors.nic}>
                <input
                  value={form.nic}
                  onChange={(event) => onChange("nic", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="200012345678"
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

              <div className="hidden md:block" />

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
                  onChange={(event) => onChange("confirmPassword", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="password123"
                />
              </LabField>
            </div>
          </div>
        )}

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
            {mode === "create" ? "Add Lab Test & Register User" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
