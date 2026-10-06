---
title: C# / Unity data loaders
description: Generate ConfigSet managers for .NET or Unity
---
# C# / Unity integration {#c--unity-集成指南}

## Generate code {#生成命令}

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

## Usage example {#运行示例}

```csharp
using excel;

ConfigSetManager.Instance.Reload();
var table = ConfigSetRoleUpgradeCfg.Instance.GetByIdLevel(10001, 3);
if (table != null) {
    Console.WriteLine(table.ToString());
}
```

In Unity, put the generated `.cs` files in `Assets` and call `ConfigSetManager.Instance.Reload()` from `Awake` or `Start`.

## Core interfaces {#核心接口}

### ConfigSetManager {#configsetmanager}

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

### ConfigSetRoleUpgradeCfg example {#configsetroleupgradecfg示例}

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

The generator creates a similar `ConfigSet*` class for each table to maintain indexes and aggregate multiple files.
