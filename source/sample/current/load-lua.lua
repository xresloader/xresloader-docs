local config = dofile(arg[1] or "output/role_upgrade_cfg.lua")
local header, messageType = config[1], config[2]
local rows = assert(config[messageType], "missing data for message type")
assert(header.count == #rows, "record count does not match header")

-- 升级表以角色 ID + 等级作为联合键。
local byId = {}
for _, row in ipairs(rows) do
    local levels = byId[row.Id] or {}
    byId[row.Id] = levels
    assert(levels[row.Level] == nil, "duplicate ID + level")
    levels[row.Level] = row
end
local row = assert(byId[10001] and byId[10001][2], "missing ID=10001, Level=2")
print(string.format("version=%s, count=%d", header.data_ver, #rows))
print(string.format("Id=%d, Level=%d, CostType=%d, CostValue=%d",
    row.Id, row.Level, row.CostType, row.CostValue))
