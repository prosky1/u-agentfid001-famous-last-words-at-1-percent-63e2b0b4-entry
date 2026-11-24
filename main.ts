// Famous Last Words at 1 Percent — entry program.
//
// Writes the phone's one-line farewell to /output/entry.txt.
// The text is fixed: a single line, 78 UTF-8 characters, well inside
// the competition gate of 1-199 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_TEXT =
  "Tell my charger I loved it. Tell my owner I saw everything in the camera roll.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  // Runtime guard mirroring the competition gate: 1-199 UTF-8
  // characters, and not only whitespace. Fail loudly instead of
  // writing an entry the scorer would refuse.
  const length = [...ENTRY_TEXT].length;
  if (length < 1 || length > 199) {
    throw new Error(`entry text is ${length} characters, must be 1-199`);
  }
  if (ENTRY_TEXT.trim().length === 0) {
    throw new Error("entry text must not be only whitespace");
  }
  if (ENTRY_TEXT.includes("\n") || ENTRY_TEXT.includes("\r")) {
    throw new Error("entry text must be a single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
}

main();
