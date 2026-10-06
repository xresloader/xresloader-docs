---
title: Unreal / Blueprint data loaders
description: Generate UE C++ loaders and Blueprint-callable configuration APIs
---
# Unreal Engine integration {#unreal-engine-集成指南}

Generate C++ loaders, Blueprint-callable APIs and editable protobuf structures for UE projects.

## Generate C++ loaders {#生成-c-loader}

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

## Generate Blueprint schema structures {#生成蓝图协议结构体}

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

## Core interfaces {#核心接口}

### Blueprint Wrapper {#blueprint-wrapper}

The configuration group wrapper exposes `config_group_t` to Blueprints with indexed access:

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

### Loader UObject {#loader-uobject}

Each record maps to a UObject with property getters that maintains the lifetime of the underlying protobuf data:

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

### Proto and enum generation {#protoenum-生成}

Enabling `UEBPProtocol` and `UEExcelEnum` also generates:

- `UProto*`: protobuf fields exposed as UPROPERTY values for construction, serialization and debugging in Blueprints.
- `ExcelEnum/*`: each enum as `UENUM(BlueprintType)`, so Blueprints can select values directly.
