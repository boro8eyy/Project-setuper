import * as vscode from "vscode";
import * as fs from "fs";
import { IProject } from "../interfaces";
import { removeByIndex } from "../utils/removeByIndex";

const settingsFilePath =
	vscode.extensions.getExtension("boro8eyy.project-setuper")
		?.extensionPath + "\\settings.json";

export function deleteProject() {
	var settingJson = JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
	var projectsJson = settingJson.projects;
	vscode.window
		.showQuickPick(
			projectsJson.map((element: IProject) => element.name),
			{
				title: "Select project",
			}
		)
		.then(selection => {
			if (!selection) {
				return;
			} else {
				for (let i = 0; i < projectsJson.length; i++) {
					if (projectsJson[i].name === selection) {
						fs.readFile(settingsFilePath, "utf8", (err, data) => {
							if (err) {
								vscode.window.showErrorMessage(String(err));
							} else {
								var newProjectsJson = JSON.parse(data);
								newProjectsJson["projects"] = removeByIndex(
									projectsJson,
									projectsJson[i]
								);
								var json = JSON.stringify(newProjectsJson, null, 4);
								fs.writeFile(settingsFilePath, json, "utf8", () => {});
							}
						});
					}
				}
			}
		});
}
