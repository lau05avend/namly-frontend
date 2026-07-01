export const GUEST_TRIAL_COPY = {
  label: "Modo prueba",
  daysRemaining: (days: number) =>
    days === 1 ? "1 día restante" : `${days} días restantes`,
  trialFallback: "Periodo de prueba",
  createAccount: "Crear cuenta",
  personalize: "Personalizar",
} as const;
