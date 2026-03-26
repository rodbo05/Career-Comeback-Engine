export const GAP_REASONS = [
  "Caregiving (children)",
  "Caregiving (elderly/family)",
  "Health-related",
  "Layoff / Company closure",
  "Education / Training",
  "Relocation",
  "Personal / Family matters",
  "Freelancing / Gig work",
  "Career change exploration",
  "Travel / Sabbatical",
  "Mental health",
  "Legal matters",
  "Other",
] as const;

export const DISCLOSURE_LEVELS = [
  {
    value: "minimal" as const,
    label: "Minimal",
    description: "Keep it vague — focus on skills and readiness",
  },
  {
    value: "moderate" as const,
    label: "Moderate",
    description: "Briefly acknowledge the gap, emphasize growth",
  },
  {
    value: "open" as const,
    label: "Open",
    description: "Address the gap directly and honestly",
  },
];

export const INTAKE_STEPS = [
  { id: 1, title: "Gap Details", description: "Tell us about your employment gap" },
  { id: 2, title: "Your Background", description: "Your experience and achievements" },
  { id: 3, title: "Your Goals", description: "Where you want to go next" },
  { id: 4, title: "Preferences", description: "Customize your outputs" },
];
