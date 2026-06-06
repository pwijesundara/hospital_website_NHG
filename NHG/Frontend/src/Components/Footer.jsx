function Footer() {


    const TEAL_DARK = "#122d3a";
    const GOLD = "#c9a227";

    const cols = [
        {
            title: "Hospital", links: ["Home", "About Us", "History", "Accreditation", "Annual Reports"],
        },
        {
            title: "Services", links: ["OPD Services", "Inpatient Care", "Emergency Services", "Laboratory", "Radiology"],
        },
        {
            title: "Patients", links: ["Book Appointment", "Find a Doctor", "Patient Rights", "Patient Portal", "Feedback"],
        },
    ];
    return (
        <footer className="text-white py-12 px-4" style={{ background: TEAL_DARK }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <div className="font-bold text-lg mb-2">National Hospital Galle</div>
                        <p className="text-xs text-white/60 leading-relaxed mb-4">Southern Sri Lanka's premiere tertiary care institution, serving the community with compassion since 1949.</p>
                        <div className="text-xs text-white/40">© 2026 National Hospital Galle · Ministry of Health, Sri Lanka</div>
                    </div>
                    {cols.map((col) => (
                        <div key={col.title}>
                            <p className="font-semibold text-sm mb-4" style={{ color: GOLD }}>{col.title}</p>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link}><a href="#" className="text-xs text-white/60 hover:text-white transition">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
                    <span>National Hospital Galle · ISO Accredited · Tertiary Teaching Hospital</span>
                    <span>Privacy Policy · Terms of Use · Sitemap</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;