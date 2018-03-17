#include <cstdio>
#include <iostream>
#include <fstream>
#include <google/protobuf/stubs/common.h>

#if GOOGLE_PROTOBUF_VERSION < 3000000
#include "pb_header.pb.h"
#else
#include "pb_header_v3.pb.h"
#endif

#include "kind.pb.h"

int main(int argc, char* argv[]) {

    const char* file_path = "../sample-data/role_upgrade_cfg.bin";
    if (argc > 1) {
        file_path = argv[1];
    } else {
        printf("usage: %s <path to role_upgrade_cfg.bin>\n", argv[0]);
        return 1;
    }

    com::owent::xresloader::pb::xresloader_datablocks data_wrapper;
    std::fstream fin;
    fin.open(file_path, std::ios::in | std::ios::binary);
    if (!fin.is_open()) {
        printf("open %s failed\n", file_path);
        return 1;
    }
    if (false == data_wrapper.ParseFromIstream(&fin)) {
        printf("parse com::owent::xresloader::pb::xresloader_datablocks failed. %s\n", data_wrapper.InitializationErrorString().c_str());
        return 1;
    }

    printf("========================\ndata header: %s\n========================\n", data_wrapper.header().DebugString().c_str());

    for (int i = 0; i < data_wrapper.data_block_size(); ++i) {
        role_upgrade_cfg role_upg_data;
        if (false == role_upg_data.ParseFromString(data_wrapper.data_block(i))) {
            printf("parse role_upgrade_cfg for index %d failed. %s\n", i, role_upg_data.InitializationErrorString().c_str());
            continue;
        }

        printf("role_upgrade_cfg => index %d: %s\n", i, role_upg_data.ShortDebugString().c_str());
    }

    return 0;
}