// Load script from storage, and execute
Extension = (function () {
  function Extension() {}

  Extension.prototype.addScript = function (src) {
    var s = document.createElement('script');
    s.src = src;
    document.body.appendChild(s);
  }

  Extension.prototype.onReadyComplete = null;

  return new Extension();
})();

chrome.storage.local.get('script', function (data) {
  var __script = data['script'];
  if (__script) {
    eval(__script);
  }

  var __interval = setInterval(function () {
    if (document.readyState == 'complete') {
      clearInterval(__interval);
      if (Extension.onReadyComplete) {
        Extension.onReadyComplete();
      }
    }
  }, 500);
});

