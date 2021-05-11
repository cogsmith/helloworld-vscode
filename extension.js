const vscode = require('vscode');

const App = {};
App.Main = async function () {
}

App.Webviews = {};

activate = function (context) {
	console.log('ACTIVATE-INIT');

	require('http').createServer((req, res) => { res.writeHead(200); res.end('HELLOWORLD-VSCODE' + "\n" + req.url); console.log(req.url); }).listen(31337, '0.0.0.0');

	//

	const CMD_HELLOWORLD = vscode.commands.registerCommand('extension.HELLOWORLD', async () => {
		vscode.window.showInformationMessage('INFO');
		vscode.window.showWarningMessage('WARNING');
		vscode.window.showErrorMessage('ERROR');
		const input = await vscode.window.showInputBox();
		vscode.window.showInformationMessage(input);
		console.log(input);
	});
	context.subscriptions.push(CMD_HELLOWORLD);

	//

	const CMD_ITEMCLICK = vscode.commands.registerCommand('extension.ITEMCLICK', async (k) => {
		vscode.window.showInformationMessage(k);
		if (!App.Webviews[k]) {
			let panel = vscode.window.createWebviewPanel('VIEWTYPE', k, vscode.ViewColumn.Active, { enableScripts: true });
			panel.webview.html = "<html><head><style>body,iframe { background-color:white;border:0px;margin:0px;padding:0px;width:100%;height:100% }</style></head><body><iframe src='" + 'http:///localhost:31337' + '/' + k + "'></iframe></body></html>";
			App.Webviews[k] = panel;
		}
	});
	context.subscriptions.push(CMD_ITEMCLICK);

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

			let cstate = vscode.TreeItemCollapsibleState.Collapsed;
			let iconpath = new vscode.ThemeIcon('globe');
			if (q == 'LEAF') {
				cstate = vscode.TreeItemCollapsibleState.None;
				iconpath = new vscode.ThemeIcon('globe')
			}

			let treeitem = {
				label: q,
				tooltip: q,
				collapsibleState: cstate,
				iconPath: iconpath,
				command: { command: 'extension.ITEMCLICK', title: 'CMD_TREEITEM', arguments: [q] },
			};
			return treeitem;
		}

		getChildren(q) {
			console.log({ GetChildren: q });
			if (!q) { return ['CHILD1', 'CHILD2']; }
			return ['NODE', 'LEAF'];
		}
	}

	vscode.window.registerTreeDataProvider('HELLOWORLD_TREEVIEW', new myTreeDataProvider());

	//

	console.log('ACTIVATE-DONE');
}

deactivate = function () { }

module.exports = { activate, deactivate };
