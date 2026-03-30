---
title: 数据验证器
description: 使用数据验证器校验Excel配置数据的合法性
---

<!-- markdownlint-disable MD025 -->
# 数据验证器
<!-- markdownlint-enable MD025 -->

## 概述

[xresloader](https://github.com/xresloader/xresloader)
提供了一个基于协议描述的高级功能——
**数据验证器（Validator）**。
数据验证器用于在转表时自动校验Excel中填入的数据是否合法，
帮助在开发阶段就发现超出范围或不符合预期的配置数据。

验证器支持多种类型：

- **值范围验证器**：限制数值的取值范围
- **协议类型验证器**：验证输入是否为合法的protobuf字段编号
- **枚举类型验证器**：验证输入是否为合法的枚举值
- **函数验证器**：从外部数据源读取合法值集合
- **逻辑组合验证器**：将多个验证器组合成复杂规则

## 验证器使用方式

验证器有两种使用方式。

### 在Excel中使用@符号

在Excel的 `KeyRow`（字段名行）中，在字段名后面加上 `@`
符号，然后输入验证器表达式。多个验证器可以用 `|` 隔开
（表示"或"关系，任意一个验证器通过即合法）。

| 角色ID | 等级  | 货币类别 | 消耗值                      |
| ------ | ----- | -------- | --------------------------- |
| 角色ID | 等级  | 货币类别 | 消耗值                      |
| Id     | Level | CostType | CostValue@0-1000\|2000-3000 |
| 10001  | 1     |          |                             |
| 10001  | 2     | 10001    | 50                          |

这里 `消耗值` 列受到 `0-1000|2000-3000` 验证器约束。
填入的值必须落在 `[0, 1000]` 或 `[2000, 3000]`
范围内，否则转表时会报错。

### 通过Protobuf插件设置验证器

在proto文件中，通过 `org.xresloader.validator`
插件为字段指定验证器。这种方式的好处是验证器和协议定义放在一起，
便于维护。

```protobuf
message role_upgrade_cfg {
    uint32 Id        = 1;
    uint32 Level     = 2;
    int32  CostType  = 3 [(org.xresloader.validator) = "cost_type"];
    int64  CostValue = 4 [(org.xresloader.validator) = "custom_rule5"];
    int32  ScoreAdd  = 5;
}
```

## 值范围验证器

值范围验证器是最简单也是最常用的验证器类型，
用于限制数值的取值范围。

### 值范围语法格式

| 语法       | 含义            | 示例             | 说明               |
| ---------- | --------------- | ---------------- | ------------------ |
| `A-B`      | 闭区间 \[A, B\] | `0-1000`         | 值必须 ≥ A 且 ≤ B  |
| `>=A`      | 大于等于 A      | `>=100`          | 值必须 ≥ A         |
| `<=A`      | 小于等于 A      | `<=9999`         | 值必须 ≤ A         |
| `>A`       | 大于 A          | `>0`             | 值必须 > A         |
| `<A`       | 小于 A          | `<100`           | 值必须 < A         |
| `A-B\|C-D` | 多范围"或"关系  | `0-100\|200-300` | 值在任一范围内即可 |

#### 道具ID范围校验示例

在实际项目中，通常会给不同类型的道具分配不同的ID区间。
我们可以直接在Excel的字段名上添加值范围验证器：

| 道具ID                           | 道具名称 | 道具类型 |
| -------------------------------- | -------- | -------- |
| 道具ID                           | 道具名称 | 道具类型 |
| item_id@1-99999\|300000-399999  | name     | type     |
| 10001                            | 金币     | 1        |
| 300001                           | 蛋炒饭   | 2        |

或者将范围验证器定义在自定义验证器配置中，便于复用：

```yaml
# validator.yaml
validator:
  - name: "ItemIdRange_Menu"
    description: "道具ID范围-食谱(300000-319999)"
    rules:
      - 300000-319999

  - name: "ItemIdRange_Character"
    description: "道具ID范围-角色卡牌(2000000-2099999)"
    rules:
      - 2000000-2099999

  - name: "ItemIdRange_MallProduct"
    description: "道具ID范围-商城商品(9000000-9999999)"
    rules:
      - 9000000-9999999
```

#### 排除特定值的范围

使用 `Not` 和 `InValues` 函数可以排除特定值。
比如验证 `Id` 字段必须存在且在有效范围内：

```yaml
# validator.yaml
validator:
  - name: "ValidIdRange"
    description: "有效ID范围(排除0)"
    mode: "and"
    rules:
      - 1-999999
      - Not(InValues(0))
```

## 协议类型验证器（Message验证器）

可以将一个protobuf **message** 作为验证器使用。此时，
Excel中可以填写该message里定义的字段编号（field number）
或字段名称（field name），转表时会自动验证输入值是否对应
该message中已定义的字段。

### 技能属性加成验证示例

定义单位属性的proto：

```protobuf
message unit_attribute {
    int32 hp    = 1;
    int32 mp    = 2;
    int32 power = 3;
}

message skill_effect {
    int32 id        = 1;
    int32 level     = 2;
    int32 func_type = 3;
    int32 attr_type = 4;
    int32 value     = 5;
}
```

在Excel中，使用 `@unit_attribute` 将 `属性` 列的值限制为
`unit_attribute` 的字段编号或字段名：

| 技能ID | 等级  | 功能类别  | 属性                     | 值    |
| ------ | ----- | --------- | ------------------------ | ----- |
| 技能ID | 等级  | 功能类别  | 属性                     | 值    |
| id     | level | func_type | attr_type@unit_attribute | value |
| 20001  | 1     |           | hp                       | 100   |
| 20001  | 2     | 1001      | 1                        | 200   |
| 20001  | 3     | 1002      | power                    | 50    |

上面示例中， `属性` 列可以填字段名（`hp`、`mp`、`power`）
或字段编号（`1`、`2`、`3`），转出时都会被转换为对应的字段编号。
如果填入了一个不在 `unit_attribute` 中的值
（如 `armor` 或 `99`），转表会报错。

## 枚举类型验证器（Enum验证器）

可以将一个protobuf **enum** 作为验证器使用。此时，
Excel中可以填写该enum中定义的枚举值编号（enum number）
或枚举值名称（enum name）。结合 `org.xresloader.enum_alias`
插件，还可以使用中文别名。

### 消耗类型验证示例

```protobuf
enum cost_type {
    EN_CT_UNKNOWN = 0;
    EN_CT_MONEY   = 10001 [(org.xresloader.enum_alias) = "金币"];
    EN_CT_DIAMOND = 10101 [(org.xresloader.enum_alias) = "钻石"];
}
```

在Excel中使用 `@cost_type` 验证器：

| 角色ID | 等级  | 货币类别           | 消耗值    |
| ------ | ----- | ------------------ | --------- |
| 角色ID | 等级  | 货币类别           | 消耗值    |
| Id     | Level | CostType@cost_type | CostValue |
| 10001  | 1     | EN_CT_MONEY        | 10        |
| 10001  | 2     | 金币               | 50        |
| 10001  | 3     | 10101              | 100       |

以上三种填法（枚举名 `EN_CT_MONEY`、别名 `金币`、
枚举编号 `10101`）都是合法的。如果填入不在枚举定义中的值，
转表会报错。

## 函数验证器

函数验证器提供了从外部数据源读取合法值集合的能力，
或者执行更复杂的验证逻辑。

### InText - 从文本文件读取合法值

从指定的文本文件（UTF-8编码）中读取合法值列表。

#### InText语法

```text
InText("文件名"[, 第几个字段[, "字段分隔正则表达式"]])
```

参数说明：

- `文件名`：文本文件路径（UTF-8编码），每行一个值
- `第几个字段`（可选）：按分隔符拆分后取第几个字段，从1开始
- `字段分隔正则表达式`（可选）：用于拆分每行内容的正则表达式

#### 读取合法值列表示例

假设有一个文件 `intext-validator.txt`，内容如下：

```text
50001
50002
50003
50004
50005
50006
```

在自定义验证器中引用：

```yaml
# validator.yaml
validator:
  - name: "custom_rule4"
    mode: "or"
    rules:
      - InText("intext-validator.txt")
```

在Excel中，被此验证器约束的字段只能填入
`50001`-`50006` 中的值。

#### 读取UE资源ID示例

在实际项目中，可以将UE引擎导出的资源ID列表存入文本文件，
用于验证配置中引用的资源是否有效：

```yaml
# validator.yaml
validator:
  - name: "UESourceAbilitySet_ue_source_id"
    description: "UE局内 AbilitySet资源 值校验"
    rules:
      - InText("UeSource_AbilitySet.txt", 3)
```

上述配置中， `InText("UeSource_AbilitySet.txt", 3)`
表示读取 `UeSource_AbilitySet.txt` 文件，取每行按默认分隔符
拆分后的第3个字段作为合法值。

### InTableColumn - 从Excel数据列读取合法值

从指定Excel文件的指定Sheet的数据列中读取合法值集合。
这是在实际项目中最常用的函数验证器之一。

#### 语法形式一（指定列号）

```text
InTableColumn("文件名", "Sheet名", 从第几行开始, 从第几列开始)
```

从指定的行号和列号开始，读取该列所有非空数据作为合法值。

#### 语法形式二（通过KeyRow匹配列号）

```text
InTableColumn("文件名", "Sheet名", 从第几行开始, KeyRow, KeyValue)
```

- `KeyRow`：在某一行中查找 `KeyValue` 匹配的列
- 找到匹配列后，从指定行开始读取该列的所有非空数据作为合法值
- 这种形式更加灵活，当Excel表结构变化（增删列）时不需要修改验证器配置

#### 验证用户等级示例

```yaml
# validator.yaml
validator:
  - name: "ExcelUserLevel_level"
    description: "User.xlsx 用户等级表 level 值校验"
    rules:
      - >-
        InTableColumn("User.xlsx",
          "用户等级表", 3, 2, "level")
```

上面的配置表示：在 `User.xlsx` 文件的 `用户等级表` Sheet中，
从第3行开始读取数据，在第2行中找到值为 `level` 的列，
然后读取该列从第3行开始的所有非空值作为合法值集合。

#### 验证道具ID示例（跨多个Sheet）

```yaml
# validator.yaml
validator:
  - name: "ExcelItem_ALL_item_id"
    description: "Item.xlsx 道具描述总表 item_id 值校验"
    rules:
      - >-
        InTableColumn("Item.xlsx",
          "道具描述总表", 3, 2, "item_id")
      - >-
        InTableColumn("Item.xlsx",
          "辅助道具(不可获得)", 3, 2, "item_id")
```

由于 `rules` 的默认模式是 `or`，上面的配置表示该字段值只要在
`道具描述总表` **或** `辅助道具(不可获得)` 中的 `item_id`
列出现过即视为合法。这种写法特别适合多个Sheet维护
同一类数据的情况。

#### 验证技能ID示例

```yaml
# validator.yaml
validator:
  - name: "ExcelSkill_skill_id"
    description: "Skill.xlsx 技能表 skill_id 值校验"
    rules:
      - >-
        InTableColumn("Skill.xlsx",
          "技能表", 3, 2, "skill_id")

  - name: "ExcelQuest_id"
    description: "Quest.xlsx Quest id 值校验"
    rules:
      - InTableColumn("Quest.xlsx", "Quest", 4, 3, "id")
```

> 注意： `从第几行开始` 和 `KeyRow` 的值需要根据Excel的实际结构来设置。
> 通常数据从第3行开始（第1行描述、第2行字段名、第3行开始是数据），
> KeyRow通常设为2（字段名行）。

### InMacroTable - 从Excel别名映射读取

从指定Excel的Sheet中读取别名映射关系，类似于全局的
`MacroSource`，但可以限定在特定字段上生效。
（需要 >= 2.20.0 版本）

#### InMacroTable指定列号语法

```text
InMacroTable("文件名", "Sheet名", 从第几行开始,
  第几列是映射Key, 第几列是映射Value)
```

#### InMacroTable通过KeyRow匹配语法

```text
InMacroTable("文件名", "Sheet名", 从第几行开始,
  KeyRow, 映射Key字段名, 映射Value字段名)
```

#### InMacroTable示例

在 [xresloader/sample/custom_validator.yaml](https://github.com/xresloader/xresloader/blob/main/sample/custom_validator.yaml)
中的 `custom_rule6`：

```yaml
# validator.yaml
validator:
  - name: "custom_rule6"
    version: 6
    mode: "and"
    rules:
      - >-
        InMacroTable("资源转换示例.xlsx",
          "field_alias_macro", 3, 2, "key", "value")
      - InValues(1234, 5678, "别名测试-月卡", "别名测试-年卡")
```

上面的配置表示：

1. 从 `资源转换示例.xlsx` 的 `field_alias_macro` Sheet中读取别名映射，
   在第2行中找到 `key` 列和 `value` 列，
   然后从第3行开始读取映射关系
2. 输入值必须同时满足别名映射结果在 `1234`、`5678`、
   `别名测试-月卡`、`别名测试-年卡` 之中

对应的proto定义：

```protobuf
message field_alias_message {
    int32 id    = 1;
    int32 value = 2 [(org.xresloader.validator) = "custom_rule6"];
}
```

### Regex - 正则表达式验证

使用正则表达式来验证输入值是否匹配。
（需要 >= 2.21.0 版本）

#### Regex语法

```text
Regex("正则表达式")
```

#### 验证邮箱格式示例

```yaml
# validator.yaml
validator:
  - name: "ValidEmail"
    description: "邮箱格式校验"
    rules:
      - >-
        Regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
```

#### 验证ID格式示例

```yaml
# validator.yaml
validator:
  - name: "ValidItemId"
    description: "道具ID必须是6-7位数字"
    rules:
      - Regex("^\\d{6,7}$")
```

## 逻辑组合验证器

逻辑组合验证器用于将多个子验证器组合成复杂的验证规则。
（`And`/`Or` 需要 >= 2.21.0 版本，
`Not`/`InValues` 需要 >= 2.22.2 版本）

### And - 同时满足所有子验证器

所有子验证器必须全部通过，数据才被视为合法。

```text
And(子验证器1, 子验证器2, ...)
```

#### And示例

```yaml
# validator.yaml
validator:
  - name: "ExcelBuilding_building_id_range"
    description: >-
      Building Item.xlsx ID 校验
      (必须是有效道具且在建筑范围内)
    mode: "and"
    rules:
      - ExcelItem_ADDABLE_item_id
      - ExcelItemIdRange_Building
```

也可以直接在验证器表达式中使用函数形式：

```yaml
validator:
  - name: "CustomValidCostType"
    rules:
      - And(cost_type, Not(InValues(0, 1)))
```

### Or - 满足任一子验证器

只要有一个子验证器通过，数据就被视为合法。
这也是 `rules` 列表的默认行为。

```text
Or(子验证器1, 子验证器2, ...)
```

#### 建筑ID范围示例（厨具或家具）

```yaml
# validator.yaml
validator:
  - name: "ExcelItemIdRange_Building"
    description: "道具ID范围-建筑(厨具或家具)"
    mode: "or"
    rules:
      - ExcelItemIdRange_BuildingKitchenware
      - ExcelItemIdRange_BuildingFurniture
```

上面的验证器将两个建筑相关的ID范围组合在一起，
填入厨具或家具范围内的ID都是合法的。

#### 跨Sheet引用验证示例

```yaml
# validator.yaml
validator:
  - name: "ExcelRandomPool_pool_id"
    description: "RandomPool.xlsx pool_id 值校验"
    mode: "or"
    rules:
      - >-
        InTableColumn("RandomPool.xlsx",
          "RandomPool", 3, 2, "pool_id")
      - >-
        InTableColumn("RandomPool.xlsx",
          "RandomPoolMerge", 3, 2, "pool_id")
```

### Not - 排除指定子验证器

数据不能通过任何一个指定的子验证器，相当于取反。

```text
Not(子验证器1, 子验证器2, ...)
```

#### 排除特定值示例

```yaml
# validator.yaml
validator:
  - name: "ExcelItem_ADDABLE_item_id"
    description: "可添加道具(排除只读和空值)"
    mode: "and"
    rules:
      # 必须在道具表中
      - >-
        InTableColumn("Item.xlsx",
          "道具描述总表", 3, 2, "item_id")
      - Not(InValues(0))
      - Not(ExcelItemIdRange_VirtualReadonly)
```

这是一种很常见的组合验证写法：

1. 值必须存在于 `Item.xlsx` 的 `道具描述总表` 中
2. 值不能是 `0`（防止策划遗漏配置）
3. 值不能在只读虚拟道具范围内

### InValues - 候选值验证

数据必须是指定候选值之一。

```text
InValues(值1, 值2, ...)
```

#### 限定星期几示例

```yaml
# validator.yaml
validator:
  - name: "ExcelDayRange_Weekday"
    description: "星期几(1-7)"
    rules:
      - InValues(1, 2, 3, 4, 5, 6, 7)
```

> 如果候选值是连续整数，也可以用范围语法 `1-7` 达到相同效果。

#### 限定特定枚举值示例

```yaml
# validator.yaml
validator:
  - name: "SpecificTypes"
    description: "只能是特定的几个值"
    rules:
      - InValues(1001, 1002, 1003, "特殊类型A", "特殊类型B")
```

## 自定义验证器配置

自定义验证器主要用于复用复杂的验证规则组合。
通过 `--validator-rules` 命令行参数指定一个YAML配置文件
来加载自定义验证器。

> 需要版本 >= 2.14.0-rc3

### 配置文件格式

```yaml
# validator.yaml
validator:
  - name: "验证器名称"
    description: "（可选）描述"
    version: 0
    mode: or
    rules:
      - 规则1
      - 规则2
      - ...
```

#### 参数说明

| 字段          | 必填 | 说明                                  |
| ------------- | ---- | ------------------------------------- |
| `name`        | 是   | 验证器名称，用于 `@` 或proto插件引用  |
| `description` | 否   | 描述信息，显示在验证错误日志中        |
| `version`     | 否   | 版本号（>= 2.20.0），配合版本控制使用 |
| `mode`        | 否   | 组合模式（>= 2.22.0），见下方说明     |
| `rules`       | 是   | 验证规则列表                          |

`mode` 字段的取值：

- `or`（默认）：任一规则通过即可
- `and`：所有规则必须通过
- `not`：所有规则都不能通过

也可以通过函数形式的 `And()`、`Or()`、`Not()`
在rules内实现相同效果。

`rules` 列表中的每条规则可以是：

- 值范围（如 `0-1000`、`>=100`）
- 枚举/Message名（如 `cost_type`、`unit_attribute`）
- 函数验证器（如 `InText(...)`、`InTableColumn(...)`）
- 其他自定义验证器名（如 `ExcelItem_ALL_item_id`）

> 为了降低错误配置的风险，xresloader 会检测验证器之间的环形依赖。
> 但为了降低不必要的检测开销，仅在第一次使用某个验证器时才会进行检查。

### 验证器引用与嵌套

自定义验证器可以引用其他自定义验证器，支持多层嵌套。
这让复杂验证规则的复用变得很方便。

#### 多层嵌套引用示例

```yaml
# validator.yaml
validator:
  # 基础范围定义
  - name: "ExcelItemIdRange_VirtualWritable"
    description: "道具ID范围-可发放虚拟道具"
    rules:
      - 1000-7999

  - name: "ExcelItemIdRange_VirtualReadonly"
    description: "道具ID范围-只读虚拟道具"
    rules:
      - 8000-9999

  - name: "ExcelItemIdRange_BuildingKitchenware"
    description: "道具ID范围-厨具"
    rules:
      - 500000-599999

  - name: "ExcelItemIdRange_BuildingFurniture"
    description: "道具ID范围-家具"
    rules:
      - 700000-749999

  # 组合：建筑ID范围（厨具 或 家具）
  - name: "ExcelItemIdRange_Building"
    description: "道具ID范围-建筑"
    mode: "or"
    rules:
      - ExcelItemIdRange_BuildingKitchenware
      - ExcelItemIdRange_BuildingFurniture

  # 组合：所有可用道具ID
  - name: "ExcelItemIdRange_ALL"
    description: "可用道具ID范围"
    mode: "or"
    rules:
      - ExcelItemIdRange_VirtualWritable
      - ExcelItemIdRange_VirtualReadonly
      - ExcelItemIdRange_BuildingKitchenware
      - ExcelItemIdRange_BuildingFurniture
      # ... 更多范围
```

### version字段与渐进式验证

从 2.20.0 版本开始，自定义验证器可以设置 `version` 字段。
配合命令行参数 `--data-validator-error-version` 使用，
可以实现渐进式验证策略：

- 当验证器的 `version` **低于**
  `--data-validator-error-version` 设置的版本号时，
  验证失败会报 **Error**（阻止转表）
- 当验证器的 `version` **高于或等于** 设置的版本号时，
  验证失败仅报 **Warning**（不阻止转表）
- `--data-validator-error-version` 设为 `0` 时，
  所有验证器失败都报 Error

这在引入新验证规则、又不想让旧数据立刻报错的场景下很实用。

#### 渐进式验证示例

```yaml
# validator.yaml
validator:
  - name: "old_rule"
    version: 3
    rules:
      - 0-9999

  - name: "new_strict_rule"
    version: 8
    rules:
      - 100-9999
```

使用 `--data-validator-error-version 5` 执行转表时：

- `old_rule`（version=3 < 5）验证失败 → **Error**，
  转表被阻止
- `new_strict_rule`（version=8 >= 5）验证失败 → **Warning**，
  转表继续

## 验证器在Protobuf插件中的使用

除了在Excel中使用 `@` 符号设置验证器，还可以在proto文件中
通过插件来设置。这种方式的好处是验证规则和协议定义紧密绑定，
不会因为Excel字段名写错而遗漏验证。

### org.xresloader.validator

为字段设置验证器，效果等同于在Excel字段名后使用 `@` 。

```protobuf
message role_upgrade_cfg {
    uint32 Id        = 1 [(org.xresloader.validator) = "custom_rule3"];
    uint32 Level     = 2;
    int32  CostType  = 3 [
        (org.xresloader.validator) = "custom_rule1",
        (org.xresloader.field_description) = "Refer to cost_type"
    ];
    int64  CostValue = 4 [(org.xresloader.validator) = "custom_rule5"];
    int32  ScoreAdd  = 5;
}
```

### org.xresloader.map_key_validator / map_value_validator

用于Map类型字段的Key和Value分别设置验证器。
在游戏配置中，Map类型的字段通常用于存储道具数量、
货币消耗等键值对数据，此时需要对Key和Value
分别进行合法性校验。
（需要 >= 2.15.0 版本）

#### 作用说明

- `map_key_validator`：验证Map中每个Key的值是否合法
- `map_value_validator`：验证Map中每个Value的值是否合法
- 两者可以独立使用，也可以同时使用
- 验证器语法与普通的 `validator` 完全相同，
  支持值范围、枚举名、自定义验证器名等

#### 配置方式

在proto文件中，为map字段添加验证器插件：

```protobuf
message cfg {
    // key必须是合法的道具ID
    // value必须在 1-99999 范围内
    map<int32, int32> item_counts = 1 [
        (org.xresloader.map_key_validator) = "ExcelItem_ALL_item_id",
        (org.xresloader.map_value_validator) = "1-99999"
    ];
}
```

#### 与自定义验证器配合使用

`map_key_validator` 和 `map_value_validator`
支持所有验证器类型，包括自定义验证器、
值范围、枚举名等：

```protobuf
message reward_cfg {
    // key必须是可添加的道具ID且不能为0
    // value必须是合法的数量范围
    map<int32, int32> rewards = 1 [
        (org.xresloader.map_key_validator) =
            "ExcelItem_ADDABLE_item_id",
        (org.xresloader.map_value_validator) = "1-99999"
    ];

    // 也可以使用枚举类型作为key的验证器
    map<int32, string> type_names = 2 [
        (org.xresloader.map_key_validator) = "cost_type"
    ];
}
```

#### Excel配置示例

对于上面的 `reward_cfg`，在Excel中配置map数据：

| ID | 奖励.key | 奖励.value | 奖励.key | 奖励.value |
| --- | --- | --- | --- | --- |
| ID | 奖励.key | 奖励.value | 奖励.key | 奖励.value |
| id | rewards[0].key | rewards[0].value | rewards[1].key | rewards[1].value |
| 1 | 10001 | 100 | 10002 | 200 |
| 2 | 金币 | 50 | | |

上面的配置中：

- `key` 列填入的道具ID必须是可添加的道具
  （通过 `ExcelItem_ADDABLE_item_id` 验证器校验）
- `value` 列填入的数量必须在 `1-99999` 范围内
- 第2行的 `金币` 是道具ID的别名，
  会通过宏表自动转换为对应的数字ID

> 这两个验证器也可以通过 `@` 符号在Excel中使用。
> 例如 `rewards@ExcelItem_ADDABLE_item_id`
> 可以为整个map字段设置验证器，
> 但更推荐使用 `map_key_validator` 和
> `map_value_validator` 分别对Key和Value进行精确验证。

## 空数据行忽略（field_not_null）

在Excel表格的日常维护中，经常会遇到空数据行的问题。
例如误删单元格后Excel仍保留不可见的样式配置，
或者不小心在空行上设置了单元格格式。
这些空数据行会导致转出数据中出现大量无效的空记录。

`org.xresloader.field_not_null` 插件可以解决这个问题。
当一个字段设置了 `field_not_null = true` 后，
如果该字段在Excel某一行中为空，
则整行数据会被自动忽略，不会转出到最终结果中。

> 需要版本 >= 2.14.0-rc2

<!-- markdownlint-disable-next-line MD024 -->
### 配置方式

在proto文件中为需要非空的字段
添加 `(org.xresloader.field_not_null) = true` ：

```protobuf
message level_up_cfg {
    uint32 id = 1 [
        (org.xresloader.field_not_null) = true
    ];
    uint32 level = 2;
}
```

### Excel示例

| 角色ID | 等级  | 备注         |
| ------ | ----- | ------------ |
| 角色ID | 等级  | 备注         |
| id     | level |              |
| 10001  | 1     |              |
|        | 2     | 此行会被忽略 |
| 10002  | 3     |              |

上面的配置中， `id` 字段设置了 `field_not_null`。

- 第3行： `id=10001` 有值，正常转出
- 第4行： `id` 为空，整行被忽略
- 第5行： `id=10002` 有值，正常转出

### 典型使用场景

- **关键字段防遗漏**：给主键（如 `id`、`item_id`）
  设置 `field_not_null`，策划漏填时整行被跳过，
  避免产出大量无效数据
- **可选字段区分**：某些字段可能是可选的，
  但关键字段必须填写。通过 `field_not_null`
  可以精确控制哪些行必须保留
- **清理Excel误操作**：Excel中误操作产生的空行
  会被自动过滤，无需手动清理

> 对于oneof类型的字段，可以使用
> `org.xresloader.oneof_not_null` 插件实现相同效果，
> 忽略oneof字段为空的行。

## 唯一性检测（field_unique_tag）

在很多配置表中，某些字段的组合必须保证唯一性。
例如"角色ID+等级"的组合不能重复，
否则程序逻辑可能会出错。

`org.xresloader.field_unique_tag` 插件可以自动检测
这种唯一性约束。使用方法是为需要唯一性检测的字段
设置相同的tag值。所有tag值相同的字段会被组合到一起，
转表时检测这些字段的组合值是否重复。
发现重复数据时，转表工具会报 Error 并阻止转出。

> 需要版本 >= 2.14.0-rc2

<!-- markdownlint-disable-next-line MD024 -->
### 配置方式

在proto文件中为需要唯一性约束的字段
设置相同的 `field_unique_tag` 值：

```protobuf
message level_up_cfg {
    uint32 id = 1 [
        (org.xresloader.field_unique_tag) = "id_level"
    ];
    uint32 level = 2 [
        (org.xresloader.field_unique_tag) = "id_level"
    ];
}
```

上面的配置中， `id` 和 `level` 字段都设置了
`field_unique_tag = "id_level"`。
转表时会检测所有行的 `(id, level)` 组合是否唯一。

<!-- markdownlint-disable-next-line MD024 -->
### Excel示例

| 角色ID | 等级  | 备注       |
| ------ | ----- | ---------- |
| 角色ID | 等级  | 备注       |
| id     | level |            |
| 10001  | 1     |            |
| 10001  | 2     |            |
| 10001  | 1     | 此行会冲突 |

转表时的检测结果：

- `(10001, 1)` - 第1次出现，合法
- `(10001, 2)` - 未重复，合法
- `(10001, 1)` - 第2次出现，与第1行冲突，**报错**

### 多字段组合唯一性

可以为更多字段设置相同的tag来实现多字段联合唯一：

```protobuf
message item_drop_cfg {
    uint32 server_id = 1 [
        (org.xresloader.field_unique_tag) = "item_group"
    ];
    uint32 item_type = 2 [
        (org.xresloader.field_unique_tag) = "item_group"
    ];
    uint32 item_id = 3 [
        (org.xresloader.field_unique_tag) = "item_group"
    ];
}
```

上面的配置定义了三字段联合唯一性约束：
`(server_id, item_type, item_id)` 的组合必须唯一。

### 多组唯一性约束

一个字段可以设置多个不同的 `field_unique_tag`，
参与多组唯一性检测：

```protobuf
message shop_cfg {
    uint32 shop_id = 1 [
        (org.xresloader.field_unique_tag) = "shop_id",
        (org.xresloader.field_unique_tag) = "shop_group"
    ];
    uint32 group_id = 2 [
        (org.xresloader.field_unique_tag) = "shop_group"
    ];
}
```

上面的配置定义了两个唯一性约束：

- `shop_id`： `shop_id` 本身必须唯一
- `shop_group`： `shop_id + group_id` 的组合必须唯一

<!-- markdownlint-disable-next-line MD024 -->
### 典型使用场景

- **复合主键唯一性**：如 `(角色ID, 等级)` 组合唯一
- **多字段联合唯一**：如 `(服务器ID, 道具类型, 道具ID)`
  三个字段的组合必须唯一
- **防止策划重复配置**：自动检测并阻止重复数据行

## 验证器相关命令行参数

| 参数 | 描述 | 说明 |
| --- | --- | --- |
| `--validator-rules` | 配置文件路径 | 指定YAML自定义验证器规则文件 |
| `--disable-data-validator` | 忽略验证错误 | 验证失败仅输出警告（>= 2.17.0） |
| `--data-validator-error-version` | 错误起始版本号 | 低于此版本报错，否则仅告警（>= 2.20.0） |

### 使用示例

```bash
# 使用自定义验证器
java -jar xresloader.jar \
  --validator-rules validator.yaml \
  -t bin -p protobuf -f kind.pb \
  -m "DataSource=data.xlsx|sheet1|3,1" \
  -m ProtoName=role_cfg \
  -m OutputFile=role_cfg.bin \
  -m KeyRow=2
```

```bash
# 使用验证器版本控制
java -jar xresloader.jar \
  --validator-rules validator.yaml \
  --data-validator-error-version 5 \
  -t bin -p protobuf -f kind.pb ...
```

```bash
# 忽略验证错误（不推荐，仅在紧急情况下使用）
java -jar xresloader.jar \
  --validator-rules validator.yaml \
  --disable-data-validator \
  -t bin -p protobuf -f kind.pb ...
```

在批量转表工具
（如 [xresconv-cli](https://github.com/xresloader/xresconv-cli)）
的配置文件（XML格式）中，可以在 `<global>` 节点中配置：

```xml
<root>
    <global>
        <proto>protobuf</proto>
        <proto_file>../../Protocol/pb/Configure.pb</proto_file>
        <output_dir>../../Output/ConfigSet/</output_dir>
        <data_src_dir>./ExcelTables/</data_src_dir>
        <!-- 指定验证器规则文件 -->
        <option>--validator-rules validator.yaml</option>
        <!-- 可选：设置验证器版本号 -->
        <option>--data-validator-error-version 5</option>
    </global>
</root>
```

## 验证器实战案例

以下展示一些在实际项目中常用的验证器组合模式。

### 案例1：道具ID的多维度校验

一个典型的道具系统通常有如下需求：

- 道具ID必须存在于 `Item.xlsx` 的道具总表中
- 不同业务场景需要限定不同范围的道具ID
- 某些场景需要排除只读道具或特殊道具

```yaml
# validator.yaml
validator:
  # 基础：所有道具（在总表或辅助表中）
  - name: "ExcelItem_ALL_item_id"
    description: "Item.xlsx 道具ID校验（包含辅助道具）"
    rules:
      - >-
        InTableColumn("Item.xlsx",
          "道具描述总表", 3, 2, "item_id")
      - >-
        InTableColumn("Item.xlsx",
          "辅助道具(不可获得)", 3, 2, "item_id")

  # 可添加的道具（排除只读和0值）
  - name: "ExcelItem_ADDABLE_item_id"
    description: "可添加道具ID校验（排除只读和空值）"
    mode: "and"
    rules:
      - >-
        InTableColumn("Item.xlsx",
          "道具描述总表", 3, 2, "item_id")
      - Not(InValues(0))
      - Not(ExcelItemIdRange_VirtualReadonly)

  # 建筑类道具（必须是可添加的，且在建筑范围内）
  - name: "ExcelBuilding_building_id_range"
    description: "建筑道具ID校验"
    mode: "and"
    rules:
      - ExcelItem_ADDABLE_item_id
      - ExcelItemIdRange_Building

  # 菜单类道具（必须是可添加的，在菜单范围内，
  #           且在菜单升级表中存在）
  - name: "ExcelMenu_menu_id_range"
    description: "菜谱道具ID校验"
    mode: "and"
    rules:
      - ExcelItem_ADDABLE_item_id
      - ExcelItemIdRange_Menu
      - ExcelMenuUpgrade_menu_id
```

### 案例2：多Sheet联合校验

当同一个实体的数据分布在多个Sheet中时，
验证器可以组合多个 `InTableColumn` 实现联合校验：

```yaml
# validator.yaml
validator:
  # 菜单ID可以在普通菜谱表或魔物菜谱表中
  - name: "ExcelMenu_menu_id_all"
    description: "菜单ID校验（普通菜谱&魔物菜谱）"
    rules:
      - >-
        InTableColumn("Menu.xlsx",
          "普通菜谱", 3, 2, "menu_id")
      - >-
        InTableColumn("Menu.xlsx",
          "魔物菜谱", 3, 2, "menu_id")

  # 商城商品ID可以在购买表或兑换表中
  - name: "ExcelMallProduct_product_id"
    description: "商城商品ID校验"
    rules:
      - >-
        InTableColumn("Mall.xlsx",
          "商城商品表", 3, 2, "product_id")
      - >-
        InTableColumn("Mall.xlsx",
          "商城商品表-兑换", 3, 2, "product_id")

  # 顾客组：可以是普通顾客ID或魔物订单顾客组
  - name: >-
      ExcelCustomerExcelMonsterMenuCustomer_customer_id_customer_group
    description: "顾客ID/组校验"
    mode: "or"
    rules:
      - >-
        InTableColumn("Customer.xlsx",
          "普通顾客", 3, 2, "customer_id")
      - >-
        InTableColumn("Customer.xlsx",
          "魔物订单顾客", 3, 2, "customer_group")
```

### 案例3：排除默认值的验证模式

在很多场景中，protobuf的默认值（如int类型的0）
通常代表"未配置"。我们可以通过验证器来确保
关键字段不会被遗漏：

```yaml
# validator.yaml
validator:
  # 抽奖池组ID（不能为0，且必须存在于抽奖池组表中）
  - name: "ExcelLotteryPoolGroup_lottery_group_id"
    description: "抽奖池组ID校验（不能为0）"
    mode: "and"
    rules:
      - Not(InValues(0))
      - >-
        InTableColumn("Lottery.xlsx",
          "抽奖池组", 3, 2, "lottery_pool_group_id")

  # 随机池元素类型（特定值8003或可添加道具）
  - name: "ExcelRandomPool_element_type_id"
    description: "随机池元素类型ID校验"
    mode: "or"
    rules:
      - 8003
      - ExcelItem_ADDABLE_item_id
```

### 案例4：完整项目的验证器层次结构

下面是一个完整项目中验证器层次结构的示例，
展示如何从基础范围定义逐步构建出复杂的验证规则：

```yaml
# validator.yaml

# ===== 第一层：基础ID范围定义 =====
validator:
  - name: "ExcelItemIdRange_VirtualWritable"
    description: "道具ID范围-可发放虚拟道具"
    rules:
      - 1000-7999

  - name: "ExcelItemIdRange_Menu"
    description: "道具ID范围-食谱"
    rules:
      - 300000-319999

  - name: "ExcelItemIdRange_Character"
    description: "道具ID范围-角色卡牌"
    rules:
      - 2000000-2099999

  # ... 其他基础范围

# ===== 第二层：组合范围 =====
  - name: "ExcelItemIdRange_ALL"
    description: "所有可用道具ID范围"
    mode: "or"
    rules:
      - ExcelItemIdRange_VirtualWritable
      - ExcelItemIdRange_Menu
      - ExcelItemIdRange_Character
      # ... 所有基础范围

# ===== 第三层：带InTableColumn的校验 =====
  - name: "ExcelItem_ALL_item_id"
    description: "道具表中存在的ID"
    rules:
      - >-
        InTableColumn("Item.xlsx",
          "道具描述总表", 3, 2, "item_id")
      - >-
        InTableColumn("Item.xlsx",
          "辅助道具(不可获得)", 3, 2, "item_id")

  - name: "ExcelItem_ADDABLE_item_id"
    description: "可添加道具ID"
    mode: "and"
    rules:
      - >-
        InTableColumn("Item.xlsx",
          "道具描述总表", 3, 2, "item_id")
      - Not(InValues(0))
      - Not(ExcelItemIdRange_VirtualReadonly)

# ===== 第四层：业务组合校验 =====
  - name: "ExcelBuilding_building_id_range"
    description: "建筑道具ID校验"
    mode: "and"
    rules:
      - ExcelItem_ADDABLE_item_id
      - ExcelItemIdRange_Building

  - name: "ExcelCharacter_character_id_range"
    description: "角色道具ID校验"
    mode: "and"
    rules:
      - ExcelItem_ADDABLE_item_id
      - ExcelItemIdRange_Character
```

验证器检查不通过时，转表工具会输出详细的错误信息，
包含数据所在的Excel文件、Sheet、行号、列号
以及不满足的验证规则。示例如下：

![验证器检查错误示例](/img/users/custom_validator.png)
