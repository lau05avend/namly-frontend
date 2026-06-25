# Namly — Frontend

Aplicación web mobile-first para continuidad alimentaria: organizar comidas del día, planear lo que viene, registrar lo que comes y mantener el hábito sin fricción.

No es un tracker de calorías ni un dashboard analítico. El foco está en claridad diaria, baja carga cognitiva y continuidad emocional.

## Stack

- Next.js 16 (App Router) y React 19
- TypeScript (strict)
- Tailwind CSS 4
- TanStack Query
- React Hook Form + Zod
- Supabase Auth (Google OAuth) y almacenamiento de fotos
- API REST NestJS (`NEXT_PUBLIC_BACKEND_API_URL`)

## Módulos principales

| Área | Ruta | Descripción |
|------|------|-------------|
| Inicio | `/home` | Resumen del día, próxima comida, racha y accesos rápidos |
| Planificador | `/planner` | Vista por día, crear/editar planeaciones, detalle de comida programada |
| Historial | `/history` | Línea de tiempo y detalle de comidas registradas |
| Registro | `/meals/register` | Registrar una comida (foto, recetas, nota, vínculo con plan) |
| Recetas | `/recipes` | Biblioteca, colecciones, detalle, crear y editar |
| Ritmo | (integrado en home/perfil) | Actividad semanal y continuidad |
| Perfil | `/profile` | Datos de usuario, preferencias de onboarding, ajustes |
| Onboarding | `/onboarding` | Configuración inicial de preferencias alimentarias |
| Auth | `/`, `/auth/callback` | Bienvenida y callback OAuth |

La navegación principal es la barra inferior: Inicio, Planificador, Historial y Recetas.

## Estructura del proyecto

Arquitectura por features bajo `src/features/`. Cada feature agrupa componentes, hooks, servicios, queries, tipos y utilidades propias.

```
src/
├── app/              # Rutas y layouts (App Router)
├── features/         # Lógica de dominio por módulo
├── components/       # UI compartida y primitivos
├── lib/              # API client, auth, utilidades
├── providers/        # Contexto global (auth, query)
└── styles/
```

Features actuales: `auth`, `calendar`, `history`, `home`, `meal-register`, `onboarding`, `planner`, `profile`, `recipes`, `rhythm`, `tags`.

El sistema de calendario (`features/calendar`) es compartido entre planificador e historial.

## Requisitos

- Node.js 20+
- pnpm (recomendado) o npm

## Configuración

Copia `.env.example` a `.env` (o `.env.local`) y completa los valores. Next.js carga ambos; si existen los dos, `.env.local` tiene prioridad.

```bash
cp .env.example .env
```

En Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

Ninguno de los dos se commitea (están en `.gitignore`). Usa el que prefieras en local.

Variables requeridas (ver comentarios en `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` — proyecto Supabase (auth y storage)
- `NEXT_PUBLIC_SUPABASE_AVATAR_BUCKET` y `NEXT_PUBLIC_SUPABASE_MEAL_PHOTO_BUCKET` — buckets de storage
- `NEXT_PUBLIC_BACKEND_API_URL` — API NestJS
- `NEXT_PUBLIC_FRONTEND_URL` — URL pública del frontend (redirects OAuth)

El frontend corre en el puerto **3001** por defecto. El backend NestJS suele estar en el **3000**.

## Despliegue (Vercel)

- Commitea `pnpm-lock.yaml` junto con `package.json` (la versión de pnpm se fija con `packageManager`).
- Configura las mismas variables de `.env.example` en el panel de Vercel.
- Si `pnpm install` falla con `ERR_INVALID_THIS`, verifica que Corepack use la versión declarada en `packageManager` (pnpm 9.15.9). En algunos proyectos ayuda añadir `ENABLE_EXPERIMENTAL_COREPACK=1` en las variables de entorno de Vercel.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3001](http://localhost:3001).

Otros scripts:

```bash
pnpm build    # build de producción
pnpm start    # servidor de producción (puerto 3001)
pnpm lint     # ESLint
```

## Convenciones

- Server Components por defecto; Client Components solo donde hace falta interacción.
- Estado de servidor con TanStack Query; sin duplicar fetch en componentes.
- Formularios con React Hook Form y validación Zod.
- Fechas en clave local (`yyyy-MM-dd`) vía `toDateKey` de `features/calendar`.
- Bottom sheets (Vaul) para acciones contextuales en móvil.
- Copy y textos de producto en español.

## Estado del proyecto

La aplicación está en fase avanzada: flujos principales de inicio, planificación, registro, historial, recetas, perfil y onboarding están implementados y conectados al backend. Quedan ajustes menores de producto y pulido UX.

## Licencia

Proyecto privado.
