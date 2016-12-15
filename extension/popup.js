Editors = (function () {
  var editors = {
    ace: null,
    monaco: null,
    textarea: null
  };
  
  function createAceEditor(cb) {
    var editor = ace.edit("ace-editor");
    editor.setTheme("ace/theme/monokai");
    editor.setFontSize(13);
    editor.getSession().setMode("ace/mode/javascript");
    editor._setValue = editor.setValue;
    editor.setValue = function(value,cursorPos=-1) {
      editor._setValue(value,cursorPos);
    }
    cb(editor);
  }

  function createMonacoEditor(cb) {
    require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
    require(['vs/editor/editor.main'], function() {
      var editor = monaco.editor.create(document.getElementById('container'), {
        value: '',
        language: 'javascript'
      });

      cb(editor);
    });
  }

  function createTextAreaEditor(cb) {
    var scriptTextArea = document.getElementById('script-textarea');
    cb({
      getValue: function() {
        return scriptTextArea.value;
      },
      setValue: function(value) {
        scriptTextArea.value = value;
      }
    });
  }

  function getEditor(name, cb) {
    var editor = editors[name];
    if (editor) {
      cb(editor);
      return ;
    }

    switch (name) {
      case 'ace':
        createAceEditor(editorCreated);
      break;

      case 'monaco':
        createMonacoEditor(editorCreated);
      break;

      case 'textarea':
        createTextAreaEditor(editorCreated);
      break;

      default:
        cb(null);
      break;
    }

    function editorCreated(editor) {
      editors[name] = editor;
      cb(editor)
    }
  }

  function Editors() {}
  Editors.prototype.getEditor = function(cb) {
    return getEditor('ace', cb);
  };
  return new Editors();
})();

document.addEventListener('DOMContentLoaded', function() {
  Editors.getEditor(function(editor) {
    if (!editor) {
      throw "editor could not be created";
    }

    chrome.storage.local.get('script', function (data) {
    var script = data['script'];
    if (script) {
        editor.setValue(script);
      }
    });

    var buttonSave = document.getElementById('button-save');
    buttonSave.addEventListener('click', function () {
      chrome.storage.local.set({
        'script': editor.getValue()
      }, function(){
        window.close();
      });
    });
  });

});

function initializeEditors(value) {

}
