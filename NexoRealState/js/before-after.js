/**
 * NEXO Arquitectura — Comparador Interactivo Táctil Antes / Después
 * Compatible con gestos táctiles móviles (touch) y ratón de escritorio
 */

function initBeforeAfterSlider() {
  const container = document.getElementById("before-after-slider");
  const overlay = document.getElementById("ba-overlay");
  const handle = document.getElementById("ba-handle");
  const beforeImage = document.getElementById("ba-image-before");

  if (!container || !overlay || !handle || !beforeImage) return;

  let isDragging = false;

  function updateBeforeImageWidth() {
    // Mantener la imagen interior con el ancho exacto del contenedor contenedor
    const containerWidth = container.offsetWidth;
    beforeImage.style.width = `${containerWidth}px`;
  }

  function setSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;

    // Limitar entre 5% y 95% para mantener siempre visibles ambos estados
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;

    overlay.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Eventos de Ratón (Escritorio)
  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Eventos Táctiles (Móvil / Tablet)
  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    if (e.touches && e.touches[0]) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Soporte de Teclado Accesible
  container.setAttribute("tabindex", "0");
  container.setAttribute("role", "slider");
  container.setAttribute("aria-label", "Comparador interactivo antes y después de obra");
  container.setAttribute("aria-valuenow", "50");
  container.setAttribute("aria-valuemin", "0");
  container.setAttribute("aria-valuemax", "100");

  container.addEventListener("keydown", (e) => {
    let currentPct = parseFloat(overlay.style.width) || 50;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      currentPct = Math.max(5, currentPct - 5);
      overlay.style.width = `${currentPct}%`;
      handle.style.left = `${currentPct}%`;
      container.setAttribute("aria-valuenow", String(Math.round(currentPct)));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      currentPct = Math.min(95, currentPct + 5);
      overlay.style.width = `${currentPct}%`;
      handle.style.left = `${currentPct}%`;
      container.setAttribute("aria-valuenow", String(Math.round(currentPct)));
    }
  });

  // Manejar redimensionamiento de ventana
  window.addEventListener("resize", updateBeforeImageWidth);
  updateBeforeImageWidth();

  window.refreshBeforeAfter = updateBeforeImageWidth;
}

window.initBeforeAfterSlider = initBeforeAfterSlider;
