import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// ─── Colour tokens ───────────────────────────────────────────────────────────
const COLORS = {
  green:      "#2e7d32",
  teal:       "#00796b",
  cardBorder: "#e8e8e8",
  avatarBg: {
    DR: "#b0bec5",
    DD: "#c8a96e",
    RP: "#81c784",
    NW: "#9575cd",
    DS: "#64b5f6",
    SK: "#ffb74d",
    AP: "#f48fb1",
    LF: "#80cbc4",
    IT: "#90a4ae",
    CN: "#a5d6a7",
    HM: "#ffcc80",
    PK: "#80deea",
  },
};

// ─── Avatar circle ───────────────────────────────────────────────────────────
function Avatar({ initials }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: COLORS.avatarBg[initials] || "#b0bec5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
        color: "#fff",
        flexShrink: 0,
        letterSpacing: 0.5,
      }}
    >
      {initials}
    </div>
  );
}

// ─── Executive card (wider, used for top-2 leaders) ──────────────────────────
function ExecCard({ initials, name, role, roleColor, credentials, dept }) {
  return (
    <div
      style={{
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 10,
        padding: "20px 22px",
        flex: "1 1 280px",
        maxWidth: 380,
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
        <Avatar initials={initials} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#222" }}>{name}</div>
          <div style={{ fontSize: 13, color: roleColor, fontWeight: 600 }}>{role}</div>
        </div>
      </div>
      <div style={{ fontSize: 12.5, color: "#555", marginBottom: 6 }}>{credentials}</div>
      <div
        style={{
          fontSize: 12,
          color: "#888",
          background: "#f5f5f5",
          borderRadius: 6,
          padding: "4px 8px",
          display: "inline-block",
        }}
      >
        {dept}
      </div>
    </div>
  );
}

// ─── Staff card (department heads & admin) ───────────────────────────────────
function StaffCard({ initials, name, role, roleColor, credentials, dept }) {
  return (
    <div
      style={{
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 10,
        padding: "16px 18px",
        flex: "1 1 210px",
        maxWidth: 290,
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Avatar initials={initials} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>{name}</div>
          <div style={{ fontSize: 12.5, color: roleColor, fontWeight: 600 }}>{role}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>{credentials}</div>
      <div
        style={{
          fontSize: 11.5,
          color: "#999",
          background: "#f5f5f5",
          borderRadius: 5,
          padding: "3px 7px",
          display: "inline-block",
        }}
      >
        {dept}
      </div>
    </div>
  );
}

// ─── Section title ───────────────────────────────────────────────────────────
function SectionTitle({ text }) {
  return (
    <h2
      style={{
        textAlign: "center",
        fontSize: 22,
        fontWeight: 600,
        color: "#222",
        margin: "0 0 28px",
      }}
    >
      {text}
    </h2>
  );
}

// ─── Card row wrapper ─────────────────────────────────────────────────────────
function CardRow({ children, mt = 0 }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 18,
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: mt,
      }}
    >
      {children}
    </div>
  );
}

// ─── Leadership page (body only — drop inside your layout) ───────────────────
export default function Leadership() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Arial, sans-serif",
        background: "#fafafa",
        minHeight: "100vh",
        padding: "40px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        {/* ── Hero banner ── */}
        <div
          style={{
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 10,
            padding: "20px 24px",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 48,
            background: "#fff",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background: "#e8eaf6",
              flexShrink: 0,
            }}
          />
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#222" }}>
              Leadership &amp; Administration
            </h1>
            <p style={{ margin: 0, fontSize: 13.5, color: "#666", lineHeight: 1.6 }}>
              The senior management and clinical leadership team responsible for the governance,
              operations and strategic direction of National Hospital Galle.
            </p>
          </div>
        </div>

        {/* ── Executive management ── */}
        <section style={{ marginBottom: 56 }}>
          <SectionTitle text="Executive management" />
          <CardRow>
            <ExecCard
              initials="DR"
              name="Dr. (Name Withheld)"
              role="Director / Medical Superintendent"
              roleColor={COLORS.green}
              credentials="MBBS, MD, FRCP · Ministry of Health appointment"
              dept="Overall administration & clinical governance"
            />
            <ExecCard
              initials="DD"
              name="Dr. (Deputy Director)"
              role="Deputy Director — Medical Services"
              roleColor={COLORS.teal}
              credentials="MBBS, MD · Senior Medical Officer"
              dept="Clinical operations and specialist services"
            />
          </CardRow>
        </section>

        {/* ── Department heads — clinical ── */}
        <section style={{ marginBottom: 56 }}>
          <SectionTitle text="Department heads — clinical" />
          <CardRow>
            <StaffCard
              initials="RP"
              name="Dr. R. Pathirage"
              role="Head, Paediatrics"
              roleColor={COLORS.green}
              credentials="MD, DCH, FRCPCH"
              dept="Paediatrics & Neonatology"
            />
            <StaffCard
              initials="NW"
              name="Dr. N. Wickramasinghe"
              role="Head, Neurology"
              roleColor={COLORS.teal}
              credentials="MD, DM Neurology"
              dept="Neurology"
            />
            <StaffCard
              initials="DS"
              name="Dr. D. Silva"
              role="Head, Surgery"
              roleColor={COLORS.teal}
              credentials="MBBS, MS, FRCS"
              dept="General Surgery"
            />
          </CardRow>
          <CardRow mt={18}>
            <StaffCard
              initials="SK"
              name="Dr. S. Karunanayake"
              role="Head, Cardiology"
              roleColor={COLORS.teal}
              credentials="MD, MRCP (UK), FESC"
              dept="Cardiology & ICU"
            />
            <StaffCard
              initials="AP"
              name="Dr. A. Perera"
              role="Head, OBG"
              roleColor={COLORS.teal}
              credentials="MBBS, MD (OBG)"
              dept="Maternity & Gynaecology"
            />
            <StaffCard
              initials="LF"
              name="Dr. L. Fernando"
              role="Head, Radiology"
              roleColor={COLORS.teal}
              credentials="MBBS, MD Radiology"
              dept="Radiology & Imaging"
            />
          </CardRow>
        </section>

        {/* ── Administrative & support leads ── */}
        <section>
          <SectionTitle text="Administrative & support leads" />
          <CardRow>
            <StaffCard
              initials="IT"
              name="Mr. I. Tissera"
              role="RTI Officer"
              roleColor={COLORS.teal}
              credentials="LLB, Administration"
              dept="Right to information & compliance"
            />
            <StaffCard
              initials="CN"
              name="Ms. C. Nanayakkara"
              role="Chief Nursing Officer"
              roleColor={COLORS.teal}
              credentials="BSc Nursing, MSc"
              dept="Nursing services & patient care"
            />
            <StaffCard
              initials="HM"
              name="Mr. H. Marasinghe"
              role="Chief Administrative Officer"
              roleColor={COLORS.teal}
              credentials="BSc Public Administration, MBA"
              dept="Finance, HR & administration"
            />
          </CardRow>
          <CardRow mt={18}>
            <StaffCard
              initials="PK"
              name="Mr. P. Kumara"
              role="IT / Systems Manager"
              roleColor={COLORS.teal}
              credentials="BSc Computer Science"
              dept="Digital systems & hospital IT"
            />
          </CardRow>
        </section>

      </div>
    </div>
  );
}
