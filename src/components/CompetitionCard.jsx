"use client";
import React, { useState, useEffect } from "react";

export default function CompetitionCard({ comp }) {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [toApply, setToApply] = useState(false);

  // ✅ Load local storage status
  useEffect(() => {
    const appliedList = JSON.parse(localStorage.getItem("appliedList") || "[]");
    const toApplyList = JSON.parse(localStorage.getItem("toApplyList") || "[]");

    setApplied(appliedList.includes(comp.id));
    setToApply(toApplyList.includes(comp.id));
  }, [comp.id]);

  // ✅ Update local storage
  const handleCheckboxChange = (type) => {
    const key = type === "applied" ? "appliedList" : "toApplyList";
    const current = JSON.parse(localStorage.getItem(key) || "[]");

    const updated = current.includes(comp.id)
      ? current.filter((id) => id !== comp.id)
      : [...new Set([...current, comp.id])];

    localStorage.setItem(key, JSON.stringify(updated));
    if (type === "applied") setApplied(!applied);
    else setToApply(!toApply);
  };

  // ✅ Calculate days to deadline
  const today = new Date();
  const deadline = new Date(comp.deadline);
  const diffDays = Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const deadlineText =
    diffDays > 1
      ? `Apply within ${diffDays} days`
      : diffDays === 1
        ? "Apply by tomorrow!"
        : diffDays === 0
          ? "Deadline is today!"
          : "Deadline passed";

  const deadlineColor =
    diffDays < 0
      ? "text-red-600 font-semibold"
      : diffDays <= 3
        ? "text-orange-500 font-semibold"
        : "text-green-600 font-semibold";

  return (
    <>
      {/* 🧩 Card */}
      <div
        onClick={() => setOpen(true)}
        className="relative bg-white dark:bg-neutral-900 shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {comp.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {comp.location}
          </p>

          <div className="mt-3 text-sm space-y-1">
            <p className="text-gray-700 dark:text-gray-300">
              💰 <span className="font-medium">Prize:</span> {comp.prize}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              📅 <span className="font-medium">Date:</span> {comp.date}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              🏷️ <span className="font-medium">Category:</span> {comp.category}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className={`${deadlineColor} text-xs sm:text-sm`}>
            ⏰ {deadlineText}
          </p>
          <div className="flex gap-1">
            {applied && (
              <span className="bg-green-500 text-white text-[10px] px-1 py-0.5 rounded-full">
                Applied
              </span>
            )}
            {toApply && (
              <span className="bg-blue-500 text-white text-[10px] px-1 py-0.5 rounded-full">
                To Apply
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 🪟 Modal */}
      
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-gray-200 dark:border-neutral-800"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {comp.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
              {comp.location} • {comp.mode}
            </p>

            {/* Body */}
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                🏷️ <span className="font-medium">Category:</span>{" "}
                {comp.category}
              </p>
              {comp.focus && (
                <p>
                  🎯 <span className="font-medium">Focus:</span> {comp.focus}
                </p>
              )}
              <p>
                💰 <span className="font-medium">Prize:</span> {comp.prize}
              </p>

              {comp.prizeDetails?.length > 0 && (
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                  {comp.prizeDetails.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}

              <p>
                📅 <span className="font-medium">Event Date:</span> {comp.date}
              </p>
              <p>
                🗓️ <span className="font-medium">Deadline:</span>{" "}
                {comp.deadline}
              </p>
              <p className={deadlineColor}>⏰ {deadlineText}</p>

              {comp.criteria && (
                <p>
                  📋 <span className="font-medium">Criteria:</span>{" "}
                  {comp.criteria}
                </p>
              )}
              {comp.timings && (
                <p>
                  🕓 <span className="font-medium">Schedule:</span>{" "}
                  {comp.timings}
                </p>
              )}
            </div>

            {/* Organizer */}
            <div className="mt-6 border-t border-gray-200 dark:border-neutral-800 pt-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Organizer
              </h3>
              <p>{comp.organizer.name}</p>
              {comp.organizer.institution && (
                <p>{comp.organizer.institution}</p>
              )}
              {comp.organizer.email && (
                <a
                  href={`mailto:${comp.organizer.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline block"
                >
                  {comp.organizer.email}
                </a>
              )}
              {comp.organizer.phone && <p>{comp.organizer.phone}</p>}
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
              <div className="flex gap-3">
                <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={applied}
                    onChange={() => handleCheckboxChange("applied")}
                  />
                  <span>Applied</span>
                </label>

                <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={toApply}
                    onChange={() => handleCheckboxChange("toApply")}
                  />
                  <span>To Apply</span>
                </label>
              </div>

              <a
                href={comp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
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
