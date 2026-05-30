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
          <div className="relative z-10 max-w-6xl mx-auto w-full px-6 grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              className="text-left bg-white/70 dark:bg-gray-950/70 border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] h-full flex flex-col"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h1
                variants={fadeUp}
                className="text-xl sm:text-2xl font-bold leading-tight mb-3"
              >
                <span className="text-blue-600 dark:text-blue-400">
                  Benchmark your intuition.
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-3"
              >
                Is your software worth what you invested?
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3 font-medium"
              >
                Put your investment to the test — cloud, fullstack, or pipeline.
                Instant scorecard. No filter.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-2 sm:gap-3 mb-4 text-xs"
              >
                <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                  <p className="font-bold text-gray-900 dark:text-white">
                    Eight
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Questions</p>
                </div>
                <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                  <p className="font-bold text-gray-900 dark:text-white">
                    Three
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Tracks</p>
                </div>
                <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                  <p className="font-bold text-gray-900 dark:text-white">
                    Critical
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Evaluations
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-auto">
                <AssessCarousel />
                <div className="mt-3">
                  <Link
                    href="/assess"
                    className="group block w-full text-center text-xs tracking-wider uppercase px-5 py-2.5 bg-blue-600 text-white pixel-btn border border-blue-700 shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
                  >
                    Run a check{" "}
                    <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <div id="painpoints" className="min-w-0 h-150">
              <PainPointGrid />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-[10px] tracking-wider text-gray-400 dark:text-gray-500">
          {new Date().getFullYear()}{" "}
          <span className="text-xs text-gray-600 dark:text-gray-300 font-bold">
            a
          </span>
          bdur{" "}
          <span className="text-xs text-gray-600 dark:text-gray-300 font-bold">
            r
          </span>
          ehman{" "}
          <span className="text-xs text-gray-600 dark:text-gray-300 font-bold">
            tariq
          </span>
        </div>
      </footer>
    </div>
  );
}
