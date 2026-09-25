/* =========================================================
   main.js — renders content config, wires up interactions
   ========================================================= */
(function () {
  "use strict";

  var C = window.SITE_CONTENT || {};

  /* ---------- small helpers ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function icon(classes) {
    var i = el("i");
    i.className = classes;
    i.setAttribute("aria-hidden", "true");
    return i;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     1. SCROLL REVEAL
     ========================================================= */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");

    // Stagger cards inside the same grid so they cascade in.
    ["#campaigns-grid", "#testimonials-grid", "#insights-grid", "#stats-list", "#services-list", "#faq-list"]
      .forEach(function (sel) {
        var host = document.querySelector(sel);
        if (!host) return;
        Array.prototype.forEach.call(host.children, function (child, i) {
          child.setAttribute("data-reveal", "");
          child.style.transitionDelay = Math.min(i * 90, 450) + "ms";
        });
      });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(document.querySelectorAll("[data-reveal]"), function (n) {
        n.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(document.querySelectorAll("[data-reveal]"), function (n) {
      io.observe(n);
    });
  }

  /* =========================================================
     2. COUNT-UP COUNTERS
     ========================================================= */
  function countUp(node, target, suffix, decimals) {
    if (reduceMotion) {
      node.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    var duration = 1600, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      node.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else node.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }

  function observeCounters(scope) {
    var values = scope.querySelectorAll("[data-count]");
    if (!values.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(values, function (v) {
        countUp(v, parseFloat(v.dataset.count), v.dataset.suffix || "", 0);
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var v = entry.target;
        countUp(v, parseFloat(v.dataset.count), v.dataset.suffix || "", 0);
        io.unobserve(v);
      });
    }, { threshold: 0.4 });

    Array.prototype.forEach.call(values, function (v) { io.observe(v); });
  }

  /* =========================================================
     3. ACCORDION (shared by Services + FAQ)
     ========================================================= */
  function buildAccordion(host, items, opts) {
    if (!host || !items) return;
    var settings = opts || {};

    items.forEach(function (item, index) {
      var li = el("li", "acc-item");

      var trigger = el("button", "acc-trigger");
      trigger.type = "button";
      trigger.setAttribute("aria-expanded", "false");

      var panelId = settings.idPrefix + "-panel-" + index;
      trigger.setAttribute("aria-controls", panelId);

      var num = index + 1;
      var indexLabel = el("span", "acc-index",
        settings.numbered ? (num < 10 ? "0" + num : String(num)) : String(num));
      indexLabel.setAttribute("aria-hidden", "true");

      var title = settings.richTitle && item.q ? item.q : item.title;
      trigger.appendChild(indexLabel);
      trigger.appendChild(el("span", "acc-title", title));
      trigger.appendChild(el("span", "acc-icon"));

      var panel = el("div", "acc-panel");
      panel.id = panelId;
      panel.setAttribute("role", "region");
      panel.hidden = false;

      var inner = el("div", "acc-panel-inner");
      var paragraphs = item.body || (item.a ? [item.a] : []);
      paragraphs.forEach(function (p) { inner.appendChild(el("p", null, p)); });

      if (item.tags && item.tags.length) {
        var tagRow = el("div", "acc-tags");
        item.tags.forEach(function (t) { tagRow.appendChild(el("span", "acc-tag", t)); });
        inner.appendChild(tagRow);
      }

      panel.appendChild(inner);
      li.appendChild(trigger);
      li.appendChild(panel);
      host.appendChild(li);

      trigger.addEventListener("click", function () {
        var isOpen = trigger.getAttribute("aria-expanded") === "true";
        // close siblings for a clean single-open accordion
        Array.prototype.forEach.call(host.querySelectorAll(".acc-trigger"), function (other) {
          if (other === trigger) return;
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.style.maxHeight = "0px";
        });
        if (isOpen) {
          trigger.setAttribute("aria-expanded", "false");
          panel.style.maxHeight = "0px";
        } else {
          trigger.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });

      // keep an open panel correctly sized if the viewport reflows
      window.addEventListener("resize", function () {
        if (trigger.getAttribute("aria-expanded") === "true") {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* =========================================================
     4. SOCIAL LINK LISTS
     ========================================================= */
  function buildSocials() {
    var socials = C.socials || [];
    [document.getElementById("social-list"), document.getElementById("footer-social")]
      .forEach(function (host) {
        if (!host) return;
        if (!socials.length) { host.hidden = true; return; }
        socials.forEach(function (s) {
          var li = el("li");
          var a = el("a");
          a.href = s.url || "#";
          a.setAttribute("aria-label", s.label || "Social profile");
          a.appendChild(icon(s.icon || "fa-solid fa-link"));
          if (/^https?:/i.test(s.url || "")) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
          }
          li.appendChild(a);
          host.appendChild(li);
        });
      });
  }

  /* =========================================================
     5. STATS
     ========================================================= */
  function buildStats() {
    var host = document.getElementById("stats-list");
    if (!host || !C.stats) return;

    C.stats.forEach(function (s) {
      var li = el("li", "stat-card");
      var value = el("span", "stat-value");

      // value === null/"" means "not filled in yet" → show the [X] token
      // instead of animating up to a misleading zero.
      if (s.value === null || s.value === undefined || s.value === "") {
        value.textContent = (s.placeholder || "[X]") + (s.suffix || "");
      } else {
        value.dataset.count = s.value;
        value.dataset.suffix = s.suffix || "";
        value.textContent = "0" + (s.suffix || "");
      }

      li.appendChild(value);
      li.appendChild(el("span", "stat-label", s.label));
      host.appendChild(li);
    });

    observeCounters(host);
  }

  /* =========================================================
     6. CAMPAIGN CARDS
     ========================================================= */
  function mediaBlock(item, extraClass) {
    var media = el("div", "card-media" + (extraClass ? " " + extraClass : ""));
    if (item.image) {
      var img = el("img");
      img.src = item.image;
      img.alt = item.title ? item.title + " visual" : "";
      img.loading = "lazy";
      media.appendChild(img);
    } else {
      media.classList.add("card-media--placeholder");
      media.setAttribute("role", "img");
      media.setAttribute("aria-label", "Image placeholder");
    }
    return media;
  }

  function buildCampaigns() {
    var host = document.getElementById("campaigns-grid");
    if (!host || !C.campaigns) return;

    C.campaigns.forEach(function (c) {
      var card = el("article", "card card--campaign");
      card.appendChild(mediaBlock(c));

      var body = el("div", "card-body");
      body.appendChild(el("span", "pill", c.category));
      body.appendChild(el("h3", "card-title", c.title));
      body.appendChild(el("p", "card-text", c.text));

      if (c.result) {
        var res = el("p", "card-result");
        res.appendChild(icon("fa-solid fa-arrow-trend-up"));
        res.appendChild(el("span", null, c.result));
        body.appendChild(res);
      }
      card.appendChild(body);
      host.appendChild(card);
    });
  }

  /* =========================================================
     7. TESTIMONIALS (quotes + stat cards)
     ========================================================= */
  function buildTestimonials() {
    var host = document.getElementById("testimonials-grid");
    if (!host || !C.testimonials) return;

    C.testimonials.forEach(function (t) {
      if (t.type === "stat") {
        var stat = el("article", "card stat-card stat-card--feature");
        var value = el("span", "stat-value");
        value.dataset.count = t.value;
        value.dataset.suffix = t.suffix || "";
        value.textContent = "0" + (t.suffix || "");
        stat.appendChild(value);
        stat.appendChild(el("span", "stat-label", t.label));
        host.appendChild(stat);
        return;
      }

      var card = el("article", "card card--testimonial");
      var body = el("div", "card-body");

      var stars = el("div", "stars");
      stars.setAttribute("role", "img");
      stars.setAttribute("aria-label", (t.rating || 5) + " out of 5 stars");
      for (var i = 0; i < (t.rating || 5); i++) {
        stars.appendChild(icon("fa-solid fa-star"));
      }
      body.appendChild(stars);

      body.appendChild(el("blockquote", "quote", t.quote));

      var client = el("div", "client");
      var avatar = el("div", "client-avatar");
      if (t.avatar) {
        var img = el("img");
        img.src = t.avatar;
        img.alt = (t.name || "Client") + " portrait";
        img.loading = "lazy";
        avatar.appendChild(img);
      } else {
        avatar.appendChild(icon("fa-solid fa-user"));
      }
      var meta = el("div");
      meta.appendChild(el("p", "client-name", t.name));
      meta.appendChild(el("p", "client-title", t.title));
      client.appendChild(avatar);
      client.appendChild(meta);

      body.appendChild(client);
      card.appendChild(body);
      host.appendChild(card);
    });

    observeCounters(host);
  }

  /* =========================================================
     8. INSIGHTS
     ========================================================= */
  function buildInsights() {
    var host = document.getElementById("insights-grid");
    if (!host || !C.insights) return;

    C.insights.forEach(function (a) {
      var card = el("article", "card card--insight");

      var media = mediaBlock(a);
      if (a.category) media.appendChild(el("span", "pill", a.category));
      card.appendChild(media);

      var body = el("div", "card-body");
      var meta = el("div", "card-meta");
      meta.appendChild(el("span", null, a.category));
      meta.appendChild(icon("fa-solid fa-circle"));
      meta.appendChild(el("span", null, a.date));
      body.appendChild(meta);
      body.appendChild(el("h3", "card-title", a.title));
      body.appendChild(el("p", "card-text", a.text));

      var link = el("a", "card-link");
      link.href = a.url || "#";
      link.appendChild(el("span", null, "Read article"));
      link.appendChild(icon("fa-solid fa-arrow-right"));
      body.appendChild(link);

      card.appendChild(body);
      host.appendChild(card);
    });
  }

  /* =========================================================
     9. NAV DRAWER
     ========================================================= */
  function initNav() {
    var drawer = document.getElementById("nav-drawer");
    var toggle = document.getElementById("menu-toggle");
    var closeBtn = document.getElementById("menu-close");
    if (!drawer || !toggle) return;

    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      drawer.hidden = false;
      // next frame so the transform transition actually runs
      requestAnimationFrame(function () { drawer.classList.add("is-open"); });
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      drawer.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      setTimeout(function () { drawer.hidden = true; }, 450);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    toggle.addEventListener("click", function () {
      if (drawer.hidden) open(); else close();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);

    Array.prototype.forEach.call(drawer.querySelectorAll("[data-close-nav]"), function (n) {
      n.addEventListener("click", close);
    });

    Array.prototype.forEach.call(drawer.querySelectorAll(".nav-list a"), function (a) {
      a.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !drawer.hidden) close();
      // simple focus trap while the drawer is open
      if (e.key === "Tab" && !drawer.hidden) {
        var focusables = drawer.querySelectorAll("a[href], button");
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* =========================================================
     10. HEADER SCROLL STATE
     ========================================================= */
  function initHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* =========================================================
     11. CONTACT FORM  (RESTful Table API)
     ========================================================= */
  var TABLE = "contact_submissions";

  function buildServiceOptions() {
    var select = document.getElementById("field-service");
    if (!select || !C.serviceOptions) return;
    C.serviceOptions.forEach(function (opt) {
      var o = el("option", null, opt);
      o.value = opt;
      select.appendChild(o);
    });
  }

  function setFieldError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    var existing = wrap.querySelector(".field-error");
    if (message) {
      field.setAttribute("aria-invalid", "true");
      wrap.classList.add("has-error");
      if (!existing) wrap.appendChild(el("p", "field-error", message));
      else existing.textContent = message;
    } else {
      field.removeAttribute("aria-invalid");
      wrap.classList.remove("has-error");
      if (existing) existing.remove();
    }
  }

  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var status = document.getElementById("form-status");
    var submitBtn = document.getElementById("form-submit");
    var emailField = document.getElementById("field-email");

    function message(text, kind) {
      if (!status) return;
      status.textContent = text;
      status.className = "form-status" + (kind ? " is-" + kind : "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("field-name");
      var service = document.getElementById("field-service");
      var body = document.getElementById("field-message");
      var fields = [name, emailField, service, body];
      var ok = true;

      fields.forEach(function (f) { setFieldError(f, null); });

      if (!name.value.trim()) { setFieldError(name, "Please enter your name."); ok = false; }
      if (!emailField.value.trim()) {
        setFieldError(emailField, "Please enter your email."); ok = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailField.value.trim())) {
        setFieldError(emailField, "That email address looks incomplete."); ok = false;
      }
      if (!service.value) { setFieldError(service, "Please choose a service."); ok = false; }
      if (!body.value.trim()) { setFieldError(body, "Tell me a little about the project."); ok = false; }

      if (!ok) {
        message("Please fix the highlighted fields.", "error");
        var firstBad = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstBad) firstBad.focus();
        return;
      }

      var payload = {
        name: name.value.trim(),
        email: emailField.value.trim(),
        service: service.value,
        message: body.value.trim(),
        submitted_at: new Date().toISOString()
      };

      form.classList.add("is-sending");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      message("Sending your message…");

      fetch("tables/" + TABLE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed with status " + res.status);
          return res.json().catch(function () { return {}; });
        })
        .then(function () {
          form.reset();
          message("Thanks — your message is in. I'll get back to you within one business day.", "success");
        })
        .catch(function () {
          // Never lose an enquiry: keep it locally and offer a direct email fallback.
          try {
            var queued = JSON.parse(localStorage.getItem("pending_enquiries") || "[]");
            queued.push(payload);
            localStorage.setItem("pending_enquiries", JSON.stringify(queued));
          } catch (err) { /* storage unavailable — ignore */ }

          message(
            "I couldn't send that automatically. Please email me directly at [your@email.com] and I'll reply right away.",
            "error"
          );
        })
        .finally(function () {
          form.classList.remove("is-sending");
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit"; }
        });
    });

    // clear a field's error as soon as the visitor starts fixing it
    Array.prototype.forEach.call(form.querySelectorAll("input, select, textarea"), function (f) {
      f.addEventListener("input", function () { setFieldError(f, null); });
      f.addEventListener("change", function () { setFieldError(f, null); });
    });
  }

  /* =========================================================
     12. FOOTER YEAR
     ========================================================= */
  function initYear() {
    var y = document.getElementById("footer-year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* =========================================================
     13. HERO DECOR (raking light rays behind the portrait)
     ========================================================= */
  function initHeroDecor() {
    var hero = document.getElementById("hero");
    if (!hero) return;
    var rays = el("div", "hero-rays");
    rays.setAttribute("aria-hidden", "true");
    hero.insertBefore(rays, hero.firstChild);
  }

  /* =========================================================
     BOOT
     ========================================================= */
  function init() {
    initHeroDecor();
    buildServiceOptions();
    buildSocials();
    buildStats();
    buildCampaigns();
    buildTestimonials();
    buildInsights();
    buildAccordion(document.getElementById("services-list"), C.services,
      { idPrefix: "service", numbered: true });
    buildAccordion(document.getElementById("faq-list"), C.faqs,
      { idPrefix: "faq", numbered: false, richTitle: true });
    initNav();
    initHeader();
    initForm();
    initYear();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
