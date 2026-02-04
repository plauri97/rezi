"use client";

import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeContent } from "@/lib/resume-types";

// A4: 210 x 297 mm. Margins ~12mm.
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    color: "#444",
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
    color: "#333",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 2,
  },
  summary: {
    marginBottom: 12,
    lineHeight: 1.4,
  },
  jobBlock: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontWeight: "bold",
  },
  jobMeta: {
    color: "#444",
    fontSize: 9,
  },
  bullets: {
    marginLeft: 12,
    marginTop: 4,
  },
  bullet: {
    marginBottom: 2,
    lineHeight: 1.35,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
});

export function ResumePdfDocument({ content }: { content: ResumeContent }) {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    projects,
  } = content;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.fullName || "Your Name"}
          </Text>
          <View style={styles.contact}>
            {personalInfo.email && <Text>{personalInfo.email} · </Text>}
            {personalInfo.phone && <Text>{personalInfo.phone} · </Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
            {personalInfo.website && (
              <Link src={personalInfo.website.startsWith("http") ? personalInfo.website : `https://${personalInfo.website}`}>
                {personalInfo.website.replace(/^https?:\/\//, "")}
              </Link>
            )}
          </View>
        </View>

        {summary && (
          <View style={styles.summary}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text>{summary}</Text>
          </View>
        )}

        {workExperience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workExperience.map((job) => (
              <View key={job.id} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                  <Text style={styles.jobMeta}>
                    {job.startDate}
                    {job.endDate
                      ? ` – ${job.current ? "Present" : job.endDate}`
                      : ""}
                  </Text>
                </View>
                <Text style={styles.jobMeta}>
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </Text>
                {job.bullets.filter(Boolean).length > 0 && (
                  <View style={styles.bullets}>
                    {job.bullets.filter(Boolean).map((b, i) => (
                      <Text key={i} style={styles.bullet}>
                        • {b}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </Text>
                  <Text style={styles.jobMeta}>
                    {edu.startDate} – {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.jobMeta}>
                  {edu.institution}
                  {edu.location ? ` · ${edu.location}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {skills.filter(Boolean).length > 0 && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text>{skills.filter(Boolean).join(" · ")}</Text>
          </View>
        )}

        {projects.length > 0 && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.jobBlock}>
                <Text style={styles.jobTitle}>{proj.name}</Text>
                {proj.description && (
                  <Text style={styles.jobMeta}>{proj.description}</Text>
                )}
                {proj.bullets.filter(Boolean).length > 0 && (
                  <View style={styles.bullets}>
                    {proj.bullets.filter(Boolean).map((b, i) => (
                      <Text key={i} style={styles.bullet}>
                        • {b}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
