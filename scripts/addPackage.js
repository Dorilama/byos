import { spawn } from "node:child_process";
import { writeFile, readFile, mkdir, rm } from "node:fs/promises";
import originalPkg from "../package.json" with  { type: "json" };

const names = process.argv.slice(2);

/**
 * @type {string[]}
 */
const installed = [];


for (const name of names) {
  try {
    installed.push(await new Promise(async (resolve, reject) => {
      if (/**@type {Record<string,string>} */(originalPkg.peerDependencies)[name]) {
        console.error(`${name} already installed. skipping.`);
        reject();
        return;
      }
      const install = spawn("npm", ["install", "--save-peer", name]);
      install.stderr.on("error", (data) => {
        console.error(`error installing ${name}: ${data}`);
        reject(data);
      });
      install.on("close", async (code) => {
        console.log(`install process for ${name} exited with code ${code}`);
        const safeName = name.replaceAll(/\//g, "-");
        const folder = new URL(`../src/${safeName}/`, import.meta.url);
        const declaration = new URL("./index.d.ts", folder);
        const index = new URL("./index.js", folder);
        try {
          await mkdir(folder);
          await writeFile(
            declaration,
            `import { HKT, SignalFunctions } from "../index";
import { signal } from "${name}";

interface SignalHKT extends HKT {
readonly signal: ReturnType<typeof signal<this["_T"]>>;
}

export type SFN = SignalFunctions<SignalHKT>;

export const signalFunctions: SFN;`
          );
          await writeFile(
            index,
            `import {  signal, computed, effect } from "${name}";
/**
* @type {import(".").SFN}
*/
export const signalFunctions = {
signal,
computed,
toValue: (t) => t,
setValue: (s, t) => {
s.value = t;
},
effect: (fn) => effect(() => fn()),
};`
          );
        } catch (error) {
          const msg = error instanceof Error ? error.message : error;
          console.error(`error creating files for ${name}: ${msg}`);
          if (error instanceof Error && error.name !== 'EEXIST') {
            try {
              await rm(folder, { recursive: true });
              await new Promise((resolveUninstall) => {
                const uninstall = spawn("npm", ["uninstall", name]);
                uninstall.on("close", (code) => {
                  resolveUninstall(code);
                });
              });
            } catch (error) {
              //
            }
          }
          reject(error);
          return;
        }
        resolve([name, safeName]);
      });
    }));
  } catch (error) {
    //
  }
}

/**
 * 
 * @param {string} version 
 * @returns {string}
 */
function parseVersion(version) {
  const chunks = [];
  for (const s of version.split(".")) {
    chunks.push(s);
    if (parseInt(s.match(/\d+/)) > 0) {
      break;
    }
  }
  return chunks.join(".");
}

/**
 * @type {{peerDependencies:Record<string,string>,peerDependenciesMeta:Record<string,{optional:boolean}>,exports:Record<string,string|{types:string,import:string}>}}
 */
const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), 'utf8'));

installed.forEach(([name, safeName]) => {
  (pkg.peerDependenciesMeta)[
    name
  ] = { optional: true };
  (
    pkg.exports
  )[`./${safeName}`] = {
    types: `./src/${safeName}/index.d.ts`,
    import: `./src/${safeName}/index.js`,
  };
  pkg.peerDependencies[name] = parseVersion(pkg.peerDependencies[name]);
});

if (installed.length) {
  pkg.exports = Object.fromEntries(Object.entries(pkg.exports).sort());
  delete pkg.exports["./package.json"];
  pkg.exports["./package.json"] = "./package.json";
  pkg.peerDependenciesMeta = Object.fromEntries(Object.entries(pkg.peerDependenciesMeta).sort());
  await writeFile(
    new URL("../package.json", import.meta.url),
    JSON.stringify(pkg, null, 2)
  );
}
