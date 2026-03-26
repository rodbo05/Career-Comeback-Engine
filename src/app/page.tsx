"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Turn Your Career Gap Into a
          <span className="text-primary-600"> Comeback Story</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Get personalized gap explanations, a rewritten resume, interview
          scripts, and a 30-day action plan — all in under 10 minutes.
        </p>
        <div className="mt-10">
          <button
            onClick={() => router.push("/intake")}
            className="btn-primary text-base px-8 py-4"
          >
            Start Your Comeback
          </button>
        </div>
      </section>

      {/* What you get */}
      <section className="pb-20">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          What You&apos;ll Get
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Gap Explanations",
              desc: "3 versions — for your resume, applications, and interviews. No apologizing, just confidence.",
            },
            {
              title: "Resume Rewrite",
              desc: "A hybrid format that highlights skills and reframes your gap as a strength.",
            },
            {
              title: "Interview Scripts",
              desc: "Ready-to-use answers with bad vs. good comparisons and phrases to avoid.",
            },
            {
              title: "30-Day Plan",
              desc: "Week-by-week actions with specific tasks, deliverables, and time estimates.",
            },
            {
              title: "Job Targeting",
              desc: "Recommended roles, industries, and the best approach for your situation.",
            },
            {
              title: "Export & Download",
              desc: "Copy to clipboard or download as PDF. Your materials, ready to use.",
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="pb-20">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          How It Works
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Answer a few questions",
              desc: "Tell us about your gap, your background, and where you want to go.",
            },
            {
              step: "2",
              title: "We generate your materials",
              desc: "AI creates personalized, structured career comeback materials.",
            },
            {
              step: "3",
              title: "Export and take action",
              desc: "Download your materials and follow your 30-day plan.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-20 text-center">
        <div className="card bg-primary-50 border-primary-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to get started?
          </h2>
          <p className="mt-2 text-gray-600">
            No account needed. No data stored. Just results.
          </p>
          <div className="mt-6">
            <button
              onClick={() => router.push("/intake")}
              className="btn-primary"
            >
              Start Your Comeback
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
