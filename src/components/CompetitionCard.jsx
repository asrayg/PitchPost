import React from "react";

export default function CompetitionCard({ comp }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{comp.name}</h2>
      <p className="text-gray-600">{comp.location}</p>
      <p className="text-sm mt-1">Prize: {comp.prize}</p>
      <p className="text-sm">Date: {comp.date}</p>
      <a
        href={comp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Apply
      </a>
    </div>
  );
}
