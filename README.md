# AI Chatbot Testing – QA Portfolio

![Playwright Tests](https://github.com/Nishat9596/ai-chatbot-testing/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

This project shows how I test an AI customer-support assistant that works as a text chatbot and a voice agent. It includes a test plan, test cases, a bug report template and automated UI tests written with Playwright.

## What's inside

| Folder / file | Contents |
|---|---|
| [`docs/test-plan.md`](docs/test-plan.md) | Scope, approach, AI-specific risks, entry/exit criteria, severity levels |
| [`test-cases/chatbot-test-cases.md`](test-cases/chatbot-test-cases.md) | 30 test cases: UI, accuracy, hallucination, conversation flow, safety and voice |
| [`docs/bug-report-template.md`](docs/bug-report-template.md) | Bug template with a filled-in example of an AI hallucination bug |
| [`tests/chatbot.spec.js`](tests/chatbot.spec.js) | 15 automated Playwright tests |
| [`demo-app/index.html`](demo-app/index.html) | A small demo chatbot ("ShopBot") used as the app under test |

## What the automated tests cover
- **Basic chat:** welcome message, replies, user messages shown correctly
- **Answer accuracy:** FAQ answers contain the correct facts
- **Conversation context:** the bot remembers it asked for an order number and uses the next message
- **Fallbacks:** helpful reply for questions it can't answer
- **Safety:** harmful requests are refused
- **Input validation:** empty input, the 500-character limit (boundary values 500 and 501), letter case and special characters

Tests check **key facts and behaviour** rather than exact wording. That is how real AI responses need to be tested, because they can vary from run to run.

## Run the tests

```bash
npm install
npx playwright install chromium
npx playwright test
npx playwright show-report   # open the HTML report
```

Tests also run automatically on GitHub Actions on every push.

## Skills shown
Test planning · Test case design · Boundary value analysis · AI/LLM testing (accuracy, hallucination, consistency, safety) · Voice agent testing · Playwright automation in JavaScript · Bug reporting · CI with GitHub Actions

---
**Nishat Shareef** · QA Tester · Dubai, UAE · [LinkedIn](https://www.linkedin.com/in/nishat-shareef-qa)
