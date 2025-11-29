---
title: 读表代码生成
description: xres-code-generator 使用指南与各语言生态入口
---
# 使用 [xres-code-generator](https://github.com/xresloader/xres-code-generator) 生成读表代码

[xres-code-generator](https://github.com/xresloader/xres-code-generator) 基于 [Mako](https://www.makotemplates.org/) 模板引擎，可读取 [xresloader](https://github.com/xresloader/xresloader) 导出的 `.pb` 描述文件并生成各语言的读表逻辑。

- 转表工具仓库：[https://github.com/xresloader/xresloader](https://github.com/xresloader/xresloader)
- 读表代码生成工具仓库：[https://github.com/xresloader/xres-code-generator](https://github.com/xresloader/xres-code-generator)

> 建议先完成 `docs/users/quick-start.md` 中的流程，确保能产出 `.bytes` 与 `.pb` 文件。

## 公共前置步骤

### 引入扩展声明

所有需要生成读表代码的 `.proto` 必须 `import "xrescode_extensions_v3.proto"` 并在消息级别设置 `option (xrescode.loader)`（文件位于 `xres-code-generator/pb_extension/`）：

```protobuf
syntax = "proto3";
import "xrescode_extensions_v3.proto";

message role_upgrade_cfg {
    option (xrescode.loader) = {
        file_path : "role_upgrade_cfg.bytes"
        indexes : {
            fields : "Id"
            index_type : EN_INDEX_KL // Key-List 索引
        }
        indexes : {
            fields : "Id"
            fields : "Level"
            index_type : EN_INDEX_KV // Key-Value 索引
        }
        tags : "client"
        tags : "server"
    };

    int32 CostValue = 4;
    int32 ScoreAdd  = 5;
}
```

### 生成 `.pb` 描述文件

```bash
REPO_DIR=$PATH_TO_xres_code_generator
PROTOC_BIN="$(which protoc)"
"$PROTOC_BIN" \
    -I "$REPO_DIR/sample/proto" \
    -I "$REPO_DIR/pb_extension" \
    "$REPO_DIR/sample/proto/"*.proto \
    -o "$REPO_DIR/sample/sample.pb"
```

### xrescode-gen.py 常用参数

- `-i`：模板根目录（通常为 `xres-code-generator/template`）
- `-p`：输入的 `.pb` 描述文件
- `-o`：输出目录
- `-g/-l/-f`：指定模板与输出路径，`-f prefix:template:relative_output` 可精确控制文件名
- `--set key=value`：向模板注入自定义变量
- `--add-path dir`：扩展模板搜索路径

如需一次生成全部示例，可执行 `xres-code-generator/sample/sample_gen.sh`，脚本会：

1. 复制各语言运行时依赖；
2. 调用 `tools/find_protoc.py` 自动选择 `protoc`；
3. 针对 C++、UE、Lua（多实现）与 C# 执行 `xrescode-gen.py`；
4. 生成 `main.cpp`、`main.lua` 等示例入口。

## 语言与生态

每种语言/生态的详细命令与接口说明已拆分为独立文档，可按需查阅：

- [C++（原生工程）](xres-code-generator/cpp.md)
- [Unreal Engine / Blueprint](xres-code-generator/unreal.md)
- [Lua（标准 C protobuf 运行时）](xres-code-generator/lua.md)
- [C# / Unity](xres-code-generator/csharp.md)
- [Lua（upb 运行时）](xres-code-generator/lua-upb.md)
- [Lua（lua-protobuf 运行时）](xres-code-generator/lua-protobuf.md)

## 自定义模板与扩展

官方模板位于 `xres-code-generator/template`。可通过以下方式扩展：

- 复制现有模板并根据项目需求改写；
- 使用 `--set` 传入定制变量；
- 通过 `--add-path` 指定额外的模板目录。

在 CI/CD 流程中，可在 xresloader 导出阶段直接调用 `xrescode-gen.py`，确保 `.bytes`、`.pb` 与读表代码始终一致。
