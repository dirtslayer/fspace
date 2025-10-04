local LineSprite = {}
LineSprite.__index = LineSprite

function LineSprite.new(x, y, angle)
    local self = setmetatable({}, LineSprite)
    self.x = x or 60
    self.y = y or 60
    self.angle = angle or 90  -- the direction the ship is facing, in degrees
    self.dx = 0  -- velocity x component
    self.dy = 0  -- velocity y component
    self.dr = 0  -- rotational velocity
    self.scale = 0.5
    self.points = { {}} -- default: one frame, empty
    self.color = {0, 1, 0} -- default green
    self.durations = { math.huge } -- default: one frame, lasts forever
    self.current_frame = 1
    self.time_current_frame = love.timer.getTime() -- the time when the frame last changed
    return self
end



function LineSprite:get_bound_rect(frame)
    -- Returns topleft_x, topleft_y, bottomright_x, bottomright_y relative to self
    frame = frame or 1
    local pts = self.points[frame] or self.points[1]
    local min_x, min_y, max_x, max_y = nil, nil, nil, nil
    for i = 1, #pts do
        local p = pts[i]
        local x, y = p[1] * self.scale, p[2] * self.scale
        if not min_x or x < min_x then min_x = x end
        if not max_x or x > max_x then max_x = x end
        if not min_y or y < min_y then min_y = y end
        if not max_y or y > max_y then max_y = y end
    end
    return min_x, min_y, max_x, max_y
end

function LineSprite:is_overlapping(screen_w, screen_h, frame)
    -- Returns a table: {left, right, top, bottom}
    frame = frame or 1
    local min_x, min_y, max_x, max_y = self:get_bound_rect(frame)
    local rad = math.rad(self.angle)
    -- Transform all points to world coordinates
    local pts = self.points[frame] or self.points[1]
    local world_min_x, world_min_y = math.huge, math.huge
    local world_max_x, world_max_y = -math.huge, -math.huge
    for i = 1, #pts do
        local px, py = pts[i][1], pts[i][2]
        local x = px * math.cos(rad) - py * math.sin(rad) + self.x
        local y = px * math.sin(rad) + py * math.cos(rad) + self.y
        if x < world_min_x then world_min_x = x end
        if x > world_max_x then world_max_x = x end
        if y < world_min_y then world_min_y = y end
        if y > world_max_y then world_max_y = y end
    end
    return {
        left = world_min_x < 0,
        right = world_max_x > screen_w,
        top = world_min_y < 0,
        bottom = world_max_y > screen_h
    }
end

function LineSprite:draw(frame)
    self:draw_frame(frame or 1)
end

function LineSprite:draw_frame(frame)
    frame = frame or 1
    love.graphics.setColor(self.color)
    local rad = math.rad(self.angle)
    local pts = self.points[frame] or self.points[1]
    for i = 1, #pts do
        local p1 = pts[i]
        local p2 = pts[(i % #pts) + 1]
        if p1[1] ~= 217 and p2[1] ~= 217 then
            local x1 = p1[1] * self.scale * math.cos(rad) - p1[2] * self.scale * math.sin(rad)
            local y1 = p1[1] * self.scale * math.sin(rad) + p1[2] * self.scale * math.cos(rad)
            local x2 = p2[1] * self.scale * math.cos(rad) - p2[2] * self.scale * math.sin(rad)
            local y2 = p2[1] * self.scale * math.sin(rad) + p2[2] * self.scale * math.cos(rad)
            x1, y1 = x1 + self.x, y1 + self.y
            x2, y2 = x2 + self.x, y2 + self.y
            love.graphics.line(x1, y1, x2, y2)
        end
    end
end

return LineSprite
