import React, { useEffect, useState } from "react";
import DoctorHeader from "../../Components/Doctor/DoctorHeader";
import DoctorSearch from "../../Components/Doctor/DoctorSearch";
import DoctorTable from "../../Components/Doctor/DoctorTable";
import DoctorModal from "../../Components/Doctor/DoctorModal";

import {
  getAllDoctors,
  registerDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../Services/doctorService";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  nic: "",
  dob: "",
  mobile: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
  title: "DR",
  profilePhoto: "",
  specialization: "",
  licenseNumber: "",
  department: "",
  qualification: "",
};

export default function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // LOAD
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const data = await getAllDoctors();
    console.log(data);
    
    setDoctors(data);
  };

  // FILTER
  const filtered = doctors.filter((d) =>
    `${d.firstName} ${d.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // CREATE
  const createDoctor = async (payload) => {
    await registerDoctor(payload);
    await fetchDoctors();
    setModal(null);
  };

  // UPDATE
  const update = async (payload) => {
    await updateDoctor(selected.id, payload);
    await fetchDoctors();
    setModal(null);
  };

  // DELETE
  const remove = async () => {
    await deleteDoctor(selected.id);
    await fetchDoctors();
    setModal(null);
  };

  return (
    <div className="p-6 space-y-6">

      <DoctorHeader
        onAdd={() => {
          setForm(EMPTY_FORM);
          setModal("create");
        }}
      />

      <DoctorSearch search={search} setSearch={setSearch} />

      <DoctorTable
        data={filtered}
        onEdit={(doc) => {
          setSelected(doc);
          setForm(doc);
          setModal("edit");
        }}
        onDelete={(doc) => {
          setSelected(doc);
          setModal("delete");
        }}
      />

      {modal && (
        <DoctorModal
          modal={modal}
          form={form}
          setForm={setForm}
          onClose={() => setModal(null)}
          onCreate={createDoctor}
          onUpdate={update}
          onDelete={remove}
        />
      )}

    </div>
  );
}