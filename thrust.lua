local LineSprite = require("line_sprite")
local Thrust = setmetatable({}, { __index = LineSprite })
Thrust.__index = Thrust

function Thrust.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Thrust)
    self.color = {1, 0.5, 0} -- orange
    -- Example points for thrust visual (customize as needed)
    self.points = {}
    self.points[1] = {
        {-5, -20},
        {0, -30},
        {5, -20},
    }
    return self
end

return Thrust
