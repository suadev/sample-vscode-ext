"use strict";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.showSelectedText",
    () => {
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      var selection = editor.selection;
      var text = editor.document.getText(selection);

      vscode.window.showInformationMessage(text);
    }
  );
  context.subscriptions.push(disposable);
}