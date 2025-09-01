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
        description: 'Make it appear intelligent without true understanding - dangerous deception',
        effects: { velocity: +15, techDebt: +25 },
        ritual: {
          chance: 0.4,
          onSuccess: { happiness: +20, velocity: +10 },
          onFailure: { happiness: -30, velocity: -20, techDebt: +15 },
          successMessage: 'Illusion holds! Stakeholders are impressed by the "AI" features',
          failureMessage: 'Illusion shattered! Fake AI exposed, credibility destroyed'
        },
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
        description: 'Be present in body, absent in spirit - risky mystical technique',
        effects: { morale: +5 },
        ritual: {
          chance: 0.6,
          onSuccess: { velocity: +8, morale: +10 },
          onFailure: { velocity: -15, techDebt: +10 },
          successMessage: 'Astral projection successful! Team transcends physical limitations',
          failureMessage: 'Lost in the astral plane - team productivity crashes'
        },
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
        description: 'Risky exploration of bleeding-edge tech',
        effects: { velocity: -10, morale: +10 },
        ritual: {
          chance: 0.5,
          onSuccess: { velocity: +20, techDebt: -15, happiness: +15 },
          onFailure: { velocity: -25, techDebt: +30, morale: -15 },
          successMessage: 'Research breakthrough! Team discovers game-changing technology',
          failureMessage: 'Research rabbit hole! Team lost in complexity, productivity crashes'
        }
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
    scenario: '4:45 PM Friday. Weekend plans await. Then... the payment system explodes. Revenue bleeds.',
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
    scenario: 'The intern trembles: "I was testing in production and... half our users don\'t exist anymore."',
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
    scenario: 'Bob shuffles over with retirement papers. "That server in rack 47? Reboot it every Tuesday at 3 AM or the accounting system summons financial demons." Only he knows why.',
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
  },

  // More Common Cards - Additional Scenarios
  {
    id: 'open-source-contribution',
    title: 'The Open Source Opportunity',
    scenario: 'A chance to contribute to a popular open source project emerges. The community beckons, but deadlines loom...',
    icon: '🌟',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'contribute',
        label: 'Embrace the Open Source Spirit',
        description: 'Contribute during work hours',
        effects: { morale: +15, velocity: -8, happiness: +5 }
      },
      {
        id: 'after-hours',
        label: 'Sacrifice Personal Time',
        description: 'Contribute in your free time',
        effects: { morale: +8, velocity: +3, techDebt: -5 }
      },
      {
        id: 'decline',
        label: 'Focus on Current Sprint',
        description: 'Politely decline the opportunity',
        effects: { velocity: +5, morale: -3 }
      }
    ]
  },

  {
    id: 'security-vulnerability',
    title: 'The Security Awakening',
    scenario: 'Critical security vulnerability discovered. Users login with "password123".',
    icon: '🔐',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'emergency-fix',
        label: 'Deploy Emergency Hotfix',
        description: 'All hands on deck for immediate fix',
        effects: { velocity: -15, morale: -10, techDebt: +8, happiness: +12 }
      },
      {
        id: 'planned-fix',
        label: 'Plan Systematic Security Audit',
        description: 'Thorough but slower approach',
        effects: { velocity: -5, techDebt: -10, morale: +5 }
      },
      {
        id: 'band-aid',
        label: 'Apply Quick Band-Aid Solution',
        description: 'Minimal disruption approach',
        effects: { velocity: +3, techDebt: +15, happiness: +5 },
        ritual: {
          chance: 0.3,
          onFailure: { happiness: -20, techDebt: +25 },
          failureMessage: 'The band-aid fails spectacularly. Security breach headlines tomorrow.'
        }
      }
    ]
  },

  {
    id: 'performance-crisis',
    title: 'The Great Slowdown',
    scenario: 'Your app takes 30 seconds to load. Users are abandoning ship.',
    icon: '🐌',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'optimize',
        label: 'Deep Performance Optimization',
        description: 'Profile and optimize systematically',
        effects: { velocity: -10, techDebt: -15, morale: +8, happiness: +15 }
      },
      {
        id: 'cdn',
        label: 'Throw CDN at the Problem',
        description: 'Expensive but fast solution',
        effects: { velocity: +5, happiness: +10, morale: -3 }
      },
      {
        id: 'blame-users',
        label: 'Blame User Internet Connections',
        description: 'Deflect responsibility',
        effects: { velocity: +8, happiness: -15, morale: -5 }
      }
    ]
  },

  {
    id: 'documentation-debt',
    title: 'The Documentation Void',
    scenario: 'New team member asks "How does this work?" You realize there is zero documentation. Anywhere.',
    icon: '📚',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'write-docs',
        label: 'Write Comprehensive Documentation',
        description: 'Finally tackle the doc debt',
        effects: { velocity: -12, morale: +10, techDebt: -8 }
      },
      {
        id: 'code-comments',
        label: 'Add Inline Comments Only',
        description: 'Minimal effort approach',
        effects: { velocity: -5, techDebt: -3, morale: +2 }
      },
      {
        id: 'mentorship',
        label: 'Pair Programming Knowledge Transfer',
        description: 'Teach through doing',
        effects: { velocity: -8, morale: +15, happiness: +5 }
      }
    ]
  },

  {
    id: 'api-versioning',
    title: 'The Versioning Nightmare',
    scenario: 'Your API now has v1, v2, v3, v2.1, and v2.5. Clients are using all of them. Chaos reigns supreme.',
    icon: '🔀',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'deprecate',
        label: 'Force Deprecation of Old Versions',
        description: 'Break things to fix them',
        effects: { velocity: +10, happiness: -20, techDebt: -15 },
        ritual: {
          chance: 0.4,
          onFailure: { happiness: -30, morale: -15 },
          failureMessage: 'Major clients revolt. Emergency meetings all day.'
        }
      },
      {
        id: 'maintain-all',
        label: 'Support All Versions Forever',
        description: 'The path of eternal suffering',
        effects: { velocity: -15, techDebt: +20, morale: -10 }
      },
      {
        id: 'migration-plan',
        label: 'Create Gradual Migration Plan',
        description: 'The diplomatic approach',
        effects: { velocity: -8, happiness: +8, techDebt: -5, morale: +5 }
      }
    ]
  },

  {
    id: 'mobile-responsive',
    title: 'The Mobile Awakening',
    scenario: 'Someone finally checks your app on mobile. It looks like it was designed in 1999. On a Nokia.',
    icon: '📱',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'responsive-design',
        label: 'Implement Proper Responsive Design',
        description: 'Do it right from scratch',
        effects: { velocity: -15, techDebt: -10, happiness: +15, morale: +5 }
      },
      {
        id: 'mobile-app',
        label: 'Create Separate Mobile App',
        description: 'Start a new project',
        effects: { velocity: -20, morale: +10, happiness: +20, techDebt: +5 }
      },
      {
        id: 'ignore',
        label: 'Add "Best Viewed on Desktop" Notice',
        description: 'The ostrich approach',
        effects: { velocity: +5, happiness: -12, morale: -3 }
      }
    ]
  },

  {
    id: 'tech-conference',
    title: 'The Conference Temptation',
    scenario: 'The hottest tech conference is happening next week. Keynote promises to "revolutionize everything" (again).',
    icon: '🎤',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'attend',
        label: 'Send Team to Conference',
        description: 'Investment in learning',
        effects: { velocity: -10, morale: +15, happiness: +5, techDebt: -3 }
      },
      {
        id: 'watch-online',
        label: 'Stream Sessions Remotely',
        description: 'Budget-friendly learning',
        effects: { velocity: -3, morale: +5, techDebt: -1 }
      },
      {
        id: 'skip',
        label: 'Focus on Current Work',
        description: 'Prioritize deadlines',
        effects: { velocity: +8, morale: -5, happiness: +3 }
      }
    ]
  },

  {
    id: 'database-migration',
    title: 'The Great Database Migration',
    scenario: 'Time to migrate from ancient MySQL 5.6. Your production data is... questionable.',
    icon: '🗄️',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'careful-migration',
        label: 'Meticulous Step-by-Step Migration',
        description: 'Slow but safe approach',
        effects: { velocity: -20, techDebt: -20, morale: +5, happiness: +10 }
      },
      {
        id: 'yolo-migration',
        label: 'Weekend Big Bang Migration',
        description: 'Risky but fast',
        effects: { velocity: +5, morale: -15 },
        ritual: {
          chance: 0.5,
          onSuccess: { techDebt: -25, happiness: +20 },
          onFailure: { velocity: -30, happiness: -25, techDebt: +30 },
          successMessage: 'Migration succeeds flawlessly! You are the database wizard!',
          failureMessage: 'Data corruption detected. Monday is going to be... interesting.'
        }
      },
      {
        id: 'postpone',
        label: 'Postpone Until Next Quarter',
        description: 'Kick the can down the road',
        effects: { velocity: +8, techDebt: +10, morale: -3 }
      }
    ]
  },

  {
    id: 'ai-integration',
    title: 'The AI Revolution (Again)',
    scenario: 'Management wants to "integrate AI into everything." They saw a ChatGPT demo and now think you can automate creativity.',
    icon: '🤖',
    rarity: 'common',
    theme: 'mystical',
    choices: [
      {
        id: 'implement-ai',
        label: 'Build Comprehensive AI Features',
        description: 'Embrace the AI hype fully',
        effects: { velocity: -15, happiness: +15, techDebt: +10, morale: -5 }
      },
      {
        id: 'smart-integration',
        label: 'Add Targeted AI Where It Makes Sense',
        description: 'Strategic implementation',
        effects: { velocity: -8, happiness: +10, techDebt: -3, morale: +5 }
      },
      {
        id: 'ai-washing',
        label: 'Rebrand Existing Features as "AI-Powered"',
        description: 'Marketing magic',
        effects: { velocity: +3, happiness: +8, morale: -8 }
      }
    ]
  },

  {
    id: 'startup-acquisition',
    title: 'The Acquisition Rumors',
    scenario: 'Word spreads that your startup might be acquired. Half the team is polishing resumes, the other half is planning yacht purchases.',
    icon: '💰',
    rarity: 'rare',
    theme: 'mystical',
    choices: [
      {
        id: 'transparency',
        label: 'Full Transparency About Uncertainty',
        description: 'Honest communication',
        effects: { morale: +10, velocity: -5, happiness: +5 }
      },
      {
        id: 'distraction-free',
        label: 'Ban All Acquisition Discussions',
        description: 'Focus on work only',
        effects: { velocity: +8, morale: -10, happiness: +3 }
      },
      {
        id: 'celebration',
        label: 'Pre-Celebrate with Team Party',
        description: 'Optimistic approach',
        effects: { morale: +20, velocity: -12, happiness: +8 },
        ritual: {
          chance: 0.6,
          onSuccess: { happiness: +15, morale: +10 },
          onFailure: { morale: -15, happiness: -10 },
          successMessage: 'Acquisition confirmed! Champagne for everyone!',
          failureMessage: 'Acquisition falls through. Awkward silence fills the office.'
        }
      }
    ]
  },

  // Additional Developer Life Cards
  {
    id: 'design-system-wars',
    title: 'The Great Styling Wars',
    scenario: 'Frontend devs wage holy war over Tailwind vs Styled Components vs CSS-in-JS. The Slack thread has reached 500 replies and three developers have left the company.',
    icon: '🎨',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'let-fight',
        label: 'Let Democracy Burn',
        description: 'Watch the world burn in beautiful, semantic flames',
        effects: { velocity: -15, morale: +10 }
      },
      {
        id: 'force-choice',
        label: 'Enforce Benevolent Dictatorship',
        description: 'Pick one and execute the heretics',
        effects: { velocity: +10, morale: -15 }
      },
      {
        id: 'buy-theme',
        label: 'Purchase Corporate Bootstrap Theme',
        description: 'Surrender artistic integrity for peace',
        effects: { happiness: -10, velocity: +5, techDebt: +8 }
      }
    ]
  },

  {
    id: 'compliance-audit',
    title: 'The Compliance Inquisition',
    scenario: 'External auditors arrive with clipboards and disappointed expressions. They seek documentation. Your README was last updated when React had class components.',
    icon: '📋',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'write-docs',
        label: 'Confess and Document Everything',
        description: 'Embrace the virtue of transparency',
        effects: { velocity: -15, happiness: +10, techDebt: -5 }
      },
      {
        id: 'ignore-audit',
        label: 'Hide in the Server Room',
        description: 'They can\'t audit what they can\'t find',
        effects: { velocity: +10, techDebt: +20, morale: -5 }
      },
      {
        id: 'bluff-slides',
        label: 'Deploy PowerPoint Smoke Screen',
        description: 'Dazzle them with bullet points and synergy',
        effects: { velocity: +5, happiness: -5, morale: -3 }
      }
    ]
  },

  {
    id: 'infinite-retro',
    title: 'The Eternal Retrospective',
    scenario: 'The retrospective has transcended time and space. Someone brought feelings. Another brought childhood trauma. The sprint board has become a therapy session whiteboard.',
    icon: '🔄',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'join-fully',
        label: 'Embrace the Sacred Healing Circle',
        description: 'Unlock your inner child and outer frustrations',
        effects: { morale: +20, velocity: -20 }
      },
      {
        id: 'skip-early',
        label: 'Execute Tactical Irish Exit',
        description: 'Vanish like a ninja when nobody\'s looking',
        effects: { velocity: +10, morale: -10 }
      },
      {
        id: 'meta-meeting',
        label: 'Schedule Meta-Retro Meeting',
        description: 'Retrospect about retrospecting retrospectively',
        effects: { happiness: -5, velocity: -3, techDebt: +5 }
      }
    ]
  },

  {
    id: 'hero-developer',
    title: 'The Fallen Code Warrior',
    scenario: 'Your 10x developer has ascended to become a 0x developer. They carried the entire sprint on their back, then their back gave out. Nobody else knows the arcane deployment incantations.',
    icon: '🦸',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'celebrate-hero',
        label: 'Build Shrine to the Fallen Hero',
        description: 'Encourage others to burn themselves out too',
        effects: { velocity: +15, morale: -20 }
      },
      {
        id: 'share-work',
        label: 'Establish Knowledge Democracy',
        description: 'Distribute the burden like a proper communist',
        effects: { morale: +10, velocity: -10, techDebt: -5 }
      },
      {
        id: 'replace-intern',
        label: 'Deploy Emergency Intern',
        description: 'Fresh blood for the code grinder',
        effects: { velocity: +10, techDebt: +20, morale: -5 }
      }
    ]
  },

  {
    id: 'framework-migration',
    title: 'The Framework Fever Dream',
    scenario: 'Your PO discovered React 19 on Hacker News and now demands a complete rewrite. "This will revolutionize everything!" they cry, while your perfectly functional Vue app weeps in the corner.',
    icon: '🔧',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'agree-migrate',
        label: 'Embrace the Shiny New Thing',
        description: 'Burn everything and start fresh like a phoenix',
        effects: { velocity: -20, happiness: +10, techDebt: +15 }
      },
      {
        id: 'delay-migrate',
        label: 'Strategic Procrastination',
        description: 'Maybe they\'ll forget by Q4',
        effects: { velocity: +10, happiness: -10 }
      },
      {
        id: 'pretend-migrate',
        label: 'Create Migration Theater',
        description: 'Rename some files and hope for the best',
        effects: { velocity: +10, morale: -5, techDebt: +8 }
      }
    ]
  },

  {
    id: 'legendary-jira',
    title: 'The Ancient Jira Artifact',
    scenario: 'A Jira ticket from the Before Times has awakened from its slumber. Created in 2018, assigned to "Sarah from QA" who left for Google three years ago. The description reads only: "fix the thing".',
    icon: '🎫',
    rarity: 'common',
    theme: 'mystical',
    choices: [
      {
        id: 'close-ticket',
        label: 'Execute Order Won\'t-Fix',
        description: 'Some mysteries are meant to remain unsolved',
        effects: { velocity: +10, morale: +3 }
      },
      {
        id: 'research-ticket',
        label: 'Conduct Archaeological Dig',
        description: 'Channel your inner Indiana Jones through Git history',
        effects: { velocity: -10, happiness: +10, techDebt: -3 }
      },
      {
        id: 'assign-intern',
        label: 'Sacrifice the Junior Developer',
        description: 'Traditional hazing ritual',
        effects: { velocity: +3, morale: -3 }
      }
    ]
  },

  {
    id: 'manager-reorg',
    title: 'The Great Org Chart Shuffle',
    scenario: 'You wake up to find the org chart has been restructured by the chaos gods. Your manager now reports to the intern you trained last month. The intern is 22 and has strong opinions about blockchain.',
    icon: '📊',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'accept-reorg',
        label: 'Bow to Your New Crypto Overlord',
        description: 'Adapt like a chameleon in a rainbow factory',
        effects: { morale: -10, velocity: +10, happiness: +5 }
      },
      {
        id: 'resist-reorg',
        label: 'Form the Old Guard Resistance',
        description: 'Vive la révolution!',
        effects: { morale: +10, happiness: -10 }
      },
      {
        id: 'ignore-reorg',
        label: 'Master the Art of Selective Blindness',
        description: 'What org chart? I see no org chart',
        effects: { velocity: +5, morale: +3 }
      }
    ]
  },

  {
    id: 'budget-freeze',
    title: 'The Great AWS Apocalypse',
    scenario: 'Finance has discovered your AWS bill exceeds the GDP of small nations. They\'ve frozen the cloud budget and demand you "optimize synergies" and "leverage cost efficiencies". Your production servers are literally on fire.',
    icon: '🧊',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'reduce-servers',
        label: 'Embrace the Potato Server Life',
        description: 'Run everything on a Raspberry Pi and prayer',
        effects: { techDebt: +20, happiness: -10, velocity: -5 }
      },
      {
        id: 'negotiate-budget',
        label: 'Channel Your Inner Diplomat',
        description: 'Explain why uptime is actually important',
        effects: { velocity: -10, morale: +10, happiness: +8 }
      },
      {
        id: 'blame-dev-tools',
        label: 'Sacrifice the IntelliJ Licenses',
        description: 'Throw expensive tools under the bus',
        effects: { morale: -5, velocity: +10 }
      }
    ]
  },

  {
    id: 'okr-alignment',
    title: 'The OKR Alignment Ceremony',
    scenario: 'The Business Shamans demand perfect alignment between your humble bug fixes and the Sacred Quarterly Objectives. Every semicolon must contribute to measurable key results. Even your bathroom breaks need KPIs.',
    icon: '🎯',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'do-alignment',
        label: 'Achieve Perfect Corporate Harmony',
        description: 'Map every keystroke to business value',
        effects: { velocity: -10, happiness: +10 }
      },
      {
        id: 'fake-alignment',
        label: 'Deploy Bureaucratic Illusion Magic',
        description: 'Create documents that look important',
        effects: { velocity: +5, morale: -3 }
      },
      {
        id: 'push-back-okr',
        label: 'Rebel Against the Machine',
        description: 'Defend the sacred art of actual coding',
        effects: { happiness: -15, morale: +10 }
      }
    ]
  },

  {
    id: 'analytics-crisis',
    title: 'The Dashboard Deception',
    scenario: 'Your analytics dashboard has achieved sentience and is now lying to everyone. User count shows 150% growth while revenue shows 80% decline. The charts are creating impossible geometries. Reality is breaking down.',
    icon: '📈',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'rebuild-analytics',
        label: 'Rebuild the Truth Engine',
        description: 'Restore order to the chaos of numbers',
        effects: { velocity: -20, happiness: +10, techDebt: -10 }
      },
      {
        id: 'ignore-analytics',
        label: 'Trust Your Gut Like a Caveman',
        description: 'Numbers are for people who lack intuition',
        effects: { velocity: +10, happiness: -5 }
      },
      {
        id: 'screenshot-reports',
        label: 'Master the Ancient Art of Chart Photography',
        description: 'Static images can\'t lie if you crop them right',
        effects: { velocity: +3, morale: -5 }
      }
    ]
  },

  {
    id: 'coffee-machine',
    title: 'Coffee Machine Broken',
    scenario: 'The coffee machine stopped working. Productivity plummets. Morale in free fall.',
    icon: '☕',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'fix-coffee',
        label: 'Emergency Coffee Machine Repair',
        description: 'Priority zero incident',
        effects: { velocity: -5, morale: +10 }
      },
      {
        id: 'ignore-coffee',
        label: 'Ignore the Crisis',
        description: 'Let them drink water',
        effects: { morale: -15, velocity: -8 }
      },
      {
        id: 'tea-replacement',
        label: 'Replace with Premium Tea',
        description: 'Sophisticated alternative',
        effects: { happiness: +5, morale: -5 }
      }
    ]
  },

  {
    id: 'recruitment-candidate',
    title: 'Recruitment Candidate',
    scenario: 'A promising candidate appears for interview. They want 40% above budget and remote work.',
    icon: '👥',
    rarity: 'common',
    theme: 'agile',
    choices: [
      {
        id: 'hire-quickly',
        label: 'Hire Quickly Before They Leave',
        description: 'Desperate times',
        effects: { velocity: +10, morale: -10, happiness: -5 }
      },
      {
        id: 'evaluate-carefully',
        label: 'Thorough Evaluation Process',
        description: 'Due diligence',
        effects: { velocity: -10, morale: +10 }
      },
      {
        id: 'leetcode-test',
        label: 'Give Them LeetCode Problems',
        description: 'Traditional hazing',
        effects: { happiness: +10, morale: -3 }
      }
    ]
  },

  {
    id: 'monorepo-merge',
    title: 'Monorepo Merge',
    scenario: 'Attempting to merge all 15 repositories into one glorious monorepo. Git history will be... interesting.',
    icon: '📁',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'attempt-merge',
        label: 'YOLO Full Merge',
        description: 'Courage over caution',
        effects: { velocity: -20, techDebt: +20 },
        ritual: {
          chance: 0.3,
          onFailure: { velocity: -30, techDebt: +35, morale: -15 },
          failureMessage: 'Git history explodes. Senior developers are found crying.'
        }
      },
      {
        id: 'delay-merge',
        label: 'Postpone Until Q4',
        description: 'Strategic delay',
        effects: { velocity: +10, happiness: -10 }
      },
      {
        id: 'hire-guru',
        label: 'Hire Git Guru Consultant',
        description: 'Outsource the pain',
        effects: { morale: -10, happiness: +5, velocity: -5 }
      }
    ]
  },

  {
    id: 'api-contract-break',
    title: 'API Contract Break',
    scenario: 'A downstream service breaks API compatibility. Your integration is now returning 418 I\'m a teapot.',
    icon: '🔌',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'patch-quickly',
        label: 'Quick Patch Fix',
        description: 'Band-aid solution',
        effects: { velocity: +10, techDebt: +10 }
      },
      {
        id: 'refactor-integration',
        label: 'Proper Integration Refactor',
        description: 'Do it right',
        effects: { velocity: -15, techDebt: -10, morale: +10 }
      },
      {
        id: 'ignore-break',
        label: 'Ignore Until Users Complain',
        description: 'Let it burn',
        effects: { velocity: +5, happiness: -10 }
      }
    ]
  },

  {
    id: 'pagerduty-hell',
    title: 'PagerDuty Hell',
    scenario: '5am, alerts everywhere. The monitoring system is monitoring the monitoring system monitoring itself.',
    icon: '🚨',
    rarity: 'common',
    theme: 'chaos',
    choices: [
      {
        id: 'wake-ops',
        label: 'Wake Up the Ops Team',
        description: 'Share the misery',
        effects: { velocity: +10, morale: -15 }
      },
      {
        id: 'silence-alarms',
        label: 'Silence All Alarms',
        description: 'Peace through ignorance',
        effects: { techDebt: +20, morale: +5 }
      },
      {
        id: 'timezone-excuse',
        label: 'Blame Different Time Zones',
        description: 'Geographic deflection',
        effects: { happiness: -10, velocity: +3 }
      }
    ]
  },

  {
    id: 'vendor-lockin',
    title: 'Vendor Lock-in',
    scenario: 'That SaaS tool just tripled its price. You\'re now paying more for analytics than your developers\' salaries.',
    icon: '🔒',
    rarity: 'rare',
    theme: 'chaos',
    choices: [
      {
        id: 'migrate-vendor',
        label: 'Migrate to Alternative',
        description: 'Freedom ain\'t free',
        effects: { velocity: -20, morale: +10, techDebt: +5 }
      },
      {
        id: 'accept-price',
        label: 'Accept the New Pricing',
        description: 'Bend the knee',
        effects: { happiness: -15, velocity: +10 }
      },
      {
        id: 'build-own',
        label: 'Build Your Own Version',
        description: 'NIH syndrome activated',
        effects: { velocity: -20, techDebt: +20, morale: +5 }
      }
    ]
  },

  {
    id: 'gamified-retro',
    title: 'Gamified Retrospective',
    scenario: 'Someone suggests playing Agile Shaman during the retrospective. Meta levels are dangerously high.',
    icon: '🎮',
    rarity: 'legendary',
    theme: 'mystical',
    choices: [
      {
        id: 'embrace-meta',
        label: 'Embrace the Meta',
        description: 'Recursive improvement',
        effects: { morale: +10, velocity: -5 }
      },
      {
        id: 'resist-meta',
        label: 'Resist the Gamification',
        description: 'Stay grounded',
        effects: { morale: -10, velocity: +5 }
      },
      {
        id: 'declare-meta',
        label: 'Declare Fourth Wall Break',
        description: 'Acknowledge the simulation',
        effects: { morale: +15, happiness: +10, velocity: +5 }
      }
    ]
  },

  {
    id: 'ai-consultant',
    title: 'The Silicon Oracle Awakens',
    scenario: 'An AI consultant has joined your team to "optimize synergistic delivery patterns." It immediately suggests rewriting everything in Rust, implementing blockchain, and replacing all humans with TypeScript interfaces.',
    icon: '🤖',
    rarity: 'common',
    theme: 'mystical',
    choices: [
      {
        id: 'trust-ai',
        label: 'Submit to Our New Silicon Overlord',
        description: 'All hail the algorithmic master race',
        effects: { velocity: +10, techDebt: +5 }
      },
      {
        id: 'mock-ai',
        label: 'Mock the False Prophet',
        description: 'Assert human superiority through sarcasm',
        effects: { morale: +10, happiness: -10 }
      },
      {
        id: 'ai-standups',
        label: 'Let It Run Daily Standups',
        description: 'Finally, someone worse at meetings than humans',
        effects: { velocity: +5, morale: -5, happiness: +8 }
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
  // Create a clean deck without duplicates, excluding played cards
  const availableCards = MYSTICAL_DECK.filter(card => !excludeIds.includes(card.id));
  
  if (availableCards.length === 0) {
    // If all cards have been played, reset the exclusion list for variety
    console.log('All cards played, resetting deck for variety');
    return MYSTICAL_DECK.slice(0, handSize).sort(() => Math.random() - 0.5);
  }
  
  // Shuffle available cards and take the requested hand size
  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  const hand = shuffled.slice(0, handSize);
  
  // Debug logging
  console.log(`Drawing ${handSize} cards:`, hand.map(c => c.id));
  console.log(`Excluded ${excludeIds.length} cards:`, excludeIds);
  console.log(`Available cards remaining:`, availableCards.length - handSize);
  
  return hand;
};
