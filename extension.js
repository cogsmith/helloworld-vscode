const vscode = require('vscode');

const App = {};
App.Main = async function () {
}

activate = function (context) {
	console.log('ACTIVATE-INIT');

	//

	const vscmd = vscode.commands.registerCommand('extension.HELLOWORLD', async () => {
		vscode.window.showInformationMessage('INFO');
		vscode.window.showWarningMessage('WARNING');
		vscode.window.showErrorMessage('ERROR');
		const input = await vscode.window.showInputBox();
		vscode.window.showInformationMessage(input);
		console.log(input);
	});
	context.subscriptions.push(vscmd);

	//

	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10);
	statusBarItem.command = 'extension.HELLOWORLD';
	statusBarItem.text = 'HELLOWORLD';
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	//

	class myTreeDataProvider {
		constructor() {
			console.log('MyTreeDataProvider');
			this.data = [];
		}

		getTreeItem(q) {
			console.log({ GetTreeItem: q });
			let treeitem = {
				label: q,
				tooltip: 'TOOLTIP',
				collapsibleState: (q == 'LEAF') ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed
			};
			return treeitem;
		}

		getChildren(q) {
			console.log({ GetChildren: q });
			if (!q) { return ['CHILD1', 'CHILD2']; }
			return ['NODE', 'LEAF'];
		}
	}

	vscode.window.registerTreeDataProvider('HELLOWORLD_VIEW', new myTreeDataProvider());

	//

	console.log('ACTIVATE-DONE');
}

deactivate = function () { }

module.exports = { activate, deactivate };
