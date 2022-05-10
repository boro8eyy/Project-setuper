import * as vscode from "vscode";
import * as fs from "fs";
import { IProject } from "../interfaces";

const settingsFilePath =
	vscode.extensions.getExtension("boro8eyy.project-setuper")?.extensionPath +
	"//settings.json";

export async function editProject() {
	var settingJson = JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
	var projectsJson = settingJson.projects;
	await vscode.window
		.showQuickPick(
			projectsJson.map((element: IProject) => element.name),
			{
				title: "Select project",
			}
		)
		.then(async selection => {
			if (!selection) {
				return;
			} else {
				var str = JSON.stringify(settingJson, null, 1);
				str
					.split("\n")
					.map((element: string, index: number) => {
						if ('   "name": "' + selection + '",' === element) {
							return index;
						}
					})
					.map(async element => {
						if (element !== undefined) {
							var pos = new vscode.Position(element - 1, 10);
							const doc = vscode.workspace.openTextDocument(settingsFilePath);

							await vscode.window
								.showTextDocument(await doc, {
									preview: false,
								})
								.then(editor => {
									editor.selections = [new vscode.Selection(pos, pos)];
									var range = new vscode.Range(pos, pos);
									editor.revealRange(range);
								});
							return;
						}
					});
			}
		});
}
