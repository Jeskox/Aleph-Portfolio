/**
 * NEXO Real Estate — Script Principal de Interacción & Arquitectura de Subpáginas
 * Sistema de enrutamiento por pestañas, menú móvil, acordeón FAQ y notificaciones Toast
 * 0 Emojis — 100% Vectores SVG
 */

document.addEventListener("DOMContentLoaded", () => {
  initSubpageRouter();
  initMobileDrawer();
  initFaqAccordion();
  initContactForm();
  initPropertySearchForm();
  initScrollAnimations();
  initModalListeners();
  initChatbotWidget();

  // Inicializar módulos de componentes
  if (window.initBeforeAfterSlider) window.initBeforeAfterSlider();
  if (window.initPropertiesShowcase) window.initPropertiesShowcase();
});

/* ==========================================================================
   1. Sistema de Enrutamiento por Pestañas / Subpáginas (SPA Dinámica)
   ========================================================================== */
function initSubpageRouter() {
  const subpages = document.querySelectorAll(".subpage");
  const navLinks = document.querySelectorAll("[data-subpage-target]");
  const quickBarItems = document.querySelectorAll(".quick-bar-item[data-subpage-target]");

  function switchSubpage(targetId) {
    if (!targetId) targetId = "inicio";
    targetId = targetId.replace(/^#/, "");

    const targetSubpage = document.getElementById(`subpage-${targetId}`);
    if (!targetSubpage) return;

    // Ocultar todas las subpáginas y activar la deseada
    subpages.forEach(sp => {
      sp.classList.remove("active");
      sp.classList.add("hidden");
    });

    targetSubpage.classList.remove("hidden");
    requestAnimationFrame(() => {
      targetSubpage.classList.add("active");
    });

    // Actualizar estilos en navegación de escritorio
    navLinks.forEach(link => {
      const linkTarget = link.getAttribute("data-subpage-target");
      if (linkTarget === targetId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Actualizar enlaces en la barra rápida inferior móvil
    quickBarItems.forEach(item => {
      const itemTarget = item.getAttribute("data-subpage-target");
      if (itemTarget === targetId) {
        item.classList.add("active", "text-[#0284C7]");
        item.classList.remove("text-gray-400");
      } else {
        item.classList.remove("active", "text-[#0284C7]");
        item.classList.add("text-gray-400");
      }
    });

    // Sincronizar hash en la URL sin saltos bruscos
    if (window.location.hash !== `#${targetId}`) {
      history.replaceState(null, "", `#${targetId}`);
    }

    // Desplazar arriba suavemente
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Refrescar slider de Home Staging si estamos en la pestaña servicios
    if (targetId === "servicios" && window.refreshBeforeAfter) {
      setTimeout(window.refreshBeforeAfter, 60);
    }

    // Refrescar observador de animaciones
    if (window.observeNewElements) {
      window.observeNewElements();
    }
  }

  // Escuchar clics en cualquier elemento con data-subpage-target
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-subpage-target]");
    if (trigger) {
      e.preventDefault();
      const target = trigger.getAttribute("data-subpage-target");
      switchSubpage(target);
    }
  });

  // Escuchar cambios de hash (historial del navegador)
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) switchSubpage(hash);
  });

  // Cargar subpágina inicial
  const initialHash = window.location.hash.replace(/^#/, "") || "inicio";
  switchSubpage(initialHash);

  window.switchSubpage = switchSubpage;
}

/* ==========================================================================
   2. Buscador Rápido de Inmuebles en Hero
   ========================================================================== */
function initPropertySearchForm() {
  const searchForm = document.getElementById("hero-search-form");
  if (!searchForm) return;

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const typeSelect = document.getElementById("search-type");
    const selectedType = typeSelect ? typeSelect.value : "todos";

    // Cambiar a la subpágina de propiedades
    if (window.switchSubpage) {
      window.switchSubpage("propiedades");
    }

    // Simular clic en el botón de filtro correspondiente
    setTimeout(() => {
      const filterBtn = document.querySelector(`.property-filter-btn[data-filter="${selectedType}"]`);
      if (filterBtn) {
        filterBtn.click();
      }
    }, 150);
  });
}

/* ==========================================================================
   3. Sistema de Notificaciones Toast (0 Emojis, 100% SVG)
   ========================================================================== */
function showToast(title, message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  let iconSvg = `
    <div class="w-8 h-8 rounded-full bg-[#0284C7]/20 text-[#0284C7] flex items-center justify-center shrink-0">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  `;

  if (type === "info") {
    iconSvg = `
      <div class="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
      <h6 class="text-xs font-bold uppercase tracking-wider text-white">${title}</h6>
      <p class="text-xs text-[#CBD8E6] mt-0.5 leading-snug">${message}</p>
    </div>
    <button type="button" class="text-[#868E96] hover:text-white transition-colors" onclick="this.parentElement.remove()" aria-label="Cerrar notificación">
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
  }, 4500);
}

window.showToast = showToast;

/* ==========================================================================
   4. Menú Móvil Lateral (Drawer Deslizable)
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mobile-menu-close");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-drawer-overlay");
  const links = document.querySelectorAll(".mobile-drawer-link");

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    overlay.classList.remove("hidden");
    drawer.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  links.forEach(l => l.addEventListener("click", closeDrawer));
}

/* ==========================================================================
   5. Acordeón Interactivo de Preguntas Frecuentes (FAQ Inmobiliario)
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-trigger");

  items.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling;
      const icon = trigger.querySelector(".faq-icon");
      const isOpen = !content.classList.contains("hidden");

      // Cerrar otros acordeones
      items.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.nextElementSibling.classList.add("hidden");
          const otherIcon = otherTrigger.querySelector(".faq-icon");
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });

      // Alternar estado actual
      if (isOpen) {
        content.classList.add("hidden");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        content.classList.remove("hidden");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

/* ==========================================================================
   6. Formulario de Contacto & Tasación Inmobiliaria
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-project-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Enviando solicitud...
    `;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast(
        "Solicitud Recibida con Éxito",
        "Un asesor inmobiliario de NEXO contactará contigo en menos de 24h para coordinar la visita o tasación.",
        "success"
      );
    }, 1200);
  });
}

/* ==========================================================================
   7. Escuchadores de Cierre para el Modal
   ========================================================================== */
function initModalListeners() {
  const modal = document.getElementById("property-modal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      if (window.closePropertyModal) window.closePropertyModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      if (window.closePropertyModal) window.closePropertyModal();
    }
  });
}

/* ==========================================================================
   8. Animaciones de Entrada Suave (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  function observeElements() {
    const targets = document.querySelectorAll(".reveal-init:not(.reveal-active)");
    targets.forEach(t => observer.observe(t));
  }

  window.observeNewElements = observeElements;
  observeElements();
}

/* ==========================================================================
   9. Widget Flotante de Chatbot Inmobiliario (Mateo Navarro)
   Conversación simulada breve y ágil, soporte de chips rápidos y navegación fluida
   0 Emojis — 100% SVG
   ========================================================================== */
function initChatbotWidget() {
  const toggleBtn = document.getElementById("chatbot-toggle-btn");
  const closeBtn = document.getElementById("chatbot-close-btn");
  const windowEl = document.getElementById("chatbot-window");
  const messagesContainer = document.getElementById("chatbot-messages");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const chips = document.querySelectorAll(".chatbot-chip");
  const teaser = document.getElementById("chatbot-teaser");
  const teaserClose = document.getElementById("chatbot-teaser-close");

  if (!toggleBtn || !windowEl || !messagesContainer) return;

  function toggleChatbot(forceState) {
    const isOpen = typeof forceState === "boolean" 
      ? forceState 
      : !windowEl.classList.contains("is-open");

    if (isOpen) {
      if (teaser) teaser.classList.add("is-dismissed");
      windowEl.classList.remove("is-hidden");
      void windowEl.offsetWidth;
      windowEl.classList.add("is-open");
      toggleBtn.classList.add("active");
      toggleBtn.setAttribute("aria-expanded", "true");
      if (input) input.focus();
      scrollChatToBottom();
    } else {
      windowEl.classList.remove("is-open");
      toggleBtn.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
      setTimeout(() => {
        if (!windowEl.classList.contains("is-open")) {
          windowEl.classList.add("is-hidden");
        }
      }, 300);
    }
  }

  toggleBtn.addEventListener("click", () => toggleChatbot());
  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleChatbot(false));
  }

  // Manejo de pastilla teaser de bienvenida
  if (teaser) {
    teaser.addEventListener("click", (e) => {
      if (e.target.closest("#chatbot-teaser-close")) {
        e.stopPropagation();
        teaser.classList.add("is-dismissed");
        return;
      }
      toggleChatbot(true);
    });
  }

  function scrollChatToBottom() {
    requestAnimationFrame(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }

  function appendMessage(text, isUser = false) {
    const msgEl = document.createElement("div");
    msgEl.className = `chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-assistant"}`;
    if (isUser) {
      msgEl.textContent = text;
    } else {
      msgEl.innerHTML = `
        <div class="bubble-author">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Mateo Navarro</span>
        </div>
        <div>${text}</div>
      `;
    }
    messagesContainer.appendChild(msgEl);
    scrollChatToBottom();
    return msgEl;
  }

  function showTypingIndicator() {
    const typingEl = document.createElement("div");
    typingEl.id = "chatbot-typing-indicator";
    typingEl.className = "chat-bubble chat-bubble-assistant";
    typingEl.innerHTML = `
      <div class="bubble-author">
        <span>Mateo está escribiendo</span>
      </div>
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    scrollChatToBottom();
    return typingEl;
  }

  function removeTypingIndicator() {
    const typingEl = document.getElementById("chatbot-typing-indicator");
    if (typingEl) typingEl.remove();
  }

  function replyWithDelay(replyText, actionCallback) {
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage(replyText, false);
      if (actionCallback) {
        setTimeout(actionCallback, 300);
      }
    }, 600);
  }

  // Manejo de chips de respuestas rápidas
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const action = chip.getAttribute("data-action");
      const label = chip.getAttribute("data-label") || chip.textContent.trim();

      appendMessage(label, true);

      if (action === "villas") {
        replyWithDelay("Perfecto. Te dirijo a nuestro catálogo de chalets y villas exclusivas.", () => {
          if (window.switchSubpage) {
            window.switchSubpage("propiedades");
            setTimeout(() => {
              const filterBtn = document.querySelector('.property-filter-btn[data-filter="villas"]');
              if (filterBtn) filterBtn.click();
            }, 150);
          }
        });
      } else if (action === "tasacion") {
        replyWithDelay("Excelente elección. Te abro nuestro formulario de tasación personalizada para valorar tu inmueble.", () => {
          if (window.switchSubpage) {
            window.switchSubpage("contacto");
          }
        });
      } else if (action === "staging") {
        replyWithDelay("Con nuestro servicio de Home Staging revalorizamos tu propiedad hasta un 15%. Te enseño la comparativa interactiva.", () => {
          if (window.switchSubpage) {
            window.switchSubpage("servicios");
          }
        });
      } else if (action === "contacto") {
        replyWithDelay("Puedes contactar directamente con nuestro equipo al +34 910 234 567 o agendar una cita en la pestaña de contacto.", () => {
          if (window.switchSubpage) {
            window.switchSubpage("contacto");
          }
        });
      }
    });
  });

  // Manejo de formulario de texto libre
  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;

      appendMessage(val, true);
      input.value = "";

      const lower = val.toLowerCase();
      let replyText = "";
      let callback = null;

      if (lower.includes("precio") || lower.includes("coste") || lower.includes("cuanto") || lower.includes("vale")) {
        replyText = "Nuestros inmuebles oscilan entre 430.000 € y 1.850.000 €. ¿Buscas una vivienda habitual o una inversión patrimonial?";
      } else if (lower.includes("chalet") || lower.includes("villa") || lower.includes("atico") || lower.includes("piso") || lower.includes("casa")) {
        replyText = "Disponemos de propiedades singulares en Madrid, Barcelona y la Costa Blanca. Te llevo a ver todas las opciones disponibles.";
        callback = () => { if (window.switchSubpage) window.switchSubpage("propiedades"); };
      } else if (lower.includes("vender") || lower.includes("tasar") || lower.includes("tasacion") || lower.includes("valor")) {
        replyText = "Realizamos valoraciones técnicas y de mercado sin compromiso. Te facilito el formulario para solicitar la tasación de tu vivienda.";
        callback = () => { if (window.switchSubpage) window.switchSubpage("contacto"); };
      } else if (lower.includes("telefono") || lower.includes("llamada") || lower.includes("cita") || lower.includes("contacto") || lower.includes("oficina")) {
        replyText = "Nuestras oficinas centrales están en Calle Serrano 48, Madrid. También puedes llamarnos al +34 910 234 567.";
        callback = () => { if (window.switchSubpage) window.switchSubpage("contacto"); };
      } else if (lower.includes("hola") || lower.includes("buenos") || lower.includes("buenas") || lower.includes("que tal")) {
        replyText = "¡Hola! Con mucho gusto te asesoro. Puedes ver nuestras propiedades disponibles o solicitar una tasación gratuita.";
      } else {
        replyText = "Gracias por tu mensaje. Un asesor especialista de NEXO se pondrá en contacto contigo para resolver cualquier detalle. ¿Deseas agendar una llamada?";
        callback = () => { if (window.switchSubpage) window.switchSubpage("contacto"); };
      }

      replyWithDelay(replyText, callback);
    });
  }

  window.openChatbot = () => toggleChatbot(true);
  window.closeChatbot = () => toggleChatbot(false);
}

