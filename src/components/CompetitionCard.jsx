"use client";
import React, { useState } from "react";

export default function CompetitionCard({ comp }) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const deadline = new Date(comp.deadline);
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let deadlineText;
  if (diffDays > 1) deadlineText = `Deadline to apply in ${diffDays} days`;
  else if (diffDays === 1) deadlineText = "Deadline to apply in 1 day";
  else if (diffDays === 0) deadlineText = "Deadline is today!";
  else deadlineText = "Deadline passed";

  const deadlineColor =
    diffDays < 0
      ? "text-red-600 font-semibold"
      : diffDays <= 3
        ? "text-orange-500 font-semibold"
        : "text-green-600 font-semibold";

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setOpen(true)}
        className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl p-5 hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {comp.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{comp.location}</p>

        <div className="mt-2 text-sm space-y-1">
          <p className="text-gray-700 dark:text-gray-300">
            💰 <span className="font-medium">Prize:</span> {comp.prize}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            📅 <span className="font-medium">Date:</span> {comp.date}
          </p>
          <p className={deadlineColor}>⏰ {deadlineText}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <a
            href={comp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-neutral-900 rounded-2xl max-w-lg w-[90%] p-6 shadow-xl relative"
            onClick={(e) => e.stopPropagation()} // prevents click bubbling
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {comp.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {comp.location} • {comp.mode}
            </p>

            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">🏷️ Category:</span>{" "}
                {comp.category}
              </p>
              {comp.focus && (
                <p>
                  <span className="font-medium">🎯 Focus:</span> {comp.focus}
                </p>
              )}
              <p>
                <span className="font-medium">💰 Prize:</span> {comp.prize}
              </p>
              {comp.prizeDetails?.length > 0 && (
                <ul className="list-disc ml-5 text-gray-600 dark:text-gray-400">
                  {comp.prizeDetails.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
              <p>
                <span className="font-medium">📅 Event Date:</span> {comp.date}
              </p>
              <p>
                <span className="font-medium">📆 Deadline:</span>{" "}
                {new Date(comp.deadline).toLocaleDateString()}
              </p>
              <p className={deadlineColor}>⏰ {deadlineText}</p>
              {comp.criteria && (
                <p>
                  <span className="font-medium">📋 Criteria:</span>{" "}
                  {comp.criteria}
                </p>
              )}
              {comp.timings && (
                <p>
                  <span className="font-medium">🕓 Schedule:</span>{" "}
                  {comp.timings}
                </p>
              )}
              <p>
                <span className="font-medium">📍 Location:</span>{" "}
                {comp.location}
              </p>
            </div>

            <div className="mt-4 border-t border-gray-200 dark:border-neutral-800 pt-3 text-sm">
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">
                Organizer
              </h3>
              <p>{comp.organizer.name}</p>
              {comp.organizer.institution && (
                <p>{comp.organizer.institution}</p>
              )}
              {comp.organizer.email && (
                <p className="text-blue-600 dark:text-blue-400">
                  {comp.organizer.email}
                </p>
              )}
              {comp.organizer.phone && <p>{comp.organizer.phone}</p>}
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={comp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
