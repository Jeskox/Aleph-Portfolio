/**
 * ORIGEN — Catálogo de Bebidas de Cafetería
 * Carta popular, intuitiva y visual con fotografías reales y coherentes
 * 0 Emojis — 100% Vectores SVG
 */

const BEBIDAS_DATA = [
  {
    id: "capuchino",
    name: "Capuchino Tradicional",
    category: "clasicos",
    price: "3.50€",
    temperature: "Caliente",
    badge: "El Más Pedido",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg",
    description: "Espresso doble con abundante leche vaporizada y una nube espesa de espuma cremosa, rematada con un toque de canela o cacao puro.",
    tags: ["Espuma Aterciopelada", "Canela o Cacao"]
  },
  {
    id: "macchiato",
    name: "Caramel Macchiato",
    category: "dulces",
    price: "4.00€",
    temperature: "Caliente",
    badge: "Favorito Dulce",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Latte_macchiato.jpg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Latte_macchiato.jpg",
    description: "Deliciosas capas visibles de leche espumada y espresso recién extraído, coronado con hilo de caramelo artesanal casero.",
    tags: ["Capas Visibles", "Caramelo Casero"]
  },
  {
    id: "espresso",
    name: "Espresso Clásico",
    category: "intensos",
    price: "2.20€",
    temperature: "Caliente",
    badge: "100% Puro",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/9/99/CremaWithSwirls.jpg",
    description: "Un shot corto, concentrado y aromático con crema dorada espesa. La esencia más pura y auténtica de nuestros granos tostados.",
    tags: ["Crema Densa", "Sabor Intenso"]
  },
  {
    id: "mocha",
    name: "Café Mocha Artesanal",
    category: "dulces",
    price: "4.20€",
    temperature: "Caliente",
    badge: "Chocolate & Café",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Mocha_coffee.jpg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Mocha_coffee.jpg",
    description: "La unión irresistible de chocolate negro fundido, espresso aromático y leche cremosa texturizada, salpicada con virutas de cacao.",
    tags: ["Chocolate Fundido", "Topping Cacao"]
  },
  {
    id: "latte",
    name: "Café Latte (Con Leche)",
    category: "clasicos",
    price: "3.20€",
    temperature: "Caliente",
    badge: "Suave & Sedoso",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Latte_art.jpg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/9/96/Latte_art_in_the_style_of_a_feather.jpg",
    description: "Para quienes disfrutan de un café suave y largo. Mucha leche vaporizada a temperatura sedosa con un toque de café y arte barista.",
    tags: ["Microespuma Fina", "Latte Art"]
  },
  {
    id: "americano",
    name: "Americano Suave",
    category: "intensos",
    price: "2.50€",
    temperature: "Caliente",
    badge: "Aromático & Largo",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Espresso_Americano.jpeg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
    description: "Doble espresso alargado con agua caliente a la temperatura perfecta. Un café limpio, suave de beber y lleno de matices aromáticos.",
    tags: ["Cuerpo Ligero", "Fácil de Beber"]
  },
  {
    id: "coldbrew",
    name: "Cold Brew con Hielo",
    category: "frios",
    price: "3.80€",
    temperature: "Frío",
    badge: "18h Maceración",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Ice_coffee_image.jpg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/d/df/Cold_Brew_Coffee.jpg",
    description: "Café infusionado lentamente en frío durante toda la noche. Cero acidez, naturalmente dulce y servido en vaso alto con cubos de hielo macizo.",
    tags: ["Cero Acidez", "Ultra Refrescante"]
  },
  {
    id: "frappe",
    name: "Frappé de la Casa",
    category: "frios",
    price: "4.50€",
    temperature: "Frío",
    badge: "Especial de Tarde",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Frappe.jpg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/d/da/Frappe.jpg",
    description: "Café batido con hielo y leche espumosa hasta lograr una textura granizada deliciosa. El postre líquido ideal para endulzarte la tarde.",
    tags: ["Hielo Batido", "Dulce & Cremoso"]
  }
];

// Inicializar Catálogo de Bebidas
function initCatalog() {
  const container = document.getElementById("coffee-cards-container");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!container) return;

  function renderDrinks(filter = "todos") {
    container.innerHTML = "";
    const filtered = filter === "todos" 
      ? BEBIDAS_DATA 
      : BEBIDAS_DATA.filter(item => item.category === filter);

    filtered.forEach(drink => {
      const card = document.createElement("article");
      card.className = "bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#DFCEBD] hover-lift flex flex-col justify-between shadow-sm transition-all duration-300 reveal-init";
      
      const tagsHtml = drink.tags
        .map(tag => `<span class="inline-block text-[11px] font-medium px-2.5 py-1 bg-[#EAE0D3]/60 text-[#3B281F] rounded-md">${tag}</span>`)
        .join("");

      // Icono de temperatura SVG
      const tempIcon = drink.temperature === "Frío"
        ? `<svg class="w-3.5 h-3.5 text-[#3B6E8C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
           </svg>`
        : `<svg class="w-3.5 h-3.5 text-[#A04A2F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
             <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
             <line x1="6" y1="1" x2="6" y2="4"/>
             <line x1="10" y1="1" x2="10" y2="4"/>
             <line x1="14" y1="1" x2="14" y2="4"/>
           </svg>`;

      card.innerHTML = `
        <div>
          <!-- Imagen de la Bebida -->
          <div class="relative h-56 sm:h-60 overflow-hidden bg-[#EAE0D3]">
            <img 
              src="${drink.image}" 
              alt="${drink.name}" 
              class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              onerror="if (this.src !== '${drink.fallback}') { this.src = '${drink.fallback}'; }"
            />
            
            <!-- Badge de Tipo / Destacado -->
            <div class="absolute top-3 left-3 flex gap-1.5">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFDF9]/95 backdrop-blur-md rounded-full text-xs font-bold text-[#261A14] shadow-sm">
                ${tempIcon}
                ${drink.badge}
              </span>
            </div>

            <!-- Precio Flotante -->
            <div class="absolute bottom-3 right-3">
              <span class="inline-flex items-center px-3 py-1 bg-[#1A110D]/90 backdrop-blur-sm text-[#F5EFEB] rounded-full text-xs font-bold tracking-wide shadow-md">
                ${drink.price}
              </span>
            </div>
          </div>

          <!-- Información de la Bebida -->
          <div class="p-6">
            <h3 class="font-serif text-xl sm:text-2xl font-bold text-[#1A110D] mb-2 leading-snug">
              ${drink.name}
            </h3>

            <p class="text-xs sm:text-sm text-[#594033] mb-4 leading-relaxed line-clamp-3">
              ${drink.description}
            </p>

            <div class="flex flex-wrap gap-1.5 pt-1">
              ${tagsHtml}
            </div>
          </div>
        </div>

        <!-- Botón de Acción Amigable -->
        <div class="px-6 pb-6 pt-2 border-t border-[#EAE0D3]/80 flex items-center justify-between gap-3">
          <div class="text-xs text-[#7A5B49]">
            <span class="font-medium">Servido al momento</span>
          </div>
          <button 
            type="button"
            onclick="pedirBebida('${drink.name}')"
            class="px-4 py-2.5 text-xs font-bold text-white bg-[#A04A2F] hover:bg-[#853C24] rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5"
          >
            <span>¡Me Apetece!</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    if (window.observeNewElements) {
      window.observeNewElements();
    }
  }

  // Filtrado por botones de categoría
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("bg-[#1A110D]", "text-white");
        b.classList.add("bg-[#FFFDF9]", "text-[#3B281F]");
      });
      btn.classList.add("bg-[#1A110D]", "text-white");
      btn.classList.remove("bg-[#FFFDF9]", "text-[#3B281F]");

      const filter = btn.getAttribute("data-filter");
      renderDrinks(filter);
    });
  });

  // Render inicial
  renderDrinks("todos");
}

// Acción amigable al pulsar "¡Me Apetece!"
function pedirBebida(nombre) {
  if (window.showToast) {
    window.showToast(
      "¡Excelente elección!",
      `Te prepararemos tu ${nombre} con mucho cariño cuando pases por la barra.`,
      "success"
    );
  }
}

window.initCatalog = initCatalog;
window.pedirBebida = pedirBebida;
