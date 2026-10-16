# NEXO — Estudio de Arquitectura & Construcción Sostenible

> **Proyecto 02 / 03 — Portafolio RandomPages**  
> Web corporativa / estándar para negocio de alto nivel, diseñada bajo filosofía Mobile-First absoluta, con comparador interactivo táctil Antes/Después, catálogo de obras con planos arquitectónicos vectoriales y despliegue estático independiente.

---

## Características Principales

- **Arquitectura Mobile-First Nativa**:
  - **Quick-Action Bar Inferior Fija**: Barra ergonómica para smartphones que sitúa las acciones más importantes al alcance natural del pulgar (*Obras*, *Antes/Después*, *Fases*, *Viabilidad*).
  - **Menú Drawer Deslizable**: Navegación táctil fluida con prevención de saltos de desplazamiento.
  - **Áreas Táctiles Mínimas de 48px**: Diseñada para evitar toques erróneos en pantallas táctiles de cualquier tamaño.
- **Componente Estrella: Comparador Interactivo Antes / Después (Touch-Enabled)**:
  - Permite arrastrar el tirador con el dedo en pantallas táctiles móviles o con el ratón en escritorio.
  - Compara la ruina previa de un inmueble industrial frente a su reconversión contemporánea bioclimática.
- **Showcase de Obras & Planos Arquitectónicos**:
  - Filtro dinámico en tiempo real por tipología (Residencial, Comercial, Rehabilitación, Passivhaus).
  - Modal inmersivo con planos vectoriales limpios SVG, orientación solar, materiales y sistemas de climatización.
- **Identidad Visual "Concreto Arquitectónico & Ocre Cálido"**:
  - Fondo gris técnico sutil `#F8F9FA` con retícula blueprint, contrastes en grafito ébano `#121316` y acentos en ocre tostado `#D97736`.
  - Tipografía geométrica de alto impacto: Google Fonts `Syne` (títulos y acentos de marca) + `Plus Jakarta Sans` (cuerpo de texto técnico).
- **Regla Estricta: Cero Emojis**:
  - 100% de la iconografía está construida mediante vectores SVG precisos (compases, lamas bioclimáticas, planos de planta, estrellas de valoración y sellos de certificación).
- **Metodología en Fases, Testimonios y Acordeón FAQ**:
  - Explicación de las 4 etapas de proyecto con presupuesto cerrado.
  - Opiniones verificadas de clientes y promotores.
  - Acordeón interactivo para resolución de dudas frecuentes.
- **Formulario de Viabilidad con Notificaciones Toast**:
  - Captación de leads cualificados con validación interactiva y confirmación en tiempo real.

---

## Estructura de Archivos

```
02-business-website/
├── index.html           # Documento principal HTML5 semántico y mobile-first
├── css/
│   └── styles.css       # Estilos para el comparador táctil, quick-bar y retícula
├── js/
│   ├── main.js          # Control de drawer móvil, acordeón FAQ, toasts y scroll
│   ├── before-after.js  # Lógica del comparador interactivo táctil / ratón
│   └── projects.js      # Catálogo de obras, filtrado y modal de planos SVG
└── README.md            # Documentación e instrucciones de despliegue
```

---

## Cómo Visualizar en Local

No requiere NodeJS, npm ni procesos de compilación:

1. **Doble Clic**: Haz doble clic directamente sobre `index.html` para abrirlo en cualquier navegador web.
2. **Con VS Code**:
   - Abre la carpeta `02-business-website` en VS Code.
   - Clic derecho en `index.html` -> **"Open with Live Server"**.

---

## Cómo Desplegar de Manera Independiente

### Opción A: GitHub Pages
1. Inicializa un repositorio Git en la carpeta `02-business-website`:
   ```bash
   cd 02-business-website
   git init
   git add .
   git commit -m "feat: NEXO architecture business website"
   ```
2. Sube los archivos a un nuevo repositorio en GitHub y en **Settings > Pages**, activa la publicación desde la rama `main` en `/ (root)`.

### Opción B: Vercel
1. Arrastra la carpeta `02-business-website` directamente a tu panel de Vercel en [vercel.com](https://vercel.com).
2. Se publicará instantáneamente en segundos con SSL gratuito y CDN global.
