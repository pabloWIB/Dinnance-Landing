# Dinnance

Static two-page site for Dinnance, a fictional online real estate advisor: a landing page and a sign-in screen. No build step, no dependencies, no framework.

[![Live demo](https://img.shields.io/badge/demo-dinnance.wib.digital-2ea44f)](https://dinnance.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

Dinnance leads with a single claim — a real estate advisor that costs $0 a month — and gets to it before anything else. The landing page carries the claim, a short investing pitch, and one call to action that repeats in both blocks. The second page is the sign-in screen behind that call to action.

The site is hand-written HTML and CSS. It ships three stylesheets plus a generated one for the web font, and a single JavaScript file that only the sign-in page loads. Everything else — layout, sticky footer, smooth anchors, hover and focus states — is CSS.

Typography is Cinzel for headings and the system UI stack for body copy, so the only font the browser downloads is the one used for display type, embedded as a data URI in `assets/css/fonts.css`.

**The sign-in form has no backend.** It validates in the browser and then says so, on screen. Nothing is submitted, stored, or sent anywhere.

## Tech stack

| Layer | Technology | Role in the project |
|---|---|---|
| Markup | HTML5 | Three pages: landing, sign-in, 404 |
| Styling | CSS3 with custom properties | Tokens in `:root`, mobile-first `min-width` queries at 480/768/1024/1440 |
| Scripting | Vanilla JavaScript (ES5 syntax, IIFE) | Sign-in form validation only; 112 lines, no globals |
| Typography | Cinzel Variable (400–900) | Headings and brand mark, WOFF2 embedded as a data URI |
| Images | WebP | Two photographs, both with intrinsic `width`/`height` |
| Tooling | None | No package.json, no bundler, no transpiler |

## Project structure

```
.
├── index.html                    # Landing: claim, investing block, footer
├── sign-in.html                  # Sign-in screen (client-side validation only)
├── 404.html                      # Not-found page, links back to the landing
├── robots.txt                    # Allows everything except /404.html
├── sitemap.xml                   # The two indexable URLs
├── assets/
│   ├── css/
│   │   ├── fonts.css             # GENERATED: @font-face with the WOFF2 inlined
│   │   ├── base.css              # Tokens, reset, base typography
│   │   ├── layout.css            # Container, header, hero, feature, footer
│   │   ├── components.css        # Brand, buttons, badge, panel, form fields
│   │   └── pages/
│   │       └── sign-in.css       # Rules only the sign-in screen needs
│   ├── js/
│   │   └── main.js               # Single entry point, loaded by sign-in.html
│   ├── img/
│   │   ├── content/
│   │   │   ├── modern-house-entrance.webp   # Hero, 1200×800
│   │   │   ├── city-towers-skyline.webp     # Investing block, 800×520
│   │   │   └── og-dinnance.jpg              # Open Graph card, 1200×630
│   │   └── logo/
│   │       ├── favicon-32.png
│   │       └── apple-touch-icon.png
│   └── fonts/
│       └── OFL.txt               # SIL Open Font License for Cinzel
└── docs/
    ├── auditoria.md              # Audit of the project before the rewrite
    └── cambios.md                # Change log, grouped by phase
```

## Running it locally

The site is static. Opening `index.html` from disk works — the web font is embedded, so nothing is blocked by the `file://` origin.

To serve it over HTTP instead:

```bash
npx serve .
```

Or, without Node:

```bash
python -m http.server 8000
```

## Deployment

Deployed on Vercel at [dinnance.wib.digital](https://dinnance.wib.digital). Static: point the project at the repository root, no build command, no output directory, no configuration file. Vercel serves `404.html` for unknown paths automatically.

Canonical URLs and `sitemap.xml` use the `.html` suffix because the deployment serves `/sign-in.html` directly and returns 404 for `/sign-in`.

## Limitations

- The sign-in form is a UI demo. Wiring it to a real service means adding a request in `assets/js/main.js` and replacing the message shown after a valid submit.
- The written content is everything the project actually had: the price claim, the investing pitch, and the "Top week" label. Sections that only ever held filler text were removed rather than rewritten with invented copy.
- The two photographs came with the original project and have no recorded source or licence. Confirm the rights before using the site commercially.

## Fonts and licensing

Cinzel is licensed under the SIL Open Font License; `assets/fonts/OFL.txt` is the licence text as distributed. `assets/css/fonts.css` is generated — to swap the font, base64-encode a WOFF2 and replace the data URI:

```bash
python -c "import base64,pathlib;print(base64.b64encode(pathlib.Path('font.woff2').read_bytes()).decode())"
```

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
