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

local button_rects = {
    {20,77, 100,46},
    {20,137, 100,46}
}

local selected_button = 1

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
    
    -- Draw rectangle for selected button using unpack
    love.graphics.rectangle("fill", unpack(button_rects[selected_button]))
    
    for _, char in ipairs(text) do  
        char:draw(char.current_frame)
    end
end

function Menu:keypressed(key)

    if key == "q" then
        love.event.quit()
    end

    if key == "f" then
        self.setScene("fspace")
    end

    -- if up arrow move to previous, if at 1 set to #button_rects
    if key == "up" then
        if selected_button == 1 then
            selected_button = #button_rects
        else
            selected_button = selected_button - 1
        end
    end
    
    -- if down arrow move to next, if at #button_rects, then set to 1
    if key == "down" then
        if selected_button == #button_rects then
            selected_button = 1
        else
            selected_button = selected_button + 1
        end
    end

    if key == "return" then
        if selected_button == 1 then
            self.setScene("fspace")
        else 
            if selected_button == 2 then
                love.event.quit()
            end
        end
    end

end

function Menu:mousemoved(x, y, dx, dy, istouch)
    -- Check if mouse is over any button rectangle
    for i, rect in ipairs(button_rects) do
        local rect_x, rect_y, rect_w, rect_h = unpack(rect)
        if x >= rect_x and x <= rect_x + rect_w and y >= rect_y and y <= rect_y + rect_h then
            selected_button = i
            break
        end
    end
end

function Menu:mousepressed( x, y, button, istouch, presses )
    if selected_button == 1 then
        self.setScene("fspace")
    else 
        if selected_button == 2 then
            love.event.quit()
        end
    end
end

return Menu
