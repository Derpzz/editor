var input = document.querySelector('#input');
var frame = document.querySelector('#editor-preview');
var themes = document.querySelector('#themes');
var modes = document.querySelector('#modes');
var tabIndent = document.querySelector('#tabIndent');
var settings_checkbox = document.querySelectorAll('.settings_checkbox');

var editor = CodeMirror.fromTextArea(document.querySelector('#editor'), {
	extraKeys: {"Ctrl-Space": "autocomplete"},
	mode: {name: "htmlmixed", globalVars: true},
	theme: 'monokai',
	lineNumbers: true,
	autoCloseTags: true,
	indentUnit: 4,
	autoCloseBrackets: true,
	indentWithTabs: true,
	tabSize: 4,
	dragDrop: true,
	lineWrapping: true,
	styleActiveLine: true,
	styleActiveSelected: true,
	onChange: _ => {alert();}
});

input.addEventListener('change', function() {
	var f = new FileReader();
	f.onload = () => {
		editor.getDoc().setValue(f.result);
	}
	f.readAsText(this.files[0]);
});

themes.addEventListener('change', _ => {
	editor.setOption('theme', themes.value);
});
modes.addEventListener('change', _ => {
	editor.setOption('mode', {name: modes.value, globalVars: true});
});
tabIndent.addEventListener('change', _ => {
	editor.setOption('tabSize', tabIndent.value);
});
settings_checkbox[0].addEventListener('change', _ => {
	editor.setOption('styleActiveLine', settings_checkbox[0].checked);
});

settings_checkbox.forEach(v=>v.addEventListener('change', _ => {
	editor.setOption('styleActiveLine', settings_checkbox[0].checked);
	editor.setOption('autoCloseTags', settings_checkbox[1].checked);
}));

editor.on('change', _ => {
	frame.srcdoc = "<style>body{background:red;}</style><body>" + editor.getValue() + "</body>";
});