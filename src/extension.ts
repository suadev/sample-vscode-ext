"use strict";
import {
  window,
  commands,
  ExtensionContext,
  WorkspaceEdit,
  workspace
} from "vscode";

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand(
    "extension.wrapWithRegion",
    async () => {
      var editor = window.activeTextEditor;
      if (!editor) {
        return;
      }

      const regionName = await getRegionName();
      if (!regionName) {
        return;
      }

      var startPosition = editor.selection.active;
      var endPosittion = editor.selection.end;

      const edit = new WorkspaceEdit();
      edit.insert(
        editor.document.uri,
        startPosition,
        "\n#region " + regionName + " \n"
      );
      edit.insert(editor.document.uri, endPosittion, "\n #endregion\n");
      workspace.applyEdit(edit);
    }
  );
  context.subscriptions.push(disposable);

  function getRegionName() {
    return window.showInputBox({
      prompt: "Region Name",
      value: "region"
    });
  }
}
