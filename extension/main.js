// Load script from storage, and execute
chrome.storage.local.get('script', function (data) {
  var script = data['script'];
  if (script) {
    eval(script);
  }
});

