// Shared satirical quotes for the entire software project ecosystem
// Used in both landing page floating quotes and in-game rotating quotes

export interface QuoteWithAttribution {
  quote: string;
  attribution: string;
  category?: string;
}

// Comprehensive collection of project quotes from various stakeholders
export const PROJECT_QUOTES: QuoteWithAttribution[] = [
  // Developers
  {
    quote: "We'll fix it in the next sprint.",
    attribution: "Famous last words",
    category: "Developers"
  },
  {
    quote: "It works on my machine.",
    attribution: "The developer's eternal defense",
    category: "Developers"
  },
  {
    quote: "Just a quick hotfix.",
    attribution: "Production: \"Hold my beer\"",
    category: "Developers"
  },
  {
    quote: "The code is self-documenting.",
    attribution: "Future developer: \"What does this do?\"",
    category: "Developers"
  },
  {
    quote: "We'll refactor it later.",
    attribution: "Technical debt: \"Later is now\"",
    category: "Developers"
  },
  {
    quote: "This is a temporary solution.",
    attribution: "5 years later: Still temporary",
    category: "Developers"
  },
  {
    quote: "It's probably a caching issue.",
    attribution: "The universal developer excuse",
    category: "Developers"
  },
  {
    quote: "Let's just copy-paste from Stack Overflow.",
    attribution: "Original thinking has left the chat",
    category: "Developers"
  },

  // Product Managers
  {
    quote: "Can we make it pop more?",
    attribution: "Designer: \"What does that even mean?\"",
    category: "Product Managers"
  },
  {
    quote: "This should be a simple change.",
    attribution: "Developer: \"Famous last words\"",
    category: "Product Managers"
  },
  {
    quote: "Let's pivot to blockchain.",
    attribution: "Buzzword bingo champion",
    category: "Product Managers"
  },
  {
    quote: "We need this yesterday.",
    attribution: "Time travel not included in sprint",
    category: "Product Managers"
  },
  {
    quote: "Just make it like Uber, but for cats.",
    attribution: "Innovation at its finest",
    category: "Product Managers"
  },
  {
    quote: "This will only take 2 story points.",
    attribution: "Narrator: It took 3 sprints",
    category: "Product Managers"
  },

  // Designers
  {
    quote: "Can you move it 2 pixels to the left?",
    attribution: "Pixel-perfect perfectionism",
    category: "Designers"
  },
  {
    quote: "The font needs more personality.",
    attribution: "Comic Sans has entered the chat",
    category: "Designers"
  },
  {
    quote: "This button doesn't spark joy.",
    attribution: "Marie Kondo meets UI design",
    category: "Designers"
  },
  {
    quote: "Let's make the logo bigger.",
    attribution: "Client feedback classic",
    category: "Designers"
  },
  {
    quote: "Users love infinite scroll.",
    attribution: "Productivity has left the chat",
    category: "Designers"
  },

  // QA/Testers
  {
    quote: "It works as designed.",
    attribution: "Design: \"That's not what I meant\"",
    category: "QA/Testers"
  },
  {
    quote: "I can't reproduce this bug.",
    attribution: "User: \"It happens every time\"",
    category: "QA/Testers"
  },
  {
    quote: "Have you tried clearing your cache?",
    attribution: "IT support's greatest hits",
    category: "QA/Testers"
  },
  {
    quote: "This is expected behavior.",
    attribution: "User experience has left the chat",
    category: "QA/Testers"
  },
  {
    quote: "Works fine in our test environment.",
    attribution: "Production: \"Hold my beer\"",
    category: "QA/Testers"
  },
  {
    quote: "The QA team will catch it.",
    attribution: "QA: \"We're not magicians\"",
    category: "QA/Testers"
  },

  // Clients/Stakeholders
  {
    quote: "Can you make it more Web 2.0?",
    attribution: "Time traveler from 2005",
    category: "Clients/Stakeholders"
  },
  {
    quote: "My nephew could build this for free.",
    attribution: "Every freelancer's nightmare",
    category: "Clients/Stakeholders"
  },
  {
    quote: "Why does it take so long?",
    attribution: "Software development mysteries",
    category: "Clients/Stakeholders"
  },
  {
    quote: "Can we add a chatbot?",
    attribution: "AI will solve everything",
    category: "Clients/Stakeholders"
  },
  {
    quote: "Make it viral.",
    attribution: "Marketing magic requested",
    category: "Clients/Stakeholders"
  },
  {
    quote: "The client changed their mind again.",
    attribution: "Requirements: \"Stability is overrated\"",
    category: "Clients/Stakeholders"
  },

  // Management
  {
    quote: "We need more synergy.",
    attribution: "Corporate buzzword bingo",
    category: "Management"
  },
  {
    quote: "Let's circle back on this.",
    attribution: "Translation: Never",
    category: "Management"
  },
  {
    quote: "Can we leverage our core competencies?",
    attribution: "Consultant speak activated",
    category: "Management"
  },
  {
    quote: "We're disrupting the industry.",
    attribution: "Startup pitch bingo",
    category: "Management"
  },
  {
    quote: "Think outside the box.",
    attribution: "Innovation on demand",
    category: "Management"
  },
  {
    quote: "We need more meetings to discuss this.",
    attribution: "Productivity has left the chat",
    category: "Management"
  },

  // Sales
  {
    quote: "The client wants everything.",
    attribution: "Scope creep has entered the chat",
    category: "Sales"
  },
  {
    quote: "We already sold this feature.",
    attribution: "Development: \"News to us\"",
    category: "Sales"
  },
  {
    quote: "It's just a small customization.",
    attribution: "Famous last words",
    category: "Sales"
  },
  {
    quote: "They'll pay extra for rush delivery.",
    attribution: "Quality has left the chat",
    category: "Sales"
  },
  {
    quote: "The demo worked perfectly.",
    attribution: "In a controlled environment",
    category: "Sales"
  },

  // DevOps/IT
  {
    quote: "Have you tried turning it off and on?",
    attribution: "IT support's greatest hits",
    category: "DevOps/IT"
  },
  {
    quote: "It's probably a network issue.",
    attribution: "When in doubt, blame the network",
    category: "DevOps/IT"
  },
  {
    quote: "The server is at 99% capacity.",
    attribution: "That 1% is doing heavy lifting",
    category: "DevOps/IT"
  },
  {
    quote: "We're out of disk space again.",
    attribution: "Data grows faster than storage",
    category: "DevOps/IT"
  },
  {
    quote: "The backup failed, but it's fine.",
    attribution: "Famous last words",
    category: "DevOps/IT"
  },
  {
    quote: "The staging environment is down again.",
    attribution: "Production: \"I'm your staging now\"",
    category: "DevOps/IT"
  },

  // Marketing
  {
    quote: "We need more buzzwords.",
    attribution: "Synergistic paradigm shifts",
    category: "Marketing"
  },
  {
    quote: "Can we make it go viral?",
    attribution: "Virality on demand",
    category: "Marketing"
  },
  {
    quote: "This will revolutionize everything.",
    attribution: "Revolution as a service",
    category: "Marketing"
  },
  {
    quote: "We're the Airbnb of software.",
    attribution: "Startup pitch bingo",
    category: "Marketing"
  },
  {
    quote: "Growth hacking is the answer.",
    attribution: "Hack all the things",
    category: "Marketing"
  },

  // Additional classics from the original GameBoard
  {
    quote: "It's just a small CSS change.",
    attribution: "Before the 6-hour debugging session",
    category: "Developers"
  },
  {
    quote: "Let's have a quick sync about this.",
    attribution: "2 hours and 7 people later",
    category: "Management"
  },
  {
    quote: "We don't have time to do it right.",
    attribution: "But we'll have time to do it twice",
    category: "Management"
  },
  {
    quote: "We're being agile and adaptive.",
    attribution: "Translation: We have no plan",
    category: "Management"
  },
  {
    quote: "We can definitely finish this sprint.",
    attribution: "Scope creep has entered the chat",
    category: "Product Managers"
  },
  {
    quote: "We'll clean this up later.",
    attribution: "Legacy code: \"Am I a joke to you?\"",
    category: "Developers"
  },
  {
    quote: "No blockers, everything's fine.",
    attribution: "Narrator: Everything was not fine",
    category: "Product Managers"
  },
  {
    quote: "We'll add tests after the deadline.",
    attribution: "QA team: \"Am I invisible?\"",
    category: "Developers"
  },
  {
    quote: "Let's move fast and break things.",
    attribution: "Production: \"Mission accomplished\"",
    category: "Management"
  },
  {
    quote: "The client will never use that feature.",
    attribution: "Client: Uses it immediately",
    category: "Product Managers"
  },
  {
    quote: "We're following best practices.",
    attribution: "Stack Overflow: \"Hold my upvotes\"",
    category: "Developers"
  },
  {
    quote: "This bug only happens in edge cases.",
    attribution: "Users: \"We are the edge case\"",
    category: "QA/Testers"
  },
  {
    quote: "We don't need a staging environment.",
    attribution: "Production IS the staging environment",
    category: "DevOps/IT"
  },
  {
    quote: "The database can handle the load.",
    attribution: "Database: \"I'm about to end this man's career\"",
    category: "DevOps/IT"
  },
  {
    quote: "We'll optimize it later.",
    attribution: "Performance: \"Later never comes\"",
    category: "Developers"
  },
  {
    quote: "It's not a bug, it's a feature.",
    attribution: "Marketing's favorite developer excuse",
    category: "Marketing"
  },
  {
    quote: "We need to be more data-driven.",
    attribution: "Data: \"You're ignoring me anyway\"",
    category: "Management"
  },
  {
    quote: "Let's use the latest framework.",
    attribution: "Legacy code: \"Here we go again\"",
    category: "Developers"
  },
  {
    quote: "The user story is clear enough.",
    attribution: "Developer: \"What does 'user-friendly' mean?\"",
    category: "Product Managers"
  },

  // More Agile/Scrum Satirical Classics
  {
    quote: "We're doing Scrum, but without the ceremonies.",
    attribution: "Agile: \"Am I a joke to you?\"",
    category: "Management"
  },
  {
    quote: "Our velocity is increasing!",
    attribution: "Quality has left the chat",
    category: "Product Managers"
  },
  {
    quote: "Let's estimate this in story points.",
    attribution: "Fibonacci sequence has entered the chat",
    category: "Product Managers"
  },
  {
    quote: "We need more standups.",
    attribution: "Productivity: \"I'm standing down\"",
    category: "Management"
  },
  {
    quote: "The retrospective will fix everything.",
    attribution: "Same issues, different sprint",
    category: "Management"
  },
  {
    quote: "We're failing fast and learning.",
    attribution: "Customers: \"Please stop learning on us\"",
    category: "Management"
  },
  {
    quote: "This epic is too big.",
    attribution: "Breaking it into 47 user stories",
    category: "Product Managers"
  },
  {
    quote: "We need to be more cross-functional.",
    attribution: "Everyone: \"I don't know how to do that\"",
    category: "Management"
  },
  {
    quote: "The sprint goal is flexible.",
    attribution: "Goal: \"I'm more like a suggestion\"",
    category: "Product Managers"
  },
  {
    quote: "We're embracing change.",
    attribution: "Requirements: \"Hold my beer\"",
    category: "Management"
  },
  {
    quote: "The burndown chart looks great!",
    attribution: "Last day: Vertical line to zero",
    category: "Product Managers"
  },
  {
    quote: "We don't need documentation, we're agile.",
    attribution: "Future team: \"What does this do?\"",
    category: "Developers"
  },
  {
    quote: "The product owner will clarify that.",
    attribution: "Product owner: \"I'm in another meeting\"",
    category: "Product Managers"
  },
  {
    quote: "We're self-organizing.",
    attribution: "Chaos theory in practice",
    category: "Developers"
  },
  {
    quote: "The definition of done is done.",
    attribution: "QA: \"Define 'done'\"",
    category: "QA/Testers"
  },
  {
    quote: "We need more collaboration.",
    attribution: "Zoom fatigue has entered the chat",
    category: "Management"
  },
  {
    quote: "The backlog is prioritized.",
    attribution: "Everything is P0",
    category: "Product Managers"
  },
  {
    quote: "We're delivering value every sprint.",
    attribution: "Value: \"Citation needed\"",
    category: "Management"
  },
  {
    quote: "The team is fully committed.",
    attribution: "Burnout has entered the chat",
    category: "Management"
  },
  {
    quote: "We need to improve our ceremonies.",
    attribution: "Adding more meetings to fix meetings",
    category: "Management"
  },

  // Corporate Buzzwords & Agile Theater
  {
    quote: "We're disrupting the paradigm with AI-driven blockchain solutions.",
    attribution: "Buzzword bingo grand slam",
    category: "Corporate Buzzwords"
  },
  {
    quote: "Our platform leverages machine learning to optimize synergies.",
    attribution: "Translation: We added an if-statement",
    category: "Corporate Buzzwords"
  },
  {
    quote: "We're building the Uber of everything.",
    attribution: "Originality has left the chat",
    category: "Corporate Buzzwords"
  },
  {
    quote: "This will scale to millions of users.",
    attribution: "Current users: 3 (including yourself)",
    category: "Corporate Buzzwords"
  },
  {
    quote: "We're pivoting to a growth-hacking mindset.",
    attribution: "Translation: We're desperate",
    category: "Corporate Buzzwords"
  },
  {
    quote: "Our agile transformation is complete.",
    attribution: "Still using waterfall with daily standups",
    category: "Agile Theater"
  },
  {
    quote: "We're doing DevOps now.",
    attribution: "Renamed 'Operations' to 'DevOps'",
    category: "Agile Theater"
  },
  {
    quote: "We embrace failure as learning opportunities.",
    attribution: "Failure: 'I'm not learning, I'm just failing'",
    category: "Agile Theater"
  },
  {
    quote: "Our culture is built on psychological safety.",
    attribution: "Last person who spoke up was fired",
    category: "Agile Theater"
  },
  {
    quote: "We're customer-obsessed.",
    attribution: "Customer support: 'What customers?'",
    category: "Corporate Buzzwords"
  },
  {
    quote: "Data drives all our decisions.",
    attribution: "Except when it disagrees with the CEO",
    category: "Corporate Buzzwords"
  },
  {
    quote: "We're building a minimum viable product.",
    attribution: "Minimum: ✓ Viable: Citation needed",
    category: "Agile Theater"
  },
  {
    quote: "Our team is fully autonomous.",
    attribution: "Micromanagement has entered the chat",
    category: "Agile Theater"
  },
  {
    quote: "We're implementing continuous delivery.",
    attribution: "Continuous: Once a quarter",
    category: "Agile Theater"
  },
  {
    quote: "Innovation is in our DNA.",
    attribution: "Last innovation: Switching to Slack",
    category: "Corporate Buzzwords"
  },
  {
    quote: "We're democratizing access to technology.",
    attribution: "For people who can afford our premium tier",
    category: "Corporate Buzzwords"
  },
  {
    quote: "Our agile coaches will transform the organization.",
    attribution: "Coaches: 'We need more coaches'",
    category: "Agile Theater"
  },
  {
    quote: "We're building a learning organization.",
    attribution: "Learning: 'Same mistakes, different sprint'",
    category: "Agile Theater"
  },
  {
    quote: "We're shifting left on quality.",
    attribution: "Quality: 'I'm still on the right'",
    category: "Agile Theater"
  },
  {
    quote: "Our platform is cloud-native.",
    attribution: "Lifted and shifted to AWS",
    category: "Corporate Buzzwords"
  },
  {
    quote: "We're doing trunk-based development.",
    attribution: "Trunk: 'I have 47 feature branches'",
    category: "Agile Theater"
  },
  {
    quote: "We measure success with OKRs.",
    attribution: "Objectives: Vague, Key Results: Missing",
    category: "Corporate Buzzwords"
  },
  {
    quote: "Our architecture is microservices-first.",
    attribution: "Microservice: One giant monolith",
    category: "Corporate Buzzwords"
  },
  {
    quote: "We're practicing continuous improvement.",
    attribution: "Same retrospective action items for 6 months",
    category: "Agile Theater"
  },
  {
    quote: "We have a fail-fast mentality.",
    attribution: "Failing fast at failing fast",
    category: "Agile Theater"
  },
  {
    quote: "Our API-first approach enables innovation.",
    attribution: "API: 'I return hardcoded JSON'",
    category: "Corporate Buzzwords"
  },
  {
    quote: "We're building for scale from day one.",
    attribution: "Day 1000: Still not scalable",
    category: "Corporate Buzzwords"
  },
  {
    quote: "We embrace the servant leadership model.",
    attribution: "Servant: 'I'm more like a dictator'",
    category: "Agile Theater"
  },
  {
    quote: "Our ceremonies are value-driven.",
    attribution: "Value: 'I'm hiding in the parking lot'",
    category: "Agile Theater"
  },
  {
    quote: "We're implementing shift-left security.",
    attribution: "Security: 'I'm still on the right, crying'",
    category: "Agile Theater"
  }
];

// Extract just the quote text for simple displays (like landing page floating quotes)
export const BACKGROUND_QUOTES: string[] = PROJECT_QUOTES.map(q => q.quote);

// Get quotes by category
export const getQuotesByCategory = (category: string): QuoteWithAttribution[] => {
  return PROJECT_QUOTES.filter(q => q.category === category);
};

// Get all available categories
export const getQuoteCategories = (): string[] => {
  const categories = new Set(PROJECT_QUOTES.map(q => q.category).filter(Boolean));
  return Array.from(categories).sort();
};
