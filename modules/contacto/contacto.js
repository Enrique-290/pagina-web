export const template = `
<section class="module-view">
  <section class="grid grid--2">
    <article class="panel">
      <div class="section-heading">
        <span class="eyebrow">Contacto</span>
        <h1>Conversemos sobre tu negocio</h1>
        <p>Captura leads y prepara el camino para ventas por consultoria, demostracion o implementacion directa.</p>
      </div>
      <div class="stat-list">
        <span class="tag">WhatsApp comercial</span>
        <span class="tag">Implementacion guiada</span>
        <span class="tag">Respuesta rapida</span>
      </div>
      <div class="btn-row">
        <button class="btn btn--secondary" data-action="whatsapp">Abrir WhatsApp</button>
        <button class="btn btn--ghost" data-message="Instagram y LinkedIn listos para conectar.">Redes sociales</button>
      </div>
    </article>

    <article class="panel">
      <form id="contact-form" class="form-grid">
        <div class="field">
          <label for="name">Nombre</label>
          <input id="name" name="name" type="text" placeholder="Tu nombre">
        </div>
        <div class="field">
          <label for="business">Negocio</label>
          <input id="business" name="business" type="text" placeholder="Nombre de tu negocio">
        </div>
        <div class="field">
          <label for="phone">Telefono</label>
          <input id="phone" name="phone" type="tel" placeholder="+52 ...">
        </div>
        <div class="field">
          <label for="need">Que necesitas</label>
          <textarea id="need" name="need" placeholder="Cuentanos que sistema buscas"></textarea>
        </div>
        <button class="btn btn--primary" type="submit">Enviar solicitud</button>
      </form>
    </article>
  </section>
</section>
`;

export function init(root, { notify }) {
  const form = root.querySelector("#contact-form");

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "Tu solicitud";
    notify(`${name} fue enviado. Formulario listo para conectar con CRM o Firebase.`);
    form.reset();
  };

  form?.addEventListener("submit", onSubmit);
  return () => form?.removeEventListener("submit", onSubmit);
}
