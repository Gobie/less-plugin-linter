# less-plugin-linter

LESS Linter which lints LESS files **not** CSS.

## Install

```
npm install -g less-plugin-linter
```

## Programmatic usage

```
var LinterPlugin = require('less-plugin-linter');
less.render(lessString, { plugins: [
    new LinterPlugin({
        ignored: ['path/to/file'],
        rules: {
            'empty-ruleset': false,
            'duplicate-property': true,
            'custom-rule': require('less-plugin-lint-custom-rule')
        }
    })
] });
```

## Options

### ignored
List of ignored files to skip during linting.
optional, array of string, default value is empty array

### rules
Map of rule names mapped to enabled state or function, which acts as enabled.
optional, object, default value is all rules enabled

## List of rules

- empty-ruleset
- duplicate-property