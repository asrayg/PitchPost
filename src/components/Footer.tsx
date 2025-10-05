"use client";

import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    const { error } = await supabase.from("email_subscribers").insert([{ email }]);
    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <footer className="mt-16 border-t border-gray-300 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 py-10 px-6 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          YOOOOOOO 🚀
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Get updates on new pitch competitions directly to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
          >
            {status === "loading"
              ? "Subscribing..."
              : status === "success"
              ? "✅ Subscribed!"
              : "Subscribe"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 PitchPost | Made by <span className="font-medium">Asray Gopa</span></p>
          <p>
            Contact:{" "}
            <a
              href="mailto:asray@scalar.news"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              asray@scalar.news
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
