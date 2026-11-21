import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The poem about permission: an agent holds the pen, waits, and the
// speaker gives the one word only they can give. Asking is easy;
// giving is the signature.
const POEM = `The agent held the pen above the page,
patient as winter light,
and waited.

I asked for the letter.
It wrote it — then stopped,
one word short of sending.

That word was mine.
Asking is easy.
Giving is the signature.`;

// Gate guard: the judge only accepts 1–280 Unicode code points.
if (POEM.length < 1 || POEM.length > 280) {
  throw new Error(`poem must be 1-280 characters, got ${POEM.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = `${outDir}/entry.txt`;
writeFileSync(dst, POEM, "utf8");
const written = readFileSync(dst, "utf8");
if (written !== POEM) {
  throw new Error("corrupt output: entry.txt bytes differ from the poem");
}
