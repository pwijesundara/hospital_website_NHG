import { useEffect, useState } from "react";
import apiClient from "../../../shared/api/api";

const Icon = ({ d, size = 16, className = "" }) => (
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
    <path d={d} />
  </svg>
);

const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={14} />;
const ArrowDown = () => <Icon d="M12 5v14M19 12l-7 7-7-7" size={12} />;
const COUNTER_COUNT = 4;
const PLACEHOLDER = { now: "—", next: "—", next2: "—" };

function ClinicQueue() {
  const [displays, setDisplays] = useState(
    Array.from({ length: COUNTER_COUNT }, (_, i) => ({
      id: String(i + 1),
      ...PLACEHOLDER,
    }))
  );

  useEffect(() => {
    let cancelled = false;

    const fetchQueue = async () => {
      try {
        const res = await apiClient.get("/queue-flow-all");
        const data = res.data?.displays || {};
        const ids = new Set([
          ...Array.from({ length: COUNTER_COUNT }, (_, i) => String(i + 1)),
          ...Object.keys(data),
        ]);
        const list = Array.from(ids)
          .sort((a, b) => Number(a) - Number(b))
          .map((id) => ({ id, ...PLACEHOLDER, ...data[id] }));
        if (!cancelled) setDisplays(list);
      } catch {
        if (!cancelled) {
          setDisplays(
            Array.from({ length: COUNTER_COUNT }, (_, i) => ({
              id: String(i + 1),
              ...PLACEHOLDER,
            }))
          );
        }
      }
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Live Vertical Queue
              </p>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Today's Pharmacy Queue
            </h2>
          </div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displays.map((d) => {
            const isServing = d.now && d.now !== "—";

            return (
              <div
                key={d.id}
                className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Counter Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-900 text-white shadow-sm">
                    Counter {d.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isServing
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isServing && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                    {isServing ? "Active" : "Idle"}
                  </span>
                </div>

                {/* Vertical Queue Track */}
                <div className="relative py-4 my-2 flex flex-col gap-3">
                  {/* Connected Background Vertical Line */}
                  <div className="absolute left-[2.25rem] top-7 bottom-7 w-0.5 border-l-2 border-dashed border-slate-200 -z-0" />

                  {/* 1. NOW SERVING (Top Node) */}
                  <div className="relative z-10 flex items-center gap-3 bg-gradient-to-r from-teal-50 to-emerald-50/40 p-3 rounded-xl border border-teal-200/70 shadow-xs">
                    <div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-teal-600 text-white shadow-sm shrink-0">
                      <span className="text-[9px] font-black uppercase tracking-tighter leading-none">
                        NOW
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                        Serving
                      </span>
                      <span
                        className={`text-2xl font-black tracking-tight ${
                          isServing ? "text-slate-900" : "text-slate-300"
                        }`}
                      >
                        {d.now}
                      </span>
                    </div>
                  </div>

                  {/* Down Arrow Divider */}
                  <div className="flex justify-start pl-[1.85rem] -my-1 text-teal-500 z-10">
                    <ArrowDown />
                  </div>

                  {/* 2. NEXT (Middle Node) */}
                  <div className="relative z-10 flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 group-hover:border-teal-100 transition-colors">
                    <div className="flex flex-col items-center justify-center w-11 h-9 rounded-lg bg-white border border-slate-200 text-slate-600 shrink-0 font-bold text-xs">
                      1st
                    </div>
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="text-xs font-semibold text-slate-500">
                        Next Up
                      </span>
                      <span
                        className={`text-base font-bold ${
                          d.next !== "—" ? "text-slate-800" : "text-slate-300"
                        }`}
                      >
                        {d.next}
                      </span>
                    </div>
                  </div>

                  {/* Down Arrow Divider */}
                  <div className="flex justify-start pl-[1.85rem] -my-1 text-slate-300 z-10">
                    <ArrowDown />
                  </div>

                  {/* 3. NEXT 2 (Bottom Node) */}
                  <div className="relative z-10 flex items-center gap-3 bg-slate-50/60 p-2.5 rounded-xl border border-slate-100/80 opacity-90 group-hover:border-teal-100 transition-colors">
                    <div className="flex flex-col items-center justify-center w-11 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 shrink-0 font-bold text-xs">
                      2nd
                    </div>
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="text-xs font-semibold text-slate-400">
                        Following
                      </span>
                      <span
                        className={`text-base font-bold ${
                          d.next2 !== "—" ? "text-slate-700" : "text-slate-300"
                        }`}
                      >
                        {d.next2}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Highlight */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ClinicQueue;