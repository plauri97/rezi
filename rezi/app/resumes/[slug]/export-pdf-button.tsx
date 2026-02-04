"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { ResumeContent } from "@/lib/resume-types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileDown } from "lucide-react";

const ResumePdfDocument = dynamic(
  () =>
    import("./resume-pdf-document").then((mod) => mod.ResumePdfDocument),
  { ssr: false }
);

export function ExportPdfButton({ content }: { content: ResumeContent }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleExport() {
    setLoading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const doc = <ResumePdfDocument content={content} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "PDF downloaded", description: "Your resume has been exported." });
    } catch (e) {
      toast({
        title: "Export failed",
        description: e instanceof Error ? e.message : "Could not generate PDF.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={loading}
    >
      <FileDown className="h-4 w-4 mr-2" />
      {loading ? "Preparing PDF…" : "Export PDF"}
    </Button>
  );
}
