# JetBrains New UI File Icon Theme — PHP Optimized

A PHP-optimized version of the **JetBrains New UI File Icon Theme Extended**.

Everything from the original theme, plus composite icons that tell PHP files apart at a glance by the role their name implies — base classes, interfaces, traits and tests each get the `php` icon with a distinct badge.

## Based on

This is a derivative of [JetBrains New UI File Icon Theme Extended](https://marketplace.visualstudio.com/items?itemName=fogio.jetbrains-file-icon-theme) by **fogio** — all of the original icon work, folder mappings and the JetBrains Mono font integration come from there.

- VS Code Marketplace: [fogio.jetbrains-file-icon-theme](https://marketplace.visualstudio.com/items?itemName=fogio.jetbrains-file-icon-theme)
- Open VSX: [fogio/jetbrains-file-icon-theme](https://open-vsx.org/extension/fogio/jetbrains-file-icon-theme)
- Source: [fogio-org/vscode-jetbrains-file-icon-theme](https://github.com/fogio-org/vscode-jetbrains-file-icon-theme)

The badges below track the original extension, not this version:

![VS Code Marketplace Version](https://vsmarketplacebadges.dev/version-short/fogio.jetbrains-file-icon-theme.svg?style=for-the-badge&colorA=555555&colorB=007ec6&label=VERSION)&nbsp;
![VS Code Marketplace Rating](https://vsmarketplacebadges.dev/rating-short/fogio.jetbrains-file-icon-theme.svg?style=for-the-badge&colorA=555555&colorB=007ec6&label=RATING)&nbsp;
![VS Code Marketplace Downloads](https://vsmarketplacebadges.dev/downloads-short/fogio.jetbrains-file-icon-theme.svg?style=for-the-badge&colorA=555555&colorB=007ec6&label=DOWNLOADS)&nbsp;
![VS Code Marketplace Installs](https://vsmarketplacebadges.dev/installs-short/fogio.jetbrains-file-icon-theme.svg?style=for-the-badge&colorA=555555&colorB=007ec6&label=INSTALLS)

If you do not need the PHP additions, please install the original — it is the one that gets the upstream updates.

## What this version adds

| File name | Icon |
| :--- | :--- |
| `Abstract*.php`, `Base*.php` | `php` + amber **A** badge |
| `*Service.php` | `php` + teal **S** badge |
| `*Provider.php` | `php` + pink **P** badge |
| `*Interface.php` | `php` + green ring badge |
| `*Trait.php` | `php` + purple **T** badge |
| `*Test.php` | `php` + the JetBrains run/test badge |

All six are enabled by default and can be turned off individually — see [PHP icons for interfaces, traits, base classes and tests](#php-icons-for-interfaces-traits-base-classes-and-tests) below.

Everything else — every other file and folder icon, the light/dark/auto variants, the experimental Go test icons — behaves exactly as it does upstream.

---

Compatible extensions from the original author

| <img src="https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-file-icon-theme/refs/heads/master/assets/img/icon.png" width="75"> | <img src="https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-product-icon-theme/refs/heads/master/assets/img/icon.png" width="75"> | <img src="https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-color-theme/refs/heads/master/assets/img/icon.png" width="75"> |
| :---: | :---: | :---: |
| JetBrains New UI<br>**File Icon Theme** | JetBrains New UI<br>**Product Icon Theme** | JetBrains New UI<br>**Color Theme** |
| [Original](https://marketplace.visualstudio.com/items?itemName=fogio.jetbrains-file-icon-theme) — this version is based on it | [Install](https://marketplace.visualstudio.com/items?itemName=fogio.jetbrains-product-icon-theme) | [Install](https://marketplace.visualstudio.com/items?itemName=fogio.jetbrains-color-theme) |

---

## Preview

### Folders icons

![Preview folders icons](https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-file-icon-theme/refs/heads/master/assets/img/preview_folders.png)

### File extensions icons

![Preview file extensions icons](https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-file-icon-theme/refs/heads/master/assets/img/preview_file_extensions.png)

### File names icons

Icons for reserved file names

![Preview file names icons](https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-file-icon-theme/refs/heads/master/assets/img/preview_file_names.png)

### Icons for PHP interfaces, traits, base classes and tests

Added by this version — see [What this version adds](#what-this-version-adds) above. Enabled by default, activation guide is located below.

### Icons for go test files (experimental)

![Preview go test files](https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-file-icon-theme/refs/heads/master/assets/img/preview_go_test_files.png)

Activation guide is located below.

## Install

### File icon theme

![Select theme](https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-file-icon-theme/refs/heads/master/assets/img/guide_select_theme.png)

You can choose icons pack for dark or light theme. An "Auto" theme is also available that adapts to the color theme.

### PHP icons for interfaces, traits, base classes and tests

These are enabled by default. Each one can be turned off individually through the Settings UI, or in your settings.json file:

```json
"jetbrains-file-icon-theme-php.enablePhpAbstractIcons": false,
"jetbrains-file-icon-theme-php.enablePhpServiceIcons": false,
"jetbrains-file-icon-theme-php.enablePhpProviderIcons": false,
"jetbrains-file-icon-theme-php.enablePhpInterfaceIcons": false,
"jetbrains-file-icon-theme-php.enablePhpTraitIcons": false,
"jetbrains-file-icon-theme-php.enablePhpTestIcons": false,
```

A file name that matches more than one pattern gets the most specific icon, so `AbstractUserTest.php` is a test, `AppServiceProvider.php` is a provider and `UserRepositoryInterface.php` is an interface.

These use the same workaround as the Go test icons described below: the theme files are rewritten in place. The themes declare `_watch`, so VS Code reloads them as soon as they change and new files get their icon without a window reload.

### Enable Icons for go test files (experimental)

VS Code does not allow defining an icon for a file using a regular expression. However, we have implemented a workaround for this.

This feature is experimental, in case of any problems we are waiting for an issue to solve the problem as quickly as possible

By default, this functionality is disabled. You can enable it through the Settings UI:

![guide_enable_go_test_icons](https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-file-icon-theme/refs/heads/master/assets/img/guide_enable_go_test_icons.png)

or settings.json file:

```json
"jetbrains-file-icon-theme-php.enableGoTestIcons": true,
```

After enabling this setting, the theme begins to automatically add *_test.go files with a special icon. Upstream this required an IDE restart, because VS Code caches the generated icon stylesheet. This version marks its themes with `_watch`, so VS Code re-reads them whenever they are rewritten and the icons show up right away.

So if you added a new file _test.go, you will see a special icon for it only after you reload the window. Of course you can do it via interface or command `> Developer: Reload Window`

### Font

You can use [JetBrains Mono](https://www.jetbrains.com/lp/mono/) font with the JetBrains New UI File Icon Theme Extended.

VS Code doesn't provide clear functionality for adding a custom font to color theme... But I managed to add the font to the File icon theme!

> **Important! To use the JetBrains Mono font, the File Icon Theme must be set!**

Then there are 2 ways to enable the new font:

#### Settings UI

![Change font in settings UI](https://raw.githubusercontent.com/fogio-org/vscode-jetbrains-file-icon-theme/refs/heads/master/assets/img/guide_change_font_settings_ui.jpg)

> **It is very important to specify the font family exactly `JetBrainsMono`, without spaces!**

#### settings.json file

Add the following line to your settings.json file:

```json
"editor.fontFamily": "JetBrainsMono, Consolas, 'Courier New', monospace",
```

#### Extras

Also, there are some additional settings that you can apply both in the Settings UI and in settings.json file:

```json
"editor.fontSize": 13,
"editor.fontLigatures": true, // ">=" to "≥" etc
"terminal.integrated.fontFamily": "JetBrainsMono",
"terminal.integrated.fontSize": 13,
```

## Credits

This version is built on top of **JetBrains New UI File Icon Theme Extended** by [fogio](https://github.com/fogio-org) — the original theme, its icon set and the font integration are their work, used under the MIT license. Only the PHP composite icons and the filename-pattern plugin that drives them were added here.

- Original extension: [marketplace.visualstudio.com/items?itemName=fogio.jetbrains-file-icon-theme](https://marketplace.visualstudio.com/items?itemName=fogio.jetbrains-file-icon-theme)
- Original repository: [github.com/fogio-org/vscode-jetbrains-file-icon-theme](https://github.com/fogio-org/vscode-jetbrains-file-icon-theme)

Deep gratitude also goes to the JetBrains team for their work. Here are links to open resources used to create the original theme:

- JetBrains icons: [https://jetbrains.design/intellij/resources/icons_list/](https://jetbrains.design/intellij/resources/icons_list/)
- JetBrains Mono font: [https://www.jetbrains.com/lp/mono/](https://www.jetbrains.com/lp/mono/)
