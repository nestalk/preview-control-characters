'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getSettings(){
    const config = vscode.workspace.getConfiguration('previewControlCharacters');
    return {
        newLineAfterCR: config.get('newLineAfterCR') || false,
        newLineAfterLF: config.get('newLineAfterLF') || false,
        translateSpace: config.get('translateSpace') || false,
        monospaceFont: config.get('monospaceFont') || false,
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let previewUri = vscode.Uri.parse('control-preview://authority/control-preview');

    class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
        private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

        public provideTextDocumentContent(uri: vscode.Uri): string {
            return this.extractSnippet();
        }

        get onDidChange(): vscode.Event<vscode.Uri> {
            return this._onDidChange.event;
        }

        public update(uri: vscode.Uri) {
            this._onDidChange.fire(uri);
        }
        private extractSnippet(): string {
            let editor = vscode.window.activeTextEditor;
            let text = editor.document.getText();
            
            let settings = getSettings();
            
            text = text.replace(/\u0000/g, '\u2400');
            text = text.replace(/\u0001/g, '\u2401');
            text = text.replace(/\u0002/g, '\u2402');
            text = text.replace(/\u0003/g, '\u2403');
            text = text.replace(/\u0004/g, '\u2404');
            text = text.replace(/\u0005/g, '\u2405');
            text = text.replace(/\u0006/g, '\u2406');
            text = text.replace(/\u0007/g, '\u2407');
            text = text.replace(/\u0008/g, '\u2408');
            text = text.replace(/\u0009/g, '\u2409');
            if(settings.newLineAfterLF){
                text = text.replace(/\u000A/g, '\u240A\n');
            }
            else{
                text = text.replace(/\u000A/g, '\u240A');
            }
            text = text.replace(/\u000B/g, '\u240B');
            text = text.replace(/\u000C/g, '\u240C');
            
            if(settings.newLineAfterCR){
                text = text.replace(/\u000D/g, '\u240D\n');
            }
            else{
                text = text.replace(/\u000D/g, '\u240D');
            }
            text = text.replace(/\u000E/g, '\u240E');
            text = text.replace(/\u000F/g, '\u240F');
            text = text.replace(/\u0010/g, '\u2410');
            text = text.replace(/\u0011/g, '\u2411');
            text = text.replace(/\u0012/g, '\u2412');
            text = text.replace(/\u0013/g, '\u2413');
            text = text.replace(/\u0014/g, '\u2414');
            text = text.replace(/\u0015/g, '\u2415');
            text = text.replace(/\u0016/g, '\u2416');
            text = text.replace(/\u0017/g, '\u2417');
            text = text.replace(/\u0018/g, '\u2418');
            text = text.replace(/\u0019/g, '\u2419');
            text = text.replace(/\u001A/g, '\u241A');
            text = text.replace(/\u001B/g, '\u241B');
            text = text.replace(/\u001C/g, '\u241C');
            text = text.replace(/\u001D/g, '\u241D');
            text = text.replace(/\u001E/g, '\u241E');
            text = text.replace(/\u001F/g, '\u241F');
            if(settings.translateSpace){
                text = text.replace(/\u0020/g, '\u2420');
            }
            text = text.replace(/\u007F/g, '\u2421');
            
            return this.snippet(text, settings.monospaceFont);
        }

        private errorSnippet(error: string): string {
            return `
                <body>
                    ${error}
                </body>`;
        }

        private snippet(text, monospace): string {
            return `
                <style>
                    pre {
                        font-family: ${monospace ? 'monospace' : ''};
                    }
                </style>
                <body>
                    <pre>
${text}
                    </pre>
                </body>`;
        }
    }

    let provider = new TextDocumentContentProvider();
    let registration = vscode.workspace.registerTextDocumentContentProvider('control-preview', provider);

    vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
        if (e.document === vscode.window.activeTextEditor.document) {
            provider.update(previewUri);
        }
    });

    vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent) => {
        if (e.textEditor === vscode.window.activeTextEditor) {
            provider.update(previewUri);
        }
    })

    let disposable = vscode.commands.registerCommand('extension.showControlCharacterPreview', () => {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two).then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });

    });
    context.subscriptions.push(disposable, registration);
}

// this method is called when your extension is deactivated
export function deactivate() {
}