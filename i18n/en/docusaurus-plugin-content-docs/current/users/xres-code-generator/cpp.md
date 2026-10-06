---
title: C++ data loaders
description: Generate configuration managers and indexed APIs for native C++ projects
---
# C++ integration {#c-集成指南}

Use xres-code-generator to generate data loaders for native C++ projects. The core generated interfaces are shown below.

## Prepare templates {#模板准备}

```bash
REPO_DIR=$PATH_TO_xres_code_generator
mkdir -p "$REPO_DIR/sample/pbcpp"
cp -rvf "$REPO_DIR/template/common/cpp/"* "$REPO_DIR/sample/pbcpp"
```

For generated files in subdirectories, use an option such as `--set cpp_include_prefix=config/excel/` to control `#include` paths.

## Generate code {#生成命令}

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

## Usage example {#运行示例}

```cpp
#include "config_manager.h"
#include "config_easy_api.h"

int main() {
    excel::config_manager::me()->init();
    // Configure version, logging and loading callbacks as needed
    // excel::config_manager::me()->set_buffer_loader(...);
    excel::config_manager::me()->reload();

    auto cfg = excel::get_role_upgrade_cfg_by_id_level(10001, 3);
    if (cfg) {
        printf("%s\n", cfg->DebugString().c_str());
    }
    return 0;
}
```

## Core interfaces {#核心接口}

### config_manager {#config_manager}

The generated `config_manager` handles lifecycle, reloads and event registration:

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

### config_easy_api {#config_easy_api}

Each table has convenience functions for querying multiple indexes:

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

### config_set_role_upgrade_cfg {#config_set_role_upgrade_cfg}

The generated `config_set_role_upgrade_cfg` maintains index dictionaries such as `Id`, `IdLevel` and `IdCosttype`, fills them during `reload`, and supports thread-safe read-only queries.
