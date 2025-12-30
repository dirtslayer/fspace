local LineSprite = require("line_sprite")
local Ship = setmetatable({}, { __index = LineSprite })
Ship.__index = Ship

function Ship.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Ship)
    self.color = {0, 1, 1} -- cyan
    self.life = 100  -- Player life (decreases on mine collision)
    self.weapon_level = 0
    self.max_weapon_level = 2
    
    -- Ship-specific points
    local halfPoints = {
        {0, 30},    -- tip
        {-5, 25},  -- cockpit left
        {20, 0},    -- wing right
        {20,5},
        
        {-15, -30},  -- left tail
        {0,20},
    }
    self.points = {}
    self.points[1] = {}
    for _, p in ipairs(halfPoints) do
        table.insert(self.points[1], p)
    end
    for i = #halfPoints, 1, -1 do
        local px, py = halfPoints[i][1], halfPoints[i][2]
        table.insert(self.points[1], {-px, py})
    end
    -- Duplicate frame 1 into frame 2
    self.points[2] = {}
    for _, p in ipairs(self.points[1]) do
        table.insert(self.points[2], {p[1], p[2]})
    end
    
    return self
end

return Ship
