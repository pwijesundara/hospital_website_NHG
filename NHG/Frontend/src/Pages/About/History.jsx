//cat > /home/claude/nhg-project/frontend/src/pages/HistoryPage.jsx << 'ENDOFFILE'
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import React, { useState, useEffect } from 'react';
//import SubNav from "../../Components/SubNav";
//import Timeline from "../../Components/Timeline";
//import { historyService } from "../../services/api";
//import './HistoryPage.css';

/* ── Fallback data (renders instantly if backend is down) ── */
const FALLBACK = {
  milestones: [
    { id:1, era:'Pre-independence era', title:'Origins as Galle District General Hospital',
      description:'The hospital served as the main district-level facility for the Galle region, providing general medical, surgical and maternity services to the Southern Province.', displayOrder:1 },
    { id:2, era:'1987', title:'Upgraded to Teaching Hospital status',
      description:'Formally designated as a teaching hospital in association with the Faculty of Medicine, University of Ruhuna, marking the beginning of structured medical education and specialist training.', displayOrder:2 },
    { id:3, era:'1990s', title:'Expansion of specialties and wards',
      description:'New clinical departments were established, including cardiology, neurology and dedicated paediatric wards. Bed capacity expanded significantly to serve the growing Southern Province population.', displayOrder:3 },
    { id:4, era:'2000s', title:'ICU and surgical modernisation',
      description:'A dedicated multi-specialty intensive care unit was opened, along with a modernised operating theatre complex supporting laparoscopic and orthopaedic procedures.', displayOrder:4 },
    { id:5, era:'2010s', title:'Radiology and digital health advances',
      description:'Introduction of CT scanning, digital radiology and PACS systems. The LIS-integrated laboratory was expanded and a barcode-based pharmacy dispensing system was introduced.', displayOrder:5 },
    { id:6, era:'2024', title:'3T MRI unit inaugurated',
      description:'A state-of-the-art 3 Tesla MRI machine was installed in the radiology department, significantly advancing diagnostic imaging capability for neurological and musculoskeletal conditions.', displayOrder:6 },
    { id:7, era:'2026', title:'Official digital platform launched',
      description:'Launch of the official NHG multilingual website with online appointment booking, patient portal, role-based modules and AI-assisted patient guidance — a major step in digital health transformation.', displayOrder:7 },
  ],
  significance: [
    'NHG has long functioned as the tertiary referral point for the entire Southern Province — accepting complex cases from Matara, Hambantota and Ratnapura that cannot be managed at district-level facilities.',
    'Its dual role as a clinical institution and teaching hospital means that generations of doctors, nurses and allied health professionals have been trained within its wards and departments.',
  ],
  affiliation: {
    description: 'The hospital serves as the primary clinical training site for the Faculty of Medicine, University of Ruhuna, Matara. Undergraduate and postgraduate medical students receive hands-on training across all major departments.',
  },
  stats:   { districts: 3, population: '~2.5M' },
  hero: {
    title:    'History of National Hospital Galle',
    subtitle: 'From a colonial-era district hospital to the leading tertiary care centre of Southern Sri Lanka — a journey of nearly four decades of healthcare excellence.',
  },
};

export default function HistoryPage() {
  const [data,    setData]    = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [milestones, significance, affiliation, stats, hero] = await Promise.all([
          historyService.getMilestones(),
          historyService.getHistoricalSignificance(),
          historyService.getUniversityAffiliation(),
          historyService.getCatchmentStats(),
          historyService.getHeroInfo(),
        ]);
        setData({ milestones, significance, affiliation, stats, hero });
      } catch {
        /* keep FALLBACK – already set as default state */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { milestones, significance, affiliation, stats, hero } = data;

  return (
    <div className="page-wrapper">
      <SubNav />

      {/* ── Hero banner ── */}
      <div className="history-hero">
        <div className="container history-hero-inner">
          <div className="hero-emblem-circle">⚕</div>
          <div>
            <h1 className="history-hero-title">{hero.title}</h1>
            <p  className="history-hero-sub">{hero.subtitle}</p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container history-body">

        {/* Left – Milestones */}
        <section className="milestones-panel card">
          <h2 className="panel-heading">Institutional milestones</h2>
          <Timeline milestones={milestones} loading={loading} />
        </section>

        {/* Right – Sidebar cards */}
        <aside className="info-sidebar">

          {/* Historical significance */}
          <div className="card info-card">
            <h2 className="card-title">Historical significance</h2>
            {loading
              ? <SkeletonLines lines={4} />
              : significance.map((p, i) => <p key={i} className="card-para">{p}</p>)
            }
          </div>

          {/* University affiliation */}
          <div className="card info-card">
            <h2 className="card-title">University of Ruhuna affiliation</h2>
            <div className="affiliation-row">
              <div className="affiliation-icon" aria-hidden>🎓</div>
              {loading
                ? <SkeletonLines lines={3} />
                : <p className="card-para">{affiliation.description}</p>
              }
            </div>
          </div>

          {/* Catchment stats */}
          <div className="card info-card catchment-card">
            <h2 className="card-title">Southern Province catchment</h2>
            <div className="catchment-grid">
              <div className="catchment-stat">
                {loading
                  ? <div className="skel skel-num" />
                  : <span className="stat-val">{stats.districts}</span>
                }
                <span className="stat-lbl">Districts served</span>
              </div>
              <div className="catchment-divider" />
              <div className="catchment-stat">
                {loading
                  ? <div className="skel skel-num" />
                  : <span className="stat-val">{stats.population}</span>
                }
                <span className="stat-lbl">Population catchment</span>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}

function SkeletonLines({ lines = 3 }) {
  return (
    <div className="skel-block">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`skel skel-line ${i === lines - 1 ? 'short' : ''}`} />
      ))}
    </div>
  );
}
//ENDOFFILE