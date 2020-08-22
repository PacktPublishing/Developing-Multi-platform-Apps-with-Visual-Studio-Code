import * as vscode from "vscode";

export const myOpenFolderCommand = "vscode-first.myOpenFolder";

export const myuserInputCommand = "vscode-first.userInput";

export function myOpenFolderFunc() {
  vscode.commands.executeCommand("vscode.openFolder");
}

export async function myUserInputFunc() {
  const userInput = await vscode.window.showInputBox({
    placeHolder: "Please enter message",
    prompt: "Enter Message",
  });
  if (userInput !== undefined) {
    vscode.window.showInformationMessage(userInput);
  }
}
