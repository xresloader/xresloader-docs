---
title: CLI usage and migration
description: xresconv-cli 2.0.2 options, automation, paths and Python migration
---

# xresconv-cli 2.x {#xresconv-cli-2x}

The CLI drives xresloader in batches from XML manifests, suitable for build machines and automation. Version 2.0 replaces the main program with native Rust while retaining xresconv-conf XML. See [Quick start](./quick-start) and [XML and output matrices](./xresconv).

## Commands and options {#命令和参数}

```text
xresconv-cli [CLI options]... <conversion-list.xml> [-- [additional xresloader options]...]
```

| Option | Behavior |
| --- | --- |
| `-h, --help` | Help; no XML required |
| `-v, --version` | Version; no XML required |
| `-t, --test` | Preview the plan without starting Java or creating outputs |
| `-s, --scheme-name <name>` | Filter item scheme attributes; repeatable, retain any match |
| `-p, --parallelism <number>` | Positive concurrency limit; defaults to 1 or 2 based on CPU count |
| `-j, --java-option <option>` | Append a JVM option; repeatable, leading `-` added automatically |
| `-J, --java-path <path>` | Java executable path or command; precedes JAVA_HOME and PATH |
| `-a, --data-version <version>` | Override XML data version |

```sh
xresconv-cli --test -p 1 convert.xml
xresconv-cli -s scheme_upgrade -a release-demo -j Xmx512m convert.xml -- --pretty 2
```

CLI `-p` sets concurrency; engine `-p` selects the protocol. Put backend options after `--`. `-j Xmx512m` belongs to the CLI; XML uses `<java_option>-Xmx512m</java_option>`.

`--test` checks XML, the working directory and JAR existence, but not workbook, descriptor or JAR contents. A preview reporting `0 job(s) failed` means planning succeeded. After execution, check exit status and files. GUI groups, categories and scripts are not executed by the CLI.

[![Actual CLI output snapshot from the English starter example, with paths shortened](/img/en/users/cli-conversion.png)](/img/en/users/cli-conversion.png)

Click the image to view it at full size. Diagnostics retain the tool's original language.

These CLI and engine versions have English diagnostics and no language-switch option. The snapshot preserves actual messages and shortens only the working path.

## Paths and includes {#路径和-include}

The main XML directory plus `work_dir` determines the working directory. Relative JAR, schema, input and output paths use that directory. `include` is relative to the XML declaring it. In the CLI, an included file's work_dir still uses the main XML directory; the GUI uses the declaring file's directory. For shared configurations, define work_dir consistently in the main file.

Included files load first, then the current file merges into them. See [Shared configuration](./xresconv#合并与两种工具的差异) for scalar, appended and grouped values. Cyclic includes or more than 128 levels produce an error.

## Automation and failure handling {#自动化和失败处理}

Concurrency limits Java batches, rather than creating one Java process per XML item. Empty plans do not start Java. Spawn, write, conversion and cleanup failures produce nonzero status; ordinary failure counts saturate at 255. Configuration reads return -2, missing JARs return -4 (254 and 252 on Unix). Cancellation returns 130.

Java lookup uses `-J`, then `JAVA_HOME`, then PATH. An invalid explicit `-J` fails. Relative Java paths resolve before changing the working directory. Ctrl+C stops dispatch and reclaims this invocation's process tree. The CLI has no separate automatic conversion timeout option.

stdin uses xresloader tokenization: single/double quote grouping without shell backslash escaping. The CLI preserves argv boundaries after `--`. A single argument containing a newline, NUL, or both quote types with whitespace that cannot be represented is rejected. XML `option` is a backend command fragment; configuration authors provide its internal quoting.

`CPRINTF_MODE` controls colors (`term`, `none`, `win32_console`); `TERM=dumb` disables them. stdout and stderr are read separately, retaining Unicode.

## Migrating from Python 1.x {#从-python-1x-迁移}

Replace `python xresconv_cli.py convert.xml` with `xresconv-cli convert.xml`. Existing XML does not need rewriting for Rust. Version 2 adds per-output_type output_dir and counts Java startup failures in exit status.

The old `xresconv_cli.py`, `__main__.py` and `xresconv-cli.py` forwarders prefer `XRESCONV_CLI_BIN`, then a cached binary, then download the latest stable release and verify SHA256. Cached versions are not upgraded on every call. Offline or pinned builds can select a verified executable:

```powershell
$env:XRESCONV_CLI_BIN = 'C:\tools\xresconv-cli.exe'
python xresconv_cli.py convert.xml
```

Forwarders still require Python; the native CLI does not. Python 2.7 support is not a description of the current main program. See the [upstream migration contract](https://github.com/xresloader/xresconv-cli/blob/main/doc/migration-contract.md) for behavior and test mappings.
