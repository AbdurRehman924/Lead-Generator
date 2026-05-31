import Link from "next/link";
import { calculators } from "@/lib/calculators/config";

export default function AssessPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 pt-16 pb-16">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Benchmark your intuition.
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-8">
          Built from 5+ years of industry experience and shipping software — every question is there for a reason.
        </p>

        <div className="grid gap-4">
          {Object.values(calculators).map((calc) => (
            <Link
              key={calc.id}
              href={`/assess/${calc.id}`}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] hover:shadow-[5px_5px_0px_#bfdbfe] dark:hover:shadow-[5px_5px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
            >
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{calc.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{calc.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
