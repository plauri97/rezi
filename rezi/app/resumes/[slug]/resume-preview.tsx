"use client";

import type { ResumeContent } from "@/lib/resume-types";
import { cn } from "@/lib/utils";

export function ResumePreview({
  content,
  className,
}: {
  content: ResumeContent;
  className?: string;
}) {
  const { personalInfo, summary, workExperience, education, skills, projects } =
    content;

  return (
    <div
      className={cn("resume-preview-a4 text-[11px] leading-snug", className)}
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      {/* Personal Info */}
      <header className="border-b border-gray-300 pb-2 mb-3">
        <h1 className="text-lg font-bold text-gray-900">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-3 gap-y-0 text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && (
            <a
              href={personalInfo.website.startsWith("http") ? personalInfo.website : `https://${personalInfo.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {personalInfo.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin.startsWith("http") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-0.5 mb-1.5">
            Summary
          </h2>
          <p className="text-gray-800">{summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-0.5 mb-1.5">
            Work Experience
          </h2>
          {workExperience.map((job) => (
            <div key={job.id} className="mb-2">
              <div className="flex justify-between items-baseline gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">{job.jobTitle}</span>
                <span className="text-gray-600 whitespace-nowrap">
                  {job.startDate}
                  {job.endDate ? ` – ${job.current ? "Present" : job.endDate}` : ""}
                </span>
              </div>
              <div className="text-gray-700">
                {job.company}
                {job.location && ` · ${job.location}`}
              </div>
              {job.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-1 list-disc pl-4 space-y-0.5 text-gray-800">
                  {job.bullets.filter(Boolean).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-0.5 mb-1.5">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </span>
                <span className="text-gray-600 whitespace-nowrap">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div className="text-gray-700">
                {edu.institution}
                {edu.location && ` · ${edu.location}`}
              </div>
              {edu.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-1 list-disc pl-4 space-y-0.5 text-gray-800">
                  {edu.bullets.filter(Boolean).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.filter(Boolean).length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-0.5 mb-1.5">
            Skills
          </h2>
          <p className="text-gray-800">
            {skills.filter(Boolean).join(" · ")}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-0.5 mb-1.5">
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <div className="font-semibold text-gray-900">
                {proj.name}
                {proj.url && (
                  <a
                    href={proj.url.startsWith("http") ? proj.url : `https://${proj.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline ml-1"
                  >
                    Link
                  </a>
                )}
              </div>
              {proj.description && (
                <p className="text-gray-700 text-[10px]">{proj.description}</p>
              )}
              {proj.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-0.5 list-disc pl-4 space-y-0.5 text-gray-800">
                  {proj.bullets.filter(Boolean).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
