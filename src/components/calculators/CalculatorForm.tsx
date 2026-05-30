"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { CalculatorConfig } from "@/lib/calculators/config";
import type { Answer } from "@/lib/calculators/engine";

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function CalculatorForm({ config }: { config: CalculatorConfig }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const advanceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const questions = useMemo(
    () => config.questions.map((q) => ({ ...q, options: shuffle(q.options) })),
    [config.questions],
  );

  const question = questions[step];
  const isLast = step === config.questions.length - 1;
  const isComplete = answers.length === config.questions.length;

  useEffect(() => {
    if (!isComplete) return;
    const params = new URLSearchParams();
    answers.forEach((a) => params.set(a.questionId, a.value));
    router.push(`/report/${config.id}?${params.toString()}`);
  }, [isComplete]);

  const select = useCallback((value: string) => {
    const existing = answers.findIndex((a) => a.questionId === question.id);
    const next = [...answers];
    if (existing >= 0) {
      next[existing] = { questionId: question.id, value };
    } else {
      next.push({ questionId: question.id, value });
    }
    setAnswers(next);
    setDirection(1);

    if (isLast) return;

    clearTimeout(advanceRef.current);
    advanceRef.current = setTimeout(() => {
      setStep((s) => s + 1);
    }, 200);
  }, [answers, question.id, isLast]);

  useEffect(() => {
    return () => clearTimeout(advanceRef.current);
  }, []);

  const back = () => {
    setDirection(-1);
    setStep(Math.max(0, step - 1));
  };

  if (isComplete) {
    return (
      <div className="border border-gray-200 dark:border-gray-800 p-6 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading your report...</p>
      </div>
    );
  }

  const currentAnswer = answers.find((a) => a.questionId === question.id);

  return (
    <div className="border border-gray-200 dark:border-gray-800 p-6 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] sm:text-xs tracking-wider uppercase text-gray-400">
          Step {step + 1} of {config.questions.length}
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <h2 className="text-sm lg:text-base font-bold text-gray-900 dark:text-white mb-4">
            {question.label}
          </h2>

          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={`${question.id}-${option.value}`}
                onClick={() => select(option.value)}
                className={`w-full text-left px-4 py-3 text-sm border cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#d1d5db] dark:hover:shadow-[2px_2px_0px_#374151] ${
                  currentAnswer?.value === option.value
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white"
                    : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={back}
          className={`text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors ${
            step === 0 ? "invisible" : ""
          }`}
        >
          ← Back
        </button>
        <span className="text-xs text-gray-400">
          {currentAnswer ? "Selected" : "Pick one"}
        </span>
      </div>
    </div>
  );
}
