import * as vscode from "vscode";
import { initProject } from "./commands/initProject";
import { addNewProject } from "./commands/addNewProject";
import { editProject } from "./commands/editProject";
import { deleteProject } from "./commands/deleteProject";

function activate(context: vscode.ExtensionContext) {
	var commands = [
		vscode.commands.registerCommand("project-setuper.initProject", initProject),
		vscode.commands.registerCommand(
			"project-setuper.addNewProject",
			addNewProject
		),
		vscode.commands.registerCommand("project-setuper.editProject", editProject),
		vscode.commands.registerCommand(
			"project-setuper.deleteProject",
			deleteProject
		),
	];

	commands.forEach(function (command) {
		context.subscriptions.push(command);
	});
}

exports.activate = activate;
