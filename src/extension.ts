import * as vscode from "vscode";
import { initProject } from "./commands/initProject";
import { addNewProject } from "./commands/addNewProject";
import { editProject } from "./commands/editProject";
import { deleteProject } from "./commands/deleteProject";

function activate(context: vscode.ExtensionContext) {
	var commands = [
		vscode.commands.registerCommand(
			"project-template.initProject",
			initProject
		),
		vscode.commands.registerCommand(
			"project-template.addNewProject",
			addNewProject
		),
		vscode.commands.registerCommand(
			"project-template.editProject",
			editProject
		),
		vscode.commands.registerCommand(
			"project-template.deleteProject",
			deleteProject
		),
	];

	commands.forEach(function (command) {
		context.subscriptions.push(command);
	});
}

exports.activate = activate;
