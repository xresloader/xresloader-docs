.. _`xres-code-generator`: https://github.com/xresloader/xres-code-generator
.. _`xres-code-generator/template`: https://github.com/xresloader/xres-code-generator/tree/main/template
.. _`xres-code-generator/sample`: https://github.com/xresloader/xres-code-generator/tree/main/sample
.. _`xres-code-generator/template/common/cpp`: https://github.com/xresloader/xres-code-generator/tree/main/template/common/cpp
.. _`xres-code-generator/template/common/lua`: https://github.com/xresloader/xres-code-generator/tree/main/template/common/lua
.. _`xres-code-generator/template/common/upblua`: https://github.com/xresloader/xres-code-generator/tree/main/template/common/upblua
.. _`mako`: https://www.makotemplates.org/
.. _xresloader: https://github.com/xresloader
.. _`xres-code-generator 插件`: https://github.com/xresloader/xres-code-generator/blob/main/pb_extension/xrescode_extensions_v3.proto
.. _`upb`: https://github.com/protocolbuffers/upb

.. _xres_code_generator:

使用 `xres-code-generator`_ 生成解析代码
=============================================

`xres-code-generator`_ 是一个基于 `mako`_ 模板引擎的代码生成工具，其内部提供了一些模板用于生成加载 `xresloader`_ 所生成的数据的代码。

仓库地址: https://github.com/xresloader/xres-code-generator


第一步，在proto文件中声明加载器和索引类型
------------------------------------------------

导入 ``import "xrescode_extensions_v3.proto";`` 然后声明loader。更多可选项见: `xres-code-generator 插件`_

.. code-block:: proto

    syntax = "proto3";

    import "xrescode_extensions_v3.proto";

    message role_upgrade_cfg {
        option (xrescode.loader) = {
            file_path : "role_upgrade_cfg.bytes"
            indexes : {
                fields : "Id"
                index_type : EN_INDEX_KL // Key - List 类型索引，映射关系为: (Id) => list<role_upgrade_cfg>
            }
            indexes : {
                fields : "Id"
                fields : "Level"
                index_type : EN_INDEX_KV // Key - Value 类型索引，映射关系为: (Id, Level) => role_upgrade_cfg
            }
            // 允许多个索引，索引命名是所有的 [fields 字段].join("_")，也可以通过name属性自定义
            tags : "client"
            tags : "server"
        };

        int32  CostValue = 4;
        int32  ScoreAdd  = 5;
    }

生成C++加载代码
------------------------

1. 从 `xres-code-generator/template/common/cpp`_ 拷贝公共代码
2. 使用模板 ``template/config_manager.h.mako`` , ``template/config_manager.cpp.mako`` , ``template/config_easy_api.h.mako`` , ``template/config_easy_api.cpp.mako`` , ``template/config_set.h.mako`` , ``template/config_set.cpp.mako`` 生成加载代码

.. code-block:: bash

    REPO_DIR=$PATH_TO_xres_code_generator;
    mkdir -p "$REPO_DIR/sample/pbcpp";
    cp -rvf "$REPO_DIR/template/common/cpp/"* "$REPO_DIR/sample/pbcpp";

    PROTOC_BIN="$(which protoc)"
    PYTHON_BIN="$(which python3 2>/dev/null)"

    if [[ $? -ne 0 ]]; then
        PYTHON_BIN="$(which python)"
    else
        $PYTHON_BIN --version
        if [[ $? -ne 0 ]]; then
            PYTHON_BIN="$(which python)"
        fi
    fi

    if [[ $? -ne 0 ]] && [[ -e "$REPO_DIR/tools/find_protoc.py" ]]; then
        PROTOC_BIN="$("$PYTHON_BIN" $REPO_DIR/tools/find_protoc.py)"
    fi
    "$PROTOC_BIN" -I "$REPO_DIR/sample/proto" -I "$REPO_DIR/pb_extension" "$REPO_DIR/sample/proto/"*.proto -o "$REPO_DIR/sample/sample.pb" ;

    # You can use --pb-include-prefix "pbdesc/" to set subdirectory for generated files. This will influence the generated #include <...FILE_PATH>
    "$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" -i "$REPO_DIR/template" -p "$REPO_DIR/sample/sample.pb" -o "$REPO_DIR/sample/pbcpp"   \
        -g "$REPO_DIR/template/config_manager.h.mako" -g "$REPO_DIR/template/config_manager.cpp.mako"                               \
        -g "$REPO_DIR/template/config_easy_api.h.mako" -g "$REPO_DIR/template/config_easy_api.cpp.mako"                             \
        -l "H:$REPO_DIR/template/config_set.h.mako" -l "S:$REPO_DIR/template/config_set.cpp.mako"                                   \
        "$@"

1. 使用 ``config_manager`` 和 ``config_easy_api`` 访问数据

.. code-block:: cpp

    #include <cstdio>

    #include "config_manager.h"
    #include "config_easy_api.h"

    int main() {
        // 初始化 ....
        excel::config_manager::me()->init();

        // 可选
        // excel::config_manager::me()->set_version_loader([] (std::string& out) {
        //     // 读取版本号然后写出到 out
        //     return true; // 成功返回true，失败返回false
        // });

        // If you want to intergrate file loader to your system(such as UE or Unity), you should provide buffer loader handle
        // excel::config_manager::me()->set_buffer_loader([] (std::string& out, const char* file_path) {
        //     // 读取文件名为file_path的二进制数据然后写出到out
        //     // file_path 即是pb插件 option (xrescode.loader) 中的file_path字段
        //     return true; // 成功返回true，失败返回false
        // });

        // Set 设置设置保留多少组不同版本的数据
        // excel::config_manager::me()->set_group_number(8);

        // 使用 set_override_same_version(true) 可以强制触发读取，即便版本号没变.
        // excel::config_manager::me()->set_override_same_version(true);

        // 设置日志输出回调，默认会输出到标准输出
        // excel::config_manager::me()->set_on_log([](const log_caller_info_t& caller, const char* content) {
        //    // ...
        // });

        // 还可以设置一些其他的事件回调，详见生成的代码

        // 调用 reload 来执行某个版本的数据加载
        excel::config_manager::me()->reload();

        // 然后就可以用config_easy_api或者config_manager的API读取数据了
        auto cfg = excel::get_role_upgrade_cfg_by_id_level(10001, 3); // using the Key-Value index: id_level
        if (cfg) {
            printf("%s\n", cfg->DebugString().c_str());
        }
        return 0;
    }


使用示例可参见 `xres-code-generator/sample`_ ，使用 ``sample_gen.sh`` 可生成协议代码和加载示例代码。

UE(UnrealEngine)蓝图(Blueprint)支持
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. 使用模板 ``template/UEExcelLoader.h.mako`` , ``template/UEExcelLoader.cpp.mako`` , ``template/UEExcelGroupApi.h.mako`` , ``template/UEExcelGroupApi.cpp.mako`` 生成加载代码

.. code-block:: bash

    python "$REPO_DIR/xrescode-gen.py" -i "$REPO_DIR/template" -p "$REPO_DIR/sample/sample.pb" -o "$REPO_DIR/sample/uepbcpp"  \
        --set ue_include_prefix=ExcelLoader --set ue_type_prefix=ExcelLoader \
        --set ue_api_definition=EXCELLOADER_API --add-path "$REPO_DIR/template" \
        --set "ue_excel_loader_include_rule=ExcelLoader/%(file_path_camelname)s.h" \
        --set "ue_excel_group_api_include_rule=%(file_basename_without_ext)s.h" \
        -f "H:$REPO_DIR/template/UEExcelLoader.h.mako:ExcelLoader/\${pb_file.get_file_path_camelname()}.h" \
        -f "S:$REPO_DIR/template/UEExcelLoader.cpp.mako:ExcelLoader/\${pb_file.get_file_path_camelname()}.cpp" \
        -g "H:$REPO_DIR/template/UEExcelGroupApi.h.mako" -g "S:$REPO_DIR/template/UEExcelGroupApi.cpp.mako" \
        "$@"

以上脚本会生成这样的类接口

.. code-block:: cpp

    // ========================== UExcelLoaderRoleUpgradeCfg ==========================
    UCLASS(Blueprintable, BlueprintType)
    class EXCELLOADER_API UExcelLoaderRoleUpgradeCfg : public UObject
    {
        GENERATED_BODY()

    public:
        UExcelLoaderRoleUpgradeCfg();

        /**
        * @brief Bind to a config item to keep lifeime and bind to the real config message
        * @note It's a internal function, please don't call it
        * @param Lifetime config group
        * @param CurrentMessage real message of UExcelLoaderRoleUpgradeCfg
        */
        void _InternalBindLifetime(std::shared_ptr<const ::google::protobuf::Message> Lifetime, const ::google::protobuf::Message& CurrentMessage);

        /**
        * @brief Get the internal message pointer
        * @note It's a internal function, please don't call it
        * @return The binded internal message pointer of type role_upgrade_cfg
        */
        const ::google::protobuf::Message* _InternalGetMessage() const;

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        int64 GetId(bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        int64 GetLevel(bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        int64 GetCostType(bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        int64 GetCostValue(bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        int32 GetScoreAdd(bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        int64 GetTestMapSize();

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        FString FindTestMap(int32 Index, bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        TArray<UExcelLoaderRoleUpgradeCfgTestMapEntry*> GetAllOfTestMap();

    private:
        // The real message type is role_upgrade_cfg
        const ::google::protobuf::Message* current_message_;
        std::shared_ptr<const ::google::protobuf::Message> lifetime_;
    };

    // ========================== UExcelLoaderRoleUpgradeCfgTestMapEntry ==========================
    UCLASS(Blueprintable, BlueprintType)
    class EXCELLOADER_API UExcelLoaderRoleUpgradeCfgTestMapEntry : public UObject
    {
        GENERATED_BODY()

    public:
        UExcelLoaderRoleUpgradeCfgTestMapEntry();

        /**
        * @brief Bind to a config item to keep lifeime and bind to the real config message
        * @note It's a internal function, please don't call it
        * @param Lifetime config group
        * @param CurrentMessage real data pointer of ::google::protobuf::Map<int32_t, std::string>::const_pointer
        */
        void _InternalBindLifetime(std::shared_ptr<const ::google::protobuf::Message> Lifetime, const void* CurrentMessage);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfgTestMapEntry")
        int32 GetKey(bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfgTestMapEntry")
        FString GetValue(bool& IsValid);

    private:
        // The real message type is ::google::protobuf::Map<int32_t, std::string>::const_pointer
        const void* current_message_;
        std::shared_ptr<const ::google::protobuf::Message> lifetime_;
    };

以及这样的简易访问接口

.. code-block:: cpp

    UCLASS(Blueprintable, BlueprintType)
    class EXCELLOADER_API UExcelLoaderConfigGroupWrapper : public UObject
    {
        GENERATED_BODY()

    public:
        UExcelLoaderConfigGroupWrapper();

        /**
        * @brief Bind to a config group
        * @note It's a internal function, please don't call it
        * @param ConfigGroup config group
        */
        void _InternalBindConfigGroup(const std::shared_ptr<excel::config_group_t>& ConfigGroup);


        // ======================================== UExcelLoaderRoleUpgradeCfg ========================================
        // ---------------------------------------- role_upgrade_cfg ----------------------------------------
        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        int64 GetRoleUpgradeCfg_SizeOf_Id();

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        TArray<UExcelLoaderRoleUpgradeCfg*> GetAllRoleUpgradeCfg_Of_Id();

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        TArray<UExcelLoaderRoleUpgradeCfg*> GetRowRoleUpgradeCfg_AllOf_Id(int64 Id, bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        UExcelLoaderRoleUpgradeCfg* GetRowRoleUpgradeCfg_Of_Id(int64 Id, int64 Index, bool& IsValid);

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        int64 GetRoleUpgradeCfg_SizeOf_IdLevel();

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        TArray<UExcelLoaderRoleUpgradeCfg*> GetAllRoleUpgradeCfg_Of_IdLevel();

        UFUNCTION(BlueprintCallable, Category = "Excel Config UExcelLoaderRoleUpgradeCfg")
        UExcelLoaderRoleUpgradeCfg* GetRowRoleUpgradeCfg_Of_IdLevel(int64 Id, int64 Level, bool& IsValid);

    private:
        std::shared_ptr<excel::config_group_t> config_group_;
    };


2. 为了方便使用，也可以使用模板 ``template/UEBPProtocol.h.mako`` , ``template/UEBPProtocol.cpp.mako`` 生成proto对应的蓝图类

.. code-block:: bash

    python "$REPO_DIR/xrescode-gen.py" -i "$REPO_DIR/template" -p "$REPO_DIR/sample/sample.pb" -o "$REPO_DIR/sample/uepbcpp"  \
        --set ue_include_prefix=ExcelLoader --set ue_type_prefix=ExcelLoader --set ue_bp_protocol_type_prefix=Proto \
        --set ue_api_definition=EXCELLOADER_API --add-path "$REPO_DIR/template" \
        --set "ue_excel_loader_include_rule=ExcelLoader/%(file_path_camelname)s.h" \
        --set "ue_bp_protocol_include_rule=ExcelLoader/%(directory_path)s/Proto%(file_base_camelname)s.h" \
        --set "ue_excel_group_api_include_rule=%(file_basename_without_ext)s.h" \
        --set "ue_excel_enum_include_rule=ExcelEnum/%(file_basename_without_ext)s.h" \
        --pb-exclude-file "xrescode_extensions_v3.proto" \
        -f "H:$REPO_DIR/template/UEExcelLoader.h.mako:ExcelLoader/\${pb_file.get_file_path_camelname()}.h" \
        -f "S:$REPO_DIR/template/UEExcelLoader.cpp.mako:ExcelLoader/\${pb_file.get_file_path_camelname()}.cpp" \
        -g "H:$REPO_DIR/template/UEExcelGroupApi.h.mako" -g "S:$REPO_DIR/template/UEExcelGroupApi.cpp.mako" \
        -f "H:$REPO_DIR/template/UEExcelEnum.h.mako:ExcelEnum/\${pb_file.get_file_path_camelname()}.h" \
        -f "H:$REPO_DIR/template/UEBPProtocol.h.mako:ExcelLoader/\${pb_file.get_directory_path()}/Proto\${pb_file.get_file_base_camelname()}.h" \
        -f "S:$REPO_DIR/template/UEBPProtocol.cpp.mako:ExcelLoader/\${pb_file.get_directory_path()}/Proto\${pb_file.get_file_base_camelname()}.cpp" \
        "$@"

这样还会生成这样的蓝图类

.. code-block:: cpp

    UENUM(BlueprintType)
    enum class EProtoEnTestEnumType : uint8
    {
        EPETET_EN_TET_NONE = 0 UMETA(DisplayName="EN_TET_NONE"),
        EPETET_EN_TET_ONE = 1 UMETA(DisplayName="EN_TET_ONE"),
    };

    // ========================== UProtoRoleUpgradeCfg ==========================
    UCLASS(Blueprintable, BlueprintType)
    class EXCELLOADER_API UProtoRoleUpgradeCfg : public UObject
    {
        GENERATED_BODY()

    public:
        UProtoRoleUpgradeCfg();

        UProtoRoleUpgradeCfg& operator=(const role_upgrade_cfg& other);


        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Protocol UProtoRoleUpgradeCfg")
        int64 Id;

        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Protocol UProtoRoleUpgradeCfg")
        int64 Level;

        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Protocol UProtoRoleUpgradeCfg")
        int64 CostType;

        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Protocol UProtoRoleUpgradeCfg")
        int64 CostValue;

        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Protocol UProtoRoleUpgradeCfg")
        int32 ScoreAdd;


        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Protocol UProtoRoleUpgradeCfg")
        TMap<int32, FString> TestMap;
    };

生成Lua加载代码
------------------------

1. 从 `xres-code-generator/template/common/lua`_ 拷贝公共代码
2. 使用模板 ``template/DataTableCustomIndex.lua.mako`` 和 ``template/DataTableCustomIndex53.lua.mako`` 生成加载代码

.. code-block:: bash

    REPO_DIR=$PATH_TO_xres_code_generator;
    mkdir -p "$REPO_DIR/sample/pblua";
    cp -rvf "$REPO_DIR/template/common/lua/"*.lua "$REPO_DIR/sample/pblua";

    PROTOC_BIN="$(which protoc)"
    PYTHON_BIN="$(which python3 2>/dev/null)"

    if [[ $? -ne 0 ]]; then
        PYTHON_BIN="$(which python)"
    else
        $PYTHON_BIN --version
        if [[ $? -ne 0 ]]; then
            PYTHON_BIN="$(which python)"
        fi
    fi

    if [[ $? -ne 0 ]] && [[ -e "$REPO_DIR/tools/find_protoc.py" ]]; then
        PROTOC_BIN="$("$PYTHON_BIN" $REPO_DIR/tools/find_protoc.py)"
    fi

    "$PROTOC_BIN" -I "$REPO_DIR/sample/proto" -I "$REPO_DIR/pb_extension" "$REPO_DIR/sample/proto/"*.proto -o "$REPO_DIR/sample/sample.pb" ;

    "$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" -i "$REPO_DIR/template" -p "$REPO_DIR/sample/sample.pb" -o "$REPO_DIR/sample/pblua"   \
        -g "$REPO_DIR/template/DataTableCustomIndex.lua.mako"                                                                       \
        -g "$REPO_DIR/template/DataTableCustomIndex53.lua.mako"                                                                     \
        "$@"


1. 使用 ``DataTableService53`` 访问数据

.. code-block:: lua

    -- 我们使用 require(...) to 来加载 DataTableService53,DataTableCustomIndex53 和生成的数据文件，请确保 require(FILE_PATH) 可以加载它们
    -- 假设 xresloader 生成的 lua 数据文件位于 ../../../xresloader/sample/proto_v3
    package.path = '../../../xresloader/sample/proto_v3/?.lua;' .. package.path
    local excel_config_service = require('DataTableService53')

    -- 设置日志输出回调
    -- excel_config_service:OnError = function (消息内容, 索引对象, 索引名称, 所有的key字段...) end

    excel_config_service:ReloadTables()

    local role_upgrade_cfg = excel_config_service:Get("role_upgrade_cfg")
    local data = role_upgrade_cfg:GetByIndex('id_level', 10001, 3) -- using the Key-Value index: id_level
    for k,v in pairs(data) do
        print(string.format("\t%s=%s", k, tostring(v)))
    end

    -- 也可以通过DataTableService.GetCurrentGroup(self)获取分组和DataTableService.GetByGroup(self, group, loader_name)来实现配置分组和多版本功能
    local current_group = excel_config_service:GetCurrentGroup()
    local role_upgrade_cfg2 = excel_config_service:GetByGroup(current_group, "role_upgrade_cfg")
    local data2 = role_upgrade_cfg:GetByIndex('id', 10001) -- using the Key-List index: id
    print("=======================")
    for _,v1 in ipairs(data2) do
        print(string.format("\tid: %s, level: %s", tostring(v1.Id), tostring(v1.Level)))
        for k,v2 in pairs(v1) do
            print(string.format("\t\t%s=%s", k, tostring(v2)))
        end
    end


使用示例可参见 `xres-code-generator/sample`_ ，使用 ``sample_gen.sh`` 可生成协议代码和加载示例代码。

生成C#加载代码
------------------------

1. 使用模板 ``template/ConfigSet.cs.mako`` 和 ``template/ConfigSetManager.cs.mako`` 生成加载代码

.. code-block:: bash

    REPO_DIR=$PATH_TO_xres_code_generator;
    mkdir -p "$REPO_DIR/sample/pbcs";

    PROTOC_BIN="$(which protoc)"
    PYTHON_BIN="$(which python3 2>/dev/null)"

    if [[ $? -ne 0 ]]; then
        PYTHON_BIN="$(which python)"
    else
        $PYTHON_BIN --version
        if [[ $? -ne 0 ]]; then
            PYTHON_BIN="$(which python)"
        fi
    fi

    if [[ $? -ne 0 ]] && [[ -e "$REPO_DIR/tools/find_protoc.py" ]]; then
        PROTOC_BIN="$("$PYTHON_BIN" $REPO_DIR/tools/find_protoc.py)"
    fi
    "$PROTOC_BIN" -I "$REPO_DIR/sample/proto" -I "$REPO_DIR/pb_extension" "$REPO_DIR/sample/proto/"*.proto -o "$REPO_DIR/sample/sample.pb" ;

    "$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" -i "$REPO_DIR/template" -p "$REPO_DIR/sample/sample.pb" -o "$REPO_DIR/sample/pbcs"    \
        -g "$REPO_DIR/template/ConfigSet.cs.mako"                                                                                   \
        -l "$REPO_DIR/template/ConfigSetManager.cs.mako"                                                                            \
        "$@"

1. 使用 ``ConfigSetManager`` 访问数据.

.. code-block:: csharp

    using System;
    using excel;
    class Program {
        static void Main(string[] args) {
            ConfigSetManager.Instance.Reload();
            // 当前C#数据集全部生成的单例类.
            // 如果后续有需要再添加ConfigGroup管理等功能.
            var table = config_set_role_upgrade_cfg.Instance.GetByIdLevel(10001, 3);
            if (table != null) {
                Console.WriteLine(table.ToString());
            }
        }
    }


生成基于 `upb`_ 的Lua加载代码
--------------------------------

1. 编译 `upb`_ 运行时和 `upb`_ 内lua binding内的 ``protoc-gen-lua`` 插件
2. 从 `xres-code-generator/template/common/upblua`_ 拷贝公共代码
3. 使用 `upb`_ 的 ``protoc-gen-lua`` 插件生成lua表述信息

.. code-block:: bash

    PROTOC_BIN="$(which protoc)"
    PYTHON_BIN="$(which python3 2>/dev/null)"

    if [[ $? -ne 0 ]]; then
        PYTHON_BIN="$(which python)"
    else
        $PYTHON_BIN --version
        if [[ $? -ne 0 ]]; then
            PYTHON_BIN="$(which python)"
        fi
    fi

    if [[ $? -ne 0 ]] && [[ -e "$REPO_DIR/tools/find_protoc.py" ]]; then
        PROTOC_BIN="$("$PYTHON_BIN" $REPO_DIR/tools/find_protoc.py)"
    fi
    "$PROTOC_BIN" "--lua_out=$REPO_DIR/sample/upblua" --plugin=protoc-gen-lua=<PATH to protoc-gen-lua> "$REPO_DIR/pb_extension/xrescode_extensions_v3.proto" "$REPO_DIR/sample/proto/"*.proto

4. 使用模板 ``template/DataTableCustomIndexUpb.lua.mako`` 生成加载代码

.. code-block:: bash

    REPO_DIR=$PATH_TO_xres_code_generator;
    mkdir -p "$REPO_DIR/sample/upblua";

    PROTOC_BIN="$(which protoc)"
    PYTHON_BIN="$(which python3 2>/dev/null)"

    if [[ $? -ne 0 ]]; then
        PYTHON_BIN="$(which python)"
    else
        $PYTHON_BIN --version
        if [[ $? -ne 0 ]]; then
            PYTHON_BIN="$(which python)"
        fi
    fi

    if [[ $? -ne 0 ]] && [[ -e "$REPO_DIR/tools/find_protoc.py" ]]; then
        PROTOC_BIN="$("$PYTHON_BIN" $REPO_DIR/tools/find_protoc.py)"
    fi
    "$PROTOC_BIN" -I "$REPO_DIR/sample/proto" -I "$REPO_DIR/pb_extension" "$REPO_DIR/sample/proto/"*.proto -o "$REPO_DIR/sample/sample.pb" ;

    "$PYTHON_BIN" "$REPO_DIR/xrescode-gen.py" -i "$REPO_DIR/template" -p "$REPO_DIR/sample/sample.pb" -o "$REPO_DIR/sample/upblua"  \
        -g "$REPO_DIR/template/DataTableCustomIndexUpb.lua.mako"                                                                    \
        "$@"

5. 使用 ``DataTableServiceUpb`` 访问数据.

.. code-block:: lua

    -- We will use require(...) to load
    --   - DataTableServiceUpb
    --   - DataTableCustomIndexUpb
    --   - xrescode_extensions_v3_pb
    --   - pb_header_v3_pb
    --   - upb
    --   - google/protobuf/descriptor_pb
    --   - Other custom proto files generated by protoc-gen-lua
    -- Please ensure these can be load by require(FILE_PATH)
    local excel_config_service = require("DataTableServiceUpb")
    local upb = require("upb")
    -- Set logger
    -- excel_config_service:OnError = function (message, data_set, indexName, keys...) end
    excel_config_service:ReloadTables()
    local role_upgrade_cfg = excel_config_service:Get("role_upgrade_cfg")
    print("======================= Lazy load begin =======================")
    local data = role_upgrade_cfg:GetByIndex("id_level", 10001, 3) -- using the Key-Value index: id_level
    print("======================= Lazy load end =======================")
    print("----------------------- Get by Key-Value index -----------------------")
    print(string.format("Data of role_upgrade_cfg: id=10001, level=3 -> json_encode: %s",
        upb.json_encode(data, { upb.JSONENC_PROTONAMES })))
    print("----------------------- Get by reflection and Key-List index -----------------------")
    local current_group = excel_config_service:GetCurrentGroup()
    local role_upgrade_cfg2 = excel_config_service:GetByGroup(current_group, "role_upgrade_cfg")
    local data2 = role_upgrade_cfg2:GetByIndex("id", 10001) -- using the Key-List index: id
    for _, v1 in ipairs(data2) do
        print(string.format("\tid: %s, level: %s", tostring(v1.Id), tostring(v1.Level)))
        for fds in role_upgrade_cfg2:GetMessageDescriptor():fields() do
            print(string.format("\t\t%s=%s", fds:name(), tostring(v1[fds:name()])))
        end
    end

自定义模板和更多语言
------------------------

我们实现的所有加载代码模板都位于 `xres-code-generator/template`_ ，以后会实现更多语言的加载模板。用户也可以根据自己的需要，参照 `xres-code-generator/template`_ 实现自己的代码加载模板。