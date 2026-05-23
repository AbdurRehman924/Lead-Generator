"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GridBg } from "@/components/GridBg";
import { PainPointGrid } from "@/components/PainPointGrid";
import { AssessCarousel } from "@/components/AssessCarousel";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      <main className="flex-1 flex flex-col">
        <section className="relative min-h-screen flex flex-col md:justify-center pt-16 pb-8">
          <GridBg />
          <div className="relative z-10 max-w-6xl mx-auto w-full px-6 grid md:grid-cols-2 gap-10 items-stretch">
            <motion.div
              className="text-center md:text-left bg-white/70 dark:bg-gray-950/70 border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] h-full flex flex-col"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.p variants={fadeUp} className="text-xs sm:text-sm tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold mb-3">
                Free Infrastructure Health Check
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900 dark:text-white mb-3">
                Score your infrastructure<br />
                <span className="text-blue-600 dark:text-blue-400">in 2 minutes.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-5 font-medium">
                Answer 7 quick questions about your cloud, app, or deployment pipeline.
                Get a scored report with a letter grade, category breakdown, and actionable fixes.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 sm:gap-3 mb-5 text-xs">
                <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                  <p className="font-bold text-gray-900 dark:text-white">7</p>
                  <p className="text-gray-500 dark:text-gray-400">Questions</p>
                </div>
                <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                  <p className="font-bold text-gray-900 dark:text-white">3</p>
                  <p className="text-gray-500 dark:text-gray-400">Assessments</p>
                </div>
                <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                  <p className="font-bold text-gray-900 dark:text-white">Free</p>
                  <p className="text-gray-500 dark:text-gray-400">Report</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-auto">
                <AssessCarousel />
                <div className="mt-3">
                  <Link
                    href="/assess"
                    className="group block w-full text-center text-xs sm:text-sm tracking-wider uppercase px-5 py-2.5 bg-blue-600 text-white pixel-btn border border-blue-700 shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
                  >
                    Start Your Free Assessment <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <div id="painpoints" className="min-w-0 h-full">
              <PainPointGrid />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-xs tracking-wider uppercase text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Abdur Rehman Tariq
        </div>
      </footer>
    </div>
  );
}
