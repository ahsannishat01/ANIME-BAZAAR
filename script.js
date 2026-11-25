/* ==========================================================================
   ANIME BAZAAR — Interactive Marketplace Logic (Vanilla JS, Demo Only)
   ========================================================================== */

(() => {
  "use strict";

  const WISHLIST_STORAGE_KEY = "anime_bazaar_wishlist_v1";

  // Theme accents used to generate guaranteed-working SVG collector cards
  const SERIES_THEMES = {
    "Naruto": { primary: "#E53935", secondary: "#FB8C00", emblem: "忍" },
    "One Piece": { primary: "#E53935", secondary: "#FDD835", emblem: "海" },
    "Dragon Ball": { primary: "#FB8C00", secondary: "#E53935", emblem: "龍" },
    "Demon Slayer": { primary: "#E53935", secondary: "#26A69A", emblem: "滅" },
    "Jujutsu Kaisen": { primary: "#E53935", secondary: "#7E57C2", emblem: "呪" },
    "Others": { primary: "#E53935", secondary: "#42A5F5", emblem: "魂" }
  };

  function createFigureArtwork({ title, category, scale, code }) {
    const theme = SERIES_THEMES[category] || SERIES_THEMES["Others"];
    const safeTitle = title.replace(/[<>&'"]/g, "").slice(0, 26);
    const safeCat = category.replace(/[<>&'"]/g, "").toUpperCase();
    const safeScale = (scale || "1/7 SCALE").replace(/[<>&'"]/g, "");
    const safeCode = (code || "AB-DEMO").replace(/[<>&'"]/g, "");

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#171720"/>
            <stop offset="100%" stop-color="#0D0D12"/>
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="44%" r="48%">
            <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.34"/>
            <stop offset="65%" stop-color="${theme.secondary}" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#0D0D12" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="640" height="480" fill="url(#bg)"/>
        <rect width="640" height="480" fill="url(#glow)"/>
        <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
          <line x1="0" y1="120" x2="640" y2="120"/>
          <line x1="0" y1="360" x2="640" y2="360"/>
          <line x1="160" y1="0" x2="160" y2="480"/>
          <line x1="480" y1="0" x2="480" y2="480"/>
        </g>
        <circle cx="320" cy="215" r="118" fill="none" stroke="${theme.primary}" stroke-opacity="0.4" stroke-width="2" stroke-dasharray="10 8"/>
        <circle cx="320" cy="215" r="88" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
        <text x="320" y="242" text-anchor="middle" font-family="sans-serif" font-size="92" font-weight="700" fill="${theme.primary}" fill-opacity="0.9">${theme.emblem}</text>
        <rect x="210" y="346" width="220" height="12" rx="6" fill="#23232E"/>
        <rect x="255" y="350" width="130" height="4" rx="2" fill="${theme.primary}"/>
        <text x="32" y="46" font-family="monospace" font-size="16" font-weight="700" fill="rgba(255,255,255,0.55)" letter-spacing="2">${safeCat} // ${safeCode}</text>
        <text x="608" y="46" text-anchor="end" font-family="monospace" font-size="15" font-weight="700" fill="${theme.primary}">${safeScale}</text>
        <text x="320" y="425" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="700" fill="#F8FAFC">${safeTitle}</text>
        <text x="320" y="452" text-anchor="middle" font-family="monospace" font-size="13" fill="rgba(255,255,255,0.45)">DEMO COLLECTIBLE ARTWORK</text>
      </svg>
    `.trim();

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  // 14 Curated Sample Demo Listings
  const initialProducts = [
    {
      id: "ab-01",
      title: "Naruto Uzumaki Sage Mode Ver.",
      category: "Naruto",
      studio: "MegaHouse G.E.M. Series",
      price: 11800,
      condition: "Mint / Sealed",
      scale: "1/8 Scale",
      height: "210 mm",
      material: "PVC & ABS",
      code: "NR-01",
      description: "Demo listing showcasing a classic Sage Mode cloak sculpt with dynamic scroll base and interchangeable expression.",
      featuredRank: 1
    },
    {
      id: "ab-02",
      title: "Itachi Uchiha Susanoo Crimson Edition",
      category: "Naruto",
      studio: "Aniplex / Bandai Spirits",
      price: 16500,
      condition: "Mint / Sealed",
      scale: "1/7 Scale",
      height: "265 mm",
      material: "PVC, Translucent Resin",
      code: "NR-02",
      description: "Demo collector piece featuring translucent red chakra aura effects and layered Akatsuki cloak detailing.",
      featuredRank: 2
    },
    {
      id: "ab-03",
      title: "Monkey D. Luffy Gear 5 Awakening",
      category: "One Piece",
      studio: "Bandai Figuarts ZERO",
      price: 13900,
      condition: "Mint / Sealed",
      scale: "1/7 Scale",
      height: "235 mm",
      material: "PVC & ABS",
      code: "OP-01",
      description: "Demo showcase figure with sculpted cloud rings, pearlescent finish, and high-impact lightning diorama base.",
      featuredRank: 3
    },
    {
      id: "ab-04",
      title: "Roronoa Zoro Three-Sword Onigashima",
      category: "One Piece",
      studio: "Portrait.Of.Pirates (P.O.P)",
      price: 18200,
      condition: "Opened / Like New",
      scale: "1/8 Scale",
      height: "250 mm",
      material: "Painted PVC",
      code: "OP-02",
      description: "Demo listing highlighting metallic katana blades, wind-swept haori coat, and collector box included.",
      featuredRank: 4
    },
    {
      id: "ab-05",
      title: "Son Goku Ultra Instinct Sign",
      category: "Dragon Ball",
      studio: "Tamashii Nations S.H.Figuarts",
      price: 8900,
      condition: "Mint / Sealed",
      scale: "1/12 Articulated",
      height: "155 mm",
      material: "ABS & PVC",
      code: "DB-01",
      description: "Demo articulated action figure with multiple battle-damaged faceplates and energy effect accessories.",
      featuredRank: 5
    },
    {
      id: "ab-06",
      title: "Vegeta Final Flash Masterlise",
      category: "Dragon Ball",
      studio: "Ichibansho Bandai Spirits",
      price: 9600,
      condition: "Mint / Sealed",
      scale: "Non-Scale (24 cm)",
      height: "240 mm",
      material: "PVC",
      code: "DB-02",
      description: "Demo prize-grade statue with crisp Saiyan armor shading and high-contrast hair sculpt.",
      featuredRank: 6
    },
    {
      id: "ab-07",
      title: "Tanjiro Kamado Hinokami Kagura",
      category: "Demon Slayer",
      studio: "Aniplex+ Deluxe",
      price: 15400,
      condition: "Mint / Sealed",
      scale: "1/8 Scale",
      height: "245 mm",
      material: "PVC & ABS",
      code: "DS-01",
      description: "Demo listing featuring swirling Sun Breathing flame ribbons and hand-painted Nichirin blade accents.",
      featuredRank: 7
    },
    {
      id: "ab-08",
      title: "Kyojuro Rengoku Flame Hashira",
      category: "Demon Slayer",
      studio: "Kotobukiya ARTFX J",
      price: 12900,
      condition: "Opened / Like New",
      scale: "1/8 Scale",
      height: "225 mm",
      material: "PVC",
      code: "DS-02",
      description: "Demo statue capturing Rengoku's iconic stance with sculpted cape gradient and stone base.",
      featuredRank: 8
    },
    {
      id: "ab-09",
      title: "Satoru Gojo Hollow Purple Ver.",
      category: "Jujutsu Kaisen",
      studio: "eStream Shibuya Scramble",
      price: 21500,
      condition: "Mint / Sealed",
      scale: "1/7 Scale",
      height: "280 mm",
      material: "PVC & Clear Resin",
      code: "JK-01",
      description: "Demo centerpiece statue featuring floating debris diorama and dual unmasked/blindfolded head sculpts.",
      featuredRank: 9
    },
    {
      id: "ab-10",
      title: "Ryomen Sukuna Malevolent Shrine",
      category: "Jujutsu Kaisen",
      studio: "F:NEX FuRyu",
      price: 17800,
      condition: "Mint / Sealed",
      scale: "1/7 Scale",
      height: "255 mm",
      material: "PVC & ABS",
      code: "JK-02",
      description: "Demo listing showcasing seated throne sculpt with crimson cursed-energy base and fine kimono folds.",
      featuredRank: 10
    },
    {
      id: "ab-11",
      title: "Chainsaw Man Denji Blood Edge",
      category: "Others",
      studio: "Good Smile Company",
      price: 14200,
      condition: "Mint / Sealed",
      scale: "1/7 Scale",
      height: "240 mm",
      material: "Painted Plastic",
      code: "OT-01",
      description: "Demo showcase figure with metallic chainsaw teeth, dynamic debris stand, and matte finish.",
      featuredRank: 11
    },
    {
      id: "ab-12",
      title: "Levi Ackerman Survey Corps Cloak",
      category: "Others",
      studio: "Kotobukiya Renewal Ver.",
      price: 11400,
      condition: "Displayed / No Box",
      scale: "1/8 Scale",
      height: "215 mm",
      material: "PVC & ABS",
      code: "OT-02",
      description: "Demo listing featuring omni-directional mobility gear and dual ultra-hard steel blades.",
      featuredRank: 12
    },
    {
      id: "ab-13",
      title: "Nezuko Kamado Demon Form Ver.",
      category: "Demon Slayer",
      studio: "Bandai Figuarts ZERO",
      price: 9200,
      condition: "Mint / Sealed",
      scale: "1/8 Scale",
      height: "200 mm",
      material: "PVC",
      code: "DS-03",
      description: "Demo listing with Blood Demon Art flame effects and compact collector footprint.",
      featuredRank: 13
    },
    {
      id: "ab-14",
      title: "Portgas D. Ace Fire Fist Memorial",
      category: "One Piece",
      studio: "Banpresto Grandista",
      price: 6800,
      condition: "Opened / Like New",
      scale: "Non-Scale (28 cm)",
      height: "280 mm",
      material: "PVC",
      code: "OP-03",
      description: "Demo entry-tier tall collector statue with translucent flame fist attachment.",
      featuredRank: 14
    }
  ].map((item) => ({
    ...item,
    image: createFigureArtwork(item)
  }));

  // Application State
  const state = {
    products: [...initialProducts],
    searchQuery: "",
    selectedCategory: "All",
    sortBy: "featured",
    savedOnly: false,
    wishlist: loadWishlist(),
    activeModalId: null
  };

  // DOM References
  const els = {
    productGrid: document.getElementById("product-grid"),
    emptyState: document.getElementById("empty-state"),
    resultsCount: document.getElementById("results-count"),
    searchInput: document.getElementById("search-input"),
    clearSearchBtn: document.getElementById("clear-search-btn"),
    categoryFilters: document.getElementById("category-filters"),
    sortSelect: document.getElementById("sort-select"),
    wishlistFilterBtn: document.getElementById("wishlist-filter-btn"),
    resetFiltersBtn: document.getElementById("reset-filters-btn"),

    wishlistToggleBtn: document.getElementById("wishlist-toggle-btn"),
    wishlistCount: document.getElementById("wishlist-count"),
    mobileWishlistBtn: document.getElementById("mobile-wishlist-btn"),
    mobileWishlistCount: document.getElementById("mobile-wishlist-count"),

    mobileMenuBtn: document.getElementById("mobile-menu-btn"),
    mobileNav: document.getElementById("mobile-nav"),

    productModal: document.getElementById("product-modal"),
    modalBackdrop: document.getElementById("modal-backdrop"),
    modalCloseBtn: document.getElementById("modal-close-btn"),
    modalImg: document.getElementById("modal-img"),
    modalCategory: document.getElementById("modal-category"),
    modalCondition: document.getElementById("modal-condition"),
    modalTitle: document.getElementById("modal-title"),
    modalStudio: document.getElementById("modal-studio"),
    modalPrice: document.getElementById("modal-price"),
    modalScale: document.getElementById("modal-scale"),
    modalDescription: document.getElementById("modal-description"),
    modalSpecs: document.getElementById("modal-specs"),
    modalWishlistBtn: document.getElementById("modal-wishlist-btn"),
    modalDemoBtn: document.getElementById("modal-demo-btn"),

    wishlistDrawer: document.getElementById("wishlist-drawer"),
    drawerBackdrop: document.getElementById("drawer-backdrop"),
    drawerCloseBtn: document.getElementById("drawer-close-btn"),
    wishlistItems: document.getElementById("wishlist-items"),
    wishlistTotal: document.getElementById("wishlist-total"),
    clearWishlistBtn: document.getElementById("clear-wishlist-btn"),

    sellForm: document.getElementById("sell-form"),
    sellTitle: document.getElementById("sell-title"),
    sellCategory: document.getElementById("sell-category"),
    sellPrice: document.getElementById("sell-price"),
    sellCondition: document.getElementById("sell-condition"),
    sellStudio: document.getElementById("sell-studio"),
    sellNotes: document.getElementById("sell-notes"),

    toastContainer: document.getElementById("toast-container")
  };

  // Utilities
  function formatBDT(amount) {
    return `৳${Number(amount).toLocaleString("en-BD")}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function loadWishlist() {
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveWishlist() {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.wishlist));
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }

  function isWishlisted(productId) {
    return state.wishlist.includes(productId);
  }

  function showToast(message, type = "info") {
    if (!els.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    els.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  // Filtering & Sorting
  function getFilteredProducts() {
    const query = state.searchQuery.trim().toLowerCase();

    const filtered = state.products.filter((item) => {
      const matchesCategory =
        state.selectedCategory === "All" || item.category === state.selectedCategory;

      const matchesWishlist = !state.savedOnly || isWishlisted(item.id);

      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.studio.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesWishlist && matchesQuery;
    });

    const sorted = [...filtered];
    switch (state.sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "featured":
      default:
        sorted.sort((a, b) => a.featuredRank - b.featuredRank);
        break;
    }

    return sorted;
  }

  // Render Catalog Grid
  function renderProducts() {
    const items = getFilteredProducts();

    if (els.resultsCount) {
      els.resultsCount.textContent = `Showing ${items.length} demo ${items.length === 1 ? "item" : "items"}`;
    }

    if (items.length === 0) {
      els.productGrid.innerHTML = "";
      els.emptyState.hidden = false;
      return;
    }

    els.emptyState.hidden = true;
    els.productGrid.innerHTML = items
      .map((item) => {
        const saved = isWishlisted(item.id);
        return `
          <article class="product-card" data-id="${escapeHtml(item.id)}">
            <div class="product-card__media">
              <img
                class="product-card__img"
                src="${item.image}"
                alt="${escapeHtml(item.title)} — Demo listing"
                loading="lazy"
              />
              <div class="product-card__badges">
                <span class="tag tag-accent">${escapeHtml(item.category)}</span>
                <span class="tag tag-muted">DEMO</span>
              </div>
              <button
                type="button"
                class="product-card__wish ${saved ? "is-saved" : ""}"
                data-action="toggle-wish"
                data-id="${escapeHtml(item.id)}"
                aria-label="${saved ? "Remove from wishlist" : "Add to wishlist"}"
                aria-pressed="${saved}"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="${saved ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            <div class="product-card__body">
              <div class="product-card__meta">
                <span>${escapeHtml(item.scale)}</span>
                <span>${escapeHtml(item.condition)}</span>
              </div>
              <h3 class="product-card__title">${escapeHtml(item.title)}</h3>
              <p class="product-card__studio">${escapeHtml(item.studio)}</p>

              <div class="product-card__footer">
                <span class="product-card__price">${formatBDT(item.price)}</span>
                <div class="product-card__actions">
                  <button
                    type="button"
                    class="btn btn-outline btn-sm"
                    data-action="view-details"
                    data-id="${escapeHtml(item.id)}"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  // Wishlist Operations & Drawer Rendering
  function updateWishlistUI() {
    // Keep only IDs that still exist in products
    const validIds = new Set(state.products.map((p) => p.id));
    state.wishlist = state.wishlist.filter((id) => validIds.has(id));
    saveWishlist();

    const count = state.wishlist.length;
    if (els.wishlistCount) els.wishlistCount.textContent = String(count);
    if (els.mobileWishlistCount) els.mobileWishlistCount.textContent = String(count);

    renderWishlistDrawer();

    if (state.activeModalId) {
      updateModalWishlistButton(state.activeModalId);
    }
  }

  function toggleWishlist(productId) {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;

    if (isWishlisted(productId)) {
      state.wishlist = state.wishlist.filter((id) => id !== productId);
      showToast(`Removed "${product.title}" from wishlist.`, "info");
    } else {
      state.wishlist = [...state.wishlist, productId];
      showToast(`Saved "${product.title}" to wishlist.`, "success");
    }

    updateWishlistUI();
    renderProducts();
  }

  function renderWishlistDrawer() {
    if (!els.wishlistItems || !els.wishlistTotal) return;

    const savedProducts = state.wishlist
      .map((id) => state.products.find((p) => p.id === id))
      .filter(Boolean);

    if (savedProducts.length === 0) {
      els.wishlistItems.innerHTML = `
        <div class="drawer-empty">
          <p>Your wishlist is empty.</p>
          <p>Tap the heart icon on any demo figure to save it locally in your browser.</p>
        </div>
      `;
      els.wishlistTotal.textContent = "৳0";
      return;
    }

    const total = savedProducts.reduce((sum, item) => sum + item.price, 0);
    els.wishlistTotal.textContent = formatBDT(total);

    els.wishlistItems.innerHTML = savedProducts
      .map(
        (item) => `
        <div class="wishlist-item">
          <img class="wishlist-item__img" src="${item.image}" alt="${escapeHtml(item.title)}" />
          <div class="wishlist-item__info">
            <h4>${escapeHtml(item.title)}</h4>
            <span>${formatBDT(item.price)}</span>
          </div>
          <button
            type="button"
            class="wishlist-item__remove"
            data-action="remove-wish"
            data-id="${escapeHtml(item.id)}"
            aria-label="Remove ${escapeHtml(item.title)} from wishlist"
          >
            &times;
          </button>
        </div>
      `
      )
      .join("");
  }

  // Modal Controls
  function updateModalWishlistButton(productId) {
    if (!els.modalWishlistBtn) return;
    const saved = isWishlisted(productId);
    els.modalWishlistBtn.textContent = saved ? "Saved in Wishlist" : "Add to Wishlist";
    els.modalWishlistBtn.classList.toggle("btn-secondary", saved);
    els.modalWishlistBtn.classList.toggle("btn-primary", !saved);
  }

  function openProductModal(productId) {
    const product = state.products.find((p) => p.id === productId);
    if (!product || !els.productModal) return;

    state.activeModalId = productId;
    els.modalImg.src = product.image;
    els.modalImg.alt = `${product.title} — Demo listing`;
    els.modalCategory.textContent = product.category;
    els.modalCondition.textContent = product.condition;
    els.modalTitle.textContent = product.title;
    els.modalStudio.textContent = `Studio: ${product.studio}`;
    els.modalPrice.textContent = formatBDT(product.price);
    els.modalScale.textContent = product.scale;
    els.modalDescription.textContent = product.description;

    els.modalSpecs.innerHTML = `
      <div><dt>Series</dt><dd>${escapeHtml(product.category)}</dd></div>
      <div><dt>Scale / Line</dt><dd>${escapeHtml(product.scale)}</dd></div>
      <div><dt>Height</dt><dd>${escapeHtml(product.height || "Approx. 220 mm")}</dd></div>
      <div><dt>Material</dt><dd>${escapeHtml(product.material || "PVC & ABS")}</dd></div>
    `;

    updateModalWishlistButton(productId);
    els.productModal.hidden = false;
    document.body.classList.add("no-scroll");
    els.modalCloseBtn.focus();
  }

  function closeProductModal() {
    if (!els.productModal || els.productModal.hidden) return;
    els.productModal.hidden = true;
    state.activeModalId = null;
    if (els.wishlistDrawer.hidden) {
      document.body.classList.remove("no-scroll");
    }
  }

  // Drawer Controls
  function openWishlistDrawer() {
    if (!els.wishlistDrawer) return;
    renderWishlistDrawer();
    els.wishlistDrawer.hidden = false;
    els.wishlistToggleBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    els.drawerCloseBtn.focus();
  }

  function closeWishlistDrawer() {
    if (!els.wishlistDrawer || els.wishlistDrawer.hidden) return;
    els.wishlistDrawer.hidden = true;
    els.wishlistToggleBtn.setAttribute("aria-expanded", "false");
    if (els.productModal.hidden) {
      document.body.classList.remove("no-scroll");
    }
  }

  // Mobile Nav Controls
  function toggleMobileNav(forceClose = false) {
    if (!els.mobileNav || !els.mobileMenuBtn) return;
    const shouldOpen = forceClose ? false : els.mobileNav.hidden;
    els.mobileNav.hidden = !shouldOpen;
    els.mobileMenuBtn.setAttribute("aria-expanded", String(shouldOpen));
  }

  // Reset Filters
  function resetAllFilters() {
    state.searchQuery = "";
    state.selectedCategory = "All";
    state.sortBy = "featured";
    state.savedOnly = false;

    els.searchInput.value = "";
    els.clearSearchBtn.hidden = true;
    els.sortSelect.value = "featured";
    els.wishlistFilterBtn.setAttribute("aria-pressed", "false");

    const pills = els.categoryFilters.querySelectorAll(".pill-btn");
    pills.forEach((btn) => {
      const isAll = btn.dataset.category === "All";
      btn.classList.toggle("active", isAll);
      btn.setAttribute("aria-pressed", String(isAll));
    });

    renderProducts();
  }

  // Event Listeners
  function bindEvents() {
    // Live Search
    els.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      els.clearSearchBtn.hidden = state.searchQuery.length === 0;
      renderProducts();
    });

    els.clearSearchBtn.addEventListener("click", () => {
      state.searchQuery = "";
      els.searchInput.value = "";
      els.clearSearchBtn.hidden = true;
      els.searchInput.focus();
      renderProducts();
    });

    // Category Pills
    els.categoryFilters.addEventListener("click", (e) => {
      const btn = e.target.closest(".pill-btn");
      if (!btn) return;
      const category = btn.dataset.category || "All";
      state.selectedCategory = category;

      els.categoryFilters.querySelectorAll(".pill-btn").forEach((pill) => {
        const active = pill === btn;
        pill.classList.toggle("active", active);
        pill.setAttribute("aria-pressed", String(active));
      });

      renderProducts();
    });

    // Sort Select
    els.sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });

    // Saved-Only Filter
    els.wishlistFilterBtn.addEventListener("click", () => {
      state.savedOnly = !state.savedOnly;
      els.wishlistFilterBtn.setAttribute("aria-pressed", String(state.savedOnly));
      renderProducts();
    });

    // Reset Filters
    els.resetFiltersBtn.addEventListener("click", resetAllFilters);

    // Product Grid Delegation
    els.productGrid.addEventListener("click", (e) => {
      const wishBtn = e.target.closest('[data-action="toggle-wish"]');
      if (wishBtn) {
        toggleWishlist(wishBtn.dataset.id);
        return;
      }

      const detailBtn = e.target.closest('[data-action="view-details"]');
      if (detailBtn) {
        openProductModal(detailBtn.dataset.id);
        return;
      }

      const cardMediaOrTitle = e.target.closest(".product-card__media, .product-card__title");
      if (cardMediaOrTitle) {
        const card = cardMediaOrTitle.closest(".product-card");
        if (card) openProductModal(card.dataset.id);
      }
    });

    // Modal Events
    els.modalCloseBtn.addEventListener("click", closeProductModal);
    els.modalBackdrop.addEventListener("click", closeProductModal);

    els.modalWishlistBtn.addEventListener("click", () => {
      if (state.activeModalId) {
        toggleWishlist(state.activeModalId);
      }
    });

    els.modalDemoBtn.addEventListener("click", () => {
      showToast("Demo mode: Reservation is simulated only — no payment or personal data is collected.", "info");
    });

    // Wishlist Drawer Events
    els.wishlistToggleBtn.addEventListener("click", openWishlistDrawer);
    els.drawerCloseBtn.addEventListener("click", closeWishlistDrawer);
    els.drawerBackdrop.addEventListener("click", closeWishlistDrawer);

    els.wishlistItems.addEventListener("click", (e) => {
      const removeBtn = e.target.closest('[data-action="remove-wish"]');
      if (removeBtn) {
        toggleWishlist(removeBtn.dataset.id);
      }
    });

    els.clearWishlistBtn.addEventListener("click", () => {
      if (state.wishlist.length === 0) return;
      state.wishlist = [];
      updateWishlistUI();
      renderProducts();
      showToast("Cleared all saved items from wishlist.", "info");
    });

    // Mobile Navigation Events
    els.mobileMenuBtn.addEventListener("click", () => toggleMobileNav(false));

    els.mobileNav.addEventListener("click", (e) => {
      if (e.target.closest(".mobile-nav__link")) {
        toggleMobileNav(true);
      }
    });

    els.mobileWishlistBtn.addEventListener("click", () => {
      toggleMobileNav(true);
      openWishlistDrawer();
    });

    // Global Escape Key Handler
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeProductModal();
        closeWishlistDrawer();
        toggleMobileNav(true);
      }
    });

    // Demo "Sell Your Figure" Form Submission
    els.sellForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = els.sellTitle.value.trim();
      const category = els.sellCategory.value;
      const price = Number(els.sellPrice.value);
      const condition = els.sellCondition.value;
      const studio = els.sellStudio.value.trim() || "Collector Demo Submission";
      const notes =
        els.sellNotes.value.trim() ||
        "User-submitted demo collectible listing added locally for preview.";

      if (!title || title.length < 3) {
        showToast("Please enter a valid figure title (at least 3 characters).", "info");
        els.sellTitle.focus();
        return;
      }

      if (!Number.isFinite(price) || price < 500 || price > 500000) {
        showToast("Please enter a demo asking price between ৳500 and ৳500,000.", "info");
        els.sellPrice.focus();
        return;
      }

      const newDemoProduct = {
        id: `demo-${Date.now()}`,
        title,
        category,
        studio,
        price: Math.round(price),
        condition,
        scale: "Collector Demo",
        height: "Varies",
        material: "PVC / ABS",
        code: "USER-DEMO",
        description: notes,
        featuredRank: 0
      };
      newDemoProduct.image = createFigureArtwork(newDemoProduct);

      state.products = [newDemoProduct, ...state.products];
      els.sellForm.reset();
      resetAllFilters();
      showToast(`Added "${title}" as a live demo listing in the catalog.`, "success");

      const catalogEl = document.getElementById("catalog");
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Initialize
  bindEvents();
  updateWishlistUI();
  renderProducts();
})();