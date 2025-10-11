local Colors = {}
Colors.__index = Colors

function Colors:new()
    local self = setmetatable({}, Colors)
    return self
end

function Colors:get_pride_colors()
    return {
        {1.0000, 0.0000, 0.0000}, -- Red
        {1.0000, 0.6471, 0.0000}, -- Orange
        {1.0000, 1.0000, 0.0000}, -- Yellow
        {0.0000, 0.5019, 0.0000}, -- Green
        {0.0000, 0.0000, 1.0000}, -- Blue
        {0.5019, 0.0000, 0.5019}  -- Violet
    }
end

return Colors
