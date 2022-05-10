import * as vscode from "vscode";
import * as fs from "fs";
import * as ncp from "ncp";
import { IProject } from "../interfaces";

const settingsFilePath =
	vscode.extensions.getExtension("boro8eyy.project-setuper")
		?.extensionPath + "\\settings.json";

export function initProject() {
	var settingJson = JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
	var projectsJson = settingJson.projects;
	vscode.window
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
				if (!vscode.workspace.workspaceFolders) {
					vscode.window.showWarningMessage("Open folder to continue!");
					return;
				}
				for (let i = 0; i < projectsJson.length; i++) {
					if (projectsJson[i].name === selection) {
						selectedProject(projectsJson[i].path);
					}
				}
			}
		});
}

function selectedProject(path: string) {
	var settingJson = JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
	var currentPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
	if (currentPath) {
		ncp(path, String(currentPath), err => {
			if (err) {
				vscode.window.showErrorMessage(String(err));
				return;
			} else {
				vscode.window.showInformationMessage(String("Success!"));
			}
		});
	}
}
