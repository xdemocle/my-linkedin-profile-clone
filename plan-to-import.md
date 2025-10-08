# 🧩 plan.md — LinkedIn Lookalike Demo Update Plan

## 🎯 Objective

Synchronize all multilingual or structured `profile.json` / `data/profile.ts` files with the latest, complete career data from **Rocco Russo**’s 2025 resume set.
Ensure no fields are skipped. All keys must be preserved or created if missing.

---

## 🗂️ Target Files

```txt
/data/profile.json
/lang/en.json
/lang/it.json (if multilingual)
/data/projects.json (optional)
```

---

## ✅ Step-by-Step Update Tasks

### 1. Profile Header

Update keys:

```json
{
  "name": "Rocco Russo",
  "title": "Software Engineer / Tech Lead | Blockchain & Dapps | Agentic AI | Cybersecurity",
  "location": "Apulia, Italy",
  "website": "https://rocco.me",
  "github": "https://github.com/xdemocle",
  "email": "hello@rocco.me",
  "phone": "+39 379 263 0288"
}
```

---

### 2. Summary Section

Replace the `summary` field with:

```json
{
  "summary": "Software engineer with over 20 years of experience in front-end engineering, 5 years in Web3 integrations, and hands-on full-stack development. Expert in React, Svelte, TypeScript, Node.js, Next.js, TailwindCSS, MongoDB, and cloud-native solutions. I build decentralized apps merging blockchain, AI, and real-world utility, with a leadership focus on mentorship, scalable design, and clean code."
}
```

---

### 3. Experience Timeline

Append or overwrite the `experience` array:

```json
"experience": [
  {
    "role": "Lead Software Engineer, Web3",
    "company": "The Web3 Ninja",
    "type": "B2B, Part Time",
    "period": "10/2024 - Present",
    "location": "Apulia, Italy, Remote",
    "achievements": [
      "Mentored 5 interns, placed 3 as junior devs.",
      "Built 3 DApps and APIs improving transaction speed by 15%.",
      "Reduced gas fees via optimized blockchain integration."
    ]
  },
  {
    "role": "Lead Frontend Engineer",
    "company": "Games Global",
    "period": "09/2023 - 09/2024",
    "location": "Swieqi, Malta, Remote",
    "achievements": [
      "Developed UI for Lotsaloot™ jackpot system.",
      "Enhanced player engagement with tiered reward logic.",
      "Collaborated across teams to increase retention metrics."
    ]
  },
  {
    "role": "Tech Lead, Web3",
    "company": "Shiba Inu",
    "period": "01/2023 - 08/2023",
    "achievements": [
      "Led 12-member team, boosted productivity by 30%.",
      "Reduced bugs by 25% and raised code quality 40%.",
      "Served 5M users and 3k concurrent visitors."
    ]
  },
  {
    "role": "Lead Frontend Engineer",
    "company": "Ajna Labs",
    "period": "08/2022 - 08/2023",
    "achievements": [
      "Deployed SPA with $20M+ liquidity.",
      "Created SDK reducing integration time 50%.",
      "Released ecosystem-wide design library increasing dev speed 25%."
    ]
  },
  {
    "role": "Lead Frontend Engineer",
    "company": "Linum Labs",
    "period": "08/2021 - 07/2022",
    "achievements": [
      "Supervised 10+ decentralized projects.",
      "Mentored 4 frontend developers.",
      "Improved scalability and UI consistency."
    ]
  },
  {
    "role": "Lead Software Engineer, Web3",
    "company": "Omnia DeFi",
    "period": "01/2021 - 07/2021",
    "achievements": [
      "Built vesting and farming dashboard integrated with Ethereum.",
      "Developed smart contract interaction layers for DeFi operations."
    ]
  },
  {
    "role": "Lead Software Engineer",
    "company": "HCLTech",
    "period": "12/2014 - 07/2015",
    "location": "The Hague, Netherlands",
    "achievements": [
      "Delivered enterprise-grade Web2 refactoring projects.",
      "Optimized legacy systems for cloud-readiness."
    ]
  },
  {
    "role": "Software Engineer",
    "company": "Elsevier (Reaxys 2 Web App)",
    "period": "2013 - 2014",
    "achievements": [
      "Contributed to scientific web apps for chemical data systems.",
      "Developed Angular-based interfaces for cross-platform tablets."
    ]
  },
  {
    "role": "Software Engineer",
    "company": "AdForum",
    "period": "2012 - 2013",
    "achievements": [
      "Built multilingual advertising marketplace with 3M+ visitors/month.",
      "Improved SEO and user engagement on high-traffic portals."
    ]
  }
]
```

---

### 4. Key Achievements

Add under `"achievements_global"`:

```json
[
  "Delivered software accessed by 5M+ users monthly.",
  "Refactored legacy SPA saving €50,000 in maintenance costs.",
  "Increased code quality 40%, reduced bugs 25%.",
  "Boosted team productivity 30% via structured mentorship.",
  "Launched DeFi apps with 20% engagement increase.",
  "Created consistent style guides for multiple ecosystems."
]
```

---

### 5. Skills Breakdown

```json
"skills": {
  "frontend": ["React", "Svelte", "Next.js", "TypeScript", "Redux", "Zustand", "Wagmi", "Viem", "TailwindCSS", "CSS-in-JS"],
  "backend": ["Node.js", "Express", "NestJS", "GraphQL", "MongoDB", "PostgreSQL", "Redis", "Flask", "Python"],
  "devops": ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "Vercel", "Heroku"],
  "web3_ai": ["Smart Contract Integration", "DeFi DApps", "SDK Development", "AI Agent Integration", "Cybersecurity"],
  "testing": ["Jest", "Vitest", "Selenium"],
  "soft_skills": ["Mentorship", "Team Collaboration", "Leadership", "Empathy", "Ethical Awareness", "Code Reviews"]
}
```

---

### 6. Featured Projects

```json
"projects": [
  {
    "name": "Ajna Labs",
    "description": "DeFi DApp and SDK powering $20M+ liquidity.",
    "link": "https://www.ajna.finance"
  },
  {
    "name": "Mode Network",
    "description": "Large-scale React codebase refactoring and performance tuning.",
    "link": "https://www.mode.network"
  },
  {
    "name": "CyberGrandpa Anti-Fraud",
    "description": "Cross-browser extension preventing phishing and fraud exposure.",
    "link": "https://github.com/CyberGrandpas/cybergrandpa-web-extension-antifraud"
  },
  {
    "name": "Tetris with Crypto Rewards",
    "description": "Telegram Mini App awarding TON tokens to leaderboard players.",
    "link": "https://github.com/xdemocle/tetris-mini-app"
  },
  {
    "name": "LinkedIn Full Width",
    "description": "Chrome extension enabling full-width LinkedIn view.",
    "link": "https://chromewebstore.google.com/detail/linkedin-full-width/pijfcmadcbkcjdmajckndpccemdgebhn"
  }
]
```

---

### 7. Education & Certifications

```json
"education": [
  {
    "degree": "Higher Diploma, Accounting & Business",
    "institution": "Athena Institute",
    "location": "Foggia, Italy"
  }
],
"certifications": [
  "AWS Cloud Practitioner – Coursera",
  "Build a JavaScript AI App with OpenAI API – LinkedIn Learning",
  "Practical GitHub Project Management and Collaboration – LinkedIn Learning"
]
```

---

### 8. Languages

```json
"languages": [
  { "language": "Italian", "level": "Native" },
  { "language": "English", "level": "Native" },
  { "language": "Spanish", "level": "Intermediate" }
]
```

---

### 9. Vision

```json
"vision": "Building the decentralized professional identity of tomorrow. Integrating AI-driven mentorship, on-chain credentials, and transparent professional graphs. Focused on authentic collaboration and human-centric technology."
```

---

### 10. Metadata

Add:

```json
"updated_at": "2025-10-07",
"data_version": "2.5.0",
"author": "Rocco Russo"
```

---

## ⚙️ Implementation Notes for Windsurf / Claude

- Maintain JSON schema order as above.
- Do not remove existing keys, only enrich or overwrite values.
- Confirm data consistency across all language files (`en`, `it`, etc.).
- Use double quotes and valid JSON syntax (no comments).
- Validate file with `jq` or JSON schema validator before saving.
