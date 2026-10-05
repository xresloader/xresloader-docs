#!/usr/bin/env bash
set -euo pipefail
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
proto_root="${XRESLOADER_PROTOCOL_ROOT:-$script_dir/../../../xresloader/third_party/xresloader-protocol}"
protoc_bin="${PROTOC:-protoc}"
command -v "$protoc_bin" >/dev/null || { echo '设置 PROTOC 为与应用 protobuf 运行库匹配的 protoc。' >&2; exit 1; }
test -f "$proto_root/core/extensions/v3/xresloader.proto"
test -f "$proto_root/common/google/protobuf/descriptor.proto"
cd -- "$script_dir"
mkdir -p quick_start/sample-code

# descriptor 包含依赖；C++ 仅生成业务及扩展代码，descriptor.pb.cc 使用运行库自带版本。
"$protoc_bin" -I quick_start/sample-conf -I "$proto_root/core/extensions/v3" -I "$proto_root/common" \
  --include_imports --descriptor_set_out=quick_start/sample-conf/kind.pb quick_start/sample-conf/kind.proto
"$protoc_bin" -I quick_start/sample-conf -I "$proto_root/core/extensions/v3" -I "$proto_root/common" \
  --cpp_out=quick_start/sample-code quick_start/sample-conf/kind.proto \
  "$proto_root/core/extensions/v3/xresloader.proto" "$proto_root/core/extensions/v3/xresloader_ue.proto"
"$protoc_bin" -I "$proto_root/core" --cpp_out=quick_start/sample-code "$proto_root/core/pb_header_v3.proto"

ls -lh quick_start/sample-code quick_start/sample-conf
