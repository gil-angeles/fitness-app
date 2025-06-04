import { spawn } from "child_process";

const ws = spawn("node", ["ws-server.js"], { stdio: "inherit", shell: true });
const dev = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });

ws.on("close", () => dev.kill("SIGINT"));
dev.on("close", () => ws.kill("SIGINT"));
