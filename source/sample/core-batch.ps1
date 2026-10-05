param(
    [Parameter(Mandatory)][string]$JarPath,
    [Parameter(Mandatory)][string]$SampleDir,
    [string]$OutputDir = 'output-batch',
    [switch]$IncludeValidationFailures
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$jar = (Resolve-Path -LiteralPath $JarPath -ErrorAction Stop).Path
$sample = (Resolve-Path -LiteralPath $SampleDir -ErrorAction Stop).Path
foreach ($file in @('proto_v3/kind.pb', '资源转换示例.xlsx', 'custom_validator.yaml')) {
    Get-Item -LiteralPath (Join-Path $sample $file) -ErrorAction Stop | Out-Null
}
if ($OutputDir.Contains('"') -or $OutputDir.Contains("`n") -or $OutputDir.Contains("`r")) {
    throw '输出路径不能包含引号或换行（stdin 参数格式不能转义引号）。'
}
# 保留文档原有 16 项多格式、常量、描述信息、宏、嵌套数组及 UE 示例。
$tasks = @'
-t lua -p protobuf -o "@OUTPUT@"     -f proto_v3/kind.pb --pretty 2 -i kind.desc.lua
-t json -p protobuf -o "@OUTPUT@"    -f proto_v3/kind.pb --pretty 2 -i kind.desc.json
-t json -p protobuf -o "@OUTPUT@"    -f proto_v3/kind.pb -s 资源转换示例.xlsx -m scheme_kind -n "/(?i)\.bin$/\.json/"
-t xml -p protobuf -o "@OUTPUT@"     -f proto_v3/kind.pb -s 资源转换示例.xlsx -m scheme_kind -n "/(?i)\.bin$/\.xml/"
-t msgpack -p protobuf -o "@OUTPUT@" -f proto_v3/kind.pb -s 资源转换示例.xlsx -m scheme_kind -n "/(?i)\.bin$/\.msgpack.bin/"
-t js -p protobuf -o "@OUTPUT@"      -f proto_v3/kind.pb --pretty 2 -s 资源转换示例.xlsx -m scheme_kind -n "/(?i)\.bin$/\.js/" --javascript-global sample
-t js -p protobuf -o "@OUTPUT@"      -f proto_v3/kind.pb --pretty 2 -m DataSource=资源转换示例.xlsx|kind|3,1 -m MacroSource=资源转换示例.xlsx|macro|2,1 -m ProtoName=role_cfg -m OutputFile=role_cfg.n.js -m KeyRow=2 -m KeyCase=lower -m KeyWordSplit=_ -m "KeyWordRegex=[A-Z_$ \t\r\n]|[_$ \t\r\n]|[a-zA-Z_$]" --javascript-export nodejs
-t js -p protobuf -o "@OUTPUT@"      -f proto_v3/kind.pb --pretty 2 -s 资源转换示例.xlsx -m scheme_kind -n "/(?i)\.bin$/\.amd\.js/" --javascript-export amd
-t lua -p protobuf -o "@OUTPUT@"     -f proto_v3/kind.pb --pretty 2 --validator-rules custom_validator.yaml -m DataSource=资源转换示例.xlsx|arr_in_arr|3,1 -m MacroSource=资源转换示例.xlsx|macro|2,1 -m ProtoName=arr_in_arr_cfg -m OutputFile=arr_in_arr_cfg.lua -m KeyRow=2
-t bin -p protobuf -o "@OUTPUT@"     -f proto_v3/kind.pb --validator-rules custom_validator.yaml -m DataSource=资源转换示例.xlsx|arr_in_arr|3,1 -m MacroSource=资源转换示例.xlsx|macro|2,1 -m ProtoName=arr_in_arr_cfg -m OutputFile=arr_in_arr_cfg.bin -m KeyRow=2
-t json -p protobuf -o "@OUTPUT@"    -f proto_v3/kind.pb --validator-rules custom_validator.yaml @UPGRADE@ -n "/(?i)\.bin$/\.json/"
-t lua -p protobuf -o "@OUTPUT@"     -f proto_v3/kind.pb --validator-rules custom_validator.yaml @UPGRADE@ -n "/(?i)\.bin$/\.lua/"
-t ue-csv -o "@OUTPUT@" -f proto_v3/kind.pb -c KindConst.csv
-t ue-json -o "@OUTPUT@" -f proto_v3/kind.pb -c KindConst.json
-t ue-csv -o "@OUTPUT@" -f proto_v3/kind.pb -m DataSource=资源转换示例.xlsx|arr_in_arr|3,1 --validator-rules custom_validator.yaml -m MacroSource=资源转换示例.xlsx|macro|2,1 -m ProtoName=arr_in_arr_cfg -m OutputFile=ArrInArrCfg.csv -m KeyRow=2 -m UeCfg-CodeOutput=|Public/Config|Private/Config
-t ue-json -o "@OUTPUT@" -f proto_v3/kind.pb -m DataSource=资源转换示例.xlsx|arr_in_arr|3,1 --validator-rules custom_validator.yaml -m MacroSource=资源转换示例.xlsx|macro|2,1 -m ProtoName=arr_in_arr_cfg -m OutputFile=ArrInArrCfg.json -m KeyRow=2 -m UeCfg-CodeOutput=|Public/Config|Private/Config
'@
# 上游完整升级表包含违反 custom_rule5 的大数值；默认演示前 11 条有效数据。
$upgrade = '-m DataSource=资源转换示例.xlsx|upgrade_10001|3,1,13,0 -m MacroSource=资源转换示例.xlsx|macro|2,1 -m ProtoName=role_upgrade_cfg -m OutputFile=role_upgrade_cfg.bin -m KeyRow=2'
if ($IncludeValidationFailures) { $upgrade = '-s 资源转换示例.xlsx -m scheme_upgrade' }
$tasks = $tasks.Replace('@OUTPUT@', $OutputDir).Replace('@UPGRADE@', $upgrade)
Push-Location -LiteralPath $sample
try {
    $tasks | java -jar $jar --stdin --data-version docs-batch
    $code = $LASTEXITCODE
    if ($code -ne 0) { throw "批量转换退出码: $code" }
} finally { Pop-Location }
