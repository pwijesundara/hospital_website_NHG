import { useEffect, useState } from "react";
import AppointmentSuccess from "../components/AppointmentSuccess";
import BookAppointmentForm from "../components/BookAppointmentForm";
import { EMPTY_APPOINTMENT_FORM } from "../components/bookAppointmentData";
import Footer from "../../../shared/components/Footer";
import Navbar from "../../../shared/components/Navbar";
import { requestAppointment } from "../services/appointmentService";
import { getPatientById } from "../../patients/services/patientServices";
import { getAuthData } from "../../../shared/utils/auth";

const getAuthPatientId = (authData) =>
  authData?.patientId || authData?.patientID || authData?.id || authData?.userId || "";

const normalizeDate = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const getPatientPayload = (data) => data?.data || data?.patient || data || {};

const mapPatientToAppointmentFields = (patient) => ({
  firstName: patient.firstName || "",
  lastName: patient.lastName || "",
  dob: normalizeDate(patient.dob || patient.dateOfBirth),
  gender: patient.gender || "",
  nic: patient.nic || patient.nationalId || patient.passport || "",
  phone: patient.mobile || patient.phone || patient.phoneNumber || "",
  email: patient.email || "",
  address: patient.address || "",
});

// ── Inline SVGs Core Helpers ────────────────────────────────────────────────
// ── Shared UI Tailwind Bases ────────────────────────────────────────────────
// ── Component Main Layout ───────────────────────────────────────────────────
export default function BookAppointment() {
  const initialPatientId = getAuthPatientId(getAuthData());
  const [form, setForm] = useState(EMPTY_APPOINTMENT_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [patientDetails, setPatientDetails] = useState({});
  const [patientDetailsLoading, setPatientDetailsLoading] = useState(false);
  const [patientDetailsError, setPatientDetailsError] = useState(
    initialPatientId ? "" : "Patient account details are missing from your login session."
  );
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [refNo] = useState(
    () => "NHG-" + Math.floor(100000 + Math.random() * 900000)
  );

  useEffect(() => {
    const authData = getAuthData();
    const patientId = getAuthPatientId(authData);

    if (!patientId) return undefined;

    let ignore = false;

    const fetchPatient = async () => {
      try {
        setPatientDetailsLoading(true);
        setPatientDetailsError("");
        const data = await getPatientById(patientId);
        if (ignore) return;

        const appointmentPatientFields = mapPatientToAppointmentFields(
          getPatientPayload(data)
        );
        setPatientDetails(appointmentPatientFields);
        setForm((currentForm) => ({
          ...currentForm,
          ...appointmentPatientFields,
        }));
      } catch (error) {
        if (!ignore) {
          setPatientDetailsError(error.message || "Failed to load patient details.");
        }
      } finally {
        if (!ignore) {
          setPatientDetailsLoading(false);
        }
      }
    };

    fetchPatient();

    return () => {
      ignore = true;
    };
  }, []);

  const set = (key) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authData = getAuthData();
    const patientId = Number(getAuthPatientId(authData));
    const clinicSessionId = Number(form.type);
    const description = form.reason.trim();

    if (!patientId) {
      setSubmitError("Patient account details are missing from your login session.");
      return;
    }
    if (!clinicSessionId) {
      setSubmitError("Please select a clinic before transmitting the request.");
      return;
    }
    if (!description) {
      setSubmitError("Please add a reason for the appointment request.");
      return;
    }

    try {
      setSubmitLoading(true);
      setSubmitError("");

      ///console.log({patientId,clinicSessionId,});
      

      await requestAppointment({
        patientId,
        clinicSessionId,
        description,
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(error.message || "Failed to transmit appointment request.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmitError("");
    setForm({
      ...EMPTY_APPOINTMENT_FORM,
      ...patientDetails,
    });
  };

  if (submitted) {
    return <AppointmentSuccess form={form} refNo={refNo} onReset={resetForm} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-teal-700 selection:text-white antialiased">
      <Navbar />
      <BookAppointmentForm
        form={form}
        patientDetailsError={patientDetailsError}
        patientDetailsLoading={patientDetailsLoading}
        submitError={submitError}
        submitLoading={submitLoading}
        onChange={set}
        onSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
}
