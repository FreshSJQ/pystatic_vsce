"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_languageclient_1 = require("vscode-languageclient");
const vscode = require("vscode");
let client;
const executablePath = '../pystatic/pystaticls';
function activate(context) {
    console.log('Congratulations, your extension "pystatic" is now active!');
    let clientOptions = {
        documentSelector: [
            { scheme: 'file', language: 'python' }
        ]
    };
    let serverOptions = {
        command: 'python',
        args: [executablePath]
    };
    client = new vscode_languageclient_1.LanguageClient('pylsp', 'pylsp', serverOptions, clientOptions);
    let disposable = vscode.commands.registerCommand('extension.pystatic', () => {
        let textDocuments = vscode.workspace.textDocuments;
        let DictDocments = [];
        for (var i = 0; i < textDocuments.length; i++) {
            if (textDocuments[i].languageId === 'python') {
                DictDocments.push({ 'uri': textDocuments[i].uri.toString(),
                    'path': textDocuments[i].uri.fsPath });
            }
        }
        client.sendNotification('start_pystatic', { 'textDocument': DictDocments });
        vscode.window.showInformationMessage('Start pystatic check.');
    });
    context.subscriptions.push(disposable);
    vscode.window.showInformationMessage('Start pystatic check.');
    client.start();
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map