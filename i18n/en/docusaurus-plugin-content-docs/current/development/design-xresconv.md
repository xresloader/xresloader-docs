---
title: xresconv architecture and interfaces
description: Rust CLI and Tauri GUI ownership, configuration, communication, conversion and extensions
---

# xresconv architecture and interfaces {#xresconv-架构与接口}

Both batch tools share XML and the xresloader backend, with different hosts. See [Configuration](../users/xresconv), [CLI](../users/xresconv-cli) and [GUI](../users/xresconv-gui).

## Rust CLI 2.x {#rust-cli-2x}

A single Cargo package separates cli, xml_conf, options, plan, runner, process_tree and color. It loads XML and includes, merges settings and items, builds a plan, then dispatches stdin commands through a bounded Java process pool.

stdout and stderr drain separately. JVM arguments precede -jar; task arguments use the verified token protocol. Failed writes are not blindly resent, avoiding duplicate execution. Spawn, pipe, conversion and remaining-task failures affect exit status. Windows uses Job Objects; Unix uses separate process groups to reclaim owned descendants.

Python files provide messages, binary location/download and forwarding, rather than independent conversion logic. See the [upstream migration contract](https://github.com/xresloader/xresconv-cli/blob/main/doc/migration-contract.md).

## Tauri GUI 3.0 {#tauri-gui-30}

![GUI 3.0 process ownership and communication](/img/en/development/xresconv-3-architecture.svg)

| Module | Responsibilities and ownership |
| --- | --- |
| apps/desktop | React, adapters, snapshots, drafts, trees and logs |
| src-tauri | Windows, native interfaces, launch and forwarding |
| packages/guardian | Supervision of backend, workers and health |
| packages/backend | Configuration, selection, session settings, conversion, logs and RPC |
| packages/script-host | Isolated contexts, tree mirrors, permitted operations and callbacks |
| packages/contracts / ipc | JSON schemas, generated types, bounded frames and communication |
| packages/compat-service | Tri-state selection, matching and compatibility data semantics |
| packages/packaging | Targets, dependency closures, manifests, packaging and verification |

An isolated helper reads and parses configuration. Naming and initialization must succeed before atomically replacing the session; failure or cancellation preserves the committed version. The backend owns business state; frontend and scripts cannot mutate shared objects directly.

## Communication and errors {#通信与错误}

The desktop layer and guardian communicate through private stdin/stdout pipes, using a 4-byte big-endian length and UTF-8 JSON. stdout is protocol-only; diagnostics use stderr. Frames default to a 64 MiB limit. See [contracts/schema](https://github.com/xresloader/xresconv-gui/tree/main/packages/contracts/schema).

Envelopes contain protocol_version, kind, id, role and payload, with correlation fields such as session_id, revision, run_id, invocation_id and generation. Session, generation and tree versions prevent late responses from changing new state. Business failures return RPC errors. Poison frames, disconnections and supervision failures are channel/health failures.

Main RPCs include loadConfig/reload, getSnapshot, applyOps, updateSettings, preview/run, cancel/reset, getLogs, respondDialog, setHookEnabled, setCustomSelectors, invokeCustomButton and checkJava. reset is a backend capability; the UI uses load, reload and cancel. After schema changes, regenerate types and run test:contracts; do not patch generated files.

## Conversion and logs {#转换与日志}

The run fixes selected items at start and constructs commands after before-conversion events. Java starts with an executable and argument array without a shell. Tasks that cannot be represented exactly over stdin fall back to argv. Parallelism defaults to 2, range 1–16. Writes respect backpressure; cancellation stops dispatch and waits for processes, pipes and descendants.

The JAR's cumulative exit code cannot reliably reconstruct per-item failures. Without task acknowledgments, retain batch results and unknown item results. Submitted tasks are not confirmed outputs.

Backend memory retains 10000 logs by default, the frontend window holds at most 2000, and pages hold at most 1000. Merge and deduplicate by seq. Export reads only retained data. log4js runs in a separate sink process with queue and shutdown limits; failures are explicit.

## Extensions and native UI {#扩展与原生界面}

Worker scripts modify mirrors synchronously, then return versioned operations. Button data is scoped to button identity; rebuilding changes the generation. Cancellation or reload revokes old dialog callbacks. Scripts have local-system capabilities; VM contexts and supervision isolate faults, rather than providing a security sandbox for malicious scripts.

Tauri persists display settings; English defines the locale key set. Windows calls allow_local_fonts before font enumeration and authorizes only the current origin. Browser-adapter tests do not prove native permission persistence; use a real WebView2 profile.

See upstream [architecture](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/architecture.md), [interfaces](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/interfaces.md), [frontend](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/frontend.md) and [localization](https://github.com/xresloader/xresconv-gui/blob/main/docs/development/localization.md).

## Known startup boundary in 3.0.0 {#300-启动加载的已知边界}

With --input and --custom-selector together, native release testing observed correct argument parsing but an empty getSnapshot customSelectors. useCliCustomSelectors marks wired before setCustomSelectors fixes sessionEpoch. Concurrent loadConfig advances the epoch and makes selector wiring return early. This reproduced three consecutive times during the recorded component review.

Load selectors first, then open XML; see [FAQ](../users/faq#gui-启动时没有显示自定义按钮). This site documents the workaround without modifying the independent GUI repository. After an upstream fix, recheck simultaneous arguments and session-load ordering.
