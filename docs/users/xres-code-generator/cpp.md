---
title: C++ 读表代码
description: 使用 xres-code-generator 在原生 C++ 项目中生成读表管理器与索引 API
---
# C++ 集成指南

本文介绍如何在原生 C++ 工程中使用 xres-code-generator 生成配置读取代码，并展示生成后的核心接口。

## 模板准备

```bash
REPO_DIR=$PATH_TO_xres_code_generator
mkdir -p "$REPO_DIR/sample/pbcpp"
cp -rvf "$REPO_DIR/template/common/cpp/"* "$REPO_DIR/sample/pbcpp"
```

若希望将生成文件放入子目录，可结合 `--set cpp_include_prefix=config/excel/` 之类的参数来控制 `#include` 路径。

## 生成命令

```bash
PYTHON_BIN="$(which python3 2>/dev/null || which python)"
"$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" \
    -i "$REPO_DIR/template" \
    -p "$REPO_DIR/sample/sample.pb" \
    -o "$REPO_DIR/sample/pbcpp" \
    -g "$REPO_DIR/template/config_manager.h.mako" \
    -g "$REPO_DIR/template/config_manager.cpp.mako" \
    -g "$REPO_DIR/template/config_easy_api.h.mako" \
    -g "$REPO_DIR/template/config_easy_api.cpp.mako" \
    -l "H:$REPO_DIR/template/config_set.h.mako" \
    -l "S:$REPO_DIR/template/config_set.cpp.mako" \
    "$@"
```

## 运行示例

```cpp
#include "config_manager.h"
#include "config_easy_api.h"

int main() {
    excel::config_manager::me()->init();
    // 可自行设置版本、日志、加载回调
    // excel::config_manager::me()->set_buffer_loader(...);
    excel::config_manager::me()->reload();

    auto cfg = excel::get_role_upgrade_cfg_by_id_level(10001, 3);
    if (cfg) {
        printf("%s\n", cfg->DebugString().c_str());
    }
    return 0;
}
```

## 核心接口

### config_manager

生成的 `config_manager` 负责生命周期、热更与事件注册：

```cpp
class config_manager {
public:
  using read_buffer_func_t = std::function<bool(std::string&, const char* path)>;
  using read_version_func_t = std::function<bool(std::string&)>;
  using on_not_found_func_t = std::function<void(const on_not_found_event_data_t&)>;

  int init(bool enable_multithread_lock = true);
  int reload();
  void set_buffer_loader(read_buffer_func_t fn);
  void set_version_loader(read_version_func_t fn);
  void set_group_number(size_t sz);
  void set_on_not_found(on_not_found_func_t func);
  const config_group_ptr_t& get_current_config_group();
};
```

### config_easy_api

每张表都会对应一组便捷函数，支持多索引读取：

```cpp
namespace excel {
EXCEL_CONFIG_LOADER_API const excel_config_type_traits::shared_ptr<config_group_t>&
    get_current_config_group() noexcept;

EXCEL_CONFIG_LOADER_API std::size_t get_role_upgrade_cfg_version();

EXCEL_CONFIG_LOADER_API excel_config_type_traits::shared_ptr<
    const std::vector<excel_config_type_traits::shared_ptr<const ::role_upgrade_cfg>>>
    get_role_upgrade_cfg_by_id(uint32_t Id);

EXCEL_CONFIG_LOADER_API excel_config_type_traits::shared_ptr<const ::role_upgrade_cfg>
    get_role_upgrade_cfg_by_id_level(uint32_t Id, uint32_t Level);
}
```

### config_set_role_upgrade_cfg

内部还会生成 `config_set_role_upgrade_cfg`，负责维护 `Id`、`IdLevel`、`IdCosttype` 等索引字典并在 `reload` 时填充，用于支持线程安全的只读查询。
