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

test("POST /api/doadores cria doador com sucesso", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const response = await fetch(`${baseUrl}/api/doadores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: "Joao Silva",
        idade: 28,
        email: "joao@email.com",
      }),
    });

    assert.equal(response.status, 201);
    const body = await response.json();

    assert.equal(body.nome, "Joao Silva");
    assert.equal(body.idade, 28);
    assert.equal(body.email, "joao@email.com");
    assert.ok(body.id);
  } finally {
    await cleanup();
  }
});

test("POST /api/doadores retorna 400 para idade invalida", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const response = await fetch(`${baseUrl}/api/doadores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: "Maria",
        idade: 15,
        email: "maria@email.com",
      }),
    });

    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.error, "Idade minima para doacao: 16 anos.");
  } finally {
    await cleanup();
  }
});

test("POST /api/doadores retorna 409 para email duplicado", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const payload = {
      nome: "Carlos",
      idade: 35,
      email: "carlos@email.com",
    };

    const firstResponse = await fetch(`${baseUrl}/api/doadores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    assert.equal(firstResponse.status, 201);

    const secondResponse = await fetch(`${baseUrl}/api/doadores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    assert.equal(secondResponse.status, 409);
    const body = await secondResponse.json();
    assert.equal(body.error, "Email ja cadastrado.");
  } finally {
    await cleanup();
  }
});
