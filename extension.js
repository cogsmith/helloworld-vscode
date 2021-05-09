const vscode = require('vscode');

activate = function (context) {
	let vscmd = vscode.commands.registerCommand('extension.HELLOWORLD', () => {
		vscode.window.showInformationMessage('HELLOWORLD');
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
