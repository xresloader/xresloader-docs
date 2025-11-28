---
title: Lua 读表代码（lua-protobuf 运行时）
description: 使用 xres-code-generator 结合 lua-protobuf 模块读取导出的配置数据
---
# Lua（lua-protobuf）集成指南

## 准备与生成

1. 构建并安装 [lua-protobuf](https://github.com/starwing/lua-protobuf)，确保 `pb` 模块可被 `require`。
2. 复制运行时代码并生成读表索引：

```bash
REPO_DIR=$PATH_TO_xres_code_generator
mkdir -p "$REPO_DIR/sample/lua-protobuf"
cp -rvf "$REPO_DIR/template/common/lua-protobuf/"*.lua "$REPO_DIR/sample/lua-protobuf"
cp -rvf "$REPO_DIR/template/common/lua/vardump.lua" "$REPO_DIR/sample/lua-protobuf"

PYTHON_BIN="$(which python3 2>/dev/null || which python)"
"$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" \
    -i "$REPO_DIR/template" \
    -p "$REPO_DIR/sample/sample.pb" \
    -o "$REPO_DIR/sample/lua-protobuf" \
    -g "$REPO_DIR/template/DataTableCustomIndexUpb.lua.mako:DataTableCustomIndexLuaProtobuf.lua" \
    "$@"
```

## 示例调用

```lua
local pb = require('pb')

local function load_pb(file_path)
    local f = assert(io.open(file_path, 'rb'))
    pb.load(f:read('a'))
    f:close()
end

load_pb('pb_header_v3.pb')
load_pb('sample.pb')

local excel_config_service = require('DataTableServiceLuaProtobuf')
excel_config_service:ReloadTables()

local current_group = excel_config_service:GetCurrentGroup()
local role_upgrade_cfg = excel_config_service:GetByGroup(current_group, 'role_upgrade_cfg')
for _, v in ipairs(role_upgrade_cfg:GetByIndex('id', 10001)) do
    print(string.format('\tid=%s, level=%s', tostring(v.Id), tostring(v.Level)))
end
```

## 核心接口

lua-protobuf 运行时沿用与 upb 版一致的服务/索引 API，只是解码交由 `pb` 模块完成：

```lua
local DataTableService = {
    BufferLoader = function(path)
        local f = assert(io.open(path, "rb"))
        local data = f:read("a"); f:close(); return data
    end
}

function DataTableService:ReloadTables()
    self.__current_group = self:LoadTables(function(desc, bytes)
        return pb.decode(desc, bytes)
    end)
end
```

`DataTableSet` 也会暴露 `GetByIndex`、`ContainsIndex`、`GetMessageDescriptor` 等方法，便于遍历字段或调试结构：

```lua
function DataTableSet:GetByIndex(index_name, ...)
    -- 返回 list/map，元素为 pb.decode 后的 table
end

function DataTableSet:GetMessageDescriptor()
    return self.__message_descriptor
end
```
