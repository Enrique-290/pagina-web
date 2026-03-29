import { apps, plans, testimonials, clientApps, adminClients } from "./data.js";

const routes = ["home", "apps", "demo", "pricing", "clientes", "contacto", "login", "dashboard", "admin"];
const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const nav = document.querySelector(".topnav");
const navToggle = document.querySelector(".nav-toggle");

const sharedContext = {
  data: { apps, plans, testimonials, clientApps, adminClients },
  navigate,
  notify
};

let activeCleanup = null;
let currentCss = null;

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

window.addEventListener("hashchange", renderRoute);
document.addEventListener("click", handleAction);
renderRoute();

async function renderRoute() {
  const route = normalizeRoute(location.hash.replace("#", "")) || "home";

  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  setActiveLink(route);
  nav.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");

  const module = await import(`../modules/${route}/${route}.js`);
  const html = await fetchModuleHtml(route, module);
  await loadModuleCss(route);

  app.innerHTML = html;
  app.dataset.route = route;

  if (typeof module.init === "function") {
    activeCleanup = module.init(app, sharedContext) || null;
  }

  showPaymentStatusToast();
}

function normalizeRoute(route) {
  return routes.includes(route) ? route : "home";
}

function setActiveLink(route) {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === route);
  });
}

async function fetchModuleHtml(route, module) {
  if (window.location.protocol === "file:" && module.template) {
    return module.template;
  }

  const response = await fetch(`./modules/${route}/${route}.html`);
  if (!response.ok) {
    throw new Error(`No se pudo cargar el modulo ${route}.`);
  }

  return response.text();
}

async function loadModuleCss(route) {
  if (currentCss?.dataset.route === route) return;
  currentCss?.remove();
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `./modules/${route}/${route}.css`;
  link.dataset.route = route;
  document.head.appendChild(link);
  currentCss = link;
}

function navigate(route) {
  location.hash = normalizeRoute(route);
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(notify.timer);
  notify.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function handleAction(event) {
  const trigger = event.target.closest("[data-action], [data-route], [data-message]");
  if (!trigger) return;

  const { action, route, message } = trigger.dataset;
  if (message) notify(message);
  if (route) navigate(route);

  if (action === "whatsapp") {
    window.open("https://wa.me/5210000000000?text=Hola%20Neural%20Apps%2C%20quiero%20informacion", "_blank");
  }

  if (action === "mercadopago") {
    beginMercadoPagoCheckout(trigger);
  }

  if (action === "firebase") {
    notify("Punto de integracion listo para autenticacion y licencias con Firebase.");
  }
}

async function beginMercadoPagoCheckout(trigger) {
  let payload;

  try {
    payload = buildCheckoutPayload(trigger.dataset);
  } catch (error) {
    notify(error.message || "No fue posible preparar el pago.");
    return;
  }

  if (payload.requiresQuote) {
    notify("Este producto requiere cotizacion. Te llevamos a contacto.");
    navigate("contacto");
    return;
  }

  if (window.location.protocol === "file:") {
    notify("Para pagos reales, abre el proyecto con el servidor local incluido en lugar de file://.");
    return;
  }

  const originalText = trigger.textContent;
  trigger.disabled = true;
  trigger.textContent = "Preparando pago...";

  try {
    const response = await fetch("/api/payments/preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No fue posible iniciar el checkout.");
    }

    const checkoutUrl = result.sandbox_init_point || result.init_point;
    if (!checkoutUrl) {
      throw new Error("Mercado Pago no devolvio una URL de pago.");
    }

    window.location.href = checkoutUrl;
  } catch (error) {
    notify(error.message || "Ocurrio un error al conectar con Mercado Pago.");
  } finally {
    trigger.disabled = false;
    trigger.textContent = originalText;
  }
}

function buildCheckoutPayload(dataset) {
  const kind = dataset.productKind;
  const id = dataset.productId;
  const billing = dataset.billing || "monthly";

  if (kind === "app") {
    const product = apps.find((item) => item.id === id);
    if (!product || product.requiresQuote) {
      return { requiresQuote: true };
    }

    return {
      kind,
      id,
      billing,
      title: product.name,
      amount: product.checkout[billing] || product.checkout.monthly
    };
  }

  if (kind === "plan") {
    const plan = plans.find((item) => item.id === id);
    if (!plan) {
      throw new Error("Plan no encontrado.");
    }

    return {
      kind,
      id,
      billing,
      title: `Plan ${plan.name}`,
      amount: billing === "setup" ? plan.setupAmount : plan.monthlyAmount
    };
  }

  throw new Error("Producto no valido para checkout.");
}

function showPaymentStatusToast() {
  const params = new URLSearchParams(window.location.search);
  const payment = params.get("payment");

  if (!payment || showPaymentStatusToast.lastPayment === payment) {
    return;
  }

  showPaymentStatusToast.lastPayment = payment;

  if (payment === "approved") notify("Pago aprobado. Ya puedes continuar con la activacion de tu licencia.");
  if (payment === "pending") notify("Tu pago quedo pendiente. Te avisaremos cuando se confirme.");
  if (payment === "failure") notify("El pago no se completo. Puedes intentarlo de nuevo.");
}
