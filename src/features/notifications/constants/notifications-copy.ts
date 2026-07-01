export const NOTIFICATIONS_COPY = {
  title: "Notificaciones",
  back: "Volver al inicio",
  bellAriaLabel: "Notificaciones",
  markAllRead: "Marcar todas como leídas",
  filters: {
    all: "Todas",
    unread: "Sin leer",
  },
  emptyTitle: "Todo al día",
  emptyDescription: "Cuando tengas avisos sobre tus comidas, aparecerán aquí.",
  emptyUnreadTitle: "Sin pendientes",
  emptyUnreadDescription: "No tienes notificaciones sin leer en este momento.",
  loadError: "No pudimos cargar tus notificaciones. Intenta de nuevo.",
  unreadBadge: (count: number) =>
    count === 1 ? "1 notificación sin leer" : `${count} notificaciones sin leer`,
} as const;
