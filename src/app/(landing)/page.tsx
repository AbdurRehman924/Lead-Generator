"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { calculators } from "@/lib/calculators/config";
import { MatrixRain } from "@/components/MatrixRain";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 flex flex-col">
        <section className="relative flex-1 flex flex-col justify-center pt-16 pb-6">
          <MatrixRain />
          <motion.div
            className="relative z-10 max-w-2xl mx-auto w-full px-6 text-center"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.p variants={fadeUp} className="text-sm tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold mb-4">
              Free Infrastructure Health Check
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-4">
              Score your infrastructure<br />
              <span className="text-blue-600 dark:text-blue-400">in 2 minutes.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto mb-6">
              Answer 7 quick questions about your cloud, app, or deployment pipeline.
              Get a scored report with a letter grade, category breakdown, and actionable fixes.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 text-xs">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                <p className="font-bold text-gray-900 dark:text-white">7</p>
                <p className="text-gray-500 dark:text-gray-400">Questions</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                <p className="font-bold text-gray-900 dark:text-white">3</p>
                <p className="text-gray-500 dark:text-gray-400">Assessments</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                <p className="font-bold text-gray-900 dark:text-white">Free</p>
                <p className="text-gray-500 dark:text-gray-400">Report</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href="/assess"
                className="group inline-block text-xs tracking-wider uppercase px-5 py-2.5 bg-blue-600 text-white pixel-btn shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
              >
                Start Your Free Assessment <span className="inline-block transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-3">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-8 text-xs tracking-wider uppercase text-gray-500 dark:text-gray-400">
            <span>AWS · Terraform · CI/CD</span>
            <span className="hidden sm:inline">Next.js · React · Node</span>
            <span className="hidden sm:inline">Docker · K8s · SEO</span>
          </div>
        </section>

        <section className="max-w-5xl mx-auto w-full px-6 py-16">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6 text-center">
            Choose your assessment
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.values(calculators).map((calc) => (
              <Link
                key={calc.id}
                href={`/assess/${calc.id}`}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] hover:shadow-[5px_5px_0px_#bfdbfe] dark:hover:shadow-[5px_5px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] tracking-wider uppercase text-blue-600 font-semibold">
                    {calc.categories.length} categories
                  </p>
                  <span className="text-sm transition-all duration-300 group-hover:text-blue-500 group-hover:scale-[2] group-hover:translate-x-1">→</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{calc.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{calc.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider uppercase text-gray-500 dark:text-gray-400">
          <span>&copy; {new Date().getFullYear()} Abdur Rehman Tariq</span>
          <div className="flex items-center gap-5">
            <a href="https://github.com/AbdurRehman924" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
            <a href="https://artariq.dev" className="hover:text-gray-900 dark:hover:text-white transition-colors">Portfolio</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
