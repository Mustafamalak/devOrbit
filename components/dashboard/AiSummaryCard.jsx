"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Loader2,
  RefreshCcw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { aiApi } from "@/lib/api";

function getMoodStyle(mood) {
  if (mood === "Critical") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-300";
  }

  if (mood === "Needs Attention") {
    return "border-orange-400/20 bg-orange-400/10 text-orange-300";
  }

  if (mood === "Clean") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  return "border-pink-400/20 bg-pink-400/10 text-pink-300";
}

export default function AiSummaryCard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function loadSummary(isRefresh = false) {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await aiApi.getSprintSummary();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message || "Failed to generate AI summary");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <GlassCard className="relative h-full overflow-hidden">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-orange-500/14 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-pink-300">AI Sprint Brief</p>
            <h2 className="mt-1 text-2xl font-black text-white">
              Workspace Intelligence
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {summary?.workspaceMood && (
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${getMoodStyle(
                  summary.workspaceMood
                )}`}
              >
                {summary.workspaceMood}
              </span>
            )}

            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
              <Bot size={23} />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-center">
            <Loader2 className="mx-auto mb-3 animate-spin text-pink-300" size={28} />
            <p className="font-semibold text-white">Generating summary...</p>
            <p className="mt-2 text-sm text-[#a89bb8]">
              Reading projects, tasks, and activity from MongoDB.
            </p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-5">
            <AlertTriangle className="mb-3 text-rose-300" size={24} />
            <p className="font-semibold text-white">AI summary failed</p>
            <p className="mt-2 text-sm text-rose-200">{error}</p>

            <button
              type="button"
              onClick={() => loadSummary(true)}
              className="mt-4 rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm leading-7 text-[#cfc3dd]">
              {summary?.headline}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-xs text-[#a89bb8]">Avg Health</p>
                <p className="mt-1 text-2xl font-black text-white">
                  {summary?.averageHealth || 0}%
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-xs text-[#a89bb8]">Closure</p>
                <p className="mt-1 text-2xl font-black text-white">
                  {summary?.taskClosureRate || 0}%
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-xs text-[#a89bb8]">Bugs</p>
                <p className="mt-1 text-2xl font-black text-rose-300">
                  {summary?.totalBugs || 0}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {(summary?.strengths || []).slice(0, 2).map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-3xl border border-emerald-400/15 bg-emerald-400/10 p-4"
                >
                  <CheckCircle2 size={18} className="text-emerald-300" />
                  <p className="text-sm leading-6 text-[#cfc3dd]">{item}</p>
                </div>
              ))}

              {(summary?.risks || []).slice(0, 2).map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-3xl border border-orange-400/15 bg-orange-400/10 p-4"
                >
                  <TriangleAlert size={18} className="text-orange-300" />
                  <p className="text-sm leading-6 text-[#cfc3dd]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-pink-400/20 bg-pink-400/10 p-4">
              <div className="flex items-center gap-2 text-pink-200">
                <BrainCircuit size={17} />
                <p className="text-sm font-semibold">Recommended Action</p>
              </div>

              <p className="mt-2 text-sm leading-6 text-[#cfc3dd]">
                {summary?.actions?.[0] || "Keep tracking your sprint activity."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => loadSummary(true)}
              disabled={refreshing}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15 disabled:opacity-60"
            >
              {refreshing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <RefreshCcw size={16} />
              )}
              Refresh AI Brief
            </button>
          </>
        )}

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center gap-2 text-[#cfc3dd]">
            <Sparkles size={16} className="text-pink-300" />
            <p className="text-sm font-semibold">Current Mode</p>
          </div>

          <p className="mt-2 text-sm leading-6 text-[#a89bb8]">
            This is a rule-based AI-style summary generated from your MongoDB
            workspace. Later, we can plug in a real LLM API.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}