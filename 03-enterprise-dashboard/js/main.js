/**
 * COSMOS Explorer — Controlador Principal de Interfaz (Observatory OS)
 * Telemetría en tiempo real, navegación híbrida PC/Móvil, Toasts SVG y Modales
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.initStarfield) window.initStarfield();
  if (window.initOrrery) window.initOrrery();
  if (window.initGravitySandbox) window.initGravitySandbox();
  if (window.initScaleAndRelativity) window.initScaleAndRelativity();
  if (window.initCosmicAtlas) window.initCosmicAtlas();

  initTelemetryClock();
  initNavigationSpy();
  initMobileDrawer();
  initScrollReveal();
  initGlobalModals();
});

/* ==========================================================================
   1. Sistema de Notificaciones Toast (100% Vector SVG, 0 Emojis)
   ========================================================================== */
function showToast(title, message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  let iconSvg = `
    <div class="w-8 h-8 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    </div>
  `;

  if (type === "success") {
    iconSvg = `
      <div class="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    `;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-1">
      <h6 class="text-xs font-mono-tech font-bold uppercase tracking-wider text-white">${title}</h6>
      <p class="text-xs text-slate-300 mt-0.5 leading-snug">${message}</p>
    </div>
    <button type="button" class="text-slate-500 hover:text-white transition-colors" onclick="this.parentElement.remove()" aria-label="Cerrar notificación">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 4200);
}

window.showToast = showToast;

/* ==========================================================================
   2. Reloj de Telemetría UTC & Odómetro Voyager 1 en Tiempo Real
   ========================================================================== */
function initTelemetryClock() {
  const clockEl = document.getElementById("utc-telemetry-clock");
  const voyagerEl = document.getElementById("voyager-distance-ticker");
  let baseVoyagerKm = 24684910240; // ~24.68 Mil Millones de km

  setInterval(() => {
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toISOString().replace("T", " ").substring(0, 19) + " UTC";
    }
    if (voyagerEl) {
      baseVoyagerKm += 17; // Voyager 1 viaja a ~17 km/s
      voyagerEl.textContent = baseVoyagerKm.toLocaleString("es-ES") + " km";
    }
  }, 1000);
}

/* ==========================================================================
   3. Spy de Navegación para Sidebar de PC y Bottom App-Bar Móvil
   ========================================================================== */
function initNavigationSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".os-nav-link");

  window.addEventListener("scroll", () => {
    let activeId = "planetario";
    sections.forEach(sec => {
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        activeId = sec.getAttribute("id");
      }
    });

    navItems.forEach(item => {
      const href = item.getAttribute("href");
      if (href === `#${activeId}`) {
        item.classList.add("text-[#38BDF8]", "bg-[#38BDF8]/10", "border-[#38BDF8]/30");
        item.classList.remove("text-slate-400", "border-transparent");
      } else {
        item.classList.remove("text-[#38BDF8]", "bg-[#38BDF8]/10", "border-[#38BDF8]/30");
        item.classList.add("text-slate-400", "border-transparent");
      }
    });
  });
}

/* ==========================================================================
   4. Menú Drawer Móvil
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.getElementById("mobile-drawer-open");
  const closeBtn = document.getElementById("mobile-drawer-close");
  const drawer = document.getElementById("mobile-os-drawer");
  const backdrop = document.getElementById("mobile-os-backdrop");
  const links = document.querySelectorAll(".mobile-os-link");

  if (!openBtn || !drawer || !backdrop) return;

  function open() {
    backdrop.classList.remove("hidden");
    drawer.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  }

  function close() {
    drawer.classList.add("translate-x-full");
    backdrop.classList.add("hidden");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  links.forEach(l => l.addEventListener("click", close));
}

/* ==========================================================================
   5. Animaciones Reveal on Scroll
   ========================================================================== */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal-init").forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Cierre Global de Modales (Tecla Escape y Clic en Backdrop)
   ========================================================================== */
function initGlobalModals() {
  const modal = document.getElementById("atlas-modal");
  if (!modal) return;

  modal.addEventListener("click", e => {
    if (e.target === modal && window.closeAtlasModal) {
      window.closeAtlasModal();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.classList.contains("hidden") && window.closeAtlasModal) {
      window.closeAtlasModal();
    }
  });
}
