# Umzugshelden Kerem Website

<!-- VS Code Preview: Strg+Shift+V (Win/Linux) | Cmd+Shift+V (Mac) -->

Saubere, modulare Landingpage mit Tailwind (CDN) und ausgelagerten HTML-Sections.
Die Darstellung bleibt identisch, der Code ist leichter zu pflegen.

## Inhalte

- `index.html` (nur Includes + Grundstruktur)
- `partials/` (Header, Footer, Sections)
- `pages/` (seitenspezifische Sections + Legal)
- `css/custom.css` (kleine Zusatzstyles)
- `js/main.js` (Interaktionen + Includes)

## Lokale Vorschau

Die Includes werden per `fetch` geladen. Deshalb bitte mit einem lokalen Server
starten (nicht per `file://`).

Optionen:

1. VS Code Extension: Live Server
2. Ein beliebiger lokaler HTTP-Server

## Struktur (Kurzuebersicht)

- `partials/layout/` -> Header, Footer
- `partials/sections/` -> Hero
- `pages/` -> Leistungen, Ablauf, Preise, Bewertungen, Kontakt
- `pages/legal/` -> Impressum, Datenschutz, Cookie-Banner

## Hinweise

- Cookie-Banner blockiert die Seite, bis eine Auswahl getroffen wurde.
- Impressum und Datenschutz sind als Modals umgesetzt.
