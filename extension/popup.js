document.addEventListener('DOMContentLoaded', function() {
  // Load script from storage and set it into text area as default script
  var scriptTextArea = document.getElementById('script-textarea');
  chrome.storage.local.get('script', function (data) {
    var script = data['script'];
    if (script) {
      scriptTextArea.value = script;
    }
  });

  // Add click event to "Save" button to save entered script into storage
  var buttonSave = document.getElementById('button-save');
  buttonSave.addEventListener('click', function () {
    chrome.storage.local.set({
      'script': scriptTextArea.value
    }, function(){
      window.close();
    });
  });
});

