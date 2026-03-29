export const template = `
<section class="module-view">
  <section class="panel demo-hero">
    <div class="section-heading">
      <span class="eyebrow">Experiencia demo</span>
      <h1>Muestra tus sistemas antes de venderlos</h1>
      <p>Simulaciones de interfaz, flujo de caja, reportes y paneles para ayudar al cliente a imaginar su operacion digitalizada.</p>
    </div>
    <div class="grid grid--2">
      <article class="demo-screen">
        <div class="demo-screen__top">
          <span></span><span></span><span></span>
        </div>
        <div class="demo-screen__body">
          <div class="demo-screen__sidebar"></div>
          <div class="demo-screen__content">
            <div class="demo-kpi"></div>
            <div class="demo-kpi demo-kpi--wide"></div>
            <div class="demo-chart"></div>
          </div>
        </div>
      </article>
      <article class="panel">
        <div class="feature-list">
          <span class="tag">Preview de pantallas</span>
          <span class="tag">Flujo de venta</span>
          <span class="tag">Analitica de negocio</span>
        </div>
        <p class="copy">La demo puede crecer facilmente hacia videos, recorridos guiados o integracion con entornos reales de prueba.</p>
        <div class="btn-row">
          <button class="btn btn--primary" id="try-demo">Probar demo</button>
          <button class="btn btn--ghost" data-route="contacto">Agendar presentacion</button>
        </div>
      </article>
    </div>
  </section>
</section>
`;

export function init(root, { notify }) {
  const button = root.querySelector("#try-demo");
  const onClick = () => notify("Demo interactiva lista para conectarse a un entorno real de prueba.");
  button?.addEventListener("click", onClick);
  return () => button?.removeEventListener("click", onClick);
}
