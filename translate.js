/* Language switcher for imranx.com
   - Adds a language button to the header (inside .actions).
   - Google Translate is NOT loaded until a visitor picks a language, so it costs nothing on normal visits.
   - The choice is remembered on this device and applied on every page.
   To add or remove a language, edit the LANGS list below: [code, name shown, short code]. */
(function () {
  if (window.__ixLang) return;
  window.__ixLang = true;

  var LANGS = [
    ["en", "English", "EN"], ["bn", "বাংলা", "BN"], ["zh-CN", "中文 (简体)", "ZH"], ["zh-TW", "中文 (繁體)", "TW"],
    ["ja", "日本語", "JA"], ["ur", "اردو", "UR"], ["ar", "العربية", "AR"], ["nl", "Nederlands", "NL"],
    ["fr", "Français", "FR"], ["de", "Deutsch", "DE"], ["hi", "हिन्दी", "HI"], ["id", "Bahasa Indonesia", "ID"],
    ["ko", "한국어", "KO"], ["ms", "Bahasa Melayu", "MS"], ["pt", "Português", "PT"], ["ru", "Русский", "RU"],
    ["es", "Español", "ES"], ["tr", "Türkçe", "TR"]
  ];
  var SRC = (document.documentElement.lang || "en").split("-")[0];   // language the page is written in
  var KEY = "ix-lang", loaded = false;

  function store(v) { try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) {} }
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setCookie(v) {
    var c = "googtrans=" + v + "; path=/";
    document.cookie = c;
    if (location.hostname.indexOf(".") > -1) document.cookie = c + "; domain=." + location.hostname.replace(/^www\./, "");
  }
  function clearCookie() {
    var past = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = past;
    var h = location.hostname.replace(/^www\./, "");
    document.cookie = past + "; domain=" + h;
    document.cookie = past + "; domain=." + h;
  }

  /* keep brand, numbers and the live age counter exactly as they are */
  [".brand", ".age", ".units", ".ticks", "#pct", "#days", "#left"].forEach(function (s) {
    [].forEach.call(document.querySelectorAll(s), function (e) { e.setAttribute("translate", "no"); e.classList.add("notranslate"); });
  });

  /* styles */
  var css = document.createElement("style");
  css.textContent =
    ".lang-wrap{position:relative}" +
    ".lang-btn{height:40px;padding:0 10px;border-radius:10px;border:1px solid var(--line,#e3e7ee);background:transparent;color:var(--ink,#101828);cursor:pointer;display:inline-flex;align-items:center;gap:6px;font:600 13px/1 var(--font-body,system-ui);letter-spacing:.02em}" +
    ".lang-btn:hover,.lang-btn[aria-expanded=true]{background:var(--accent-soft,#e8eefe)}" +
    ".lang-btn svg{width:18px;height:18px;flex:none}" +
    ".lang-menu{position:absolute;right:0;top:calc(100% + 8px);width:250px;max-height:min(62vh,380px);overflow:auto;background:var(--surface,#fff);border:1px solid var(--line,#e3e7ee);border-radius:14px;box-shadow:0 18px 40px rgba(16,24,40,.18);padding:6px;z-index:70;margin:0;list-style:none}" +
    ".lang-menu[hidden]{display:none}" +
    ".lang-menu button{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 12px;border:0;border-radius:9px;background:transparent;color:var(--ink,#101828);font:500 15px/1.4 var(--font-body,system-ui);text-align:left;cursor:pointer}" +
    ".lang-menu button:hover,.lang-menu button:focus-visible{background:var(--accent-soft,#e8eefe)}" +
    ".lang-menu button[aria-checked=true]{background:var(--accent,#2457f5);color:var(--accent-ink,#fff)}" +
    ".lang-menu small{font:600 11px/1 var(--font-mono,monospace);opacity:.7;letter-spacing:.06em}" +
    ".lang-note{padding:8px 12px 6px;font-size:12px;line-height:1.5;color:var(--muted,#5b6577)}" +
    "@media (max-width:520px){.lang-menu{position:fixed;left:16px;right:16px;top:72px;width:auto}}" +
    /* hide Google's own toolbar and keep the page position normal */
    "body{top:0!important}.goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt,.goog-tooltip,iframe.skiptranslate,.VIpgJd-ZVi9od-ORHb-OEVmcd,.VIpgJd-ZVi9od-aZ2wEe-wOHMyf{display:none!important}" +
    ".goog-text-highlight{background:none!important;box-shadow:none!important}" +
    "#ix_gt{position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden}";
  document.head.appendChild(css);

  /* button and menu */
  var host = document.querySelector(".actions");
  if (!host) return;
  var wrap = document.createElement("div"); wrap.className = "lang-wrap";
  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "lang-btn"; btn.setAttribute("aria-haspopup", "true"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-label", "Change language");
  var menu = document.createElement("ul"); menu.className = "lang-menu"; menu.hidden = true;
  wrap.appendChild(btn); wrap.appendChild(menu); host.insertBefore(wrap, host.firstChild);

  var current = saved() || SRC;
  if (!LANGS.some(function (l) { return l[0] === current; })) current = SRC;

  function label() {
    var short = (LANGS.filter(function (l) { return l[0] === current; })[0] || LANGS[0])[2];
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/></svg><span class="notranslate" translate="no">' + short + "</span>";
    [].forEach.call(menu.querySelectorAll("button"), function (b) { b.setAttribute("aria-checked", b.getAttribute("data-l") === current ? "true" : "false"); });
  }
  LANGS.forEach(function (l) {
    var li = document.createElement("li"), b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "menuitemradio"); b.setAttribute("data-l", l[0]); b.setAttribute("lang", l[0]);
    b.className = "notranslate"; b.setAttribute("translate", "no");
    b.innerHTML = "<span>" + l[1] + "</span><small>" + l[2] + "</small>";
    b.addEventListener("click", function () { choose(l[0]); });
    li.appendChild(b); menu.appendChild(li);
  });
  var note = document.createElement("li");
  note.className = "lang-note notranslate"; note.setAttribute("translate", "no");
  note.textContent = "Automatic translation by Google. The original text is the reference.";
  menu.appendChild(note);

  function open(v) { menu.hidden = !v; btn.setAttribute("aria-expanded", v ? "true" : "false"); if (v) { var on = menu.querySelector('[aria-checked="true"]'); if (on) on.scrollIntoView({ block: "nearest" }); } }
  btn.addEventListener("click", function (e) { e.stopPropagation(); open(menu.hidden); });
  document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) open(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { open(false); btn.focus(); } });

  /* Google Translate, loaded only when needed */
  function load() {
    if (loaded) return; loaded = true;
    var box = document.createElement("div"); box.id = "ix_gt"; box.setAttribute("aria-hidden", "true"); document.body.appendChild(box);
    window.ixGtInit = function () {
      new google.translate.TranslateElement({ pageLanguage: SRC, autoDisplay: false, includedLanguages: LANGS.map(function (l) { return l[0]; }).join(",") }, "ix_gt");
    };
    var s = document.createElement("script"); s.async = true; s.src = "https://translate.google.com/translate_a/element.js?cb=ixGtInit";
    document.head.appendChild(s);
  }
  function applyToWidget(code) {
    var tries = 0, t = setInterval(function () {
      var combo = document.querySelector("select.goog-te-combo");
      if (combo) { clearInterval(t); combo.value = code; combo.dispatchEvent(new Event("change")); }
      else if (++tries > 60) clearInterval(t);
    }, 100);
  }
  function choose(code) {
    open(false);
    if (code === current) return;
    var wasTranslated = current !== SRC;
    current = code; label();
    if (code === SRC) {                       /* back to the original text */
      store(null); clearCookie();
      if (wasTranslated) location.reload();
      return;
    }
    store(code); setCookie("/" + SRC + "/" + code);
    if (!loaded) load(); else applyToWidget(code);
  }

  label();
  if (current !== SRC) { setCookie("/" + SRC + "/" + current); load(); }   /* remembered choice */
})();
