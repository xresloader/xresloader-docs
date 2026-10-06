---
title: Data loader generation
description: xres-code-generator usage and language integrations
---
# Generate loaders with xres-code-generator {#使用-xres-code-generator-生成读表代码}

[xres-code-generator](https://github.com/xresloader/xres-code-generator) uses [Mako](https://www.makotemplates.org/) templates to read `.pb` descriptors exported for [xresloader](https://github.com/xresloader/xresloader) and generate data loaders for multiple languages.

- Conversion engine: [https://github.com/xresloader/xresloader](https://github.com/xresloader/xresloader)
- Loader generator: [https://github.com/xresloader/xres-code-generator](https://github.com/xresloader/xres-code-generator)

> Complete [Quick start](./quick-start) first and check the bin and descriptor. These examples use the .bytes suffix; keep paths consistent with your actual output.

**Generated loaders and indexed queries are the recommended approach for production projects.** See [Recommended loading](./data-loading#使用-xres-code-generator-加载最推荐) for short C++ and native Lua examples.

## Shared prerequisites {#公共前置步骤}

### Import loader extensions {#引入扩展声明}

Every `.proto` that needs a generated loader must `import "xrescode_extensions_v3.proto"` and set the message-level `option (xrescode.loader)`. The extension is in `xres-code-generator/pb_extension/`:

```protobuf
syntax = "proto3";
import "xrescode_extensions_v3.proto";

message role_upgrade_cfg {
    option (xrescode.loader) = {
        file_path : "role_upgrade_cfg.bytes"
        indexes : {
            fields : "Id"
            index_type : EN_INDEX_KL // Key-List index
        }
        indexes : {
            fields : "Id"
            fields : "Level"
            index_type : EN_INDEX_KV // Key-Value index
        }
        tags : "client"
        tags : "server"
    };

    uint32 Id = 1;
    uint32 Level = 2;
    uint32 CostType = 3;
    int32 CostValue = 4;
    int32 ScoreAdd  = 5;
}
```

### Generate the .pb descriptor {#生成-pb-描述文件}

```bash
REPO_DIR=$PATH_TO_xres_code_generator
PROTOC_BIN="$(which protoc)"
"$PROTOC_BIN" \
    -I "$REPO_DIR/sample/proto" \
    -I "$REPO_DIR/pb_extension" \
    --include_imports \
    "$REPO_DIR/sample/proto/"*.proto \
    -o "$REPO_DIR/sample/sample.pb"
```

Upstream sample/proto includes pb_header_v3.proto. Include that wrapper, loader options and their dependencies in your project descriptor. The starter kind.pb contains only business messages and cannot replace this step.

### Common xrescode-gen.py options {#xrescode-genpy-常用参数}

- `-i`: template root (usually `xres-code-generator/template`)
- `-p`: input `.pb` descriptor
- `-o`: output directory
- `-g/-l/-f`: templates and output paths; `-f prefix:template:relative_output` controls filenames precisely
- `--set key=value`: inject a template variable
- `--add-path dir`: extend the template search path

To generate all examples, run `xres-code-generator/sample/sample_gen.sh`. It:

1. Copies runtime dependencies for each language.
2. Uses `tools/find_protoc.py` to select `protoc`.
3. Runs `xrescode-gen.py` for C++, UE, multiple Lua integrations and C#.
4. Generates sample entrypoints such as `main.cpp` and `main.lua`.

## Languages and ecosystems {#语言与生态}

Each integration has its own commands and API reference:

- [C++ (native projects)](xres-code-generator/cpp.md)
- [Unreal Engine / Blueprint](xres-code-generator/unreal.md)
- [Lua (native tables)](xres-code-generator/lua.md)
- [C# / Unity](xres-code-generator/csharp.md)
- [Lua (upb runtime)](xres-code-generator/lua-upb.md)
- [Lua (lua-protobuf runtime)](xres-code-generator/lua-protobuf.md)
- [Golang](xres-code-generator/golang.md)

## Custom templates and extensions {#自定义模板与扩展}

Official templates are in `xres-code-generator/template`. To customize them:

- Copy and adapt an existing template.
- Pass custom variables with `--set`.
- Add template directories with `--add-path`.

In CI/CD, invoke `xrescode-gen.py` alongside xresloader export so that data, descriptors and loaders use the same schema. File extensions are project-defined; the starter uses `.bin`.
