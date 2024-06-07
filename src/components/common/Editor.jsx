import React, { useRef, useEffect } from 'react';

let ControlledEditor;
if (typeof window !== 'undefined') {
  ControlledEditor = require('react-codemirror2').Controlled;

  import('codemirror/lib/codemirror.css');
  import('codemirror/theme/material.css');
  import('codemirror/mode/xml/xml');
  import('codemirror/mode/javascript/javascript');
  import('codemirror/mode/css/css');
}

export default function Editor(props) {
  const { language, displayName, value, onChange } = props;
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
    }
  }, []);

  function handleChange(editor, data, code) {
    onChange(code);
  }

  if (!ControlledEditor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editor-container">
      <div className="editor-title p-2 text-white h-[80vh]  ">
        <div>{displayName}</div>

        <ControlledEditor
          onBeforeChange={(editor, data, code) => handleChange(editor, data, code)}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            mode: language,
            theme: 'material',
            lineNumbers: true,
            extraKeys: {
              'Ctrl-Space': 'autocomplete',
              'Ctrl-Alt-L': 'toggleLint',
            },
          }}
          editorDidMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </div>
  );
}
