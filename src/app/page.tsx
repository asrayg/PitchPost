"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CompetitionCard from "../components/CompetitionCard";
import competitionsData from "../../public/competitions.json";
import Header from "../components/Header";

// ✅ Dynamically import MapView client-side only
const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
});

interface Competition {
  id: number;
  name: string; // Name of Competition
  category: "High School" | "College" | "Corporate" | "Open";
  focus?: string; // Category/Focus (e.g. AgTech, FinTech)
  region?: string; // Midwest, National, etc.
  date: string; // Main event date
  deadline: string; // Application deadline
  prize: string; // Total Prize Money
  prizeDetails?: string[]; // Prize Money - more specific (multiple choice)
  location: string; // City, State, or "Virtual"
  mode: "In Person" | "Virtual" | "Hybrid"; // In-person/Virtual/Hybrid
  criteria?: string; // Criteria to enter competition
  timings?: string; // Dates and timings of competition
  link: string; // Application link
  coordinates?: [number, number]; // For map display
  status: "upcoming" | "past"; // For filtering

  // Organizer Info
  organizer: {
    name: string;
    phone?: string;
    email?: string;
    institution?: string;
  };
}
const parseDate = (dateStr: string) => {
  // Handles both 2025-11-12 and 10/24/2025 formats
  if (!dateStr) return new Date("1970-01-01");
  const parts = dateStr.includes("/") ? dateStr.split("/") : dateStr.split("-");
  if (parts.length === 3) {
    // U.S. format MM/DD/YYYY
    if (dateStr.includes("/"))
      return new Date(+parts[2], +parts[0] - 1, +parts[1]);
    // ISO YYYY-MM-DD
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }
  return new Date(dateStr);
};

export default function HomePage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [showMyComps, setShowMyComps] = useState(false);

  useEffect(() => {
    setCompetitions(competitionsData as Competition[]);
  }, []);

  const today = new Date();

  // ✅ Local storage lists
  const appliedList = JSON.parse(localStorage.getItem("appliedList") || "[]");
  const toApplyList = JSON.parse(localStorage.getItem("toApplyList") || "[]");
  const [filter, setFilter] = useState("all");

  // ✅ Compute categories dynamically
  const upcomingActive = competitions.filter((c) => {
    const dateOk = parseDate(c.deadline) >= today && parseDate(c.date) >= today;
    const matchesFilter =
      filter === "all" ||
      c.category === filter ||
      c.mode === filter ||
      c.region === filter;
    return dateOk && matchesFilter;
  });

  const upcomingClosed = competitions.filter((c) => {
    const dateOk = parseDate(c.deadline) < today && parseDate(c.date) >= today;
    const matchesFilter =
      filter === "all" ||
      c.category === filter ||
      c.mode === filter ||
      c.region === filter;
    return dateOk && matchesFilter;
  });

  const past = competitions.filter((c) => parseDate(c.date) < today);

  // ✅ Filter by "My Competitions" toggle
  const filterByUser = (list: Competition[]) =>
    showMyComps
      ? list.filter(
          (c) => appliedList.includes(c.id) || toApplyList.includes(c.id)
        )
      : list;

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* --- Toggle Button --- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h1 className="text-3xl font-semibold">Pitch Competitions</h1>

          <div className="flex flex-wrap items-center gap-3">
            {/* --- Show My Competitions toggle --- */}
            <button
              onClick={() => setShowMyComps(!showMyComps)}
              className="text-sm bg-gray-200 dark:bg-neutral-800 px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-700"
            >
              {showMyComps ? "Show All" : "Show My Competitions"}
            </button>

            {/* --- Simple Filter Dropdown --- */}
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="text-sm bg-gray-200 dark:bg-neutral-800 px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-700 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="High School">High School</option>
              <option value="College">College</option>
              <option value="Corporate">Corporate</option>
              <option value="Open">Open</option>
              <option value="Virtual">Virtual</option>
              <option value="In Person">In Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* --- Section 1: Upcoming (Open for applications) --- */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Upcoming Competitions — Open
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterByUser(upcomingActive).length > 0 ? (
              filterByUser(upcomingActive).map((comp) => (
                <CompetitionCard key={comp.id} comp={comp} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No open competitions available.
              </p>
            )}
          </div>
        </section>

        {/* --- Section 2: Upcoming (Deadline Passed) --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Upcoming Competitions — Deadline Passed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-90">
            {filterByUser(upcomingClosed).length > 0 ? (
              filterByUser(upcomingClosed).map((comp) => (
                <CompetitionCard key={comp.id} comp={comp} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No closed upcoming competitions.
              </p>
            )}
          </div>
        </section>

        {/* --- Section 3: Past Competitions --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Past Competitions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
            {filterByUser(past).length > 0 ? (
              filterByUser(past).map((comp) => (
                <CompetitionCard key={comp.id} comp={comp} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No past competitions found.
              </p>
            )}
          </div>
        </section>

        {/* --- Section 4: Map --- */}
        <section id="map" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Competition Map</h2>
          <MapView competitions={competitions} />
        </section>
      </div>
    </>
  );
}
