---
title: Unreal / Blueprint 读表代码
description: 使用 xres-code-generator 生成 UE C++ 与蓝图可调用的配置读取接口
---
# Unreal Engine 集成指南

本节说明如何面向 UE 项目生成 C++ Loader、蓝图可调用 API 以及可编辑的 protobuf 协议结构。

## 生成 C++ Loader

```bash
python "$REPO_DIR/xrescode-gen.py" \
    -i "$REPO_DIR/template" \
    -p "$REPO_DIR/sample/sample.pb" \
    -o "$REPO_DIR/sample/uepbcpp" \
    --set ue_include_prefix=ExcelLoader \
    --set ue_type_prefix=ExcelLoader \
    --set ue_api_definition=EXCELLOADER_API \
    --add-path "$REPO_DIR/template" \
    --set "ue_excel_loader_include_rule=ExcelLoader/%(file_path_camelname)s.h" \
    --set "ue_excel_group_api_include_rule=%(file_basename_without_ext)s.h" \
    -f "H:$REPO_DIR/template/UEExcelLoader.h.mako:ExcelLoader/\${pb_file.get_file_path_camelname()}.h" \
    -f "S:$REPO_DIR/template/UEExcelLoader.cpp.mako:ExcelLoader/\${pb_file.get_file_path_camelname()}.cpp" \
    -g "H:$REPO_DIR/template/UEExcelGroupApi.h.mako" \
    -g "S:$REPO_DIR/template/UEExcelGroupApi.cpp.mako" \
    "$@"
```

## 生成蓝图协议结构体

```bash
python "$REPO_DIR/xrescode-gen.py" \
    -i "$REPO_DIR/template" \
    -p "$REPO_DIR/sample/sample.pb" \
    -o "$REPO_DIR/sample/uepbcpp" \
    --set ue_include_prefix=ExcelLoader \
    --set ue_type_prefix=ExcelLoader \
    --set ue_bp_protocol_type_prefix=Proto \
    --set ue_api_definition=EXCELLOADER_API \
    --add-path "$REPO_DIR/template" \
    --set "ue_excel_loader_include_rule=ExcelLoader/%(file_path_camelname)s.h" \
    --set "ue_bp_protocol_include_rule=ExcelLoader/%(directory_path)s/Proto%(file_base_camelname)s.h" \
    --set "ue_excel_group_api_include_rule=%(file_basename_without_ext)s.h" \
    --set "ue_excel_enum_include_rule=ExcelEnum/%(file_basename_without_ext)s.h" \
    --pb-exclude-file "xrescode_extensions_v3.proto" \
    -f "H:$REPO_DIR/template/UEExcelLoader.h.mako:ExcelLoader/\${pb_file.get_file_path_camelname()}.h" \
    -f "S:$REPO_DIR/template/UEExcelLoader.cpp.mako:ExcelLoader/\${pb_file.get_file_path_camelname()}.cpp" \
    -g "H:$REPO_DIR/template/UEExcelGroupApi.h.mako" \
    -g "S:$REPO_DIR/template/UEExcelGroupApi.cpp.mako" \
    -f "H:$REPO_DIR/template/UEExcelEnum.h.mako:ExcelEnum/\${pb_file.get_file_path_camelname()}.h" \
    -f "H:$REPO_DIR/template/UEBPProtocol.h.mako:ExcelLoader/\${pb_file.get_directory_path()}/Proto\${pb_file.get_file_base_camelname()}.h" \
    -f "S:$REPO_DIR/template/UEBPProtocol.cpp.mako:ExcelLoader/\${pb_file.get_directory_path()}/Proto\${pb_file.get_file_base_camelname()}.cpp" \
    "$@"
```

## 核心接口

### Blueprint Wrapper

配置组包装类负责把 `config_group_t` 暴露给蓝图并可按索引访问：

```cpp
UCLASS(Blueprintable, BlueprintType)
class EXCELLOADER_API UExcelLoaderConfigGroupWrapper : public UObject {
    GENERATED_BODY()
public:
    UFUNCTION(BlueprintCallable, Category="Excel Config")
    TArray<UExcelLoaderRoleUpgradeCfg*> GetRowRoleUpgradeCfg_AllOf_Id(int64 Id, bool& IsValid);

    UFUNCTION(BlueprintCallable, Category="Excel Config")
    UExcelLoaderRoleUpgradeCfg* GetRowRoleUpgradeCfg_Of_IdLevel(int64 Id, int64 Level, bool& IsValid);

    UFUNCTION(BlueprintCallable, Category="Excel Config")
    TArray<UExcelLoaderRoleUpgradeCfg*> GetRowRoleUpgradeCfg_AllOf_IdCosttype(int64 Id, int64 CostType, bool& IsValid);
};
```

### Loader UObject

每条配置会映射成一个 UObject，提供属性 Getter 并维持与底层 protobuf 的生命周期：

```cpp
UCLASS(Blueprintable, BlueprintType)
class EXCELLOADER_API UExcelLoaderRoleUpgradeCfg : public UObject {
    GENERATED_BODY()
public:
    UFUNCTION(BlueprintCallable, Category="Excel Config")
    int64 GetId(bool& IsValid);
    UFUNCTION(BlueprintCallable, Category="Excel Config")
    int64 GetLevel(bool& IsValid);
    UFUNCTION(BlueprintCallable, Category="Excel Config")
    int64 GetCostValue(bool& IsValid);
};
```

### Proto/Enum 生成

启用 `UEBPProtocol` 和 `UEExcelEnum` 模板后，还会得到：

- `UProto*`：以 UPROPERTY 形式暴露 protobuf 字段，便于在蓝图中构造、序列化或调试。
- `ExcelEnum/*`：为每个枚举定义 `UENUM(BlueprintType)`，蓝图可直接选择具体值。
