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

test("POST /api/agendamentos cria agendamento com sucesso", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const response = await fetch(`${baseUrl}/api/agendamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hemocentro: "Hemocentro Central Sao Paulo",
        data: "2026-03-20",
        horario: "09:30",
      }),
    });

    assert.equal(response.status, 201);
    const body = await response.json();

    assert.ok(body.id);
    assert.equal(body.hemocentro, "Hemocentro Central Sao Paulo");
    assert.equal(body.data, "2026-03-20");
    assert.equal(body.horario, "09:30");
  } finally {
    await cleanup();
  }
});

test("POST /api/agendamentos retorna 400 para payload invalido", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    const response = await fetch(`${baseUrl}/api/agendamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hemocentro: "",
        data: "",
        horario: "",
      }),
    });

    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.error, "Hemocentro, data e horario sao obrigatorios.");
  } finally {
    await cleanup();
  }
});

test("GET /api/agendamentos retorna lista de agendamentos", async () => {
  const { baseUrl, cleanup } = await setupServer();

  try {
    // Criar alguns agendamentos primeiro
    await fetch(`${baseUrl}/api/agendamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hemocentro: "Hospital X",
        data: "2026-03-15",
        horario: "10:00",
      }),
    });

    await fetch(`${baseUrl}/api/agendamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hemocentro: "Hospital Y",
        data: "2026-03-16",
        horario: "14:00",
      }),
    });

    const response = await fetch(`${baseUrl}/api/agendamentos`);
    assert.strictEqual(response.status, 200);

    const body = await response.json();
    assert.ok(Array.isArray(body), "Deve retornar um array");
    assert.ok(body.length >= 2, "Deve conter os agendamentos criados");
    
    const primeiro = body[0];
    assert.ok(primeiro.id, "Cada agendamento deve ter um id");
    assert.ok(primeiro.hemocentro, "Cada agendamento deve ter hemocentro");
    assert.ok(primeiro.data, "Cada agendamento deve ter data");
    assert.ok(primeiro.horario, "Cada agendamento deve ter horario");
  } finally {
    await cleanup();
  }
});
