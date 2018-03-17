#include <cstdio>
#include <iostream>
#include <fstream>

#include "kind.pb.h"
#include "libresloader.h"

int main(int argc, char* argv[]) {

    const char* file_path = "../sample-data/role_upgrade_cfg.bin";
    if (argc > 1) {
        file_path = argv[1];
    } else {
        printf("usage: %s <path to role_upgrade_cfg.bin>\n", argv[0]);
        return 1;
    }

    // key - value 型数据读取机制
    do {
        typedef xresloader::conf_manager_kv<role_upgrade_cfg, uint32_t, uint32_t> kind_upg_cfg_t;
        kind_upg_cfg_t upg_mgr;
        upg_mgr.set_key_handle([](kind_upg_cfg_t::value_type p) {
            return kind_upg_cfg_t::key_type(p->id(), p->level());
        });

        upg_mgr.load_file(file_path);

        kind_upg_cfg_t::value_type data1 = upg_mgr.get(10001, 4); // 获取Key 为 10001,4的条目
        if (NULL == data1) {
            std::cerr<< "role_upgrade_cfg id: 10001, level: 4 not found, load file "<< file_path<< " failed."<< std::endl;
            break;
        }

        printf("%s\n", data1->DebugString().c_str());
    } while(false);

    // key - list 型数据读取机制
    do {
        typedef xresloader::conf_manager_kl<role_upgrade_cfg, uint32_t> kind_upg_cfg_t;
        kind_upg_cfg_t upg_mgr;
        upg_mgr.set_key_handle([](kind_upg_cfg_t::value_type p) {
            return kind_upg_cfg_t::key_type(p->id());
        });

        upg_mgr.load_file(file_path);
        printf("role_upgrade_cfg with id=%d has %llu items\n", 10001, static_cast<unsigned long long>(upg_mgr.get_list(10001)->size()));

        kind_upg_cfg_t::value_type data1 = upg_mgr.get(10001, 0); // 获取Key 为 10001 下标为0（就是第一个）条目
        if (NULL == data1) {
            std::cerr<< "role_upgrade_cfg id: 10001 , index: 0, not found, load file "<< file_path<< " failed."<< std::endl;
            break;
        }
        
        printf("%s\n", data1->DebugString().c_str());
    } while(false);

    return 0;
}