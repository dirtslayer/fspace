local LineSprite = require("line_sprite")
local Alienship = setmetatable({}, { __index = LineSprite })
Alienship.__index = Alienship

function Alienship.new(x, y, angle)
    local self = setmetatable(LineSprite.new(x, y, angle), Alienship)
    -- Use provided polygon points (centered as given)
    self.points = {}
    self.points[1] = {
        {2.9095037, 2.7098317},
        {1.7970464, 2.9095035},
        {1.2265555, 3.5940928},
        {0.32803227, 3.8365514},
        {0.31376999, 4.6637632},
        {2.8096677, 4.8491726},
        {2.9943114, 4.8491726},
        {5.4902091, 4.6637632},
        {5.4759471, 3.8365514},
        {4.577424, 3.5940928},
        {4.006933, 2.9095035},
        {2.8944757, 2.7098317},
        {217,217},
        {1.3477848, 3.6368796},
        {1.8612266, 3.9007317},
        {3.9435185, 3.8508135},
        {4.4569602, 3.5798304},
        {217,217}
    }
    -- Single-frame static sprite
    self.color = {1, 0.5, 0} -- orange tint for visibility
    self.scale =  10 -- scale up so it's visible at center
    self.collision_time = 0
    self.spawn_time = love.timer.getTime()
    return self
end

return Alienship
