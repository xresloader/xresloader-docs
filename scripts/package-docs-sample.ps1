Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$sampleDir = Join-Path $PSScriptRoot '../source/sample/current'
$destinationDir = Join-Path $PSScriptRoot '../static/examples'
$required = @('convert.xml', 'convert-lua.xml', 'tables.xlsx', 'tables.json', 'kind.pb', 'kind.proto', 'README.md', 'load-json.cjs', 'load-lua.lua', 'load_custom.cpp', 'load_with_libresloader.cpp', 'sample.xml', 'sample_include.xml', 'selectors.json')
$inputs = foreach ($name in $required) {
    $item = Get-Item -LiteralPath (Join-Path $sampleDir $name) -ErrorAction Stop
    if ($item.Length -eq 0) { throw "Empty sample: $name" }
    $item.FullName
}
New-Item -Path $destinationDir -ItemType Directory -Force -ErrorAction Stop | Out-Null
Compress-Archive -LiteralPath $inputs -DestinationPath (Join-Path $destinationDir 'quick-start.zip') -Force -ErrorAction Stop
Get-FileHash -LiteralPath (Join-Path $destinationDir 'quick-start.zip') -Algorithm SHA256
