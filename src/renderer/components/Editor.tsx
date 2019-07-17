import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monacoEditor from 'monaco-editor';

type Props = {
    value: string;
    jsonSchema?: any;
    onChange: (value: string) => void;
    className?: string;
};

export const Editor = (props: Props) => {
    const editor = React.useRef<typeof monacoEditor| null>(null);

    const editorWillMount = React.useCallback(
        (monaco: typeof monacoEditor) => {
            editor.current = monaco;
        },
        []
    );

    React.useEffect(() => {
        if (editor.current) {
            if (!props.jsonSchema) {
                editor.current.languages.json.jsonDefaults.setDiagnosticsOptions({
                    validate: false
                });
            } else {
                editor.current.languages.json.jsonDefaults.setDiagnosticsOptions({
                    validate: true,
                    schemas: [{
                        uri: 'http://alfabank.ru/schema.json',
                        fileMatch: ['*'],
                        schema: props.jsonSchema
                    }]
                });
            }
        }
    }, [props.jsonSchema, editor.current]);

    return (
        <div className={ props.className }>
            <MonacoEditor
                language="json"
                theme="vs-light"
                value={ props.value }
                options={ { scrollBeyondLastLine: false, minimap: { enabled: false }, automaticLayout: true } }
                onChange={ props.onChange }
                editorWillMount={ editorWillMount }
            />
        </div>
    );
};
