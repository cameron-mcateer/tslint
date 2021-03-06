---
layout: page
title: Library
permalink: /usage/library/
---

### Installation ###
------------

```
npm install tslint
npm install typescript
```

{% include peer_dependencies.md %}

### Usage ###
-----

Please ensure that the TypeScript source files compile correctly _before_ running the linter.


```ts
var fileName = "Specify file name";

var configuration = {
    rules: {
        "variable-name": true,
        "quotemark": [true, "double"]
    }
};

var options = {
    formatter: "json",
    rulesDirectory: "customRules/", // can be an array of directories
    formattersDirectory: "customFormatters/",
    fix: false
};

var Linter = require("tslint").Linter;
var fs = require("fs");
var contents = fs.readFileSync(fileName, "utf8");

var linter = new Linter(options);
linter.lint(fileName, contents, configuration);
var result = linter.getResult();
```
