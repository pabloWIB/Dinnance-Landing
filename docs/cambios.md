# Registro de cambios — DINNANCE

Reorganización completa del proyecto, 2026-07-30.
Estado de partida documentado en [`auditoria.md`](auditoria.md).

**No se ejecutó ningún comando de git.** Todos los cambios son locales.

---

## Fase 1 — Auditoría

- Inventario completo en `docs/auditoria.md`: 2 HTML, 2 CSS, 0 JS, 42 imágenes
  (10.2 MB) y 13 archivos de fuentes (1.4 MB).
- Detectados 3 enlaces rotos, 1 error de sintaxis CSS, 4 bloques de Lorem ipsum,
  9 enlaces de relleno, 2 títulos heredados de otro proyecto y 39 imágenes que
  ninguna página referenciaba.

---

## Fase 2 — Estructura

| Antes | Después |
|---|---|
| `index.html` | `index.html` (reescrito) |
| `Pagina2.html` | `sign-in.html` |
| — | `404.html` (nuevo) |
| `estilos.css` | `assets/css/base.css` + `layout.css` + `components.css` |
| `Estilos2.css` | `assets/css/pages/sign-in.css` |
| — | `assets/css/fonts.css` (generado) |
| — | `assets/js/main.js` (nuevo) |
| `IMG/35.jpg` | `assets/img/content/city-towers-skyline.webp` |
| `IMG/34.jpg` | `assets/img/content/modern-house-entrance.webp` |
| `DINNANCE.png` | `assets/img/logo/favicon-32.png` + `apple-touch-icon.png` |
| `Fonts/OFL.txt` | `assets/fonts/OFL.txt` |

- Todos los nombres pasan a minúsculas con guiones, sin espacios ni tildes.
- Las 49 rutas internas de HTML y CSS se reescribieron y se verificaron una a una
  contra el disco.
- No se creó `assets/js/modules/`: el JavaScript del proyecto son 112 líneas con
  una sola responsabilidad, y una carpeta de módulos con un archivo dentro sería
  una carpeta vacía disfrazada. Además, los módulos ES no se cargan bajo
  `file://`, y el proyecto tiene que abrirse también desde disco.

---

## Fase 3 — Higiene

Eliminados tras confirmar con `grep` que ningún archivo los referencia:

| Eliminado | Motivo | Peso |
|---|---|---|
| `IMG/` (39 JPEG + `waves.svg` + `36.ico` + `41.png`) | Ninguna página los cargaba | 9.9 MB |
| `Fonts/` (12 TTF + `README.txt`) | Solo se usaba Dancing Script Regular, sustituida por Cinzel | 1.4 MB |
| `DINNANCE.png` | 527 KB para un favicon; sustituido por dos derivados | 527 KB |
| `estilos.css`, `Estilos2.css` | Reemplazados por la nueva hoja de estilos | 9 KB |
| `Pagina2.html` | Renombrada a `sign-in.html` | — |

Los archivos borrados siguen en el historial de git del repositorio; se pueden
recuperar desde ahí si hacen falta.

Creados: `.gitignore` (node_modules, `.env`, `.vercel`, logs, editores, OS),
`robots.txt` y `sitemap.xml`.

Formato normalizado en todos los archivos: indentación de 2 espacios, comillas
dobles en HTML, punto y coma en JS, salto de línea final.

**No se encontró ninguna credencial, token ni clave de API en el código.**

---

## Fase 4 — Imágenes

- De las 42 imágenes originales solo 2 tenían relación real con el producto.
  `IMG/25.jpg`, que se repetía 3 veces en la página, era la promoción de una
  tipografía de terceros; desapareció junto con la sección que la contenía.
- `IMG/34.jpg` (1536×1024, 303 KB) → `modern-house-entrance.webp` 1200×800, 110 KB.
- `IMG/35.jpg` (900×585, 330 KB) → `city-towers-skyline.webp` 800×520, 54 KB.
- `og-dinnance.jpg` 1200×630 (150 KB) recortado del hero para Open Graph.
- Favicons derivados del logo original: 32×32 (2 KB) y 180×180 (23 KB).
- Todas las `<img>` llevan `width` y `height` (sin layout shift), `alt`
  descriptivo real, `loading="lazy"` bajo el fold y `fetchpriority="high"` en el
  hero.

---

## Fase 5 — HTML, SEO y accesibilidad

- `<title>Corona</title>` eliminado de las dos páginas. Cada página tiene ahora
  título único de 51-56 caracteres y `meta description` única de 149-157.
- Añadidos por página: `canonical`, Open Graph completo (`og:title`,
  `og:description`, `og:url`, `og:type`, `og:site_name`, `og:image` con
  dimensiones y `alt`), `twitter:card`, favicon y apple-touch-icon.
- `404.html` lleva `robots: noindex, follow` y no entra en el sitemap.
- Semántica: `header` / `nav` / `main` / `section` / `footer`, un solo `h1` por
  página y jerarquía sin saltos. El `<h1>` sale del `<nav>`; el `<h3>` que hacía
  de botón se convierte en un enlace real.
- Corregido el anidamiento inválido del footer (`<ul>` con `<a>` y `<h2>` como
  hijos directos).
- Accesibilidad: skip link, `<label>` asociado a cada input, `aria-describedby`
  hacia el mensaje de error, `aria-invalid`, regiones `aria-live`, foco visible
  con `:focus-visible` en todos los elementos interactivos, `aria-hidden` en el
  monograma decorativo y navegación completa por teclado. Contraste medido en el
  navegador: mínimo 5.71:1, por encima del 4.5:1 exigido.
- Eliminado todo el texto de relleno: 4 bloques de Lorem ipsum y 9 enlaces
  "Información".
- Corregidos `ABAUT US` → About, `Informaction` → Information, `curses` →
  courses, `type="Email"` → `type="email"`.

### Contenido eliminado por no tener texto real

| Sección | Qué contenía |
|---|---|
| "WE ARE DINNANCE" | Encabezado + 110 palabras de Lorem ipsum |
| "Reasons to Choose Us" | Encabezado + una línea de Lorem ipsum |
| "Reach Your Goals" | 3 tarjetas idénticas, mismo Lorem ipsum, misma imagen ajena |
| Columnas del footer | "Informaction" y "Help & Support" con 9 `<li>Información</li>` |
| `MERCH`, `NEWSPAPER` | Ítems de menú sin página, sin contenido y sin enlace |
| `DOWNLOAD` | CTA a una aplicación que no existe |

Las cuatro frases reales del proyecto se conservan íntegras y repartidas: el
claim del hero, el rótulo "Top week", la pregunta de inversión y la frase del
mercado cripto.

---

## Fase 6 — CSS y sistema de diseño

- Paleta derivada de los verdes que ya usaba `estilos.css` (`#2E3D35`, `#19211D`,
  `#4D6658`, `#171F1B`), ahora en variables de `:root` junto con espaciados,
  radios, sombras, tipografías y transiciones.
- Escala de espaciado 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96. Ningún valor suelto.
- Escala tipográfica con `clamp()` para los dos tamaños de display. Dos familias:
  Cinzel para titulares y la pila del sistema para el cuerpo. Dancing Script se
  retira: era una tipografía caligráfica aplicada a todo el texto corrido.
- Eliminados: la maquetación entera por `position: absolute` con `top` en
  porcentajes, los `background-color: red` de depuración, las declaraciones
  duplicadas, las dos media queries en conflicto, `padding-top: -50px`,
  `padding: 0x 5px`, los selectores sin acotar (`.InviteWeek p, h4`) y el `.`
  suelto que rompía `Estilos2.css`.
- Cero `!important` y ningún selector de más de 3 niveles. El modo
  `prefers-reduced-motion` anula las transiciones cambiando una sola variable.
- Orden dentro de cada archivo: variables → reset → base → layout → componentes →
  utilidades → media queries.

---

## Fase 7 — Responsive

- Mobile-first: las 12 media queries usan `min-width`, en 480 / 768 / 1024 / 1440.
- Verificado en el navegador a 320, 360, 390, 480, 768, 1024 y 1440 px en las
  tres páginas: sin scroll horizontal, sin ningún elemento desbordando el
  viewport y sin áreas táctiles por debajo de 44×44 px.
- Sin menú móvil: la navegación son dos destinos y entran en línea a 320 px. Un
  hamburguesa para dos enlaces habría sido peor experiencia. La cabecera puede
  envolver a dos filas si el contenido crece, sin desbordar nunca.

---

## Fase 8 — UX / UI

- Un CTA principal por bloque, siempre a un destino real (`sign-in.html`).
- Estados completos en todo elemento interactivo: default, hover, focus-visible,
  active y disabled, con transiciones de 180 ms.
- Ancho de línea limitado a 65 caracteres en todos los párrafos.
- El formulario valida en el navegador, marca el campo con `aria-invalid`,
  escribe un mensaje concreto bajo el campo, lleva el foco al primero que falla y
  responde al envío correcto diciendo con todas las letras que no hay servicio de
  autenticación detrás. El espacio del mensaje de error está reservado, así que
  al aparecer no desplaza nada.
- Sin gradientes, sin sombras exageradas y sin animaciones decorativas.

---

## Fase 9 — JavaScript

- El proyecto no tenía JavaScript. Ahora hay un único `assets/js/main.js`, con
  `defer`, cargado solo por `sign-in.html`: la landing y la 404 no descargan nada.
- Todo dentro de una IIFE: cero variables globales, cero `var` fuera del ámbito
  privado, ningún `console` y ningún código muerto.
- Comprueba que el formulario y sus campos existen antes de operar sobre ellos.
- Sin jQuery ni ninguna otra librería.
- Consola limpia en las tres páginas, tanto por HTTP como abriendo los archivos
  desde disco.

---

## Fase 10 — Rendimiento

- La fuente Cinzel Variable pasó de 7 TTF (536 KB, ninguno cargado) a un WOFF2 de
  47 KB empotrado como data URI en `assets/css/fonts.css`. Va empotrada, y no en
  un archivo aparte, porque Chrome bloquea por CORS las peticiones de fuentes
  bajo `file://`: con el WOFF2 externo, abrir `index.html` desde disco perdía la
  tipografía y escribía dos errores en consola. Empotrada, además, no hay salto
  tipográfico al cargar.
- El blob base64 vive en su propio archivo generado para que `base.css` siga
  siendo legible.
- Scripts con `defer`. `font-display: swap`. Sin `preconnect`: no hay orígenes
  externos que precalentar.
- Peso de la primera carga de `index.html`: **197 KB** (251 KB con la imagen
  diferida incluida). `sign-in.html`: 91 KB. El objetivo era menos de 1 MB.
- El repositorio pasa de 11.6 MB a 454 KB.

---

## Fase 11 — QA

Verificado en Chrome, sobre `python -m http.server` y sobre `file://`:

| Comprobación | Resultado |
|---|---|
| Enlaces de menú y footer a páginas existentes | 49 referencias comprobadas contra disco, todas resuelven |
| Rutas de imagen con archivo real | Sin imágenes rotas en ninguna página |
| `<link>` y `<script>` existentes | Todos resuelven |
| Errores de consola | Cero en las 3 páginas, por HTTP y por `file://` |
| Scroll horizontal | Ninguno en 320/360/390/480/768/1024/1440 |
| Menú móvil | No aplica: navegación en línea, sin desplegable |
| Formularios | Validan, marcan error, mueven el foco y confirman |
| Lorem ipsum / TODO / texto de plantilla | Ninguno |
| Título y descripción únicos | Sí, en las 3 páginas |
| `404.html` con vuelta al inicio | Sí |
| Credenciales en el código | Ninguna |

---

## Fase 12 — Documentación

- `README.md` actualizado: la reorganización cambió todas las rutas, el nombre de
  la segunda página y la forma de arrancar el proyecto, así que se reescribió
  entero en inglés técnico con la estructura nueva, sin referencias a imágenes
  inexistentes.
- `docs/auditoria.md` y `docs/cambios.md` (este archivo).

---

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente y sirviendo con
  `python -m http.server` y `npx serve`.
- No queda ninguna ruta absoluta del disco: las tres que había
  (`file:///C:/Users/pablo/Desktop/ESTATICAS/...`) desaparecieron.
- Todas las rutas internas son relativas y en minúsculas.
- No se creó ningún archivo de configuración de hosting: el despliegue actual en
  Vercel sirve la raíz tal cual, devuelve 404 para rutas inexistentes y usa
  `404.html` automáticamente. Comprobado contra el dominio en producción.
- No se hizo deploy.
