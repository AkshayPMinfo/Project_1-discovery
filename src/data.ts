/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Module, Video, Article, LeaderboardUser } from './types';

export const initialModules: Module[] = [
  {
    id: 'foundations',
    title: 'Discovery Foundations',
    description: 'Understand why product discovery matters and how great teams do it',
    icon: 'book',
    color: 'primary',
    lessons: [
      {
        id: 'foundations-1',
        title: 'What is Product Discovery?',
        duration: '5 min',
        xpValue: 20,
        completed: false, // all start incomplete as requested
        explanation: 'Product Discovery is the process of figuring out WHAT to built. If you skip this, you risk spending months building something that nobody actually wants or uses.'
      },
      {
        id: 'foundations-2',
        title: 'Discovery vs Delivery',
        duration: '6 min',
        xpValue: 20,
        completed: false,
        explanation: 'Discovery is deciding "which road to take" (finding the right product to build), whereas Delivery is "driving the car on that road" (actually writing code and building it). Both are crucial, but starting with Discovery prevents wasting precious fuel!'
      },
      {
        id: 'foundations-3',
        title: 'The Double Diamond',
        duration: '8 min',
        xpValue: 25,
        completed: false,
        explanation: 'A helpful 4-stage map for solving problems: 1. Discover (talk to people, explore ideas), 2. Define (pick one clear problem), 3. Develop (design various solutions), and 4. Deliver (build and launch).'
      }
    ]
  },
  {
    id: 'research',
    title: 'User Research',
    description: 'Learn to talk to users, extract insights, and avoid common traps',
    icon: 'group',
    color: 'secondary',
    lessons: [
      {
        id: 'research-1',
        title: 'Introduction to Interviews',
        duration: '7 min',
        xpValue: 20,
        completed: false,
        explanation: 'The best user research is just a friendly conversation. Ask users about their real past actions rather than their future possibilities, and spend 80% of your time listening!'
      },
      {
        id: 'research-2',
        title: 'Identifying User Pain Points',
        duration: '9 min',
        xpValue: 25,
        completed: false,
        explanation: 'Pain points are problems that actively annoy people or cost them time and money. Look for workarounds they currently use; if they are already trying to solve it, it is a real pain point!'
      },
      {
        id: 'research-3',
        title: 'Avoiding Leading Questions',
        duration: '8 min',
        xpValue: 20,
        completed: false,
        explanation: 'Never ask questions like: "Would you like an app that does X?" People are naturally polite and will say yes, which leads to toxic false validation. Ask instead: "How do you do X today?"'
      }
    ]
  },
  {
    id: 'competitive',
    title: 'Competitive Research',
    description: 'Learn how to analyze other products on the market without getting lost in endless feature tables',
    icon: 'layers',
    color: 'tertiary',
    lessons: [
      {
        id: 'competitive-1',
        title: 'Feature Lists vs Core Value',
        duration: '6 min',
        xpValue: 20,
        completed: false,
        explanation: 'Avoid listing every button your competitor has. Focus on what core value they promise on their landing page, why users pay them, and what they do poorly.'
      },
      {
        id: 'competitive-2',
        title: 'The Competitive Matrix',
        duration: '8 min',
        xpValue: 25,
        completed: false,
        explanation: 'A simple way to map competitors: draw two axes (e.g., Price and Ease-of-use), place your competitors on it, and look for "empty spaces" where you can shine.'
      },
      {
        id: 'competitive-3',
        title: 'Secret Shopping',
        duration: '7 min',
        xpValue: 20,
        completed: false,
        explanation: 'Sign up for competitor products as a normal user. Record your onboarding and write down the exact friction points you experienced.'
      }
    ]
  },
  {
    id: 'surveys',
    title: 'Survey Formation',
    description: 'Discover how to draft questionnaire surveys that gather real facts instead of soft opinions',
    icon: 'poll',
    color: 'quaternary',
    lessons: [
      {
        id: 'survey-1',
        title: 'Drafting Fact-Based Questions',
        duration: '5 min',
        xpValue: 20,
        completed: false,
        explanation: 'Never ask "Would you purchase this for $10?". Ask: "When was the last time you spent money to solve this problem, and how much did you pay?"'
      },
      {
        id: 'survey-2',
        title: 'The Goldilocks Survey Length',
        duration: '6 min',
        xpValue: 20,
        completed: false,
        explanation: 'Keep your survey short and punchy. Aim for 5 working questions that can be completed in under 2 minutes. Long surveys get abandoned midway!'
      },
      {
        id: 'survey-3',
        title: 'Avoiding the Neutral Trap',
        duration: '8 min',
        xpValue: 25,
        completed: false,
        explanation: 'When using rating scales, use an even number of options (like 1 to 4 or 1 to 6) instead of 5. This forces respondents to take a stand rather than picking the easy, useless "Neutral" option.'
      }
    ]
  },
  {
    id: 'synthesis',
    title: 'Problem Identification & Synthesis',
    description: 'Group customer research feedback, perform root-cause analysis, and prioritize severe user problems',
    icon: 'book',
    color: 'primary',
    lessons: [
      {
        id: 'synthesis-1',
        title: 'Pain Point Severity Mapping',
        duration: '6 min',
        xpValue: 20,
        completed: false,
        explanation: 'Sort user complaints into tier-1 hair-on-fire blocker metrics down to tier-3 minor visual preferences.'
      },
      {
        id: 'synthesis-2',
        title: 'Affinity Mapping Framework',
        duration: '7 min',
        xpValue: 20,
        completed: false,
        explanation: 'Group user statements and behaviors into thematic categories physically or digitally to extract statistical pattern density.'
      },
      {
        id: 'synthesis-3',
        title: 'Crafting Problem Statements',
        duration: '8 min',
        xpValue: 25,
        completed: false,
        explanation: 'Write focused descriptions of raw friction points using the template: [Persona] experiences [Pain] when trying to [Goal] due to [Friction].'
      }
    ]
  },
  {
    id: 'prioritization',
    title: 'Prioritization',
    description: 'Score potential product decisions systematically using objective formulas instead of relying on subjective gut feelings',
    icon: 'group',
    color: 'secondary',
    lessons: [
      {
        id: 'prioritization-1',
        title: 'The RICE Framework',
        duration: '7 min',
        xpValue: 20,
        completed: false,
        explanation: 'Learn how to multiply Reach, Impact, and Confidence, and divide by Effort to output an objective priority rank.'
      },
      {
        id: 'prioritization-2',
        title: 'MoSCoW & Value vs Effort',
        duration: '6 min',
        xpValue: 20,
        completed: false,
        explanation: 'Divide ideas into Must-have, Should-have, Could-have, and Won\'t-have boundaries, and map value-versus-complexity quadrants.'
      },
      {
        id: 'prioritization-3',
        title: 'Roadmap Defense Rules',
        duration: '8 min',
        xpValue: 25,
        completed: false,
        explanation: 'Use clear, structured user research data to politely defend your product development resources against subjective stakeholder noise.'
      }
    ]
  },
  {
    id: 'hypothesis',
    title: 'Hypothesis Formation',
    description: 'Convert raw guesses and assumptions into testable, scientific product statements that metrics can confirm or refute',
    icon: 'layers',
    color: 'tertiary',
    lessons: [
      {
        id: 'hypothesis-1',
        title: 'Assumption Deconstruction',
        duration: '6 min',
        xpValue: 20,
        completed: false,
        explanation: 'Break down your product idea into testable core components covering market demand, pricing power, and tech viability.'
      },
      {
        id: 'hypothesis-2',
        title: 'Hypothesis Writing Template',
        duration: '7 min',
        xpValue: 20,
        completed: false,
        explanation: 'Write standard hypothesis formats: We believe [Action] will result in [Outcome], and we will know we are right when we measure [Metric].'
      },
      {
        id: 'hypothesis-3',
        title: 'Setting Falsifiability Bars',
        duration: '8 min',
        xpValue: 25,
        completed: false,
        explanation: 'Understand why product tests must explicitly identify failure thresholds. Unfalsifiable statements are not scientific tests.'
      }
    ]
  },
  {
    id: 'validation',
    title: 'Validation & Experiments',
    description: 'Design cheap, rapid experiments to validate market demand with minimal code',
    icon: 'poll',
    color: 'quaternary',
    lessons: [
      {
        id: 'validation-1',
        title: 'Landing Page Smoke Tests',
        duration: '7 min',
        xpValue: 20,
        completed: false,
        explanation: 'Create simple single sites to describe your solution and track sign-up rates or pre-order intent triggers.'
      },
      {
        id: 'validation-2',
        title: 'Wizard of Oz vs Concierge',
        duration: '8 min',
        xpValue: 25,
        completed: false,
        explanation: 'Deliver services manually behind a polished facade (Wizard of Oz) or overtly act as a custom advisor (Concierge) to learn before coding.'
      },
      {
        id: 'validation-3',
        title: 'The Minimum Viable Test',
        duration: '6 min',
        xpValue: 20,
        completed: false,
        explanation: 'Choose the absolute fastest, lowest-cost feedback loop to prove or disprove a core hypothesis instead of building a heavy release.'
      }
    ]
  },
  {
    id: 'metrics',
    title: 'Success Metrics',
    description: 'Identify leading product key performance indicators to prove value creation and retention',
    icon: 'book',
    color: 'primary',
    lessons: [
      {
        id: 'metrics-1',
        title: 'The North Star Metric',
        duration: '8 min',
        xpValue: 25,
        completed: false,
        explanation: 'Establish the single critical measurement that best represents the recurring core value your product delivers to active users.'
      },
      {
        id: 'metrics-2',
        title: 'Leading vs Lagging Indicators',
        duration: '7 min',
        xpValue: 20,
        completed: false,
        explanation: 'Determine the difference between actionable behavior indicators (like user activation frequency) and historical trends (like revenue charts).'
      },
      {
        id: 'metrics-3',
        title: 'Retention & Cohort Analytics',
        duration: '7 min',
        xpValue: 20,
        completed: false,
        explanation: 'Analyze cohort curves to ensure users return to your product after day 1, day 7, and day 30, proving sticky product product value.'
      }
    ]
  }
];

export const videosData: Video[] = [
  // Module 1 – Discovery Foundations
  {
    id: 'vid-foundations-1',
    moduleId: 'foundations',
    title: 'Mastering Product Discovery: A Step-by-Step Guide',
    description: 'A comprehensive walkthrough of the product discovery process from strategy to validation.',
    duration: '10:15',
    imageUrl: 'https://img.youtube.com/vi/b39hUuCTJo0/hqdefault.jpg',
    author: 'Inside The Product',
    summary: 'This video outlines the step-by-step framework of modern product discovery. It explains how to structure discovery phases, align stakeholders, and validate assumptions before moving to delivery.',
    youtubeId: 'b39hUuCTJo0'
  },
  {
    id: 'vid-foundations-2',
    moduleId: 'foundations',
    title: 'Product Discovery with Data & User Research',
    description: 'How to combine quantitative data analytics with qualitative user interviews for discovery.',
    duration: '14:30',
    imageUrl: 'https://img.youtube.com/vi/tuo3CCfCHao/hqdefault.jpg',
    author: 'Product School',
    summary: 'Learn how to make data-informed product discovery decisions. This talk covers setting up metrics, identifying drop-off points, and using user research to explain the "why" behind the numbers.',
    youtubeId: 'tuo3CCfCHao'
  },
  // Module 2 – User Research
  {
    id: 'vid-research-1',
    moduleId: 'research',
    title: 'Customer Discovery for Product Managers',
    description: 'Mastering customer interviews and extracting unbiased insights from target users.',
    duration: '12:10',
    imageUrl: 'https://img.youtube.com/vi/ymgGr1_M-xY/hqdefault.jpg',
    author: 'Jay Clouse',
    summary: 'A practical guide for product managers on customer discovery. Learn how to draft interview scripts, ask neutral questions, and filter out false compliments to uncover real pain points.',
    youtubeId: 'ymgGr1_M-xY'
  },
  {
    id: 'vid-research-2',
    moduleId: 'research',
    title: 'Doing User Research – A Day in the Life of a PM',
    description: 'A realistic look into how product managers prepare, execute, and analyze user research.',
    duration: '08:45',
    imageUrl: 'https://img.youtube.com/vi/MxwyGi-3dzY/hqdefault.jpg',
    author: 'Anthony Saltarelli',
    summary: 'Follow a PM through a day of user research. See how they recruit participants, run sessions, document key findings, and share takeaways with design and engineering teams.',
    youtubeId: 'MxwyGi-3dzY'
  },
  // Module 3 – Competitive Research
  {
    id: 'vid-competitive-1',
    moduleId: 'competitive',
    title: 'How to Use Competitive Analysis and Strategy',
    description: 'Frameworks for assessing competitors and positioning your product to win.',
    duration: '11:05',
    imageUrl: 'https://img.youtube.com/vi/yCr2kha1YVU/hqdefault.jpg',
    author: 'Product School',
    summary: 'This video covers competitive analysis strategy, focusing on identifying market gaps, understanding competitor cost structures, and defining unique value propositions.',
    youtubeId: 'yCr2kha1YVU'
  },
  {
    id: 'vid-competitive-2',
    moduleId: 'competitive',
    title: 'Competitive Analysis for Product Managers',
    description: 'How to build a competitive matrix and analyze rival product features without losing focus.',
    duration: '09:50',
    imageUrl: 'https://img.youtube.com/vi/FGs_VnOa5vY/hqdefault.jpg',
    author: 'Product League',
    summary: 'A guide for PMs to analyze competitor landscapes. Learn how to map feature tables, track pricing structures, and spot differentiators that give your product a competitive edge.',
    youtubeId: 'FGs_VnOa5vY'
  },
  // Module 4 – Survey Formation
  {
    id: 'vid-surveys-1',
    moduleId: 'surveys',
    title: 'User Research Surveys for Product Managers',
    description: 'Best practices for designing user surveys that deliver high-quality, actionable insights.',
    duration: '07:40',
    imageUrl: 'https://img.youtube.com/vi/mH2r11T8RjM/hqdefault.jpg',
    author: 'UX Research Hub',
    summary: 'This video explores how to draft research surveys for product validation. Learn how to construct clear response scales, target the right segments, and avoid bias in your survey questions.',
    youtubeId: 'mH2r11T8RjM'
  },
  {
    id: 'vid-surveys-2',
    moduleId: 'surveys',
    title: 'Writing Better Survey Questions',
    description: 'Common mistakes in survey design and how to rewrite questions for higher accuracy.',
    duration: '06:55',
    imageUrl: 'https://img.youtube.com/vi/n5U-vL1Jt80/hqdefault.jpg',
    author: 'UX Research Hub',
    summary: 'Learn the art of survey questions. The video teaches how to eliminate leading prompts, avoid double-barreled questions, and write options that reflect accurate user sentiments.',
    youtubeId: 'n5U-vL1Jt80'
  },
  // Module 5 – Problem Identification & Synthesis
  {
    id: 'vid-synthesis-1',
    moduleId: 'synthesis',
    title: 'Affinity Mapping User Research',
    description: 'How to group qualitative interview notes to find patterns and synthesize problems.',
    duration: '08:20',
    imageUrl: 'https://img.youtube.com/vi/U368k94GZ80/hqdefault.jpg',
    author: 'Design Academy',
    summary: 'Learn how to run an affinity mapping session. Group research observations into themes, identify clusters of friction, and translate qualitative feedback into structured opportunities.',
    youtubeId: 'U368k94GZ80'
  },
  {
    id: 'vid-synthesis-2',
    moduleId: 'synthesis',
    title: 'How to Synthesize User Research',
    description: 'A framework for turning raw user transcripts and feedback into structured product insights.',
    duration: '11:45',
    imageUrl: 'https://img.youtube.com/vi/nnM37cZ_DkY/hqdefault.jpg',
    author: 'UX Masterclass',
    summary: 'Go from data overload to clear direction. This video details how to build empathy maps, draft user needs statements, and extract core themes from diverse research sources.',
    youtubeId: 'nnM37cZ_DkY'
  },
  // Module 6 – Prioritization
  {
    id: 'vid-prioritization-1',
    moduleId: 'prioritization',
    title: 'RICE Prioritization Framework',
    description: 'Calculating Reach, Impact, Confidence, and Effort to score product features.',
    duration: '09:15',
    imageUrl: 'https://img.youtube.com/vi/5y_O57uGInM/hqdefault.jpg',
    author: 'Product Strategy Academy',
    summary: 'Learn the math behind the RICE framework. This video walks through grading reach, estimating impact, scoring confidence, and calculating developer effort to prioritize your backlog.',
    youtubeId: '5y_O57uGInM'
  },
  {
    id: 'vid-prioritization-2',
    moduleId: 'prioritization',
    title: 'Product Prioritization Frameworks',
    description: 'A comparison of popular prioritization techniques: RICE, Kano Model, and MoSCoW.',
    duration: '13:20',
    imageUrl: 'https://img.youtube.com/vi/FqJ3P70bS2c/hqdefault.jpg',
    author: 'Product School',
    summary: 'Explore the pros and cons of different prioritization systems. Learn when to use the Kano model for customer delight, MoSCoW for scope management, or value-vs-effort matrices for quick alignments.',
    youtubeId: 'FqJ3P70bS2c'
  },
  // Module 7 – Hypothesis Formation
  {
    id: 'vid-hypothesis-1',
    moduleId: 'hypothesis',
    title: 'Product Hypothesis Testing',
    description: 'How to frame feature development as hypotheses that can be proven or disproven.',
    duration: '08:10',
    imageUrl: 'https://img.youtube.com/vi/RscXGvO7O2Y/hqdefault.jpg',
    author: 'Silicon Valley PM Masterclass',
    summary: 'A guide to scientific product validation. Learn how to identify core assumptions, define testable hypotheses, and set clear quantitative thresholds for success or failure.',
    youtubeId: 'RscXGvO7O2Y'
  },
  {
    id: 'vid-hypothesis-2',
    moduleId: 'hypothesis',
    title: 'Lean Startup – Build Measure Learn',
    description: "Eric Ries' core feedback loop for building products under conditions of extreme uncertainty.",
    duration: '10:45',
    imageUrl: 'https://img.youtube.com/vi/yShoEqupgni/hqdefault.jpg',
    author: 'Eric Ries',
    summary: 'Explore the Build-Measure-Learn cycle. Learn how to minimize total time through the loop, create minimum viable products, and decide when to pivot or persevere.',
    youtubeId: 'yShoEqupgni'
  },
  // Module 8 – Validation & Experiments
  {
    id: 'vid-validation-1',
    moduleId: 'validation',
    title: 'MVP Validation',
    description: 'Strategies for validating your Minimum Viable Product with real customer interactions.',
    duration: '09:30',
    imageUrl: 'https://img.youtube.com/vi/FIqzCSfT6Nk/hqdefault.jpg',
    author: 'Product School',
    summary: 'Understand how to run lean validation experiments. This session covers landing page test metrics, email list smoke tests, and mechanical concierge service validations.',
    youtubeId: 'FIqzCSfT6Nk'
  },
  {
    id: 'vid-validation-2',
    moduleId: 'validation',
    title: 'Experiment Design for Product Managers',
    description: 'Setting up controlled experiments, variables, and control groups for product testing.',
    duration: '12:40',
    imageUrl: 'https://img.youtube.com/vi/ErYybNNLzN8/hqdefault.jpg',
    author: 'Melissa Perri',
    summary: 'Learn the principles of robust experiment design. Set up independent variables, isolate controls, define activation benchmarks, and gather reliable data to confirm product hypotheses.',
    youtubeId: 'ErYybNNLzN8'
  },
  // Module 9 – Success Metrics
  {
    id: 'vid-metrics-1',
    moduleId: 'metrics',
    title: 'Product Metrics & Metric Trees',
    description: 'Building KPI trees to decompose high-level business goals into actionable product metrics.',
    duration: '11:50',
    imageUrl: 'https://img.youtube.com/vi/BRdIcy9_3-Q/hqdefault.jpg',
    author: 'HelloPM',
    summary: 'Learn how to map product metric trees. This video covers breaking down North Star metrics into input metrics, isolating leading indicators, and aligning product work with top-line goals.',
    youtubeId: 'BRdIcy9_3-Q'
  },
  {
    id: 'vid-metrics-2',
    moduleId: 'metrics',
    title: 'North Star Metric Explained',
    description: 'How to define, track, and align your entire organization around a single North Star Metric.',
    duration: '08:35',
    imageUrl: 'https://img.youtube.com/vi/3-S_Vn-1Y8A/hqdefault.jpg',
    author: 'Product School',
    summary: 'A guide to the North Star Metric. Understand the relationship between customer value, business strategy, and product engagement, and how to define a sticky North Star metric.',
    youtubeId: '3-S_Vn-1Y8A'
  }
];

export const articlesData: Article[] = [
  {
    id: 'art-foundations-1',
    moduleId: 'foundations',
    title: 'Product Discovery by Marty Cagan',
    description: 'Silicon Valley Product Group’s defining guide on finding product-market fit before writing code.',
    readTime: '6 min read',
    icon: 'search',
    externalUrl: 'https://www.svpg.com/product-discovery/',
    content: [
      'Marty Cagan’s Silicon Valley Product Group has long established the core definitions of modern Product Discovery. Cagan outlines that the primary objective of product discovery is to quickly and systematically separate the good ideas from the bad ones. Product managers, product designers, and engineers must collaborate on a daily basis to address four fundamental risks: value risk (will the customer buy or choose to use this?), usability risk (can the user figure out how to use it?), feasibility risk (can our engineers build this within the constraints of our technology?), and business viability risk (does this solution work for the various dimensions of our business?)',
      'The process requires continuous contact with target users and the rapid formulation of prototypes. In modern environments, teams cannot afford to spend months coding features that are based on unvalidated assumptions. Effective discovery operates as an exploration space where teams experiment, collect qualitative feedback, and gather quantitative inputs before deciding to commit premium resources to product delivery.',
      'Ultimately, Marty Cagan’s framework ensures that the team builds a product that actually creates true value for the customer and the enterprise alike.'
    ]
  },
  {
    id: 'art-foundations-2',
    moduleId: 'foundations',
    title: 'The Double Diamond Design Process',
    description: 'The legendary creative framework popularized by the British Design Council for human-centric product cycles.',
    readTime: '5 min read',
    icon: 'analytics',
    externalUrl: 'https://www.designcouncil.org.uk/our-resources/the-double-diamond/',
    content: [
      'The Double Diamond design process is a structured visual framework created by the British Design Council that divides creative problem solving into four distinct, sequential steps: Discover, Define, Develop, and Deliver. By representing the product cycle as two side-by-side diamonds, the model visually illustrates how teams should alternate between divergent thinking—where they open their minds to explore client ideas widely—and convergent thinking—where they ruthlessly narrow down options to make concrete, actionable product decisions.',
      'The first diamond is dedicated entirely to the problem space. During the Discover phase, product managers gather qualitative insights through dialogue, interviews, and observations, while the Define phase forces the team to consolidate these findings into a single, canonical problem statement. The second diamond is dedicated to the solution space, expanding during the Develop phase to design multiple creative, low-fidelity wireframes, and contracting during the Deliver phase to build, test, and deploy the validated product.',
      'By adhering to the Double Diamond framework, product teams can ensure they do not rush to build solutions for problems that have not been validated.'
    ]
  },
  {
    id: 'art-1',
    moduleId: 'research',
    title: 'How to Talk to Customers (The Mom Test)',
    description: 'Rob Fitzpatrick’s rules for asking questions that people cannot lie to you about, bypassing polite approval.',
    readTime: '5 min read',
    icon: 'menu_book',
    externalUrl: 'https://www.momtestbook.com/',
    content: [
      'Rob Fitzpatrick’s famous book, "The Mom Test," provides an essential validation framework for product managers to bypass polite lying. Fitzpatrick asserts that when you ask customers hypothetical questions about your product ideas, they will almost always give you warm, encouraging approval to protect your feelings. To uncover the true market demand, you must ask questions that even your own mom couldn’t lie to you about—specifically by focusing on historical actions rather than speculative future behaviors.',
      'The framework revolves around three simple but challenging guidelines: talk about their current life and day-to-day habits instead of your exciting product pitch, ask about specific past events instead of future hypotheticals, and speak as little as possible to let the customer do most of the talking. For instance, rather than asking "Would you use an automated document organizer?", ask "Walk me through the last time you organized your files manually, and how long did it take?"',
      'The core lesson of Fitzpatrick’s methodology is that you must listen to what users actually do, not what they promise they will do in the future.'
    ]
  },
  {
    id: 'art-2',
    moduleId: 'research',
    title: 'Continuous Discovery Habits by Teresa Torres',
    description: 'Transitioning from unstructured client interviews to opportunity mapping structures for continuous iteration.',
    readTime: '6 min read',
    icon: 'format_list_bulleted',
    externalUrl: 'https://www.producttalk.org/books/continuous-discovery-habits/',
    content: [
      'Teresa Torres, a renowned product discovery coach, introduces a continuous, structured rhythm in her book "Continuous Discovery Habits." Torres explains that modern product teams must move away from the traditional model of doing research only at the beginning of a project. Instead, successful product teams should conduct small, bite-sized customer research touchpoints every single week, ensuring that they maintain a direct, continuous link to the real user’s environment and daily challenges.',
      'To organize these qualitative signals, Torres introduces the Opportunity Solution Tree—a visual mapping framework that connects business outcomes to customer opportunities (pain points), solutions, and individual assumption tests. This structured visualization helps product managers prioritize which user problems to address first, map potential solutions to those opportunities, and run clinical, low-fidelity tests to validate assumptions before committing development effort to a specific feature branches.',
      'By adopting continuous discovery habits, PMs can transform customer feedback into a structured, visible opportunity map that drives strategic alignment.'
    ]
  },
  {
    id: 'art-3',
    moduleId: 'research',
    title: 'Talking to Humans by Giff Constable',
    description: 'A practical, field-tested guide on how to design and run interviews that reveal authentic customer behaviors.',
    readTime: '4 min read',
    icon: 'error',
    externalUrl: 'https://www.talkingtohumans.com/',
    content: [
      'Giff Constable’s "Talking to Humans" serves as an incredibly practical, human-centric field guide for customer discovery. Constable underscores that while analytics dashboards can provide accurate quantitative data about what users are doing on your product, only direct qualitative conversations can explain why they are doing it. The guide walks founders through the mechanics of designing research target profiles, drafting neutral interview scripts, and scheduling conversations with the right candidates.',
      'The guide stresses the importance of finding the true target customer who feels the pain point acutely. Constable advises product managers to screen participants diligently, ensuring they interview individuals who are already active sufferers of the pain point and have spent actual budget trying to solve it with manual workarounds. This helps you filter out the polite feedback from people who will never actually buy your completed digital tool.',
      'Talking to Humans acts as the definitive roadmap for taking your product ideas out of the building and validating them with real customers.'
    ]
  },
  {
    id: 'art-competitive-1',
    moduleId: 'competitive',
    title: 'Competitive Analysis by Silicon Valley Product Group',
    description: 'How to look past features and evaluate the core value promises of industry incumbents.',
    readTime: '5 min read',
    icon: 'search',
    externalUrl: 'https://www.svpg.com/competitive-analysis/',
    content: [
      'Competitive analysis in product management often falls into the trap of cataloging every feature, setting, and button launched by competitors on a massive, bloated comparison grid. The Silicon Valley Product Group (SVPG) argues that this approach is counterproductive, as competitors frequently build bloated feature sets that their core users never touch. Excellent competitive discovery focuses on analyzing their central value promise, onboarding ease, and customer complaints rather than simple density checklists.',
      'True competitive discovery is the process of defining your unique, defensible market space relative to existing products. By investigating competitor weaknesses—especially by browsing public 3-star reviews where paying users complain about system delays or complex instructions—you can identify the exact feature gaps that represent high-value opportunities for your own product roadmap.',
      'By focusing your research on the core value promise of competitors, you can build a simple product that solves common customer frustrations.'
    ]
  },
  {
    id: 'art-competitive-2',
    moduleId: 'competitive',
    title: 'How to Run a Competitive Analysis by HubSpot',
    description: 'Using objective strategic matrices to map market actors and identify unoccupied whitespace.',
    readTime: '5 min read',
    icon: 'analytics',
    externalUrl: 'https://blog.hubspot.com/marketing/competitive-analysis-kit',
    content: [
      'HubSpot’s comprehensive marketing guides detail how product teams can construct structured competitive analyses to map their markets. Rather than relying on standard, subjective lists of competitor names, product managers should map competitors onto a strategic two-axis grid. The axes of this matrix must represent the key purchasing decision criteria for your target audience, such as Price versus Performance, or On-The-Go Simplicity versus Custom Desktop Configuration.',
      'Once competitors are plotted, patterns will immediately emerge, showing where the market is overcrowded and where strategic opportunities exist. Many older incumbents tend to huddle in the same high-complexity, high-price quadrant, leaving the simple, affordable spaces entirely open. Finding these gaps allows you to position your product with a clear, defensible value proposition.',
      'Plotting actors on strategic axes provides a visual blueprint of the market, helping your team avoid crowded spaces and target high-value niches.'
    ]
  },
  {
    id: 'art-surveys-1',
    moduleId: 'surveys',
    title: 'Superhuman’s Product-Market Fit Engine',
    description: 'Rahul Vohra’s legendary guide on using quantitative survey cohorts to measure and optimize market alignment.',
    readTime: '6 min read',
    icon: 'poll',
    externalUrl: 'https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/',
    content: [
      'Rahul Vohra, the founder of Superhuman, shared a legendary, data-driven framework on First Round Review for finding product-market fit. Vohra argues that traditional definitions of product-market fit are too lagging and hard to measure during early startup iterations. To solve this, Superhuman built a simple, survey-driven engine based on Sean Ellis’s product-market fit question: "How would you feel if you could no longer use the product?" with the options "Very disappointed," "Somewhat disappointed," and "Not disappointed."',
      'Through clinical testing, Vohra discovered that if at least 40% of your active users answer "Very disappointed," your startup has achieved a critical threshold of product-market fit. The framework details how to segment your survey feedback, identify your core supporters (the cohort that loves your product), analyze what those users love most, and build a focused, data-backed development roadmap that specifically addresses the needs of those on the verge of becoming loyal advocates.',
      'Superhuman’s PMF engine remains the definitive playbook for turning subjective feedback into a quantitative metric that guides roadmap prioritization.'
    ]
  },
  {
    id: 'art-synthesis-1',
    moduleId: 'synthesis',
    title: 'Intercom on Product Management',
    description: 'How to synthesize unstructured customer noise into clear, actionable problem statements.',
    readTime: '5 min read',
    icon: 'menu_book',
    externalUrl: 'https://www.intercom.com/books/product-management',
    content: [
      'The book "Intercom on Product Management" provides highly practical advice on synthesizing messy customer feedback into actionable roadmap goals. Early-stage product managers are often inundated with contradictory feature requests from early adopters, sales reps, and stakeholders. Intercom emphasizes that a product manager’s primary role is not to act as a feature compiler, but to understand the underlying user problems and translate them into a clear software direction.',
      'To achieve this, product teams should translate unstructured user comments into structured problem statements. A strong problem statement defines the target user, the exact friction point, and the business or emotional impact of that bottleneck. By documenting the problem statement clearly and aligning the team around it, you build a protective shield that prevents the team from building unvalidated features that clutter the product.',
      'Intercom’s guide is a vital resource for product managers who want to cut through user noise and build features that solve real problems.'
    ]
  },
  {
    id: 'art-prioritization-1',
    moduleId: 'prioritization',
    title: 'The RICE Prioritization Model by Intercom',
    description: 'Demystifying how to prioritize backlog items using objective reach, impact, confidence, and effort metrics.',
    readTime: '6 min read',
    icon: 'analytics',
    externalUrl: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/',
    content: [
      'Intercom popularized the RICE prioritization framework, which remains one of the most widely used scoring models in modern product management. Roadmaps are constantly constrained by development timelines and engineering budgets, with stakeholders pushing for custom integrations or aesthetic tweaks. To prevent decisions from being driven by the loudest voices or subjective biases, RICE calculates an objective score for each feature by multiplying Reach, Impact, and Confidence, and dividing by Effort.',
      'Reach is measured by the number of users who will be affected in a given timeframe, Impact targets the value generated for those users, Confidence represents your team’s certainty in your data, and Effort tracks the required developer weeks. By implementing this numeric scoring, product teams can compare disparate initiatives objectively and prioritize high-leverage "Quick Wins" over dangerous, high-effort "Thankless Tasks."',
      'RICE is an essential model that allows product teams to ground their conversations in objective, quantitative data rather than opinions.'
    ]
  },
  {
    id: 'art-hypothesis-1',
    moduleId: 'hypothesis',
    title: 'How to Formulate a Product Hypothesis by Product School',
    description: 'Converting unproven market ideas into clinical, falsifiable experiments that can explicitly fail.',
    readTime: '5 min read',
    icon: 'search',
    externalUrl: 'https://productschool.com/blog/product-management-2/how-to-formulate-a-product-hypothesis',
    content: [
      'Product School’s instructional resources outline how product teams can adopt scientific methodology by converting assumptions into testable hypotheses. Traditional product plans often treat unproven ideas as absolute facts, leading teams to build features for months only to find zero active adoption. To prevent this waste, every feature proposal should be framed as an experiment with a clear outcome and a measurable metrics.',
      'A robust product hypothesis should specify the target user, the proposed feature intervention, the expected behavioral outcome, and a falsifiable metric shift with a set timeline. For example, rather than writing "We believe that building an auto-sharing button will increase weekly shared links by 15% within the first 14 business days of beta release," write "We believe that building an auto-sharing button will increase weekly shared links by 15% within the first 14 business days of beta release."',
      'Establishing a clear failure threshold before launching an experiment ensures objective learning and keeps your roadmap free of unvalidated code.'
    ]
  },
  {
    id: 'art-validation-1',
    moduleId: 'validation',
    title: 'The Lean Startup Smoke Testing Playbook',
    description: 'How to gather signups and pre-orders ethically to measure real customer commitment before coding.',
    readTime: '6 min read',
    icon: 'error',
    externalUrl: 'https://theleanstartup.com/',
    content: [
      'Eric Ries’s landmark book, "The Lean Startup," popularized smoke testing as a highly efficient method to measure customer interest. A smoke test typically involves putting up a simple descriptive landing page with a call-to-action button (e.g., "Pre-order Now" or "Join Priority Beta") before writing a single line of backend database code. This allows teams to measure actual user commitment—by tracking active clicks or registration signups—before committing development capital.',
      'However, Eric Ries emphasizes that smoke testing must be conducted ethically to protect your brand’s reputation. Deceiving users into believing a product is fully finished and then displaying a mock page saying "This is a test" can break customer trust. Instead, teams should coordinate early interest into a structured, helpful waiting lounge, assuring users that their spot is reserved and communicating rollout plans transparently.',
      'Ethical smoke testing remains an invaluable method to capture high-fidelity behavioral data with zero wasted engineering sprints.'
    ]
  },
  {
    id: 'art-metrics-1',
    moduleId: 'metrics',
    title: 'Cohort Retention Analysis by Amplitude',
    description: 'How to analyze Weekly and Monthly cohorts to measure real product-market fit over time.',
    readTime: '6 min read',
    icon: 'poll',
    externalUrl: 'https://amplitude.com/blog/product-retention-cohort-analysis',
    content: [
      'Amplitude, a leader in product analytics, published defining resources on Cohort Retention Analysis as the ultimate indicator of Product-Market Fit. While user acquisition growth look beautiful on pitch decks, they are often vanity metrics. You can easily inflate your sign-up count by running cheap online advertisements, but if those new users download your mobile app and never open it again, your product is not building true, sustainable value.',
      'To measure true product health, you must group users into cohorts based on their registration date (e.g., the calendar week they signed up) and track their active usage over subsequent weeks. Plotting these cohorts yields retention curves. If the curve continuously decays toward zero, your product has a "leaking bucket" problem. If the curve levels out flat, it proves a group of loyal users has found permanent, recurring value.',
      'Amplitude’s cohort analysis playbooks show how a flat retention curve is the single most critical indicator of true product-market fit.'
    ]
  }
];

export const initialLeaderboard: LeaderboardUser[] = [
  { rank: 1, name: 'Ananya M.', initials: 'AM', xp: 3200 },
  { rank: 2, name: 'Sven G.', initials: 'SG', xp: 2150 },
  { rank: 3, name: 'You (First Timer!)', initials: 'Y', xp: 1540, isYou: true },
  { rank: 4, name: 'Maya R.', initials: 'MR', xp: 1400 },
  { rank: 5, name: 'Dev T.', initials: 'DT', xp: 1200 },
  { rank: 6, name: 'Kenji O.', initials: 'KO', xp: 950 }
];
