# Auditoría inicial — DINNANCE

Fecha: 2026-07-30
Estado del proyecto en el momento de la auditoría (antes de cualquier cambio).

---

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Se carga |
|---|---|---|---|---|
| `index.html` | `Corona` | `DINNANCE` | Landing de marketing: claim de precio, bloque de inversión, footer | Sí (raíz) |
| `Pagina2.html` | `Corona` | `DINNANCE` | Pantalla de acceso (email + contraseña) | Solo por enlace roto |

Los dos títulos son `Corona`, heredados de otro proyecto. Ninguna página tiene
`meta description`, Open Graph ni `canonical`.

---

## 2. CSS

| Archivo | Peso | Lo carga | Estado |
|---|---|---|---|
| `estilos.css` | 7.2 KB | `index.html` | En uso |
| `Estilos2.css` | 1.7 KB | `Pagina2.html` | En uso, con error de sintaxis |

No hay CSS huérfano, pero sí problemas graves:

| Problema | Ubicación | Detalle |
|---|---|---|
| Error de sintaxis | `Estilos2.css:112` | Un `.` suelto dentro de `@media (max-width:690px)` invalida el cierre del bloque |
| Maquetación por `position: absolute` | `estilos.css` (todo el archivo) | Todos los bloques se colocan con `top` en porcentajes, hasta `top: 270%`. El layout solo cuadra en anchos concretos |
| Cajas rojas de depuración | `estilos.css:373-395` | `.Reach1`, `.Reach2`, `.Reach3` tienen `background-color: red` |
| Declaraciones duplicadas | `estilos.css:206-212` | `.InviteWeek section` repite `color: red` y `font-weight: 500` |
| Media queries en conflicto | `estilos.css:305-319` | Dos bloques `@media (max-width:550px)` para `.ChooseUs` con valores contrarios; gana el segundo |
| Propiedades inválidas | `estilos.css:273`, `:516` | `padding-top: -50px` (no existe padding negativo) |
| Typo en propiedad | `estilos.css:241` | `padding: 0x 5px` |
| Selectores sin acotar | `estilos.css:219`, `:239` | `.InviteWeek p, h4` aplica a **todos** los `h4` y `p` del documento |
| Desktop-first | ambos archivos | 15 media queries, todas `max-width` |
| Sin variables | ambos archivos | Ningún `:root`; los colores se repiten a mano (`#2E3D35` aparece 6 veces) |
| Contenido oculto en vez de responsive | `estilos.css:277-281`, `:414-421`, `:519-523` | `visibility: hidden` para resolver móvil |

---

## 3. JavaScript

No existe ningún archivo `.js` en el proyecto. La página no tiene menú móvil,
ni validación de formulario, ni ninguna interacción más allá de `:hover` en CSS.

---

## 4. Imágenes

Total en disco: **10.2 MB** (42 archivos en `IMG/` + `DINNANCE.png` en raíz).
Referenciadas por HTML o CSS: **3**.

### Referenciadas

| Archivo | Dimensiones | Peso | Formato | Uso |
|---|---|---|---|---|
| `DINNANCE.png` | 1024×1024 | 527 KB | PNG | Favicon de las dos páginas (527 KB para un favicon) |
| `IMG/35.jpg` | 900×585 | 330 KB | JPEG | Foto en el bloque `.InviteWeek` |
| `IMG/25.jpg` | 750×748 | 111 KB | JPEG | Repetida 3 veces en `.ReachYourGoals` |

### Huérfanas (39 archivos, ~9.3 MB)

`1.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`, `7.jpg`, `8.jpg`, `9.jpg`, `10.jpg`,
`11.jpg`, `12.jpg`, `13.jpg`, `14.jpg`, `15.jpg`, `16.jpg`, `17.jpg`, `18.jpg`,
`19.jpg`, `20.jpg`, `21.jpg`, `22.jpg`, `23.jpg`, `24.jpg`, `26.jpg`, `27.jpg`,
`28.jpg`, `29.jpg`, `30.jpg`, `31.jpg`, `32.jpg`, `33.jpg`, `34.jpg`, `36.jpg`,
`37.jpg`, `38.jpg`, `39.jpg`, `40.jpg`, `41.png`, `36.ico`, `waves.svg`.

Nota de contenido: la carpeta es un tablero de referencias mezclado. La mayoría
son carteles tipográficos y mockups de branding ajenos al producto. Solo dos
imágenes tienen relación temática con un asesor inmobiliario: `34.jpg` (fachada
de vivienda) y `35.jpg` (torres en blanco y negro). `25.jpg`, la que se usaba
tres veces como ilustración de "Reach Your Goals", es la promoción de una
tipografía de terceros (`HappyFatFont`, @Jazheiman) sin ninguna relación con el
proyecto.

Ninguna imagen tiene `width`/`height` en el HTML, ni `loading`, ni `alt` real
(las tres etiquetas son `alt=""` sobre imágenes de contenido).

---

## 5. Fuentes

| Archivo | Peso | Estado |
|---|---|---|
| `Fonts/DancingScript-Regular.ttf` | 79 KB | Único declarado en `@font-face`, aplicado a **todo** el texto |
| `Fonts/DancingScript-Medium/SemiBold/Bold.ttf` | 238 KB | Nunca referenciados |
| `Fonts/Cinzel-*.ttf` (6 estáticas + 1 variable) | 536 KB | Nunca referenciados, ni un solo `@font-face` |
| `Fonts/OFL.txt` | 4.4 KB | Licencia SIL Open Font — obligatoria, se conserva |
| `Fonts/README.txt` | 2.2 KB | Notas de distribución de Google Fonts |

Dancing Script es una tipografía caligráfica de display usada como fuente de
texto corrido en las dos páginas. Es el mayor problema de legibilidad del sitio.
Sin `font-display`, sin `preconnect` (no hace falta: son locales).

---

## 6. Dependencias externas

Ninguna. Sin CDN, sin Google Fonts remoto, sin librerías, sin `package.json`,
sin paso de build. Es el punto más sano del proyecto.

---

## 7. Enlaces rotos

| Archivo | Línea | Destino | Problema |
|---|---|---|---|
| `index.html` | 70 | `file:///C:/Users/pablo/Desktop/ESTATICAS/7.%20Estatica/Pagina2.html` | Ruta absoluta al disco del autor. En producción no resuelve |
| `index.html` | 103 | `file:///C:/Users/pablo/Desktop/ESTATICAS/7.%20Estatica/Pagina2.html` | Idem |
| `Pagina2.html` | 21 | `file:///C:/Users/pablo/Desktop/ESTATICAS/7.%20Estatica/Pagina.html` | Ruta absoluta **y** apunta a `Pagina.html`, archivo que ya no existe (se renombró a `index.html`) |

Los tres enlaces del sitio están rotos. No existe ninguna navegación funcional
entre las dos páginas.

Además, los ítems del menú (`ABAUT US`, `MERCH`, `NEWSPAPER`) son `<li>` sin
`<a>`: no llevan a ningún sitio y no se alcanzan con teclado. No existe página
ni contenido para ninguno de los tres.

---

## 8. Contenido de relleno heredado

| Ubicación | Contenido |
|---|---|
| `index.html:32-43` | Párrafo de Lorem ipsum, ~110 palabras, bajo "WE ARE DINNANCE" |
| `index.html:79` | Lorem ipsum bajo "Reasons to Choose Us" |
| `index.html:86, 91, 96` | Mismo Lorem ipsum repetido en las tres tarjetas de "Reach Your Goals" |
| `index.html:108-110, 116-118, 124-126` | Nueve `<li>Información</li>` como enlaces de footer |

Texto real del proyecto (todo lo que no es relleno):

- `True $0/Month` · `Online Real Estate Advisor`
- `Hey, looking for new ways of investing? If your answer is Yes, then we are the
  best option for you, take a look at all the amazing curses we have.`
- `We make it easy for everyone to invest in the crypto market`
- `Top Week`

Cuatro frases. Todo lo demás en la página es encabezado sin cuerpo o Lorem ipsum.

---

## 9. Errores de redacción

| Texto actual | Correcto | Ubicación |
|---|---|---|
| `ABAUT US` | About us | `index.html:17` |
| `Informaction` | Information | `index.html:115` |
| `curses` | courses | `index.html:62` |
| `type="Email"` | `type="email"` | `Pagina2.html:15` |
| `method="Get"` | `method="get"` | `Pagina2.html:14` |

---

## 10. HTML duplicado entre páginas

`<head>` casi idéntico (charset, viewport, title, favicon) pero con el orden de
etiquetas cambiado. No hay header, nav ni footer compartidos: `Pagina2.html` no
tiene ninguno de los tres.

---

## 11. Accesibilidad y semántica

| Problema | Detalle |
|---|---|
| `lang="en"` con contenido en español | `Información`, `Ingresa tu email`, `Ingresa tu Contraseña` |
| Inputs sin `<label>` | Los tres campos de `Pagina2.html` solo tienen `placeholder` |
| Sin foco visible | Ningún `:focus` ni `:focus-visible` en el CSS |
| Jerarquía de encabezados rota | `<h1>` dentro de `<nav>`; `<h3>` usado como botón; dos `<h2>` consecutivos para un mismo título en `.InviteWeek` |
| Anidamiento inválido | `<ul>` que contiene `<a>` y `<h2>` como hijos directos (`index.html:102-127`) |
| `alt` vacío en imágenes de contenido | Las tres `<img>` |
| Contraste | Rojo puro sobre blanco en `.InviteWeek section` ≈ 4.0:1, por debajo del mínimo 4.5:1 |
| Navegación con teclado | Imposible: no hay ni un solo enlace o botón alcanzable en el menú |
| MIME incorrecto | `type="image/x-icon"` sobre un archivo PNG |

---

## 12. Archivos basura

No hay `.bak`, `node_modules`, `.DS_Store` ni `Thumbs.db`. Tampoco hay
`.gitignore`, `robots.txt`, `sitemap.xml` ni `404.html`.

---

## Resumen en cinco líneas

1. DINNANCE es una landing estática de dos pantallas para un producto financiero
   ficticio (asesor inmobiliario a 0 $/mes), sin build, sin dependencias y sin JS.
2. El código es de una etapa muy temprana: todo el layout se sostiene con
   `position: absolute` y porcentajes de `top`, así que solo se ve bien en los
   anchos exactos en los que se probó.
3. Lo más grave son los tres enlaces del sitio: los tres apuntan a
   `file:///C:/Users/pablo/Desktop/...`, uno de ellos a un archivo que ya no
   existe. La navegación está rota al 100 % y expone rutas del disco del autor.
4. Le sigue el contenido: solo hay cuatro frases reales; el resto es Lorem ipsum,
   encabezados sin cuerpo y nueve enlaces "Información". Y ambos `<title>` dicen
   `Corona`, de otro proyecto.
5. El peso es el tercer problema: 10.2 MB de imágenes de los que se usan 968 KB,
   con un favicon de 527 KB, y 1.4 MB de fuentes de los que se carga una sola.
