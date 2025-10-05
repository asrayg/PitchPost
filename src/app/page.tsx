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
  name: string;
  category: string;
  region: string;
  date: string;
  deadline: string;
  prize: string;
  location: string;
  coordinates?: [number, number];
  link: string;
  status: string;
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
