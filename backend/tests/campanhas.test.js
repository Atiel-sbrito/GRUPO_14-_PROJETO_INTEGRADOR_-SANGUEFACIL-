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

test("POST /api/campanhas cria campanha com sucesso", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const response = await fetch(`${baseUrl}/api/campanhas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Urgente: Sangue O- necessário",
        tipo_sanguineo: "O-",
        descricao: "Paciente em cirurgia de emergência necessita doação imediata",
      }),
    });

    assert.equal(response.status, 201);
    const body = await response.json();

    assert.ok(body.id);
    assert.equal(body.titulo, "Urgente: Sangue O- necessário");
    assert.equal(body.tipo_sanguineo, "O-");
    assert.ok(body.created_at);
  } finally {
    await cleanup();
  }
});

test("POST /api/campanhas retorna 400 para payload invalido", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const response = await fetch(`${baseUrl}/api/campanhas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "",
        tipo_sanguineo: "",
      }),
    });

    assert.equal(response.status, 400);
    const body = await response.json();
    assert.ok(body.error.includes("titulo"));
  } finally {
    await cleanup();
  }
});

test("GET /api/campanhas retorna lista de campanhas", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    // Criar uma campanha primeiro
    await fetch(`${baseUrl}/api/campanhas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Campanha A+",
        tipo_sanguineo: "A+",
        descricao: "Estoques baixos de A+",
      }),
    });

    const response = await fetch(`${baseUrl}/api/campanhas`);
    assert.strictEqual(response.status, 200);

    const body = await response.json();
    assert.ok(Array.isArray(body), "Deve retornar um array");
    assert.ok(body.length >= 1, "Deve conter pelo menos a campanha criada");
    
    const primeira = body[0];
    assert.ok(primeira.id, "Cada campanha deve ter um id");
    assert.ok(primeira.titulo, "Cada campanha deve ter titulo");
    assert.ok(primeira.tipo_sanguineo, "Cada campanha deve ter tipo_sanguineo");
  } finally {
    await cleanup();
  }
});
