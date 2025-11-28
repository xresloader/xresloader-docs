---
title: C# / Unity 读表代码
description: 使用 xres-code-generator 在 .NET 或 Unity 中生成 ConfigSet 管理器
---
# C# / Unity 集成指南

## 生成命令

```bash
REPO_DIR=$PATH_TO_xres_code_generator
mkdir -p "$REPO_DIR/sample/pbcs"
cp -rvf "$REPO_DIR/template/common/cs/"* "$REPO_DIR/sample/pbcs"
PYTHON_BIN="$(which python3 2>/dev/null || which python)"
"$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" \
    -i "$REPO_DIR/template" \
    -p "$REPO_DIR/sample/sample.pb" \
    -o "$REPO_DIR/sample/pbcs" \
    -g "$REPO_DIR/template/ConfigSet.cs.mako" \
    -l "$REPO_DIR/template/ConfigSetManager.cs.mako" \
    "$@"
```

## 运行示例

```csharp
using excel;

ConfigSetManager.Instance.Reload();
var table = ConfigSetRoleUpgradeCfg.Instance.GetByIdLevel(10001, 3);
if (table != null) {
    Console.WriteLine(table.ToString());
}
```

在 Unity 场景中，可直接把生成的 `.cs` 文件放入 `Assets`，并在 `Awake`/`Start` 中调用 `ConfigSetManager.Instance.Reload()`。

## 核心接口

### ConfigSetManager

```csharp
public class ConfigSetManager {
    public Func<string, byte[]> Loader { get; set; } = DefaultLoader;
    public Action<string> LogHandler { get; set; } = DefaultLogHandler;

    public void Reload() {
        Clear();
        ConfigSetRoleUpgradeCfg.Instance.Reload();
    }

    public void Clear() {
        ConfigSetRoleUpgradeCfg.Instance.Clear();
    }

    public T Parse<T>(byte[] bytes, MessageParser parser) where T : class, IMessage {
        return (T)parser.ParseFrom(bytes);
    }
}
```

### ConfigSetRoleUpgradeCfg（示例）

```csharp
public class ConfigSetRoleUpgradeCfg {
    public readonly string[] FileArray = { "role_upgrade_cfg.bytes" };

    public void Reload() {
        Clear();
        foreach (var file in FileArray) {
            Load(file);
        }
    }

    public void Clear() {
        IdData.Clear();
        IdLevelData.Clear();
        IdCosttypeData.Clear();
    }

    public List<role_upgrade_cfg> GetById(uint id) =>
        IdData.TryGetValue(id, out var list) ? list : null;

    public role_upgrade_cfg GetByIdLevel(uint id, uint level) =>
        IdLevelData.TryGetValue((id, level), out var row) ? row : null;
}
```

生成器会为每张表创建类似的 `ConfigSet*` 类，负责索引容器维护和多文件聚合。
