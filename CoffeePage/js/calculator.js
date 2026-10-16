/**
 * ORIGEN — Laboratorio de Extracción & Calculadora de Ratios
 * Métodos: V60, Chemex, Aeropress y Prensa Francesa
 * Cálculo dinámico de agua, temperatura, molienda y cronómetro interactivo
 */

const BREW_METHODS = {
  v60: {
    name: "Hario V60",
    ratio: 15, // 1g de café por cada 15g de agua
    defaultCoffee: 15,
    temp: 93,
    grind: "Media-Fina (Sal fina de mesa)",
    totalTimeSeconds: 165, // 2:45 min
    iconSvg: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h14l-5 13H10L5 4z"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    badge: "Claridad & Acidez",
    guide: [
      { step: "Pre-infusión (Bloom)", time: "0:00 - 0:45", ratioWater: 0.20, desc: "Satura todo el lecho de café para liberar CO2 y gases del tueste." },
      { step: "Primer Vertido", time: "0:45 - 1:30", ratioWater: 0.60, desc: "Vierte en círculos concéntricos desde el centro hacia afuera sin tocar el filtro." },
      { step: "Segundo Vertido & Drenado", time: "1:30 - 2:45", ratioWater: 1.00, desc: "Completa el agua restante con flujo suave constante y deja drenar por gravedad." }
    ]
  },
  chemex: {
    name: "Chemex Clásico",
    ratio: 16,
    defaultCoffee: 25,
    temp: 94,
    grind: "Media-Gruesa (Sal kosher)",
    totalTimeSeconds: 240, // 4:00 min
    iconSvg: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l-4 8 4 10H6l4-10L6 3z"/><line x1="8" y1="11" x2="16" y2="11"/></svg>`,
    badge: "Cuerpo Limpio & Delicado",
    guide: [
      { step: "Enjuague del Filtro", time: "Preparación", ratioWater: 0, desc: "Enjuaga con agua caliente para eliminar sabor a celulosa y precalentar el cono." },
      { step: "Bloom Profundo", time: "0:00 - 0:45", ratioWater: 0.25, desc: "Añade el triple del peso del grano en agua para una hidratación pareja." },
      { step: "Vertido Continuo", time: "0:45 - 4:00", ratioWater: 1.00, desc: "Mantén un nivel de agua controlado a 2cm del borde hasta finalizar." }
    ]
  },
  aeropress: {
    name: "Aeropress Invertido",
    ratio: 12,
    defaultCoffee: 16,
    temp: 88,
    grind: "Media (Arena fina)",
    totalTimeSeconds: 90, // 1:30 min
    iconSvg: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="7" y="2" width="10" height="15" rx="1"/><rect x="9" y="17" width="6" height="5"/><line x1="5" y1="2" x2="19" y2="2"/></svg>`,
    badge: "Dulzura & Intensidad",
    guide: [
      { step: "Inmersión Rápida", time: "0:00 - 0:20", ratioWater: 1.00, desc: "Vierte toda el agua en posición invertida y remueve suavemente con la paleta." },
      { step: "Infusión Estática", time: "0:20 - 1:00", ratioWater: 1.00, desc: "Coloca la tapa con filtro enjuagado y permite que repose para extraer dulzura." },
      { step: "Prensado Constante", time: "1:00 - 1:30", ratioWater: 1.00, desc: "Voltea sobre la jarra y presiona con presión uniforme hasta escuchar el siseo del aire." }
    ]
  },
  frenchpress: {
    name: "Prensa Francesa",
    ratio: 14,
    defaultCoffee: 20,
    temp: 95,
    grind: "Gruesa Uniforme",
    totalTimeSeconds: 270, // 4:30 min
    iconSvg: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="12" height="16" rx="2"/><line x1="12" y1="2" x2="12" y2="12"/><line x1="8" y1="12" x2="16" y2="12"/><path d="M18 8h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3"/></svg>`,
    badge: "Cuerpo Denso & Aceites",
    guide: [
      { step: "Inmersión Total", time: "0:00 - 1:00", ratioWater: 1.00, desc: "Vierte todo el volumen de agua de golpe, asegurando que todos los granos se sumerjan." },
      { step: "Ruptura de Costra", time: "4:00", ratioWater: 1.00, desc: "Quiebra con cuchara la costra superior de café y retira la espuma con sedimentos." },
      { step: "Decantación Final", time: "4:30", ratioWater: 1.00, desc: "Coloca el émbolo y baja lentamente hasta el fondo. Sirve todo de inmediato sin dejar en reposo." }
    ]
  }
};

let currentMethodKey = "v60";
let timerInterval = null;
let timerSeconds = 0;
let isTimerRunning = false;

function initCalculator() {
  const methodTabs = document.querySelectorAll(".method-tab-btn");
  const coffeeSlider = document.getElementById("coffee-grams-slider");
  const coffeeInput = document.getElementById("coffee-grams-input");
  const cupsButtons = document.querySelectorAll(".cups-btn");

  if (!coffeeSlider || !coffeeInput) return;

  function updateCalculations() {
    const method = BREW_METHODS[currentMethodKey];
    const grams = parseFloat(coffeeInput.value) || method.defaultCoffee;
    const waterTotal = Math.round(grams * method.ratio);

    // Actualizar datos en pantalla
    document.getElementById("calc-water-output").textContent = `${waterTotal} ml`;
    document.getElementById("calc-ratio-output").textContent = `1:${method.ratio}`;
    document.getElementById("calc-temp-output").textContent = `${method.temp}°C`;
    document.getElementById("calc-grind-output").textContent = method.grind;

    // Actualizar pasos de vertido con pesos reales
    const guideContainer = document.getElementById("calc-steps-container");
    if (guideContainer) {
      guideContainer.innerHTML = method.guide.map((step, idx) => {
        const stepWater = Math.round(waterTotal * step.ratioWater);
        const waterBadge = step.ratioWater > 0 ? `<span class="text-xs font-semibold px-2 py-0.5 bg-[#E8DFD8] text-[#1C1512] rounded">Hasta ${stepWater} ml</span>` : '';
        return `
          <div class="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E8DFD8]">
            <div class="w-8 h-8 rounded-full bg-[#F4EFEA] text-[#9C4A2F] font-bold text-sm flex items-center justify-center shrink-0">
              ${idx + 1}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h5 class="text-sm font-bold text-[#1C1512]">${step.step}</h5>
                <div class="flex items-center gap-2">
                  ${waterBadge}
                  <span class="text-xs text-[#948177] font-mono">${step.time}</span>
                </div>
              </div>
              <p class="text-xs text-[#6E5C53] leading-relaxed">${step.desc}</p>
            </div>
          </div>
        `;
      }).join("");
    }

    // Resetear cronómetro si cambia de método
    resetTimerUI();
  }

  // Cambio de método
  methodTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      methodTabs.forEach(t => {
        t.classList.remove("border-[#9C4A2F]", "bg-white", "shadow-sm");
        t.classList.add("border-transparent", "opacity-75");
      });
      tab.classList.remove("border-transparent", "opacity-75");
      tab.classList.add("border-[#9C4A2F]", "bg-white", "shadow-sm");

      currentMethodKey = tab.getAttribute("data-method");
      const method = BREW_METHODS[currentMethodKey];
      coffeeSlider.value = method.defaultCoffee;
      coffeeInput.value = method.defaultCoffee;
      updateCalculations();
    });
  });

  // Slider y valor numérico sincronizados
  coffeeSlider.addEventListener("input", (e) => {
    coffeeInput.value = e.target.value;
    updateCalculations();
  });

  coffeeInput.addEventListener("input", (e) => {
    let val = parseFloat(e.target.value);
    if (val < 10) val = 10;
    if (val > 80) val = 80;
    coffeeSlider.value = val;
    updateCalculations();
  });

  // Botones de tazas preestablecidas (1, 2, 3 tazas)
  cupsButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const cups = parseInt(btn.getAttribute("data-cups"), 10);
      let targetGrams = 15;
      if (cups === 1) targetGrams = 15;
      else if (cups === 2) targetGrams = 30;
      else if (cups === 3) targetGrams = 45;
      else if (cups === 4) targetGrams = 60;

      coffeeSlider.value = targetGrams;
      coffeeInput.value = targetGrams;

      cupsButtons.forEach(b => {
        b.classList.remove("bg-[#9C4A2F]", "text-white");
        b.classList.add("bg-[#F4EFEA]", "text-[#1C1512]");
      });
      btn.classList.remove("bg-[#F4EFEA]", "text-[#1C1512]");
      btn.classList.add("bg-[#9C4A2F]", "text-white");

      updateCalculations();
    });
  });

  // Inicializar cronómetro
  initTimer();
  updateCalculations();
}

function initTimer() {
  const startBtn = document.getElementById("timer-start-btn");
  const resetBtn = document.getElementById("timer-reset-btn");

  if (!startBtn || !resetBtn) return;

  startBtn.addEventListener("click", () => {
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener("click", () => {
    resetTimerUI();
  });
}

function startTimer() {
  const startBtn = document.getElementById("timer-start-btn");
  isTimerRunning = true;
  if (startBtn) {
    startBtn.innerHTML = `
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="6" y="4" width="4" height="16"/>
        <rect x="14" y="4" width="4" height="16"/>
      </svg>
      Pausar
    `;
    startBtn.classList.remove("bg-[#9C4A2F]");
    startBtn.classList.add("bg-[#6E5C53]");
  }

  const targetSeconds = BREW_METHODS[currentMethodKey].totalTimeSeconds;

  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();

    // Actualizar barra de progreso
    const progressPercent = Math.min((timerSeconds / targetSeconds) * 100, 100);
    const progressBar = document.getElementById("timer-progress-bar");
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    if (timerSeconds >= targetSeconds) {
      pauseTimer();
      if (window.showToast) {
        window.showToast(
          "Extracción Completada",
          `Tiempo sugerido de ${BREW_METHODS[currentMethodKey].name} alcanzado. ¡Sirve y disfruta de tu taza!`,
          "success"
        );
      }
    }
  }, 1000);
}

function pauseTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  const startBtn = document.getElementById("timer-start-btn");
  if (startBtn) {
    startBtn.innerHTML = `
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
      Iniciar
    `;
    startBtn.classList.remove("bg-[#6E5C53]");
    startBtn.classList.add("bg-[#9C4A2F]");
  }
}

function resetTimerUI() {
  pauseTimer();
  timerSeconds = 0;
  updateTimerDisplay();
  const progressBar = document.getElementById("timer-progress-bar");
  if (progressBar) {
    progressBar.style.width = "0%";
  }
}

function updateTimerDisplay() {
  const display = document.getElementById("timer-display");
  if (!display) return;
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  display.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

window.initCalculator = initCalculator;
