local LineSprite = require("line_sprite")
local Alien = setmetatable({}, { __index = LineSprite })
Alien.__index = Alien

function Alien.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Alien)

    -- Points built from the provided SVG-like path data. {217,217} is used
    -- as a "pen up" separator between segments.
    self.points = {}
    self.points[1] = {
        -- segment 1
        {2.1536032, 3.8508135},
        {1.9539314, 3.4443389},
        {2.246308,   3.0663888},
        {2.8167988,  3.030733},
        {3.0164706,  3.4015521},
        {2.8524546,  3.8579448},
        -- pen-up separator
        {217, 217},
        -- segment 2 (expanded from V, l, z)
        {2.2320457, 3.4657323},
        {2.2320457, 3.2803226},
        {2.3675373, 3.2731926},
        {2.3604073, 3.4728644},
        -- pen-up separator
        {217, 217},
        -- segment 3 (expanded from V, l, v, z)
        {2.6313893, 3.4300765},
        {2.6313893, 3.2375358},
        {2.7882744, 3.2446658},
        {2.7882744, 3.4300753},
        -- pen-up separator
        {217, 217},
        -- segment 4 (M, L, L, H, Z)
        {2.2391768, 3.5869615},
        {2.7454876, 3.551306},
        {2.738357,   3.7010599},
        {2.3318816,  3.7010599},
        -- pen-up separator
        {217, 217},
    }

    self.color = {1, 100/255, 203/255} -- half magenta
    self.scale = 10         -- scaled up for visibility
    self.collision_time = 0
    self.spawn_time = love.timer.getTime()
    return self
end

return Alien
