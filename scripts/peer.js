import pkg from "../package.json" with  { type: "json" };
import { spawn } from "node:child_process";

const peer = Object.entries(pkg.peerDependencies).map(
  ([name, version]) => `${name}@${version}`
);

const install = spawn("npm", ["install", "--save=false", ...peer]);

install.stderr.on("install", (data) => {
  console.error(`install error: ${data}`);
});

install.on("close", (code) => {
  console.log(`install process exited with code ${code}`);
});
