// products.js - interactive features for products.html
// Search, sort, accordion sections, image lightbox and scroll animations.

(function () {
    "use strict";

    var grid = document.querySelector(".products-grid");
    if (!grid) return;

    var sections = Array.prototype.slice.call(grid.querySelectorAll(".product-series"));

    // ---------- Remember original row order (for "Default order") ----------
    var allRows = [];
    sections.forEach(function (section) {
        var rows = Array.prototype.slice.call(section.querySelectorAll("table tr")).filter(function (row) {
            return row.querySelector("td");
        });
        rows.forEach(function (row, i) {
            row.dataset.index = i;
            allRows.push(row);
        });
    });

    // ---------- 1. Build the search / sort controls (DOM manipulation) ----------
    var bar = document.createElement("div");
    bar.className = "product-controls";

    var searchWrap = document.createElement("div");
    var searchLabel = document.createElement("label");
    searchLabel.setAttribute("for", "productSearch");
    searchLabel.textContent = "Search models";
    var searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.id = "productSearch";
    searchInput.placeholder = "e.g. iPhone 13 Pro";
    searchWrap.appendChild(searchLabel);
    searchWrap.appendChild(searchInput);

    var sortWrap = document.createElement("div");
    var sortLabel = document.createElement("label");
    sortLabel.setAttribute("for", "sortSelect");
    sortLabel.textContent = "Sort by price";
    var sortSelect = document.createElement("select");
    sortSelect.id = "sortSelect";
    [["default", "Default order"], ["low", "Lowest first"], ["high", "Highest first"]].forEach(function (opt) {
        var o = document.createElement("option");
        o.value = opt[0];
        o.textContent = opt[1];
        sortSelect.appendChild(o);
    });
    sortWrap.appendChild(sortLabel);
    sortWrap.appendChild(sortSelect);

    var toggleAll = document.createElement("button");
    toggleAll.type = "button";
    toggleAll.className = "toggle-all";
    toggleAll.textContent = "Collapse all";

    bar.appendChild(searchWrap);
    bar.appendChild(sortWrap);
    bar.appendChild(toggleAll);

    var resultCount = document.createElement("p");
    resultCount.className = "result-count";
    resultCount.setAttribute("aria-live", "polite");

    var noResults = document.createElement("p");
    noResults.className = "no-results";
    noResults.textContent = "No models match your search. Try a different name, or message us on WhatsApp.";
    noResults.hidden = true;

    grid.parentNode.insertBefore(bar, grid);
    grid.parentNode.insertBefore(resultCount, grid);
    grid.parentNode.insertBefore(noResults, grid);

    // ---------- 2. Filter and sort ----------
    function getPrice(row) {
        var cell = row.querySelector("td[data-label='Price']");
        var n = cell ? parseInt(cell.textContent.replace(/\D/g, ""), 10) : NaN;
        return isNaN(n) ? Infinity : n;
    }

    function sortRows() {
        var mode = sortSelect.value;
        sections.forEach(function (section) {
            var table = section.querySelector("table");
            if (!table) return;
            var body = table.tBodies[0];
            var rows = Array.prototype.slice.call(body.querySelectorAll("tr")).filter(function (row) {
                return row.querySelector("td");
            });
            rows.sort(function (a, b) {
                if (mode === "low") return getPrice(a) - getPrice(b);
                if (mode === "high") return getPrice(b) - getPrice(a);
                return a.dataset.index - b.dataset.index;
            });
            rows.forEach(function (row) { body.appendChild(row); });
        });
    }

    function applyFilter() {
        var query = searchInput.value.trim().toLowerCase();
        var shown = 0;

        sections.forEach(function (section) {
            var title = section.querySelector("h3").textContent.toLowerCase();
            var rows = Array.prototype.slice.call(section.querySelectorAll("table tr")).filter(function (row) {
                return row.querySelector("td");
            });
            var visible = 0;

            rows.forEach(function (row) {
                var match = query === "" || row.textContent.toLowerCase().indexOf(query) !== -1 || title.indexOf(query) !== -1;
                row.hidden = !match;
                if (match) visible++;
            });

            section.hidden = visible === 0;
            if (query !== "" && visible > 0) setCollapsed(section, false); // open matching sections
            shown += visible;
        });

        resultCount.textContent = "Showing " + shown + " of " + allRows.length + " models";
        noResults.hidden = shown !== 0;
    }

    searchInput.addEventListener("input", applyFilter);
    sortSelect.addEventListener("change", sortRows);

    // ---------- 3. Accordion sections ----------
    function setCollapsed(section, collapsed) {
        section.classList.toggle("collapsed", collapsed);
        var title = section.querySelector("h3");
        title.setAttribute("aria-expanded", collapsed ? "false" : "true");
    }

    sections.forEach(function (section) {
        var title = section.querySelector("h3");
        title.classList.add("accordion-title");
        title.setAttribute("role", "button");
        title.setAttribute("tabindex", "0");
        title.setAttribute("aria-expanded", "true");

        function toggle() { setCollapsed(section, !section.classList.contains("collapsed")); }
        title.addEventListener("click", toggle);
        title.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        });
    });

    toggleAll.addEventListener("click", function () {
        var collapse = toggleAll.textContent === "Collapse all";
        sections.forEach(function (section) { setCollapsed(section, collapse); });
        toggleAll.textContent = collapse ? "Expand all" : "Collapse all";
    });

    // ---------- 4. Lightbox gallery ----------
    var overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Enlarged image");
    overlay.hidden = true;

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "lightbox-close";
    closeBtn.setAttribute("aria-label", "Close image");
    closeBtn.textContent = "\u00D7";

    var bigImg = document.createElement("img");
    var caption = document.createElement("p");

    overlay.appendChild(closeBtn);
    overlay.appendChild(bigImg);
    overlay.appendChild(caption);
    document.body.appendChild(overlay);

    var lastFocused = null;

    function openLightbox(img) {
        lastFocused = img;
        bigImg.src = img.getAttribute("src");
        bigImg.alt = img.alt;
        caption.textContent = img.alt;
        overlay.hidden = false;
        document.body.classList.add("no-scroll");
        closeBtn.focus();
    }

    function closeLightbox() {
        overlay.hidden = true;
        bigImg.src = "";
        document.body.classList.remove("no-scroll");
        if (lastFocused) lastFocused.focus();
    }

    Array.prototype.slice.call(document.querySelectorAll(".product-photo, .price-list-image")).forEach(function (img) {
        img.classList.add("zoomable");
        img.setAttribute("tabindex", "0");
        img.addEventListener("click", function () { openLightbox(img); });
        img.addEventListener("keydown", function (e) {
            if (e.key === "Enter") openLightbox(img);
        });
    });

    overlay.addEventListener("click", function (e) {
        if (e.target !== bigImg) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !overlay.hidden) closeLightbox();
    });

    // ---------- 5. Fade-in animation as sections scroll into view ----------
    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(function (section) {
            section.classList.add("fade-in");
            observer.observe(section);
        });
    }

    applyFilter(); // sets the initial "Showing X of Y models" text
})();