export interface IntakeData {
  gapDuration: number;
  gapReason: string[];
  disclosureLevel: "minimal" | "moderate" | "open";
  pastRoles: string[];
  achievements: string;
  targetRole: string;
  skills: string[];
  recentActivity: string;
  confidenceLevel: number;
  restrictions: string;
}

export interface GenerateResponse {
  gapExplanation: {
    resume: string;
    application: string;
    interview: string;
  };
  resumeRewrite: string;
  interviewAnswers: {
    primary: string;
    alternatives: string[];
    badVsGood: string;
    phrasesToAvoid: string[];
  };
  comebackPlan: string;
  jobStrategy: string;
}
