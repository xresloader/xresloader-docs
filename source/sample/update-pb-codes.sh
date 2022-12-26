#!/bin/bash

$(../../../xresloader/tools/find_protoc.py) -o quick_start/sample-conf/kind.pb --cpp_out quick_start/sample-code -I quick_start/sample-conf -I ../../../xresloader/third_party/xresloader-protocol/core/extensions/v3 -I ../../../xresloader/third_party/xresloader-protocol/common quick_start/sample-conf/kind.proto ../../../xresloader/third_party/xresloader-protocol/common/google/protobuf/descriptor.proto ../../../xresloader/third_party/xresloader-protocol/core/extensions/v3/xresloader.proto ../../../xresloader/third_party/xresloader-protocol/core/extensions/v3/xresloader_ue.proto
$(../../../xresloader/tools/find_protoc.py) --cpp_out quick_start/sample-code -I ../../../xresloader/third_party/xresloader-protocol/core ../../../xresloader/third_party/xresloader-protocol/core/pb_header_v3.proto

ls -lh quick_start/sample-code
ls -lh quick_start/sample-conf
