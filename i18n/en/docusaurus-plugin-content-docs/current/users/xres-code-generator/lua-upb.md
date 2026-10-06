---
title: Lua data loaders with upb
description: Generate Lua configuration services using upb
---
# Lua integration with upb {#luaupb集成指南}

## Preparation and generation {#准备与生成}

```bash
REPO_DIR=$PATH_TO_xres_code_generator
mkdir -p "$REPO_DIR/sample/upblua"
cp -rvf "$REPO_DIR/template/common/upblua/"*.lua "$REPO_DIR/sample/upblua"
cp -rvf "$REPO_DIR/template/common/lua/vardump.lua" "$REPO_DIR/sample/upblua"
"$PROTOC_BIN" "--lua_out=$REPO_DIR/sample/upblua" \
    --plugin=protoc-gen-lua=<PATH_TO_protoc-gen-lua> \
    "$REPO_DIR/pb_extension/xrescode_extensions_v3.proto" \
    "$REPO_DIR/sample/proto/"*.proto

PYTHON_BIN="$(which python3 2>/dev/null || which python)"
"$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" \
    -i "$REPO_DIR/template" \
    -p "$REPO_DIR/sample/sample.pb" \
    -o "$REPO_DIR/sample/upblua" \
    -g "$REPO_DIR/template/DataTableCustomIndexUpb.lua.mako" \
    "$@"
```

## Usage example {#示例调用}

```lua
local excel_config_service = require('DataTableServiceUpb')
local upb = require('upb')
excel_config_service:ReloadTables()

local role_upgrade_cfg = excel_config_service:Get('role_upgrade_cfg')
local data = role_upgrade_cfg:GetByIndex('id_level', 10001, 3)
print(upb.json_encode(data, { upb.JSONENC_PROTONAMES }))
```

## Core interfaces {#核心接口}

### DataTableServiceUpb {#datatableserviceupb}

```lua
local DataTableService = {
    BufferLoader = function(file_path)
        local f = assert(io.open(file_path, "rb"))
        local data = f:read("a"); f:close(); return data
    end,
    VersionLoader = function() return "" end,
    OnError = function(msg, ...) print("[ERROR]", msg, ...) end,
    OnInfo = function(msg, ...) print("[INFO]", msg, ...) end,
}

function DataTableService:Get(loader_name)
    return self.__current_group[loader_name]
end

function DataTableService:ReloadTables()
    self.__current_group = self:LoadTables()
end
```

### DataTableSet with upb {#datatablesetupb}

```lua
function DataTableSet:GetByIndex(index_name, ...)
    -- Query an index for a list or one record
end

function DataTableSet:ContainsIndex(index_name, ...)
    -- Check whether the key exists
end

function DataTableSet:GetMessageDescriptor()
    return self.__message_descriptor
end
```

`DataTableCustomIndexUpb.lua` contains settings such as `luaPath`, `messageName` and `keys` for lazy loading by DataTableSet.
