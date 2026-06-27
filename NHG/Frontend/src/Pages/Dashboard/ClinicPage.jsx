import React, { useState } from "react";
import {
  Plus, Search, Pencil, Trash2, X,
  Building2, Phone, Mail, MapPin, ChevronDown, Clock,
} from "lucide-react";

const CLINIC_TYPES = ["General", "Dental", "Eye Care", "Pediatric", "Orthopedic", "Cardiology", "Dermatology", "Physiotherapy"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const INITIAL_CLINICS = [
  { id: 1, name: "Sunrise Medical Centre", type: "General", email: "sunrise@clinic.lk", phone: "+94 11 222 3344", address: "45 Galle Rd, Colombo 03", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], status: "Open" },
  { id: 2, name: "Vision Eye Clinic", type: "Eye Care", email: "vision@clinic.lk", phone: "+94 11 555 6677", address: "12 Kandy Rd, Nugegoda", days: ["Mon", "Wed", "Fri", "Sat"], status: "Open" },
  { id: 3, name: "SmilePlus Dental", type: "Dental", email: "smile@clinic.lk", phone: "+94 11 888 9900", address: "78 High St, Negombo", days: ["Tue", "Thu", "Sat"], status: "Closed" },
];

const EMPTY_FORM = { name: "", type: "", email: "", phone: "", address: "", days: [], status: "Open" };

export default function ClinicPage() {
  const [clinics, setClinics] = useState(INITIAL_CLINICS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({});

  const filtered = clinics.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setForm(EMPTY_FORM); setErrors({}); setSelected(null); setModal("create"); };
  const openEdit = (c) => { setForm({ ...c }); setErrors({}); setSelected(c); setModal("edit"); };
  const openDelete = (c) => { setSelected(c); setModal("delete"); };
  const closeModal = () => { setModal(null); setSelected(null); setErrors({}); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Clinic name is required.";
    if (!form.type) e.type = "Select a clinic type.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (form.days.length === 0) e.days = "Select at least one working day.";
    return e;
  };

  const handleCreate = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setClinics((prev) => [...prev, { ...form, id: Date.now() }]);
    closeModal();
  };

  const handleUpdate = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setClinics((prev) => prev.map((c) => (c.id === selected.id ? { ...form, id: c.id } : c)));
    closeModal();
  };

  const handleDelete = () => { setClinics((prev) => prev.filter((c) => c.id !== selected.id)); closeModal(); };

  const change = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const toggleDay = (day) => {
    const next = form.days.includes(day) ? form.days.filter((d) => d !== day) : [...form.days, day];
    change("days", next);
  };

  const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ${
      status === "Open" ? "bg-emerald-50 text-emerald-600 ring-emerald-200" : "bg-red-50 text-red-500 ring-red-200"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "Open" ? "bg-emerald-500" : "bg-red-400"}`} />
      {status}
    </span>
  );

  const Field = ({ label, error, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );

  const inputCls = (err) =>
    `w-full bg-white border rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 transition ${
      err ? "border-red-400 focus:ring-red-200" : "border-slate-200 focus:ring-emerald-200 focus:border-emerald-400"
    }`;

  const Modal = ({ title, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"><X size={16} /></button>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Building2 size={18} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">Clinics</h1>
              <p className="text-xs text-slate-400">{clinics.length} registered</p>
            </div>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
            <Plus size={15} /> Add Clinic
          </button>
        </div>

        {/* search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by name or type…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition shadow-sm" />
        </div>

        {/* table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Clinic", "Type", "Contact", "Working Days", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">No clinics found.</td></tr>
              ) : (
                filtered.map((c, i) => (
                  <tr key={c.id} className={`border-b border-slate-100 hover:bg-slate-50 transition ${i === filtered.length - 1 ? "border-none" : ""}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                          <Building2 size={14} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">{c.name}</p>
                          <p className="flex items-center gap-1 text-slate-400 text-xs mt-0.5"><MapPin size={10} /> {c.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{c.type}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Mail size={11} /> {c.email}</span>
                        <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Phone size={11} /> {c.phone}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {c.days.map((d) => (
                          <span key={d} className="px-1.5 py-0.5 rounded text-xs bg-emerald-50 text-emerald-600 font-medium">{d}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"><Pencil size={14} /></button>
                        <button onClick={() => openDelete(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(modal === "create" || modal === "edit") && (
        <Modal title={modal === "create" ? "Add Clinic" : "Edit Clinic"}>
          <div className="p-6 space-y-4">
            <Field label="Clinic Name" error={errors.name}>
              <input className={inputCls(errors.name)} placeholder="Sunrise Medical Centre" value={form.name} onChange={(e) => change("name", e.target.value)} />
            </Field>
            <Field label="Clinic Type" error={errors.type}>
              <div className="relative">
                <select className={`${inputCls(errors.type)} appearance-none pr-8`} value={form.type} onChange={(e) => change("type", e.target.value)}>
                  <option value="">Select type</option>
                  {CLINIC_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email" error={errors.email}>
                <input className={inputCls(errors.email)} placeholder="clinic@example.lk" type="email" value={form.email} onChange={(e) => change("email", e.target.value)} />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input className={inputCls(errors.phone)} placeholder="+94 11 000 0000" value={form.phone} onChange={(e) => change("phone", e.target.value)} />
              </Field>
            </div>
            <Field label="Address" error={errors.address}>
              <input className={inputCls(errors.address)} placeholder="45 Galle Rd, Colombo 03" value={form.address} onChange={(e) => change("address", e.target.value)} />
            </Field>
            <Field label="Working Days" error={errors.days}>
              <div className="flex gap-2 flex-wrap">
                {DAYS.map((d) => (
                  <button key={d} onClick={() => toggleDay(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      form.days.includes(d) ? "bg-emerald-50 border-emerald-300 text-emerald-600" : "border-slate-200 text-slate-400 hover:border-slate-300 bg-white"
                    }`}>{d}</button>
                ))}
              </div>
            </Field>
            <Field label="Status">
              <div className="flex gap-3">
                {["Open", "Closed"].map((s) => (
                  <button key={s} onClick={() => change("status", s)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                      form.status === s
                        ? s === "Open" ? "bg-emerald-50 border-emerald-300 text-emerald-600" : "bg-red-50 border-red-300 text-red-500"
                        : "border-slate-200 text-slate-400 hover:border-slate-300 bg-white"
                    }`}>{s}</button>
                ))}
              </div>
            </Field>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 text-sm transition bg-white">Cancel</button>
            <button onClick={modal === "create" ? handleCreate : handleUpdate} className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition">
              {modal === "create" ? "Add Clinic" : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {modal === "delete" && selected && (
        <Modal title="Remove Clinic">
          <div className="p-6">
            <p className="text-slate-500 text-sm">
              Are you sure you want to remove <span className="text-slate-700 font-medium">{selected.name}</span>? This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 text-sm transition bg-white">Cancel</button>
            <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition">Remove</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
