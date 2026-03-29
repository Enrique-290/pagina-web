import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { stat } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = normalize(__dirname);
const env = loadEnv();

const catalog = {
  apps: {
    gimnasio: { title: "TPV Gimnasio", description: "Licencia mensual Neural Apps para gimnasios", monthly: 599, setup: 3900 },
    farmacia: { title: "TPV Farmacia", description: "Licencia mensual Neural Apps para farmacias", monthly: 899, setup: 5900 },
    tienda: { title: "TPV Tienda", description: "Licencia mensual Neural Apps para tiendas", monthly: 699, setup: 4900 },
    acceso: { title: "Control de Acceso", description: "Licencia Neural Apps para control de acceso", monthly: 499, setup: 2900 }
  },
  plans: {
    basico: { title: "Plan Basico", description: "Suscripcion Basica Neural Apps", monthly: 399, setup: 2900 },
    pro: { title: "Plan Pro", description: "Suscripcion Pro Neural Apps", monthly: 899, setup: 5900 },
    premium: { title: "Plan Premium", description: "Suscripcion Premium Neural Apps", monthly: 1790, setup: 11900 }
  }
};

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const server = createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "POST" && requestUrl.pathname === "/api/payments/preference") {
    return handleCreatePreference(req, res, requestUrl);
  }

  return serveStatic(requestUrl.pathname, res);
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`Neural Apps listo en http://localhost:${port}`);
});

async function handleCreatePreference(req, res, requestUrl) {
  if (!env.MP_ACCESS_TOKEN) {
    return sendJson(res, 503, {
      error: "Configura MP_ACCESS_TOKEN en tu archivo .env para activar Mercado Pago."
    });
  }

  try {
    const payload = await readJson(req);
    const product = resolveProduct(payload);
    const baseUrl = env.PUBLIC_BASE_URL || `http://${requestUrl.host}`;

    const preference = {
      items: [
        {
          id: `${payload.kind}-${payload.id}-${payload.billing}`,
          title: product.title,
          description: product.description,
          quantity: 1,
          currency_id: "MXN",
          unit_price: product.amount
        }
      ],
      back_urls: {
        success: `${baseUrl}/?payment=approved#dashboard`,
        pending: `${baseUrl}/?payment=pending#dashboard`,
        failure: `${baseUrl}/?payment=failure#pricing`
      },
      auto_return: "approved",
      external_reference: `${payload.kind}:${payload.id}:${payload.billing}:${Date.now()}`,
      notification_url: env.MP_WEBHOOK_URL || undefined
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": randomUUID()
      },
      body: JSON.stringify(preference)
    });

    const result = await response.json();

    if (!response.ok) {
      return sendJson(res, response.status, {
        error: result.message || "Mercado Pago rechazo la preferencia.",
        details: result
      });
    }

    return sendJson(res, 200, {
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });
  } catch (error) {
    return sendJson(res, 500, {
      error: error.message || "No fue posible crear la preferencia de pago."
    });
  }
}

function resolveProduct(payload) {
  if (!payload?.kind || !payload?.id || !payload?.billing) {
    throw new Error("Solicitud de checkout incompleta.");
  }

  if (payload.kind === "app") {
    const app = catalog.apps[payload.id];
    if (!app) throw new Error("Aplicacion no encontrada.");
    return {
      title: app.title,
      description: app.description,
      amount: payload.billing === "setup" ? app.setup : app.monthly
    };
  }

  if (payload.kind === "plan") {
    const plan = catalog.plans[payload.id];
    if (!plan) throw new Error("Plan no encontrado.");
    return {
      title: plan.title,
      description: plan.description,
      amount: payload.billing === "setup" ? plan.setup : plan.monthly
    };
  }

  throw new Error("Tipo de producto no soportado.");
}

async function serveStatic(pathname, res) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const normalizedPath = normalize(join(rootDir, safePath));

  if (!normalizedPath.startsWith(rootDir)) {
    return sendText(res, 403, "Acceso denegado.");
  }

  if (!existsSync(normalizedPath)) {
    return sendText(res, 404, "Archivo no encontrado.");
  }

  const fileStat = await stat(normalizedPath);
  if (fileStat.isDirectory()) {
    return sendText(res, 404, "Archivo no encontrado.");
  }

  const extension = extname(normalizedPath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream"
  });
  createReadStream(normalizedPath).pipe(res);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
    });

    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("JSON invalido en la solicitud."));
      }
    });

    req.on("error", reject);
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function sendText(res, status, message) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

function loadEnv() {
  const envPath = join(rootDir, ".env");

  if (!existsSync(envPath)) {
    return {};
  }

  const file = readFileSync(envPath, "utf8");
  return file.split(/\r?\n/).reduce((accumulator, line) => {
    if (!line || line.startsWith("#") || !line.includes("=")) {
      return accumulator;
    }

    const separator = line.indexOf("=");
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    accumulator[key] = value;
    process.env[key] = value;
    return accumulator;
  }, {});
}
