#include <cstdint>
#include <iostream>
#include "kind.pb.h"
#include "libresloader.h"

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "usage: " << argv[0] << " <role_upgrade_cfg.bin>\n";
        return 1;
    }
    // 联合键：角色 ID + 等级。
    using Kv = xresloader::conf_manager_kv<role_upgrade_cfg, uint32_t, uint32_t>;
    Kv kv;
    kv.set_key_handle([](Kv::value_type row) {
        return Kv::key_type(row->id(), row->level());
    });
    if (!kv.load_file(argv[1])) return 1;
    auto value = kv.get(10001, 2);
    if (!value) return 1;
    std::cout << value->DebugString();

    // 按角色 ID 分组：get(id, index) 的 index 从 0 开始。
    using Kl = xresloader::conf_manager_kl<role_upgrade_cfg, uint32_t>;
    Kl kl;
    kl.set_key_handle([](Kl::value_type row) { return Kl::key_type(row->id()); });
    if (!kl.load_file(argv[1])) return 1;
    auto list = kl.get_list(10001);
    if (!list) return 1;
    std::cout << "count=" << list->size() << '\n';
    auto first = kl.get(10001, 0);
    if (!first) return 1;
    std::cout << first->DebugString();
    return 0;
}
