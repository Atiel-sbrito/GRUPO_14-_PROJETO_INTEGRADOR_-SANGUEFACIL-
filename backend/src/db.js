import { mkdir } from "node:fs/promises";
import path from "node:path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const DEFAULT_DB_PATH = path.resolve("backend", "data", "sanguefacil.db");

export async function createDb(dbPath = DEFAULT_DB_PATH) {
  const absolutePath = path.resolve(dbPath);
  await mkdir(path.dirname(absolutePath), { recursive: true });

  const db = await open({
    filename: absolutePath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS doadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      idade INTEGER NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS hemocentros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      distancia TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hemocentro TEXT NOT NULL,
      data TEXT NOT NULL,
      horario TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS gestores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS campanhas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      tipo_sanguineo TEXT NOT NULL,
      descricao TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const row = await db.get("SELECT COUNT(*) AS total FROM hemocentros");
  if (row.total === 0) {
    const seed = [
      ["Hemocentro Central Sao Paulo", "1.2 km"],
      ["Hemocentro Regional Paulista", "2.5 km"],
      ["Hospital das Clinicas - Banco de Sangue", "3.0 km"],
      ["Hemocentro Santa Casa", "4.1 km"],
      ["Hemocentro Vila Mariana", "5.3 km"],
      ["Centro de Hemoterapia Albert Einstein", "6.7 km"],
    ];

    for (const [nome, distancia] of seed) {
      await db.run(
        "INSERT INTO hemocentros (nome, distancia) VALUES (?, ?)",
        nome,
        distancia,
      );
    }
  }

  const gestorRow = await db.get("SELECT COUNT(*) AS total FROM gestores");
  if (gestorRow.total === 0) {
    await db.run(
      "INSERT INTO gestores (nome, email, senha) VALUES (?, ?, ?)",
      "Administrador",
      "admin@hemocentro.com",
      "admin123",
    );
  }

  return db;
}
