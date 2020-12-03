import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient';
import * as vscode from 'vscode';

let client: LanguageClient;
const executablePath = '../pystatic/pystaticls';


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "pystatic" is now active!');
	let clientOptions : LanguageClientOptions = {
        documentSelector: [
            {scheme: 'file', language: 'python'}
        ]
    };
    let serverOptions : ServerOptions = {
        command: 'python',
		args: [executablePath]
    };
    client = new LanguageClient('pylsp', 'pylsp', serverOptions, clientOptions);

    let disposable = vscode.commands.registerCommand('extension.pystatic', () => {
        let textDocuments = vscode.workspace.textDocuments;
        let DictDocments = [];
        for(var i = 0; i < textDocuments.length; i++) {
            if(textDocuments[i].languageId === 'python'){
                DictDocments.push({'uri': textDocuments[i].uri.toString(),
                                    'path': textDocuments[i].uri.fsPath});
            }
        }
        client.sendNotification('start_pystatic', {'textDocument': DictDocments});
        vscode.window.showInformationMessage('Start pystatic check.');
    });
	context.subscriptions.push(disposable);
    vscode.window.showInformationMessage('Start pystatic check.');
    client.start();
}

// this method is called when your extension is deactivated
export function deactivate() {
    if(!client) {
        return undefined;
    }
    return client.stop();
}
