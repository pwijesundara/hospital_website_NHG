import { useState } from "react";
import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";

// ── Data ────────────────────────────────────────────────────────────────────

const publications = [
  // Articles
  {
    id: 1,
    type: "article",
    category: "Cardiology",
    categoryColor: { badge: "bg-pink-50 text-pink-700 border-pink-100", icon: "text-pink-700" },
    title: "Advances in Minimally Invasive Cardiac Interventions",
    excerpt:
      "Our interventional cardiology team reviews the latest catheter-based techniques adopted at National Hospital Galle, including TAVI and complex PCI procedures.",
    author: "Dr. Meera Krishnamurthy",
    date: "12 May 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80",
  },
  {
    id: 2,
    type: "article",
    category: "Neurology",
    categoryColor: { badge: "bg-purple-50 text-purple-700 border-purple-100", icon: "text-purple-700" },
    title: "Stroke Thrombolysis: Outcomes from Our First 200 Cases",
    excerpt:
      "A retrospective audit of IV thrombolysis outcomes in acute ischaemic stroke patients treated at our Emergency & Neurology units between 2022 and 2024.",
    author: "Dr. Ranjith Fernando",
    date: "3 Apr 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
  },
  {
    id: 3,
    type: "article",
    category: "Paediatrics",
    categoryColor: { badge: "bg-yellow-50 text-yellow-700 border-yellow-100", icon: "text-yellow-600" },
    title: "Neonatal Care Protocols: A Southern Sri Lanka Perspective",
    excerpt:
      "Dr. Ponnusamy outlines updated neonatal resuscitation and NICU management guidelines now in practice at our Level III neonatal unit.",
    author: "Dr. Santhosh Ponnusamy",
    date: "18 Mar 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  },
  {
    id: 4,
    type: "article",
    category: "Surgery",
    categoryColor: { badge: "bg-blue-50 text-blue-700 border-blue-100", icon: "text-blue-700" },
    title: "Laparoscopic Cholecystectomy: Day-Surgery Feasibility Study",
    excerpt:
      "We present a prospective study of same-day discharge following laparoscopic cholecystectomy, evaluating safety, cost, and patient satisfaction across 150 cases.",
    author: "Dr. Tharaka Mendis",
    date: "2 Feb 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
  },
  {
    id: 5,
    type: "article",
    category: "Internal Medicine",
    categoryColor: { badge: "bg-teal-50 text-teal-700 border-teal-100", icon: "text-teal-700" },
    title: "Diabetic Nephropathy: Early Screening & Intervention",
    excerpt:
      "A joint report from our Endocrinology and Nephrology teams on a targeted early-detection programme for CKD in diabetic patients across Galle district.",
    author: "Dr. Lalitha Subramaniam & Dr. Asanka Ratnaweera",
    date: "15 Jan 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },

  // Videos
  {
    id: 6,
    type: "video",
    category: "Emergency Care",
    categoryColor: { badge: "bg-red-50 text-red-700 border-red-100", icon: "text-red-600" },
    title: "Basic Life Support — Public Awareness Session",
    excerpt:
      "Dr. Priya Ratnayake demonstrates hands-only CPR and AED use in this 12-minute public education session filmed at our Emergency Department.",
    author: "Dr. Priya Ratnayake",
    date: "20 May 2025",
    duration: "12:04",
    thumbnail: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&q=80",
    videoId: "dQw4w9WgXcQ", // YouTube ID placeholder
  },
  {
    id: 7,
    type: "video",
    category: "Obstetrics & Gynaecology",
    categoryColor: { badge: "bg-rose-50 text-rose-700 border-rose-100", icon: "text-rose-600" },
    title: "Understanding High-Risk Pregnancy — Patient Guide",
    excerpt:
      "A patient-facing video from Dr. Sandya Abeysekera covering warning signs, antenatal visits, and when to come to hospital during high-risk pregnancies.",
    author: "Dr. Sandya Abeysekera",
    date: "5 Apr 2025",
    duration: "18:30",
    thumbnail: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 8,
    type: "video",
    category: "Radiology",
    categoryColor: { badge: "bg-slate-100 text-slate-600 border-slate-200", icon: "text-slate-600" },
    title: "How to Read Your Chest X-Ray — A Radiologist Explains",
    excerpt:
      "Dr. Mahesh Karunanayake walks through a normal chest X-ray, highlighting common findings patients ask about after receiving their radiology report.",
    author: "Dr. Mahesh Karunanayake",
    date: "10 Mar 2025",
    duration: "09:47",
    thumbnail: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80",
    videoId: "dQw4w9WgXcQ",
  },

  // Research
  {
    id: 9,
    type: "research",
    category: "Cardiology",
    categoryColor: { badge: "bg-pink-50 text-pink-700 border-pink-100", icon: "text-pink-700" },
    title: "AF Prevalence in Southern Sri Lanka: A Cross-Sectional Study",
    excerpt:
      "Published in the Ceylon Medical Journal, this study assessed atrial fibrillation prevalence and treatment gaps across 1,200 outpatients in Galle district.",
    author: "Dr. Kasun Wickramasinghe et al.",
    date: "Jan 2025",
    journal: "Ceylon Medical Journal",
    doi: "10.4038/cmj.v70i1.1234",
  },
  {
    id: 10,
    type: "research",
    category: "Neurology",
    categoryColor: { badge: "bg-purple-50 text-purple-700 border-purple-100", icon: "text-purple-700" },
    title: "Epilepsy Management Adherence in Rural Patients: A Cohort Analysis",
    excerpt:
      "This 18-month cohort study examined medication adherence and seizure recurrence rates in rural epilepsy patients followed at our Neurology OPD.",
    author: "Dr. Ananthi Navaratnam et al.",
    date: "Oct 2024",
    journal: "Journal of Neurological Sciences",
    doi: "10.1016/j.jns.2024.00456",
  },
  {
    id: 11,
    type: "research",
    category: "Internal Medicine",
    categoryColor: { badge: "bg-teal-50 text-teal-700 border-teal-100", icon: "text-teal-700" },
    title: "SGLT-2 Inhibitors in CKD: Real-World Outcomes in a Sri Lankan Cohort",
    excerpt:
      "A retrospective analysis of eGFR trajectories and hospitalisation rates in 340 CKD patients commenced on SGLT-2 inhibitor therapy over 24 months.",
    author: "Dr. Asanka Ratnaweera et al.",
    date: "Aug 2024",
    journal: "BMC Nephrology",
    doi: "10.1186/s12882-024-03512-x",
  },
];

const FILTERS = ["All", "Articles", "Videos", "Research"];

const filterMap = { All: null, Articles: "article", Videos: "video", Research: "research" };

const highlights = [
  { value: "50+", label: "Publications",    icon: "ti-file-text",   color: "text-teal-700",   bg: "hover:bg-teal-50/50" },
  { value: "12",  label: "Research papers", icon: "ti-microscope",  color: "text-blue-700",   bg: "hover:bg-blue-50/50" },
  { value: "30+", label: "Video resources", icon: "ti-video",       color: "text-purple-700", bg: "hover:bg-purple-50/50" },
  { value: "8",   label: "Departments",     icon: "ti-building-hospital", color: "text-amber-600", bg: "hover:bg-amber-50/50" },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function ArticleCard({ pub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gray-300 transition-all duration-300 ease-in-out flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={pub.image}
          alt={pub.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md border ${pub.categoryColor.badge} whitespace-nowrap backdrop-blur-sm`}
        >
          {pub.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-sm font-bold text-gray-900 leading-snug tracking-tight">{pub.title}</p>
        <p className="text-xs text-gray-500 leading-relaxed flex-1">{pub.excerpt}</p>

        {/* Meta */}
        <div className="pt-3 mt-auto border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <i className={`ti ti-user text-[12px] ${pub.categoryColor.icon}`} aria-hidden="true" />
            <span className="text-[11px] font-medium text-gray-500 truncate">{pub.author}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <i className="ti ti-clock text-[11px]" aria-hidden="true" />
              {pub.readTime}
            </span>
            <span className="text-[11px] text-gray-400">{pub.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ pub }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gray-300 transition-all duration-300 ease-in-out flex flex-col">
      {/* Thumbnail / Player */}
      <div className="relative h-44 overflow-hidden bg-gray-900">
        {playing ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${pub.videoId}?autoplay=1`}
            title={pub.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={pub.thumbnail}
              alt={pub.title}
              className="w-full h-full object-cover opacity-80 transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center group/play"
            >
              <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-white">
                <i className="ti ti-player-play-filled text-lg text-teal-700" aria-hidden="true" />
              </span>
            </button>
            {/* Duration badge */}
            <span className="absolute bottom-3 right-3 text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded-md">
              {pub.duration}
            </span>
            <span
              className={`absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md border ${pub.categoryColor.badge} whitespace-nowrap backdrop-blur-sm`}
            >
              {pub.category}
            </span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-1.5">
          <i className="ti ti-video text-[11px] text-teal-600" aria-hidden="true" />
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Video</span>
        </div>
        <p className="text-sm font-bold text-gray-900 leading-snug tracking-tight">{pub.title}</p>
        <p className="text-xs text-gray-500 leading-relaxed flex-1">{pub.excerpt}</p>

        <div className="pt-3 mt-auto border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <i className={`ti ti-user text-[12px] ${pub.categoryColor.icon}`} aria-hidden="true" />
            <span className="text-[11px] font-medium text-gray-500 truncate">{pub.author}</span>
          </div>
          <span className="text-[11px] text-gray-400 flex-shrink-0">{pub.date}</span>
        </div>
      </div>
    </div>
  );
}

function ResearchCard({ pub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gray-300 transition-all duration-300 ease-in-out">
      {/* Badge row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md border ${pub.categoryColor.badge} whitespace-nowrap`}
        >
          {pub.category}
        </span>
        <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md border bg-gray-50 text-gray-500 border-gray-200">
          Research
        </span>
      </div>

      {/* Icon + title */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <i className="ti ti-file-text text-base text-gray-500" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-snug tracking-tight">{pub.title}</p>
          <p className="text-[11px] font-medium text-gray-400 mt-0.5">{pub.author}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">{pub.excerpt}</p>

      {/* Journal + DOI */}
      <div className="pt-2.5 border-t border-gray-100 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <i className="ti ti-book text-[11px] text-gray-400" aria-hidden="true" />
          <span className="text-[11px] font-medium text-gray-500 italic">{pub.journal}</span>
          <span className="text-gray-300">·</span>
          <span className="text-[11px] text-gray-400">{pub.date}</span>
        </div>
        <a
          href={`https://doi.org/${pub.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-800 hover:underline transition-colors duration-150 w-fit"
        >
          <i className="ti ti-external-link text-[11px]" aria-hidden="true" />
          DOI: {pub.doi}
        </a>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PublicationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = publications.filter((p) => {
    const type = filterMap[activeFilter];
    return type === null || p.type === type;
  });

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-12 antialiased">

        {/* ── Hero ── */}
        <div className="flex flex-col sm:flex-row items-start gap-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 ring-4 ring-teal-50/50">
            <i className="ti ti-news text-2xl text-teal-700" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              Publications & Resources
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
              Clinical articles, patient education videos, and peer-reviewed research from our
              consultant teams — shared openly to support better healthcare in the Southern Province.
            </p>
          </div>
        </div>

        {/* ── Highlights ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {highlights.map((h) => (
            <div
              key={h.label}
              className={`bg-white border border-gray-200 rounded-2xl px-4 py-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-gray-300 ${h.bg}`}
            >
              <div className="p-2 rounded-full mb-1">
                <i className={`ti ${h.icon} text-xl ${h.color}`} aria-hidden="true" />
              </div>
              <span className={`text-2xl font-bold tracking-tight ${h.color}`}>{h.value}</span>
              <span className="text-xs font-medium text-gray-400 mt-1">{h.label}</span>
            </div>
          ))}
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide border transition-all duration-200 ${
                activeFilter === f
                  ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-medium text-gray-400">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((pub) => {
            if (pub.type === "article") return <ArticleCard key={pub.id} pub={pub} />;
            if (pub.type === "video")   return <VideoCard   key={pub.id} pub={pub} />;
            if (pub.type === "research") return <ResearchCard key={pub.id} pub={pub} />;
            return null;
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <i className="ti ti-file-off text-4xl mb-3 block" aria-hidden="true" />
            <p className="text-sm font-medium">No publications in this category yet.</p>
          </div>
        )}

        {/* ── Submission CTA ── */}
        {/* <div className="mt-12 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm"> */}
          {/* <div>
            <p className="text-sm font-bold text-gray-900 mb-1 tracking-tight">
              Submit a paper or resource
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Consultants and registrars can submit articles, case reports, or video resources
              for review via the medical library office — Room 204, Admin Block.
            </p>
          </div>
          {/* <div className="flex items-center gap-2.5 text-teal-700 bg-teal-50 border border-teal-100/50 px-4 py-2 rounded-xl flex-shrink-0 transition-all duration-300 hover:bg-teal-100/60 whitespace-nowrap">
            <i className="ti ti-send text-base" aria-hidden="true" />
            <span className="text-xs font-bold tracking-wide uppercase">Submit Manuscript</span>
          </div> */}
     

      </div>
      <Footer />
    </>
  );
}