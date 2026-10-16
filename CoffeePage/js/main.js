/**
 * ORIGEN — Script Principal de Interacción & Arquitectura UI
 * Manejo de navegación, animaciones de scroll, sistema de notificaciones Toast y modales
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileMenu();
  initScrollAnimations();
  initMenuTabs();
  initForms();
  initBackToTop();
  initModalListeners();

  // Inicializar módulos secundarios si están disponibles
  if (window.initCatalog) window.initCatalog();
  if (window.initCalculator) window.initCalculator();
});

/* ==========================================================================
   1. Sistema de Notificaciones Toast (0 Emojis, 100% SVG)
   ========================================================================== */
function showToast(title, message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  let iconSvg = "";
  if (type === "success") {
    iconSvg = `
      <div class="w-8 h-8 rounded-full bg-[#9C4A2F]/20 text-[#C59B27] flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    `;
  } else if (type === "info") {
    iconSvg = `
      <div class="w-8 h-8 rounded-full bg-[#C59B27]/20 text-[#C59B27] flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      </div>
    `;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-1">
      <h6 class="text-xs font-bold uppercase tracking-wider text-[#FBF8F5]">${title}</h6>
      <p class="text-xs text-[#E8DFD8] mt-0.5 leading-snug">${message}</p>
    </div>
    <button type="button" class="text-[#948177] hover:text-white transition-colors" onclick="this.parentElement.remove()" aria-label="Cerrar notificación">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animación
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto-remover en 4.5 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

window.showToast = showToast;

/* ==========================================================================
   2. Navegación & Efecto Glassmorphism al hacer Scroll
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    // Detección de sección activa
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-[#9C4A2F]", "font-semibold");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("text-[#9C4A2F]", "font-semibold");
      }
    });
  });
}

/* ==========================================================================
   3. Menú Móvil Desplegable (Drawer Fluido)
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("mobile-menu-close");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // Cerrar al hacer clic en el backdrop
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  // Cerrar al pulsar un enlace
  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Cerrar con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   4. Animaciones de Entrada Suave (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function observeElements() {
    const targets = document.querySelectorAll(".reveal-init:not(.reveal-active)");
    targets.forEach(target => observer.observe(target));
  }

  window.observeNewElements = observeElements;
  observeElements();
}

/* ==========================================================================
   5. Manejo de Formularios con Validación & Feedback
   ========================================================================== */
function initForms() {
  // Formulario de Reserva / Experiencia de Degustación
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Confirmando reserva...
      `;

      setTimeout(() => {
        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast(
          "Mesa Reservada con Éxito",
          "Te hemos enviado los detalles de tu experiencia sensorial por correo electrónico. ¡Esperamos tu visita!",
          "success"
        );
      }, 1200);
    });
  }

  // Formulario de Newsletter
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input[type='email']");
      if (emailInput && emailInput.value) {
        showToast(
          "Suscripción Confirmada",
          `Recibirás notas de cata y anuncios de nuevos lotes en ${emailInput.value}.`,
          "info"
        );
        newsletterForm.reset();
      }
    });
  }
}

/* ==========================================================================
   6. Botón Volver Arriba (Scroll to Top)
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
      backToTopBtn.classList.add("opacity-100", "translate-y-0");
    } else {
      backToTopBtn.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
      backToTopBtn.classList.remove("opacity-100", "translate-y-0");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   7. Escuchadores para Modales (Escape y Clic Exterior)
   ========================================================================== */
function initModalListeners() {
  const modal = document.getElementById("coffee-modal");
  if (!modal) return;

  // Cerrar al hacer clic en el backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      if (window.closeCoffeeModal) window.closeCoffeeModal();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      if (window.closeCoffeeModal) window.closeCoffeeModal();
    }
  });
}

/* ==========================================================================
   8. Filtro Interactivo de Pestañas de la Carta de Cafetería
   ========================================================================== */
function initMenuTabs() {
  const tabButtons = document.querySelectorAll(".menu-tab-btn");
  const menuItems = document.querySelectorAll(".menu-item-card");

  if (!tabButtons.length || !menuItems.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Estilos activos en botones
      tabButtons.forEach(b => {
        b.classList.remove("active", "bg-espresso-900", "text-white", "shadow-sm");
        b.classList.add("bg-transparent", "text-espresso-700");
      });
      btn.classList.add("active", "bg-espresso-900", "text-white", "shadow-sm");
      btn.classList.remove("bg-transparent", "text-espresso-700");

      const category = btn.getAttribute("data-menu-tab");

      // Filtrado instantáneo de tarjetas con animación suave
      menuItems.forEach(item => {
        if (category === "todos" || item.getAttribute("data-category") === category) {
          item.classList.remove("hidden");
          item.classList.add("reveal-active");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
}

