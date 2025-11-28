---
title: Lua 读表代码（C protobuf）
description: 使用 xres-code-generator 生成基于标准 C protobuf 运行时的 Lua 配置读取服务
---
# Lua（标准运行时）集成指南

## 模板与生成

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

## 运行示例

```lua
package.path = '../../../xresloader/sample/proto_v3/?.lua;' .. package.path
local excel_config_service = require('DataTableService53')
excel_config_service:ReloadTables()

local role_upgrade_cfg = excel_config_service:Get('role_upgrade_cfg')
local data = role_upgrade_cfg:GetByIndex('id_level', 10001, 3)
print(data.ScoreAdd)
```

可搭配 `DataTableService:GetCurrentGroup()` 与 `GetByGroup()` 实现多版本共存。

## 核心接口

### DataTableService53

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

### DataTableSet

```lua
function DataTableSet:GetByIndex(index_name, ...)
    -- 根据索引定义返回 list 或单条数据
end

function DataTableSet:ContainsIndex(index_name, ...)
    -- 判断索引是否存在指定键，并在必要时触发 OnError
end
```

`DataTableCustomIndex.lua` 与 `DataTableCustomIndex53.lua` 会记录每个索引的键字段、排序方式与数据源文件，供 `DataTableSet` 延迟加载使用。
