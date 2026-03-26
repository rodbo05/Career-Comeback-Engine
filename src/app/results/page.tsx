"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import ResultSection from "@/components/ResultSection";
import type { GenerateResponse } from "@/lib/types";

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GenerateResponse | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("intakeData");
    if (!raw) {
      router.push("/intake");
      return;
    }

    const intakeData = JSON.parse(raw);

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(intakeData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Generation failed");
        }
        return res.json();
      })
      .then((data: GenerateResponse) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  const handleDownloadPDF = () => {
    if (!results) return;

    const content = buildPlainText(results);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "career-comeback-materials.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = async () => {
    if (!results) return;
    const content = buildPlainText(results);
    await navigator.clipboard.writeText(content);
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy All"), 2000);
  };

  const [copyLabel, setCopyLabel] = useState("Copy All");

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="card">
          <h2 className="text-xl font-bold text-red-600">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                window.location.reload();
              }}
              className="btn-primary"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/intake")}
              className="btn-secondary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!results) return null;

  const interviewContent = [
    "PRIMARY ANSWER:",
    results.interviewAnswers.primary,
    "",
    "ALTERNATIVE 1:",
    results.interviewAnswers.alternatives[0] || "",
    "",
    "ALTERNATIVE 2:",
    results.interviewAnswers.alternatives[1] || "",
    "",
    "BAD VS. GOOD COMPARISON:",
    results.interviewAnswers.badVsGood,
    "",
    "PHRASES TO AVOID:",
    ...results.interviewAnswers.phrasesToAvoid.map((p) => `  - ${p}`),
  ].join("\n");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Your Comeback Materials
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review, copy, and download your personalized career materials.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCopyAll} className="btn-secondary text-sm">
            {copyLabel}
          </button>
          <button onClick={handleDownloadPDF} className="btn-primary text-sm">
            Download
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <ResultSection
          title="Gap Explanation — Resume Version"
          content={results.gapExplanation.resume}
          defaultOpen={true}
        />
        <ResultSection
          title="Gap Explanation — Application Version"
          content={results.gapExplanation.application}
        />
        <ResultSection
          title="Gap Explanation — Interview Script"
          content={results.gapExplanation.interview}
        />
        <ResultSection
          title="Resume Rewrite"
          content={results.resumeRewrite}
        />
        <ResultSection
          title="Interview Answers"
          content={interviewContent}
        />
        <ResultSection
          title="30-Day Comeback Plan"
          content={results.comebackPlan}
        />
        <ResultSection
          title="Job Targeting Strategy"
          content={results.jobStrategy}
        />
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => router.push("/intake")}
          className="btn-secondary"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}

function buildPlainText(results: GenerateResponse): string {
  return [
    "=== CAREER COMEBACK MATERIALS ===",
    "",
    "--- GAP EXPLANATION (RESUME) ---",
    results.gapExplanation.resume,
    "",
    "--- GAP EXPLANATION (APPLICATION) ---",
    results.gapExplanation.application,
    "",
    "--- GAP EXPLANATION (INTERVIEW SCRIPT) ---",
    results.gapExplanation.interview,
    "",
    "--- RESUME REWRITE ---",
    results.resumeRewrite,
    "",
    "--- INTERVIEW ANSWERS ---",
    "Primary Answer:",
    results.interviewAnswers.primary,
    "",
    "Alternative 1:",
    results.interviewAnswers.alternatives[0] || "",
    "",
    "Alternative 2:",
    results.interviewAnswers.alternatives[1] || "",
    "",
    "Bad vs. Good Comparison:",
    results.interviewAnswers.badVsGood,
    "",
    "Phrases to Avoid:",
    ...results.interviewAnswers.phrasesToAvoid.map((p) => `  - ${p}`),
    "",
    "--- 30-DAY COMEBACK PLAN ---",
    results.comebackPlan,
    "",
    "--- JOB TARGETING STRATEGY ---",
    results.jobStrategy,
    "",
    "Generated by Career Comeback Engine",
  ].join("\n");
}
