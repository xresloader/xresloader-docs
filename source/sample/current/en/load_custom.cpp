#include <fstream>
#include <iostream>
#include "pb_header_v3.pb.h"
#include "kind.pb.h"

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "usage: " << argv[0] << " <role_upgrade_cfg.bin>\n";
        return 1;
    }
    std::ifstream input(argv[1], std::ios::binary);
    org::xresloader::pb::xresloader_datablocks wrapper;
    if (!input || !wrapper.ParseFromIstream(&input)) {
        std::cerr << "Failed to open or parse the data header\n";
        return 1;
    }
    std::cout << wrapper.header().DebugString();
    for (int i = 0; i < wrapper.data_block_size(); ++i) {
        role_upgrade_cfg row;
        if (!row.ParseFromString(wrapper.data_block(i))) {
            std::cerr << "Failed to parse record: " << i << '\n';
            return 1;
        }
        std::cout << row.ShortDebugString() << '\n';
    }
    return 0;
}
