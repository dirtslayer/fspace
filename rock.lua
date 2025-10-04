local LineSprite = require("line_sprite")
local Rock = setmetatable({}, { __index = LineSprite })
Rock.__index = Rock

function Rock.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Rock)
    self.collision_time = 0
    self.spawn_time = love.timer.getTime()
    self.color = {0.6, 0.6, 0.6} -- gray
    -- Squarish shape with rounded, imperfect corners
    self.points = {}
    self.points[1] = {
        {20, 18},   -- top right
        {15, 25},   -- right top curve
        {5, 30},    -- right curve
        {-5, 28},   -- right bottom curve
        {-18, 20},  -- bottom right
        {-25, 10},  -- bottom curve
        {-30, -5},  -- bottom left curve
        {-25, -15}, -- left bottom curve
        {-18, -20}, -- left
        {-10, -25}, -- left top curve
        {0, -30},   -- top left curve
        {15, -25},  -- top curve
        {20, -18},  -- top right
    }
    return self
end

return Rock
