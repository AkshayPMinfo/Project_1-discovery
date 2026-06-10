/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleQuiz {
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}

export const moduleQuizzes: Record<string, ModuleQuiz> = {
  foundations: {
    moduleId: "foundations",
    title: "Discovery Foundations Master Quiz",
    questions: [
      {
        id: "f1",
        text: "What is the primary purpose of Product Discovery?",
        options: [
          "To craft visual marketing banners and digital promotional assets.",
          "To write highly polished backend code and establish cloud database tables.",
          "To thoroughly understand user needs and decide precisely WHAT to build before spending development resources.",
          "To perform system database load testing and scale infrastructure capacity."
        ],
        correctIndex: 2,
        explanation: "Product Discovery is the critical upfront process of finding the right problem to solve and confirming user value, preventing teams from wasting critical fuel on features nobody wants."
      },
      {
        id: "f2",
        text: "In the Double Diamond framework, what is the main goal of the first ('Discover') phase?",
        options: [
          "To limit scope to one precise database schema.",
          "To design complete production-ready user interfaces in Figma.",
          "To compile final price calculations to pitch to investors.",
          "To widen your perspective, talk to real users, and gather broad insights about the problem space."
        ],
        correctIndex: 3,
        explanation: "The first diamond starts with diverging. The 'Discover' phase is designed to explore widely, identify behavior habits, and keep an open, unbiased mind before defining limits."
      },
      {
        id: "f3",
        text: "Which of the following activities represents 'Delivery' rather than 'Discovery'?",
        options: [
          "Configuring container routes, writing API logic, and deploying compiled code.",
          "Conducting casual user conversations regarding recent behavioral workarounds.",
          "Performing competitor secret shopping to document signup friction points.",
          "Analyzing open-ended survey results to look for recurring behavioral cues."
        ],
        correctIndex: 0,
        explanation: "Delivery focuses on high-quality engineering, stability, performance, and putting the prioritized solution into hands. The other tasks are focused on identifying what that solution should be."
      },
      {
        id: "f4",
        text: "Why is skipping Product Discovery highly risky for early startups?",
        options: [
          "It forces developers to use retro terminal-based text editors.",
          "It often results in building beautiful, highly optimized solutions that satisfy a problem that doesn't actually exist.",
          "It guarantees that server hosting costs will automatically double.",
          "It makes it impossible to configure secure client-side login tokens."
        ],
        correctIndex: 1,
        explanation: "Without validation, teams suffer from 'builder bias'—building systems they find interesting but lack genuine market pull or real customer necessity."
      },
      {
        id: "f5",
        text: "What does 'Divergent Thinking' mean in design processes?",
        options: [
          "Rejecting customer suggestions that challenge your core technology stack.",
          "Standardizing your local workspace files to follow rigid architectural rules.",
          "Exploring a large array of options, perspectives, and ideas without premature judgment.",
          "Reducing your UI prototype to a single screen representation to save hours."
        ],
        correctIndex: 2,
        explanation: "Diverging is the act of opening up options. Rather than settling for your very first idea, you generate multiple options to find superior alternatives."
      },
      {
        id: "f6",
        text: "What does 'Convergent Thinking' mean in design processes?",
        options: [
          "Filtering, grouping, and selecting from a wide range of options to zero in on a single plan.",
          "Adding secondary elements to a navigation bar to expand application coverage.",
          "Formatting your relational SQL tables to operate inside an integrated cluster.",
          "Drafting complex user surveys containing 50 or more hypothetical evaluation scales."
        ],
        correctIndex: 0,
        explanation: "Converging is about narrowing and selecting. Following wide exploration (diverging), you must converge on a clear problem statement or a specific solution direction."
      },
      {
        id: "f7",
        text: "Which phase of the Double Diamond is dedicated to translating broad discovery insights into one concrete Problem Statement?",
        options: [
          "The 'Deliver' phase",
          "The 'Develop' phase",
          "The 'Define' phase",
          "The 'Discover' phase"
        ],
        correctIndex: 2,
        explanation: "The 'Define' phase represents the convergence of the first diamond, narrowing down raw research records into a single targeted, high-priority problem to tackle."
      },
      {
        id: "f8",
        text: "What is the core philosophy of 'Continuous Discovery' pioneered by Teresa Torres?",
        options: [
          "Re-architecting your server database tables on every single code commit.",
          "Talking to users and testing ideas in small steps every single week, rather than once a year.",
          "Allowing customers to manually draft your software engineering blueprints.",
          "Emailing survey questionnaires to all dormant users on a daily cycle."
        ],
        correctIndex: 1,
        explanation: "Continuous Discovery means embedding validation into the weekly rhythm of the team, keeping product choices aligned with real-world shifts in customer behavior."
      },
      {
        id: "f9",
        text: "Who on a cross-functional software team should actively participate in Product Discovery?",
        options: [
          "Only the junior database administrator.",
          "Only independent contract designers.",
          "A triad of Product, Design, and Engineering leaders to ensure shared context and technical feasibility.",
          "Only external SEO search marketing consultants."
        ],
        correctIndex: 2,
        explanation: "When Product, Engineering, and Design (the 'triad') collaborate on discovery, solutions are automatically practical, useful, and aligned with technology limitations from day one."
      },
      {
        id: "f10",
        text: "If a company delivers a high-quality, bug-free app on time, but no users sign up or return, what went wrong?",
        options: [
          "They executed Delivery flawlessly, but utterly failed at Product Discovery.",
          "The dev server was configured to bind to port 3000 instead of port 4000.",
          "They should have used custom dark terminal motifs to attract advanced web developers.",
          "The database backup cron jobs were scheduled incorrectly."
        ],
        correctIndex: 0,
        explanation: "This is a classic 'delivery success but product failure'. Writing perfect code doesn't matter if it serves an invalid hypothesis. Product discovery exists to address this gap."
      }
    ]
  },
  research: {
    moduleId: "research",
    title: "User Research & 'The Mom Test' Quiz",
    questions: [
      {
        id: "r1",
        text: "According to 'The Mom Test', what is the biggest mistake you can make during a customer interview?",
        options: [
          "Forgetting to supply a branded company slide presentation.",
          "Asking customers hypothetical questions about their future behavior (e.g., 'Would you use X?').",
          "Conducting the interview in a relaxed coffee shop instead of a boardroom.",
          "Ending the meeting in under 45 minutes."
        ],
        correctIndex: 1,
        explanation: "Hypothetical validation is useless because people are naturally polite and will lie to avoid hurting your feelings. 'The Mom Test' teaches us to ask about what they have actually done in the past."
      },
      {
        id: "r2",
        text: "Which of the following represents a great 'The Mom Test' compliant question?",
        options: [
          "Do you think an automated dashboard would save you hours every week?",
          "How much would you pay for a tool that organizes your expenses instantly?",
          "How did you solve this expense tracking problem the last time it happened?",
          "Would you recommend an app like this to your business associates?"
        ],
        correctIndex: 2,
        explanation: "Asking how they solved it last time investigates direct, concrete past behavior. If they didn't even try to solve it last time, they likely don't care about a premium automation solution either."
      },
      {
        id: "r3",
        text: "If a user enthusiastically says, 'Wow! That app sounds absolutely incredible! I would definitely buy that!' how should you interpret this?",
        options: [
          "Take it as definitive validation and instruct engineering to start coding.",
          "Treat it as polite fluff and immediately bring the conversation back to concrete behaviors.",
          "Ask them to sign a non-binding letter of future intent.",
          "Send them a link to your secure payment checkout immediately."
        ],
        correctIndex: 1,
        explanation: "Compliments are the fools-gold of user research. They feel good but are zero-cost indicators and offer false validation. Direct the user back to real-world habits and workflows."
      },
      {
        id: "r4",
        text: "Why should you spend roughly 80% of an interview listening rather than talking?",
        options: [
          "To conserve your energy and prevent throat fatigue.",
          "Because you are trying to extract their mental model, not teach them your product idea.",
          "Because a shorter transcript is easier to serialize into a local database.",
          "To ensure the participant does not feel like you are avoiding their questions."
        ],
        correctIndex: 1,
        explanation: "If you are pitching and explaining your feature, you are selling, not learning. You want to extract their current pain-points, workflows, and emotional triggers."
      },
      {
        id: "r5",
        text: "What constitutes a 'genuine workaround' when analyzing a customer's workflow?",
        options: [
          "A custom feature the competitor promised on their future public roadmap.",
          "An active, often clumsy system (like messy Excel spreadsheets or calendar reminders) they set up themselves to cope with a problem.",
          "The internal software architecture used to run heavy queries.",
          "A generic marketing banner shown to first-time website visitors."
        ],
        correctIndex: 1,
        explanation: "A workaround is the ultimate proof of a true pain point. If a customer is already spending time or money duct-taping a system together, they will happily pay for an integrated, polished tool."
      },
      {
        id: "r6",
        text: "How do you identify if a user problem is a tier-1 'hair-on-fire' problem?",
        options: [
          "They send you high-resolution design sketches of what they want.",
          "The problem causes direct loss of revenue, extreme stress, or takes up hours of tedious manual work every week.",
          "They are a close acquaintance and tell you they really love your concept.",
          "They have rated it 3 out of 5 stars on a hypothetical interest survey."
        ],
        correctIndex: 1,
        explanation: "Hair-on-fire problems are painful enough that users are actively searching for solutions. If it causes severe stress, direct financial losses, or excessive manual labor, the budget to solve it already exists."
      },
      {
        id: "r7",
        text: "What is a major danger of interviewing family and close friends about your startup concept?",
        options: [
          "They will violate your database integrity code.",
          "They are highly likely to give you overly polite, positive feedback to protect your feelings.",
          "They will request equity in your new business entity.",
          "They do not understand how to use traditional web browsers."
        ],
        correctIndex: 1,
        explanation: "Family and friends represent the ultimate danger zone for polite lies! This is why Rob Fitzpatrick named the book 'The Mom Test'—you must ask questions so good that even your Mom can't lie to you."
      },
      {
        id: "r8",
        text: "If a user mentions they hate their current software solution, what is the best follow-up question?",
        options: [
          "What specific button would you add to make it perfect?",
          "Can you show me the last time you used it, and walk me through what went wrong?",
          "If I build a cheaper alternative, would you switch tomorrow?",
          "Did you know our system avoids all those issues completely?"
        ],
        correctIndex: 1,
        explanation: "Asking them to show you or describe the exact last event brings the conversation to factual reality. It highlights real mechanics, workarounds, and frustrations."
      },
      {
        id: "r9",
        text: "How many qualitative customer interviews are typically needed to start seeing recurring patterns in a specific persona tier?",
        options: [
          "Precisely 1 to 2 interviews.",
          "Between 5 to 8 interviews.",
          "At least 150 to 200 interviews.",
          "Interviews must never stop until the product gets decommissioned."
        ],
        correctIndex: 1,
        explanation: "Qualitative research hits diminishing returns quickly. After 5 to 8 conversations with the same targeted persona, you will start hearing the exact same issues, workarounds, and stories repeated."
      },
      {
        id: "r10",
        text: "What should you do with user feedback that completely contradicts your original product hypothesis?",
        options: [
          "Delete the interview notes to protect your development schedule.",
          "Embrace it as rich, course-correcting intelligence and pivot your hypothesis before code gets written.",
          "Launch a separate advertising campaign to convince them they are wrong.",
          "Configure your application logic to restrict those specific users from logging in."
        ],
        correctIndex: 1,
        explanation: "Finding out you are wrong early is a massive success! It saves you months of wasted developer effort and redirects you toward problems that customers actually need solved."
      }
    ]
  },
  competitive: {
    moduleId: "competitive",
    title: "Competitive Analysis & Secret Shopping Quiz",
    questions: [
      {
        id: "c1",
        text: "When conducting Competitive Research, why is a simple check-list of competitor buttons often highly misleading?",
        options: [
          "It ignores the actual customer experience, speed, reliability, and whether customers are actually satisfied with those buttons.",
          "It takes up too much database space inside the local browser context.",
          "Competitors will sue your startup for copying their exact button styles.",
          "It forces you to use old-fashioned monochrome color sets."
        ],
        correctIndex: 0,
        explanation: "Feature checklists hide the user experience. A competitor might have 100 features on paper, but if their onboarding is horrific and their data is buggy, users will dump them for a simple tool that works perfectly."
      },
      {
        id: "c2",
        text: "What is the primary objective of a 'Secret Shopper' routine on a competitor product?",
        options: [
          "To steal their source code and upload it to public repositories.",
          "To purchase their company stock on public exchanges.",
          "To experience their real signup flow, onboarding speed, and customer service reply times as an ordinary rookie user.",
          "To send passive-aggressive chat support messages to distract their staff."
        ],
        correctIndex: 2,
        explanation: "Secret shopping breaks down the wall of marketing claims. It reveals the exact friction points, transactional emails, and setup hurdles that competitor customers face."
      },
      {
        id: "c3",
        text: "In a 'Competitive Matrix' chart with Ease-of-Use on one axis and Setup Cost on another, what does an 'Empty Box' represent?",
        options: [
          "A critical system compile error in your rendering canvas.",
          "A potential market opportunity or underserved customer tier that you could target.",
          "An illegal market sector forbidden by standard web safety rules.",
          "A redundant category that you should delete immediately."
        ],
        correctIndex: 1,
        explanation: "Empty cells in a competitive matrix highlight gaps. If all competitors are expensive and complex, building a cheap, incredibly easy tool is a clean, unoccupied space to win over customers."
      },
      {
        id: "c4",
        text: "Where is the best source to find honest, raw complaints about a competitor product?",
        options: [
          "Their own official homepage customer testimonial section.",
          "Their press release statements issued to news outlets.",
          "Third-party public review boards, Reddit communities, and App Store feedback threads.",
          "Their corporate executive bios hosted on LinkedIn."
        ],
        correctIndex: 2,
        explanation: "Public forums, Reddit, and independent review platforms (like G2 or Trustpilot) show unfiltered customer rage and frustrations—giving you a direct list of candidate problems to solve."
      },
      {
        id: "c5",
        text: "Which of the following describes a 'Direct Competitor' as opposed to an 'Indirect Competitor'?",
        options: [
          "An app targeting the exact same customer persona with a very similar solution.",
          "A casual email tool like Gmail used to communicate with team members.",
          "A firm operating in a completely different sector with zero overlapping capabilities.",
          "A web search engine like Google used to index various sites."
        ],
        correctIndex: 0,
        explanation: "Direct competitors solve the exact same problem for the exact same audience. Indirect competitors might solve the problem differently (e.g., using a paper planner instead of digital software)."
      },
      {
        id: "c6",
        text: "Why is a competitor's onboarding flow a key area to study?",
        options: [
          "Because that is where the majority of customer drop-off and frustration occurs.",
          "Because it is the only part of the app that uses modern CSS styling.",
          "Because onboarding flows are legally required to carry terms of service pages.",
          "Because onboarding requires using advanced cloud SQL setups."
        ],
        correctIndex: 0,
        explanation: "Up to 50% of users drop out during onboarding if it is too slow or confusing. Finding onboarding flow issues in popular competitors helps you design a super-fast, frictionless entry path."
      },
      {
        id: "c7",
        text: "What does 'Core Value Promise' mean in competitive analysis?",
        options: [
          "The absolute cost of their lowest paid enterprise tier.",
          "The fundamental benefit the competitor promises on their landing page headline to attract signups.",
          "The speed of their server's visual rendering framework.",
          "The encryption key algorithms used to secure user credentials."
        ],
        correctIndex: 1,
        explanation: "The Core Value Promise represents how the product pitches its ultimate value. Studying this helps you understand their marketing hooks and check if they actually deliver on that promise."
      },
      {
        id: "c8",
        text: "How should a startup react if a massive multi-billion dollar company launches an app with overlapping features?",
        options: [
          "Shut down your startup immediately and delete your codebase.",
          "Ignore them and focus on solving your specific customer's pain points faster and with higher dedication.",
          "Spend your entire runway on an expensive legal trademark lawsuit.",
          "Build a generic clone of their entire dashboard layout."
        ],
        correctIndex: 1,
        explanation: "Massive companies build generic horizontal platforms. You can easily out-compete them by going vertical—building an extremely specialized, deeply loved product for a narrow target market."
      },
      {
        id: "c9",
        text: "What does 'feature parity' mean?",
        options: [
          "Limiting features to keep code compile times under 5 seconds.",
          "Having an identical list of features or capabilities as your primary competitors.",
          "Deleting secondary features that don't earn XP.",
          "Ensuring all buttons use matching hover states."
        ],
        correctIndex: 1,
        explanation: "Feature parity is the state of matching your competitors' capabilities item-for-item. It is often a trap, as it causes you to build bloated software rather than distinctive value."
      },
      {
        id: "c10",
        text: "What is an indirect competitor to Excel for budgeting?",
        options: [
          "A physical notebook and pen.",
          "A dedicated SaaS tool like Google Sheets.",
          "A massive cloud database server.",
          "An online currency calculator."
        ],
        correctIndex: 0,
        explanation: "Excel's indirect competitors are non-computational workarounds like paper journals or physical calculators. Understanding indirect competitors tells you what habits you are trying to break."
      }
    ]
  },
  surveys: {
    moduleId: "surveys",
    title: "Survey Formation & Fact-Based Questionnaires Quiz",
    questions: [
      {
        id: "s1",
        text: "What is a main flaw of surveys compared to live user interviews?",
        options: [
          "Surveys can only handle true/false response questions.",
          "Surveys don't allow you to ask follow-up questions to understand the 'why' behind a rating.",
          "Surveys cannot be rendered elegantly on mobile layouts.",
          "Surveys of any size require writing advanced SQL joins."
        ],
        correctIndex: 1,
        explanation: "While surveys compile excellent quantitative statistics, they lack depth. You get numbers and responses, but you can't stop and ask 'Why did you try that workaround?' or dig into their emotions."
      },
      {
        id: "s2",
        text: "Which question is highly vulnerable to hypothetical response bias?",
        options: [
          "How many times did you purchase organic products in the last 7 days?",
          "How much did you spend on your current workout membership last month?",
          "Would you pay $15/month for our new automated health tracker if we built it?",
          "What software do you currently use to input your client invoices?"
        ],
        correctIndex: 2,
        explanation: "The 'would you' question is a classic hypothetical question. It costs the user nothing to answer 'yes' to be polite, but they will vanish when it is time to input a credit card."
      },
      {
        id: "s3",
        text: "Why is an even-numbered Likert scale (e.g., 1 to 4) often preferred over an odd-numbered one (e.g., 1 to 5)?",
        options: [
          "It matches binary computer systems perfectly.",
          "It eliminates the middle neutral option, forcing the user to lean positive or negative.",
          "It takes up less horizontal spacing on smaller screens.",
          "It makes survey math easier to compute without division operations."
        ],
        correctIndex: 1,
        explanation: "Odd-numbered scales contain a safe, easy 'Neutral' or '3' middle option. Busy users click 'Neutral' to finish quickly. Even-numbered scales force them to choose whether they lean slight-agree or slight-disagree."
      },
      {
        id: "s4",
        text: "What is the primary driver of survey abandonment?",
        options: [
          "Having high-resolution brand visuals on the survey page.",
          "Using standard dropdown elements instead of simple radio boxes.",
          "Having far too many questions (e.g., over 15 questions taking more than 5 minutes).",
          "Sending the survey links via standardized email services."
        ],
        correctIndex: 2,
        explanation: "Attention spans are short. Every additional question added beyond five decreases your overall completion rate dramatically. Keep surveys to 5 core fact-focused questions that take under 2 minutes."
      },
      {
        id: "s5",
        text: "Which of the following describes a 'Fact-Based' survey question?",
        options: [
          "If we built a premium dark mode, would you rate us 10 out of 10?",
          "How do you feel about the future of cloud computing?",
          "How many hours did you spend manually entering invoices yesterday?",
          "Do you think software should be extremely cheap and simple?"
        ],
        correctIndex: 2,
        explanation: "Asking about yesterday's exact hours investigates direct, concrete behavior. This collects dry, high-accuracy factual metrics instead of flattering opinions."
      },
      {
        id: "s6",
        text: "When is the best time to send a transaction feedback survey to a user?",
        options: [
          "Exactly 3 weeks after they completed the target action.",
          "Immediately after they completed the target action, while their thoughts are completely fresh.",
          "Only when they request customer support help via email.",
          "At midnight on the final day of the financial quarter."
        ],
        correctIndex: 1,
        explanation: "Freshness prevents recall bias. Sending or displaying the survey immediately after a transaction ensures the accuracy of their emotional state and memory."
      },
      {
        id: "s7",
        text: "What is a 'Double-Barreled' question in survey design?",
        options: [
          "A question checking both system security and database speeds.",
          "A question containing two separate topics, but only allowing a single answer (e.g., 'Is our app fast and beautiful?').",
          "A survey backed by two separate redundant servers.",
          "A question that displays two consecutive submit buttons."
        ],
        correctIndex: 1,
        explanation: "Double-barreled questions confuse users. If they think the app is fast but ugly, they don't know how to answer. Split them into two clear, distinct questions instead."
      },
      {
        id: "s8",
        text: "What does 'Sampling Bias' refer to in survey feedback?",
        options: [
          "The color palette of your survey rendering interface.",
          "Only sending surveys to your happiest, most active power users while ignoring inactive or dissatisfied ones.",
          "Accepting survey results from multiple different browser brands.",
          "Allowing automated test accounts to input values."
        ],
        correctIndex: 1,
        explanation: "If you only survey your biggest fans, your results will show artificially high scores that mask real product issues, giving your team false confidence."
      },
      {
        id: "s9",
        text: "Why should you avoid leading adjectives in survey questions (e.g., 'How much do you love our easy-to-use search?')?",
        options: [
          "They trigger severe browser security warnings.",
          "They bias the respondent towards matching your suggested compliment.",
          "They exceed the maximum character limit of database strings.",
          "They prevent search engine crawlers from indexing the page."
        ],
        correctIndex: 1,
        explanation: "Suggestive adjectives lead the participant. Keep your prompts dry, objective, and neutral: 'How would you rate your experience conducting a search today?'"
      },
      {
        id: "s10",
        text: "What is the supreme metric to collect when calculating a Net Promoter Score (NPS)?",
        options: [
          "The percentage of users who clicked our billing page.",
          "How likely a user is to recommend the product to a friend or colleague on a scale of 0 to 10.",
          "The speed of our local server render cycles.",
          "The number of times the logo was clicked."
        ],
        correctIndex: 1,
        explanation: "NPS is a standard industrial benchmark calculated exclusively by asking likelihood to recommend, categorizing respondents into Promoters (9-10), Passives (7-8), and Detractors (0-6)."
      }
    ]
  },
  synthesis: {
    moduleId: "synthesis",
    title: "Problem Synthesis & Affinity Mapping Quiz",
    questions: [
      {
        id: "sn1",
        text: "What is the core objective of 'Affinity Mapping' in product discovery?",
        options: [
          "To secure copyright protection for your visual branding assets.",
          "To map customer database schemas with the best foreign key indices.",
          "To organically group raw user statements, pain points, and behaviors into logical, actionable thematic pillars.",
          "To list direct competitors and categorize them by annual stock prices."
        ],
        correctIndex: 2,
        explanation: "Affinity Mapping takes a wall of messy feedback sticky-notes and groups them. This highlights identical complaints or trends, converting raw noise into structural patterns."
      },
      {
        id: "sn2",
        text: "Which template represents an excellent, focused Customer Problem Statement?",
        options: [
          "We must build an automated mobile application with a secure database quickly.",
          "Busy marketing managers experience stress and lose 4 hours/week formatting manual CSV exports because competitor reporting tools lack customizable templates.",
          "The application has been deployed on port 3000 to serve continuous feedback.",
          "Users would love customized alerts sent to their active inbox hourly."
        ],
        correctIndex: 1,
        explanation: "An elite problem statement specifies: 1. The persona (marketing managers), 2. The pain (stress & 4 hours/week lost), 3. The goal/context (formatting reporting CSVs), and 4. The root friction (competitor tools lack templates)."
      },
      {
        id: "sn3",
        text: "When conducting a root-cause analysis, what is the '5 Whys' technique designed to achieve?",
        options: [
          "To ask 5 different survey participants identical checklist queries.",
          "To drill down past superficial symptoms to discover the fundamental human or technical failure causing a problem.",
          "To delay project delivery times by asking redundant regulatory questions.",
          "To calculate RICE score priorities in five steps."
        ],
        correctIndex: 1,
        explanation: "The '5 Whys' technique, pioneered at Toyota, iteratively digs into answers. For example: Why is the report late? Because CSV exports failed. Why? Because the database was overloaded. Why? Because a bad query ran... This uncovers root causes rather than superficial symptoms."
      },
      {
        id: "sn4",
        text: "What represents a 'Superficial Symptom' as opposed to a 'Root Cause'?",
        options: [
          "A high bounce rate on the signup landing page.",
          "Messy database permissions that crash authentication queries.",
          "An outdated API that fails under heavy load.",
          "A marketing newsletter with broken hyper-links."
        ],
        correctIndex: 0,
        explanation: "Superficial symptoms (like high bounce rates or slow screens) highlight that something is wrong. The Root Cause is the actual underlying mechanics (e.g., confusing copy, heavy database loads) causing that symptom."
      },
      {
        id: "sn5",
        text: "Why is 'builder bias' a major trap during the synthesis phase?",
        options: [
          "It forces the linter to flag innocent TypeScript warnings.",
          "PMs and builders naturally hear and emphasize feedback that supports their pre-conceived solution, actively ignoring data that challenges it.",
          "It increases local browser memory usage on desktop views.",
          "It blocks teams from using remote cloud-hosted SQL databases."
        ],
        correctIndex: 1,
        explanation: "Cognitive bias makes us blind to truth. Builders have a solution they love and subconsciously filter customer quotes to fit their product fantasy. True synthesis is objective."
      },
      {
        id: "sn6",
        text: "What should you do with user feedback that doesn't fit into any of your main thematic groupings on an Affinity Map?",
        options: [
          "Discard it immediately to keep your dashboard clean.",
          "Keep it in a dedicated 'Uncategorized/Outliers' bucket, as single outliers can often flag future unique opportunities or unexpected personas.",
          "Draft a hypothetical survey question to validate it.",
          "Enforce strict formatting to force-fit it into an existing group."
        ],
        correctIndex: 1,
        explanation: "Outliers have value. Do not delete them. Keep them on the side so you can review them as your product grows."
      },
      {
        id: "sn7",
        text: "What does a high density of sticky notes in a single section on your Affinity Map represent?",
        options: [
          "A critical server memory leak.",
          "An area of concentrated pain and focus that represents a high-priority problem to solve.",
          "A poorly designed survey question.",
          "The maximum data storage capacity of that section."
        ],
        correctIndex: 1,
        explanation: "Visual density equals customer frequency. If 40 out of 50 interview quotes complain about slow invoice generation, that section has extreme signal density—telling you what to fix first."
      },
      {
        id: "sn8",
        text: "In the context of Synthesis, what does 'Triangulation' mean?",
        options: [
          "Configuring three server host locations to balance user traffic.",
          "Validating a problem using multiple rich sources of data (e.g., combining user quotes, survey stats, and app analytics).",
          "Creating a competitive matrix with precisely three competitor symbols.",
          "Employing three separate PM leaders on a single product roadmap."
        ],
        correctIndex: 1,
        explanation: "Triangulating data prevents mistakes. If interviews (qualitative), surveys (quantitative), and server logs (analytics) all point to the same problem, you have total confidence to act."
      },
      {
        id: "sn9",
        text: "What is an 'Empathy Map' typically used for?",
        options: [
          "To record server response delays for customer support tickets.",
          "To plot a competitor's pricing tiers.",
          "To visualize what a specific user persona thinks, says, does, and feels during their current workflow.",
          "To test your database schema's security rules."
        ],
        correctIndex: 2,
        explanation: "Empathy Maps help teams step into the customer's shoes, helping engineers and designers align on the emotional frustrations, actions, and thoughts of the end user."
      },
      {
        id: "sn10",
        text: "If a problem statement is formulated as 'Users want a mobile app to manage tasks', why is it a poorly synthesized statement?",
        options: [
          "It describes a pre-conceived solution instead of describing the underlying user pain and friction.",
          "It lacks a detailed technical diagram of the app structure.",
          "It does not contain the name of the database engine.",
          "It mentions mobile devices instead of web browser tabs."
        ],
        correctIndex: 0,
        explanation: "A problem statement must focus purely on the core pain and friction, not jump straight to suggesting a mobile app solution. Focus on what is broken, not what you want to build."
      }
    ]
  },
  prioritization: {
    moduleId: "prioritization",
    title: "Prioritization & ROI Formulas Quiz",
    questions: [
      {
        id: "p1",
        text: "What does the RICE framework letters stand for?",
        options: [
          "Revenue, Interest, Cost, Efficiency",
          "Reach, Impact, Confidence, Effort",
          "Rules, Icons, Color, Execution",
          "Retention, Insights, Cohorts, Estimation"
        ],
        correctIndex: 1,
        explanation: "RICE is the gold-standard prioritization framework pioneered by Intercom. It represents: Reach (how many users), Impact (how much it helps them), Confidence (your evidence level), divided by Effort (person-months of work)."
      },
      {
        id: "p2",
        text: "In RICE math, if two ideas have identical Reach, Impact, and Effort, but Idea A is backed by analytics logs (Confidence = 100%) and Idea B is a gut-feeling guess (Confidence = 50%), how does this affect their scores?",
        options: [
          "Their priority scores remain completely equal.",
          "Idea A will score double the priority score of Idea B.",
          "Idea B will receive a RICE penalty that deletes its entry.",
          "Idea A and Idea B must be merged into a single epic."
        ],
        correctIndex: 1,
        explanation: "Confidence is a multiplier. Higher confidence (backed by factual evidence or tests) increases the priority, while gut feelings discount the score, protecting teams from building on assumptions."
      },
      {
        id: "p3",
        text: "In the MoSCoW prioritization model, what do the letters represent?",
        options: [
          "Modern, Secure, Core, Web",
          "Maintain, Optimize, Support, Code, Write",
          "Must-have, Should-have, Could-have, Won't-have",
          "Metric, Outcome, Strategy, Objective, Workspace"
        ],
        correctIndex: 2,
        explanation: "MoSCoW groups project scope elements into non-negotiable must-haves, auxiliary should-haves, optional nice-to-haves (could), and out-of-scope/delayed elements (won't)."
      },
      {
        id: "p4",
        text: "What is a major danger of doing prioritization solely based on 'HiPPO'?",
        options: [
          "The database will run slow query optimizations.",
          "Decisions are dictated by the 'Highest Paid Person's Opinion' instead of objective customer evidence and data.",
          "It forces developers to build heavy physics servers.",
          "It makes local state variables highly reactive."
        ],
        correctIndex: 1,
        explanation: "HiPPO stands for 'Highest Paid Person's Opinion'. Relying on HiPPO means roadmaps are governed by executive gut feeling or whatever random idea the CEO had over the weekend, rather than user telemetry."
      },
      {
        id: "p5",
        text: "On a 'Value vs. Effort' 2x2 matrix, where should a 'Quick Win' feature reside?",
        options: [
          "High Value, Low Effort quadrant (Top Left)",
          "Low Value, High Effort quadrant (Bottom Right)",
          "High Value, High Effort quadrant (Top Right)",
          "Low Value, Low Effort quadrant (Bottom Left)"
        ],
        correctIndex: 0,
        explanation: "Quick Wins are high value but require very little preparation or effort. These should be prioritized immediately to build instant momentum and customer feedback loops."
      },
      {
        id: "p6",
        text: "What does 'analysis paralysis' mean in prioritization?",
        options: [
          "When compile times exceed 10 minutes on the dev container.",
          "Over-complicating prioritization scores so much that the team spends weeks debating exact values instead of shipping code.",
          "Losing local database cache files after clearing the browser tab.",
          "Writing too many bullet points inside a quiz interface."
        ],
        correctIndex: 1,
        explanation: "Prioritization frameworks are rough directional guides, not absolute scientific laws. Don't waste weeks arguing if confidence is 75% or 80%. Pick a direction, ship, and iterate."
      },
      {
        id: "p7",
        text: "Why is 'Effort' typically placed in the denominator of prioritization formulas?",
        options: [
          "To ensure that highly complex, resource-heavy features receive a mathematical discount.",
          "To prevent engineering teams from commenting on the roadmap.",
          "Effort has no impact on prioritisation scores.",
          "To match standard global financial reporting templates."
        ],
        correctIndex: 0,
        explanation: "Placing effort as the denominator calculates Return on Investment (ROI). Features with high value but high effort get scaled down, making sure teams build simple, high-impact indicators first."
      },
      {
        id: "p8",
        text: "If a feature has an extremely high Reach and Impact, but your technical Confidence is rated at 10% (pure guess), what should you do?",
        options: [
          "Code and deploy the feature immediately to see what happens.",
          "Run a quick discovery spike, interview, or user test to boost your confidence score before committing weeks of development work.",
          "Trash the idea permanently as confidence is too low.",
          "Ask your HiPPO to make the executive call."
        ],
        correctIndex: 1,
        explanation: "Low confidence doesn't mean it's a bad idea—it means it is an untested idea. Prioritize a cheap discovery experiment (like interviews or a mockup) to raise your confidence before writing engine code."
      },
      {
        id: "p9",
        text: "What does a RICE score of 120 compare to a score of 40?",
        options: [
          "A directional guide suggesting the feature scoring 120 likely represents a superior return on effort.",
          "The exact number of signups the feature will generate in its first week.",
          "The line height of the active CSS rendering tags.",
          "The estimated hours needed to code the API server."
        ],
        correctIndex: 0,
        explanation: "RICE scores provide relative alignment. A feature scoring 120 holds roughly triple the ROI efficiency of one scoring 40, helping the team sequence their release cycles."
      },
      {
        id: "p10",
        text: "What is an 'Opportunity Scoring' survey used for?",
        options: [
          "To evaluate direct stock valuation indices.",
          "To ask customers to rank features based on Importance versus how Satisfied they currently are with existing workarounds.",
          "To test developer competencies in React and TypeScript.",
          "To collect standard email signups for product launch events."
        ],
        correctIndex: 1,
        explanation: "Opportunity landmines reside where customers say a feature category is highly important, but their current satisfaction is extremely low. This highlights an open opportunity for your startup to solve."
      }
    ]
  }
};
