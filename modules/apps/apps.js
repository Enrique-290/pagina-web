export const template = `
<section class="module-view">
  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Catalogo de aplicaciones</span>
      <h1>Soluciones listas para vender y adaptar</h1>
      <p>El portafolio de Neural Apps combina sistemas listos para operar con desarrollos a medida para cada tipo de negocio.</p>
    </div>
    <div class="grid grid--3" id="apps-grid"></div>
  </section>

  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Checkout Pro</span>
      <h2>Pagos seguros con Mercado Pago</h2>
      <p>Las compras se generan desde backend para no exponer credenciales sensibles y facilitar la activacion posterior de licencias.</p>
    </div>
  </section>
</section>
`;

export function init(root, { data, notify }) {
  const grid = root.querySelector("#apps-grid");

  grid.innerHTML = data.apps.map((app) => `
    <article class="app-card">
      <div class="app-card__media" aria-hidden="true"></div>
      <div class="app-card__header">
        <div>
          <span class="pill">${app.category}</span>
          <h2 class="card-title">${app.name}</h2>
        </div>
        <span class="app-card__price">${app.price}</span>
      </div>
      <p class="card-copy">${app.description}</p>
      <p class="muted">${app.requiresQuote ? "Cotizacion personalizada" : `Mensualidad ${formatMXN(app.checkout.monthly)} o instalacion ${formatMXN(app.checkout.setup)}`}</p>
      <ul>
        ${app.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
      <div class="btn-row">
        <button class="btn btn--primary" data-route="demo" data-message="Abriendo demo de ${app.name}">Ver demo</button>
        <button
          class="btn btn--secondary"
          data-action="mercadopago"
          data-product-kind="app"
          data-product-id="${app.id}"
          data-billing="monthly"
        >${app.requiresQuote ? "Cotizar" : "Comprar"}</button>
        <button class="btn btn--ghost" data-action="whatsapp">WhatsApp</button>
      </div>
    </article>
  `).join("");

  notify("Catalogo cargado con aplicaciones listas para venta.");
  return null;
}

function formatMXN(amount) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);
}
