// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as mycommands from "./Commands/commands";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-first" is now active!');

  let disposable = vscode.commands.registerCommand(
    "vscode-first.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from VS Code Book First Extension!"
      );
    }
  );

  context.subscriptions.push(disposable);

  //Adding the Open Folder command
  context.subscriptions.push(
    vscode.commands.registerCommand(
      mycommands.myOpenFolderCommand,
      mycommands.myOpenFolderFunc
    )
  );
   //Adding the user input command
   context.subscriptions.push(
    vscode.commands.registerCommand(
      mycommands.myuserInputCommand,
      mycommands.myUserInputFunc
    )
  );

}

// this method is called when your extension is deactivated
export function deactivate() {}
