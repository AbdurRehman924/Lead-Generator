import Link from "next/link";
import { calculators } from "@/lib/calculators/config";

export default function AssessPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 pt-16 pb-16">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Benchmark your intuition. Test your setup
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Pick the area that feels shakiest — you'll have a scored report in 2 minutes.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-8">
          Not sure which to pick?{" "}
          <a href="/assess/fullstack" className="text-blue-600 dark:text-blue-400 underline font-semibold">
            Start with the Fullstack Audit →
          </a>
        </p>

        <div className="grid gap-4">
          {Object.values(calculators).map((calc) => (
            <Link
              key={calc.id}
              href={`/assess/${calc.id}`}
              className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] hover:shadow-[5px_5px_0px_#bfdbfe] dark:hover:shadow-[5px_5px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
            >
              {calc.id === "fullstack" && (
                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-blue-600 text-white">
                  Most Popular
                </span>
              )}
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{calc.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{calc.description}</p>
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[9px] text-gray-900 dark:text-white uppercase tracking-wider">Evaluate:</span>
                {calc.categories.map((c) => (
                  <span key={c.id} className="text-[9px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    {c.label}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
