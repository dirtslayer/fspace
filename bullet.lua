local LineSprite = require("line_sprite")
local Bullet = setmetatable({}, { __index = LineSprite })
Bullet.__index = Bullet

function Bullet.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Bullet)
    self.color = {1, 1, 0} -- yellow
    self.points = {}
    self.points[1] = {
        {1,-5},
        {1,5},
        {-1,5},
        {-1,-5},
    }
    return self
end

return Bullet
