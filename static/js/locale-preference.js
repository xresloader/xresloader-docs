/* Runs before hydration. Direct documentation links retain their language. */
(function () {
  var key = "xresloader-docs.locale";
  var url = new URL(window.location.href);
  var current = /^\/zh-Hans(?:\/|$)/.test(url.pathname) ? "zh-Hans" : "en";
  var manual = url.searchParams.get("persistLocale") === "true";
  var system = url.searchParams.get("followSystem") === "true";
  var saved;
  try {
    if (system) window.localStorage.removeItem(key);
    if (manual) window.localStorage.setItem(key, current);
    saved = window.localStorage.getItem(key);
  } catch (_) {
    // Private browsing or a storage policy must not prevent navigation.
  }
  if (manual || system) {
    url.searchParams.delete("persistLocale");
    url.searchParams.delete("followSystem");
    window.history.replaceState(window.history.state, "", url.href);
  }
  if (manual || url.pathname !== "/") return;
  var target = saved === "en" || saved === "zh-Hans" ? saved : null;
  if (!target) {
    var languages = window.navigator.languages || [window.navigator.language];
    for (var i = 0; i < languages.length; i++) {
      try {
        var locale = new Intl.Locale(languages[i]).maximize();
        if (locale.language === "en") { target = "en"; break; }
        if (locale.language === "zh" && locale.script === "Hans") {
          target = "zh-Hans"; break;
        }
      } catch (_) { /* Ignore malformed language tags. */ }
    }
  }
  if (target === "zh-Hans") {
    url.pathname = "/zh-Hans/";
    window.location.replace(url.href);
  }
})();
