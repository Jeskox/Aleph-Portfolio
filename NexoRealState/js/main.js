/**
 * NEXO Real Estate — Script Principal de Interacción & Arquitectura Corporativa
 * Navegación suave entre secciones, modal legal RGPD, acordeón FAQ, menú móvil y Chatbot
 * 0 Emojis — 100% Vectores SVG
 */

document.addEventListener("DOMContentLoaded", () => {
  initSectionNav();
  initMobileDrawer();
  initFaqAccordion();
  initContactForm();
  initPropertySearchForm();
  initScrollAnimations();
  initModalListeners();
  initLegalModalListeners();
  initChatbotWidget();

  // Inicializar módulos de componentes
  if (window.initBeforeAfterSlider) window.initBeforeAfterSlider();
  if (window.initPropertiesShowcase) window.initPropertiesShowcase();
});

/* ==========================================================================
   1. Sistema de Navegación por Secciones & Scroll Suave
   ========================================================================== */
function initSectionNav() {
  const navLinks = document.querySelectorAll(".nav-section-link");
  const sections = document.querySelectorAll("section[id]");
  const headerHeight = 84;

  function scrollToSection(targetId) {
    if (!targetId) targetId = "inicio";
    targetId = targetId.replace(/^#/, "");

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth"
    });

    if (window.location.hash !== `#${targetId}`) {
      history.replaceState(null, "", `#${targetId}`);
    }

    updateActiveNavLink(targetId);
  }

  function updateActiveNavLink(activeId) {
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === `#${activeId}`) {
        link.classList.add("active", "text-navy", "bg-white", "shadow-sm");
        link.classList.remove("text-navy-muted");
      } else {
        link.classList.remove("active", "text-navy", "bg-white", "shadow-sm");
        link.classList.add("text-navy-muted");
      }
    });
  }

  // Interceptar todos los enlaces ancla internos
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const targetId = href.replace(/^#/, "");
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      e.preventDefault();
      scrollToSection(targetId);

      // Si el drawer móvil está abierto, cerrarlo
      const drawer = document.getElementById("mobile-drawer");
      const overlay = document.getElementById("mobile-drawer-overlay");
      if (drawer && !drawer.classList.contains("translate-x-full")) {
        drawer.classList.add("translate-x-full");
        if (overlay) overlay.classList.add("hidden");
        document.body.style.overflow = "";
      }
    }
  });

  // Observador de scroll para resaltar la sección activa en el menú
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      let currentSectionId = "inicio";
      const scrollPos = window.pageYOffset + headerHeight + 50;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute("id");
        }
      });

      updateActiveNavLink(currentSectionId);
    }, 80);
  }, { passive: true });

  // Exponer para compatibilidad con módulos anteriores y llamadas externas
  window.scrollToSection = scrollToSection;
  window.switchSubpage = scrollToSection;

  // Manejar hash inicial al cargar
  if (window.location.hash) {
    const initialId = window.location.hash.replace(/^#/, "");
    setTimeout(() => scrollToSection(initialId), 150);
  }
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

    if (window.scrollToSection) {
      window.scrollToSection("propiedades");
    }

    setTimeout(() => {
      const filterBtn = document.querySelector(`.property-filter-btn[data-filter="${selectedType}"]`);
      if (filterBtn) {
        filterBtn.click();
      }
    }, 250);
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
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
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

      // Cerrar otros acordeones para mantener orden ejecutivo
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

    const privacyCheck = document.getElementById("contact-privacy-check");
    if (privacyCheck && !privacyCheck.checked) {
      showToast(
        "Consentimiento Requerido",
        "Por favor, acepte la política de privacidad antes de enviar la solicitud.",
        "info"
      );
      privacyCheck.focus();
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
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
        "Un asesor patrimonial senior de NEXO se pondrá en contacto contigo en menos de 4 horas hábiles.",
        "success"
      );
    }, 1200);
  });
}

/* ==========================================================================
   7. Modal de Documentación Legal Ficticia (RGPD, Términos, Cookies)
   ========================================================================== */
function switchLegalTab(tabId) {
  const buttons = document.querySelectorAll(".legal-tab-btn");
  const panes = document.querySelectorAll(".legal-content-pane");

  // Ocultar todos los paneles
  panes.forEach(pane => pane.classList.add("hidden"));

  // Resetear estilos de botones
  buttons.forEach(btn => {
    btn.classList.remove("bg-navy", "text-white");
    btn.classList.add("bg-canvas", "text-navy-muted");
  });

  // Activar botón y contenido seleccionado
  const activeBtn = document.getElementById(`tab-btn-${tabId}`);
  const activePane = document.getElementById(`legal-content-${tabId}`);

  if (activeBtn) {
    activeBtn.classList.remove("bg-canvas", "text-navy-muted");
    activeBtn.classList.add("bg-navy", "text-white");
  }

  if (activePane) {
    activePane.classList.remove("hidden");
  }
}

function openLegalModal(tabId = "privacy") {
  const modal = document.getElementById("legal-modal");
  if (!modal) return;

  switchLegalTab(tabId);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeLegalModal() {
  const modal = document.getElementById("legal-modal");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

function initLegalModalListeners() {
  const modal = document.getElementById("legal-modal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeLegalModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeLegalModal();
    }
  });
}

window.openLegalModal = openLegalModal;
window.closeLegalModal = closeLegalModal;
window.switchLegalTab = switchLegalTab;

/* ==========================================================================
   8. Escuchadores de Cierre para el Modal de Propiedades
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
   9. Animaciones de Entrada Suave (IntersectionObserver)
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
   10. Widget Flotante de Concierge Inmobiliario (Mateo Navarro)
   Conversación simulada ágil, soporte de chips rápidos y navegación fluida
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
        replyWithDelay("Perfecto. Le dirijo a nuestra cartera de chalets y villas exclusivas.", () => {
          if (window.scrollToSection) {
            window.scrollToSection("propiedades");
            setTimeout(() => {
              const filterBtn = document.querySelector('.property-filter-btn[data-filter="villas"]');
              if (filterBtn) filterBtn.click();
            }, 250);
          }
        });
      } else if (action === "tasacion") {
        replyWithDelay("Excelente decisión. Le sitúo en nuestro formulario de valoración técnica para analizar su activo.", () => {
          if (window.scrollToSection) {
            window.scrollToSection("contacto");
          }
        });
      } else if (action === "staging") {
        replyWithDelay("Con nuestro servicio de Home Staging revalorizamos su propiedad hasta un 15%. Le muestro la comparativa interactiva en servicios.", () => {
          if (window.scrollToSection) {
            window.scrollToSection("servicios");
          }
        });
      } else if (action === "contacto") {
        replyWithDelay("Puede contactar directamente con nuestro equipo en Paseo de la Castellana 95 (+34 910 234 567) o remitirnos su consulta.", () => {
          if (window.scrollToSection) {
            window.scrollToSection("contacto");
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

      if (lower.includes("precio") || lower.includes("coste") || lower.includes("cuanto") || lower.includes("honorario") || lower.includes("tarifa")) {
        replyText = "Nuestros honorarios parten del 3% a éxito en compraventa Prime y desde 1.800 € en Home Staging. Puede consultar el desglose completo en la sección de Servicios.";
        callback = () => { if (window.scrollToSection) window.scrollToSection("servicios"); };
      } else if (lower.includes("chalet") || lower.includes("villa") || lower.includes("atico") || lower.includes("piso") || lower.includes("propiedad")) {
        replyText = "Disponemos de activos singulares en Madrid, Barcelona y la Costa Blanca. Le sitúo en nuestra cartera seleccionada.";
        callback = () => { if (window.scrollToSection) window.scrollToSection("propiedades"); };
      } else if (lower.includes("vender") || lower.includes("tasar") || lower.includes("tasacion") || lower.includes("valor")) {
        replyText = "Realizamos dictámenes de mercado y valoraciones RICS con total discreción. Le facilito el formulario para solicitar la valoración.";
        callback = () => { if (window.scrollToSection) window.scrollToSection("contacto"); };
      } else if (lower.includes("telefono") || lower.includes("llamada") || lower.includes("cita") || lower.includes("contacto") || lower.includes("oficina") || lower.includes("donde")) {
        replyText = "Nuestra sede principal está en Paseo de la Castellana 95, Madrid (Telf: +34 910 234 567) y contamos con delegación en Diagonal 640, Barcelona.";
        callback = () => { if (window.scrollToSection) window.scrollToSection("contacto"); };
      } else if (lower.includes("equipo") || lower.includes("quienes") || lower.includes("nosotros") || lower.includes("socio")) {
        replyText = "NEXO está liderado por socios con más de 20 años en banca privada y consultoría inmobiliaria. Le invito a conocer a nuestro equipo directivo.";
        callback = () => { if (window.scrollToSection) window.scrollToSection("nosotros"); };
      } else if (lower.includes("hola") || lower.includes("buenos") || lower.includes("buenas") || lower.includes("que tal")) {
        replyText = "Estimado cliente, es un placer atenderle. ¿Desea consultar nuestra cartera residencial o solicitar la valoración de un activo?";
      } else {
        replyText = "Muchas gracias por su consulta. Un consultor patrimonial de NEXO coordinará los detalles. ¿Desea que agendemos una llamada o reunión presencial?";
        callback = () => { if (window.scrollToSection) window.scrollToSection("contacto"); };
      }

      replyWithDelay(replyText, callback);
    });
  }

  window.openChatbot = () => toggleChatbot(true);
  window.closeChatbot = () => toggleChatbot(false);
}
