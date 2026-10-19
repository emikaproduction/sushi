# Sushi dla Ciebie — strona www

Vite + React + TypeScript + [Motion](https://motion.dev) (`motion/react`). Design: ciemne bordo, czerwień, Anton (na bazie `../sushi-v1`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # wynik w dist/
```

## Skąd są treści

- **Menu, ceny, zestawy, zdjęcia** — karta menu klienta (PDF w flipbooku na sushidlaciebie.pl). Zdjęcia wycięte z PDF → `public/img/*.webp`.
- **Kontakt, godziny, tekst „o nas”** — sushidlaciebie.pl i fanpage.
- **Filmy** — reelsy z fanpage'a osadzone odtwarzaczem Facebooka; ładują się dopiero po kliknięciu. Lista ID w `src/data/menu.ts` (`REELS`).
- **Maskotki (panda i pandka ruda)** — pliki od klienta (`public/img/black-panda.png`, `red-panda.png`), przycięte i skonwertowane do `panda.webp` / `pandka.webp`, których używa strona.

Wszystkie dane do edycji są w `src/data/menu.ts`.
