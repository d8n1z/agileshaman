# Agile Shaman Satirical Quotes Collection

This document lists all the satirical quotes used throughout the Agile Shaman game, organized by the different roles and stakeholders in software projects.

## Overview

The quotes are stored in `src/data/quotes.ts` and used in both:
- **Landing Page**: Floating background quotes (simple text)
- **In-Game**: Rotating quotes with attributions in the left panel

## Quotes by Category

### 👨‍💻 Developers (16 quotes)
- "We'll fix it in the next sprint." — *Famous last words*
- "It works on my machine." — *The developer's eternal defense*
- "Just a quick hotfix." — *Production: "Hold my beer"*
- "The code is self-documenting." — *Future developer: "What does this do?"*
- "We'll refactor it later." — *Technical debt: "Later is now"*
- "This is a temporary solution." — *5 years later: Still temporary*
- "It's probably a caching issue." — *The universal developer excuse*
- "Let's just copy-paste from Stack Overflow." — *Original thinking has left the chat*
- "It's just a small CSS change." — *Before the 6-hour debugging session*
- "We'll clean this up later." — *Legacy code: "Am I a joke to you?"*
- "We'll add tests after the deadline." — *QA team: "Am I invisible?"*
- "We're following best practices." — *Stack Overflow: "Hold my upvotes"*
- "We'll optimize it later." — *Performance: "Later never comes"*
- "Let's use the latest framework." — *Legacy code: "Here we go again"*
- "The code review can wait." — *Future self: "Why did I write this?"*
- "We don't need error handling." — *Errors: "Challenge accepted"*

### 📋 Product Managers (8 quotes)
- "Can we make it pop more?" — *Designer: "What does that even mean?"*
- "This should be a simple change." — *Developer: "Famous last words"*
- "Let's pivot to blockchain." — *Buzzword bingo champion*
- "We need this yesterday." — *Time travel not included in sprint*
- "Just make it like Uber, but for cats." — *Innovation at its finest*
- "This will only take 2 story points." — *Narrator: It took 3 sprints*
- "We can definitely finish this sprint." — *Scope creep has entered the chat*
- "No blockers, everything's fine." — *Narrator: Everything was not fine*
- "The client will never use that feature." — *Client: Uses it immediately*
- "The user story is clear enough." — *Developer: "What does 'user-friendly' mean?"*

### 🎨 Designers (5 quotes)
- "Can you move it 2 pixels to the left?" — *Pixel-perfect perfectionism*
- "The font needs more personality." — *Comic Sans has entered the chat*
- "This button doesn't spark joy." — *Marie Kondo meets UI design*
- "Let's make the logo bigger." — *Client feedback classic*
- "Users love infinite scroll." — *Productivity has left the chat*

### 🧪 QA/Testers (6 quotes)
- "It works as designed." — *Design: "That's not what I meant"*
- "I can't reproduce this bug." — *User: "It happens every time"*
- "Have you tried clearing your cache?" — *IT support's greatest hits*
- "This is expected behavior." — *User experience has left the chat*
- "Works fine in our test environment." — *Production: "Hold my beer"*
- "The QA team will catch it." — *QA: "We're not magicians"*
- "This bug only happens in edge cases." — *Users: "We are the edge case"*

### 💼 Clients/Stakeholders (6 quotes)
- "Can you make it more Web 2.0?" — *Time traveler from 2005*
- "My nephew could build this for free." — *Every freelancer's nightmare*
- "Why does it take so long?" — *Software development mysteries*
- "Can we add a chatbot?" — *AI will solve everything*
- "Make it viral." — *Marketing magic requested*
- "The client changed their mind again." — *Requirements: "Stability is overrated"*

### 👔 Management (8 quotes)
- "We need more synergy." — *Corporate buzzword bingo*
- "Let's circle back on this." — *Translation: Never*
- "Can we leverage our core competencies?" — *Consultant speak activated*
- "We're disrupting the industry." — *Startup pitch bingo*
- "Think outside the box." — *Innovation on demand*
- "We need more meetings to discuss this." — *Productivity has left the chat*
- "We don't have time to do it right." — *But we'll have time to do it twice*
- "We're being agile and adaptive." — *Translation: We have no plan*
- "Let's move fast and break things." — *Production: "Mission accomplished"*
- "We need to be more data-driven." — *Data: "You're ignoring me anyway"*

### 💰 Sales (5 quotes)
- "The client wants everything." — *Scope creep has entered the chat*
- "We already sold this feature." — *Development: "News to us"*
- "It's just a small customization." — *Famous last words*
- "They'll pay extra for rush delivery." — *Quality has left the chat*
- "The demo worked perfectly." — *In a controlled environment*

### 🔧 DevOps/IT (6 quotes)
- "Have you tried turning it off and on?" — *IT support's greatest hits*
- "It's probably a network issue." — *When in doubt, blame the network*
- "The server is at 99% capacity." — *That 1% is doing heavy lifting*
- "We're out of disk space again." — *Data grows faster than storage*
- "The backup failed, but it's fine." — *Famous last words*
- "The staging environment is down again." — *Production: "I'm your staging now"*
- "We don't need a staging environment." — *Production IS the staging environment*
- "The database can handle the load." — *Database: "I'm about to end this man's career"*

### 📢 Marketing (6 quotes)
- "We need more buzzwords." — *Synergistic paradigm shifts*
- "Can we make it go viral?" — *Virality on demand*
- "This will revolutionize everything." — *Revolution as a service*
- "We're the Airbnb of software." — *Startup pitch bingo*
- "Growth hacking is the answer." — *Hack all the things*
- "It's not a bug, it's a feature." — *Marketing's favorite developer excuse*

## Usage

### In Code
```typescript
import { SATIRICAL_QUOTES, FLOATING_QUOTES, getQuotesByCategory } from '../data/quotes';

// For simple text display (landing page)
const simpleQuotes = FLOATING_QUOTES;

// For quotes with attributions (in-game)
const quotesWithAttribution = SATIRICAL_QUOTES;

// Get quotes by specific category
const devQuotes = getQuotesByCategory('Developers');
```

### Adding New Quotes
To add new quotes, edit `src/data/quotes.ts` and add them to the `SATIRICAL_QUOTES` array with the following structure:

```typescript
{
  quote: "Your satirical quote here.",
  attribution: "Witty response or context",
  category: "Appropriate Role/Category"
}
```

## Statistics
- **Total Quotes**: 90+ quotes
- **Categories**: 8 different stakeholder groups
- **Coverage**: Represents the entire software project ecosystem
- **Tone**: Satirical but inclusive, poking fun at universal project experiences

## Philosophy
These quotes capture the universal experiences, frustrations, and humor found in software projects. Rather than targeting any single group, they celebrate the shared absurdity that brings all project stakeholders together in mutual understanding (and occasional despair).

Every role has their quirks, every stakeholder has their blind spots, and every project has its moments of beautiful chaos. These quotes are a loving tribute to the wonderful madness of building software together.
