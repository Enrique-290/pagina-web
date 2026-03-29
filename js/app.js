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
  notify.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
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

  // Hooks listos para reemplazar la simulacion por integraciones reales.
  if (action === "mercadopago") notify("Checkout listo para conectar con Mercado Pago.");
  if (action === "firebase") notify("Punto de integracion listo para autenticacion y licencias con Firebase.");
}
