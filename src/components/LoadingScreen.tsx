"use client";

const STEPS = [
  "Analyzing your career profile...",
  "Crafting gap explanations...",
  "Rewriting your resume...",
  "Generating interview scripts...",
  "Building your 30-day plan...",
  "Finalizing job strategy...",
];

export default function LoadingScreen() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="card">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600" />
        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Building Your Comeback Materials
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          This usually takes 15-30 seconds. Hang tight.
        </p>
        <div className="mt-6 space-y-2 text-left">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-2 animate-pulse-slow text-sm text-gray-500"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <div className="h-2 w-2 rounded-full bg-primary-400" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
