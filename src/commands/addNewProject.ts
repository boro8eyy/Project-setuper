import * as vscode from "vscode";
import * as fs from "fs";
import { IProject } from "../interfaces";
import { newID } from "../utils/generateID";

const settingsFilePath =
	vscode.extensions.getExtension("undefined_publisher.project-setuper")
		?.extensionPath + "\\settings.json";

export async function addNewProject() {
	var settingJson = JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
	var newProject: IProject = { name: "", path: "", ignore: [] };

	// First window of creating project
	await vscode.window
		.showInputBox({
			title: "Project path 1/3",
			placeHolder: "Enter a path to the new project",
		})
		.then(value => {
			if (value !== "" && value !== undefined) {
				newProject.path = value;
			}
			return;
		});

	if (newProject.path === "") {
		return;
	}

	// Second window of creating project
	await vscode.window
		.showInputBox({
			title: "Project name 2/3",
			placeHolder: "Enter the new project name",
		})
		.then(value => {
			if (value !== "" && value !== undefined) {
				if (
					settingJson.projects
						.map((element: IProject) => (element.name === value ? true : false))
						.some((element: boolean) => element === true)
				) {
					vscode.window.showWarningMessage(
						"You can't create a project with an already created name."
					);
					return;
				} else {
					newProject.name = value;
				}
			}
		});

	if (newProject.name === "") {
		return;
	}

	// Third window of creating project
	await vscode.window
		.showInputBox({
			title: "Enter the ignored files 3/3",
			placeHolder: "Enter a ignored files, separated by commas, without spaces",
		})
		.then(value => {
			if (value !== "" && value !== undefined) {
				value.split(",").map((element: string) => {
					newProject.ignore.push(element);
				});
			}
		});

	fs.readFile(settingsFilePath, "utf8", (err, data) => {
		if (err) {
			vscode.window.showErrorMessage(String(err));
		} else {
			var projectsJson = JSON.parse(data);
			projectsJson["projects"].push(newProject);
			var json = JSON.stringify(projectsJson, null, 4);
			fs.writeFile(settingsFilePath, json, "utf8", () => {});
		}
	});
}
