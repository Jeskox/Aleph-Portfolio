# ORIGEN — Tostadores Artesanales & Café de Especialidad

> **Proyecto 01 / 03 — Portafolio RandomPages**  
> One-Page moderna, minimalista y de calidad boutique con estética editorial cálida, interactividad de barismo y cero dependencias de build.

---

## Características Destacadas

- **Diseño Editorial & Atmósfera "Warm Earth & Espresso"**: Paleta de tonos crema orgánico, contrastes en café oscuro profundo, acentos en terracota tostado y latón dorado.
- **Tipografía Refinada**: Google Fonts `Playfair Display` (encabezados serif editoriales) y `Plus Jakarta Sans` (cuerpo e interfaz geométrica y legible).
- **100% SVG Vectorial (Regla Estricta: Cero Emojis)**: Todos los iconos son trazados SVG limpios y consistentes (granos, cafeteras de filtro, termómetros, gotas, cronómetros y certificaciones).
- **Herramienta Interactiva de Barista (Calculadora de Ratios & Guía de Extracción)**:
  - 4 métodos de especialidad: Hario V60, Chemex, Aeropress y Prensa Francesa.
  - Ajuste dinámico de dosis (slider de gramos o botones rápidos de tazas).
  - Cálculo instantáneo de mililitros de agua requeridos, temperatura, molienda sugerida y guía de vertidos por etapas.
  - **Cronómetro interactivo de extracción** con barra de progreso, pausas y aviso de término.
- **Catálogo Interactivo de Microlotes**:
  - Filtros dinámicos por proceso (Todos, Lavados, Naturales, Anaeróbicos, Red Honey).
  - Fichas técnicas con puntaje de catador SCA y notas organolépticas.
  - **Modal de Ficha Técnica** con radar/barras sensoriales (acidez, dulzura, cuerpo, aroma).
- **Micro-interacciones & Notificaciones Toast**:
  - Sistema de avisos emergentes sin librerías externas al interactuar con productos o formularios.
  - Formulario de reservas y suscripción a newsletter interactivos.
  - Barra de navegación flotante con efecto glassmorphism al hacer scroll.
  - Animaciones de revelado progresivo (`reveal-init` / `IntersectionObserver`).

---

## Estructura de Archivos

```
01-origen-coffee-onepage/
├── index.html           # Documento principal HTML5 semántico
├── css/
│   └── styles.css       # Estilos personalizados, scrollbar y animaciones
├── js/
│   ├── main.js          # Control de navegación, toasts, menú móvil y formularios
│   ├── catalog.js       # Base de datos de cafés, filtros y modal de ficha técnica
│   └── calculator.js    # Lógica de cálculo de extracción y cronómetro de barista
└── README.md            # Documentación del proyecto y despliegue
```

---

## Cómo Visualizar en Local

No requiere `npm install` ni compilación:

1. **Doble Clic**: Haz doble clic directamente sobre `index.html` para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Safari).
2. **Con VS Code Live Server**:
   - Abre la carpeta `01-origen-coffee-onepage` en VS Code.
   - Clic derecho en `index.html` -> **"Open with Live Server"**.

---

## Cómo Desplegar de Manera Independiente

### Opción A: GitHub Pages
1. Inicializa un repositorio Git dentro de esta carpeta (o en la raíz):
   ```bash
   cd 01-origen-coffee-onepage
   git init
   git add .
   git commit -m "feat: Origen specialty coffee onepage"
   ```
2. Sube el repositorio a GitHub y en la configuración (**Settings > Pages**), selecciona la rama `main` y la carpeta `/ (root)`. ¡Listo en 30 segundos!

### Opción B: Vercel
1. Instala Vercel CLI o conecta tu cuenta en [vercel.com](https://vercel.com).
2. Arrastra la carpeta `01-origen-coffee-onepage` al dashboard de Vercel, o ejecuta en la terminal:
   ```bash
   vercel
   ```
3. Vercel detectará automáticamente que es un proyecto estático sin build y lo publicará al instante en una URL con SSL gratuita.
