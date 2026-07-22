const vscode = require('vscode');
const path = require('path');
const fs = require('fs/promises');
const { constants: fsConstants } = require('fs');
const { CONFIG_SECTION, RULES, isManagedFileName } = require('./filename-patterns');

const REFRESH_DEBOUNCE_MS = 150;

class FilenamePatternIconsPlugin {
    constructor() {
        this.outputChannel = vscode.window.createOutputChannel('JetBrains File Icon Theme');
        this.refreshTimer = null;
        this.refreshInFlight = Promise.resolve();
        this.context = null;
        this.themePaths = null;
        this.hasShownWriteWarning = false;
    }

    activate(context) {
        this.context = context;
        this.themePaths = this.getThemePaths(context.extensionPath);

        this.outputChannel.appendLine('Filename Pattern Icons Plugin activated');

        const refreshCommand = () => {
            this.outputChannel.appendLine('Manual refresh triggered');
            this.scheduleRefresh();
        };

        context.subscriptions.push(
            this.outputChannel,
            vscode.commands.registerCommand('jetbrains-file-icon-theme.updateFilenamePatternIcons', refreshCommand),
            vscode.commands.registerCommand('jetbrains-file-icon-theme.updateGoTestIcons', refreshCommand),
            vscode.workspace.onDidChangeConfiguration((event) => {
                const affected = RULES.some((rule) =>
                    event.affectsConfiguration(`${CONFIG_SECTION}.${rule.settingKey}`)
                );

                if (affected) {
                    this.outputChannel.appendLine('Configuration changed');
                    this.scheduleRefresh();
                }
            }),
            vscode.workspace.onDidCreateFiles((event) => {
                this.outputChannel.appendLine(`Files created: ${event.files.length}`);
                this.scheduleRefresh();
            }),
            vscode.workspace.onDidDeleteFiles((event) => {
                this.outputChannel.appendLine(`Files deleted: ${event.files.length}`);
                this.scheduleRefresh();
            }),
            vscode.workspace.onDidRenameFiles((event) => {
                this.outputChannel.appendLine(`Files renamed: ${event.files.length}`);
                this.scheduleRefresh();
            })
        );

        this.scheduleRefresh();
    }

    getThemePaths(extensionPath) {
        const themePath = path.join(extensionPath, 'themes');
        return {
            dark: path.join(themePath, 'dark-jetbrains-icon-theme.json'),
            light: path.join(themePath, 'light-jetbrains-icon-theme.json'),
            auto: path.join(themePath, 'auto-jetbrains-icon-theme.json'),
        };
    }

    scheduleRefresh() {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
        }

        this.refreshTimer = setTimeout(() => {
            this.refreshTimer = null;
            this.refreshInFlight = this.refreshInFlight
                .then(() => this.refreshPatternIcons())
                .catch((error) => {
                    this.outputChannel.appendLine(`Refresh failed: ${error.message}`);
                    if (error.stack) {
                        this.outputChannel.appendLine(error.stack);
                    }
                });
        }, REFRESH_DEBOUNCE_MS);
    }

    async refreshPatternIcons() {
        const matches = await this.resolveWorkspaceMatches();
        this.outputChannel.appendLine(`Resolved ${matches.size} unique pattern-matched file names`);

        await this.syncAllThemes(matches);
    }

    /**
     * @returns {Promise<Map<string, object>>} file name -> matching rule
     */
    async resolveWorkspaceMatches() {
        const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
        const matches = new Map();

        for (const rule of RULES) {
            const enabled = config.get(rule.settingKey, rule.defaultEnabled);
            this.outputChannel.appendLine(`${rule.settingKey}: ${enabled}`);

            if (!enabled) {
                continue;
            }

            for (const pattern of rule.patterns) {
                const files = await vscode.workspace.findFiles(`**/${pattern}`);
                for (const file of files) {
                    matches.set(path.basename(file.fsPath), rule);
                }
            }
        }

        return matches;
    }

    async syncAllThemes(matches) {
        const writable = await this.ensureThemesAreWritable();
        if (!writable) {
            return;
        }

        await this.syncThemeFile(this.themePaths.dark, { matches, iconIdKey: 'darkIconId' });
        await this.syncThemeFile(this.themePaths.light, { matches, iconIdKey: 'lightIconId' });
        await this.syncThemeFile(this.themePaths.auto, {
            matches,
            iconIdKey: 'darkIconId',
            lightIconIdKey: 'lightIconId',
        });
    }

    async ensureThemesAreWritable() {
        try {
            await Promise.all(
                Object.values(this.themePaths).map((themePath) => fs.access(themePath, fsConstants.W_OK))
            );
            return true;
        } catch (error) {
            const message =
                'Pattern icons cannot update theme files in the installed extension directory. ' +
                'This can happen in read-only or remote environments.';

            this.outputChannel.appendLine(message);
            this.outputChannel.appendLine(error.message);

            if (!this.hasShownWriteWarning) {
                this.hasShownWriteWarning = true;
                void vscode.window.showWarningMessage(message);
            }

            return false;
        }
    }

    async syncThemeFile(themePath, options) {
        const theme = await this.readTheme(themePath);
        if (!theme) {
            return;
        }

        let changed = this.syncFileNamesMap(theme, options.matches, options.iconIdKey);

        if (options.lightIconIdKey) {
            if (!theme.light || typeof theme.light !== 'object') {
                theme.light = {};
                changed = true;
            }

            changed = this.syncFileNamesMap(theme.light, options.matches, options.lightIconIdKey) || changed;
        }

        if (!changed) {
            this.outputChannel.appendLine(`Theme already up to date: ${path.basename(themePath)}`);
            return;
        }

        await fs.writeFile(themePath, `${JSON.stringify(theme, null, 4)}\n`, 'utf8');
        this.outputChannel.appendLine(`Theme synchronized: ${path.basename(themePath)}`);
    }

    async readTheme(themePath) {
        try {
            const raw = await fs.readFile(themePath, 'utf8');
            return JSON.parse(raw);
        } catch (error) {
            this.outputChannel.appendLine(`Failed to read ${themePath}: ${error.message}`);
            return null;
        }
    }

    syncFileNamesMap(target, matches, iconIdKey) {
        const current = target.fileNames && typeof target.fileNames === 'object'
            ? target.fileNames
            : {};

        const next = {};

        for (const [fileName, value] of Object.entries(current)) {
            if (!isManagedFileName(fileName)) {
                next[fileName] = value;
            }
        }

        for (const fileName of Array.from(matches.keys()).sort()) {
            const iconId = matches.get(fileName)[iconIdKey];
            if (iconId) {
                next[fileName] = iconId;
            }
        }

        const changed = !this.shallowEqual(current, next);
        if (changed || !target.fileNames) {
            target.fileNames = next;
        }

        return changed;
    }

    shallowEqual(left, right) {
        const leftKeys = Object.keys(left);
        const rightKeys = Object.keys(right);

        if (leftKeys.length !== rightKeys.length) {
            return false;
        }

        for (const key of leftKeys) {
            if (left[key] !== right[key]) {
                return false;
            }
        }

        return true;
    }

    deactivate() {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
            this.refreshTimer = null;
        }

        this.outputChannel.dispose();
    }
}

module.exports = FilenamePatternIconsPlugin;
