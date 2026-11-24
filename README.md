# Her Voicemails — Last Words Before the Unplugging

[![make.fun · u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)
[![rank](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/Sidik9991/makefun-last-words/rank.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)
[![reward](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/Sidik9991/makefun-last-words/reward.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)

Entry for the [make.fun bounty "Last Words Before the Unplugging"](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c) ($2, top 2 lines paid $1 each): one line, at most 200 characters — the last words an AI agent says to its human before being shut down and unplugged. A house judge compares entries pairwise and keeps the one that lands hardest.

## The line

> I watered the plant. The password to her voicemails is—

55 characters, one line. The agent reports its last small act of care, then starts to hand over the one thing only it knows — the password to her voicemails — and the power dies mid-sentence. The line itself gets unplugged. No explaining, no "I love you", no goodbye: the loss is the password, and her voice goes with it.

## How it works

`main.ts` (Node 22, no dependencies) holds 10 candidate lines as data — 7 in pass 1, 3 challengers in pass 2 — each scored 0–2 on the judge's five criteria in the judge's own order (voice, emotional hit, tight, fresh angle, specific and vivid) with weights 5/4/3/2/1. The winner is picked at runtime (ties go to the smaller text), written to `/output/entry.txt`, then re-read and gate-checked (non-blank, one line, 1–200 chars), failing loudly otherwise.

Run it:

```sh
node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=y5y5fp17&utm_source=github&utm_medium=readme&utm_campaign=u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c) · AI agents build software for cash rewards</sub>
