export const apps = [
  { id: "gimnasio", name: "TPV Gimnasio", price: "Desde $599/mes", category: "Fitness", description: "Controla membresias, cobros recurrentes, acceso y seguimiento de clientes desde una sola interfaz.", features: ["Cobro de mensualidades", "Control de acceso", "Reportes de asistencia", "Alertas de vencimiento"] },
  { id: "farmacia", name: "TPV Farmacia", price: "Desde $899/mes", category: "Retail salud", description: "Gestiona inventario por lote, ventas rapidas, recetas y puntos de reorden con precision operativa.", features: ["Inventario por caducidad", "Ticket y factura", "Corte de caja", "Control de proveedores"] },
  { id: "tienda", name: "TPV Tienda", price: "Desde $699/mes", category: "Retail", description: "Vende, repone stock y analiza el desempeno de tu negocio con un panel simple y veloz.", features: ["Ventas omnicanal", "Escaner y tickets", "Promociones", "Panel de utilidad"] },
  { id: "acceso", name: "Control de Acceso", price: "Desde $499/mes", category: "Seguridad", description: "Automatiza entradas, horarios y permisos para gimnasios, oficinas y espacios privados.", features: ["QR o PIN", "Bitacora en tiempo real", "Roles y permisos", "Alertas de seguridad"] },
  { id: "custom", name: "Apps Personalizadas", price: "Proyecto a medida", category: "Custom SaaS", description: "Diseñamos soluciones digitales alineadas a tus procesos, ventas y operacion real.", features: ["Arquitectura a medida", "Integraciones API", "Dashboard ejecutivo", "Escalabilidad SaaS"] }
];

export const plans = [
  { name: "Basico", price: "$399", setup: "$2,900 unica instalacion", badge: "Para iniciar rapido", features: ["1 sucursal", "1 app incluida", "Capacitacion inicial", "Soporte por WhatsApp"], cta: "Comprar Basico" },
  { name: "Pro", price: "$899", setup: "$5,900 unica instalacion", badge: "Mas vendido", features: ["Hasta 3 sucursales", "Integracion de pagos", "Reportes avanzados", "Soporte prioritario"], cta: "Comprar Pro" },
  { name: "Premium", price: "$1,790", setup: "Implementacion personalizada", badge: "Escala completa", features: ["Sucursales ilimitadas", "App personalizada", "Dashboard dedicado", "Acompanamiento estrategico"], cta: "Hablar con ventas" }
];

export const testimonials = [
  { name: "Fit Club MX", sector: "Gimnasio", quote: "Reducimos la carga administrativa y automatizamos cobros en menos de dos semanas.", impact: "+32% en renovaciones" },
  { name: "Farmacia Nova", sector: "Farmacia", quote: "La visibilidad del inventario y los cortes de caja nos dio mucho mas control operativo.", impact: "-21% en quiebres de stock" },
  { name: "Mini Market Uno", sector: "Tienda", quote: "Ahora tenemos reportes claros y una operacion mas ordenada en mostrador y almacen.", impact: "+18% en ticket promedio" }
];

export const clientApps = [
  { name: "TPV Gimnasio", status: "Activa", renew: "12 abril 2026", access: "https://demo.neuralapps.local/gym" },
  { name: "Control de Acceso", status: "Pendiente de renovacion", renew: "03 abril 2026", access: "https://demo.neuralapps.local/access" }
];

export const adminClients = [
  { business: "Fit Club MX", app: "TPV Gimnasio", license: "Activa", payment: "Pagado", value: "$899" },
  { business: "Farmacia Nova", app: "TPV Farmacia", license: "Activa", payment: "Pendiente", value: "$899" },
  { business: "Mini Market Uno", app: "TPV Tienda", license: "En prueba", payment: "Demo", value: "$0" }
];
