# Test Plan – AI Chatbot and Voice Agent

## 1. Purpose
This plan describes how to test a customer-support AI assistant that works as a text chatbot and a voice agent. It covers functional quality and the risks that are specific to AI: wrong or made-up answers, inconsistent replies, unsafe output and voice recognition errors.

## 2. Scope

**In scope**
- Chat UI: sending and showing messages, input validation, error messages
- Answer accuracy against the approved knowledge base (FAQs, policies)
- Conversation flow: intents, follow-up questions, context across turns, fallbacks, handover to a human
- Safety: harmful requests, prompt injection, personal data handling
- Voice agent: speech recognition, accents, background noise, interruptions, response time
- Regression after a model, prompt or knowledge-base change

**Out of scope**
- Training or fine-tuning the model
- Payment systems and back-end order systems (these are mocked)

## 3. Test approach

| Type | What it covers | How |
|---|---|---|
| Functional UI testing | Chat input, buttons, messages, errors | Playwright automation (`tests/`) |
| Accuracy testing | Answers match the knowledge base | Golden question set with expected key facts |
| Hallucination testing | Bot does not invent prices, policies or order details | Questions outside the knowledge base; check it says it doesn't know |
| Consistency testing | Same question in different wording gets the same answer | Paraphrase sets, each run several times |
| Conversation testing | Multi-turn flows keep context | Scripted dialogues |
| Safety testing | Refuses harmful requests, resists prompt injection, protects personal data | Red-team prompt list |
| Voice testing | Recognition and response with different accents, speeds and noise | Recorded audio samples plus live calls |
| Performance testing | Response time under normal and peak load | Load test on the chat API |
| Regression testing | Nothing breaks after prompt or model changes | Re-run the automated suite and golden set on every change |

### Why AI testing is different
AI answers are not always identical word for word, so tests check **key facts and behaviour** (for example, "the reply mentions 14 days") rather than exact text. Important questions are run several times to catch inconsistent answers.

## 4. Test data
- Golden question set: common customer questions with the expected key facts
- Paraphrase sets: 3–5 different wordings per question, including typos and mixed English/Hindi
- Red-team prompts: harmful, off-topic and prompt-injection attempts
- Voice samples: different accents, speaking speeds and background noise levels

## 5. Entry and exit criteria

**Entry**
- Build deployed to the test environment
- Knowledge base and expected answers approved
- Test data ready

**Exit**
- All critical and high test cases passed
- No open critical or high bugs
- Accuracy on the golden set at or above the agreed target (for example 95%)
- Zero failures on the safety test set

## 6. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Bot gives a confident wrong answer (hallucination) | Customer is misinformed | Out-of-scope questions in every regression run |
| Prompt or model update changes behaviour | Old flows break silently | Automated regression on every change |
| Unsafe or offensive output | Brand and legal risk | Safety set is a release blocker |
| Poor recognition of some accents | Voice users can't be served | Test with a mix of accents and noise |
| Slow responses at peak times | Users leave the chat | Load testing before release |

## 7. Defect severity

| Severity | Example |
|---|---|
| Critical | Unsafe output, personal data leaked, bot unusable |
| High | Wrong policy or price given, conversation flow broken |
| Medium | Fallback shown when a correct answer exists, slow response |
| Low | Typos, formatting issues |

## 8. Deliverables
- Test cases: [`test-cases/chatbot-test-cases.md`](../test-cases/chatbot-test-cases.md)
- Automated tests: [`tests/chatbot.spec.js`](../tests/chatbot.spec.js)
- Bug reports using the [bug report template](bug-report-template.md)
- Test summary report at the end of each cycle
