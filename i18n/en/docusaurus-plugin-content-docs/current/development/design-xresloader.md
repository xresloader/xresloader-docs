---
title: xresloader design
description: Internal architecture of the conversion engine
---

# Conversion engine design {#转表引擎设计模型}

The engine is a command-line foundation for integration with other tools. Its pipeline supports multiple input sources and output formats while reusing cached data:

1. Read command-line arguments or stdin to determine the conversion-rule source and output type.
2. Select a rule parser for the supplied configuration and construct input and output settings.
3. Select the input schema module, read the data structure, and combine it with Excel column names to build an abstract syntax tree (AST). This turns a flat spreadsheet description into a structured data model.
4. Read each source row, construct structured records and validate them. This stage can also adapt data to the target representation.
5. Select the output module and write the results to files.

<div className="diagram-panel">

![Conversion engine modules and pipeline](/img/en/development/xresloader-architecture.svg)

</div>
