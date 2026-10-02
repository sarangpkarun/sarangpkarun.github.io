(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Header state + scroll progress
  var header = document.getElementById("header");
  var progress = document.getElementById("scroll-progress");
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 20);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll-spy
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll("a"));
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });

  // Count-up
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || "0", 10);
    var suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counter = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { countUp(entry.target); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach(function (el) { counter.observe(el); });

  // Contact form -> mailto
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();
    note.classList.remove("error");
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
      note.classList.add("error");
      note.textContent = "Please fill in your name, a valid email and a message.";
      return;
    }
    var subject = "Portfolio enquiry from " + name;
    var body = message + "\n\n— " + name + " (" + email + ")";
    window.location.href = "mailto:sarangspkach@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    note.textContent = "Opening your email app…";
  });

  // Library-driven effects (CDN scripts are deferred, so run after load)
  window.addEventListener("load", function () {
    if (window.Typed) {
      new Typed("#typed", {
        strings: ["AI/ML Engineer", "LLM &amp; Agentic AI Developer", "Computer Vision Engineer", "Deep Learning Researcher"],
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 1600,
        loop: !reduceMotion,
      });
    } else {
      document.getElementById("typed").textContent = "AI/ML Engineer";
    }

    if (window.particlesJS && !reduceMotion) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 55, density: { enable: true, value_area: 900 } },
          color: { value: "#7c6cff" },
          shape: { type: "circle" },
          opacity: { value: 0.45 },
          size: { value: 2.5, random: true },
          line_linked: { enable: true, distance: 150, color: "#5b8cff", opacity: 0.25, width: 1 },
          move: { enable: true, speed: 1.2, out_mode: "out" },
        },
        interactivity: {
          events: { onhover: { enable: true, mode: "grab" }, resize: true },
          modes: { grab: { distance: 160, line_linked: { opacity: 0.5 } } },
        },
        retina_detect: true,
      });
    }

    if (window.ScrollReveal && !reduceMotion) {
      document.documentElement.classList.add("sr");
      ScrollReveal().reveal(".reveal", { distance: "30px", origin: "bottom", duration: 700, interval: 80, easing: "ease-out", cleanup: true });
    }
    // VanillaTilt auto-initialises elements with [data-tilt]
  });
})();
