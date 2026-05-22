import { notFound } from "next/navigation";
import Link from "next/link";
import { calculators } from "@/lib/calculators/config";
import { calculateScore, type Answer } from "@/lib/calculators/engine";
import { ReportCard } from "@/components/calculators/ReportCard";
import { EmailCapture } from "@/components/EmailCapture";

export default async function ReportPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const config = calculators[id];
  if (!config) notFound();

  const answers: Answer[] = config.questions.map((q) => ({
    questionId: q.id,
    value: sp[q.id] || "",
  }));

  const result = calculateScore(id, answers);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-16 pb-12">
        <ReportCard result={result} />
        <EmailCapture calculatorName={config.name} />

        <div className="border border-gray-200 dark:border-gray-800 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] mb-8">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Next Steps</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
            Want detailed recommendations tailored to your specific answers? Book a free 15-minute call
            and I'll walk you through the highest-impact fixes for your infrastructure.
          </p>
          <a
            href="https://calendly.com/artariq"
            className="inline-block text-xs tracking-wider uppercase px-4 py-2 bg-blue-600 text-white pixel-btn shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
          >
            Book a Free Call
          </a>
        </div>

        <Link
          href="/assess"
          className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Try another calculator
        </Link>
      </main>
    </div>
  );
}
