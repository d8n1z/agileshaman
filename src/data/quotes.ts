// Refreshed satirical quotes for the entire software project ecosystem
// Includes sharpened punchlines and expanded variety
// Safe attributions with persona-style tags

export interface QuoteWithAttribution {
  quote: string;
  attribution: string;
  category?: string;
}

export const PROJECT_QUOTES: QuoteWithAttribution[] = [
  { quote: "We'll fix it in the next sprint.", attribution: "Narrator: 'They did not fix it in the next sprint'", category: "developers" },
  { quote: "It works on my machine.", attribution: "Narrator: 'Ship it, then fix it'", category: "developers" },
  { quote: "This is a temporary solution.", attribution: "Time: 'Five years later, still temporary'", category: "developers" },
  { quote: "It's probably a caching issue.", attribution: "Narrator: 'Ship it, then fix it'", category: "developers" },
  { quote: "Let's just copy-paste from Stack Overflow.", attribution: "Narrator: 'Originality left'", category: "developers" },
  { quote: "Let's pivot to blockchain.", attribution: "PM: 'Add it to the backlog'", category: "product_managers" },
  { quote: "We need this yesterday.", attribution: "PM: 'Add it to the backlog'", category: "product_managers" },
  { quote: "Just make it like Uber, but for cats.", attribution: "PM: 'Add it to the backlog'", category: "product_managers" },
  { quote: "This will only take 2 story points.", attribution: "PM: 'Add it to the backlog'", category: "product_managers" },
  { quote: "Can you move it 2 pixels to the left?", attribution: "Designer: 'Let's nudge it 2px'", category: "designers" },
  { quote: "The font needs more personality.", attribution: "Designer: 'Let's nudge it 2px'", category: "designers" },
  { quote: "This button doesn't spark joy.", attribution: "Designer: 'Let's nudge it 2px'", category: "designers" },
  { quote: "Let's make the logo bigger.", attribution: "Designer: 'Let's nudge it 2px'", category: "designers" },
  { quote: "Users love infinite scroll.", attribution: "Designer: 'Let's nudge it 2px'", category: "designers" },
  { quote: "Have you tried clearing your cache?", attribution: "IT Support: 'Greatest hits'", category: "qa_testers" },
  { quote: "This is expected behavior.", attribution: "UX: 'Experience left'", category: "qa_testers" },
  { quote: "Can you make it more Web 2.0?", attribution: "Client: 'Can you make it viral?'", category: "stakeholders" },
  { quote: "My nephew could build this for free.", attribution: "Narrator: 'Every freelancer\\'s nightmare'", category: "stakeholders" },
  { quote: "Why does it take so long?", attribution: "Client: 'Can you make it viral?'", category: "stakeholders" },
  { quote: "Can we add a chatbot?", attribution: "Client: 'Can you make it viral?'", category: "stakeholders" },
  { quote: "Make it viral.", attribution: "Client: 'Can you make it viral?'", category: "stakeholders" },
  { quote: "We need more synergy.", attribution: "Buzzword Bingo", category: "management" },
  { quote: "Let's circle back on this.", attribution: "Buzzword Bingo", category: "management" },
  { quote: "Can we leverage our core competencies?", attribution: "Buzzword Bingo", category: "management" },
  { quote: "We're disrupting the industry.", attribution: "Buzzword Bingo", category: "management" },
  { quote: "Think outside the box.", attribution: "Buzzword Bingo", category: "management" },
  { quote: "We need more meetings to discuss this.", attribution: "Buzzword Bingo", category: "management" },
  { quote: "The client wants everything.", attribution: "Sales: 'Totally small change'", category: "sales" },
  { quote: "It's just a small customization.", attribution: "Sales: 'Totally small' — Dev: 'Three sprints later…'", category: "sales" },
  { quote: "They'll pay extra for rush delivery.", attribution: "Sales: 'Totally small change'", category: "sales" },
  { quote: "The demo worked perfectly.", attribution: "In a controlled environment", category: "sales" },
  { quote: "Have you tried turning it off and on?", attribution: "On-Call: 'Pager just buzzed'", category: "devops_it" },
  { quote: "It's probably a network issue.", attribution: "On-Call: 'Pager just buzzed'", category: "devops_it" },
  { quote: "The server is at 99% capacity.", attribution: "Infra: 'That 1% is carrying us'", category: "devops_it" },
  { quote: "We're out of disk space again.", attribution: "On-Call: 'Pager just buzzed'", category: "devops_it" },
  { quote: "The backup failed, but it's fine.", attribution: "Narrator: 'Famous last words'", category: "devops_it" },
  { quote: "We need more buzzwords.", attribution: "Marketing: 'Synergy achieved'", category: "marketing" },
  { quote: "Can we make it go viral?", attribution: "Marketing: 'Virality on demand'", category: "marketing" },
  { quote: "This will revolutionize everything.", attribution: "Marketing: 'Synergy achieved'", category: "marketing" },
  { quote: "We're the Airbnb of software.", attribution: "Marketing: 'Synergy achieved'", category: "marketing" },
  { quote: "Growth hacking is the answer.", attribution: "Marketing: 'Synergy achieved'", category: "marketing" },
  { quote: "It's just a small CSS change.", attribution: "Narrator: 'Ship it, then fix it'", category: "developers" },
  { quote: "Let's have a quick sync about this.", attribution: "Time: '2 hours and 7 people later'", category: "management" },
  { quote: "We don't have time to do it right.", attribution: "Narrator: 'But time to do it twice'", category: "management" },
  { quote: "We're being agile and adaptive.", attribution: "Narrator: 'We have no plan'", category: "management" },
  { quote: "We can definitely finish this sprint.", attribution: "PM: 'Add it to the backlog'", category: "product_managers" },
  { quote: "No blockers, everything's fine.", attribution: "Narrator: 'Everything was not fine'", category: "product_managers" },
  { quote: "The client will never use that feature.", attribution: "Client: 'Uses it immediately'", category: "product_managers" },
  { quote: "We don't need a staging environment.", attribution: "Production is the staging environment", category: "devops_it" },
  { quote: "It's not a bug, it's a feature.", attribution: "Marketing: 'Synergy achieved'", category: "marketing" },
  { quote: "Our velocity is increasing!", attribution: "Quality: 'Exiting the building'", category: "product_managers" },
  { quote: "Let's estimate this in story points.", attribution: "Narrator: 'Sprint 5: still in progress'", category: "product_managers" },
  { quote: "The retrospective will fix everything.", attribution: "Narrator: 'Same issues, different sprint'", category: "management" },
  { quote: "This epic is too big.", attribution: "PM: 'Split into 47 user stories'", category: "product_managers" },
  { quote: "The burndown chart looks great!", attribution: "Time: 'Vertical line to zero'", category: "product_managers" },
  { quote: "We're self-organizing.", attribution: "Chaos Theory: 'In practice'", category: "developers" },
  { quote: "We need more collaboration.", attribution: "Zoom: 'Fatigue entered'", category: "management" },
  { quote: "The backlog is prioritized.", attribution: "Everything: 'P0'", category: "product_managers" },
  { quote: "The team is fully committed.", attribution: "Energy: 'Running low'", category: "management" },
  { quote: "We need to improve our ceremonies.", attribution: "Meetings: 'Add more meetings'", category: "management" },
  { quote: "We're disrupting the paradigm with AI-driven blockchain solutions.", attribution: "Buzzword Bingo: 'Grand slam'", category: "corporate_buzzwords" },
  { quote: "Our platform leverages machine learning to optimize synergies.", attribution: "Translation: 'We added an if-statement'", category: "corporate_buzzwords" },
  { quote: "We're building the Uber of everything.", attribution: "Narrator: 'Originality left'", category: "corporate_buzzwords" },
  { quote: "This will scale to millions of users.", attribution: "Users now: '3 (including you)'", category: "corporate_buzzwords" },
  { quote: "We're pivoting to a growth-hacking mindset.", attribution: "Translation: 'We\\'re desperate'", category: "corporate_buzzwords" },
  { quote: "Our agile transformation is complete.", attribution: "Waterfall: 'With daily standups'", category: "agile_theater" },
  { quote: "We're doing DevOps now.", attribution: "Operations: 'Renamed to DevOps'", category: "agile_theater" },
  { quote: "We embrace failure as learning opportunities.", attribution: "Failure: 'Maybe less embracing'", category: "agile_theater" },
  { quote: "Our culture is built on psychological safety.", attribution: "Narrator: 'Everyone muted on Zoom'", category: "agile_theater" },
  { quote: "We're customer-obsessed.", attribution: "Support: 'Which customers?'", category: "corporate_buzzwords" },
  { quote: "Data drives all our decisions.", attribution: "HiPPO: 'Except when I disagree'", category: "corporate_buzzwords" },
  { quote: "We're building a minimum viable product.", attribution: "Minimum: '✓'  Viable: 'We\\'ll see'", category: "agile_theater" },
  { quote: "Our team is fully autonomous.", attribution: "Calendars: 'Full of approvals'", category: "agile_theater" },
  { quote: "We're implementing continuous delivery.", attribution: "Continuous: 'Once a quarter'", category: "agile_theater" },
  { quote: "Innovation is in our DNA.", attribution: "Last innovation: 'Switching chat apps'", category: "corporate_buzzwords" },
  { quote: "We're democratizing access to technology.", attribution: "Terms: 'Apply'", category: "corporate_buzzwords" },
  { quote: "Our agile coaches will transform the organization.", attribution: "Coaches: 'We need more coaches'", category: "agile_theater" },
  { quote: "We're building a learning organization.", attribution: "Learning: 'Same mistakes, different sprint'", category: "agile_theater" },
  { quote: "We're shifting left on quality.", attribution: "Narrator: 'Sure, what could go wrong?'", category: "agile_theater" },
  { quote: "Our platform is cloud-native.", attribution: "Cloud: 'Lifted and shifted'", category: "corporate_buzzwords" },
  { quote: "We're doing trunk-based development.", attribution: "Trunk: '47 feature branches'", category: "agile_theater" },
  { quote: "We measure success with OKRs.", attribution: "Objectives: 'Vague' — Key Results: 'TBD'", category: "corporate_buzzwords" },
  { quote: "Our architecture is microservices-first.", attribution: "Narrator: 'Sure, what could go wrong?'", category: "corporate_buzzwords" },
  { quote: "We're practicing continuous improvement.", attribution: "Retro: 'Same action items for 6 months'", category: "agile_theater" },
  { quote: "We have a fail-fast mentality.", attribution: "Narrator: 'Failing fast at failing fast'", category: "agile_theater" },
  { quote: "Our API-first approach enables innovation.", attribution: "API: 'Returns hardcoded JSON'", category: "corporate_buzzwords" },
  { quote: "We're building for scale from day one.", attribution: "Day 1000: 'Still not scalable'", category: "corporate_buzzwords" },
  { quote: "We embrace the servant leadership model.", attribution: "Servant: 'Mostly taking notes'", category: "agile_theater" },
  { quote: "Our ceremonies are value-driven.", attribution: "Value: 'Hiding in the parking lot'", category: "agile_theater" },
  { quote: "We're implementing shift-left security.", attribution: "Security: 'Still on the right, sigh'", category: "agile_theater" },
  { quote: "Dark mode fixes everything.", attribution: "Designer: 'Ship it in midnight black'", category: "designers" },
  { quote: "Works locally, fails in CI.", attribution: "QA: 'Repro steps appreciated'", category: "qa_testers" },
  { quote: "Can we A/B test the roadmap?", attribution: "PM: 'A for Ambition, B for Budget'", category: "product_managers" },
  { quote: "We’ll write docs after v1.", attribution: "Future Team: 'Please write them now'", category: "developers" },
  { quote: "Rollback is our disaster recovery plan.", attribution: "On-Call: 'Ready the big red button'", category: "devops_it" },
  { quote: "We’ll migrate when things calm down.", attribution: "Narrator: 'Things never calmed down'", category: "management" },
  { quote: "Let’s schedule a quick workshop.", attribution: "Time: 'Two days, twelve Miro boards'", category: "management" },
  { quote: "Can we gamify engagement?", attribution: "Marketing: 'Achievement unlocked: sign‑ups'", category: "marketing" },
  { quote: "We pre-sold the enterprise tier.", attribution: "Sales: 'Engineering will love this'", category: "sales" },
  { quote: "Stakeholders want a dashboard of dashboards.", attribution: "Client: 'More charts, fewer answers'", category: "stakeholders" },
];

// Extract just the quote text for simple displays (like landing page floating quotes)
export const BACKGROUND_QUOTES: string[] = PROJECT_QUOTES.map(q => q.quote);

// Get quotes by category
export const getQuotesByCategory = (category: string): QuoteWithAttribution[] => {
  return PROJECT_QUOTES.filter(q => q.category === category);
};

// Get all available categories
export const getQuoteCategories = (): string[] => {
  const categories = new Set(PROJECT_QUOTES.map(q => q.category).filter((category): category is string => category !== undefined));
  return Array.from(categories).sort();
};
