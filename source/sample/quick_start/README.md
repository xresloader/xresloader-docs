# 原快速上手的完整示例

保留原有 11 行升级数据、协议、XML、两种 C++ 加载方法和所有绑定文件。
新用户优先使用 [current](../current/) 的三行示例；完整加载说明见
[协议生成与数据加载](../../../docs/users/data-loading.md)。

原表的金币值为 10001，也包含枚举名、中文别名与钻石值 10101。
旧入门文档误写为 1001，已在文档修正；原表本身无需修改。
XML 使用 ../xresloader/xresloader.jar（相对于 sample-conf 工作目录），
把最新完整 JAR 放在这个位置，或自行修改。运行命令：

```sh
xresconv-cli -p 1 sample-conf/sample.xml
```

sample-data 和 sample-code 中既有二进制及绑定保留用于历史对照，
不能视为修正后源的当前产物。按自己的 protoc 与 protobuf 运行库重新生成，
POSIX 入口是 ../update-pb-codes.sh；支持 PROTOC 和 XRESLOADER_PROTOCOL_ROOT
环境变量指定工具与上游协议源。运行 XML 后生成新的 11 条配置，
load_with_libresloader 查询等级 4，并在加载和查找失败时返回错误。
