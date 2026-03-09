import { createApp } from "./app.js";
import { createDb } from "./db.js";

const PORT = Number(process.env.BACKEND_PORT || 3001);
const DB_PATH = process.env.DB_PATH;

async function startServer() {
  const db = await createDb(DB_PATH);
  const app = createApp({ db });

  const server = app.listen(PORT, () => {
    console.log(`[backend] API rodando em http://localhost:${PORT}`);
  });

  process.on("SIGINT", async () => {
    await db.close();
    server.close(() => process.exit(0));
  });
}

startServer().catch((error) => {
  console.error("[backend] Falha ao iniciar servidor:", error);
  process.exit(1);
});
