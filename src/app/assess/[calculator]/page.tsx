import { notFound } from "next/navigation";
import { calculators } from "@/lib/calculators/config";
import { CalculatorForm } from "@/components/calculators/CalculatorForm";

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ calculator: string }>;
}) {
  const { calculator } = await params;
  const config = calculators[calculator];
  if (!config) notFound();

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-16 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{config.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{config.description}</p>
        </div>

        <CalculatorForm config={config} />
      </main>
    </div>
  );
}
