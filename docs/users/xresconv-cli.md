---
title: CLI 使用与迁移
description: xresconv-cli 2.0.2 的选项、自动化、路径和 Python 迁移
---

# xresconv-cli 2.x

CLI 用于按 XML 清单批量驱动 xresloader，适合构建机和自动化。2.0 起使用 Rust 原生程序，XML 继续采用 xresconv-conf。第一次使用见 [快速上手](./quick-start)，共用配置见 [XML 与输出矩阵](./xresconv)。

## 命令和参数

```text
xresconv-cli [CLI 选项]... <转换列表.xml> [-- [附加 xresloader 选项]...]
```

| 选项 | 行为 |
| --- | --- |
| `-h, --help` | 帮助，无需 XML |
| `-v, --version` | 版本，无需 XML |
| `-t, --test` | 预览计划；不启动 Java、不生成文件 |
| `-s, --scheme-name <name>` | 按 item 的 scheme 属性筛选；可重复，任一匹配即保留 |
| `-p, --parallelism <number>` | 正整数并发上限；缺省按 CPU 数量取 1 或 2 |
| `-j, --java-option <option>` | 追加 JVM 参数；可重复，自动补前导 `-` |
| `-J, --java-path <path>` | Java 可执行路径或命令名；优先于 JAVA_HOME 和 PATH |
| `-a, --data-version <version>` | 覆盖 XML 数据版本 |

```sh
xresconv-cli --test -p 1 convert.xml
xresconv-cli -s scheme_upgrade -a release-demo -j Xmx512m convert.xml -- --pretty 2
```

CLI 的 `-p` 是并发数，xresloader 的 `-p` 是协议类型；后端参数放在 `--` 后。`-j Xmx512m` 属于 CLI，XML 中则写 `<java_option>-Xmx512m</java_option>`。

`--test` 会检查 XML、工作目录和 JAR 是否存在，但不验证表格、descriptor 或 JAR 内容。预览显示 `0 job(s) failed` 只代表规划成功；执行后还需检查退出码和输出文件。GUI 专用分组、分类和脚本不会在 CLI 中执行。

![原生 CLI 实际运行](/img/users/cli-conversion.png)

## 路径和 include

主 XML 的目录加 `work_dir` 得到工作目录。相对 JAR、协议、数据和输出路径以该工作目录为准。`include` 相对于声明它的 XML；包含配置的 work_dir 在 CLI 中仍按主 XML 目录解析，这点与 GUI 的声明文件基准不同，跨工具配置最好在主文件统一设置 work_dir。

包含文件先加载，再合并本文件。单值、追加选项、多值组的合并方式见 [共用配置](./xresconv#合并与两种工具的差异)。循环 include 或超过 128 层会报错。

## 自动化和失败处理

并发限制的是 Java 批次，不是每个 XML 条目一个 Java 进程。空计划不启动 Java。子进程启动、写入、转换或收尾失败使退出状态非零；普通失败状态饱和到 255。配置读取返回 -2，缺失 JAR 返回 -4，Unix 对应 254、252。取消返回 130。

Java 按 `-J`、`JAVA_HOME`、PATH 顺序查找。显式无效的 `-J` 会报错；相对 Java 路径在切换工作目录前解析。Ctrl+C 停止派发并回收本次所属进程树。CLI 没有额外的自动转换超时选项。

stdin 参数遵循 xresloader 的分词规则：单/双引号包裹，不采用 shell 反斜杠转义。CLI 保留 `--` 后的 argv 边界；包含换行、NUL，或同时包含两种引号和空白而无法表示的单个参数会报错。XML `option` 是后端命令片段，内部引号由配置作者提供。

颜色由 `CPRINTF_MODE` 控制，值为 `term`、`none`、`win32_console`；`TERM=dumb` 关闭颜色。原始 stdout/stderr 分别读取，日志保留 Unicode。

## 从 Python 1.x 迁移

直接把 `python xresconv_cli.py convert.xml` 改为 `xresconv-cli convert.xml`。现有 XML 无需为 Rust 重写；新增支持各 output_type 的 output_dir，Java 启动失败也会计入失败状态。

旧 `xresconv_cli.py`、`__main__.py`、`xresconv-cli.py` 是转发层：优先使用 `XRESCONV_CLI_BIN`，其次查缓存，缺失时下载最新稳定版并校验 SHA256。缓存版本不会每次联网升级。离线或固定版本的构建环境可指定已校验二进制：

```powershell
$env:XRESCONV_CLI_BIN = 'C:\tools\xresconv-cli.exe'
python xresconv_cli.py convert.xml
```

旧入口仍需要 Python，原生 CLI 不需要。不要继续以“支持 Python 2.7”描述当前主程序。完整行为边界与测试映射见 [上游迁移合同](https://github.com/xresloader/xresconv-cli/blob/main/doc/migration-contract.md)。
