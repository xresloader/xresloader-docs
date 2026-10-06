---
title: Advanced usage
description: Advanced features and customization
---

# Advanced features {#高级功能}

## Text substitution (aliases and macros) {#文本替换别名宏}

Configure an alias table with `MacroSource`: major is the filename, minor the sheet, and addition the first key/value row and column. For example:

| Key | Description | Major | Minor | Addition | Notes |
| ----------- | --------------------------- | ----------------- | ------ | -------- | ------------------------------------------------ |
| MacroSource | Text macro workbook and sheet | example.xlsx | macro | 2,1 | Minor selects the sheet; addition sets the starting row and column. |

In example.xlsx, sheet macro, column 1 contains alias keys and column 2 values, starting at row 2.

During conversion, matching aliases are replaced by their values.

For example, the numeric CostType column in the [upstream sample](https://github.com/xresloader/xresloader/tree/main/sample) can use a text alias whose macro value is 10001. An English equivalent is:

| Key | Value |
| ------ | ----- |
| Game currency | 10001 |

## Merge data from multiple sheets {#多表数据合并}

For sheets with the same field structure, specify multiple `DataSource` entries. [xresloader](https://github.com/xresloader/xresloader) merges them into one output, allowing source data to be organized across sheets.

See scheme_upgrade, upgrade_10001 and upgrade_10002 in the upstream workbook 资源转换示例.xlsx in the [sample](https://github.com/xresloader/xresloader/tree/main/sample). The filename is an upstream literal.

## Data validators {#数据验证器}

[xresloader](https://github.com/xresloader/xresloader)
Protocol-based **data validators**
check Excel input during conversion
and catch values outside the expected range or structure.

Supported rules include numeric ranges, messages, enums,
functions (InText/InTableColumn/InMacroTable/Regex),
logical combinations (And/Or/Not/InValues) and custom rules.

See [Data validators](/docs/users/validator).

## Protobuf extensions {#protobuf-插件支持}

Import [xresloader-protocol/common](https://github.com/xresloader/xresloader-protocol/tree/main/common) and the relevant proto files in [extensions/v2](https://github.com/xresloader/xresloader-protocol/tree/main/core/extensions/v2) or [extensions/v3](https://github.com/xresloader/xresloader-protocol/tree/main/core/extensions/v3) to use these extensions.

> When compiling descriptors, include the extension proto files and google/protobuf/descriptor.proto from protobuf's official include directory.

### Message extensions {#protobuf插件---message插件}

| Extension | Type | Purpose |
| -------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Extension | Type | Purpose |
| org.xresloader.msg_description | string | Message description included in output headers and code. |
| org.xresloader.msg_require_mapping_all | bool | Require every message field to be mapped. |
| org.xresloader.msg_separator | string | Plain-mode separator candidates, default `,;\|`. |
| org.xresloader.ue.helper | string | Class-name suffix for generated UE utilities. |
| org.xresloader.ue.not_data_table | bool | Omit loading code for dependency types with a name field. |
| org.xresloader.ue.default_loader | enum | Per-message default loader control (>=2.13.1): `EN_LOADER_MODE_DEFAULT`, `EN_LOADER_MODE_ENABLE`, `EN_LOADER_MODE_DISABLE`. |
| org.xresloader.ue.include_header | repeated string | Additional UE includes (>=2.13.1). |

See arr_in_arr_cfg in [kind.proto](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto) for extensions affecting output.

### Field extensions {#protobuf插件---field插件}

| Extension | Type | Purpose |
| ------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| org.xresloader.field_description | string | Field description included in headers and code. |
| org.xresloader.validator | string | Field validator: ranges, protocol fields/enums, functions or custom rules; see [Validators](./validator). |
| org.xresloader.verifier | string | Deprecated name; use org.xresloader.validator. |
| org.xresloader.field_unique_tag | repeated string | Fields sharing a tag form a unique combination (>=2.14.0-rc2). |
| org.xresloader.map_key_validator | string | Map key validators separated by `\|`; any passing rule accepts the value. |
| org.xresloader.map_value_validator | string | Map value validators separated by `\|`; any passing rule accepts the value. |
| org.xresloader.field_not_null | bool | Skip rows with an empty mapped field (>=2.14.0-rc2). |
| org.xresloader.field_alias | repeated string | Aliases usable in validators and Excel cells; multiple aliases since 2.14.0-rc2. |
| org.xresloader.field_ratio | int32 | Output value = Excel value × ratio. With ratio 1000, 1.05 becomes 1050. |
| org.xresloader.field_separator | string | Per-field Plain-mode separators, default `,;\|`, overriding global/message settings. |
| org.xresloader.field_required | bool | Add a required constraint to proto3, analogous to proto2 required. |
| org.xresloader.field_origin_value | string | For converted Timestamp/Duration data, store the original input in this string field, whose repeated property must match (>=2.12.0). |
| org.xresloader.field_allow_missing_in_plain_mode | bool | Allow an omitted Plain-mode field and use its default (>=2.16.0). |
| org.xresloader.field_list_strip_option | enum | Per-field array trimming (>=2.18.0): `LIST_STRIP_DEFAULT` follows command options (default removes all empty values); `LIST_STRIP_NOTHING` keeps empties; `LIST_STRIP_TAIL` removes trailing empties; `LIST_STRIP_ALL` removes all empties. |
| org.xresloader.field_list_min_size | string | Minimum array length, given as a number or enum name (>=2.18.0). |
| org.xresloader.field_list_max_size | string | Maximum array length, given as a number or enum name (>=2.18.0). |
| org.xresloader.field_list_strict_size | bool | Error instead of padding to the minimum length; default false (>=2.18.0). |
| org.xresloader.field_tag | repeated string | Tags used by `--ignore-field-tags` to skip data (>=2.19.0). |
| org.xresloader.ue.key_tag | int64 | Positive coefficient for combining multiple UE keys into a Name. |
| org.xresloader.ue.ue_type_name | string | Generate `TSoftObjectPtr<ue_type_name>` with Blueprint asset references. |
| org.xresloader.ue.ue_type_is_class | bool | When true, generate `TSoftClassPtr<ue_type_name>` with Blueprint class references. |
| org.xresloader.ue.ue_origin_type_name | string | Original type in generated UE code (>=2.14.0-rc1). |
| org.xresloader.ue.ue_origin_type_default_value | string | Default value for the original UE type (>=2.14.0-rc1). |

Example unit attributes:

```protobuf
import "xresloader.proto";

message unit_attribute {
    int32 hp           = 1 [(org.xresloader.field_alias) = "Health"];
    int32 mp           = 2 [(org.xresloader.field_alias) = "Mana"];
    int32 power        = 3 [(org.xresloader.field_alias) = "Strength"];
}

message skill_effect {
    int32 id           = 1;
    int32 level        = 2;
    int32 func_type    = 3;
    int32 attr_type    = 4;
    int32 value        = 5;
}
```

Use those aliases in Excel:

| Skill ID | Level | Function type | Attribute | Value |
| ------ | ----- | --------- | ------------------------ | ----- |
| Skill ID | Level | Function type | Attribute | Value |
| id     | level | func_type | attr_type@unit attribute | value |
| 20001 | 1 | | **Health** | 100 |
| 20001 | 2 | 1001 | **Health** | 200 |

### Enum value extensions {#protobuf插件---enumvalue插件}

| Extension | Type | Purpose |
| -------------------------------- | ------ | --------------------------------------------------------------------- |
| Extension | Type | Purpose |
| org.xresloader.enumv_description | string | Enum value description in headers and code. |
| org.xresloader.enum_alias | repeated string | Enum aliases usable in validators and Excel cells; multiple aliases since 2.14.0-rc2. |

In [kind.proto](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto), role_upgrade_cfg.CostType uses the cost_type validator. An English alias example is:

```protobuf title="sample/quick_start/sample-conf/kind.proto"
syntax = "proto3";

import "xresloader.proto";
// Download protocols.zip from https://github.com/xresloader/xresloader/releases
// to obtain xresloader.proto

enum cost_type {
  EN_CT_UNKNOWN = 0;
  EN_CT_MONEY = 10001 [ (org.xresloader.enum_alias) = "Gold" ];
  EN_CT_DIAMOND = 10101 [ (org.xresloader.enum_alias) = "Diamond" ];
}

message role_upgrade_cfg {
  uint32 Id = 1;
  uint32 Level = 2;
  uint32 CostType = 3 [
    (org.xresloader.validator) =
        "cost_type", // Equivalent to @cost_type in Excel
    (org.xresloader.field_description) = "Refer to cost_type"
  ];
  int32 CostValue = 4;
  int32 ScoreAdd = 5;
}
```

Then configure costs as follows:

| Character ID | Level | Currency type | Cost |
| ------ | ----- | ----------- | ------------------------------------------------------- |
| Character ID | Level | Currency type | Cost |
| Id     | Level | CostType    | [CostValue@0-1000](mailto:CostValue@0-1000) \|2000-3000 |
| 10001  | 1     | EN_CT_MONEY | 10                                                      |
| 10001 | 2 | **Gold** | 50 |

### Oneof extensions (>=2.8.0) {#protobuf插件---oneof插件280版本及以上}

| Extension | Type | Purpose |
| ------------------------------------------------ | ------ | --------------------------------------------------------------------------------- |
| org.xresloader.oneof_description | string | Oneof description, potentially included in headers and code. |
| org.xresloader.oneof_separator | string | Plain-mode oneof separators, default `,;\|`. |
| org.xresloader.oneof_not_null | bool | Skip rows with an empty mapped oneof (>=2.14.0-rc2). |
| org.xresloader.oneof_allow_missing_in_plain_mode | bool | Allow missing Plain-mode input and use a default (>=2.16.0). |
| org.xresloader.oneof_tag | repeated string | Tags used by `--ignore-field-tags` to skip data (>=2.16.0). |

## Export a subset of fields {#仅导出部分字段}

Use different proto messages for client and server fields from the same sheet. Fields absent from a message are ignored during conversion; role_server and role_client can share one source while defining different structures.

## Batch include elements {#批量转表的include标签}

See [XML configuration](./xresconv#合并与两种工具的差异) for path bases, merge order and CLI/GUI differences.

## Formulas {#公式支持}

[xresloader](https://github.com/xresloader/xresloader) supports formulas, but cross-workbook formulas are discouraged. Some platforms store absolute references; when a referenced workbook cannot be read, Excel's cached formula result may be used without a freshness warning.

## Fixed-length arrays {#定长数组}

See [Fixed-length arrays](./data-types#定长数组); the current option is `--list-keep-empty`.

## Plain mode (>=2.7.0) {#plain模式需要-xresloader-270及以上}

Plain mode puts numeric/string arrays or an entire message in one cell. Elements and fields use separator candidates; the first candidate found in the input is selected. Default candidates are `,;|`.

Since 2.23.0, newline separators normalize platform line endings, while space/tab separators collapse consecutive whitespace. Versions 2.23.2/2.23.4 improve empty strings and error messages.

Plain parsing applies automatically when an array has no indexed columns or a mapped field refers directly to a message.

Example protocol:

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

Example Excel input:

| Configuration ID | Plain message | Plain array |
| ------ | ---------- | --------- |
| Configuration ID | Plain message | Plain array |
| id     | plain_msg  | plain_arr |
| 101    | 101\|1,2,3 | 7;8;9     |

For plain_msg input `101|1,2,3`, `|` separates message fields and `,` separates plain_msg.param elements. For plain_arr input `7;8;9`, `;` separates array elements.

Use `org.xresloader.field_separator` and `org.xresloader.msg_separator` for custom separators, especially to distinguish array separators from message separators in repeated messages. Repeated fields accept field_separator; non-repeated messages accept either field_separator or msg_separator.

Plain message fields are parsed in field-number order.

See the upstream arr_in_arr sheet and [arr_in_arr_cfg](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto).

**Plain mode for UE-Csv and UE-Json requires xresloader >=2.8.0.**

## Oneof/union support (>=2.8.0) {#oneofunion支持需要-xresloader-280及以上}

Oneof input uses Plain-style parsing. Set a custom separator with `org.xresloader.oneof_separator`.

Map the oneof name in Excel. The first part is the selected field name, field number or alias; the second is that field's Plain-mode value:

```protobuf
// Constant enum
enum cost_type {
    EN_CT_UNKNOWN              = 0;
    EN_CT_MONEY                = 10001 [(org.xresloader.enum_alias) = "Gold"];
    EN_CT_DIAMOND              = 10101 [(org.xresloader.enum_alias) = "Diamond"];
}

message cfg {
  int32 id = 1;
  oneof reward {
    plain_message msg       = 11 [ (org.xresloader.field_alias) = "Nested message" ];
    int64         user_exp  = 12 [ (org.xresloader.field_alias) = "Numeric value" ];
    string        note      = 13 [ (org.xresloader.field_alias) = "Description text" ];
    cost_type     enum_type = 14 [ (org.xresloader.field_alias) = "Currency type" ];
  }
}

message plain_message {
    int32 id = 1;
    repeated int32 param = 2;
}
```

All these inputs are accepted:

| Configuration ID | Oneof value |
| ------ | ----------------------- |
| Configuration ID | Oneof value |
| id     | reward                  |
| 1001   | msg\|101;1,2,3          |
| 1002 | Numeric value\|100 |
| 1003   | 13\|Hello World         |
| 1004 | enum_type\|Gold |
| 1005 | Currency type\|EN_CT_DIAMOND |

As in Plain mode, fields are parsed in field-number order. A nested oneof occupies the position of its first member; later members of that oneof need no separate input.

See the upstream test_oneof sheet and [event_cfg](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto).

## Map support (>=2.9.0) {#map类型支持需要-xresloader-290及以上}

Protobuf maps use array-style indexed input with built-in key and value fields. They also accept Plain input. Example:

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

Accepted Excel input:

| Configuration ID | Map[0].key | Map[0].value | Map[1].key | Map[1].value | Plain map |
| ------ | ------------------ | -------------------- | ------------------ | -------------------- | ----------------------------- |
| Configuration ID | Map[0].key | Map[0].value | Map[1].key | Map[1].value | Plain map |
| id     | test_map_is[0].key | test_map_is[0].value | test_map_is[1].key | test_map_is[1].value | test_map_sm                   |
| 1001 | 10 | Map[0].value | 11 | Map[1].value | aa;111,112\|special:characters;121,122 |
| 1002 | 20 | Map[0].value | 21 | Map[1].value | ba;211,212\|special.characters;221,222 |
| 1003 | 30 | Map[0].value | 31 | Map[1].value | ca;311,312\|cb;321,322 |

UE-Csv and UE-Json generate code such as:

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

For XML, map keys may not be valid tag names. The tag uses the type name (string, int32 or int64), with a key attribute holding the actual key and a type attribute identifying its type.

See the upstream arr_in_arr sheet and [arr_in_arr_cfg](https://github.com/xresloader/xresloader/blob/main/sample/proto_v3/kind.proto).

## Processing data with CallbackScript (>=2.13.0) {#使用-callbackscript-处理数据需要-xresloader-2130及以上}

Specify a JavaScript data callback with `-m CallbackScript=SCRIPT_PATH`; see [Mapping options](./data-mapping#可用的配置项).

The script uses these interfaces:

- `gOurInstance` exposes `DataSrcImpl.getOurInstance()`.
- `gSchemeConf` exposes `SchemeConf.getInstance()`.
- Provide `function initDataSource()` for changes of workbook or sheet.
- Provide `function currentMessageCallback(originMsg, typeDesc)` for each message.
  - originMsg is the original data as a HashMap.
  - typeDesc is an org.xresloader.core.data.dst.DataDstWriterNode.DataDstTypeDescriptor.
See process_by_script1, process_by_script2 and cb_script.js in the [upstream sample](https://github.com/xresloader/xresloader/tree/main/sample).

## Copy one cell to multiple fields (>=2.14.0-rc1) {#多字段复制需要-xresloader-2140-rc1及以上}

List comma-separated field names in the KeyRow cell to copy one value into each field:

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

| Character ID | Level | Experience |
| ------ | ---------------- | -------- |
| Character ID | Level | Experience |
| id     | level,data.level | data.exp |
| 10001  | 1                | 0        |

## Skip accidental empty Excel rows (>=2.14.0-rc2) {#剔除excel误操作带来的空数据行需要-xresloader-2140-rc2及以上}

Use `org.xresloader.field_not_null` or `org.xresloader.oneof_not_null` to skip a row with empty mapped data, including rows left behind by cell formatting or incomplete deletion:

```protobuf
message level_up_cfg {
    uint32         id    = 1 [ (org.xresloader.field_not_null) = true ];
    uint32         level = 2;
}
```

| Character ID | Level | Notes |
| ------ | ----- | ------------ |
| Character ID | Level | Notes |
| id     | level |              |
| 10001  | 1     |              |
| | 2 | This row is skipped |

## Uniqueness checks (>=2.14.0-rc2) {#唯一性检测需要-xresloader-2140-rc2及以上}

Set one or more `org.xresloader.field_unique_tag` values. Fields with the same tag form a tuple that must occur only once; duplicates cause a conversion error:

```protobuf
message level_up_cfg {
    uint32         id    = 1 [ (org.xresloader.field_unique_tag) = "id_level" ];
    uint32         level = 2 [ (org.xresloader.field_unique_tag) = "id_level" ];
}

```

| Character ID | Level | Notes |
| ------ | ----- | ---------- |
| Character ID | Level | Notes |
| id     | level |            |
| 10001  | 1     |            |
| 10001  | 2     |            |
| 10001 | 1 | Duplicate tuple |

## Global settings and transposition (>=2.23.0) {#全局配置行列翻转需要-xresloader-2230及以上}

A global settings sheet may store one field per row and limit the extraction range.
Use `--transpose-data-source` together with DataSource end coordinates.

An English equivalent of the upstream global_settings sheet is:

| Identifier | String value | Type | Description |
| ----------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| test_duration1 | 30d | google.protobuf.Duration | Duration; units w/weeks,d/days,h/hours,m/minutes,s/seconds,ms/milliseconds,us/microseconds,ns/nanoseconds. |
| test_duration2 | 30ms | google.protobuf.Duration | Duration with the same supported units. |
| test_timestamp | 2009-07-05 15:25:00 | google.protobuf.Timestamp | Date/time: no suffix uses system timezone; Z is UTC; a signed hour/minute suffix supplies a timezone. |
| mail_max_count_per_major_type | 100 | int | Maximum user mail count per major type. |
| i18n_system_admin | System administrator | string | Administrator nickname. |
| test_plain_msg | 1-2 | test_msg_verifier | Plain message. |
| test_arr | 721,722,12\|10001 <br/> 821,822,Currency type\|EN_CT_DIAMOND <br/> 921,822,Description text\|array with nested oneof | event_rule_item | Plain message array with nested oneof. |
| test_repeated_timestamp       | 2009-07-05 15:25:00<br/>     2009-07-05 15:25:00Z<br/>2009-07-05 15:25:00+04:00                | array:google.protobuf.Timestamp |                                                                                                                                         |
| timezone_base_timestamp | 2025-01-06 00:00:00+08:00 | google.protobuf.Timestamp | Reference for weekly/daily settlement; midnight on the first weekday, e.g. Monday or Sunday at UTC+8. |
| test_plain_enum_array | Gold,Gold,Diamond | array:enum | |
| test_standard_msg.id          | 537                                                                                              |                                 |                                                                                                                                         |
| test_standard_msg.level       | 648                                                                                              |                                 |                                                                                                                                         |
| test_map_is[0].key | 70 | `map<int32, string>` | Simple map test. |
| test_map_is[0].value | Simple map test.value | | |
| test_map_is[1].key            | 71                                                                                               |                                 |                                                                                                                                         |
| test_map_is[1].value | Simple map test.value | | |
| test_map_sm[0].key | aa | `map<string, dep2_cfg>` | Nested map test. |
| test_map_sm[0].value          | 811,812                                                                                          |                                 |                                                                                                                                         |
| test_map_sm[1].key | special:characters | | |
| test_map_sm[1].value          | 821,822                                                                                          |                                 |                                                                                                                                         |

Protocol definition:

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

Add these parameters to convert this sheet into a global_settings message (the original upstream filename is retained):

- `--transpose-data-source`: transpose reading; KeyRow becomes a column number.
- `-m "KeyRow=1"`: field keys are in column 1.
- `-m "DataSource=${workspaceFolder}/sample/资源转换示例.xlsx|global_settings|2,2,0,2"`: read from row 2, column 2, stopping at column 2 with no ending row. Translate input aliases together with the schema when using the English illustration above.
