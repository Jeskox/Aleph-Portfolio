/**
 * COSMOS — Módulo 1: Planetario Orbital & Simulador de Singularidad (Sagitario A*)
 * Incluye animación relativista de vórtice y disco de acreción para agujeros negros
 * y textos enciclopédicos de nivel documental
 */

const ORRERY_SYSTEMS = {
  solar: {
    name: "Sistema Solar",
    bodies: [
      {
        id: "sun",
        name: "Sol",
        type: "Estrella de secuencia principal (Tipo G2V)",
        orbitRadius: 0,
        radius: 26,
        speed: 0,
        angle: 0,
        colorCore: "#FEF08A",
        colorMid: "#F59E0B",
        colorEdge: "#B45309",
        glowColor: "rgba(245, 158, 11, 0.55)",
        distanceLabel: "Centro del sistema",
        velocity: "220 km/s (órbita galáctica)",
        temp: "5.778 K (5.505 °C)",
        gravity: "274,0 m/s²",
        compositionNote: "73,4% Hidrógeno, 25,0% Helio y trazas de elementos más pesados como oxígeno, carbono, neón y hierro.",
        description: "El Sol es una estrella de tipo-G de la secuencia principal que abarca aproximadamente el 99,86% de la masa total del Sistema Solar. Se formó hace unos 4.600 millones de años a partir del colapso gravitacional de la materia dentro de una región de una gran nube molecular. En su núcleo fusiona unas 600 millones de toneladas de hidrógeno en helio cada segundo."
      },
      {
        id: "mercury",
        name: "Mercurio",
        type: "Planeta terrestre interior",
        orbitRadius: 52,
        radius: 5.5,
        speed: 0.026,
        angle: 0.8,
        colorCore: "#E2E8F0",
        colorMid: "#94A3B8",
        colorEdge: "#334155",
        glowColor: "rgba(148, 163, 184, 0.22)",
        distanceLabel: "0,39 UA (57,9M km)",
        velocity: "47,36 km/s",
        temp: "-180 °C a 430 °C",
        gravity: "3,70 m/s²",
        compositionNote: "Núcleo metálico de hierro-níquel (~85% del radio planetario) rodeado por un manto de silicatos y una exosfera tenue.",
        description: "Mercurio es el planeta del Sistema Solar más cercano al Sol y el más pequeño. Carece de satélites naturales y su superficie, intensamente craterizada, presenta escarpes lobulados de cientos de kilómetros que evidencian que el planeta se contrajo al enfriarse su núcleo interno."
      },
      {
        id: "venus",
        name: "Venus",
        type: "Planeta terrestre",
        orbitRadius: 82,
        radius: 8,
        speed: 0.017,
        angle: 2.1,
        colorCore: "#FDE68A",
        colorMid: "#D97706",
        colorEdge: "#78350F",
        glowColor: "rgba(251, 191, 36, 0.28)",
        distanceLabel: "0,72 UA (108,2M km)",
        velocity: "35,02 km/s",
        temp: "464 °C (media superficial)",
        gravity: "8,87 m/s²",
        compositionNote: "Atmósfera compuesta en un 96,5% por dióxido de carbono (CO₂) y 3,5% de nitrógeno, con nubes densas de ácido sulfúrico.",
        description: "Venus posee la atmósfera más densa de los cuatro planetas terrestres, lo que provoca un efecto invernadero descontrolado que lo convierte en el astro más cálido del Sistema Solar, superando incluso a Mercurio. Su rotación es retrógrada: gira en sentido horario visto desde su polo norte."
      },
      {
        id: "earth",
        name: "Tierra",
        type: "Planeta terrestre oceánico",
        orbitRadius: 118,
        radius: 8.8,
        speed: 0.011,
        angle: 3.6,
        hasMoon: true,
        colorCore: "#7DD3FC",
        colorMid: "#0284C7",
        colorEdge: "#0F172A",
        glowColor: "rgba(56, 189, 248, 0.4)",
        distanceLabel: "1,00 UA (149,6M km)",
        velocity: "29,78 km/s",
        temp: "14,8 °C (media global)",
        gravity: "9,807 m/s²",
        compositionNote: "Atmósfera: 78,08% Nitrógeno (N₂), 20,95% Oxígeno (O₂), 0,93% Argón y ~0,04% Dióxido de carbono.",
        description: "La Tierra es el mayor de los planetas terrestres y el quinto en tamaño general. Alrededor del 71% de su superficie está cubierta por océanos de agua salada. Su campo magnético interno, generado por la convección del núcleo externo líquido, desvía el viento solar protegiendo su atmósfera."
      },
      {
        id: "mars",
        name: "Marte",
        type: "Planeta terrestre",
        orbitRadius: 154,
        radius: 6.8,
        speed: 0.008,
        angle: 5.1,
        colorCore: "#FCA5A5",
        colorMid: "#EA580C",
        colorEdge: "#7F1D1D",
        glowColor: "rgba(234, 88, 12, 0.32)",
        distanceLabel: "1,52 UA (227,9M km)",
        velocity: "24,07 km/s",
        temp: "-63 °C (media)",
        gravity: "3,721 m/s²",
        compositionNote: "Atmósfera tenue (0,006 atm): 95,3% Dióxido de carbono, 2,7% Nitrógeno y 1,6% Argón.",
        description: "Conocido como el planeta rojo por el óxido de hierro predominante en su regolito superficial. Alberga el Monte Olimpo, el volcán más grande conocido en el Sistema Solar, y los Valles Marineris. Cuenta con dos pequeños satélites irregulares: Fobos y Deimos."
      },
      {
        id: "jupiter",
        name: "Júpiter",
        type: "Gigante gaseoso",
        orbitRadius: 215,
        radius: 16.5,
        speed: 0.0042,
        angle: 1.3,
        colorCore: "#FDE68A",
        colorMid: "#D97706",
        colorEdge: "#451A03",
        glowColor: "rgba(217, 119, 6, 0.32)",
        distanceLabel: "5,20 UA (778,5M km)",
        velocity: "13,07 km/s",
        temp: "-110 °C (nivel 1 bar)",
        gravity: "24,79 m/s²",
        compositionNote: "89,8% Hidrógeno molecular (H₂) y 10,2% Helio, con capas profundas de hidrógeno metálico líquido.",
        description: "Júpiter es el planeta más masivo del Sistema Solar, con una masa dos veces y media mayor que la de todos los demás planetas juntos. Su atmósfera se organiza en bandas latitudinales con vientos intensos y tormentas longevas como la Gran Mancha Roja, documentada desde el siglo XVII."
      },
      {
        id: "saturn",
        name: "Saturno",
        type: "Gigante gaseoso anillado",
        orbitRadius: 275,
        radius: 13.5,
        speed: 0.0026,
        angle: 4.2,
        hasRings: true,
        colorCore: "#FEF3C7",
        colorMid: "#CA8A04",
        colorEdge: "#422006",
        glowColor: "rgba(234, 179, 8, 0.3)",
        distanceLabel: "9,58 UA (1.433M km)",
        velocity: "9,68 km/s",
        temp: "-139 °C",
        gravity: "10,44 m/s²",
        compositionNote: "96,3% Hidrógeno y 3,25% Helio. Densidad media inferior a la del agua líquida (0,687 g/cm³).",
        description: "Saturno destaca por su prominente sistema de anillos planetarios, el cual se extiende desde los 6.630 km hasta los 120.700 km por encima de su ecuador y está compuesto casi en su totalidad por hielo de agua con trazas de material rocoso. Lo orbitan satélites notables como Titán y Encélado."
      },
      {
        id: "uranus",
        name: "Urano",
        type: "Gigante helado",
        orbitRadius: 330,
        radius: 10.5,
        speed: 0.0017,
        angle: 2.7,
        colorCore: "#CCFBF1",
        colorMid: "#06B6D4",
        colorEdge: "#164E63",
        glowColor: "rgba(6, 182, 212, 0.3)",
        distanceLabel: "19,22 UA (2.872M km)",
        velocity: "6,80 km/s",
        temp: "-197 °C",
        gravity: "8,69 m/s²",
        compositionNote: "82,5% Hidrógeno, 15,2% Helio y 2,3% Metano sobre un manto fluido de agua, amoníaco y metano.",
        description: "Urano fue el primer planeta descubierto mediante el uso de un telescopio por William Herschel en 1781. Presenta una inclinación axial extrema de 97,77°, lo que significa que su eje de rotación se encuentra prácticamente sobre el plano de su órbita alrededor del Sol."
      },
      {
        id: "neptune",
        name: "Neptuno",
        type: "Gigante helado",
        orbitRadius: 380,
        radius: 10.2,
        speed: 0.0011,
        angle: 5.8,
        colorCore: "#93C5FD",
        colorMid: "#2563EB",
        colorEdge: "#1E1B4B",
        glowColor: "rgba(37, 99, 235, 0.35)",
        distanceLabel: "30,07 UA (4.495M km)",
        velocity: "5,43 km/s",
        temp: "-201 °C",
        gravity: "11,15 m/s²",
        compositionNote: "80% Hidrógeno, 19% Helio y 1,5% Metano atmosférico que absorbe el espectro rojo.",
        description: "Neptuno es el octavo y más distante planeta conocido del Sistema Solar. Fue el primero cuya existencia se predijo mediante cálculos matemáticos de perturbación orbital antes de ser observado directamente en 1846 por Johann Galle a partir de los cálculos de Urbain Le Verrier."
      }
    ]
  },
  blackhole: {
    name: "Centro Galáctico (Sagitario A*)",
    bodies: [
      {
        id: "sgr-a",
        name: "Sagitario A*",
        type: "Agujero negro supermasivo",
        orbitRadius: 0,
        radius: 28,
        speed: 0,
        angle: 0,
        isBlackHole: true,
        colorCore: "#000000",
        colorMid: "#000000",
        colorEdge: "#F59E0B",
        glowColor: "rgba(245, 158, 11, 0.75)",
        distanceLabel: "26.670 años luz de la Tierra",
        velocity: "Espín relativista",
        temp: "10¹⁰ K (en el flujo de acreción)",
        gravity: "Horizonte de sucesos: 12M km",
        compositionNote: "Singularidad espaciotemporal de ~4,15 millones de masas solares rodeada por gas ionizado relativista.",
        description: "Sagitario A* (abreviado Sgr A*) es el agujero negro supermasivo situado en el centro galáctico de la Vía Láctea, en la frontera de las constelaciones de Sagitario y Escorpio. Su existencia fue confirmada mediante el seguimiento durante décadas de las órbitas keplerianas del cúmulo estelar S y fotografiada directamente por el Event Horizon Telescope en 2022."
      },
      {
        id: "star-s2",
        name: "Estrella S2 (S0-2)",
        type: "Estrella de secuencia principal tipo B",
        orbitRadius: 115,
        radius: 10.5,
        speed: 0.025,
        angle: 1.4,
        colorCore: "#FFFFFF",
        colorMid: "#38BDF8",
        colorEdge: "#1D4ED8",
        glowColor: "rgba(56, 189, 248, 0.6)",
        distanceLabel: "120 UA en el periastro",
        velocity: "7.650 km/s (2,55% de c)",
        temp: "28.500 K",
        gravity: "~190 m/s²",
        compositionNote: "Estrella joven masiva (~14 masas solares) compuesta principalmente de hidrógeno y helio ionizados.",
        description: "S2 es una de las estrellas más brillantes del cúmulo nuclear que orbita Sagitario A* con un período de 16,05 años. Durante su máximo acercamiento en mayo de 2018 alcanzó velocidades superiores a los 7.600 km/s, permitiendo medir con precisión la precesión de Schwarzschild predicha por la relatividad general."
      },
      {
        id: "star-s62",
        name: "Estrella S62",
        type: "Estrella en órbita relativista",
        orbitRadius: 185,
        radius: 8.5,
        speed: 0.017,
        angle: 3.9,
        colorCore: "#E0F2FE",
        colorMid: "#0284C7",
        colorEdge: "#082F49",
        glowColor: "rgba(14, 165, 233, 0.45)",
        distanceLabel: "16 UA en el periastro",
        velocity: "~20.000 km/s en periastro",
        temp: "22.000 K",
        gravity: "165 m/s²",
        compositionNote: "Estrella de tipo temprano sometida a intensas fuerzas de marea gravitacional cerca del radio de Schwarzschild.",
        description: "Con un período orbital de apenas 9,9 años, S62 posee una de las órbitas más excéntricas jamás observadas alrededor del centro galáctico, aproximándose a una distancia inferior a la que separa a Urano del Sol y alcanzando cerca del 6,7% de la velocidad de la luz."
      },
      {
        id: "pulsar-j1745",
        name: "Magnetar PSR J1745-2900",
        type: "Estrella de neutrones / Magnetar",
        orbitRadius: 265,
        radius: 7.5,
        speed: 0.009,
        angle: 5.2,
        isPulsar: true,
        colorCore: "#FFFFFF",
        colorMid: "#A855F7",
        colorEdge: "#4C1D95",
        glowColor: "rgba(168, 85, 247, 0.65)",
        distanceLabel: "0,3 años luz de Sgr A*",
        velocity: "236 km/s (movimiento propio)",
        temp: "~10⁶ K (superficie)",
        gravity: "~2 × 10¹² m/s²",
        compositionNote: "Fluido degenerado de neutrones superfluidos bajo una corteza cristalina de núcleos ricos en hierro.",
        description: "Descubierto en 2013 por el observatorio espacial Swift en rayos X, es el púlsar más cercano conocido a un agujero negro supermasivo. Sus pulsos de radio cada 3,76 segundos sirven como sonda natural para medir la densidad del plasma magnetizado que rodea a Sagitario A*."
      }
    ]
  }
};

function initOrrery() {
  const canvas = document.getElementById("orrery-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let currentSystemKey = "solar";
  let selectedBodyId = "earth";
  let timeMultiplier = 1;
  let showOrbits = true;
  let showLabels = true;

  let camera = {
    x: 0,
    y: 0,
    zoom: 0.9,
    targetZoom: 0.9,
    followSelected: false
  };

  // Cinturón de asteroides
  const asteroids = [];
  for (let i = 0; i < 110; i++) {
    asteroids.push({
      angle: Math.random() * Math.PI * 2,
      radius: 178 + Math.random() * 16,
      speed: 0.005 + Math.random() * 0.002,
      size: Math.random() * 1.3 + 0.5
    });
  }

  // Partículas del vórtice de acreción para el Agujero Negro
  const bhParticles = [];
  for (let i = 0; i < 85; i++) {
    bhParticles.push({
      angle: Math.random() * Math.PI * 2,
      dist: 30 + Math.random() * 48,
      speed: 0.04 + Math.random() * 0.05,
      size: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.7 + 0.25
    });
  }

  function resizeCanvas() {
    const wrapper = canvas.parentElement;
    if (!wrapper) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = wrapper.clientWidth * dpr;
    canvas.height = wrapper.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function getBodies() {
    return ORRERY_SYSTEMS[currentSystemKey].bodies;
  }

  function renderQuickSelectorPills() {
    const container = document.getElementById("orrery-body-pills");
    if (!container) return;

    const bodies = getBodies();
    container.innerHTML = bodies.map(b => {
      const isSelected = b.id === selectedBodyId;
      const activeClasses = isSelected
        ? "bg-white text-[#04060A] border-white font-semibold"
        : "bg-[#090D16] text-slate-400 border-white/10 hover:border-white/30 hover:text-white";
      return `
        <button 
          type="button" 
          data-body-id="${b.id}"
          class="orrery-pill-btn px-3.5 py-1.5 rounded-lg border text-xs transition-all shrink-0 flex items-center gap-2 ${activeClasses}"
        >
          <span class="w-2 h-2 rounded-full" style="background:${b.isBlackHole ? '#F59E0B' : b.colorMid}"></span>
          <span>${b.name}</span>
        </button>
      `;
    }).join("");

    container.querySelectorAll(".orrery-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedBodyId = btn.getAttribute("data-body-id");
        camera.followSelected = true;
        renderQuickSelectorPills();
        updateInspectorPanel();
      });
    });
  }

  function updateInspectorPanel() {
    const bodies = getBodies();
    const body = bodies.find(b => b.id === selectedBodyId) || bodies[0];
    if (!body) return;

    const setElText = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setElText("insp-name", body.name);
    setElText("insp-type", body.type);
    setElText("insp-desc", body.description);
    setElText("insp-distance", body.distanceLabel);
    setElText("insp-velocity", body.velocity);
    setElText("insp-temp", body.temp);
    setElText("insp-gravity", body.gravity);
    setElText("insp-composition-note", body.compositionNote);

    const sphereEl = document.getElementById("insp-sphere-preview");
    if (sphereEl) {
      if (body.isBlackHole) {
        sphereEl.className = "w-28 sm:w-36 h-20 sm:h-24 shrink-0 flex items-center justify-center relative";
        sphereEl.style.background = "transparent";
        sphereEl.style.boxShadow = "none";
        sphereEl.style.border = "none";
        sphereEl.innerHTML = `
          <img 
            src="images/sgr-a.png" 
            alt="${body.name}" 
            class="w-full h-full object-contain filter drop-shadow-[0_0_22px_rgba(245,158,11,0.5)] transition-transform duration-500 hover:scale-110" 
          />
        `;
      } else {
        sphereEl.innerHTML = "";
        sphereEl.className = "w-20 h-20 celestial-sphere shrink-0";
        sphereEl.style.background = "";
        sphereEl.style.boxShadow = "";
        sphereEl.style.border = "";

        if (body.id === "sun") {
          sphereEl.classList.add("sphere-sun");
        } else {
          if (body.hasRings) sphereEl.classList.add("sphere-saturn");
          sphereEl.style.background = `radial-gradient(circle at 30% 30%, ${body.colorCore}, ${body.colorMid} 55%, ${body.colorEdge} 95%)`;
          sphereEl.style.boxShadow = `0 0 24px ${body.glowColor}, inset -10px -10px 22px rgba(0,0,0,0.85)`;
        }
      }
    }
  }

  let moonAngle = 0;
  let accretionAngle = 0;

  function drawBlackHoleAnimated(bx, by, radius) {
    // 1. Halo difuso plano concéntrico de energía exterior
    const outerGlow = ctx.createRadialGradient(bx, by, radius * 1.0, bx, by, radius * 3.4);
    outerGlow.addColorStop(0, "rgba(245, 158, 11, 0.65)");
    outerGlow.addColorStop(0.35, "rgba(234, 88, 12, 0.28)");
    outerGlow.addColorStop(0.7, "rgba(180, 83, 9, 0.1)");
    outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(bx, by, radius * 3.4, 0, Math.PI * 2);
    ctx.fill();

    // 2. Disco de acreción circular concéntrico plano en el contorno
    const diskGrad = ctx.createRadialGradient(bx, by, radius * 1.05, bx, by, radius * 2.6);
    diskGrad.addColorStop(0, "rgba(255, 255, 240, 0.98)");
    diskGrad.addColorStop(0.18, "rgba(254, 240, 138, 0.92)");
    diskGrad.addColorStop(0.48, "rgba(245, 158, 11, 0.78)");
    diskGrad.addColorStop(0.82, "rgba(234, 88, 12, 0.35)");
    diskGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = diskGrad;
    ctx.beginPath();
    ctx.arc(bx, by, radius * 2.6, 0, Math.PI * 2);
    ctx.fill();

    // 3. Filamentos y bandas concéntricas de rotación orbital plana
    accretionAngle += (timeMultiplier === 0 ? 0.005 : 0.015 * timeMultiplier);
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(accretionAngle);
    for (let ring = 0; ring < 3; ring++) {
      const ringR = radius * (1.3 + ring * 0.4);
      ctx.strokeStyle = ring === 0 ? "rgba(254, 240, 138, 0.45)" : "rgba(245, 158, 11, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([14 + ring * 6, 8 + ring * 4]);
      ctx.beginPath();
      ctx.arc(0, 0, ringR, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();

    // 4. Partículas de plasma en órbita plana circular
    bhParticles.forEach(p => {
      p.angle += p.speed * (timeMultiplier === 0 ? 0.35 : Math.min(2.5, timeMultiplier));
      p.dist -= 0.12;
      if (p.dist < radius * 1.06) {
        p.dist = radius * 1.15 + Math.random() * 44;
      }

      const px = bx + Math.cos(p.angle) * p.dist;
      const py = by + Math.sin(p.angle) * p.dist;
      const tx = bx + Math.cos(p.angle - 0.22) * (p.dist + 2);
      const ty = by + Math.sin(p.angle - 0.22) * (p.dist + 2);

      ctx.strokeStyle = `rgba(253, 224, 71, ${p.alpha})`;
      ctx.lineWidth = p.size;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(px, py);
      ctx.stroke();
    });

    // 5. Círculo negro central del horizonte de sucesos (singularidad plana)
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(bx, by, radius, 0, Math.PI * 2);
    ctx.fill();

    // 6. Anillo de fotones concéntrico plano en el perímetro
    ctx.strokeStyle = "rgba(254, 240, 138, 0.98)";
    ctx.lineWidth = 1.6;
    ctx.shadowColor = "rgba(251, 191, 36, 0.9)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(bx, by, radius + 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0; // Restaurar sombra para el resto del canvas
  }

  function draw() {
    const wrapper = canvas.parentElement;
    const w = wrapper ? wrapper.clientWidth : 800;
    const h = wrapper ? wrapper.clientHeight : 540;

    ctx.clearRect(0, 0, w, h);

    const bodies = getBodies();
    bodies.forEach(b => {
      if (b.orbitRadius > 0) {
        b.angle += b.speed * timeMultiplier * 0.45;
      }
    });
    moonAngle += 0.055 * timeMultiplier;
    accretionAngle += 0.025 * (timeMultiplier === 0 ? 0.35 : timeMultiplier);

    camera.zoom += (camera.targetZoom - camera.zoom) * 0.12;

    const selectedBody = bodies.find(b => b.id === selectedBodyId);
    if (camera.followSelected && selectedBody && selectedBody.orbitRadius > 0) {
      const targetX = -Math.cos(selectedBody.angle) * selectedBody.orbitRadius * camera.zoom;
      const targetY = -Math.sin(selectedBody.angle) * selectedBody.orbitRadius * camera.zoom;
      camera.x += (targetX - camera.x) * 0.1;
      camera.y += (targetY - camera.y) * 0.1;
    }

    const centerX = w / 2 + camera.x;
    const centerY = h / 2 + camera.y;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(camera.zoom, camera.zoom);

    if (showOrbits) {
      bodies.forEach(b => {
        if (b.orbitRadius > 0) {
          ctx.beginPath();
          ctx.arc(0, 0, b.orbitRadius, 0, Math.PI * 2);
          ctx.strokeStyle = b.id === selectedBodyId
            ? "rgba(255, 255, 255, 0.45)"
            : "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = b.id === selectedBodyId ? 1.3 / camera.zoom : 1 / camera.zoom;
          ctx.stroke();
        }
      });
    }

    if (currentSystemKey === "solar") {
      ctx.fillStyle = "rgba(148, 163, 184, 0.35)";
      asteroids.forEach(ast => {
        ast.angle += ast.speed * timeMultiplier * 0.3;
        const ax = Math.cos(ast.angle) * ast.radius;
        const ay = Math.sin(ast.angle) * ast.radius;
        ctx.beginPath();
        ctx.arc(ax, ay, ast.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    bodies.forEach(b => {
      const bx = b.orbitRadius === 0 ? 0 : Math.cos(b.angle) * b.orbitRadius;
      const by = b.orbitRadius === 0 ? 0 : Math.sin(b.angle) * b.orbitRadius;
      b._screenX = centerX + bx * camera.zoom;
      b._screenY = centerY + by * camera.zoom;
      b._screenR = Math.max(b.radius * camera.zoom, 14);

      if (b.isBlackHole) {
        drawBlackHoleAnimated(bx, by, b.radius);
      } else {
        const haloGrad = ctx.createRadialGradient(bx, by, b.radius * 0.4, bx, by, b.radius * 2.5);
        haloGrad.addColorStop(0, b.glowColor);
        haloGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(bx, by, b.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (b.isPulsar) {
          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(accretionAngle * 3.5);
          ctx.strokeStyle = "rgba(168, 85, 247, 0.6)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-b.radius * 3.8, 0);
          ctx.lineTo(b.radius * 3.8, 0);
          ctx.stroke();
          ctx.restore();
        }

        if (b.hasRings) {
          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(-0.4);
          ctx.scale(1, 0.38);
          ctx.beginPath();
          ctx.arc(0, 0, b.radius * 2.1, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(253, 224, 71, 0.5)";
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.restore();
        }

        const sphereGrad = ctx.createRadialGradient(
          bx - b.radius * 0.3,
          by - b.radius * 0.3,
          b.radius * 0.1,
          bx,
          by,
          b.radius
        );
        sphereGrad.addColorStop(0, b.colorCore);
        sphereGrad.addColorStop(0.55, b.colorMid);
        sphereGrad.addColorStop(1, b.colorEdge);

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(bx, by, b.radius, 0, Math.PI * 2);
        ctx.fill();

        if (b.hasMoon) {
          const mx = bx + Math.cos(moonAngle) * (b.radius + 9);
          const my = by + Math.sin(moonAngle) * (b.radius + 9);
          ctx.fillStyle = "#E2E8F0";
          ctx.beginPath();
          ctx.arc(mx, my, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (b.id === selectedBodyId) {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.2 / camera.zoom;
        ctx.setLineDash([4 / camera.zoom, 3 / camera.zoom]);
        ctx.beginPath();
        ctx.arc(bx, by, b.radius + 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (showLabels) {
        ctx.fillStyle = b.id === selectedBodyId ? "#FFFFFF" : "rgba(203, 213, 225, 0.78)";
        ctx.font = `${b.id === selectedBodyId ? "600" : "400"} ${Math.max(10, Math.round(11 / camera.zoom))}px 'IBM Plex Sans', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(b.name, bx, by + b.radius + 16 / camera.zoom);
      }
    });

    ctx.restore();
    requestAnimationFrame(draw);
  }

  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let movedDistance = 0;

  function handlePointerDown(clientX, clientY) {
    isDragging = true;
    movedDistance = 0;
    dragStart.x = clientX - camera.x;
    dragStart.y = clientY - camera.y;
  }

  function handlePointerMove(clientX, clientY) {
    if (!isDragging) return;
    const nx = clientX - dragStart.x;
    const ny = clientY - dragStart.y;
    movedDistance += Math.hypot(nx - camera.x, ny - camera.y);
    if (movedDistance > 6) {
      camera.followSelected = false;
      camera.x = nx;
      camera.y = ny;
    }
  }

  function handlePointerUp(clientX, clientY) {
    isDragging = false;
    if (movedDistance < 10) {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const bodies = getBodies();

      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i];
        const dist = Math.hypot(px - (b._screenX || 0), py - (b._screenY || 0));
        if (dist <= (b._screenR || 18) + 8) {
          selectedBodyId = b.id;
          camera.followSelected = b.orbitRadius > 0;
          renderQuickSelectorPills();
          updateInspectorPanel();
          break;
        }
      }
    }
  }

  canvas.addEventListener("mousedown", e => handlePointerDown(e.clientX, e.clientY));
  window.addEventListener("mousemove", e => handlePointerMove(e.clientX, e.clientY));
  window.addEventListener("mouseup", e => {
    if (isDragging) handlePointerUp(e.clientX, e.clientY);
  });

  canvas.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  canvas.addEventListener("touchmove", e => {
    if (e.touches.length === 1 && isDragging) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  canvas.addEventListener("touchend", e => {
    if (e.changedTouches.length > 0) {
      handlePointerUp(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  });

  document.querySelectorAll(".orrery-speed-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      timeMultiplier = parseFloat(btn.getAttribute("data-speed"));
      document.querySelectorAll(".orrery-speed-btn").forEach(b => {
        b.classList.remove("bg-white", "text-[#04060A]", "font-bold");
        b.classList.add("text-slate-400");
      });
      btn.classList.add("bg-white", "text-[#04060A]", "font-bold");
      btn.classList.remove("text-slate-400");
    });
  });

  document.querySelectorAll(".orrery-system-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSystemKey = btn.getAttribute("data-system");
      selectedBodyId = ORRERY_SYSTEMS[currentSystemKey].bodies[0].id;
      camera.x = 0;
      camera.y = 0;
      camera.followSelected = false;

      document.querySelectorAll(".orrery-system-btn").forEach(b => {
        b.classList.remove("bg-white", "text-[#04060A]", "border-white");
        b.classList.add("bg-transparent", "text-slate-300", "border-white/15");
      });
      btn.classList.remove("bg-transparent", "text-slate-300", "border-white/15");
      btn.classList.add("bg-white", "text-[#04060A]", "border-white");

      renderQuickSelectorPills();
      updateInspectorPanel();
    });
  });

  document.getElementById("orrery-zoom-in")?.addEventListener("click", () => {
    camera.targetZoom = Math.min(2.4, camera.targetZoom + 0.25);
  });

  document.getElementById("orrery-zoom-out")?.addEventListener("click", () => {
    camera.targetZoom = Math.max(0.45, camera.targetZoom - 0.25);
  });

  document.getElementById("orrery-reset-cam")?.addEventListener("click", () => {
    camera.x = 0;
    camera.y = 0;
    camera.targetZoom = 0.9;
    camera.followSelected = false;
  });

  document.getElementById("orrery-toggle-orbits")?.addEventListener("click", (e) => {
    showOrbits = !showOrbits;
    e.currentTarget.classList.toggle("text-white", showOrbits);
  });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  renderQuickSelectorPills();
  updateInspectorPanel();
  draw();
}

window.initOrrery = initOrrery;
