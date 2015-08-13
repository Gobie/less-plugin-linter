less-plugin-linter
=======================

LESS Linter which lints LESS files **not** CSS.

## lessc usage

```
npm install -g less-plugin-linter
```

and then on the command line,

```
lessc file.less --linter
```

## Programmatic usage

```
var linter-plugin = require('less-plugin-linter');
less.render(lessString, { plugins: [linter-plugin] })
```
