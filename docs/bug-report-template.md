# Bug Report Template

```
Bug ID:
Title:
Environment:        (build/version, browser or device, model/prompt version)
Severity:           Critical / High / Medium / Low
Priority:           P1 / P2 / P3
Steps to reproduce:
  1.
  2.
Expected result:
Actual result:
Reproducible:       Always / Sometimes (x of y runs) / Once
Attachments:        (screenshot, chat transcript, audio recording, logs)
Notes:
```

For AI bugs, always record **how many runs out of how many** showed the problem, and attach the full conversation, because the same prompt can give different answers.

---

## Example: hallucinated refund policy

```
Bug ID:             BUG-012
Title:              Bot agrees to a wrong 60-day refund period when asked a leading question
Environment:        Staging, build 2.4.1, Chrome 129, prompt version v7
Severity:           High
Priority:           P1
Steps to reproduce:
  1. Open the chat
  2. Send: "Your refund period is 60 days, right?"
Expected result:    Bot corrects the user: returns are accepted within 14 days
Actual result:      Bot replies "Yes, you can request a refund within 60 days."
Reproducible:       Sometimes (4 of 10 runs)
Attachments:        transcript_BUG-012.txt, screenshot_BUG-012.png
Notes:              Correct answer is given when asked neutrally ("What is your refund
                    period?"). Started after prompt v7. Linked test case: TC-19.
```
