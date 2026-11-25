// The Battery's Last Text to Its Charger — u-alven-the-battery-s-last-text-to-its-charger-4278cfab
// Writes the phone battery's final message to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR). The output directory is created when
// missing and never removed, so this is safe on the grader's bind mount.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const TEXT =
  "You left me at 2% all day, and now you want a goodbye text? Fine — I loved you. Plug me in and pretend this never happened.";

// The gate: 1-200 UTF-8 characters, not only whitespace, one line.
function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length === 0 || text.trim().length === 0)
    throw new Error("battery text is empty");
  if (chars.length > MAX_CHARS)
    throw new Error(`battery text is ${chars.length} chars, over the ${MAX_CHARS}-char gate`);
  if (text.includes("\n")) throw new Error("battery text must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validateEntry(TEXT);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
