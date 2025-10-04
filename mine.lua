local LineSprite = require("line_sprite")
local Mine = setmetatable({}, { __index = LineSprite })
Mine.__index = Mine

function Mine.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Mine)
    -- Green triangle points
    self.points = {}
    self.points[1] = {
        {0, -20},   -- top
        {17, 10},   -- bottom right
        {-17, 10},  -- bottom left
    }
    self.color = {0, 1, 0} -- green
    self.collision_time = 0
    self.spawn_time = love.timer.getTime()
    return self
end

return Mine
