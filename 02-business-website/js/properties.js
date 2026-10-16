/**
 * NEXO Real Estate — Catálogo de Propiedades & Ficha Detallada
 * Inmuebles en venta y alquiler con especificaciones claras y humanas
 * 0 Emojis — 100% Vectores SVG
 */

const PROPERTIES_DATA = [
  {
    id: "villa-mirador",
    title: "Villa Mirador del Valle",
    category: "villas",
    categoryLabel: "Chalet Independiente",
    location: "Guadarrama, Madrid",
    price: "680.000 €",
    priceNum: 680000,
    status: "En Venta",
    badgeColor: "bg-[#0F1E36] text-white",
    beds: "4 dorms",
    baths: "3 baños",
    area: "340 m²",
    plot: "850 m² parcela",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    description: "Chalet independiente de diseño contemporáneo rodeado de naturaleza. Dispone de salón con techos a doble altura, ventanales panorámicos que inundan la casa de luz, cocina con isla central y jardín privado con piscina de cloración salina. Climatización por suelo radiante y placas solares.",
    features: [
      "Piscina privada de cloración salina",
      "Jardín consolidado de 850 m²",
      "Garaje para 2 vehículos grandes",
      "Calefacción por aerotermia y suelo radiante",
      "Vistas despejadas a la sierra"
    ],
    contactRef: "REF-MIRADOR-680"
  },
  {
    id: "atico-loft-poblenou",
    title: "Ático Loft de Diseño Industrial",
    category: "aticos",
    categoryLabel: "Ático con Terraza",
    location: "Poblenou, Barcelona",
    price: "520.000 €",
    priceNum: 520000,
    status: "En Venta",
    badgeColor: "bg-[#0284C7] text-white",
    beds: "2 dorms",
    baths: "2 baños",
    area: "165 m²",
    plot: "Terraza 45 m²",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    description: "Antigua nave industrial rehabilitada y convertida en una vivienda tipo loft con carácter propio. Techos de 4 metros con vigas vistas, paredes de ladrillo original restaurado, terraza privada de 45 m² a pie de salón y suite principal con vestidor. A 5 minutos a pie de la playa de Bogatell.",
    features: [
      "Terraza privada soleada de 45 m²",
      "Techos de 4 metros de altura",
      "Finca con ascensor y pocos vecinos",
      "A 500 metros de la playa de Bogatell",
      "Espacio polivalente para estudio o despacho"
    ],
    contactRef: "REF-POBLENOU-520"
  },
  {
    id: "villa-horizonte",
    title: "Villa Horizonte & Acantilado",
    category: "villas",
    categoryLabel: "Villa de Lujo",
    location: "Jávea, Alicante",
    price: "1.250.000 €",
    priceNum: 1250000,
    status: "Exclusiva",
    badgeColor: "bg-[#0F1E36] text-white",
    beds: "5 dorms",
    baths: "4 baños",
    area: "420 m²",
    plot: "1.200 m² parcela",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
    description: "Exclusiva villa construida sobre un acantilado en primera línea con vistas panorámicas al Mediterráneo. Piscina desbordante infinity integrada en la terraza de teca, 5 amplias habitaciones en suite, cocina de chef y acceso privado a una cala de aguas cristalinas.",
    features: [
      "Vistas panorámicas 180° al mar",
      "Piscina desbordante infinity pool",
      "Acceso directo y privado a cala",
      "Domótica integral con control remoto",
      "Gran terraza exterior con barbacoa y porche"
    ],
    contactRef: "REF-HORIZONTE-125"
  },
  {
    id: "edificio-vanguard",
    title: "Sede Corporativa Vanguard Tech",
    category: "oficinas",
    categoryLabel: "Oficinas / Corporativo",
    location: "Parque Tecnológico, Valencia",
    price: "1.850.000 €",
    priceNum: 1850000,
    status: "En Venta / Inversión",
    badgeColor: "bg-[#1A3156] text-white",
    beds: "Plantas Diáfanas",
    baths: "6 aseos",
    area: "1.450 m²",
    plot: "28 plazas garaje",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
    description: "Edificio de oficinas representativo en el polo tecnológico de mayor crecimiento. Tres plantas diáfanas totalmente modulables, atrio interior con luz natural cenital, 28 plazas de aparcamiento subterráneo y certificación de bajo consumo energético.",
    features: [
      "28 plazas de garaje incluidas",
      "Atrio central ajardinado y luminoso",
      "Plantas modulables adaptables a cualquier equipo",
      "Alta rentabilidad para inversión patrimonial",
      "Control de accesos y conserjería"
    ],
    contactRef: "REF-VANGUARD-185"
  },
  {
    id: "piso-salamanca",
    title: "Piso Señorial en Barrio Salamanca",
    category: "pisos",
    categoryLabel: "Piso Familiar de Autor",
    location: "Barrio de Salamanca, Madrid",
    price: "790.000 €",
    priceNum: 790000,
    status: "Oportunidad",
    badgeColor: "bg-[#0284C7] text-white",
    beds: "3 dorms",
    baths: "3 baños",
    area: "185 m²",
    plot: "Finca clásica",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85",
    description: "Vivienda clásica reformada integralmente con acabados de primera calidad. Salón exterior con 3 balcones a la calle, techos altos con molduras recuperadas, tres dormitorios con baño en suite y cocina de diseño equipada con electrodomésticos de gama alta. Incluye trastero.",
    features: [
      "Tres balcones exteriores a calle tranquila",
      "Finca clásica con portero físico",
      "Reforma a estrenar con materiales nobles",
      "Trastero incluido en la misma finca",
      "A dos calles del Parque del Retiro"
    ],
    contactRef: "REF-SALAMANCA-790"
  },
  {
    id: "residencial-jardines",
    title: "Bajo con Jardín en Monte del Pilar",
    category: "pisos",
    categoryLabel: "Bajo con Jardín",
    location: "Majadahonda, Madrid",
    price: "430.000 €",
    priceNum: 430000,
    status: "En Venta",
    badgeColor: "bg-[#0F1E36] text-white",
    beds: "3 dorms",
    baths: "2 baños",
    area: "140 m²",
    plot: "Jardín 90 m²",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=85",
    description: "Vivienda en planta baja con jardín privado de 90 m² en una de las mejores urbanizaciones cerradas de la zona noroeste. Piscina comunitaria, pistas de pádel, amplias zonas verdes y vigilancia 24h. Incluye 2 plazas de garaje contiguas y un amplio trastero.",
    features: [
      "Jardín privado de 90 m² con césped y porche",
      "2 plazas de aparcamiento y trastero",
      "Urbanización con piscinas, pádel y seguridad 24h",
      "Orientación mediodía muy soleada",
      "Entorno residencial familiar y seguro"
    ],
    contactRef: "REF-MAJADAHONDA-430"
  }
];

// Generar tarjeta HTML para una propiedad
function createPropertyCardHtml(property) {
  return `
    <article class="card-property flex flex-col justify-between reveal-init">
      <div>
        <!-- Imagen y Badges -->
        <div class="relative aspect-[16/10] overflow-hidden bg-[#E2EBF4]">
          <img 
            src="${property.image}" 
            alt="${property.title}" 
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div class="absolute top-3 left-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-bold text-[#0F1E36] shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
              ${property.categoryLabel}
            </span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="inline-flex items-center px-2.5 py-1 ${property.badgeColor} rounded-md text-[10px] font-bold tracking-wide shadow-sm">
              ${property.status}
            </span>
          </div>
          <div class="absolute bottom-3 right-3">
            <span class="inline-flex items-center px-3.5 py-1.5 bg-[#0F1E36]/90 backdrop-blur-md text-white rounded-xl text-sm font-bold tracking-wide shadow-lg">
              ${property.price}
            </span>
          </div>
        </div>

        <!-- Info Principal -->
        <div class="p-6">
          <div class="flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] mb-1.5">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${property.location}</span>
          </div>

          <h3 class="font-display text-xl font-bold text-[#0F1E36] mb-2 leading-snug">
            ${property.title}
          </h3>

          <p class="text-xs text-[#526071] line-clamp-2 leading-relaxed mb-4">
            ${property.description}
          </p>

          <!-- Métricas Clave (Dorms, Baños, Superficie) -->
          <div class="grid grid-cols-3 gap-2 py-3 border-y border-[#CBD8E6]/60 text-center text-xs">
            <div class="flex flex-col items-center">
              <span class="text-[10px] text-[#526071] uppercase font-semibold">Espacio</span>
              <span class="font-bold text-[#0F1E36] mt-0.5">${property.beds}</span>
            </div>
            <div class="flex flex-col items-center border-x border-[#CBD8E6]/60">
              <span class="text-[10px] text-[#526071] uppercase font-semibold">Baños</span>
              <span class="font-bold text-[#0F1E36] mt-0.5">${property.baths}</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-[10px] text-[#526071] uppercase font-semibold">Superficie</span>
              <span class="font-bold text-[#0F1E36] mt-0.5">${property.area}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones de Tarjeta -->
      <div class="px-6 pb-6 pt-1 flex items-center justify-between gap-3">
        <span class="text-[11px] font-mono font-semibold text-[#526071]">
          ${property.contactRef}
        </span>
        <button 
          type="button" 
          onclick="openPropertyModal('${property.id}')"
          class="px-4 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#0284C7] text-white text-xs font-bold transition-all duration-300 shadow-sm flex items-center gap-1.5"
        >
          <span>Ver Detalles</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </article>
  `;
}

// Inicializar Catálogo de Propiedades y Filtros
function initPropertiesShowcase() {
  const container = document.getElementById("properties-grid");
  const featuredContainer = document.getElementById("featured-properties-grid");
  const filterBtns = document.querySelectorAll(".property-filter-btn");

  // Renderizar destacados en página de inicio (primeras 3 propiedades)
  if (featuredContainer) {
    featuredContainer.innerHTML = PROPERTIES_DATA.slice(0, 3)
      .map(createPropertyCardHtml)
      .join("");
  }

  // Renderizar catálogo completo en subpágina de propiedades
  if (container) {
    function renderFiltered(filter = "todos") {
      container.innerHTML = "";
      const filtered = filter === "todos"
        ? PROPERTIES_DATA
        : PROPERTIES_DATA.filter(p => p.category === filter);

      container.innerHTML = filtered.map(createPropertyCardHtml).join("");

      if (window.observeNewElements) {
        window.observeNewElements();
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.classList.remove("bg-[#0F1E36]", "text-white");
          b.classList.add("bg-white", "text-[#0F1E36]");
        });
        btn.classList.add("bg-[#0F1E36]", "text-white");
        btn.classList.remove("bg-white", "text-[#0F1E36]");

        const filter = btn.getAttribute("data-filter");
        renderFiltered(filter);
      });
    });

    renderFiltered("todos");
  }
}

// Abrir Modal de Ficha Técnica Inmobiliaria
function openPropertyModal(propertyId) {
  const property = PROPERTIES_DATA.find(p => p.id === propertyId);
  const modal = document.getElementById("property-modal");
  const modalBody = document.getElementById("property-modal-body");

  if (!property || !modal || !modalBody) return;

  const featuresList = property.features
    .map(f => `
      <li class="flex items-center gap-2.5 text-xs text-[#0F1E36]">
        <div class="w-5 h-5 rounded-full bg-[#E2EBF4] text-[#0284C7] flex items-center justify-center shrink-0">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <span>${f}</span>
      </li>
    `)
    .join("");

  modalBody.innerHTML = `
    <div>
      <!-- Imagen de Cabecera -->
      <div class="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-[#E2EBF4]">
        <img 
          src="${property.image}" 
          alt="${property.title}" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0F1E36]/80 via-transparent to-transparent"></div>
        <div class="absolute top-4 left-4 flex gap-2">
          <span class="px-3 py-1 bg-white/95 rounded-full text-xs font-bold text-[#0F1E36] shadow-sm">
            ${property.categoryLabel}
          </span>
          <span class="px-3 py-1 ${property.badgeColor} rounded-full text-xs font-bold shadow-sm">
            ${property.status}
          </span>
        </div>
        <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <div class="flex items-center gap-1.5 text-xs text-[#CBD8E6] mb-1">
              <svg class="w-3.5 h-3.5 text-[#0284C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>${property.location}</span>
            </div>
            <h3 class="font-display text-2xl sm:text-3xl font-bold leading-tight">${property.title}</h3>
          </div>
          <span class="font-serif text-2xl sm:text-3xl font-bold text-white shrink-0">${property.price}</span>
        </div>
      </div>

      <!-- Resumen Métrico -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F0F4F8] rounded-xl border border-[#CBD8E6] mb-6 text-center">
        <div>
          <span class="text-[10px] uppercase font-bold text-[#526071] block">Dormitorios</span>
          <span class="font-bold text-[#0F1E36] text-sm">${property.beds}</span>
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold text-[#526071] block">Baños</span>
          <span class="font-bold text-[#0F1E36] text-sm">${property.baths}</span>
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold text-[#526071] block">Superficie</span>
          <span class="font-bold text-[#0F1E36] text-sm">${property.area}</span>
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold text-[#526071] block">Parcela / Extras</span>
          <span class="font-bold text-[#0F1E36] text-sm">${property.plot}</span>
        </div>
      </div>

      <!-- Descripción Detallada -->
      <div class="space-y-4 mb-6">
        <h4 class="font-display text-base font-bold text-[#0F1E36]">Descripción del Inmueble</h4>
        <p class="text-xs sm:text-sm text-[#526071] leading-relaxed">
          ${property.description}
        </p>
      </div>

      <!-- Puntos Destacados -->
      <div class="mb-8">
        <h4 class="font-display text-base font-bold text-[#0F1E36] mb-3">Comodidades &amp; Calidades</h4>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${featuresList}
        </ul>
      </div>

      <!-- Botones de Acción -->
      <div class="pt-6 border-t border-[#CBD8E6] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-xs text-[#526071]">
          <span>Referencia: </span>
          <span class="font-mono font-bold text-[#0F1E36]">${property.contactRef}</span>
        </div>
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button 
            type="button" 
            onclick="closePropertyModal()" 
            class="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-[#CBD8E6] text-xs font-bold text-[#0F1E36] hover:bg-[#F0F4F8] transition-colors"
          >
            Cerrar Ficha
          </button>
          <button 
            type="button" 
            onclick="solicitarVisita('${property.title}', '${property.contactRef}')" 
            class="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Solicitar Visita</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closePropertyModal() {
  const modal = document.getElementById("property-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

// Acción al solicitar visita desde el modal
function solicitarVisita(titulo, referencia) {
  closePropertyModal();
  if (window.switchSubpage) {
    window.switchSubpage("contacto");
  }
  // Pre-llenar campo de mensaje si existe
  const msgInput = document.getElementById("contact-message");
  if (msgInput) {
    msgInput.value = `Hola, me gustaría concertar una visita presencial para ${titulo} (${referencia}).`;
  }
  if (window.showToast) {
    window.showToast(
      "Inmueble Seleccionado",
      `Hemos preparado tu solicitud para ${titulo}. Completa tus datos para agendar la fecha.`,
      "info"
    );
  }
}

window.initPropertiesShowcase = initPropertiesShowcase;
window.openPropertyModal = openPropertyModal;
window.closePropertyModal = closePropertyModal;
window.solicitarVisita = solicitarVisita;
