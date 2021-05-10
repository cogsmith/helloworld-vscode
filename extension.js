const vscode = require('vscode');

const App = {};
App.Main = async function () {
}

activate = function (context) {
	let vscmd = vscode.commands.registerCommand('extension.HELLOWORLD', async () => {
		vscode.window.showInformationMessage('INFO');
		vscode.window.showWarningMessage('WARNING');
		vscode.window.showErrorMessage('ERROR');
		const input = await vscode.window.showInputBox();
		vscode.window.showInformationMessage(input);
		console.log(input);
	});
	context.subscriptions.push(vscmd);

	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10);
	statusBarItem.command = 'extension.HELLOWORLD';
	statusBarItem.text = 'HELLOWORLD';
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);
}

deactivate = function () { }

module.exports = { activate, deactivate };
