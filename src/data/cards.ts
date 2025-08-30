import type { Card } from '../types/game';

export const MYSTICAL_DECK: Card[] = [
  // Common Cards - Basic agile challenges
  {
    id: 'friday-deploy',
    title: 'The Cursed Friday Deploy',
    scenario: 'The Product Oracle demands a release when the sun sets on the week. The spirits of chaos stir...',
    icon: '🌅',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'approve',
        label: 'Channel the Deploy Energy',
        description: 'Embrace the chaos and push forward',
        effects: { velocity: +12, morale: -18, techDebt: +8 },
        ritual: {
          chance: 0.2,
          onFailure: { happiness: -25, morale: -15, techDebt: +20 },
          failureMessage: 'The production spirits revolt! Alerts pierce the digital realm like banshee wails.'
        }
      },
      {
        id: 'refuse',
        label: 'Protect the Sacred Weekend',
        description: 'Stand firm against the darkness',
        effects: { happiness: -12, morale: +15 },
        icon: '🛡️'
      },
      {
        id: 'intern-ritual',
        label: 'Initiate the Intern Ritual',
        description: 'Let the apprentice prove their worth',
        effects: { velocity: +5 },
        ritual: {
          chance: 0.5,
          onSuccess: { velocity: +15, happiness: +8, morale: +5 },
          successMessage: 'The young one channels pure code energy! Legends speak of this day.',
          onFailure: { morale: -20, techDebt: +15 },
          failureMessage: 'The apprentice falters. The dashboard now displays cryptic runes of error.'
        }
      }
    ]
  },

  {
    id: 'ai-pivot',
    title: 'The AI Prophecy',
    scenario: 'The CEO has received visions of artificial intelligence. All must be transformed in its image.',
    icon: '🤖',
    rarity: 'common', 
    theme: 'mystical',
    choices: [
      {
        id: 'embrace-ai',
        label: 'Embrace the Silicon Oracle',
        effects: { happiness: +18, morale: -18, techDebt: +12 }
      },
      {
        id: 'resist-change',
        label: 'Preserve Ancient Ways',
        effects: { happiness: -15, morale: +12 }
      },
      {
        id: 'illusion-magic',
        label: 'Weave Illusion Magic',
        description: 'Make it appear intelligent without true understanding',
        effects: { velocity: +15, techDebt: +25 },
        icon: '✨'
      }
    ]
  },

  {
    id: 'refactor-temptation',
    title: 'The Siren Call of Refactoring',
    scenario: 'The payment shrine resembles cursed spaghetti. The dev spirits beg for purification.',
    icon: '🍝',
    rarity: 'common',
    theme: 'wisdom',
    choices: [
      {
        id: 'purify-code',
        label: 'Perform the Great Purification',
        effects: { velocity: -18, morale: +20, techDebt: -15 }
      },
      {
        id: 'delay-ritual',
        label: 'Delay the Sacred Cleansing',
        effects: { velocity: +12, morale: -12, techDebt: +18 }
      },
      {
        id: 'summon-consultant',
        label: 'Summon External Shaman',
        effects: { happiness: -12, morale: +8, velocity: -5 }
      }
    ]
  },

  {
    id: 'standup-overflow',
    title: 'The Endless Standup Ritual',
    scenario: 'The daily alignment ceremony has evolved into a two-hour soul-sharing session.',
    icon: '🕐',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'allow-catharsis',
        label: 'Allow the Emotional Purge',
        effects: { morale: +18, velocity: -12 }
      },
      {
        id: 'enforce-discipline',
        label: 'Restore Sacred Order',
        effects: { velocity: +12, morale: -8 }
      },
      {
        id: 'astral-projection',
        label: 'Practice Astral Projection',
        description: 'Be present in body, absent in spirit',
        effects: {},
        icon: '👻'
      }
    ]
  },

  // Rare Cards - More impactful scenarios
  {
    id: 'legacy-awakening',
    title: 'Awakening of the Legacy Beast',
    scenario: 'The ancient codebase stirs, spawning 47 bugs from the depths of deprecated functions.',
    icon: '🐲',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'quick-patches',
        label: 'Apply Hasty Binding Spells',
        effects: { velocity: +20, techDebt: +30 }
      },
      {
        id: 'full-exorcism',
        label: 'Perform Complete Exorcism',
        effects: { velocity: -25, morale: +20, techDebt: -20 }
      },
      {
        id: 'appease-beast',
        label: 'Offer Tribute to the Beast',
        description: 'Hope it returns to slumber',
        effects: {},
        ritual: {
          chance: 0.4,
          onSuccess: { morale: +10 },
          successMessage: 'The beast accepts your offering and retreats.',
          onFailure: { happiness: -30, techDebt: +15 },
          failureMessage: 'The beast grows stronger! Chaos spreads through all systems!'
        }
      }
    ]
  },

  {
    id: 'infinite-backlog',
    title: 'The Infinite Scroll of Tasks',
    scenario: 'The Product Oracle has channeled 200 new requirements from the ethereal plane.',
    icon: '📜',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'accept-burden',
        label: 'Accept the Sacred Burden',
        effects: { velocity: +18, morale: -15 }
      },
      {
        id: 'negotiate-reality',
        label: 'Negotiate with Reality',
        effects: { morale: +12, happiness: -18 }
      },
      {
        id: 'vanishing-spell',
        label: 'Cast Vanishing Spell',
        description: 'Make them disappear... quietly',
        effects: {},
        ritual: {
          chance: 0.7,
          onSuccess: { morale: +15 },
          successMessage: 'The tasks fade into digital mist. None remember their existence.',
          onFailure: { happiness: -100 },
          failureMessage: 'You are discovered! The Oracle banishes you to unemployment.'
        }
      }
    ]
  },

  // Legendary Cards - Game-changing events
  {
    id: 'cosmic-pivot',
    title: 'The Great Cosmic Pivot',
    scenario: 'The universe shifts. Your SaaS platform must now become a blockchain-powered metaverse NFT marketplace.',
    icon: '🌌',
    rarity: 'legendary',
    theme: 'chaos',
    choices: [
      {
        id: 'transcend-reality',
        label: 'Transcend Digital Reality',
        effects: { happiness: +25, velocity: -30, techDebt: +40 }
      },
      {
        id: 'anchor-sanity',
        label: 'Anchor Yourself to Sanity',
        effects: { happiness: -25, morale: +20, velocity: +10 }
      },
      {
        id: 'embrace-chaos',
        label: 'Become One with Chaos',
        description: 'Let the madness flow through you',
        effects: { velocity: +20, morale: -20 },
        ritual: {
          chance: 0.3,
          onSuccess: { happiness: +50, velocity: +20 },
          successMessage: 'You achieve enlightenment! The impossible becomes inevitable!',
          onFailure: { morale: -40, techDebt: +50 },
          failureMessage: 'Madness consumes the team. Reality fractures around the codebase.'
        }
      }
    ]
  },

  {
    id: 'time-crystal',
    title: 'Discovery of the Time Crystal',
    scenario: 'Deep in the legacy code, you find a temporal anomaly. It could rewrite the past... or destroy everything.',
    icon: '💎',
    rarity: 'legendary',
    theme: 'mystical',
    choices: [
      {
        id: 'rewrite-history',
        label: 'Rewrite the Git History',
        effects: { techDebt: -50, velocity: +20 },
        ritual: {
          chance: 0.5,
          onFailure: { velocity: -50, morale: -30 },
          failureMessage: 'The timeline collapses! All merge conflicts echo through eternity!'
        }
      },
      {
        id: 'preserve-timeline',
        label: 'Preserve the Sacred Timeline',
        effects: { morale: +15, happiness: +10 }
      },
      {
        id: 'shatter-crystal',
        label: 'Shatter the Crystal',
        description: 'Some power is too dangerous to wield',
        effects: { morale: +25, velocity: -10 },
        icon: '💥'
      }
    ]
  },

  // More Common Cards
  {
    id: 'daily-standup-chaos',
    title: 'The Eternal Standup',
    scenario: 'What started as a 15-minute standup has entered its second hour. Someone is debugging production live.',
    icon: '🔄',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'enforce-timeboxing',
        label: 'Enforce Sacred Timeboxing',
        effects: { velocity: +12, morale: -8 }
      },
      {
        id: 'embrace-chaos',
        label: 'Let Chaos Flow Naturally',
        effects: { morale: +15, velocity: -10 }
      },
      {
        id: 'suggest-coffee-break',
        label: 'Summon Coffee Spirits',
        effects: { morale: +8, velocity: +5 },
        icon: '☕'
      }
    ]
  },

  {
    id: 'code-review-purgatory',
    title: 'Code Review Purgatory',
    scenario: 'A pull request sits for 3 weeks. The original author has forgotten what the code does.',
    icon: '👁️',
    rarity: 'common',
    theme: 'wisdom',
    choices: [
      {
        id: 'approve-blindly',
        label: 'Trust in Divine Providence',
        effects: { velocity: +15, techDebt: +12 },
        ritual: {
          chance: 0.3,
          onFailure: { happiness: -20, techDebt: +10 },
          failureMessage: 'The code summons ancient bugs from the void!'
        }
      },
      {
        id: 'thorough-review',
        label: 'Perform Sacred Examination',
        effects: { velocity: -8, techDebt: -10, morale: +5 }
      },
      {
        id: 'pair-programming',
        label: 'Invoke Twin Coding Ritual',
        effects: { velocity: -5, morale: +12, techDebt: -5 }
      }
    ]
  },

  {
    id: 'feature-flag-festival',
    title: 'Festival of Feature Flags',
    scenario: 'The codebase now has 847 feature flags. Nobody remembers what half of them do.',
    icon: '🏳️',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'flag-cleanup',
        label: 'Great Flag Purification',
        effects: { velocity: -15, techDebt: -20, morale: +10 }
      },
      {
        id: 'add-more-flags',
        label: 'Embrace Flag Multiplication',
        effects: { velocity: +20, techDebt: +25 }
      },
      {
        id: 'flag-documentation',
        label: 'Create Sacred Documentation',
        effects: { velocity: -5, happiness: +8 }
      }
    ]
  },

  {
    id: 'microservice-madness',
    title: 'Microservice Multiplication',
    scenario: 'What was once a monolith is now 47 microservices. Each has its own database and deployment pipeline.',
    icon: '🕸️',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'embrace-complexity',
        label: 'Worship at the Altar of Complexity',
        effects: { happiness: +10, techDebt: +30, velocity: -15 }
      },
      {
        id: 'consolidate-services',
        label: 'Perform Reunification Ritual',
        effects: { velocity: -20, techDebt: -25, morale: +15 }
      },
      {
        id: 'service-mesh',
        label: 'Weave the Sacred Mesh',
        effects: { techDebt: +15, happiness: +15 },
        ritual: {
          chance: 0.4,
          onSuccess: { velocity: +20 },
          successMessage: 'The mesh brings divine order to chaos!',
          onFailure: { velocity: -25, morale: -15 },
          failureMessage: 'The mesh becomes a tangled web of confusion!'
        }
      }
    ]
  },

  {
    id: 'security-audit-doom',
    title: 'The Security Audit of Doom',
    scenario: 'Security team found 156 critical vulnerabilities. Half are in dependencies nobody understands.',
    icon: '🛡️',
    rarity: 'rare',
    theme: 'wisdom',
    choices: [
      {
        id: 'patch-everything',
        label: 'Emergency Patching Ritual',
        effects: { velocity: -25, happiness: -10, techDebt: +15 },
        ritual: {
          chance: 0.6,
          onSuccess: { happiness: +20, morale: +10 },
          successMessage: 'The fortress is secured! Stakeholders rejoice!'
        }
      },
      {
        id: 'accept-risk',
        label: 'Embrace Calculated Risk',
        effects: { velocity: +10 },
        ritual: {
          chance: 0.2,
          onFailure: { happiness: -40, techDebt: +20 },
          failureMessage: 'Hackers breach the sacred repository!'
        }
      },
      {
        id: 'security-theater',
        label: 'Perform Security Theater',
        effects: { happiness: +8, morale: -5 }
      }
    ]
  },

  {
    id: 'database-migration-nightmare',
    title: 'The Great Database Migration',
    scenario: 'Time to migrate 10TB of production data to a new schema. During Black Friday weekend.',
    icon: '🗄️',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'yolo-migration',
        label: 'Trust in Database Deities',
        effects: { velocity: +25 },
        ritual: {
          chance: 0.3,
          onSuccess: { happiness: +30, morale: +20 },
          successMessage: 'The migration succeeds flawlessly! Data flows like divine nectar!',
          onFailure: { happiness: -50, morale: -30, techDebt: +30 },
          failureMessage: 'Data corruption spreads across all dimensions!'
        }
      },
      {
        id: 'careful-migration',
        label: 'Perform Sacred Backup Rituals',
        effects: { velocity: -15, morale: +10, happiness: -5 }
      },
      {
        id: 'postpone-migration',
        label: 'Delay Until Mercury Retrograde Ends',
        effects: { happiness: -15, techDebt: +10 }
      }
    ]
  },

  {
    id: 'junior-dev-initiative',
    title: 'The Junior Developer Initiative',
    scenario: 'HR hired 5 bootcamp graduates. They are eager, energetic, and have never heard of Git.',
    icon: '👶',
    rarity: 'common',
    theme: 'wisdom',
    choices: [
      {
        id: 'mentorship-program',
        label: 'Establish Sacred Mentorship',
        effects: { velocity: -20, morale: +20, happiness: +10 }
      },
      {
        id: 'throw-deep-end',
        label: 'Trial by Fire Initiation',
        effects: { velocity: -10 },
        ritual: {
          chance: 0.5,
          onSuccess: { velocity: +25, morale: +15 },
          successMessage: 'The young padawans rise to legendary status!',
          onFailure: { morale: -20, techDebt: +15 },
          failureMessage: 'Chaos ensues as naive enthusiasm meets complex reality!'
        }
      },
      {
        id: 'documentation-project',
        label: 'Assign Documentation Quest',
        effects: { velocity: +5, happiness: +8, morale: -5 }
      }
    ]
  },

  {
    id: 'technical-debt-reckoning',
    title: 'The Technical Debt Reckoning',
    scenario: 'The payment system still runs on PHP 5.6. The authentication uses MD5. The database is in Excel.',
    icon: '💸',
    rarity: 'legendary',
    theme: 'chaos',
    choices: [
      {
        id: 'total-rewrite',
        label: 'Invoke the Great Rewrite',
        effects: { velocity: -40, morale: +25, techDebt: -50 },
        ritual: {
          chance: 0.4,
          onSuccess: { velocity: +40, happiness: +30 },
          successMessage: 'The phoenix rises from the ashes of legacy code!',
          onFailure: { velocity: -20, morale: -30 },
          failureMessage: 'The rewrite becomes another legacy system!'
        }
      },
      {
        id: 'incremental-improvement',
        label: 'Path of Gradual Enlightenment',
        effects: { velocity: -10, techDebt: -15, morale: +10 }
      },
      {
        id: 'ignore-and-pray',
        label: 'Trust in Divine Intervention',
        effects: {},
        ritual: {
          chance: 0.1,
          onSuccess: { happiness: +20 },
          successMessage: 'Miraculously, everything continues working!',
          onFailure: { happiness: -60, techDebt: +40 },
          failureMessage: 'The technical debt demons consume everything!'
        }
      }
    ]
  },

  {
    id: 'remote-work-renaissance',
    title: 'The Remote Work Renaissance',
    scenario: 'The team is now spread across 8 time zones. Daily standups happen at 3 AM for someone.',
    icon: '🌍',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'async-first',
        label: 'Embrace Asynchronous Harmony',
        effects: { morale: +15, velocity: +10, happiness: +5 }
      },
      {
        id: 'mandatory-overlap',
        label: 'Enforce Sacred Meeting Times',
        effects: { velocity: +8, morale: -12, happiness: +10 }
      },
      {
        id: 'regional-teams',
        label: 'Form Geographical Tribes',
        effects: { morale: +10, velocity: -5 }
      }
    ]
  },

  {
    id: 'container-orchestration-odyssey',
    title: 'The Container Orchestration Odyssey',
    scenario: 'Someone convinced management we need Kubernetes. We have 3 microservices and 2 developers.',
    icon: '🐳',
    rarity: 'rare',
    theme: 'mystical',
    choices: [
      {
        id: 'k8s-mastery',
        label: 'Master the Orchestration Arts',
        effects: { happiness: +20, velocity: -30, techDebt: +20 }
      },
      {
        id: 'simplify-deployment',
        label: 'Return to Simpler Times',
        effects: { velocity: +15, morale: +10, happiness: -10 }
      },
      {
        id: 'managed-service',
        label: 'Summon Cloud Spirits',
        effects: { velocity: +10, happiness: +15, techDebt: -5 },
        ritual: {
          chance: 0.7,
          onFailure: { happiness: -25 },
          failureMessage: 'The cloud bill summons financial demons!'
        }
      }
    ]
  },

  // Developer-Specific Cards
  {
    id: 'ios-developer-revolt',
    title: 'iOS Developer Revolt',
    scenario: 'The iOS team refuses to support iOS 12. "It\'s 2024, why are we supporting phones from the stone age?"',
    icon: '📱',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'support-legacy',
        label: 'Force Legacy Support',
        effects: { velocity: -15, morale: -20, happiness: +10 }
      },
      {
        id: 'drop-support',
        label: 'Embrace Modern iOS Only',
        effects: { velocity: +20, morale: +15, happiness: -25 }
      },
      {
        id: 'conditional-features',
        label: 'Implement Progressive Enhancement',
        effects: { velocity: -5, techDebt: +10, happiness: +5 }
      }
    ]
  },

  {
    id: 'backend-database-crisis',
    title: 'Backend Database Crisis',
    scenario: 'The backend team discovered the main database is running out of storage. Again. The last 3 "fixes" were just bigger disks.',
    icon: '💾',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'bigger-disk',
        label: 'Buy Even Bigger Disk',
        effects: { velocity: +15, techDebt: +20, happiness: -5 }
      },
      {
        id: 'optimize-queries',
        label: 'Backend Team Optimization Sprint',
        effects: { velocity: -20, techDebt: -15, morale: +10 }
      },
      {
        id: 'microservice-split',
        label: 'Split Database Across Services',
        effects: { velocity: -25, techDebt: +30, happiness: +15 },
        ritual: {
          chance: 0.4,
          onSuccess: { velocity: +20, techDebt: -10 },
          successMessage: 'Clean separation achieved! Each service owns its data.',
          onFailure: { techDebt: +25, morale: -15 },
          failureMessage: 'Data consistency nightmares plague the team!'
        }
      }
    ]
  },

  {
    id: 'frontend-framework-war',
    title: 'Frontend Framework War',
    scenario: 'Frontend team is split: React vs Vue vs Angular vs "Why not try Svelte?" The code review battles are legendary.',
    icon: '⚛️',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'pick-react',
        label: 'Standardize on React',
        effects: { velocity: +10, morale: -10, happiness: +5 }
      },
      {
        id: 'embrace-polyglot',
        label: 'Let a Thousand Frameworks Bloom',
        effects: { morale: +20, techDebt: +25, velocity: -10 }
      },
      {
        id: 'vanilla-js',
        label: 'Return to Vanilla JavaScript',
        effects: { velocity: -15, techDebt: -20, morale: -5 },
        icon: '🍦'
      }
    ]
  },

  {
    id: 'devops-pipeline-nightmare',
    title: 'DevOps Pipeline Nightmare',
    scenario: 'The CI/CD pipeline takes 4 hours to run. DevOps says "it\'s building character" while developers plan mutiny.',
    icon: '🔧',
    rarity: 'rare',
    theme: 'wisdom',
    choices: [
      {
        id: 'parallel-builds',
        label: 'DevOps Parallelization Sprint',
        effects: { velocity: +25, morale: +20, happiness: -10 }
      },
      {
        id: 'skip-tests',
        label: 'Skip Some Tests "Temporarily"',
        effects: { velocity: +30, techDebt: +35, morale: -10 },
        ritual: {
          chance: 0.3,
          onFailure: { happiness: -30, techDebt: +20 },
          failureMessage: 'Critical bugs escape to production! Client outcry intensifies!'
        }
      },
      {
        id: 'developer-patience',
        label: 'Teach Developers Meditation',
        effects: { morale: -15, velocity: -5 },
        icon: '🧘'
      }
    ]
  },

  {
    id: 'android-ios-feature-parity',
    title: 'Android vs iOS Feature Parity',
    scenario: 'iOS got the fancy new feature last sprint. Android team demands equal treatment or threatens to switch to Flutter.',
    icon: '🤖',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'android-first',
        label: 'Give Android Team Priority',
        effects: { morale: +15, velocity: -10, happiness: -5 }
      },
      {
        id: 'simultaneous-dev',
        label: 'Parallel Platform Development',
        effects: { velocity: -20, morale: +10, happiness: +15 }
      },
      {
        id: 'flutter-migration',
        label: 'Investigate Flutter Migration',
        effects: { velocity: -15, morale: +5, techDebt: +20 },
        ritual: {
          chance: 0.6,
          onSuccess: { velocity: +30, morale: +20 },
          successMessage: 'Flutter unifies the mobile teams! Code sharing achieves harmony!',
          onFailure: { morale: -25, techDebt: +15 },
          failureMessage: 'Flutter learning curve steeper than expected. Both teams struggle!'
        }
      }
    ]
  },

  {
    id: 'fullstack-developer-identity-crisis',
    title: 'Fullstack Developer Identity Crisis',
    scenario: 'The "fullstack" developer spends 90% of time on CSS alignment issues and 10% pretending to understand Kubernetes.',
    icon: '🎭',
    rarity: 'common',
    theme: 'wisdom',
    choices: [
      {
        id: 'specialize-frontend',
        label: 'Embrace Frontend Specialization',
        effects: { velocity: +15, morale: +10, happiness: -5 }
      },
      {
        id: 'specialize-backend',
        label: 'Focus on Backend Systems',
        effects: { velocity: +10, morale: +15, happiness: -10 }
      },
      {
        id: 'true-fullstack',
        label: 'Become Truly Full-Stack',
        effects: { velocity: -10, morale: +20 },
        ritual: {
          chance: 0.5,
          onSuccess: { velocity: +25, happiness: +15 },
          successMessage: 'Achieves mastery across the entire stack! Legends are born!',
          onFailure: { morale: -15, velocity: -10 },
          failureMessage: 'Spreads too thin. Jack of all trades, master of none!'
        }
      }
    ]
  },

  {
    id: 'qa-automation-resistance',
    title: 'QA Automation Resistance',
    scenario: 'QA team insists manual testing is superior. "Automation can\'t test user experience!" they cry, while running the same 200 test cases.',
    icon: '🔍',
    rarity: 'common',
    theme: 'wisdom',
    choices: [
      {
        id: 'force-automation',
        label: 'Mandate Test Automation',
        effects: { velocity: +20, morale: -15, techDebt: -10 }
      },
      {
        id: 'hybrid-approach',
        label: 'Balanced Testing Strategy',
        effects: { velocity: +5, morale: +10, happiness: +5 }
      },
      {
        id: 'manual-testing-army',
        label: 'Expand Manual QA Team',
        effects: { velocity: -10, morale: +15, happiness: +10 }
      }
    ]
  },

  {
    id: 'senior-developer-knowledge-hoarding',
    title: 'Senior Developer Knowledge Hoarding',
    scenario: 'The senior dev who built the core system is the only one who understands it. They\'re also interviewing at other companies.',
    icon: '🧙‍♂️',
    rarity: 'rare',
    theme: 'wisdom',
    choices: [
      {
        id: 'knowledge-transfer',
        label: 'Mandatory Knowledge Transfer Sessions',
        effects: { velocity: -15, morale: +20, techDebt: -15 }
      },
      {
        id: 'reverse-engineer',
        label: 'Team Reverse Engineering Sprint',
        effects: { velocity: -25, morale: +10, techDebt: +10 }
      },
      {
        id: 'retention-bonus',
        label: 'Offer Retention Package',
        effects: { happiness: -20, morale: +15, velocity: +10 },
        ritual: {
          chance: 0.7,
          onSuccess: { morale: +15, velocity: +20 },
          successMessage: 'Senior dev stays and starts mentoring others!',
          onFailure: { morale: -30, velocity: -40 },
          failureMessage: 'Senior dev leaves anyway, taking all institutional knowledge!'
        }
      }
    ]
  },

  // Social/Economic/Career-Driven Cards
  {
    id: 'salary-negotiation-season',
    title: 'Annual Salary Review Season',
    scenario: 'Performance reviews are here. Half the team is updating their LinkedIn profiles and the other half is practicing their "I deserve a raise" speeches.',
    icon: '💰',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'generous-raises',
        label: 'Approve Generous Raises',
        effects: { happiness: -15, morale: +25, velocity: +10 }
      },
      {
        id: 'modest-increases',
        label: 'Offer Modest Increases',
        effects: { happiness: -5, morale: +5, velocity: +0 }
      },
      {
        id: 'performance-improvement-plans',
        label: 'Focus on "Growth Opportunities"',
        effects: { happiness: +5, morale: -20, velocity: -15 },
        ritual: {
          chance: 0.3,
          onFailure: { morale: -30, velocity: -20 },
          failureMessage: 'Mass exodus begins! Senior developers head for the exits!'
        }
      }
    ]
  },

  {
    id: 'open-office-renovation',
    title: 'The Great Open Office Experiment',
    scenario: 'Facilities decided to remove all walls and create a "collaborative environment." Developers now hear every phone call, meeting, and keyboard click.',
    icon: '🏢',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'embrace-openness',
        label: 'Embrace Radical Transparency',
        effects: { happiness: +10, morale: -15, velocity: -20 }
      },
      {
        id: 'noise-canceling-headphones',
        label: 'Invest in Premium Headphones',
        effects: { happiness: -8, morale: +12, velocity: +5 }
      },
      {
        id: 'remote-work-policy',
        label: 'Implement Work-From-Home Days',
        effects: { morale: +20, velocity: +10, happiness: -5 }
      }
    ]
  },

  {
    id: 'diversity-hiring-pressure',
    title: 'Diversity Initiative Pressure',
    scenario: 'HR demands the team becomes more diverse "immediately." Meanwhile, the hiring pipeline is thinner than ramen noodles and everyone qualified wants FAANG money.',
    icon: '🌈',
    rarity: 'common',
    theme: 'wisdom',
    choices: [
      {
        id: 'lower-hiring-bar',
        label: 'Accelerate Hiring Process',
        effects: { happiness: +15, velocity: -10, techDebt: +15 }
      },
      {
        id: 'internship-program',
        label: 'Create Mentorship Programs',
        effects: { velocity: -15, morale: +20, happiness: +10 }
      },
      {
        id: 'consultant-diversity-training',
        label: 'Hire Diversity Consultants',
        effects: { happiness: +5, morale: -5, velocity: -5 }
      }
    ]
  },

  {
    id: 'competitor-talent-poaching',
    title: 'Competitor Talent Raid',
    scenario: 'A well-funded startup across the street is offering 40% salary bumps and unlimited PTO. Your parking lot conversations are getting suspicious.',
    icon: '🎯',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'counter-offer-war',
        label: 'Enter Counter-Offer Arms Race',
        effects: { happiness: -25, morale: +15, velocity: +5 }
      },
      {
        id: 'improve-culture',
        label: 'Focus on Culture and Benefits',
        effects: { happiness: -10, morale: +25, velocity: -5 }
      },
      {
        id: 'non-compete-enforcement',
        label: 'Threaten Legal Action',
        effects: { happiness: +5, morale: -30, velocity: -15 },
        ritual: {
          chance: 0.2,
          onFailure: { morale: -40, velocity: -25 },
          failureMessage: 'Team morale collapses! Mass resignation letters appear on your desk!'
        }
      }
    ]
  },

  {
    id: 'burnout-epidemic',
    title: 'Team Burnout Epidemic',
    scenario: 'Three developers called in "sick" this week. One was spotted at a coffee shop reading philosophy. Another changed their Slack status to "existential crisis."',
    icon: '😴',
    rarity: 'rare',
    theme: 'wisdom',
    choices: [
      {
        id: 'mandatory-vacation',
        label: 'Enforce Mandatory Vacation Days',
        effects: { velocity: -20, morale: +30, happiness: -10 }
      },
      {
        id: 'wellness-program',
        label: 'Implement Wellness Programs',
        effects: { velocity: -5, morale: +15, happiness: +5 }
      },
      {
        id: 'ignore-and-ship',
        label: 'Push Through to Deadline',
        effects: { velocity: +15, morale: -25, techDebt: +20 },
        ritual: {
          chance: 0.4,
          onFailure: { morale: -35, velocity: -30 },
          failureMessage: 'Complete team breakdown! Emergency mental health days declared!'
        }
      }
    ]
  },

  {
    id: 'startup-acquisition-rumors',
    title: 'Acquisition Rumor Mill',
    scenario: 'Word leaked that BigTech Corp is "evaluating strategic partnerships." Half the team is polishing resumes, the other half is calculating stock options.',
    icon: '🏪',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'transparent-communication',
        label: 'Address Rumors Transparently',
        effects: { morale: +10, velocity: -5, happiness: +5 }
      },
      {
        id: 'retention-bonuses',
        label: 'Offer Retention Incentives',
        effects: { happiness: -15, morale: +20, velocity: +10 }
      },
      {
        id: 'business-as-usual',
        label: 'Pretend Nothing Is Happening',
        effects: { morale: -15, velocity: -10 },
        ritual: {
          chance: 0.6,
          onSuccess: { morale: +5 },
          successMessage: 'Rumors die down. Team refocuses on work.',
          onFailure: { morale: -25, velocity: -20 },
          failureMessage: 'Uncertainty spreads! Productivity plummets as everyone networks externally!'
        }
      }
    ]
  },

  {
    id: 'celebrity-tech-influence',
    title: 'Tech Celebrity Influence',
    scenario: 'A famous tech influencer tweeted that your tech stack is "so 2019." Your junior developers are now questioning every architectural decision.',
    icon: '⭐',
    rarity: 'common',
    theme: 'mystical',
    choices: [
      {
        id: 'follow-trends',
        label: 'Adopt Latest Tech Trends',
        effects: { morale: +15, techDebt: +25, velocity: -15 }
      },
      {
        id: 'defend-choices',
        label: 'Defend Current Architecture',
        effects: { morale: -5, velocity: +10, techDebt: -5 }
      },
      {
        id: 'research-spike',
        label: 'Research New Technologies',
        effects: { velocity: -10, morale: +10, happiness: -5 }
      }
    ]
  },

  {
    id: 'economic-downturn-pressure',
    title: 'Economic Downturn Anxiety',
    scenario: 'News of layoffs in tech are everywhere. The CFO keeps walking by your area with a calculator and a concerned expression.',
    icon: '📉',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'cost-cutting-measures',
        label: 'Implement Cost-Cutting Measures',
        effects: { happiness: +15, morale: -20, velocity: -10 }
      },
      {
        id: 'efficiency-improvements',
        label: 'Focus on Efficiency Gains',
        effects: { velocity: +15, morale: +5, techDebt: +10 }
      },
      {
        id: 'team-assurance',
        label: 'Provide Team Stability Assurance',
        effects: { morale: +15, velocity: +5 },
        ritual: {
          chance: 0.7,
          onFailure: { happiness: -30, morale: -20 },
          failureMessage: 'Layoffs announced anyway! Trust in leadership shattered!'
        }
      }
    ]
  },

  // More Fun Developer Life Cards
  {
    id: 'production-fire-friday',
    title: 'The Dreaded Friday 4:45 PM Fire',
    scenario: 'The clock strikes 4:45 PM on Friday. Bags are packed, weekend plans await. Then... the payment system erupts in errors. Customers can\'t buy, revenue bleeds, and everyone stares at their car keys with hollow eyes.',
    icon: '🔥',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'all-hands-hotfix',
        label: 'All Hands Emergency Hotfix',
        effects: { velocity: +15, morale: -25, happiness: +10 }
      },
      {
        id: 'monday-morning-fix',
        label: 'Schedule Fix for Monday',
        effects: { happiness: -20, morale: +10, velocity: -5 }
      },
      {
        id: 'rollback-and-investigate',
        label: 'Rollback to Previous Version',
        effects: { velocity: -10, happiness: -5, techDebt: +5 }
      }
    ]
  },

  {
    id: 'intern-overwrites-database',
    title: 'The Intern\'s Production Apocalypse',
    scenario: 'The wide-eyed intern approaches, voice trembling: "I was just testing something in production and... well... half our users don\'t exist anymore." Their bottom lip quivers. The silence in the room could cut code.',
    icon: '😰',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'backup-restore',
        label: 'Emergency Backup Restore',
        effects: { velocity: -20, morale: -10, happiness: -15 }
      },
      {
        id: 'blame-and-fire',
        label: 'Make an Example of Intern',
        effects: { happiness: +5, morale: -20, velocity: -5 }
      },
      {
        id: 'learning-opportunity',
        label: 'Turn Into Learning Experience',
        effects: { velocity: -15, morale: +15, techDebt: -5 }
      }
    ]
  },

  {
    id: 'cryptocurrency-payment-request',
    title: 'Crypto Payment Integration',
    scenario: 'Marketing wants to accept 47 different cryptocurrencies. "It\'s the future!" they insist, while Bitcoin crashes 30% during the meeting.',
    icon: '₿',
    rarity: 'common',
    theme: 'mystical',
    choices: [
      {
        id: 'full-crypto-support',
        label: 'Embrace the Blockchain Revolution',
        effects: { happiness: +20, techDebt: +30, velocity: -25 }
      },
      {
        id: 'bitcoin-only',
        label: 'Support Bitcoin Only',
        effects: { happiness: +10, techDebt: +15, velocity: -10 }
      },
      {
        id: 'politely-decline',
        label: 'Suggest Third-Party Solutions',
        effects: { happiness: -10, velocity: +10, morale: +5 }
      }
    ]
  },

  {
    id: 'hackathon-distraction',
    title: 'Company Hackathon Week',
    scenario: 'It\'s hackathon time! Half the team wants to build a dating app for dogs. The other half wants to solve world hunger with AI.',
    icon: '🏆',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'embrace-innovation',
        label: 'Encourage Wild Innovation',
        effects: { morale: +25, velocity: -20, happiness: -5 }
      },
      {
        id: 'business-focused-hacks',
        label: 'Focus on Business Problems',
        effects: { happiness: +15, morale: +5, velocity: -10 }
      },
      {
        id: 'skip-hackathon',
        label: 'Focus on Sprint Goals',
        effects: { velocity: +15, morale: -15, happiness: +5 }
      }
    ]
  },

  {
    id: 'client-wants-facebook',
    title: 'Client Wants "Something Like Facebook"',
    scenario: 'Client saw their competitor use social features and now wants "Facebook but for our industry." They have a $5k budget and need it by Tuesday.',
    icon: '👥',
    rarity: 'common',
    theme: 'wisdom',
    choices: [
      {
        id: 'build-social-network',
        label: 'Attempt Social Network Build',
        effects: { happiness: +10, velocity: -30, techDebt: +35 }
      },
      {
        id: 'simple-comments',
        label: 'Implement Basic Comments',
        effects: { happiness: +5, velocity: -10, techDebt: +10 }
      },
      {
        id: 'education-session',
        label: 'Educate on Scope and Complexity',
        effects: { happiness: -5, velocity: +5, morale: +10 }
      }
    ]
  },

  {
    id: 'server-room-flooding',
    title: 'Server Room Flooding',
    scenario: 'The building\'s sprinkler system malfunctioned. Your servers are currently underwater, and the cloud migration was "planned for next quarter."',
    icon: '🌊',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'emergency-cloud-migration',
        label: 'Emergency Cloud Migration',
        effects: { velocity: -25, happiness: -20, techDebt: +20 }
      },
      {
        id: 'backup-location',
        label: 'Activate Backup Data Center',
        effects: { velocity: -15, happiness: -10, morale: +5 }
      },
      {
        id: 'work-from-coffee-shop',
        label: 'Everyone Works from Coffee Shops',
        effects: { velocity: -20, morale: +15, happiness: -15 }
      }
    ]
  },

  {
    id: 'ai-will-replace-developers',
    title: 'AI Will Replace Developers',
    scenario: 'A news article claims AI will replace all developers in 6 months. Half the team is panicking, the other half is trying to automate their own jobs.',
    icon: '🤖',
    rarity: 'common',
    theme: 'mystical',
    choices: [
      {
        id: 'embrace-ai-tools',
        label: 'Adopt AI Development Tools',
        effects: { velocity: +20, morale: +10, techDebt: +15 }
      },
      {
        id: 'focus-on-creativity',
        label: 'Emphasize Human Creativity',
        effects: { morale: +15, velocity: -5, happiness: +5 }
      },
      {
        id: 'panic-upskilling',
        label: 'Mandatory AI Training for Everyone',
        effects: { velocity: -15, morale: -10, happiness: +10 }
      }
    ]
  },

  {
    id: 'office-ping-pong-tournament',
    title: 'Office Ping Pong Championship',
    scenario: 'The ping pong table arrived and suddenly everyone\'s a professional athlete. Productivity has plummeted but morale is through the roof.',
    icon: '🏓',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'embrace-ping-pong',
        label: 'Organize Official Tournament',
        effects: { morale: +20, velocity: -15, happiness: +5 }
      },
      {
        id: 'scheduled-gaming',
        label: 'Schedule Gaming Hours',
        effects: { morale: +10, velocity: -5, happiness: +5 }
      },
      {
        id: 'remove-distractions',
        label: 'Focus on Work First',
        effects: { velocity: +10, morale: -15, happiness: +5 }
      }
    ]
  },

  {
    id: 'legacy-system-expert-retiring',
    title: 'The Last Keeper of Ancient Code',
    scenario: 'Bob shuffles to your desk, retirement papers in hand. "Kid," he wheezes, "that server in rack 47? Reboot it every Tuesday at 3 AM or the accounting system summons financial demons." He\'s the only one who remembers why. Tomorrow, he vanishes into golf-course mythology.',
    icon: '👴',
    rarity: 'rare',
    theme: 'wisdom',
    choices: [
      {
        id: 'intensive-knowledge-transfer',
        label: 'Intensive Knowledge Documentation',
        effects: { velocity: -30, morale: +10, techDebt: -20 }
      },
      {
        id: 'consultant-contract',
        label: 'Offer Lucrative Consultant Contract',
        effects: { happiness: -15, velocity: +10, morale: +5 }
      },
      {
        id: 'reverse-engineer-everything',
        label: 'Reverse Engineer the System',
        effects: { velocity: -35, techDebt: +25, morale: -10 }
      }
    ]
  },

  {
    id: 'mandatory-return-to-office',
    title: 'Mandatory Return to Office',
    scenario: 'Management declared "innovation happens in person" and mandated full return to office. The team has been remote for 3 years and some moved to different states.',
    icon: '🏢',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'enforce-office-policy',
        label: 'Enforce Office Return Policy',
        effects: { happiness: +10, morale: -25, velocity: -15 }
      },
      {
        id: 'hybrid-compromise',
        label: 'Negotiate Hybrid Schedule',
        effects: { happiness: +5, morale: +10, velocity: -5 }
      },
      {
        id: 'remote-first-defense',
        label: 'Advocate for Remote-First',
        effects: { happiness: -10, morale: +20, velocity: +10 }
      }
    ]
  }
];

// Function to get cards by rarity
export const getCardsByRarity = (rarity: 'common' | 'rare' | 'legendary'): Card[] => {
  return MYSTICAL_DECK.filter(card => card.rarity === rarity);
};

// Function to shuffle and draw a hand
export const drawHand = (handSize: number = 3, excludeIds: string[] = []): Card[] => {
  // Weighted card selection for better gameplay balance
  
  // Weight the draw towards common cards
  const rarityWeights = { common: 0.7, rare: 0.25, legendary: 0.05 };
  const weightedDeck: Card[] = [];
  
  MYSTICAL_DECK.forEach(card => {
    const weight = rarityWeights[card.rarity];
    const count = Math.ceil(weight * 10);
    for (let i = 0; i < count; i++) {
      weightedDeck.push(card);
    }
  });
  
  const shuffledWeighted = weightedDeck.sort(() => Math.random() - 0.5);
  
  // Remove duplicates, exclude played cards, and take handSize cards
  const hand: Card[] = [];
  const usedIds = new Set<string>(excludeIds); // Start with excluded IDs
  
  for (const card of shuffledWeighted) {
    if (!usedIds.has(card.id) && hand.length < handSize) {
      hand.push(card);
      usedIds.add(card.id);
    }
  }
  
  return hand;
};
