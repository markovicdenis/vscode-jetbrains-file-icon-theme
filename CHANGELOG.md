# Change Log

## 1.7.1

- Add composite PHP icons for base classes (`Abstract*.php`, `Base*.php`), services (`*Service.php`), providers (`*Provider.php`), interfaces (`*Interface.php`), traits (`*Trait.php`) and tests (`*Test.php`), enabled by default
- Declare `_watch` on all three icon themes so VS Code reloads them when the plugin rewrites them — pattern icons now appear without reloading the window, including in the "Auto" theme
- Generalize the experimental Go test icon plugin into a filename-pattern plugin that drives all of the above from a single rule table
- Add `> JetBrains Icons: Refresh Filename Pattern Icons` command; the previous `Update Go Test Icons` command still works
- Validate at build time that every filename pattern rule has matching icon definitions in all three themes and a matching setting in `package.json`

## 1.7.0

- Add dedicated icon for npm files (`package.json`, `.npmrc`, `package-lock.json`, `npm-shrinkwrap.json`, `.npmignore`)
- Add dedicated icon for license files (`LICENSE`, `LICENSE.txt`, `LICENSE.md`, `LICENSE-MIT`, `LICENSE-APACHE`, `COPYING`, `COPYRIGHT`)
- Add JetBrains IDE folder icon for AI and IDE config folders (`.claude`, `.cursor`, `.windsurf`, `.zed`, `.opencode`, `.trae`, and more)

## 1.6.0

- Add dedicated icons for GitHub folders
- Add dedicated icon for Word documents
- Add dedicated config icon for `.env` variants, isolated from other config mappings
- Add compound extension mappings for prefixed `.env` files
- Extend Dockerfile filename mappings

## 1.5.0

- Add CI and release workflows with strict manifest and icon theme validation
- Enforce strict JSON validation for icon theme files
- Fix trailing comma in auto icon theme JSON
- Rework experimental Go test icons refresh flow to batch updates and handle create, delete, and rename events more reliably
- Use extension context path instead of hardcoded extension id for Go test icon theme updates
- Improve warnings when the extension cannot write theme files in the installed environment
- Update readme badges

## 1.4.0

- Add bpmn file icon
- Add arb file icon

## 1.3.1

- Fix .env files icons

## 1.3.0

- Add Jenkinsfile icon
- Add Groovy icon

## 1.2.1

- Add compatible extensions list to readme
- Correct typo in readme

## 1.2.0

- Add support for go test custom icon (*_test.go)

## 1.1.1

- Fix main.go light icon
- Add ".vscode", ".idea" folder icon

## 1.1.0

- Add Auto dark/light theme
- Fix "docs", "run", "templates" folders light colors
- Add badges to readme
- Update displayName, description

## 1.0.0

- Initial release
