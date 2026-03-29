export const template = `
<section class="module-view">
  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Dashboard cliente</span>
      <h1>Panel SaaS para clientes Neural Apps</h1>
      <p>Consulta apps contratadas, renovaciones, accesos y soporte desde una vista sencilla y profesional.</p>
    </div>
    <div class="grid grid--4">
      <article class="metric">
        <span class="metric__value">2</span>
        <span class="metric__label">Apps contratadas</span>
      </article>
      <article class="metric">
        <span class="metric__value">1</span>
        <span class="metric__label">Renovacion pendiente</span>
      </article>
      <article class="metric">
        <span class="metric__value">99.9%</span>
        <span class="metric__label">Disponibilidad simulada</span>
      </article>
      <article class="metric">
        <span class="metric__value">VIP</span>
        <span class="metric__label">Soporte prioritario</span>
      </article>
    </div>
  </section>

  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Tus licencias</span>
      <h2>Accesos y suscripciones</h2>
    </div>
    <div class="grid" id="client-apps"></div>
  </section>
</section>
`;

export function init(root, { data, notify }) {
  const container = root.querySelector("#client-apps");

  container.innerHTML = data.clientApps.map((app) => `
    <article class="license-card">
      <div class="app-card__header">
        <div>
          <h3 class="card-title">${app.name}</h3>
          <p class="muted">Renueva: ${app.renew}</p>
        </div>
        <span class="status ${app.status === "Activa" ? "status--ok" : "status--warn"}">${app.status}</span>
      </div>
      <div class="btn-row">
        <button class="btn btn--primary" data-message="Redirigiendo al sistema ${app.name}.">Acceder</button>
        <button class="btn btn--ghost" data-message="Soporte Neural Apps notificado.">Soporte</button>
      </div>
    </article>
  `).join("");

  notify("Dashboard del cliente listo para integrar datos reales.");
  return null;
}
