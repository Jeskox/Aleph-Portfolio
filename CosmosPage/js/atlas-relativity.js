/**
 * COSMOS — Módulo 3 & 4: Comparativa de Escalas, Parámetros Relativistas
 * y Archivo Enciclopédico (Imágenes Oficiales NASA / ESA / JWST / EHT)
 */

const SCALE_BODIES = {
  moon: {
    name: "Luna (Tierra I)",
    diameterKm: 3474,
    colorGrad: "radial-gradient(circle at 30% 30%, #F1F5F9, #94A3B8 60%, #334155 100%)",
    glow: "rgba(148, 163, 184, 0.3)"
  },
  mars: {
    name: "Marte",
    diameterKm: 6779,
    colorGrad: "radial-gradient(circle at 30% 30%, #FCA5A5, #EA580C 55%, #7F1D1D 100%)",
    glow: "rgba(234, 88, 12, 0.35)"
  },
  earth: {
    name: "Tierra",
    diameterKm: 12742,
    colorGrad: "radial-gradient(circle at 30% 30%, #7DD3FC, #0284C7 55%, #0F172A 100%)",
    glow: "rgba(56, 189, 248, 0.45)"
  },
  neptune: {
    name: "Neptuno",
    diameterKm: 49244,
    colorGrad: "radial-gradient(circle at 30% 30%, #93C5FD, #2563EB 55%, #1E1B4B 100%)",
    glow: "rgba(37, 99, 235, 0.45)"
  },
  jupiter: {
    name: "Júpiter",
    diameterKm: 139820,
    colorGrad: "radial-gradient(circle at 30% 30%, #FDE68A, #D97706 55%, #451A03 100%)",
    glow: "rgba(245, 158, 11, 0.45)"
  },
  sun: {
    name: "Sol",
    diameterKm: 1392700,
    colorGrad: "radial-gradient(circle at 30% 30%, #FEF08A, #F59E0B 45%, #EA580C 85%, #7C2D12 100%)",
    glow: "rgba(245, 158, 11, 0.7)"
  },
  sirius: {
    name: "Sirio A (Alpha CMa)",
    diameterKm: 2380000,
    colorGrad: "radial-gradient(circle at 30% 30%, #FFFFFF, #7DD3FC 45%, #0284C7 85%, #1E3A8A 100%)",
    glow: "rgba(125, 211, 252, 0.75)"
  },
  sgrA: {
    name: "Sagitario A* (2 Rₛ)",
    diameterKm: 24000000,
    isBlackHole: true,
    colorGrad: "radial-gradient(circle at 50% 50%, #000000 58%, #F59E0B 82%, #7C2D12 100%)",
    glow: "rgba(245, 158, 11, 0.85)"
  }
};

const RELATIVITY_REFERENCE_DATA = [
  {
    name: "Tierra",
    designation: "Referencia Terrestre (1,00 g)",
    gravity: "9,807 m/s²",
    escapeVel: "11,19 km/s",
    timeDilation: "1,0000000007 (Base)",
    note: "Potencial gravitatorio débil; la dilatación temporal frente a un observador en el infinito es de apenas 0,02 segundos por año."
  },
  {
    name: "Júpiter",
    designation: "Gigante Gaseoso (2,53 g)",
    gravity: "24,79 m/s²",
    escapeVel: "59,50 km/s",
    timeDilation: "1,000000020",
    note: "El pozo gravitacional planetario más profundo del Sistema Solar; desvía perceptiblemente la luz de estrellas distantes (efecto medido por Cassini)."
  },
  {
    name: "Sol (Fotosfera)",
    designation: "Estrella G2V (27,9 g)",
    gravity: "274,0 m/s²",
    escapeVel: "617,7 km/s",
    timeDilation: "1,00000212",
    note: "Produce una deflexión de la luz estelar de 1,75 segundos de arco en el limbo solar, confirmada por Arthur Eddington durante el eclipse de 1919."
  },
  {
    name: "Sirio B (Enana Blanca)",
    designation: "Remanente Degenerado",
    gravity: "4,5 × 10⁶ m/s²",
    escapeVel: "5.200 km/s",
    timeDilation: "1,00015",
    note: "Concentra una masa similar a la del Sol en un volumen comparable al de la Tierra, provocando un notable corrimiento al rojo gravitacional."
  },
  {
    name: "PSR J1745-2900",
    designation: "Estrella de Neutrones",
    gravity: "~2,0 × 10¹² m/s²",
    escapeVel: "~150.000 km/s (0,5 c)",
    timeDilation: "1,31 (31% más lento)",
    note: "A tan solo unos kilómetros de su radio de Schwarzschild, los relojes en su superficie atrasan casi 19 minutos por cada hora lejana."
  },
  {
    name: "Sagitario A* (r = 1,02 Rₛ)",
    designation: "Proximidad Horizonte de Sucesos",
    gravity: "Divergente (Métrica Kerr)",
    escapeVel: "299.792 km/s (→ c)",
    timeDilation: "7,08 (1 h ≈ 7 h externas)",
    note: "En las inmediaciones de la última órbita circular estable (ISCO), la curvatura del espacio-tiempo dilata drásticamente los intervalos temporales."
  }
];

const ATLAS_OBJECTS = [
  {
    id: "m87-blackhole",
    name: "Messier 87* (M87*)",
    catalog: "NGC 4486 // Virgo A",
    category: "agujero-negro",
    categoryLabel: "Agujero negro supermasivo",
    hasLiveBlackHole: true,
    distance: "53,5 millones de años luz",
    constellation: "Virgo",
    image: "images/m87-blackhole.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=85",
    summary: "M87* es el agujero negro supermasivo situado en el núcleo de la galaxia elíptica supergigante Messier 87. Con una masa estimada en 6.500 millones de masas solares, fue el primer agujero negro cuya sombra y anillo de acreción fueron resueltos directamente en abril de 2019 por la colaboración internacional Event Horizon Telescope (EHT) mediante interferometría de muy larga base.",
    fullArticle: "En el centro de la galaxia Messier 87 reside uno de los objetos más masivos del universo local. Su horizonte de sucesos posee un diámetro aproximado de 38.000 millones de kilómetros —más de tres veces la distancia media entre el Sol y Plutón—. La asimetría en el brillo de su anillo de fotones se debe al efecto Doppler relativista: el plasma magnetizado que gira acercándose al observador a velocidades cercanas a la de la luz aparenta ser notablemente más luminoso que el que se aleja. Desde sus polos emerge un chorro astrofísico de partículas relativistas que se extiende a lo largo de más de 4.900 años luz.",
    specs: {
      masa: "6,5 × 10⁹ M☉",
      radioHorizonte: "~127 UA (19.000 millones de km)",
      observatorio: "Event Horizon Telescope (VLBI 1,3 mm)"
    }
  },
  {
    id: "pillars-creation",
    name: "Pilares de la Creación (M16)",
    catalog: "NGC 6611 // Nebulosa del Águila",
    category: "nebulosa",
    categoryLabel: "Región H II de formación estelar",
    distance: "6.500 – 7.000 años luz",
    constellation: "Serpens",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/1024px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85",
    summary: "Los Pilares de la Creación son trompas de gas interestelar y polvo cósmico situadas en el interior de la Nebulosa del Águila. Reciben este nombre porque el hidrógeno molecular frío y denso de sus columnas se encuentra en pleno proceso de colapso gravitacional para formar nuevas estrellas jóvenes, al tiempo que es erosionado por la radiación ultravioleta de estrellas masivas cercanas.",
    fullArticle: "Fotografiadas originalmente por el Telescopio Espacial Hubble en 1995 y reobservadas en alta resolución tanto en el espectro visible como en el infrarrojo cercano por el Telescopio Espacial James Webb (JWST), estas estructuras se extienden a lo largo de entre 4 y 5 años luz. En los bordes superiores de las columnas destacan glóbulos gaseosos en evaporación (EGGs), regiones de mayor densidad donde protoestrellas embrionarias continúan acumulando masa antes de que el viento estelar disipe la nube circundante.",
    specs: {
      masa: "~200 M☉ en las tres columnas principales",
      radioHorizonte: "Extensión de ~4,5 años luz",
      observatorio: "HST WFC3 / JWST NIRCam"
    }
  },
  {
    id: "carina-nebula",
    name: "Nebulosa de la Quilla (NGC 3372)",
    catalog: "Acantilados Cósmicos // NGC 3324",
    category: "nebulosa",
    categoryLabel: "Gran nebulosa de emisión",
    distance: "7.600 años luz",
    constellation: "Carina",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Carina_Nebula_by_JWST.jpg/1024px-Carina_Nebula_by_JWST.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=85",
    summary: "La Nebulosa de la Quilla es una extensa región de gas ionizado que envuelve varios cúmulos abiertos de estrellas de tipo O y el sistema hipergigante Eta Carinae. En su borde noroccidental se ubica NGC 3324, cuya muralla de polvo erosionada por vientos estelares es conocida como los Acantilados Cósmicos.",
    fullArticle: "Con un diámetro superior a los 300 años luz, NGC 3372 es una de las nebulosas difusas más grandes del cielo austral, cuatro veces más extensa y aún más brillante que la célebre Nebulosa de Orión. Las observaciones infrarrojas del telescopio James Webb revelaron decenas de chorros bipolares procedentes de estrellas recién nacidas que antes permanecían ocultas tras las densas cortinas de polvo de silicatos e hidrocarburos aromáticos policíclicos.",
    specs: {
      masa: "~100.000 M☉ de gas molecular e ionizado",
      radioHorizonte: "Pared nebular de ~7 años luz de altura",
      observatorio: "James Webb Space Telescope (NIRCam + MIRI)"
    }
  },
  {
    id: "southern-ring",
    name: "Nebulosa del Anillo Sur (NGC 3132)",
    catalog: "Caldwell 74 // Nebulosa de los Ocho Estallidos",
    category: "nebulosa",
    categoryLabel: "Nebulosa planetaria",
    distance: "2.000 años luz",
    constellation: "Vela",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Southern_Ring_Nebula_by_JWST.jpg/1024px-Southern_Ring_Nebula_by_JWST.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=85",
    summary: "NGC 3132 es una nebulosa planetaria brillante originada por las capas exteriores de gas expulsadas por una estrella moribunda evolucionada hacia la fase de enana blanca. Sus anillos concéntricos registran episodios sucesivos de pérdida de masa ocurridos durante los últimos miles de años.",
    fullArticle: "En el centro geométrico de la cavidad nebular se distingue un sistema estelar binario: una estrella brillante de tipo A que aún permanece en la secuencia principal y su compañera, una tenue pero extremadamente caliente enana blanca (~100.000 K) que es la verdadera progenitora de la nebulosa. La radiación ultravioleta de esta enana blanca ioniza el gas circundante haciendo que resplandezca, mientras que el movimiento orbital del par estelar esculpe las asimetrías helicoidales del gas.",
    specs: {
      masa: "~0,6 M☉ (remanente central de enana blanca)",
      radioHorizonte: "Diámetro de ~1,3 años luz",
      observatorio: "JWST NIRCam & MIRI"
    }
  },
  {
    id: "saturn-cassini",
    name: "Saturno y su Sistema de Anillos",
    catalog: "Sexto planeta // Sistema Croniano",
    category: "planeta",
    categoryLabel: "Gigante gaseoso anillado",
    distance: "1.433 millones de km (9,58 UA)",
    constellation: "Eclíptica",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1024px-Saturn_during_Equinox.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1000&q=85",
    summary: "Saturno es el segundo planeta en tamaño y masa del Sistema Solar y el único cuyo sistema de anillos es claramente visible desde la Tierra con instrumentación óptica modesta. Sus anillos principales (A, B y C) presentan un espesor medio de apenas 10 a 30 metros pese a extenderse a lo largo de más de 280.000 kilómetros de diámetro.",
    fullArticle: "Estudiado en detalle durante trece años por la sonda orbital Cassini-Huygens, el sistema de Saturno funciona como un laboratorio natural de dinámica de discos. Las divisiones dentro de sus anillos —como la división de Cassini y la división de Encke— son mantenidas por resonancias gravitacionales y por el paso de pequeñas lunas pastoras. En su polo norte alberga una corriente en chorro atmosférica con una singular geometría hexagonal estable de unos 30.000 km de diámetro.",
    specs: {
      masa: "5,683 × 10²⁶ kg (95,16 masas terrestres)",
      radioHorizonte: "Radio ecuatorial: 60.268 km",
      observatorio: "Misión Cassini-Huygens (NASA / ESA / ASI)"
    }
  },
  {
    id: "europa-galileo",
    name: "Europa (Júpiter II)",
    catalog: "Satélite galileano // J II",
    category: "planeta",
    categoryLabel: "Satélite helado con océano interno",
    distance: "628,3 millones de km (media)",
    constellation: "Sistema Joviano",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon.jpg/1024px-Europa-moon.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=85",
    summary: "Descubierta en 1610 por Galileo Galilei, Europa es el menor de los cuatro satélites galileanos de Júpiter. Presenta la superficie sólida más lisa de todo el Sistema Solar, recorrida por largas fracturas rojizas denominadas lineae y prácticamente desprovista de cráteres de impacto de gran tamaño.",
    fullArticle: "La juventud geológica de su corteza helada y las mediciones magnéticas inducidas obtenidas por la sonda Galileo confirman la presencia de un océano global de agua líquida salada de unos 100 km de profundidad bajo una capa de hielo de entre 15 y 25 km de espesor. El calor necesario para mantener líquido este océano —lejos de la zona habitable solar— proviene de la disipación por marea provocada por la resonancia orbital de Laplace que mantiene con Ío y Ganímedes.",
    specs: {
      masa: "4,799 × 10²² kg (0,008 masas terrestres)",
      radioHorizonte: "Radio medio: 1.560,8 km",
      observatorio: "Sondas Galileo, Juno y misión Europa Clipper"
    }
  }
];

function initScaleAndRelativity() {
  const selectA = document.getElementById("scale-select-a");
  const selectB = document.getElementById("scale-select-b");

  function updateScaleComparison() {
    if (!selectA || !selectB) return;
    const bodyA = SCALE_BODIES[selectA.value] || SCALE_BODIES.earth;
    const bodyB = SCALE_BODIES[selectB.value] || SCALE_BODIES.jupiter;

    const maxDiam = Math.max(bodyA.diameterKm, bodyB.diameterKm);
    const maxPx = 148;
    const minPx = 14;

    const sizeAPx = Math.max(minPx, Math.round((bodyA.diameterKm / maxDiam) * maxPx));
    const sizeBPx = Math.max(minPx, Math.round((bodyB.diameterKm / maxDiam) * maxPx));

    const sphereA = document.getElementById("scale-sphere-a");
    const sphereB = document.getElementById("scale-sphere-b");

    if (sphereA) {
      sphereA.style.width = `${sizeAPx}px`;
      sphereA.style.height = `${sizeAPx}px`;
      if (bodyA.isBlackHole) {
        sphereA.style.background = "url('images/blackhole-lensing.jpg') center/cover no-repeat";
        sphereA.style.boxShadow = `0 0 28px rgba(245, 158, 11, 0.75), inset 0 0 10px rgba(0,0,0,0.9)`;
      } else {
        sphereA.style.background = bodyA.colorGrad;
        sphereA.style.boxShadow = `0 0 26px ${bodyA.glow}, inset -8px -8px 18px rgba(0,0,0,0.85)`;
      }
    }

    if (sphereB) {
      sphereB.style.width = `${sizeBPx}px`;
      sphereB.style.height = `${sizeBPx}px`;
      if (bodyB.isBlackHole) {
        sphereB.style.background = "url('images/blackhole-lensing.jpg') center/cover no-repeat";
        sphereB.style.boxShadow = `0 0 28px rgba(245, 158, 11, 0.75), inset 0 0 10px rgba(0,0,0,0.9)`;
      } else {
        sphereB.style.background = bodyB.colorGrad;
        sphereB.style.boxShadow = `0 0 26px ${bodyB.glow}, inset -8px -8px 18px rgba(0,0,0,0.85)`;
      }
    }

    document.getElementById("scale-name-a").textContent = bodyA.name;
    document.getElementById("scale-diam-a").textContent = `${bodyA.diameterKm.toLocaleString("es-ES")} km`;
    document.getElementById("scale-name-b").textContent = bodyB.name;
    document.getElementById("scale-diam-b").textContent = `${bodyB.diameterKm.toLocaleString("es-ES")} km`;

    const ratio = (Math.max(bodyA.diameterKm, bodyB.diameterKm) / Math.min(bodyA.diameterKm, bodyB.diameterKm)).toFixed(1);
    const largerName = bodyA.diameterKm >= bodyB.diameterKm ? bodyA.name : bodyB.name;
    const smallerName = bodyA.diameterKm < bodyB.diameterKm ? bodyA.name : bodyB.name;

    const summaryEl = document.getElementById("scale-ratio-summary");
    if (summaryEl) {
      if (bodyA.diameterKm === bodyB.diameterKm) {
        summaryEl.textContent = `Ambos cuerpos presentan un diámetro equivalente (${bodyA.diameterKm.toLocaleString("es-ES")} km).`;
      } else {
        summaryEl.textContent = `Relación de escala: ${largerName} posee un diámetro ${ratio} veces mayor que el de ${smallerName}.`;
      }
    }
  }

  function renderRelativityTable() {
    const container = document.getElementById("relativity-cards-grid");
    if (!container) return;

    container.innerHTML = RELATIVITY_REFERENCE_DATA.map(item => `
      <div class="hud-card p-5 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-1">
            <h4 class="font-display text-sm font-bold text-white">${item.name}</h4>
            <span class="text-[11px] font-mono-tech text-slate-400">${item.designation}</span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed mt-2 mb-4">
            ${item.note}
          </p>
        </div>
        <div class="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-[11px] font-mono-tech">
          <div>
            <span class="block text-[9px] uppercase text-slate-500">Gravedad</span>
            <span class="text-slate-200 font-semibold">${item.gravity}</span>
          </div>
          <div>
            <span class="block text-[9px] uppercase text-slate-500">Vel. Escape</span>
            <span class="text-cyanOrbital font-semibold">${item.escapeVel}</span>
          </div>
          <div>
            <span class="block text-[9px] uppercase text-slate-500">Factor Δt</span>
            <span class="text-amber-400 font-semibold">${item.timeDilation}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  selectA?.addEventListener("change", updateScaleComparison);
  selectB?.addEventListener("change", updateScaleComparison);

  updateScaleComparison();
  renderRelativityTable();
}

function initCosmicAtlas() {
  const grid = document.getElementById("atlas-grid");
  const filterBtns = document.querySelectorAll(".atlas-filter-btn");
  const searchInput = document.getElementById("atlas-search-input");

  if (!grid) return;

  let currentFilter = "todos";
  let searchQuery = "";

  function renderAtlas() {
    grid.innerHTML = "";

    const filtered = ATLAS_OBJECTS.filter(obj => {
      const matchesCat = currentFilter === "todos" || obj.category === currentFilter;
      const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obj.catalog.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center hud-panel rounded-2xl p-8">
          <p class="text-sm text-slate-400">No se hallaron entradas en el archivo que coincidan con el criterio de búsqueda.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(obj => {
      const card = document.createElement("article");
      card.className = "hud-card rounded-2xl overflow-hidden flex flex-col justify-between";

      // Si es un Agujero Negro, incluimos la visualización fotorrealista de lente gravitacional
      const visualHeader = obj.hasLiveBlackHole
        ? `
          <div class="relative h-56 overflow-hidden bh-live-container group">
            <img 
              src="${obj.image}" 
              alt="${obj.name}" 
              class="bh-realistic-img"
              loading="lazy"
              onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.removeAttribute('data-fallback');}"
              data-fallback="${obj.fallbackImage || ''}"
            />
            <div class="bh-cinematic-glow"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent"></div>
            <div class="absolute top-3 left-3 z-10">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-mono-tech uppercase tracking-wider bg-black/85 text-amber-400 border border-amber-500/35 backdrop-blur-md">
                ${obj.categoryLabel} // Simulación Relativista EHT
              </span>
            </div>
            <div class="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono-tech text-slate-300">
              <span>${obj.catalog}</span>
              <span>${obj.distance}</span>
            </div>
          </div>
        `
        : `
          <div class="relative h-56 overflow-hidden bg-slate-950 group">
            <img 
              src="${obj.image}" 
              alt="${obj.name}" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.removeAttribute('data-fallback');}"
              data-fallback="${obj.fallbackImage || ''}"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent"></div>
            <div class="absolute top-3 left-3">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-mono-tech uppercase tracking-wider bg-black/75 text-slate-200 border border-white/15 backdrop-blur-md">
                ${obj.categoryLabel}
              </span>
            </div>
            <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono-tech text-slate-300">
              <span>${obj.catalog}</span>
              <span>${obj.distance}</span>
            </div>
          </div>
        `;

      card.innerHTML = `
        <div>
          ${visualHeader}
          <div class="p-6">
            <h3 class="font-display text-base font-bold text-white mb-2.5 tracking-wide">
              ${obj.name}
            </h3>
            <p class="text-xs sm:text-[13px] text-slate-300 leading-relaxed line-clamp-4">
              ${obj.summary}
            </p>
          </div>
        </div>

        <div class="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 mt-2">
          <span class="text-[11px] font-mono-tech text-slate-400">Constelación: ${obj.constellation}</span>
          <button 
            type="button"
            onclick="openAtlasModal('${obj.id}')"
            class="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white text-slate-200 hover:text-[#04060A] border border-white/10 text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <span>Leer artículo</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-white", "text-[#04060A]", "font-semibold");
        b.classList.add("bg-transparent", "text-slate-400");
      });
      btn.classList.remove("bg-transparent", "text-slate-400");
      btn.classList.add("bg-white", "text-[#04060A]", "font-semibold");
      currentFilter = btn.getAttribute("data-filter");
      renderAtlas();
    });
  });

  searchInput?.addEventListener("input", e => {
    searchQuery = e.target.value;
    renderAtlas();
  });

  renderAtlas();
}

function openAtlasModal(objectId) {
  const obj = ATLAS_OBJECTS.find(o => o.id === objectId);
  const modal = document.getElementById("atlas-modal");
  const body = document.getElementById("atlas-modal-body");

  if (!obj || !modal || !body) return;

  body.innerHTML = `
    <div class="space-y-6">
      <div class="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black">
        <img 
          src="${obj.image}" 
          alt="${obj.name}" 
          class="w-full h-full object-cover"
          onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.removeAttribute('data-fallback');}"
          data-fallback="${obj.fallbackImage || ''}"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent"></div>
        <div class="absolute bottom-4 left-5 right-5">
          <span class="text-[11px] font-mono-tech uppercase tracking-wider text-amber-400 block mb-1">
            ${obj.catalog} — ${obj.categoryLabel}
          </span>
          <h3 class="font-display text-xl sm:text-2xl font-bold text-white">${obj.name}</h3>
        </div>
      </div>

      <div class="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>${obj.summary}</p>
        <p>${obj.fullArticle}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/[0.03] p-4 rounded-xl border border-white/10 text-xs">
        <div>
          <span class="block text-[10px] uppercase font-mono-tech text-slate-400">Masa Estimada</span>
          <span class="font-mono-tech font-semibold text-white mt-0.5 block">${obj.specs.masa}</span>
        </div>
        <div>
          <span class="block text-[10px] uppercase font-mono-tech text-slate-400">Dimensiones</span>
          <span class="font-mono-tech font-semibold text-white mt-0.5 block">${obj.specs.radioHorizonte}</span>
        </div>
        <div>
          <span class="block text-[10px] uppercase font-mono-tech text-slate-400">Instrumentación</span>
          <span class="font-mono-tech font-semibold text-cyanOrbital mt-0.5 block">${obj.specs.observatorio}</span>
        </div>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400">
        <span>Distancia: ${obj.distance} (${obj.constellation})</span>
        <button 
          type="button"
          onclick="closeAtlasModal()"
          class="px-5 py-2 rounded-lg bg-white text-[#04060A] font-semibold text-xs hover:bg-slate-200 transition-colors"
        >
          Cerrar ficha
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeAtlasModal() {
  const modal = document.getElementById("atlas-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }
}

window.initScaleAndRelativity = initScaleAndRelativity;
window.initCosmicAtlas = initCosmicAtlas;
window.openAtlasModal = openAtlasModal;
window.closeAtlasModal = closeAtlasModal;
