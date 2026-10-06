---
title: Native Lua data loaders
description: Generate managers and indexes for native Lua tables
---
# Native Lua table integration {#lua原生-table集成指南}

DataTableService53 uses standard Lua `require` to load tables exported by xresloader `-t lua`, then builds indexes from generated DataTableCustomIndex53 settings. No C protobuf module is needed. For binary data, see [upb](./lua-upb) or [lua-protobuf](./lua-protobuf). See [Recommended loading](../data-loading#使用-xres-code-generator-加载最推荐) for a short indexed-query example.

## Templates and generation {#模板与生成}

```bash
REPO_DIR=$PATH_TO_xres_code_generator
mkdir -p "$REPO_DIR/sample/pblua"
cp -rvf "$REPO_DIR/template/common/lua/"*.lua "$REPO_DIR/sample/pblua"
PYTHON_BIN="$(which python3 2>/dev/null || which python)"
"$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" \
    -i "$REPO_DIR/template" \
    -p "$REPO_DIR/sample/sample.pb" \
    -o "$REPO_DIR/sample/pblua" \
    -g "$REPO_DIR/template/DataTableCustomIndex.lua.mako" \
    -g "$REPO_DIR/template/DataTableCustomIndex53.lua.mako" \
    "$@"
```

## Usage example {#运行示例}

```lua
package.path = '../../../xresloader/sample/proto_v3/?.lua;' .. package.path
local excel_config_service = require('DataTableService53')
excel_config_service:ReloadTables()

local role_upgrade_cfg = excel_config_service:Get('role_upgrade_cfg')
local data = role_upgrade_cfg:GetByIndex('id_level', 10001, 3)
print(data.ScoreAdd)
```

Use `DataTableService:GetCurrentGroup()` and `GetByGroup()` to keep multiple versions available.

## Core interfaces {#核心接口}

### DataTableService53 {#datatableservice53}

```lua
local DataTableService = {
    MaxGroupNumber = 5,
    OverrideSameVersion = true,
    VersionLoader = function() return "" end,
    OnError = nil
}

function DataTableService:Get(loader_name)
    return self.__current_group[loader_name]
end

function DataTableService:GetCurrentGroup()
    return self.__current_group
end

function DataTableService:GetByGroup(group, loader_name)
    return group[loader_name]
end

function DataTableService:ReloadTables()
    self.__current_group = self:LoadTables()
end
```

### DataTableSet {#datatableset}

```lua
function DataTableSet:GetByIndex(index_name, ...)
    -- Return a list or one record according to the index definition
end

function DataTableSet:ContainsIndex(index_name, ...)
    -- Check the key in the index and invoke OnError when applicable
end
```

`DataTableCustomIndex.lua` and `DataTableCustomIndex53.lua` record each index’s key fields, sort order and source files for lazy loading by `DataTableSet`.
