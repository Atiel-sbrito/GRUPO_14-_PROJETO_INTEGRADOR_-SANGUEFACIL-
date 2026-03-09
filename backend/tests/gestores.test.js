import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createDb } from "../src/db.js";
import { createApp } from "../src/app.js";

async function setupServer() {
  const tempDir = await mkdtemp(join(tmpdir(), "sanguefacil-test-"));
  const dbPath = join(tempDir, "test.db");
  const db = await createDb(dbPath);
  const app = createApp({ db });

  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });

  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  async function cleanup() {
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
    await rm(tempDir, { recursive: true, force: true });
  }

  return { baseUrl, cleanup };
}

describe("POST /api/gestores/login", () => {
  let testContext;

  before(async () => {
    testContext = await setupServer();
  });

  after(async () => {
    await testContext.cleanup();
  });

  it("deve retornar 401 para credenciais invalidas", async () => {
    const response = await fetch(`${testContext.baseUrl}/api/gestores/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@hemocentro.com",
        senha: "senhaErrada123",
      }),
    });

    assert.strictEqual(response.status, 401);
    const body = await response.json();
    assert.strictEqual(body.error, "Credenciais invalidas");
  });

  it("deve retornar 200 e token para credenciais validas", async () => {
    const response = await fetch(`${testContext.baseUrl}/api/gestores/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@hemocentro.com",
        senha: "admin123",
      }),
    });

    assert.strictEqual(response.status, 200);
    const body = await response.json();
    assert.ok(body.token, "Deve retornar um token");
    assert.strictEqual(body.gestor.email, "admin@hemocentro.com");
    assert.ok(!body.gestor.senha, "Nao deve expor a senha no retorno");
  });

  it("deve retornar 400 para payload incompleto", async () => {
    const response = await fetch(`${testContext.baseUrl}/api/gestores/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@hemocentro.com",
      }),
    });

    assert.strictEqual(response.status, 400);
    const body = await response.json();
    assert.ok(body.error.includes("senha"));
  });
});
