/* ===== SITE SETTINGS: edit this block once, it updates every page ===== */
var SITE = {
  email: "eimransardar@gmail.com",          // shown in Contact; replace with your public email
  phone: "+8801712200886",                  // for the tap-to-call link (no spaces)
  phoneLabel: "+88 01712-200886",           // how the number is displayed
  socials: {                                // leave a link empty ("") to hide that icon
    facebook: "https://www.facebook.com/imransardarx",
    x: "https://x.com/itsardar",                                  // e.g. https://x.com/yourhandle
    linkedin: "https://www.linkedin.com/in/imranxs/",
    medium: "https://medium.com/@isardar",                       // e.g. https://medium.com/@yourhandle
    youtube: "https://www.youtube.com/@engineerimransardar"      // e.g. https://www.youtube.com/@yourchannel
  },
  giscus: { repo: "", repoId: "", category: "", categoryId: "" } // comments, see README
};
var ICONS = {
  facebook: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  medium: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
  youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
};
var NAMES = { facebook: "Facebook", x: "X", linkedin: "LinkedIn", medium: "Medium", youtube: "YouTube" };

/* Shared: theme toggle, mobile menu, copy-link button, reading progress. */
(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}

  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  var nav = document.getElementById("nav"), menuBtn = document.getElementById("menuBtn");
  if (nav && menuBtn) menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  if (nav && menuBtn) nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  });


  /* contact details + social icons from SITE */
  document.querySelectorAll("[data-email]").forEach(function (a) { a.textContent = SITE.email; a.href = "mailto:" + SITE.email; });
  document.querySelectorAll("[data-phone]").forEach(function (a) { a.textContent = SITE.phoneLabel; a.href = "tel:" + SITE.phone; });
  document.querySelectorAll("[data-social]").forEach(function (box) {
    Object.keys(NAMES).forEach(function (k) {
      var url = SITE.socials[k]; if (!url) return;
      var a = document.createElement("a");
      a.className = "soc"; a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.setAttribute("aria-label", NAMES[k]);
      a.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="' + ICONS[k] + '"/></svg>';
      box.appendChild(a);
    });
  });

  /* share buttons on a post */
  var share = document.getElementById("share");
  if (share) {
    var u = encodeURIComponent(location.href), t = encodeURIComponent(document.title);
    [["Facebook", "https://www.facebook.com/sharer/sharer.php?u=" + u],
     ["X", "https://x.com/intent/post?url=" + u + "&text=" + t],
     ["LinkedIn", "https://www.linkedin.com/sharing/share-offsite/?url=" + u],
     ["WhatsApp", "https://wa.me/?text=" + t + "%20" + u]].forEach(function (s) {
      var a = document.createElement("a");
      a.className = "chip"; a.href = s[1]; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = s[0];
      share.appendChild(a);
    });
  }

  /* comments (Giscus, needs a free GitHub setup) */
  var cm = document.getElementById("comments"), g = SITE.giscus;
  if (cm && g.repo && g.repoId && g.categoryId) {
    cm.hidden = false;
    var s = document.createElement("script");
    s.src = "https://giscus.app/client.js"; s.async = true; s.crossOrigin = "anonymous";
    s.setAttribute("data-repo", g.repo); s.setAttribute("data-repo-id", g.repoId);
    s.setAttribute("data-category", g.category); s.setAttribute("data-category-id", g.categoryId);
    s.setAttribute("data-mapping", "pathname"); s.setAttribute("data-reactions-enabled", "1");
    s.setAttribute("data-theme", "preferred_color_scheme"); s.setAttribute("data-lang", document.documentElement.lang || "en");
    cm.appendChild(s);
  }

  var copyBtn = document.getElementById("copyLink");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var label = copyBtn.textContent;
    function done(ok) { var en = document.documentElement.lang === "en"; copyBtn.textContent = ok ? (en ? "Copied ✓" : "কপি হয়েছে ✓") : (en ? "Could not copy" : "লিংক কপি করা যায়নি"); setTimeout(function () { copyBtn.textContent = label; }, 2000); }
    try { navigator.clipboard.writeText(location.href).then(function () { done(true); }, function () { done(false); }); }
    catch (e) { done(false); }
  });

  var bar = document.getElementById("progress");
  if (bar) {
    var upd = function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? Math.min(100, scrollY / h * 100) : 0) + "%";
    };
    addEventListener("scroll", upd, { passive: true }); upd();
  }
})();
