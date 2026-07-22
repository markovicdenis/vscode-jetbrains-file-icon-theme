const vscode = require('vscode');
const FilenamePatternIconsPlugin = require('./plugins/filename-pattern-icons');

let outputChannel = vscode.window.createOutputChannel('JetBrains File Icon Theme');
let filenamePatternIconsPlugin = null;

function activate(context) {
    outputChannel.appendLine('Extension activated');

    try {
        filenamePatternIconsPlugin = new FilenamePatternIconsPlugin();
        filenamePatternIconsPlugin.activate(context);
        outputChannel.appendLine('Filename Pattern Icons Plugin initialized successfully');
    } catch (error) {
        outputChannel.appendLine(`Error initializing Filename Pattern Icons Plugin: ${error.message}`);
        outputChannel.appendLine(error.stack);
    }
}

function deactivate() {
    if (filenamePatternIconsPlugin) {
        filenamePatternIconsPlugin.deactivate();
        filenamePatternIconsPlugin = null;
    }
    outputChannel.dispose();
}

module.exports = {
    activate,
    deactivate
};
