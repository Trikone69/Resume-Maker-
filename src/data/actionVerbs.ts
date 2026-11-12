export interface ActionVerbCategory {
  category: string;
  verbs: string[];
}

export const ACTION_VERB_CATEGORIES: ActionVerbCategory[] = [
  {
    category: "Leadership & Management",
    verbs: [
      "Spearheaded", "Architected", "Orchestrated", "Directed", "Championed",
      "Mentored", "Mobilized", "Cultivated", "Overhauled", "Formulated",
      "Navigated", "Governed", "Empowered", "Fostered", "Streamlined"
    ]
  },
  {
    category: "Engineering & Technical",
    verbs: [
      "Engineered", "Developed", "Deployed", "Refactored", "Implemented",
      "Automated", "Containerized", "Integrated", "Configured", "Debugged",
      "Migrated", "Provisioned", "Constructed", "Optimized", "Scaled"
    ]
  },
  {
    category: "Results & Metrics (Quantitative)",
    verbs: [
      "Accelerated", "Maximized", "Generated", "Boosted", "Slashed",
      "Expanded", "Outperformed", "Surpassed", "Decreased", "Doubled",
      "Elevated", "Capitalized", "Yielded", "Amplified", "Curtailed"
    ]
  },
  {
    category: "Problem Solving & Analysis",
    verbs: [
      "Identified", "Diagnosed", "Resolved", "Investigated", "Evaluated",
      "Synthesized", "Benchmarked", "Audited", "Remediated", "Decoded",
      "Streamlined", "Calculated", "Forecasted", "Interpreted", "Rectified"
    ]
  },
  {
    category: "Product & Strategy",
    verbs: [
      "Pioneered", "Launched", "Validated", "Designed", "Conceptualized",
      "Standardized", "Iterated", "Roadmapped", "Transformed", "Piloted",
      "Monetized", "Positioned", "Delivered", "Prioritized", "Revitalized"
    ]
  }
];

export const ALL_ACTION_VERBS = Array.from(
  new Set(ACTION_VERB_CATEGORIES.flatMap(c => c.verbs.map(v => v.toLowerCase())))
);

export const BULLET_POINT_FORMULAS = [
  {
    title: "Google XYZ Formula",
    formula: "Accomplished [X] as measured by [Y], by doing [Z]",
    example: "Increased database query performance by 42% (Y) by implementing Redis distributed caching and query index restructuring (Z)."
  },
  {
    title: "Action-Context-Result (ACR)",
    formula: "[Power Action Verb] + [Context/Project] + [Quantifiable Impact]",
    example: "Spearheaded migration of monolith backend to Kubernetes microservices, reducing AWS infrastructure expenditure by $85,000 annually."
  },
  {
    title: "Problem-Action-Result (PAR)",
    formula: "Resolved [Challenge] by [Specific Technical Action], resulting in [Benefit]",
    example: "Eliminated intermittent transaction deadlocks by refactoring SQL isolation levels, elevating system reliability to 99.99% uptime."
  }
];

export const PRESET_BULLET_SUGGESTIONS = [
  "Spearheaded end-to-end development of core features using React, TypeScript, and Node.js, delivering on schedule for 120,000+ monthly active users.",
  "Engineered automated CI/CD deployment pipelines with GitHub Actions and Docker, reducing build-to-production deployment cycle from 45 minutes to 7 minutes.",
  "Architected distributed microservices architecture serving 15M+ daily requests with 99.98% availability and sub-100ms P99 latency.",
  "Optimized frontend bundle size by 38% through dynamic route code splitting, lazy loading, and asset minification, lifting mobile conversion by 14%.",
  "Mentored 6 junior and mid-level software engineers through structured weekly 1-on-1s, technical code reviews, and pair programming workshops.",
  "Decreased customer onboarding churn rate from 18% to 6% by re-architecting authentication workflows and integrating OAuth 2.0 social sign-in.",
  "Automated end-to-end regression testing with Playwright and Jest, elevating code test coverage from 52% to 91% and eliminating critical production regressions.",
  "Collaborated cross-functionally with Product, UX Design, and Data Analytics teams to conceptualize and ship 4 top-requested customer initiatives.",
  "Secured sensitive user data by auditing RBAC authorization policies and implementing AES-256 encryption across all persistent data stores.",
  "Conducted in-depth A/B experimentation across 500k customer sessions, uncovering key checkout funnel insights that drove $340,000 in incremental revenue."
];
