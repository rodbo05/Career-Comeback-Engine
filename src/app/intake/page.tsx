"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import { GAP_REASONS, DISCLOSURE_LEVELS } from "@/lib/constants";
import type { IntakeData } from "@/lib/types";

const defaultData: IntakeData = {
  gapDuration: 12,
  gapReason: [],
  disclosureLevel: "moderate",
  pastRoles: [],
  achievements: "",
  targetRole: "",
  skills: [],
  recentActivity: "",
  confidenceLevel: 3,
  restrictions: "",
};

export default function IntakePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<IntakeData>(defaultData);
  const [roleInput, setRoleInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const update = (partial: Partial<IntakeData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const toggleReason = (reason: string) => {
    update({
      gapReason: data.gapReason.includes(reason)
        ? data.gapReason.filter((r) => r !== reason)
        : [...data.gapReason, reason],
    });
  };

  const addRole = () => {
    const trimmed = roleInput.trim();
    if (trimmed && !data.pastRoles.includes(trimmed)) {
      update({ pastRoles: [...data.pastRoles, trimmed] });
      setRoleInput("");
    }
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      update({ skills: [...data.skills, trimmed] });
      setSkillInput("");
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.gapDuration > 0 && data.gapReason.length > 0;
      case 2:
        return data.pastRoles.length > 0 && data.achievements.trim().length > 0;
      case 3:
        return data.targetRole.trim().length > 0 && data.skills.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    sessionStorage.setItem("intakeData", JSON.stringify(data));
    router.push("/results");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <ProgressBar currentStep={step} />

      <div className="card">
        {/* Step 1: Gap Details */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gap Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tell us about your employment gap. This information shapes all your outputs.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  How long was your gap? (months)
                </label>
                <input
                  type="number"
                  min={1}
                  max={240}
                  value={data.gapDuration}
                  onChange={(e) =>
                    update({ gapDuration: parseInt(e.target.value) || 0 })
                  }
                  className="input-field mt-1 w-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reason(s) for your gap
                </label>
                <p className="text-xs text-gray-500 mt-1">Select all that apply</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {GAP_REASONS.map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => toggleReason(reason)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        data.gapReason.includes(reason)
                          ? "bg-primary-100 text-primary-700 ring-2 ring-primary-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Disclosure Level
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  How much do you want to share about your gap?
                </p>
                <div className="mt-2 space-y-2">
                  {DISCLOSURE_LEVELS.map((level) => (
                    <label
                      key={level.value}
                      className={`flex cursor-pointer items-start rounded-lg border p-4 transition-colors ${
                        data.disclosureLevel === level.value
                          ? "border-primary-600 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="disclosure"
                        value={level.value}
                        checked={data.disclosureLevel === level.value}
                        onChange={() =>
                          update({ disclosureLevel: level.value })
                        }
                        className="mt-0.5 h-4 w-4 text-primary-600"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-900">
                          {level.label}
                        </span>
                        <p className="text-xs text-gray-500">
                          {level.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Background */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Background</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your experience helps us create accurate, personalized materials.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Previous Job Titles
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRole())}
                    placeholder="e.g. Marketing Manager"
                    className="input-field flex-1"
                  />
                  <button
                    type="button"
                    onClick={addRole}
                    className="btn-secondary"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.pastRoles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() =>
                          update({
                            pastRoles: data.pastRoles.filter((r) => r !== role),
                          })
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Key Achievements
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  What are you most proud of in your career? Include numbers if possible.
                </p>
                <textarea
                  value={data.achievements}
                  onChange={(e) => update({ achievements: e.target.value })}
                  placeholder="e.g. Grew email subscriber base by 300%. Led a team of 8. Launched a product that generated $2M in first year."
                  rows={4}
                  className="input-field mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Goals</h2>
            <p className="mt-1 text-sm text-gray-500">
              Where do you want to go next?
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Role / Industry
                </label>
                <input
                  type="text"
                  value={data.targetRole}
                  onChange={(e) => update({ targetRole: e.target.value })}
                  placeholder="e.g. Product Manager in SaaS"
                  className="input-field mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Skills
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="e.g. Project Management"
                    className="input-field flex-1"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="btn-secondary"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() =>
                          update({
                            skills: data.skills.filter((s) => s !== skill),
                          })
                        }
                        className="text-primary-400 hover:text-primary-600"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Recent Activity (optional)
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Any courses, volunteering, freelance work, or projects during
                  your gap?
                </p>
                <textarea
                  value={data.recentActivity}
                  onChange={(e) => update({ recentActivity: e.target.value })}
                  placeholder="e.g. Completed Google Project Management Certificate. Volunteered with local nonprofit on fundraising campaigns."
                  rows={3}
                  className="input-field mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Preferences */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
            <p className="mt-1 text-sm text-gray-500">
              Fine-tune your outputs.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confidence Level: {data.confidenceLevel}/5
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  How confident do you feel about re-entering the workforce?
                </p>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={data.confidenceLevel}
                  onChange={(e) =>
                    update({ confidenceLevel: parseInt(e.target.value) })
                  }
                  className="mt-2 w-full accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Not confident</span>
                  <span>Very confident</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Restrictions (optional)
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Is there anything you do NOT want mentioned in your materials?
                </p>
                <textarea
                  value={data.restrictions}
                  onChange={(e) => update({ restrictions: e.target.value })}
                  placeholder="e.g. Do not mention health issues. Do not reference specific company names."
                  rows={3}
                  className="input-field mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1}
            className="btn-secondary disabled:invisible"
          >
            Back
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="btn-primary"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary bg-accent-600 hover:bg-accent-700 focus-visible:outline-accent-600"
            >
              Generate My Materials
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
