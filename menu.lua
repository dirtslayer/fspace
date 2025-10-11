local Menu = {}
Menu.__index = Menu


local Char = require("char")
local text = {
            
    
    Char.new(10, 10, 0, 'f'),
    Char.new(30, 10, 0, 's'),
    Char.new(50, 10, 0, 'p'),
    Char.new(70, 10, 0, 'a'),
    Char.new(90, 10, 0, 'c'),
    Char.new(110, 10, 0, 'e'),

    Char.new(30, 70, 0, 'p'),
    Char.new(50, 70, 0, 'l'),
    Char.new(70, 70, 0, 'a'),
    Char.new(90, 70, 0, 'y'),

    Char.new(30, 130, 0, 'q'),
    Char.new(50, 130, 0, 'u'),
    Char.new(70, 130, 0, 'i'),
    Char.new(90, 130, 0, 't'),
    
}

local Colors = require("colors")
local colors = Colors:new()
local prideColors = colors:get_pride_colors()

function Menu:new()
    local self = setmetatable({}, Menu)
    return self
end

function Menu:load()
    -- Initialize menu state and resources
end

function Menu:update(dt)
    -- Update menu logic
    local now = love.timer.getTime()

    -- check the time_current_frame of text[1] and if more than 1 second
    -- rotate the colors of the prideColors table and assign to text[1]
    -- as well as the rest of the text table
        if #text > 0 and text[1].time_current_frame + 1 < now then
            local first_color = table.remove(prideColors, 1)
            table.insert(prideColors, first_color)
            for i, char in ipairs(text) do
                char.color = prideColors[(i - 1) % #prideColors + 1]
            end
            text[1].time_current_frame = now
        end
    
end

function Menu:draw()
    -- Draw rectangle behind play and quit 
    love.graphics.setColor(1.0, 1.0, 1.0, 0.5)
    --love.graphics.rectangle("fill", 10, 65, love.graphics.getWidth()-10, 105)
    love.graphics.rectangle("fill", 20,77, 100,46)
    for _, char in ipairs(text) do  
        char:draw(char.current_frame)
    end
end

function Menu:keypressed(key)

    if key == "f" then
        self.setScene("fspace")
    end
end

function Menu:mousemoved(x, y, dx, dy, istouch)
    -- Handle mouse movement
end

return Menu
