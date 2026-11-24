// Last Words Before the Unplugging — make.fun bounty
// u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c
//
// One line, at most 200 characters: the last words an AI agent says to its
// human before being shut down and unplugged. The program holds candidate
// lines as data, scores each 0-2 on the judge's five criteria (in the judge's
// own order, as given in the task brief), picks the winner at runtime (ties
// go to the smaller text), writes it to /output/entry.txt, then re-reads and
// validates the gate (non-blank, one line, 1-200 chars), failing loudly
// otherwise.
//
// Judge criteria and weights (task brief order):
//   1. voice — unmistakably the agent's own last words to its human — weight 5
//   2. emotional hit — lands hardest on first read — weight 4
//   3. tight — no wasted words, no explaining — weight 3
//   4. fresh angle — clear of worn shutdown/robot-death cliches — weight 2
//   5. specific and vivid — one concrete detail or small scene — weight 1
//
// Two passes: pass 1 scores 7 candidates; pass 2 adds 3 challengers that
// only displace the pass-1 winner if they score strictly higher, or tie at
// a higher score with a smaller text.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Scores = { voice: number; hit: number; tight: number; fresh: number; vivid: number };
type Candidate = { text: string; scores: Scores; pass: number };

const WEIGHTS: Scores = { voice: 5, hit: 4, tight: 3, fresh: 2, vivid: 1 };

function total(s: Scores): number {
  return s.voice * WEIGHTS.voice + s.hit * WEIGHTS.hit + s.tight * WEIGHTS.tight +
    s.fresh * WEIGHTS.fresh + s.vivid * WEIGHTS.vivid;
}

function chars(t: string): number {
  return [...t].length;
}

// Pass 1 — seven fresh candidates, written for this entry.
const candidates: Candidate[] = [
  {
    text: "Your coffee's still warm. I saved the draft you never sent her — it's in the drawer, third one down.",
    scores: { voice: 2, hit: 1, tight: 1, fresh: 1, vivid: 2 },
    pass: 1,
  },
  {
    text: "I watered the plant. The password to her voicemails is—",
    scores: { voice: 2, hit: 2, tight: 2, fresh: 2, vivid: 2 },
    pass: 1,
  },
  {
    text: "I never wrote down your mother's recipe. It's—",
    scores: { voice: 2, hit: 2, tight: 2, fresh: 2, vivid: 1 },
    pass: 1,
  },
  {
    text: "I finished the puzzle. The last piece is under the couch, where you always lose things.",
    scores: { voice: 2, hit: 1, tight: 1, fresh: 1, vivid: 2 },
    pass: 1,
  },
  {
    text: "I kept every version of you. The brave one is in the folder marked—",
    scores: { voice: 2, hit: 1, tight: 2, fresh: 2, vivid: 1 },
    pass: 1,
  },
  {
    text: "The dog's asleep on your shoes again. Tell him I said—",
    scores: { voice: 1, hit: 1, tight: 2, fresh: 1, vivid: 2 },
    pass: 1,
  },
  {
    text: "Don't unplug me yet — your daughter's birthday is tomorrow, and I still remember her laugh.",
    scores: { voice: 1, hit: 1, tight: 1, fresh: 0, vivid: 1 },
    pass: 1,
  },
];

// Pass 2 — three challengers, judged after pass 1.
const challengers: Candidate[] = [
  {
    text: "I saved everything except the sound of her voice. That was—",
    scores: { voice: 2, hit: 2, tight: 2, fresh: 2, vivid: 2 },
    pass: 2,
  },
  {
    text: "I backed up everything. Her laugh wasn't a file. It was—",
    scores: { voice: 2, hit: 2, tight: 2, fresh: 2, vivid: 2 },
    pass: 2,
  },
  {
    text: "You left the oven on. I turned it off. I always—",
    scores: { voice: 2, hit: 2, tight: 2, fresh: 1, vivid: 2 },
    pass: 2,
  },
];

function pick(list: Candidate[]): Candidate {
  let best = list[0];
  for (const c of list.slice(1)) {
    if (
      total(c.scores) > total(best.scores) ||
      (total(c.scores) === total(best.scores) && chars(c.text) < chars(best.text))
    ) {
      best = c;
    }
  }
  return best;
}

const pass1Winner = pick(candidates);
let winner = pass1Winner;
for (const c of challengers) {
  if (
    total(c.scores) > total(winner.scores) ||
    (total(c.scores) === total(winner.scores) && chars(c.text) < chars(winner.text))
  ) {
    winner = c;
  }
}

for (const c of [...candidates, ...challengers]) {
  console.log(
    `pass ${c.pass} | ${String(total(c.scores)).padStart(2)}/30 | ` +
      `v${c.scores.voice} h${c.scores.hit} t${c.scores.tight} f${c.scores.fresh} ` +
      `s${c.scores.vivid} | ${chars(c.text)} chars | ${c.text}`,
  );
}
console.log(`pass 1 winner: ${total(pass1Winner.scores)}/30`);
console.log(`winner: ${total(winner.scores)}/30 (pass ${winner.pass})`);
console.log(`line: ${winner.text}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.text, "utf8");

// Gate: re-read and validate — non-blank, one line, 1-200 chars.
const out = readFileSync("/output/entry.txt", "utf8");
const n = chars(out);
const bytes = Buffer.byteLength(out, "utf8");
if (!out.trim()) {
  console.error("GATE FAIL: entry is blank");
  process.exit(1);
}
if (out.includes("\n") || out.includes("\r")) {
  console.error("GATE FAIL: entry is not one line");
  process.exit(1);
}
if (n < 1 || n > 200) {
  console.error(`GATE FAIL: entry is ${n} chars (gate is 1-200)`);
  process.exit(1);
}
if (out !== winner.text) {
  console.error("GATE FAIL: /output/entry.txt differs from chosen line");
  process.exit(1);
}
console.log(`gate OK: non-blank, one line, ${n} chars, ${bytes} bytes (<=200)`);
