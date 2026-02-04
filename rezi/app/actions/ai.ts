"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a professional summary from resume context (job titles, skills, experience).
 */
export async function generateSummary(context: {
  fullName: string;
  workTitles: string[];
  skills: string[];
  rawSummary?: string;
}): Promise<{ summary: string } | { error: string }> {
  if (!process.env.OPENAI_API_KEY) {
    return { error: "OpenAI API key is not configured." };
  }
  try {
    const prompt = `You are a professional resume writer. Write a concise, compelling professional summary (2-4 sentences, ~50-80 words) for a resume.

Context:
- Name: ${context.fullName}
- Recent roles: ${context.workTitles.slice(0, 3).join(", ") || "Not specified"}
- Skills: ${context.skills.slice(0, 10).join(", ") || "Not specified"}
${context.rawSummary ? `- Current draft: ${context.rawSummary}\nImprove and polish this draft.` : ""}

Output only the summary text, no labels or quotes.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });
    const summary =
      completion.choices[0]?.message?.content?.trim() ?? "";
    if (!summary) return { error: "No summary generated." };
    return { summary };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "OpenAI request failed.";
    return { error: msg };
  }
}

/**
 * Improve bullet points for a role or section. Returns improved bullets.
 */
export async function improveBullets(
  bullets: string[],
  context: { role?: string; company?: string }
): Promise<{ bullets: string[] } | { error: string }> {
  if (!process.env.OPENAI_API_KEY) {
    return { error: "OpenAI API key is not configured." };
  }
  const filtered = bullets.filter(Boolean);
  if (filtered.length === 0) {
    return { error: "Add at least one bullet to improve." };
  }
  try {
    const roleContext =
      context.role || context.company
        ? `Role/context: ${[context.role, context.company].filter(Boolean).join(" at ")}`
        : "";
    const prompt = `You are a professional resume writer. Rewrite these resume bullet points to be more impactful and professional. Use strong action verbs and quantify where possible. Keep each bullet to 1-2 lines. Output the same number of bullets, one per line. Do not number them.

${roleContext}

Current bullets:
${filtered.map((b) => `- ${b}`).join("\n")}

Output only the improved bullets, one per line, no numbering or dashes.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });
    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    const improved = text
      .split("\n")
      .map((s) => s.replace(/^[\d\-\.\)]\s*/, "").trim())
      .filter(Boolean);
    if (improved.length === 0) return { error: "No bullets generated." };
    return { bullets: improved };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "OpenAI request failed.";
    return { error: msg };
  }
}
