/* Loads Google Tag Manager only after the visitor has allowed analytics.
   Rule R-2026-10-05-2: no request to Google before consent. The consent
   default is set inline in each page head; ConsentKit sends the update. */
(function () {
  var GTM_ID = 'GTM-T9635SSK';
  var loaded = false;

  function load() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }

  // Returning visitor who already allowed analytics.
  try {
    var stored = JSON.parse(localStorage.getItem('ck_consent') || 'null');
    if (stored && stored.choices && stored.choices.analytics === true) load();
  } catch (e) { /* storage unavailable: treat as no consent */ }

  // New choice: ConsentKit pushes ['consent', 'update', {...}] into dataLayer.
  window.dataLayer = window.dataLayer || [];
  var originalPush = window.dataLayer.push;
  window.dataLayer.push = function (item) {
    var result = originalPush.apply(this, arguments);
    if (item && item[0] === 'consent' && item[1] === 'update' &&
        item[2] && item[2].analytics_storage === 'granted') {
      load();
    }
    return result;
  };
})();
