/* ============================================================
   Remote Wave Centre — front-end
   ============================================================ */
(function () {
  "use strict";

  var C = window.RWC.contact;
  var PAGE_SIZE = 24;

  var all = window.RWC.buildCatalog();

  var state = {
    q: "",
    category: "all",
    brand: "all",
    type: "all",
    sort: "relevance",
    shown: PAGE_SIZE
  };

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------------- Artwork (inline SVG) ---------------- */

  var CAT_ICON = {
    tv: '<path d="M3 4h18a1 1 0 011 1v11a1 1 0 01-1 1h-7v2h3v2H7v-2h3v-2H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v9h16V6H4z"/>',
    ac: '<path d="M3 5h18a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm1 2v4h16V7H4zm2 8h4v3H6v-3zm6 0h4v3h-4v-3zm8 2h-2v2h2v-2z"/>',
    soundbar: '<path d="M2 9h20a1 1 0 011 1v4a1 1 0 01-1 1H2a1 1 0 01-1-1v-4a1 1 0 011-1zm1 2v2h18v-2H3zm2 4h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2z"/>',
    dstv: '<path d="M4 6h16a1 1 0 011 1v9a1 1 0 01-1 1h-6v2h3v2H7v-2h3v-2H4a1 1 0 01-1-1V7a1 1 0 011-1zm1 2v7h14V8H5zm3 2h2v3H8v-3zm4 0h2v3h-2v-3zm4 0h2v3h-2v-3z"/>',
    projector: '<path d="M2 7h20a1 1 0 011 1v8a1 1 0 01-1 1h-9v2h2v2H9v-2h2v-2H2a1 1 0 01-1-1V8a1 1 0 011-1zm1 2v6h9V9H3zm12 0v6h6V9h-6zm3 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>',
    cctv: '<path d="M3 6l14-3 1 4-14 3-1-4zm12 4l6 2-1 3-7-2-2 5H9l2-6 4-2zM6 15h3a2 2 0 010 4H6v-4z"/>',
    fan: '<path d="M12 10a2 2 0 110 4 2 2 0 010-4zm0-8c2 0 3 2 2 4-.7 1.4-2 2-2 2s-1.3-.6-2-2c-1-2 0-4 2-4zM4 14c0-2 2-3 4-2 1.4.7 2 2 2 2s-.6 1.3-2 2c-2 1-4 0-4-2zm16 0c0 2-2 3-4 2-1.4-.7-2-2-2-2s.6-1.3 2-2c2-1 4 0 4 2z"/>',
    gate: '<path d="M5 3h2v18H5V3zm4 0h2v18H9V3zm6 0l4 3v15h-2v-3h-3v3h-2V5l3-2zm0 4v6h2V9l-2-1.6z"/>',
    music: '<path d="M20 3v12.6a3.4 3.4 0 11-2-3.1V6l-8 2v10.4a3.4 3.4 0 11-2-3.1V6l12-3z"/>',
    universal: '<path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"/>'
  };

  function remoteArt(catId) {
    var icon = CAT_ICON[catId] || CAT_ICON.universal;
    return '<svg viewBox="0 0 120 168" aria-hidden="true">' +
      '<defs><linearGradient id="b' + catId + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#0f3c47"/><stop offset="1" stop-color="#07222a"/></linearGradient>' +
      '<linearGradient id="s' + catId + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#14b8a6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>' +
      '<rect x="18" y="4" width="84" height="160" rx="20" fill="url(#b' + catId + ')" stroke="rgba(94,234,212,.3)"/>' +
      '<rect x="30" y="16" width="60" height="30" rx="8" fill="url(#s' + catId + ')" opacity=".9"/>' +
      '<g transform="translate(35,58) scale(2.1)" fill="rgba(94,234,212,.55)">' + icon + '</g>' +
      '<g fill="rgba(94,234,212,.28)">' +
      '<circle cx="42" cy="112" r="9"/><circle cx="60" cy="112" r="9"/><circle cx="78" cy="112" r="9"/>' +
      '<circle cx="42" cy="132" r="9"/><circle cx="60" cy="132" r="9"/><circle cx="78" cy="132" r="9"/></g>' +
      '<rect x="38" y="148" width="44" height="9" rx="4.5" fill="rgba(34,211,238,.45)"/>' +
      '</svg>';
  }

  function coverArt(catId) {
    return '<svg viewBox="0 0 120 168" aria-hidden="true">' +
      '<defs><linearGradient id="cb' + catId + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#0d3540"/><stop offset="1" stop-color="#071f27"/></linearGradient></defs>' +
      '<rect x="14" y="0" width="92" height="168" rx="24" fill="url(#cb' + catId + ')" stroke="rgba(34,211,238,.35)"/>' +
      '<rect x="24" y="10" width="72" height="148" rx="18" fill="none" stroke="rgba(94,234,212,.28)" stroke-dasharray="5 5"/>' +
      '<rect x="34" y="22" width="52" height="26" rx="7" fill="rgba(94,234,212,.16)"/>' +
      '<circle cx="60" cy="78" r="17" fill="none" stroke="#5eead4" stroke-width="5" opacity=".8"/>' +
      '<circle cx="60" cy="78" r="6" fill="#5eead4" opacity=".8"/>' +
      '<g fill="rgba(34,211,238,.35)">' +
      '<rect x="36" y="108" width="20" height="16" rx="5"/><rect x="64" y="108" width="20" height="16" rx="5"/>' +
      '<rect x="36" y="132" width="20" height="16" rx="5"/><rect x="64" y="132" width="20" height="16" rx="5"/></g>' +
      '</svg>';
  }

  /* ---------------- Price rendering (leave room for real prices) ---------------- */

  function priceHtml(p) {
    if (p.price != null && p.price !== "") {
      var val;
      if (typeof p.price === "number") {
        val = C.currency + " " + p.price.toLocaleString(undefined,
          p.price % 1 === 0 ? { maximumFractionDigits: 0 }
                            : { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else {
        val = String(p.price);
      }
      return '<div class="price"><span class="p-val">' + esc(val) + '</span>' +
        '<span class="p-note">incl. VAT</span></div>';
    }
    return '<div class="price"><span class="p-val">Price on request</span>' +
      '<span class="p-note">Call ' + esc(C.phoneDisplay) + '</span></div>';
  }

  /* ---------------- Header / stats / nav ---------------- */

  function initStats() {
    var remotes = all.filter(function (p) { return p.type === "remote"; }).length;
    var covers = all.filter(function (p) { return p.type === "cover"; }).length;
    $("statRemotes").textContent = remotes.toLocaleString();
    $("statCovers").textContent = covers.toLocaleString();
    $("statCats").textContent = window.RWC.categories.length;
    $("year").textContent = new Date().getFullYear();
  }

  function initNav() {
    var t = $("navToggle"), n = $("nav");
    t.addEventListener("click", function () {
      var open = n.classList.toggle("open");
      t.setAttribute("aria-expanded", open ? "true" : "false");
    });
    n.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { n.classList.remove("open"); t.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------------- Categories ---------------- */

  function initCategories() {
    var grid = $("catGrid");
    var chips = $("heroChips");
    grid.innerHTML = "";
    chips.innerHTML = "";

    window.RWC.categories.forEach(function (cat, i) {
      var count = all.filter(function (p) { return p.categoryId === cat.id; }).length;
      var brands = Object.keys(cat.brands).length;
      var btn = document.createElement("button");
      btn.className = "cat-card";
      btn.type = "button";
      btn.innerHTML =
        '<span class="cc-icon"><svg viewBox="0 0 24 24" aria-hidden="true">' +
        (CAT_ICON[cat.id] || CAT_ICON.universal) + '</svg></span>' +
        '<h3>' + esc(cat.name) + '</h3>' +
        '<p>' + esc(cat.blurb) + '</p>' +
        '<span class="cc-count">' + brands + ' brands · ' + count + ' items</span>';
      btn.addEventListener("click", function () { jumpToCategory(cat.id); });
      grid.appendChild(btn);

      if (i < 6) {
        var chip = document.createElement("button");
        chip.className = "chip";
        chip.type = "button";
        chip.textContent = cat.name;
        chip.addEventListener("click", function () { jumpToCategory(cat.id); });
        chips.appendChild(chip);
      }
    });
  }

  function jumpToCategory(id) {
    state.category = id;
    state.type = "all";
    state.q = "";
    state.shown = PAGE_SIZE;
    $("query").value = "";
    $("filterCategory").value = id;
    setSeg("all");
    render();
    document.getElementById("catalogue").scrollIntoView({ behavior: "smooth" });
  }

  /* ---------------- Covers ---------------- */

  var SWATCH = {
    silicone: "linear-gradient(135deg,#14b8a6,#0d9488)",
    tpu: "linear-gradient(135deg,#5eead4,#22d3ee)",
    shock: "linear-gradient(135deg,#0f766e,#155e75)",
    glow: "linear-gradient(135deg,#a7f3d0,#22d3ee)",
    waterproof: "linear-gradient(135deg,#0891b2,#0e7490)",
    cradle: "linear-gradient(135deg,#134e4a,#0f3c47)"
  };

  function initCovers() {
    var grid = $("coverGrid");
    grid.innerHTML = "";
    window.RWC.coverTypes.forEach(function (cv) {
      var count = all.filter(function (p) { return p.type === "cover" && p.name.indexOf(cv.name) !== -1; }).length;
      var el = document.createElement("article");
      el.className = "cover-card";
      el.innerHTML =
        '<div class="cv-swatch" style="background:' + (SWATCH[cv.id] || SWATCH.silicone) + '"></div>' +
        '<h3>' + esc(cv.name) + '</h3>' +
        '<p>' + esc(cv.blurb) + ' · ' + count + ' options</p>' +
        '<button class="btn btn-ghost" type="button">Enquire</button>';
      el.querySelector("button").addEventListener("click", function () {
        openModal({ name: cv.name + " cover", category: "Cover range", code: "Cover · " + cv.blurb });
      });
      grid.appendChild(el);
    });
  }

  /* ---------------- Filters ---------------- */

  function initFilters() {
    var catSel = $("filterCategory");
    catSel.innerHTML = '<option value="all">All categories</option>';
    window.RWC.categories.forEach(function (c) {
      catSel.innerHTML += '<option value="' + c.id + '">' + esc(c.name) + '</option>';
    });

    var brands = [];
    var seen = {};
    all.forEach(function (p) {
      if (!seen[p.brand]) { seen[p.brand] = true; brands.push(p.brand); }
    });
    brands.sort(function (a, b) { return a.localeCompare(b); });
    var brandSel = $("filterBrand");
    brandSel.innerHTML = '<option value="all">All brands</option>';
    brands.forEach(function (b) {
      brandSel.innerHTML += '<option value="' + esc(b) + '">' + esc(b) + '</option>';
    });

    catSel.addEventListener("change", function () { state.category = this.value; state.shown = PAGE_SIZE; render(); });
    brandSel.addEventListener("change", function () { state.brand = this.value; state.shown = PAGE_SIZE; render(); });
    $("filterSort").addEventListener("change", function () { state.sort = this.value; state.shown = PAGE_SIZE; render(); });

    var timer;
    $("query").addEventListener("input", function () {
      var v = this.value;
      clearTimeout(timer);
      timer = setTimeout(function () { state.q = v; state.shown = PAGE_SIZE; render(); }, 160);
    });

    document.querySelectorAll(".seg-btn").forEach(function (b) {
      b.addEventListener("click", function () { setSeg(this.dataset.type); render(); });
    });

    $("resetBtn").addEventListener("click", reset);
    $("loadMore").addEventListener("click", function () { state.shown += PAGE_SIZE; render(); });

    var form = $("heroSearch");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      state.q = $("heroQuery").value;
      $("query").value = state.q;
      state.category = "all";
      $("filterCategory").value = "all";
      state.shown = PAGE_SIZE;
      render();
      document.getElementById("catalogue").scrollIntoView({ behavior: "smooth" });
    });
  }

  function setSeg(type) {
    state.type = type;
    document.querySelectorAll(".seg-btn").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.type === type);
    });
  }

  function reset() {
    state = { q: "", category: "all", brand: "all", type: "all", sort: "relevance", shown: PAGE_SIZE };
    $("query").value = "";
    $("heroQuery").value = "";
    $("filterCategory").value = "all";
    $("filterBrand").value = "all";
    $("filterSort").value = "relevance";
    setSeg("all");
    render();
  }

  /* ---------------- Filtering + rendering ---------------- */

  function matches(p) {
    if (state.type !== "all" && p.type !== state.type) return false;
    if (state.category !== "all" && p.categoryId !== state.category) return false;
    if (state.brand !== "all" && p.brand !== state.brand) return false;
    if (state.q) {
      var q = state.q.toLowerCase().trim();
      var hay = (p.name + " " + p.brand + " " + p.category + " " + p.code + " " + p.type).toLowerCase();
      var parts = q.split(/\s+/);
      for (var i = 0; i < parts.length; i++) {
        if (hay.indexOf(parts[i]) === -1) return false;
      }
    }
    return true;
  }

  function sortItems(list) {
    if (state.sort === "az") return list.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    if (state.sort === "za") return list.slice().sort(function (a, b) { return b.name.localeCompare(a.name); });
    if (state.sort === "category") return list.slice().sort(function (a, b) {
      return a.categoryId.localeCompare(b.categoryId) || a.name.localeCompare(b.name);
    });
    return list;
  }

  function artFor(p) {
    /* Drop real photos in via data.js overrides: { image: "assets/photos/x.jpg" } */
    if (p.image) {
      return '<img class="card-img" src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy">';
    }
    return p.type === "cover" ? coverArt(p.categoryId) : remoteArt(p.categoryId);
  }

  function cardHtml(p) {
    return '<article class="card">' +
      '<div class="card-art">' +
      '<span class="card-badge ' + (p.type === "cover" ? "cover" : "") + '">' +
      (p.type === "cover" ? "Cover" : "Remote") + '</span>' +
      artFor(p) +
      '</div>' +
      '<div class="card-body">' +
      '<span class="card-brand">' + esc(p.brand) + '</span>' +
      '<h3 class="card-title">' + esc(p.name) + '</h3>' +
      '<p class="card-blurb">' + esc(p.blurb) + '</p>' +
      '<div class="card-foot">' + priceHtml(p) +
      '<button class="btn btn-solid" type="button" data-id="' + esc(p.id) + '">Enquire</button>' +
      '</div></div></article>';
  }

  var filtered = [];

  function render() {
    filtered = sortItems(all.filter(matches));
    var slice = filtered.slice(0, state.shown);
    var grid = $("grid");

    grid.innerHTML = slice.map(cardHtml).join("");
    $("empty").hidden = filtered.length !== 0;
    $("resultCount").textContent = filtered.length
      ? "Showing " + slice.length + " of " + filtered.length + " items" +
        (state.category !== "all" ? " in " + currentCatName() : "") + "."
      : "No items match your filters.";
    $("loadMore").hidden = filtered.length <= state.shown;
  }

  function currentCatName() {
    var c = window.RWC.categories.filter(function (x) { return x.id === state.category; })[0];
    return c ? c.name : "";
  }

  /* ---------------- Modal ---------------- */

  var modal = $("modal");
  var lastFocus = null;

  function openModal(item) {
    lastFocus = document.activeElement;
    var isItem = item && item.name;
    $("modalItem").hidden = !isItem;
    $("modalItemName").textContent = isItem ? item.name : "";
    $("modalItemMeta").textContent = isItem ? [item.category, item.code].filter(Boolean).join(" · ") : "";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    updateWa();
    var first = modal.querySelector("input");
    if (first) setTimeout(function () { first.focus(); }, 40);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  function buildMessage() {
    var f = $("enquiryForm").elements;
    var name = f.name.value.trim();
    var phone = f.phone.value.trim();
    var msg = f.message.value.trim();
    var itemName = $("modalItemName").textContent;
    var lines = [];
    if (itemName) lines.push("Hi " + C.name + ", I'm interested in: " + itemName + ".");
    else lines.push("Hi " + C.name + ", I'd like to enquire about a remote / cover.");
    if (msg) lines.push(msg);
    if (name) lines.push("Name: " + name);
    if (phone) lines.push("Contact: " + phone);
    return lines.join("\n");
  }

  function updateWa() {
    $("modalWa").href = "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(buildMessage());
  }

  function initModal() {
    document.querySelectorAll("[data-enquire]").forEach(function (b) {
      b.addEventListener("click", function () { openModal(null); });
    });
    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
    $("enquiryForm").addEventListener("input", updateWa);

    $("modalCopy").addEventListener("click", function () {
      var text = buildMessage() + "\nPhone: " + C.phoneDisplay;
      copy(text);
    });
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast("Details copied"); },
        function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast("Details copied"); } catch (e) { toast("Copy failed"); }
    document.body.removeChild(ta);
  }

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------------- Contact form (WhatsApp hand-off) ---------------- */

  function initContactForm() {
    var form = $("contactForm");
    if (!form) return;
    var note = $("cfNote");
    var f = form.elements;

    function clearNote() {
      if (note.textContent) { note.textContent = ""; note.classList.remove("err"); }
    }

    function build() {
      var name = f.name.value.trim();
      var phone = f.phone.value.trim();
      var topic = f.topic.value;
      var details = f.message.value.trim();
      var lines = ["Hi " + C.name + ", I'd like to enquire about: " + topic + "."];
      if (details) lines.push(details);
      if (name) lines.push("Name: " + name);
      if (phone) lines.push("Contact: " + phone);
      return lines.join("\n");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearNote();
      if (!f.name.value.trim()) {
        note.textContent = "Please add your name so we know who to reply to.";
        note.classList.add("err");
        f.name.focus();
        return;
      }
      if (!f.phone.value.trim()) {
        note.textContent = "Please add a contact number.";
        note.classList.add("err");
        f.phone.focus();
        return;
      }
      window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(build()), "_blank", "noopener");
      note.textContent = "Opening WhatsApp — if nothing happened, tap the WhatsApp button on the left.";
      toast("Opening WhatsApp");
    });

    form.addEventListener("input", clearNote);
  }

  /* ---------------- Delegated card buttons ---------------- */

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-id]") : null;
    if (!btn) return;
    var p = all.filter(function (x) { return x.id === btn.dataset.id; })[0];
    if (p) openModal(p);
  });

  /* ---------------- Boot ---------------- */

  initStats();
  initNav();
  initCategories();
  initCovers();
  initFilters();
  initModal();
  initContactForm();
  render();
})();
