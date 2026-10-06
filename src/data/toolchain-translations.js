import { translate } from "@docusaurus/Translate";

export const componentLabels = {
  "xresloader": {
    role: translate({"id":"catalog.xresloader.role","message":"Excel conversion engine"}),
    purpose: translate({"id":"catalog.xresloader.purpose","message":"Map and validate spreadsheets against schemas; export protobuf, MsgPack, Lua, JavaScript, JSON, XML and UE DataTables."}),
  },
  "xresconv-cli": {
    role: translate({"id":"catalog.xresconv-cli.role","message":"CLI batch converter"}),
    purpose: translate({"id":"catalog.xresconv-cli.purpose","message":"Convert workbooks from XML manifests, preview tasks, control concurrency and integrate with build pipelines. Native Rust; no Python required."}),
  },
  "xresconv-gui": {
    role: translate({"id":"catalog.xresconv-gui.role","message":"GUI batch converter"}),
    purpose: translate({"id":"catalog.xresconv-gui.purpose","message":"Select tables, preview and convert batches on the desktop, follow logs and progress, and connect project events and buttons."}),
  },
  "xresloader-dump-bin": {
    role: translate({"id":"catalog.xresloader-dump-bin.role","message":"Binary data inspector"}),
    purpose: translate({"id":"catalog.xresloader-dump-bin.purpose","message":"Inspect exported bin files using descriptors, check headers and records, and extract strings or tagged data."}),
  },
  "xres-code-generator": {
    role: translate({"id":"catalog.xres-code-generator.role","message":"Data loader generator"}),
    purpose: translate({"id":"catalog.xres-code-generator.purpose","message":"Generate loaders and indexes for C++, C#, Go, Lua, upb, lua-protobuf and Unreal Engine."}),
  },
  "xresconv-conf": {
    role: translate({"id":"catalog.xresconv-conf.role","message":"Batch configuration and extensions"}),
    purpose: translate({"id":"catalog.xresconv-conf.purpose","message":"XML manifests, includes, groups, output rules and examples of GUI events and custom buttons."}),
  },
  "xresloader-protocol": {
    role: translate({"id":"catalog.xresloader-protocol.role","message":"Data headers and schema extensions"}),
    purpose: translate({"id":"catalog.xresloader-protocol.purpose","message":"The bin wrapper and protobuf custom options for loading, validation and code generation."}),
  },
};
