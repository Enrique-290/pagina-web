export const template = `
<section class="module-view">
  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Panel interno</span>
      <h1>Admin de Neural Apps</h1>
      <p>Gestiona clientes, licencias, pagos y las aplicaciones vendidas desde una vista central para tu operacion.</p>
    </div>
    <div class="grid grid--4">
      <article class="metric"><span class="metric__value">38</span><span class="metric__label">Licencias activas</span></article>
      <article class="metric"><span class="metric__value">$74K</span><span class="metric__label">Facturacion mensual</span></article>
      <article class="metric"><span class="metric__value">7</span><span class="metric__label">Demos abiertas</span></article>
      <article class="metric"><span class="metric__value">4</span><span class="metric__label">Cobros pendientes</span></article>
    </div>
  </section>

  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Clientes y ventas</span>
      <h2>Control de cuentas</h2>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>App</th>
            <th>Licencia</th>
            <th>Pago</th>
            <th>Valor</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody id="admin-table"></tbody>
      </table>
    </div>
  </section>
</section>
`;

export function init(root, { data, notify }) {
  const table = root.querySelector("#admin-table");

  table.innerHTML = data.adminClients.map((client) => `
    <tr>
      <td>${client.business}</td>
      <td>${client.app}</td>
      <td><span class="status ${client.license === "Activa" ? "status--ok" : "status--info"}">${client.license}</span></td>
      <td><span class="status ${client.payment === "Pagado" ? "status--ok" : "status--warn"}">${client.payment}</span></td>
      <td>${client.value}</td>
      <td class="table-action">
        <button class="btn btn--ghost" data-message="Licencia de ${client.business} actualizada.">Gestionar</button>
      </td>
    </tr>
  `).join("");

  notify("Panel admin cargado con control de clientes y licencias.");
  return null;
}
