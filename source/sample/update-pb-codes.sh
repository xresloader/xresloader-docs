#!/bin/bash

$(../../../xresloader/tools/find_protoc.py) -o quick_start/sample-conf/kind.pb --cpp_out quick_start/sample-code -I quick_start/sample-conf -I ../../../xresloader/header/extensions/v3 -I ../../../xresloader/header/extensions quick_start/sample-conf/kind.proto ../../../xresloader/header/extensions/google/protobuf/descriptor.proto ../../../xresloader/header/extensions/v3/xresloader.proto ../../../xresloader/header/extensions/v3/xresloader_ue.proto
$(../../../xresloader/tools/find_protoc.py) --cpp_out quick_start/sample-code -I ../../../xresloader/header ../../../xresloader/header/pb_header_v3.proto

ls -lh quick_start/sample-code
ls -lh quick_start/sample-conf