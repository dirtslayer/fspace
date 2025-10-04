local LineSprite = require("line_sprite")
local Light = setmetatable({}, { __index = LineSprite })
Light.__index = Light

function Light.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Light)
    self.color = {1, 0, 1} -- fuchsia (bright purple)
    -- Frame durations: 3s for frame 1, 1s for frame 2
    self.frame_durations = {3, 1}
    -- Frame 1: empty
    self.points[1] = { 
    }
    -- Frame 2: 2x2 square 
    self.points[2] = {
        {-5, 24},
        {-3, 26},
        {-3, 24},
    }
    return self
end

return Light
