---
title: 高级用法
description: 深入功能与定制化实践
---

# 高级功能

## 文本替换（别名/宏）

为了便于理解，我们支持配置一组别名的表。在 `MacroSource` 中，主配置为文件名，次配置为表明，补充配置为Key-Value的开始行号和列号。比如：

| 字段        | 简介                        | 主配置            | 次配置 | 补充配置 | 说明                                             |
| ----------- | --------------------------- | ----------------- | ------ | -------- | ------------------------------------------------ |
| MacroSource | 文本宏数据源(文件路径,表名) | 资源转换示例.xlsx | macro  | 2,1      | 次配置为表名，补充配置为数据起始位置(行号, 列号) |

这时候我们会认为在文件 `资源转换示例.xlsx` ， `macro` 表中。从第 `2` 行开始，第 `1` 列为别名的Key，第 `2` 列为别名的Value。

这样我们在执行转表的读取数据时候，会尝试去这里查找是否又它的别名，如果有，则直接转换成Value。

比如 [xresloader sample](https://github.com/xresloader/xresloader/tree/main/sample) 的 `upgrade_10001` 表的 `CostType` 这一列是整数类型，但是我们可以配置成 `游戏币` 。就是因为我们在 `macro` 表中配置了。

| 键     | 值    |
| ------ | ----- |
| 游戏币 | 10001 |

## 多表数据合并

如果Excel的多个表的结构相同（列对应的字段相同）。则我们可以通过配置多个 `DataSource` 来让 [xresloader](https://github.com/xresloader/xresloader) 对多个表进行数据合并。这样我们可以把数据按类型分布在几个表中并在转换的时候最后合并。

详见 [xresloader sample](https://github.com/xresloader/xresloader/tree/main/sample) 中 `资源转换示例.xlsx` 的 `scheme_upgrade` 、 `upgrade_10001` 和 `upgrade_10002` 表。

## 数据验证器

[xresloader](https://github.com/xresloader/xresloader)
提供了基于协议描述的 **数据验证器（Validator）** 功能，
用于在转表时自动校验Excel中输入的数据是否合法，
能够有效防止策划配置出超出范围或不符合预期的数据。

数据验证器支持值范围验证、协议类型验证、枚举类型验证、
函数验证器（InText/InTableColumn/InMacroTable/Regex）、
逻辑组合验证器（And/Or/Not/InValues）和自定义验证器等功能。

详见 [数据验证器](/docs/users/validator) 章节。

## Protobuf 插件支持

项目中可以导入 [xresloader-protocol/common](https://github.com/xresloader/xresloader-protocol/tree/main/common) 目录， 然后通过导入 [xresloader-protocol/core/extensions/v2](https://github.com/xresloader/xresloader-protocol/tree/main/core/extensions/v2) 或 [xresloader-protocol/core/extensions/v3](https://github.com/xresloader/xresloader-protocol/tree/main/core/extensions/v3) 中的相应proto文件，就可以获得额外的插件扩展支持。

\> 注意: 使用插件功能时　生成pb的时候也要导入插件的proto文件和protobuf官方include目录里的 google/protobuf/descriptor.proto 文件。

### Protobuf插件 - Message插件

| 插件名称                               | 类型   | 插件功能                                                                                                                                                       |
| -------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 插件名称                               | 类型   | 插件功能                                                                                                                                                       |
| org.xresloader.msg_description         | string | 消息体描述信息，会写入输出的header中和代码中                                                                                                                   |
| org.xresloader.msg_require_mapping_all | bool   | 设置message的所有字段必须被全部映射                                                                                                                            |
| org.xresloader.msg_separator           | string | Plain模式字段分隔符，可指定多个，用于在一个单元格内配置复杂格式时的分隔符列表，默认值: `,;\|`                                                                  |
| org.xresloader.ue.helper               | string | 生成UE Utility代码的类名后缀                                                                                                                                   |
| org.xresloader.ue.not_data_table       | bool   | 生成UE Utility代码时，不生产加载代码，这用于带name字段的依赖类型                                                                                               |
| org.xresloader.ue.default_loader       | enum   | 生成UE Utility代码时，控制单独的Message是否开启默认Loader（版本>=v2.13.1） 可选项: `EN_LOADER_MODE_DEFAULT`; `EN_LOADER_MODE_ENABLE`; `EN_LOADER_MODE_DISABLE` |
| org.xresloader.ue.include_header       | string | 生成UE Utility代码时，额外附加包含文件（版本>=v2.13.1）                                                                                                        |

比如 [xresloader/sample/proto_v3/kind.proto](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto) 里， `arr_in_arr_cfg` 配置了相关字段，会影响到一些输出。

### Protobuf插件 - Field插件

| 插件名称                                         | 类型   | 插件功能                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| org.xresloader.field_description                 | string | 字段描述信息，会写入输出的header中和代码中                                                                                                                                                                                                                                                                                                                    |
| org.xresloader.validator                         | string | 字段描述信息，会写入输出的header中和代码中（版本\>=2.14.0-rc2）                                                                                                                                                                                                                                                                                               |
| org.xresloader.verifier                          | string | (废弃，请使用 org.xresloader.validator)字段描述信息，会写入输出的header中和代码中                                                                                                                                                                                                                                                                             |
| org.xresloader.field_unique_tag                  | string | 唯一性检测Tag，所有tag相同的字段会组合到一起检查唯一性（版本\>=2.14.0-rc2）                                                                                                                                                                                                                                                                                   |
| org.xresloader.map_key_validator                 | string | 用于Map类型Key的验证器，可填范围(low-high),message名，enum名。多个由 `                                                                                                                                                                                                                                                                                        | ` 分隔。任意验证器通过检查则认为数据有效 （版本\>=2.15.0） |
| org.xresloader.map_value_validator               | string | 用于Map类型Value的验证器，可填范围(low-high),message名，enum名。多个由 `                                                                                                                                                                                                                                                                                      | ` 分隔。任意验证器通过检查则认为数据有效 （版本\>=2.15.0） |
| org.xresloader.field_not_null                    | bool   | 如果配置了字段映射，忽略此项为空的行（版本\>=2.14.0-rc2）                                                                                                                                                                                                                                                                                                     |
| org.xresloader.field_alias                       | string | 字段别名，可用于验证器和Excel中直接填别名，2.14.0-rc2版本后允许多个                                                                                                                                                                                                                                                                                           |
| org.xresloader.field_ratio                       | int32  | 数值放大倍数，`转出数值=Excel内数值*field_ratio`。比如设为1000时，如果Excel里填的是1.05，转出的数据是 1050                                                                                                                                                                                                                                                    |
| org.xresloader.field_separator                   | string |                                                                                                                                                                                                                                                                                                                                                               |
| org.xresloader.field_required                    | bool   | 设置字段为 **required** ，用于向proto3提供，proto2的 **required** 约束                                                                                                                                                                                                                                                                                        |
| org.xresloader.field_origin_value                | string | 当前字段类型为Timestamp或Duration时且转换过程发生数据转换时，此扩展允许把原始数据写入指定字段。（版本\>=2.12.0） 目标字段必须是string类型且repeated属性和当前字段保持一致                                                                                                                                                                                     |
| org.xresloader.field_allow_missing_in_plain_mode | bool   | Plain模式下设置此字段可选，如果未设置则使用默认值（版本\>=2.16.0）                                                                                                                                                                                                                                                                                            |
| org.xresloader.field_list_strip_option           | enum   | 给单个字段设置数组裁剪，可选值（版本\>=2.18.0） + `LIST_STRIP_DEFAULT` : 默认值，使用 `--list-strip-*/--list-keep-empty` 控制，未设置则是裁剪全部空值 ） + `LIST_STRIP_NOTHING`: 不裁剪数据，相当于 `--list-keep-empty` + `LIST_STRIP_TAIL`: 裁剪尾部空值，相当于 `--list-strip-empty-tail` + `LIST_STRIP_ALL`: 裁剪全部空值，相当于 `--list-strip-all-empty` |
| org.xresloader.field_list_min_size               | string | 给单个字段设置数组最小长度，输入字符串：`<N>或<枚举名>`（版本\>=2.18.0）                                                                                                                                                                                                                                                                                      |
| org.xresloader.field_list_max_size               | string | 给单个字段设置数组最大长度，输入字符串：`<N>或<枚举名>`（版本\>=2.18.0）                                                                                                                                                                                                                                                                                      |
| org.xresloader.field_list_strict_size            | bool   | 设置单个字段设置数组严格长度要求，即不自动补全最小长度，而是报错。：`false/true`（默认值: `false`, 版本\>=2.18.0）                                                                                                                                                                                                                                            |
| org.xresloader.field_tag                         | string | 设置字段Tag，配合 `--ignore-field-tags` 选项可用于跳过某些数据。（版本\>=2.19.0）                                                                                                                                                                                                                                                                             |
| org.xresloader.ue.key_tag                        | int32  | 生成UE代码时，如果需要支持多个Key组合成一个Name，用这个字段指定系数（必须大于0）                                                                                                                                                                                                                                                                              |
| org.xresloader.ue.ue_type_name                   | string | 生成UE代码时，如果指定了这个字段，那么生成的字段类型将是 `TSoftObjectPtr<ue_type_name>` , 并且支持蓝图中直接引用                                                                                                                                                                                                                                              |
| org.xresloader.ue.ue_type_is_class               | bool   | 生成UE代码时，如果这个字段为true，那么生成的字段类型将是 `TSoftClassPtr<ue_type_name>` , 并且支持蓝图中直接引用                                                                                                                                                                                                                                               |
| org.xresloader.ue_origin_type_name               | string | 设置输出UE代码的原始类型（版本\>=2.14.0-rc1）                                                                                                                                                                                                                                                                                                                 |
| org.xresloader.ue_origin_type_default_value      | string | 设置输出UE代码的原始类型的默认值（版本\>=2.14.0-rc1）                                                                                                                                                                                                                                                                                                         |

比如我们定义单位属性的proto如下：

```protobuf
import "xresloader.proto";

message unit_attribute {
    int32 hp           = 1 [(org.xresloader.field_alias) = "生命"];
    int32 mp           = 2 [(org.xresloader.field_alias) = "魔力"];
    int32 power        = 3 [(org.xresloader.field_alias) = "力量"];
}

message skill_effect {
    int32 id           = 1;
    int32 level        = 2;
    int32 func_type    = 3;
    int32 attr_type    = 4;
    int32 value        = 5;
}
```

然后我们可以在Excel表中使用别名：

| 技能ID | 等级  | 功能类别  | 属性                     | 值    |
| ------ | ----- | --------- | ------------------------ | ----- |
| 技能ID | 等级  | 功能类别  | 属性                     | 值    |
| id     | level | func_type | attr_type@unit attribute | value |
| 20001  | 1     |           | **生命**                 | 100   |
| 20001  | 2     | 1001      | **生命**                 | 200   |

### Protobuf插件 - EnumValue插件

| 插件名称                         | 类型   | 插件功能                                                              |
| -------------------------------- | ------ | --------------------------------------------------------------------- |
| 插件名称                         | 类型   | 插件功能                                                              |
| org.xresloader.enumv_description | string | 枚举值描述信息，会写入输出的header中和代码中                          |
| org.xresloader.enum_alias        | string | 枚举值别名，可用于验证器和Excel中直接填别名，2.14.0-rc2版本后允许多个 |

比如 [xresloader/sample/proto_v3/kind.proto](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto) 里， `role_upgrade_cfg` 内的 `CostType` 这一列配置验证器引射到协议的 `cost_type` 和 协议描述字段。

```protobuf title="sample/quick_start/sample-conf/kind.proto"
syntax = "proto3";

import "xresloader.proto";
// xresloader的发布页面 https://github.com/xresloader/xresloader/releases 下载
// protocols.zip ，即可获取xresloader.proto

enum cost_type {
  EN_CT_UNKNOWN = 0;
  EN_CT_MONEY = 10001 [ (org.xresloader.enum_alias) = "金币" ];
  EN_CT_DIAMOND = 10101 [ (org.xresloader.enum_alias) = "钻石" ];
}

message role_upgrade_cfg {
  uint32 Id = 1;
  uint32 Level = 2;
  uint32 CostType = 3 [
    (org.xresloader.validator) =
        "cost_type", // 这里等同于在Excel中使用 @cost_type 标识
    (org.xresloader.field_description) = "Refer to cost_type"
  ];
  int32 CostValue = 4;
  int32 ScoreAdd = 5;
}
```

然后，我们就可以按如下方式配消耗类型:

| 角色ID | 等级  | 货币类别    | 消耗值                                                  |
| ------ | ----- | ----------- | ------------------------------------------------------- |
| 角色ID | 等级  | 货币类别    | 消耗值                                                  |
| Id     | Level | CostType    | [CostValue@0-1000](mailto:CostValue@0-1000) \|2000-3000 |
| 10001  | 1     | EN_CT_MONEY | 10                                                      |
| 10001  | 2     | **金币**    | 50                                                      |

### Protobuf插件 - Oneof插件(2.8.0版本及以上)

| 插件名称                                         | 类型   | 插件功能                                                                          |
| ------------------------------------------------ | ------ | --------------------------------------------------------------------------------- |
| org.xresloader.oneof_description                 | string | oneof描述信息，可能会写入输出的header中和代码中                                   |
| org.xresloader.oneof_separator                   | string |                                                                                   |
| org.xresloader.oneof_not_null                    | string | 如果配置了字段映射，忽略此项为空的行（版本\>=v2.14.0-rc2）                        |
| org.xresloader.oneof_allow_missing_in_plain_mode | bool   | Plain模式下设置此字段可选，如果未设置则使用默认值 （版本\>=2.16.0）               |
| org.xresloader.oneof_tag                         | string | 设置字段Tag，配合 `--ignore-field-tags` 选项可用于跳过某些数据。（版本\>=2.16.0） |

## 仅导出部分字段

如果我们需要给客户端和服务器读取同一张Excel表里的不同字段的数据，只要proto不一样即可。对于proto中不存在的字段，我们在转换的时候会忽略掉。 即，我们可能会有一个 `role_server` 和 `role_client` 。这两个数据结构不一样，但指向同一个数据源。

## 批量转表的include标签

## 公式支持

[xresloader](https://github.com/xresloader/xresloader) 支持公式功能，但是不建议使用跨文件公式。是因为有些平台里，文件的引用可能会使用绝对路径，这时候如果改变一个文件中的值会影响另一个文件。 而另一个文件计算公式的时候读取失败，则会用之前的数据缓存（Excel中对所有公式的计算结果有缓存）。这时候数据可能滞后，但是是没有提示的。可能会引起困惑。

## 定长数组

详见 `数据类型说明-定长数组 <data-types-stable-array>` 章节。

## Plain模式（需要 [xresloader](https://github.com/xresloader/xresloader) 2.7.0及以上）

为了方便某些特殊场景使用，从 [xresloader](https://github.com/xresloader/xresloader) 2.7.0版本开始，我们开支支持Plain模式。 Plain模式的配置方式允许把数字和字符串数组和整个message配置在一个单元格里，多个元素或者多个字段按分隔符分割。分隔符支持多个候选项，实际执行会采用按输入的字符串中，第一个找到的候选项。 默认的分隔符候选项是 `,;|` 。

Plain模式不需要额外配置，当数组元素没有配置下标或者配置的映射字段直接指向一个message时，将自动使用Plain模式解析。

比如对于以下协议：

```protobuf
message cfg {
    int32 id = 1;
    plain_message plain_msg = 2;
    repeated int32 plain_arr = 3;
}

message plain_message {
    int32 id = 1;
    repeated int32 param = 2;
}
```

如果Excel配置是如下形式:

| 配置ID | Plain结构  | Plain数组 |
| ------ | ---------- | --------- |
| 配置ID | Plain结构  | Plain数组 |
| id     | plain_msg  | plain_arr |
| 101    | 101\|1,2,3 | 7;8;9     |

那么对于 `plain_msg` 字段输入的字符串是 `101|1,2,3` ，第一个 `|` 会作为 `plain_msg` 的字段分隔符， `,` 会作为 `plain_msg.param` 的数组分隔符。 而对于 `plain_arr` 字段输入的字符串是 `7;8;9` , `;` 会作为数组分隔符。

如果想要指定自定义分隔符，特别是对 `repeated message` 要区分message的分隔符和数组的分隔符，可以使用使用 `org.xresloader.field_separator` 插件和 `org.xresloader.msg_separator` 插件。 需要注意的是，对于数组（repeated）的字段，字段分隔符仅接受通过 `org.xresloader.field_separator` 指定，而非数组的复杂数据结构（非repeated message） `org.xresloader.field_separator` 插件和 `org.xresloader.msg_separator` 都可以用于指定分隔符。

同时，在Plain模式中，message字段解析是严格按照配置的field number的顺序。

更多详情请参考 [xresloader sample](https://github.com/xresloader/xresloader/tree/main/sample) 的 `arr_in_arr` 表，对应协议是 [xresloader/sample/proto_v3/kind.proto](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto) 中的 `message arr_in_arr_cfg` 。

**`UE-Csv` 和 `UE-Json` 输出的Plain模式需要 [xresloader](https://github.com/xresloader/xresloader) 2.8.0及以上。**

## Oneof/Union支持（需要 [xresloader](https://github.com/xresloader/xresloader) 2.8.0及以上）

[xresloader](https://github.com/xresloader/xresloader) 对Oneof的支持和Plain模式类似，并且只能通过Plain模式一样的方法配置，可以使用 `org.xresloader.oneof_separator` 插件指定自定义分隔符。

Oneof/Union支持的配置方法是直接在Excel字段映射中配置oneof的名字。输入字符串中第一组为字段的名字、数字标识（field number）或别名，第二组为对应的类型的Plain模式输入。比如:

```protobuf
// 常量类型
enum cost_type {
    EN_CT_UNKNOWN              = 0;
    EN_CT_MONEY                = 10001 [(org.xresloader.enum_alias) = "金币"];
    EN_CT_DIAMOND              = 10101 [(org.xresloader.enum_alias) = "钻石"];
}

message cfg {
  int32 id = 1;
  oneof reward {
    plain_message msg       = 11 [ (org.xresloader.field_alias) = "嵌套结构" ];
    int64         user_exp  = 12 [ (org.xresloader.field_alias) = "数字类型" ];
    string        note      = 13 [ (org.xresloader.field_alias) = "描述文本" ];
    cost_type     enum_type = 14 [ (org.xresloader.field_alias) = "货币类型" ];
  }
}

message plain_message {
    int32 id = 1;
    repeated int32 param = 2;
}
```

以下输入都是允许的：

| 配置ID | Oneof结构               |
| ------ | ----------------------- |
| 配置ID | Oneof结构               |
| id     | reward                  |
| 1001   | msg\|101;1,2,3          |
| 1002   | 数字类型\|100           |
| 1003   | 13\|Hello World         |
| 1004   | enum_type\|金币         |
| 1005   | 货币类型\|EN_CT_DIAMOND |

需要特别注意的是，和Plain模式一样，message字段解析是严格按照配置的field number的顺序，如果message里有嵌套的oneof，那么oneof的输入位置是第一个相关字段的位置，并且该oneof里后续的字段不需要配置。

更多详情请参考 [xresloader sample](https://github.com/xresloader/xresloader/tree/main/sample) 的 `test_oneof` 表，对应协议是 [xresloader/sample/proto_v3/kind.proto](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto) 中的 `message event_cfg` 。

## Map类型支持（需要 [xresloader](https://github.com/xresloader/xresloader) 2.9.0及以上）

从 [xresloader](https://github.com/xresloader/xresloader) 2.9.0 版本开始，我们支持使用 protobuf 内置的map类型。map类型的数据输入配置和数组类似，与其不同的是，我们增加了内置的 `key` 和 `value` 字段用于通过标准模式指定元素的 `key` 和 `value`。 当然我们也可以使用Plain模式的输入。比如以下的协议:

```protobuf
message dep2_cfg {
    uint32 id = 1;
    string level = 2;
}

message arr_in_arr_cfg {
    option (org.xresloader.ue.helper)       = "helper";
    option (org.xresloader.msg_description) = "Test arr_in_arr_cfg";

    uint32   id                       = 1 [ (org.xresloader.ue.key_tag) = 1, (org.xresloader.field_description) = "This is a Key" ];
    map<int32, string>    test_map_is = 7;
    map<string, dep2_cfg> test_map_sm = 8 [ (org.xresloader.field_separator) = "|" ];
}
```

我们接受如下的Excel输入:

| 配置ID | Map嵌套模式[0].key | Map嵌套模式[0].value | Map嵌套模式[1].key | Map嵌套模式[1].value | MapPlain模式                  |
| ------ | ------------------ | -------------------- | ------------------ | -------------------- | ----------------------------- |
| 配置ID | Map嵌套模式[0].key | Map嵌套模式[0].value | Map嵌套模式[1].key | Map嵌套模式[1].value | MapPlain模式                  |
| id     | test_map_is[0].key | test_map_is[0].value | test_map_is[1].key | test_map_is[1].value | test_map_sm                   |
| 1001   | 10                 | Map嵌套模式[0].value | 11                 | Map嵌套模式[1].value | aa;111,112\|特殊:字符;121,122 |
| 1002   | 20                 | Map嵌套模式[0].value | 21                 | Map嵌套模式[1].value | ba;211,212\|特殊.字符;221,222 |
| 1003   | 30                 | Map嵌套模式[0].value | 31                 | Map嵌套模式[1].value | ca;311,312\|cb;321,322        |

对于 `UE-Csv` 和 `UE-Json` 模式的输出，我们会输入如下的代码：

```cpp
USTRUCT(BlueprintType)
struct FArrInArrCfg : public FTableRowBase
{
    GENERATED_USTRUCT_BODY()

    // Start of fields
    /** Field Type: STRING, Name: Name, Index: 0. This field is generated for UE Editor compatible. **/
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "XResConfig")
    FName Name;

    // This is a Key
    /** Field Type: INT, Name: Id, Index: 1 **/
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "XResConfig")
    int32 Id;

    /** Field Type: MESSAGE, Name: TestMapIs, Index: 7 **/
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "XResConfig")
    TMap< int32, FString > TestMapIs;

    /** Field Type: MESSAGE, Name: TestMapSm, Index: 8 **/
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "XResConfig")
    TMap< FString, FDep2Cfg > TestMapSm;
};
```

特别的对于 `xml` 类型的输出，由于map中的key的数据可能会不符合 `xml` 的tag的规则，所以我们对于map输出的数据中 `tagName` 采用类型名， 即 `string` , `int32` , `int64` 。 然后增加 `key` 属性用于指示map中key的内容，增加 `type` 属性指示类型名。

更多详情请参考 [xresloader sample](https://github.com/xresloader/xresloader/tree/main/sample) 的 `arr_in_arr` 表，对应协议是 [xresloader/sample/proto_v3/kind.proto](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto) 中的 `message arr_in_arr_cfg` 。

## 使用 `CallbackScript` 处理数据（需要 [xresloader](https://github.com/xresloader/xresloader) 2.13.0及以上）

从 [xresloader](https://github.com/xresloader/xresloader) 2.13.0 版本开始，我们通过支持指定一个javascript脚本来修改生成的数据（通过 `-m CallbackScript=脚本路径` ，参考: `data-mapping-available-options` ）。

CallbackScript指向的javascript脚本中，需要满足已下条件:

- 可使用 `gOurInstance` 访问数据源接口（ `DataSrcImpl.getOurInstance()` ）
- 可使用 `gSchemeConf` 访问数据转换配置接口（ `SchemeConf.getInstance()` ）
- 提供 `function initDataSource()` 函数，将在切换数据源时触发（文件名或sheet名）。
- 提供 `function currentMessageCallback(originMsg, typeDesc)` 函数，将在切换数据源时触发（文件名或sheet名）。
  - `originMsg` 为原始数据结构的 `HashMap` 结构
  - `typeDesc` 为数据类型描述信息, `org.xresloader.core.data.dst.DataDstWriterNode.DataDstTypeDescriptor` 结构
更多详情请参考 [xresloader sample](https://github.com/xresloader/xresloader/tree/main/sample) 的 `process_by_script1` 和 `process_by_script2` 表，还有 `cb_script.js` 文件。

## 多字段复制（需要 [xresloader](https://github.com/xresloader/xresloader) 2.14.0-rc1及以上）

可以在Excel `KeyRow` 指向的列里填写多个由 `,` 分隔的字段名，这样在转出的时候会把数据分别填充到这些字段里。比如:

```protobuf
message level_data_cfg {
    uint32 level = 1;
    uint32 exp = 2;
}

message level_up_cfg {
    option (xrescode.loader) = {
        file_path: "level_up.bytes"
        indexes: { fields: "id" fields: "level" index_type: EN_INDEX_KV }
        tags: "client"
        tags: "server"
    };

    uint32         id    = 1;
    uint32         level = 2;
    level_data_cfg data  = 3;
}
```

| 角色ID | 等级             | 经验     |
| ------ | ---------------- | -------- |
| 角色ID | 等级             | 经验     |
| id     | level,data.level | data.exp |
| 10001  | 1                | 0        |

## 剔除Excel误操作带来的空数据行（需要 [xresloader](https://github.com/xresloader/xresloader) 2.14.0-rc2及以上）

我们可以通过 <span class="title-ref">org.xresloader.field_not_null</span> 插件和 <span class="title-ref">org.xresloader.oneof_not_null</span> 插件来用以忽略Excel中指定数据为空的数据行。 特别是对Excel误操作（比如漏删除空单元格，不小心设置了某个空数据行的单元格格式）。比如:

```protobuf
message level_up_cfg {
    uint32         id    = 1 [ (org.xresloader.field_not_null) = true ];
    uint32         level = 2;
}
```

| 角色ID | 等级  | 备注         |
| ------ | ----- | ------------ |
| 角色ID | 等级  | 备注         |
| id     | level |              |
| 10001  | 1     |              |
|        | 2     | 此行会被忽略 |

## 唯一性检测（需要 [xresloader](https://github.com/xresloader/xresloader) 2.14.0-rc2及以上）

我们可以通过 <span class="title-ref">org.xresloader.field_unique_tag</span> 插件来设置唯一性检测标签。可多个。 对于相同唯一性检测标签的所有字段组合，只能出现一次。否则转换过程就会报错。比如:

```protobuf
message level_up_cfg {
    uint32         id    = 1 [ (org.xresloader.field_unique_tag) = "id_level" ];
    uint32         level = 2 [ (org.xresloader.field_unique_tag) = "id_level" ];
}

```

| 角色ID | 等级  | 备注       |
| ------ | ----- | ---------- |
| 角色ID | 等级  | 备注       |
| id     | level |            |
| 10001  | 1     |            |
| 10001  | 2     |            |
| 10001  | 1     | 此行会冲突 |

## 全局配置/行列翻转（需要 [xresloader](https://github.com/xresloader/xresloader) 2.23.0及以上）

某些场景中，我们希望拿一个表维护全局配置。每行一个字段，并且限定数据提取范围。
此时我们可以用行列翻转（ `--transpose-data-source` ）和 限制数据源结束行列的功能。

比如我们在 `资源转换示例.xlsx` 文件里有 `global_settings` 表:

| 标识                          | 字符串值                                                                                         | 类型                            | 描述                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| test_duration1                | 30d                                                                                              | google.protobuf.Duration        | 时间周期， 单位:  w/weeks,d/days,h/hours,m/minutes,s/seconds,ms/milliseconds,us/microseconds,ns/nanoseconds                             |
| test_duration2                | 30ms                                                                                             | google.protobuf.Duration        | 时间周期， 单位:  w/weeks,d/days,h/hours,m/minutes,s/seconds,ms/milliseconds,us/microseconds,ns/nanoseconds                             |
| test_timestamp                | 2009-07-05 15:25:00                                                                              | google.protobuf.Timestamp       | 时间点， 格式: 年-月-日 时:分:秒 表示系统时区时间， 年-月-日 时:分:秒Z 表示UTC时区时间， 年-月-日  时:分:秒+\|-时:分 表示自定义时区时间 |
| mail_max_count_per_major_type | 100                                                                                              | int                             | 用户邮件每种大类的最大数量                                                                                                              |
| i18n_system_admin             | 系统管理员                                                                                       | string                          | 系统管理员昵称                                                                                                                          |
| test_plain_msg                | 1-2                                                                                              | test_msg_verifier               | Plain模式Message                                                                                                                        |
| test_arr                      | 721,722,12\|10001 <br/> 821,822,货币类型\|EN_CT_DIAMOND <br/> 921,822,描述文本\|数组嵌套one of | event_rule_item                 | Plain模式Message数组,嵌套one of                                                                                                         |
| test_repeated_timestamp       | 2009-07-05 15:25:00<br/>     2009-07-05 15:25:00Z<br/>2009-07-05 15:25:00+04:00                | array:google.protobuf.Timestamp |                                                                                                                                         |
| timezone_base_timestamp       | 2025-01-06 00:00:00+08:00                                                                        | google.protobuf.Timestamp       | 基准时间用于结算跨周和跨天，必须是一周的第一天的零点时间（比如周一或者周日的东八区零点）                                                |
| test_plain_enum_array         | 金币,金币,钻石                                                                                   | array:enum                      |                                                                                                                                         |
| test_standard_msg.id          | 537                                                                                              |                                 |                                                                                                                                         |
| test_standard_msg.level       | 648                                                                                              |                                 |                                                                                                                                         |
| test_map_is[0].key            | 70                                                                                               | `map<int32, string>`              | map简单测试                                                                                                                             |
| test_map_is[0].value          | Map简单测试.value                                                                                |                                 |                                                                                                                                         |
| test_map_is[1].key            | 71                                                                                               |                                 |                                                                                                                                         |
| test_map_is[1].value          | Map简单测试.value                                                                                |                                 |                                                                                                                                         |
| test_map_sm[0].key            | aa                                                                                               | `map<string, dep2_cfg>`           | map嵌套测试                                                                                                                             |
| test_map_sm[0].value          | 811,812                                                                                          |                                 |                                                                                                                                         |
| test_map_sm[1].key            | 特殊:字符                                                                                        |                                 |                                                                                                                                         |
| test_map_sm[1].value          | 821,822                                                                                          |                                 |                                                                                                                                         |

然后有proto文件:

```protobuf
message global_settings {
    google.protobuf.Duration  test_duration1                   = 1;
    google.protobuf.Duration  test_duration2                   = 2;
    google.protobuf.Timestamp test_timestamp                   = 3;
    int32                     mail_max_count_per_major_type    = 4;
    string                    i18n_system_admin                = 5;
    test_msg_verifier         test_plain_msg                   = 6 [ (org.xresloader.field_separator) = "&" ];
    repeated event_rule_item  test_arr                         = 7 [ (org.xresloader.field_separator) = "\n" ];
    repeated google.protobuf.Timestamp test_repeated_timestamp = 8 [ (org.xresloader.field_separator) = "\n" ];
    google.protobuf.Timestamp          timezone_base_timestamp = 9;
    repeated cost_type                 test_plain_enum_array   = 10;
    map<int32, string>                 test_map_is             = 11;
    map<string, dep2_cfg>              test_map_sm             = 12 [ (org.xresloader.field_separator) = "|" ];
    dep2_cfg                           test_standard_msg       = 13;
}
```

我们可以在参数里增加下面参数把这个表数据转入一个 `global_settings` 的message结构中。

- `--transpose-data-source` : 开启行列翻转，此时 `KeyRow` 指向列号。
- `-m "KeyRow=1"` : 从第一列读字段映射的Key。
- `-m "DataSource=${workspaceFolder}/sample/资源转换示例.xlsx|global_settings|2,2,0,2"` : 限定从第2行第2列开始读数据，到第2列截止。不限定截止行。
