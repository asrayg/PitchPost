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
  name: string;                         // Name of Competition
  category: "High School" | "College" | "Corporate" | "Open";
  focus?: string;                       // Category/Focus (e.g. AgTech, FinTech)
  region?: string;                      // Midwest, National, etc.
  date: string;                         // Main event date
  deadline: string;                     // Application deadline
  prize: string;                        // Total Prize Money
  prizeDetails?: string[];              // Prize Money - more specific (multiple choice)
  location: string;                     // City, State, or "Virtual"
  mode: "In Person" | "Virtual" | "Hybrid"; // In-person/Virtual/Hybrid
  criteria?: string;                    // Criteria to enter competition
  timings?: string;                     // Dates and timings of competition
  link: string;                         // Application link
  coordinates?: [number, number];       // For map display
  status: "upcoming" | "past";          // For filtering

  // Organizer Info
  organizer: {
    name: string;
    phone?: string;
    email?: string;
    institution?: string;
  };
}


export default function HomePage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    setCompetitions(competitionsData as Competition[]);
  }, []);
  const upcoming = competitions.filter((c) => c.status === "upcoming");
  const past = competitions.filter((c) => c.status === "past");

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <section id="upcoming" className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Competitions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((comp) => (
              <CompetitionCard key={comp.id} comp={comp} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Past Competitions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
            {past.map((comp) => (
              <CompetitionCard key={comp.id} comp={comp} />
            ))}
          </div>
        </section>

        <section id="map" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Competition Map</h2>
          <MapView competitions={competitions} />
        </section>
      </div>
    </>
  );
}
