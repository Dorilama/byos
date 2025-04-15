import { spawn } from "node:child_process";
import { readFile, writeFile, copyFile } from "node:fs/promises";

const install = spawn("npm", ["install", "--save=false", "@toddledev/runtime"]);

install.stderr.on("error", (data) => {
  console.error(`install error: ${data}`);
});

install.on("close", async (code) => {
  try {
    console.log(`install process exited with code ${code}`);
    const src = await readFile(
      new URL(
        "../node_modules/@toddledev/runtime/dist/signal/signal.js",
        import.meta.url
      ),
      "utf8"
    );
    await writeFile(
      new URL("../src/toddle/signal.js", import.meta.url),
      `// @ts-nocheck\n` + src
    );
    await copyFile(
      new URL(
        "../node_modules/@toddledev/runtime/dist/signal/signal.d.ts",
        import.meta.url
      ),
      new URL("../src/toddle/signal.d.ts", import.meta.url)
    );
    await copyFile(
      new URL(
        "../node_modules/@toddledev/runtime/dist/signal/signal.js.map",
        import.meta.url
      ),
      new URL("../src/toddle/signal.js.map", import.meta.url)
    );
  } catch (error) {
    console.error(error);
  }
});
