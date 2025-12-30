local LineSprite = require("line_sprite")
local Box = setmetatable({}, { __index = LineSprite })
Box.__index = Box

function Box.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Box)
    -- Blue 2x2 box points
    self.points = {}
    self.points[1] = {
        {-1, -1},
        {1, -1},
        {1, 1},
        {-1, 1},
    }
    self.color = {0, 0, 1} -- blue
    self.scale = 20
    self.collision_time = 0
    self.spawn_time = love.timer.getTime()
    return self
end

return Box
