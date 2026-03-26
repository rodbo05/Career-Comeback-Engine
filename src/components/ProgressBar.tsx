"use client";

import { INTAKE_STEPS } from "@/lib/constants";

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {INTAKE_STEPS.map((step) => (
          <div key={step.id} className="flex flex-1 flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                step.id < currentStep
                  ? "bg-primary-600 text-white"
                  : step.id === currentStep
                  ? "bg-primary-600 text-white ring-4 ring-primary-100"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.id < currentStep ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <div className="mt-2 hidden text-center sm:block">
              <p className="text-xs font-medium text-gray-900">{step.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-primary-600 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (INTAKE_STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
