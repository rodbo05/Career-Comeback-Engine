"use client";

import { useState } from "react";

interface ResultSectionProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export default function ResultSection({
  title,
  content,
  defaultOpen = false,
}: ResultSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${
              open ? "rotate-90" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {open && (
        <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-700 border-t border-gray-100 pt-4">
          {content}
        </div>
      )}
    </div>
  );
}
