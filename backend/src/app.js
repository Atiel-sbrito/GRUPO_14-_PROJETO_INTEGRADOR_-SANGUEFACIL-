import express from "express";

function validateDoadorPayload(payload) {
  const nome = typeof payload?.nome === "string" ? payload.nome.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const idade = Number(payload?.idade);

  if (!nome) {
    return { ok: false, status: 400, error: "Nome e obrigatorio." };
  }

  if (!email) {
    return { ok: false, status: 400, error: "Email e obrigatorio." };
  }

  if (!Number.isInteger(idade) || idade < 16) {
    return { ok: false, status: 400, error: "Idade minima para doacao: 16 anos." };
  }

  return { ok: true, value: { nome, email, idade } };
}

function validateAgendamentoPayload(payload) {
  const hemocentro = typeof payload?.hemocentro === "string" ? payload.hemocentro.trim() : "";
  const data = typeof payload?.data === "string" ? payload.data.trim() : "";
  const horario = typeof payload?.horario === "string" ? payload.horario.trim() : "";

  if (!hemocentro || !data || !horario) {
    return {
      ok: false,
      status: 400,
      error: "Hemocentro, data e horario sao obrigatorios.",
    };
  }

  return { ok: true, value: { hemocentro, data, horario } };
}

function validateCampanhaPayload(payload) {
  const titulo = typeof payload?.titulo === "string" ? payload.titulo.trim() : "";
  const tipo_sanguineo = typeof payload?.tipo_sanguineo === "string" ? payload.tipo_sanguineo.trim() : "";
  const descricao = typeof payload?.descricao === "string" ? payload.descricao.trim() : "";

  if (!titulo) {
    return { ok: false, status: 400, error: "titulo e obrigatorio." };
  }

  if (!tipo_sanguineo) {
    return { ok: false, status: 400, error: "tipo_sanguineo e obrigatorio." };
  }

  return { ok: true, value: { titulo, tipo_sanguineo, descricao } };
}

export function createApp({ db }) {
  const app = express();
  app.use(express.json());

  // CORS middleware para permitir requisições do frontend
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    
    next();
  });

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/api/hemocentros", async (_req, res) => {
    try {
      const hemocentros = await db.all(
        "SELECT id, nome, distancia FROM hemocentros ORDER BY id ASC",
      );
      return res.status(200).json(hemocentros);
    } catch (_error) {
      return res.status(500).json({ error: "Erro interno ao listar hemocentros." });
    }
  });

  app.post("/api/doadores", async (req, res) => {
    const validation = validateDoadorPayload(req.body);
    if (!validation.ok) {
      return res.status(validation.status).json({ error: validation.error });
    }

    const { nome, email, idade } = validation.value;

    try {
      const result = await db.run(
        "INSERT INTO doadores (nome, idade, email) VALUES (?, ?, ?)",
        nome,
        idade,
        email,
      );

      const doador = await db.get(
        "SELECT id, nome, idade, email, created_at FROM doadores WHERE id = ?",
        result.lastID,
      );

      return res.status(201).json(doador);
    } catch (error) {
      if (String(error?.message || "").includes("UNIQUE constraint failed")) {
        return res.status(409).json({ error: "Email ja cadastrado." });
      }

      return res.status(500).json({ error: "Erro interno ao cadastrar doador." });
    }
  });

  app.post("/api/agendamentos", async (req, res) => {
    const validation = validateAgendamentoPayload(req.body);
    if (!validation.ok) {
      return res.status(validation.status).json({ error: validation.error });
    }

    const { hemocentro, data, horario } = validation.value;

    try {
      const result = await db.run(
        "INSERT INTO agendamentos (hemocentro, data, horario) VALUES (?, ?, ?)",
        hemocentro,
        data,
        horario,
      );

      const agendamento = await db.get(
        "SELECT id, hemocentro, data, horario, created_at FROM agendamentos WHERE id = ?",
        result.lastID,
      );

      return res.status(201).json(agendamento);
    } catch (_error) {
      return res.status(500).json({ error: "Erro interno ao criar agendamento." });
    }
  });

  app.get("/api/agendamentos", async (_req, res) => {
    try {
      const agendamentos = await db.all(
        "SELECT id, hemocentro, data, horario, created_at FROM agendamentos ORDER BY created_at DESC"
      );
      return res.status(200).json(agendamentos);
    } catch (_error) {
      return res.status(500).json({ error: "Erro ao buscar agendamentos." });
    }
  });

  app.post("/api/gestores/login", async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const senha = typeof req.body?.senha === "string" ? req.body.senha : "";

    if (!email) {
      return res.status(400).json({ error: "email e obrigatorio." });
    }

    if (!senha) {
      return res.status(400).json({ error: "senha e obrigatoria." });
    }

    try {
      const gestor = await db.get(
        "SELECT id, nome, email FROM gestores WHERE email = ? AND senha = ?",
        email,
        senha,
      );

      if (!gestor) {
        return res.status(401).json({ error: "Credenciais invalidas" });
      }

      // Token simplificado para MVP (em producao usar JWT)
      const token = Buffer.from(`${gestor.id}:${Date.now()}`).toString("base64");

      return res.status(200).json({
        token,
        gestor: {
          id: gestor.id,
          nome: gestor.nome,
          email: gestor.email,
        },
      });
    } catch (_error) {
      return res.status(500).json({ error: "Erro interno ao autenticar." });
    }
  });

  app.post("/api/campanhas", async (req, res) => {
    const validation = validateCampanhaPayload(req.body);
    if (!validation.ok) {
      return res.status(validation.status).json({ error: validation.error });
    }

    const { titulo, tipo_sanguineo, descricao } = validation.value;

    try {
      const result = await db.run(
        "INSERT INTO campanhas (titulo, tipo_sanguineo, descricao) VALUES (?, ?, ?)",
        titulo,
        tipo_sanguineo,
        descricao,
      );

      const campanha = await db.get(
        "SELECT id, titulo, tipo_sanguineo, descricao, created_at FROM campanhas WHERE id = ?",
        result.lastID,
      );

      return res.status(201).json(campanha);
    } catch (_error) {
      return res.status(500).json({ error: "Erro interno ao criar campanha." });
    }
  });

  app.get("/api/campanhas", async (_req, res) => {
    try {
      const campanhas = await db.all(
        "SELECT id, titulo, tipo_sanguineo, descricao, created_at FROM campanhas ORDER BY created_at DESC"
      );
      return res.status(200).json(campanhas);
    } catch (_error) {
      return res.status(500).json({ error: "Erro ao buscar campanhas." });
    }
  });

  return app;
}
