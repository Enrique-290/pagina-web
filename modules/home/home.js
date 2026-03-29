export const template = `
<section class="module-view home-view">
  <section class="hero panel">
    <div class="hero__content">
      <span class="eyebrow">Plataforma digital para ventas y operacion</span>
      <h1 class="hero__title">Digitaliza tu negocio con Neural Apps</h1>
      <p class="copy">
        Vendemos software moderno para negocios que necesitan control, automatizacion y crecimiento.
        Desde TPV especializados hasta sistemas a medida listos para escalar a SaaS real.
      </p>
      <div class="tag-list">
        <span class="tag">TPV inteligentes</span>
        <span class="tag">Licencias y suscripciones</span>
        <span class="tag">Apps personalizadas</span>
        <span class="tag">Soporte especializado</span>
      </div>
      <div class="btn-row">
        <button class="btn btn--primary" data-route="apps">Ver aplicaciones</button>
        <button class="btn btn--secondary" data-route="demo">Solicitar demo</button>
        <button class="btn btn--ghost" data-route="pricing">Comprar</button>
      </div>
    </div>

    <div class="hero__visual glass-card">
      <div class="hero__screen">
        <div class="hero__screen-top">
          <span></span><span></span><span></span>
        </div>
        <div class="hero__chart"></div>
        <div class="hero__stats">
          <article class="metric">
            <span class="metric__value">+41%</span>
            <span class="metric__label">Ventas centralizadas</span>
          </article>
          <article class="metric">
            <span class="metric__value">24/7</span>
            <span class="metric__label">Operacion conectada</span>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="grid grid--3">
    <article class="panel">
      <div class="section-heading">
        <span class="eyebrow">Automatizacion</span>
        <h2>Menos trabajo manual, mas control</h2>
      </div>
      <p class="card-copy">Unificamos cobros, inventarios, usuarios y reportes en flujos digitales claros.</p>
    </article>

    <article class="panel">
      <div class="section-heading">
        <span class="eyebrow">Ventas</span>
        <h2>Software que impulsa ingresos</h2>
      </div>
      <p class="card-copy">Tus apps pueden venderse por instalacion, mensualidad o modelo mixto con licencias.</p>
    </article>

    <article class="panel">
      <div class="section-heading">
        <span class="eyebrow">Escala</span>
        <h2>Base lista para SaaS</h2>
      </div>
      <p class="card-copy">La plataforma queda preparada para integrar autenticacion, pagos y administracion central.</p>
    </article>
  </section>

  <section class="panel">
    <div class="section-heading">
      <span class="eyebrow">Beneficios clave</span>
      <h2>Una oferta clara para negocios que quieren modernizarse</h2>
      <p>Neural Apps conecta venta, operacion, acceso y soporte con una experiencia profesional y confiable.</p>
    </div>
    <div class="grid grid--4">
      <article class="metric">
        <span class="metric__value">1</span>
        <span class="metric__label">Panel para ventas, demo y compra</span>
      </article>
      <article class="metric">
        <span class="metric__value">9</span>
        <span class="metric__label">Modulos listos para crecer</span>
      </article>
      <article class="metric">
        <span class="metric__value">API</span>
        <span class="metric__label">Preparado para Firebase y pagos</span>
      </article>
      <article class="metric">
        <span class="metric__value">100%</span>
        <span class="metric__label">Responsive en movil, tablet y desktop</span>
      </article>
    </div>
  </section>
</section>
`;

export function init() {
  return null;
}
