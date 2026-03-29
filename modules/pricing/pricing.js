export const template = `
<section class="module-view">
  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Pricing</span>
      <h1>Planes pensados para crecer contigo</h1>
      <p>Combina mensualidad, instalacion unica o una implementacion completa segun el nivel de operacion de cada cliente.</p>
    </div>
    <div class="pricing-toggle">
      <button class="btn btn--primary is-selected" data-billing="monthly">Mensual</button>
      <button class="btn btn--ghost" data-billing="setup">Instalacion unica</button>
    </div>
    <div class="grid grid--3" id="plans-grid"></div>
  </section>

  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Comparativa</span>
      <h2>Que incluye cada plan</h2>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Caracteristica</th>
            <th>Basico</th>
            <th>Pro</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Sucursales</td><td>1</td><td>Hasta 3</td><td>Ilimitadas</td></tr>
          <tr><td>Reportes</td><td>Esenciales</td><td>Avanzados</td><td>Ejecutivos y custom</td></tr>
          <tr><td>Integraciones</td><td>No</td><td>Pagos y alertas</td><td>APIs y sistemas externos</td></tr>
          <tr><td>Soporte</td><td>WhatsApp</td><td>Prioritario</td><td>Asignado</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</section>
`;

export function init(root, { data, notify }) {
  const planGrid = root.querySelector("#plans-grid");
  const billingButtons = root.querySelectorAll("[data-billing]");
  let billing = "monthly";

  const renderPlans = () => {
    planGrid.innerHTML = data.plans.map((plan, index) => `
      <article class="pricing-card ${index === 1 ? "pricing-card--highlight" : ""}">
        <span class="pill">${plan.badge}</span>
        <div>
          <h2 class="card-title">${plan.name}</h2>
          <p class="price-card__value">${billing === "monthly" ? `${plan.price}/mes` : plan.setup}</p>
          <p class="price-card__setup">${billing === "monthly" ? plan.setup : "Incluye configuracion y salida a produccion"}</p>
        </div>
        <ul>${plan.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
        <button class="btn ${index === 1 ? "btn--secondary" : "btn--primary"}" data-action="mercadopago">${plan.cta}</button>
      </article>
    `).join("");
  };

  const onBillingClick = (event) => {
    const target = event.currentTarget;
    billing = target.dataset.billing;
    billingButtons.forEach((button) => button.classList.toggle("is-selected", button === target));
    billingButtons.forEach((button) => {
      button.classList.toggle("btn--primary", button === target);
      button.classList.toggle("btn--ghost", button !== target);
    });
    renderPlans();
    notify(`Vista de precios actualizada a ${billing === "monthly" ? "mensual" : "instalacion unica"}.`);
  };

  billingButtons.forEach((button) => button.addEventListener("click", onBillingClick));
  renderPlans();
  return () => billingButtons.forEach((button) => button.removeEventListener("click", onBillingClick));
}
