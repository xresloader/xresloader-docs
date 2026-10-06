---
title: Lua data loaders with lua-protobuf
description: Load exported configuration with xres-code-generator and lua-protobuf
---
# Lua integration with lua-protobuf {#lualua-protobuf集成指南}

## Preparation and generation {#准备与生成}

1. Build and install [lua-protobuf](https://github.com/starwing/lua-protobuf); ensure that `require` can load the `pb` module.
2. Copy runtime code and generate indexes:

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

## Usage example {#示例调用}

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

## Core interfaces {#核心接口}

The lua-protobuf runtime uses the same service/index APIs as upb, with decoding handled by `pb`:

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

`DataTableSet` exposes `GetByIndex`, `ContainsIndex` and `GetMessageDescriptor` for field traversal and debugging:

```lua
function DataTableSet:GetByIndex(index_name, ...)
    -- Return a list/map of tables decoded by pb.decode
end

function DataTableSet:GetMessageDescriptor()
    return self.__message_descriptor
end
```
