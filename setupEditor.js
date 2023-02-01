import { basicSetup, EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { json } from '@codemirror/lang-json';

export default function setupEditors() {
  const jsonRequestBody = document.querySelector('[data-json-request-body]');
  const jsonResponseBody = document.querySelector('[data-json-response-body]');

  const requestEditor = new EditorView({
    doc: '{\n\t\n}',
    extensions: [basicSetup, json()],
    parent: jsonRequestBody,
  });

  const responseEditor = new EditorView({
    state: EditorState.create({
      doc: '{}',
      extensions: [basicSetup, json(), EditorView.editable.of(false)],
    }),
    parent: jsonResponseBody,
  });

  function updateResponseEditor(value) {
    responseEditor.dispatch({
      changes: {
        from: 0,
        to: responseEditor.state.doc.length,
        insert: JSON.stringify(value, null, 2),
      },
    });
  }

  return { requestEditor, updateResponseEditor };
}
