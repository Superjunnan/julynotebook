import net from "node:net";
import { spawn } from "node:child_process";

const ROOT_CONFIG = "_config.yml,_config.local.yml";
const PORT_CANDIDATES = [4000, 4001, 4002, 4003];

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on("error", () => resolve(false));
    server.listen({ port }, () => {
      server.close(() => resolve(true));
    });
  });
}

async function pickPort() {
  for (const port of PORT_CANDIDATES) {
    if (await isPortAvailable(port)) return port;
  }
  throw new Error(`端口 ${PORT_CANDIDATES.join(", ")} 均已被占用，请先释放后重试。`);
}

async function main() {
  if (process.argv.includes("--help")) {
    console.log("用法：npm run admin");
    console.log("说明：若 4000 端口被占用，会自动切换到 4001-4003 中的可用端口。");
    return;
  }

  const port = await pickPort();
  if (port !== 4000) {
    console.log(`端口 4000 已被占用，已自动切换到 ${port}。`);
  }
  console.log(`Hexo Admin 即将运行在 http://localhost:${port}/admin/`);

  const child = spawn(
    "npx",
    ["hexo", "server", "-d", "-p", String(port), "--config", ROOT_CONFIG],
    {
      stdio: "inherit",
      shell: false,
      env: process.env,
    }
  );

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error("本地管理端启动失败：", error);
  process.exit(1);
});
