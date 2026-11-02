# StayFinder – frontend

Webbgränssnitt för StayFinder. Byggt med Next.js (App Router), TypeScript och Tailwind.

Backend och lista över uppfyllda kriterier: <länk till backend-repot>

## Kom igång

```bash
npm install
npm run dev -- -p 3001
```

Skapa `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Backend måste köra och tillåta `http://localhost:3001` som CORS-origin.

## Struktur

- `src/app/` sidor (start, `properties/[id]`, `properties/new`, `login`, `register`) samt `loading.tsx`, `error.tsx`, `not-found.tsx`
- `src/components/` formulär och listor (`BookingForm`, `BookingList`, `PropertyFilterForm`, `Navbar` m.fl.)
- `src/context/UserContext.tsx` inloggad användare via React Context
- `src/lib/` API-anrop (`api.ts`, `auth.ts`)
- `src/types/` typer för boenden, bokningar, auth och API-fel

## Hur inloggningen fungerar

Inloggningen är cookie-baserad. Alla anrop som kräver inloggning görs från Client Components med `credentials: "include"`, eftersom Server Components inte har webbläsarens cookies. Skyddet av sidor i frontend är bara UX; API:t och databasen nekar själva.