.. _`xres-code-generator`: https://github.com/xresloader/xres-code-generator
.. _`xres-code-generator/template`: https://github.com/xresloader/xres-code-generator/tree/master/template
.. _`xres-code-generator/sample`: https://github.com/xresloader/xres-code-generator/tree/master/sample
.. _`xres-code-generator/template/common/cpp`: https://github.com/xresloader/xres-code-generator/tree/master/template/common/cpp
.. _`xres-code-generator/template/common/lua`: https://github.com/xresloader/xres-code-generator/tree/master/template/common/lua
.. _`mako`: https://www.makotemplates.org/
.. _xresloader: https://github.com/xresloader

.. _xres_code_generator:

使用 `xres-code-generator`_ 生成解析代码
=============================================

`xres-code-generator`_ 是一个基于 `mako`_ 模板引擎的代码生成工具，其内部提供了一些模板用于生成加载 `xresloader`_ 所生成的数据的代码。

仓库地址: https://github.com/xresloader/xres-code-generator

C++
------------

1. 从 `xres-code-generator/template/common/cpp`_ 拷贝公共代码
2. 使用模板 ``template/config_manager.h.mako`` , ``template/config_manager.cpp.mako`` , ``template/config_easy_api.h.mako`` , ``template/config_easy_api.cpp.mako`` , ``template/config_set.h.mako`` , ``template/config_set.cpp.mako`` 生成加载代码

.. code-block:: bash

    REPO_DIR=$PATH_TO_xres_code_generator;
    mkdir -p "$REPO_DIR/sample/pbcpp";
    cp -rvf "$REPO_DIR/template/common/cpp/"* "$REPO_DIR/sample/pbcpp";

    python "$REPO_DIR/tools/find_protoc.py" -I "$REPO_DIR/sample/proto" -I "$REPO_DIR/pb_extension" "$REPO_DIR/sample/proto/"*.proto -o "$REPO_DIR/sample/sample.pb" ;

    # You can use --pb-include-prefix "pbdesc/" to set subdirectory for generated files. This will influence the generated #include <...FILE_PATH>
    python "$REPO_DIR/xrescode-gen.py" -i "$REPO_DIR/template" -p "$REPO_DIR/sample/sample.pb" -o "$REPO_DIR/sample/pbcpp"  \
        -g "$REPO_DIR/template/config_manager.h.mako" -g "$REPO_DIR/template/config_manager.cpp.mako"                       \
        -g "$REPO_DIR/template/config_easy_api.h.mako" -g "$REPO_DIR/template/config_easy_api.cpp.mako"                     \
        -l "H:$REPO_DIR/template/config_set.h.mako" -l "S:$REPO_DIR/template/config_set.cpp.mako"                           \
        "$@"

3. 使用 ``config_manager`` 和 ``config_easy_api`` 访问数据

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

Lua
------------

1. 从 `xres-code-generator/template/common/lua`_ 拷贝公共代码
2. 使用模板 ``template/DataTableCustomIndex.lua.mako`` 和 ``template/DataTableCustomIndex53.lua.mako`` 生成加载代码

.. code-block:: bash

    REPO_DIR=$PATH_TO_xres_code_generator;
    mkdir -p "$REPO_DIR/sample/pblua";
    cp -rvf "$REPO_DIR/template/common/lua/"*.lua "$REPO_DIR/sample/pblua";

    python "$REPO_DIR/tools/find_protoc.py" -I "$REPO_DIR/sample/proto" -I "$REPO_DIR/pb_extension" "$REPO_DIR/sample/proto/"*.proto -o "$REPO_DIR/sample/sample.pb" ;

    python "$REPO_DIR/xrescode-gen.py" -i "$REPO_DIR/template" -p "$REPO_DIR/sample/sample.pb" -o "$REPO_DIR/sample/pblua"  \
        -g "$REPO_DIR/template/DataTableCustomIndex.lua.mako"                                                               \
        -g "$REPO_DIR/template/DataTableCustomIndex53.lua.mako"                                                             \
        "$@"


3. 使用 ``DataTableService53`` 访问数据

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
        print(string.format("%s=%s\n", k, tostring(v)))
    end


使用示例可参见 `xres-code-generator/sample`_ ，使用 ``sample_gen.sh`` 可生成协议代码和加载示例代码。

自定义模板和更多语言
------------------------

我们实现的所有加载代码模板都位于 `xres-code-generator/template`_ ，以后会实现更多语言的加载模板。用户也可以根据自己的需要，参照 `xres-code-generator/template`_ 实现自己的代码加载模板。