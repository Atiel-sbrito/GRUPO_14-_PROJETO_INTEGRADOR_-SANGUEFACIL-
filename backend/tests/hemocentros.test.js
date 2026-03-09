import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, rm } from "node:fs/promises";

import { createDb } from "../src/db.js";
import { createApp } from "../src/app.js";

async function setupServer() {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "sanguefacil-test-"));
  const dbPath = path.join(tempDir, "test.db");
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
    await db.close();
    await rm(tempDir, { recursive: true, force: true });
  }

  return { baseUrl, cleanup };
}

test("GET /api/hemocentros retorna lista de hemocentros", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const response = await fetch(`${baseUrl}/api/hemocentros`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.ok(Array.isArray(body));
    assert.ok(body.length >= 1);

    assert.equal(typeof body[0].id, "number");
    assert.equal(typeof body[0].nome, "string");
    assert.equal(typeof body[0].distancia, "string");
  } finally {
    await cleanup();
  }
});

test("GET /api/hemocentros inclui hemocentro central da seed", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const response = await fetch(`${baseUrl}/api/hemocentros`);
    assert.equal(response.status, 200);

    const body = await response.json();
    const nomes = body.map((item) => item.nome);

    assert.ok(nomes.includes("Hemocentro Central Sao Paulo"));
  } finally {
    await cleanup();
  }
});
