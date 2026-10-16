# COSMOS Explorer — Deep Space Observatory & Astrophysics OS

> **Proyecto 03 / 03 — Portafolio RandomPages**  
> Interfaz web empresarial/científica de alta complejidad con simulaciones orbitales y gravitacionales en tiempo real (HTML5 Canvas a 60 FPS), telemetría interactiva, comparador de escalas relativistas y arquitectura Mobile-First híbrida (*Observatory OS*).

---

## Características Técnicas & Módulos Interactivos

1. **Módulo 01: Planetario Orbital en Tiempo Real (Orrery)**:
   - Simulación en vivo con soporte para dos sistemas conmutables: **Sistema Solar Completo (Helios)** con cinturón de asteroides y anillos de Saturno, y **Sistema de Agujero Negro Supermasivo Sagitario A* (Gargantúa)** con disco de acreción relativista y púlsar magnetar.
   - Controles de tiempo (`Pausa`, `0.5x`, `1x`, `4x`, `15x`), cámara con desplazamiento táctil/ratón, zoom y seguimiento automático del astro seleccionado.
   - **Inspector Astrofísico Acoplado**: Renderizado 3D CSS del planeta con atmósfera luminiscente, parámetros orbitales y barras de composición química espectral.
2. **Módulo 02: Laboratorio Sandbox de Gravedad N-Cuerpos**:
   - Motor físico newtoniano interactivo ($F = G \frac{m_1 m_2}{r^2}$).
   - Lanzador vectorial tipo resortera (*Slingshot* compatible con pantalla táctil móvil y ratón) para inyectar planetas rocosos, gigantes gaseosos o cometas en órbita.
   - Control deslizante de masa estelar en vivo (desde Enana Roja hasta Agujero Negro), detección de colisiones y fusiones con ondas de choque luminosas.
3. **Módulo 03: Comparador de Escalas Cósmicas & Calculadora Relativista**:
   - Comparación visual proporcional lado a lado entre cuerpos celestes (Luna, Tierra, Júpiter, Sol, Sirio A y Horizonte de Sagitario A*).
   - Calculadora interactiva de peso gravitacional, velocidad de escape y **dilatación temporal relativista de Einstein** según la masa del usuario.
4. **Módulo 04: Atlas Profundo del Universo (NASA / JWST / EHT)**:
   - Buscador en tiempo real y filtrado por clase astronómica (*Nebulosas JWST*, *Agujeros Negros*, *Estrellas*, *Mundos*).
   - Modal de telemetría espectral con exportación simulada de datos.
5. **Diseño Mobile-First "Observatory OS" & Cero Emojis**:
   - Sidebar técnica en escritorio y **Bottom App-Bar** ergonómica en móviles para cambiar de módulo con el pulgar.
   - 100% libre de emojis; iconografía vectorial SVG pura.

---

## Estructura de Archivos

```
03-enterprise-dashboard/
├── index.html               # Shell de la aplicación Observatory OS y los 4 módulos
├── css/
│   └── styles.css           # Tema Deep Space Obsidian, esferas 3D CSS y HUD
├── js/
│   ├── starfield.js         # Fondo estelar multicapa con paralaje
│   ├── orrery.js            # Simulador del Planetario Orbital e Inspector
│   ├── gravity-sandbox.js   # Motor físico gravitacional N-cuerpos interactivo
│   ├── atlas-relativity.js  # Comparador de escalas, relatividad y Atlas JWST
│   └── main.js              # Reloj UTC/Voyager en vivo, navegación y Toasts SVG
└── README.md                # Documentación e instrucciones de despliegue
```

---

## Cómo Visualizar en Local

No requiere Node.js ni pasos de compilación:
1. Abre directamente `index.html` con **doble clic** en cualquier navegador moderno.
2. O utiliza la extensión **Live Server** en VS Code.

---

## Cómo Desplegar de Manera Independiente

### Opción A: GitHub Pages
1. Inicializa un repositorio Git dentro de `03-enterprise-dashboard`:
   ```bash
   cd 03-enterprise-dashboard
   git init
   git add .
   git commit -m "feat: COSMOS Explorer astrophysics platform"
   ```
2. Sube el repositorio a GitHub y activa **Settings > Pages** apuntando a la rama `main` (`/root`).

### Opción B: Vercel
1. Arrastra la carpeta `03-enterprise-dashboard` al panel de [vercel.com](https://vercel.com) o ejecuta `vercel` desde la terminal dentro de la carpeta.
