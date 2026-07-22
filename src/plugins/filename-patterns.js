/**
 * VS Code icon themes can only match whole file names or dot-separated
 * extensions, so patterns like "*Interface.php" or "Abstract*.php" cannot be
 * declared statically. Each rule below is resolved at runtime by scanning the
 * workspace and writing the concrete file names it found into the theme's
 * fileNames map.
 *
 * Every pattern is a file name containing exactly one "*" wildcard, which never
 * matches a path separator. When a file name matches several rules the last
 * matching rule wins, so the more specific rule goes later in the list.
 *
 * Kept free of any `vscode` import so the validation scripts can load it too.
 */
const CONFIG_SECTION = 'jetbrains-file-icon-theme-php';

const RULES = [
    {
        settingKey: 'enableGoTestIcons',
        defaultEnabled: false,
        patterns: ['*_test.go'],
        darkIconId: 'file_go_test',
        lightIconId: 'file_go_test_light',
    },
    {
        settingKey: 'enablePhpAbstractIcons',
        defaultEnabled: true,
        patterns: ['Abstract*.php', 'Base*.php'],
        darkIconId: 'file_php_abstract',
        lightIconId: 'file_php_abstract_light',
    },
    {
        settingKey: 'enablePhpServiceIcons',
        defaultEnabled: true,
        patterns: ['*Service.php'],
        darkIconId: 'file_php_service',
        lightIconId: 'file_php_service_light',
    },
    {
        settingKey: 'enablePhpProviderIcons',
        defaultEnabled: true,
        patterns: ['*Provider.php'],
        darkIconId: 'file_php_provider',
        lightIconId: 'file_php_provider_light',
    },
    {
        settingKey: 'enablePhpInterfaceIcons',
        defaultEnabled: true,
        patterns: ['*Interface.php'],
        darkIconId: 'file_php_interface',
        lightIconId: 'file_php_interface_light',
    },
    {
        settingKey: 'enablePhpTraitIcons',
        defaultEnabled: true,
        patterns: ['*Trait.php'],
        darkIconId: 'file_php_trait',
        lightIconId: 'file_php_trait_light',
    },
    {
        settingKey: 'enablePhpTestIcons',
        defaultEnabled: true,
        patterns: ['*Test.php'],
        darkIconId: 'file_php_test',
        lightIconId: 'file_php_test_light',
    },
];

/**
 * VS Code lower-cases fileNames keys on both sides of the lookup, so patterns
 * are matched case-insensitively here too.
 */
const matchesPattern = (fileName, pattern) => {
    const [head, tail] = pattern.toLowerCase().split('*');
    const lower = fileName.toLowerCase();

    return lower.length >= head.length + tail.length && lower.startsWith(head) && lower.endsWith(tail);
};

/**
 * True when a file name is owned by some rule, i.e. the plugin may add or remove
 * its fileNames entry. Rules the user disabled still count here, otherwise
 * turning one off would leave its entries behind forever.
 */
const isManagedFileName = (fileName) =>
    RULES.some((rule) => rule.patterns.some((pattern) => matchesPattern(fileName, pattern)));

module.exports = { CONFIG_SECTION, RULES, matchesPattern, isManagedFileName };
