# 当前快速上手示例

适用版本：xresloader 2.23.7、xresconv-cli 2.0.2、xresconv-gui 3.0.0。

下载完整 xresloader-2.23.7.jar 并重命名为 xresloader.jar，放在此目录。
然后运行 `xresconv-cli --test -p 1 convert.xml` 检查计划，运行
`xresconv-cli -p 1 convert.xml` 导出人物表和升级表的 bin / JSON。
GUI 打开 convert.xml、勾选两项、预览并开始即可。

加载 JSON：`node load-json.cjs output/role_upgrade_cfg.json`，输出三条记录的计数
及 ID=10001、Level=2 的升级数据。Node.js 仅是此加载示例的依赖，转换仍只需 Java。
load_custom.cpp 保留手动解析包装头和记录的方法；load_with_libresloader.cpp
保留旧式 key/value 和 key/list 加载模板，生成代码与编译方法见本站加载文档。

原生 Lua：运行 `xresconv-cli -p 1 convert-lua.xml`，或用 GUI 打开该清单并选两项转换，
生成 output/role_cfg.lua 与 output/role_upgrade_cfg.lua。使用标准 Lua 5.4 执行
`lua load-lua.lua output/role_upgrade_cfg.lua`，检查记录数并按 ID + 等级查询。
此方式通过 dofile 加载默认返回的 table，无额外加载库；require 的路径、缓存与
重载见本站数据加载文档。convert.xml 的默认 bin / JSON 输出保持不变。

sample.xml / sample_include.xml / selectors.json 是带完整注释的扩展示例，
参考 xresconv-conf 的同名源文件并按当前版本修正。快速上手用 convert.xml 即可。
完整示例：`xresconv-cli -p 1 sample.xml`；include 示例导出三份 Lua：
`xresconv-cli -p 1 sample_include.xml`。可选宏、验证器和嵌套数组需要上游对应文件，
默认注释保留。GUI 先启动 `xresconv-gui --custom-selector selectors.json`，
按钮出现后再打开 sample.xml；这规避 GUI 3.0.0 同时自动加载两者的竞争问题。

tables.json 保存基础数据与 scheme，是 tables.xlsx 的生成源。
人物 ID 和名称取自 xresloader sample/资源转换示例.xlsx 的 kind 表前
三条记录（上游 HEAD f5ab9146）；升级数据取自本站历史
quick_start/sample-conf/role_tables.xlsx 的前三条记录，空值显式设为 0。
入门协议 kind.proto 只描述这两个基础结构，不依赖上游用于测试的
自定义校验器和复杂扩展。descriptor 由 protoc 36.2 生成，本站不手改。
使用已有 descriptor 时无需 protoc；重新生成示例使用：

```powershell
python ./scripts/generate-docs-sample.py --protoc <protoc可执行路径>
```

根目录之外的 quick_start 和 xresconv_conf.xml 为历史参考，不属于此包。
本站公开指南：https://xresloader.atframe.work/docs/users/quick-start

打包命令（本站根目录）：

```powershell
./scripts/package-docs-sample.ps1
```

来源：https://github.com/xresloader/xresloader/tree/f5ab9146/sample
