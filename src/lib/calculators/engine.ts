import { calculators, type CalculatorConfig } from "./config";

export interface Answer {
  questionId: string;
  value: string;
}

const categoryQuestionMap: Record<string, Record<string, string[]>> = {
  cloud: {
    cost: ["surprise_bills", "cloud_waste"],
    security: ["breach_detection", "s3_visibility"],
    reliability: ["recovery_time", "backup_tested"],
    monitoring: ["outage_discovery", "infra_visibility"],
  },
  fullstack: {
    foundation: ["onboarding_friction", "money_readiness"],
    experience: ["user_complaints", "mobile_quality"],
    growth: ["search_visibility", "user_dropoff"],
    quality: ["deploy_confidence", "bug_resolution"],
  },
  pipeline: {
    speed: ["time_to_prod", "panic_deploy"],
    quality_gates: ["broken_test_block", "rollback_speed"],
    observability: ["deploy_health", "deploy_audit"],
    process: ["bus_factor", "manual_steps"],
  },
};

interface CategoryScore {
  id: string;
  label: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface CalculatorResult {
  calculatorId: string;
  overallScore: number;
  maxScore: number;
  percentage: number;
  categories: CategoryScore[];
  grade: string;
}

function getGrade(percentage: number): string {
  if (percentage >= 95) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 55) return "C";
  if (percentage >= 35) return "D";
  return "F";
}

function getCategoryMaxScore(config: CalculatorConfig, categoryId: string): number {
  const map = categoryQuestionMap[config.id];
  if (!map) return 0;
  const questionIds = map[categoryId] ?? [];
  return questionIds.reduce((sum, qid) => {
    const question = config.questions.find((q) => q.id === qid);
    if (!question) return sum;
    return sum + Math.max(...question.options.map((o) => o.score));
  }, 0);
}

function getCategoryScore(config: CalculatorConfig, categoryId: string, answers: Answer[]): number {
  const map = categoryQuestionMap[config.id];
  if (!map) return 0;
  const questionIds = map[categoryId] ?? [];
  let score = 0;
  for (const qid of questionIds) {
    const question = config.questions.find((q) => q.id === qid);
    if (!question) continue;
    const answer = answers.find((a) => a.questionId === qid);
    if (!answer) continue;
    const option = question.options.find((o) => o.value === answer.value);
    if (option) score += option.score;
  }
  return score;
}

export function calculateScore(configId: string, answers: Answer[]): CalculatorResult {
  const config = calculators[configId];
  if (!config) throw new Error(`Calculator "${configId}" not found`);

  const categories: CategoryScore[] = config.categories.map((cat) => {
    const score = getCategoryScore(config, cat.id, answers);
    const maxScore = getCategoryMaxScore(config, cat.id);
    const percentage = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;
    return { id: cat.id, label: cat.label, score, maxScore, percentage };
  });

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
  const totalMax = categories.reduce((sum, c) => sum + c.maxScore, 0);
  const percentage = totalMax > 0 ? Math.max(0, Math.round((totalScore / totalMax) * 100)) : 0;

  return {
    calculatorId: configId,
    overallScore: totalScore,
    maxScore: totalMax,
    percentage,
    grade: getGrade(percentage),
    categories,
  };
}
