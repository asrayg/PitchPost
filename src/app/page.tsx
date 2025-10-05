"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CompetitionCard from "../components/CompetitionCard";
import competitionsData from "../../public/competitions.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdBanner from "../components/AdBanner";

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

interface Competition {
  id: number;
  name: string;
  category: "High School" | "College" | "Corporate" | "Open";
  focus?: string;
  region?: string;
  date: string;
  deadline: string;
  prize: string;
  prizeDetails?: string[];
  location: string;
  mode: "In Person" | "Virtual" | "Hybrid";
  criteria?: string;
  timings?: string;
  link: string;
  coordinates?: [number, number];
  status: "upcoming" | "past";
  organizer: {
    name: string;
    phone?: string;
    email?: string;
    institution?: string;
  };
}

const parseDate = (dateStr: string) => {
  if (!dateStr) return new Date("1970-01-01");
  const parts = dateStr.includes("/") ? dateStr.split("/") : dateStr.split("-");
  if (parts.length === 3) {
    if (dateStr.includes("/"))
      return new Date(+parts[2], +parts[0] - 1, +parts[1]);
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }
  return new Date(dateStr);
};

export default function HomePage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [showMyComps, setShowMyComps] = useState(false);
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const [appliedList, setAppliedList] = useState<number[]>([]);
  const [toApplyList, setToApplyList] = useState<number[]>([]);

  useEffect(() => {
    setCompetitions(competitionsData as Competition[]);
    if (typeof window !== "undefined") {
      setAppliedList(JSON.parse(localStorage.getItem("appliedList") || "[]"));
      setToApplyList(JSON.parse(localStorage.getItem("toApplyList") || "[]"));
    }
  }, []);

  const today = new Date();

  const filterByDate = (dateStr: string) => {
    const date = parseDate(dateStr);
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    switch (dateFilter) {
      case "thisMonth":
        return date.getMonth() === month && date.getFullYear() === year;
      case "nextMonth":
        return date.getMonth() === month + 1 && date.getFullYear() === year;
      case "thisYear":
        return date.getFullYear() === year;
      default:
        return true;
    }
  };

  const upcomingActive = competitions.filter((c) => {
    const dateOk = parseDate(c.deadline) >= today && parseDate(c.date) >= today;
    const matchesFilter =
      (filter === "all" ||
        c.category === filter ||
        c.mode === filter ||
        c.region === filter) &&
      filterByDate(c.date);
    return dateOk && matchesFilter;
  });

  const upcomingClosed = competitions.filter((c) => {
    const dateOk = parseDate(c.deadline) < today && parseDate(c.date) >= today;
    const matchesFilter =
      (filter === "all" ||
        c.category === filter ||
        c.mode === filter ||
        c.region === filter) &&
      filterByDate(c.date);
    return dateOk && matchesFilter;
  });

  const past = competitions.filter((c) => parseDate(c.date) < today);

  const filterByUser = (list: Competition[]) =>
    showMyComps
      ? list.filter(
          (c) => appliedList.includes(c.id) || toApplyList.includes(c.id)
        )
      : list;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* 🔹 Header + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Pitch Competitions
          </h1>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setShowMyComps(!showMyComps)}
              className="text-sm bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-1.5 rounded-lg shadow hover:opacity-90 transition"
            >
              {showMyComps ? "Show All" : "Show My Competitions"}
            </button>

            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="text-sm bg-gray-100 dark:bg-neutral-800 px-3 py-2 rounded-lg focus:outline-none hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              <option value="all">All</option>
              <option value="College">College</option>
              <option value="Corporate">Corporate</option>
              <option value="Open">Open</option>
              <option value="Virtual">Virtual</option>
              <option value="In Person">In Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select
              onChange={(e) => setDateFilter(e.target.value)}
              value={dateFilter}
              className="text-sm bg-gray-100 dark:bg-neutral-800 px-3 py-2 rounded-lg focus:outline-none hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              <option value="all">All Dates</option>
              <option value="thisMonth">This Month</option>
              <option value="nextMonth">Next Month</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
        </div>

        {/* 🔹 Scrollable Sections */}
        {[
          {
            title: "Upcoming Competitions — Open",
            data: filterByUser(upcomingActive),
          },
          {
            title: "Upcoming Competitions — Deadline Passed",
            data: filterByUser(upcomingClosed),
          },
          {
            title: "Past Competitions",
            data: filterByUser(past),
          },
        ].map(({ title, data }, idx) => (
          <section
            key={idx}
            className="bg-gray-50 dark:bg-neutral-900/60 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              {title}
            </h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto p-2 custom-scrollbar"
              style={{ maxHeight: "550px" }}
            >
              {data.length > 0 ? (
                data.map((comp) => <CompetitionCard key={comp.id} comp={comp} />)
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  No competitions found.
                </p>
              )}
            </div>
          </section>
        ))}

        {/* 🔹 Map Section */}
        <section
          id="map"
          className="mt-12 relative z-10 bg-gray-50 dark:bg-neutral-900/60 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800"
        >
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
            Competition Map
          </h2>
          <MapView competitions={competitions} />
        </section>
      </main>

      <AdBanner />
      <Footer />

      {/* Custom Scrollbar Styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 100, 100, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 100, 100, 0.7);
        }
      `}</style>
    </>
  );
}
