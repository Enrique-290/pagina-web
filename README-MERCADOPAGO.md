# Integracion Mercado Pago

Esta base usa Checkout Pro con preferencia creada desde backend, siguiendo el flujo recomendado por Mercado Pago para no exponer el access token en el navegador.

## Que configurar

1. Copia `.env.example` a `.env`.
2. Coloca tu `MP_ACCESS_TOKEN`.
3. Ajusta `PUBLIC_BASE_URL`.
4. Opcional: agrega `MP_WEBHOOK_URL` si vas a procesar notificaciones.

## Como levantar el proyecto

1. Instala Node.js 18 o superior.
2. En la raiz del proyecto ejecuta `npm run dev`.
3. Abre `http://localhost:3000`.

## Flujo implementado

- El frontend envia el producto elegido a `/api/payments/preference`.
- El backend crea una preferencia en `https://api.mercadopago.com/checkout/preferences`.
- Mercado Pago devuelve `init_point` o `sandbox_init_point`.
- El usuario es redirigido al checkout.
- Al volver, el sitio muestra un mensaje segun `approved`, `pending` o `failure`.

## Importante

- No abras el sitio con `file:///` para pagos reales.
- Las apps personalizadas siguen yendo a cotizacion.
- Para activar licencias automaticamente, el siguiente paso ideal es guardar pagos y procesar webhooks.

## Referencias oficiales

- https://www.mercadopago.com.mx/developers/en/docs/checkout-pro/create-payment-preference
- https://www.mercadopago.com.mx/developers/en/docs/checkout-pro/integration-test
