if os.getenv("LOCAL_LUA_DEBUGGER_VSCODE") == "1" then
    require("lldebugger").start()
end

local Ship = require("ship")
local ship

local Thrust = require("thrust")
local thrust

local Bullet = require("bullet")
local bullets = {}

local Rock = require("rock")
local rocks = {}

local Mine = require("mine")
local mines = {}
                    
Light = require("light")
local light

local Digit = require("digit")
local time_alive_digits = {}

local Char = require("char")
local text = {}

local prideColors = {
  {1.0000, 0.0000, 0.0000}, -- Red
  {1.0000, 0.6471, 0.0000}, -- Orange
  {1.0000, 1.0000, 0.0000}, -- Yellow
  {0.0000, 0.5019, 0.0000}, -- Green
  {0.0000, 0.0000, 1.0000}, -- Blue
  {0.5019, 0.0000, 0.5019}  -- Violet
}


function love.load()
    
    local x, y = 101, 101
    ship = Ship.new(x, y, 0)
    thrust = Thrust.new(x, y, 0)
    -- Spawn a rock above the screen
    local rock_x = x
    local rock_y = -40
    local rock = Rock.new(rock_x, rock_y, 0)
    rock.dy = 2
    rock.dr = 2
    rock.scale = 3.0
    table.insert(rocks, rock)

        -- Create a global light
        light = Light.new(x + 100, y + 100, 0)
        light.current_frame = 1

        time_alive_digits = {
            Digit.new(60, 50, 0),
            Digit.new(40, 50, 0),
            Digit.new(20, 50, 0),
            
            
        }
        text = {
            
            -- Char.new(10, 10, 0, 'b'),
            
            
            --Char.new(10, 10, 0, 'd'),
            
            Char.new(10, 10, 0, 'f'),
            Char.new(30, 10, 0, 's'),
            Char.new(50, 10, 0, 'p'),
            Char.new(70, 10, 0, 'a'),
            Char.new(90, 10, 0, 'c'),
            Char.new(110, 10, 0, 'e'),

            --Char.new(10, 10, 0, 'g'),
            --Char.new(10, 10, 0, 'h'),
            --Char.new(10, 10, 0, 'i'),
            --Char.new(10, 10, 0, 'j'),
            --Char.new(10, 10, 0, 'k'),
            --Char.new(10, 10, 0, 'l'),
            --Char.new(10, 10, 0, 'm'),
            --Char.new(10, 10, 0, 'n'),
            --Char.new(10, 10, 0, 'o'),
            
            --Char.new(10, 10, 0, 'q'),
            --Char.new(10, 10, 0, 'r'),
            
            --Char.new(100, 100, 0, 't'),
            --Char.new(100, 100, 0, 'u'),
            --Char.new(100, 100, 0, 'v'),
            --Char.new(100, 100, 0, 'w'),
            --Char.new(100, 100, 0, 'x'),
            --Char.new(100, 100, 0, 'y'),
            --Char.new(100, 100, 0, 'z'),
        }
        
      --  for i, t in ipairs(text) do
      --      t.scale = 1.0
-- end

end


function fire_bullet()
    -- Find tip of ship in world coordinates
    local rad = math.rad(ship.angle + 90)
    local tip_x = ship.x   + math.cos(rad) * 30 * ship.scale
    local tip_y = ship.y  + math.sin(rad) * 30 * ship.scale
    local bullet = Bullet.new(tip_x, tip_y, ship.angle)
    local speed = 10
    bullet.dx = math.cos(rad) * speed
    bullet.dy = math.sin(rad) * speed
    table.insert(bullets, bullet)
end

function love.update(dt)

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


    -- Animate light frames
    local duration = light.frame_durations[light.current_frame or 1] or 1
    if light.time_current_frame + duration < now then
        light.time_current_frame = now
        light.current_frame = (light.current_frame or 1) + 1
        if light.current_frame > #light.points then
            light.current_frame = 1
        end
    end

    formated_score = string.format("%03d", #rocks)
    
    -- get the 1's 10's and 100's digits of formated time
    local len = #formated_score
    for i = 1, 3 do
        local digit_char = "0"
        if len - i + 1 > 0 then
            digit_char = formated_score:sub(len - i + 1, len - i + 1)
        end
        local digit_value = tonumber(digit_char) 
        time_alive_digits[i].current_frame = digit_value + 1
        time_alive_digits[i].last_update = now
        
    end

    -- update text "abcd"
   
    for i, char in ipairs(text) do
      --  char.current_frame = string.byte(letter) - string.byte('a') + 1
        char.last_update = now
    end

    -- Update rocks
    for _, rock in ipairs(rocks) do
        rock.y = rock.y + (rock.dy or 0)
        rock.x = rock.x + (rock.dx or 0)
        rock.angle = (rock.angle + (rock.dr or 0)) % 360
    end
    
    

    if love.keyboard.isDown("left") then
        ship.dr = ship.dr - 10

    elseif love.keyboard.isDown("right") then
        ship.dr = ship.dr + 10

    else
        ship.dr = ship.dr * 0.95

    end
        thrust.dr = ship.dr
    ship.angle = (ship.angle + ship.dr * dt) % 360
        thrust.angle = ship.angle

    -- Thrust logic: add th rust vector opposite to ship's angle when space is pressed
    if love.keyboard.isDown("space") or love.mouse.isDown(1) then
        local thrust_mag = 1
        -- Thrust should be directly opposite to ship's facing direction
        local thrust_angle = (ship.angle + 90) % 360
        local rad = math.rad(thrust_angle)
        local tx = math.cos(rad) * thrust_mag
        local ty = math.sin(rad) * thrust_mag
        ship.dx = ship.dx + tx * dt
        ship.dy = ship.dy + ty * dt

    end

    -- Gravity: accelerate ship downward
    local gravity = 0.2
    local max_vel_due_to_gravity = 20
    local velocity_mag = (ship.dx or 0)^2 + (ship.dy or 0)^2
    if velocity_mag > max_vel_due_to_gravity then
        gravity = 0
    end
    ship.dy = ship.dy + gravity * dt
    -- Move ship by velocity
    ship.x = ship.x + ship.dx
    ship.y = ship.y + ship.dy
    -- Get screen size
    local screen_w, screen_h = love.graphics.getWidth(), love.graphics.getHeight()
    -- Wrap ship coordinates
    if ship.x < 0 then ship.x = ship.x + screen_w end
    if ship.x > screen_w then ship.x = ship.x - screen_w end
    if ship.y < 0 then ship.y = ship.y + screen_h end
    if ship.y > screen_h then ship.y = ship.y - screen_h end

    --Wrap rock coordinates
    for _, rock in ipairs(rocks) do
        if rock.x < 0 then rock.x = rock.x + screen_w end
        if rock.x > screen_w then rock.x = rock.x - screen_w end
        if rock.y < 0 then rock.y = rock.y + screen_h end
        if rock.y > screen_h then rock.y = rock.y - screen_h end
    end

    -- Move thrust sprite with ship
    thrust.x = ship.x
    thrust.y = ship.y
    thrust.angle = ship.angle

    -- Move light sprite with ship
    light.x = ship.x
    light.y = ship.y
    light.angle = ship.angle

    -- Fire bullet on right mouse, ctrl, alt, or f
    if love.mouse.isDown(2) or love.keyboard.isDown("lctrl") or love.keyboard.isDown("rctrl") or love.keyboard.isDown("lalt") or love.keyboard.isDown("ralt") or love.keyboard.isDown("f") then
        --if not bullet_fired then
            fire_bullet()
            bullet_fired = true
      --  end
    else
        bullet_fired = false
    end

    -- Update bullets
    for i = #bullets, 1, -1 do
        local b = bullets[i]
        b.x = b.x + b.dx
        b.y = b.y + b.dy
        -- Remove bullet if out of bounds
        if b.x < 0 or b.x > love.graphics.getWidth() or b.y < 0 or b.y > love.graphics.getHeight() then
            table.remove(bullets, i)
        end
    end

    local rock_number_collision_threshold = 50
    if #rocks > rock_number_collision_threshold then
        -- do nothing   
    else 
    -- collision detection ship and rocks (AABB)   

        local ship_min_x, ship_min_y, ship_max_x, ship_max_y = ship:get_bound_rect()
            ship_min_x = ship_min_x + ship.x
            ship_min_y = ship_min_y + ship.y
            ship_max_x = ship_max_x + ship.x
            ship_max_y = ship_max_y + ship.y

        for _, rock in ipairs(rocks) do
        
            -- Skip collision detection for 1.5 second after spawn
            if rock.spawn_time and love.timer.getTime() - rock.spawn_time < 1.5 then
                rock.color = {0.8, 0.8, 0.8} -- light gray to indicate recent spawn   
            else

                if rock.collision_time > 0 and love.timer.getTime() - rock.collision_time < 1 then
                    rock.color = {1, 0, 0} -- red to indicate recent collision
                else
                    rock.color = {0.5, 0.5, 0.5} -- normal gray color
                    local rock_min_x, rock_min_y, rock_max_x, rock_max_y = rock:get_bound_rect()
                    rock_min_x = rock_min_x + rock.x
                    rock_min_y = rock_min_y + rock.y
                    rock_max_x = rock_max_x + rock.x
                    rock_max_y = rock_max_y + rock.y
                    if not (ship_max_x < rock_min_x or ship_min_x > rock_max_x or ship_max_y < rock_min_y or ship_min_y > rock_max_y) then
                        rock.collision_time = love.timer.getTime()
                        -- adjust rock and ship velocities to simulate bounce
                        local normal_x = (rock.x - ship.x)
                        local normal_y = (rock.y - ship.y)
                        local length = math.sqrt(normal_x^2 + normal_y^2)
                        if length > 0 then
                            normal_x = normal_x / length
                            normal_y = normal_y / length
                            local relative_velocity_x = (rock.dx or 0) - (ship.dx or 0)
                            local relative_velocity_y = (rock.dy or 0) - (ship.dy or 0)
                            local velocity_along_normal = relative_velocity_x * normal_x + relative_velocity_y * normal_y
                            if velocity_along_normal < 0 then
                                local restitution = 0.8 -- bounciness factor
                                local impulse = -(1 + restitution) * velocity_along_normal
                                impulse = impulse / 2 -- divide by 2 for equal mass
                                local impulse_x = impulse * normal_x
                                local impulse_y = impulse * normal_y
                                ship.dx = (ship.dx or 0) - impulse_x
                                ship.dy = (ship.dy or 0) - impulse_y
                                rock.dx = (rock.dx or 0) + impulse_x
                                rock.dy = (rock.dy or 0) + impulse_y
                            end
                        end     
            
                        if #rocks >=  rock_number_collision_threshold then
                        --- IGNORE ---
                        else 
                            
                            local newrock = Rock.new(rock.x, rock.y, rock.angle)
                            newrock.dy = rock.dy * -1
                            newrock.dr = rock.dr * -1
                            newrock.dx = rock.dx * -1
                            newrock.scale = rock.scale * 0.7
                            rock.scale = newrock.scale
                            table.insert(rocks, newrock)
                        end
                    end  
                end
            end
        end    
    end
    
    if #mines > 20 then
        -- do nothing   
    else 

if ship.mine_collision_time and love.timer.getTime() - ship.mine_collision_time < 0.5 then
        ship.color = {1, 0.5, 0.5} -- flash ship light red after mine collision
    else
        ship.color = {0, 1, 1} -- normal cyan color
    end

    -- collision detection ship and mines (AABB)    
        local ship_min_x, ship_min_y, ship_max_x, ship_max_y = ship:get_bound_rect()
            ship_min_x = ship_min_x + ship.x
            ship_min_y = ship_min_y + ship.y
            ship_max_x = ship_max_x + ship.x
            ship_max_y = ship_max_y + ship.y

        for i, m in ipairs(mines or {}) do
        
            -- Skip collision detection for 1.5 second after spawn
            if m.spawn_time and love.timer.getTime() - m.spawn_time < 1.5 then
                m.color = {0.7, 1.0, 0.7} -- light gray to indicate recent spawn   
            else

                if m.collision_time > 0 and love.timer.getTime() - m.collision_time < 1 then
                    m.color = {1, 0, 0} -- red to indicate recent collision
                else
                    m.color = {0.2, 1, 0.2} -- normal green color
                    local mine_min_x, mine_min_y, mine_max_x, mine_max_y = m:get_bound_rect()
                    mine_min_x = mine_min_x + m.x
                    mine_min_y = mine_min_y + m.y
                    mine_max_x = mine_max_x + m.x
                    mine_max_y = mine_max_y + m.y
                    if not (ship_max_x < mine_min_x or ship_min_x > mine_max_x or ship_max_y < mine_min_y or ship_min_y > mine_max_y) then
                        m.collision_time = love.timer.getTime()
                        -- destroy mine on collision
                        table.remove(mines, i)
       --                 ship.color = {1, 0, 0} -- flash ship red on collision
                        ship.mine_collision_time = love.timer.getTime()
                    end
                end
            end
        end
    end    

    
    -- collision detection bullets and rocks (AABB)
    for _, rock in ipairs(rocks) do    
        for bi = #bullets, 1, -1 do
            local bullet = bullets[bi]
            local bx, by = bullet.x, bullet.y
            local rock_min_x, rock_min_y, rock_max_x, rock_max_y = rock:get_bound_rect()
            rock_min_x = rock_min_x + rock.x
            rock_min_y = rock_min_y + rock.y
            rock_max_x = rock_max_x + rock.x
            rock_max_y = rock_max_y + rock.y
            if bx >= rock_min_x and bx <= rock_max_x and by >= rock_min_y and by <= rock_max_y then
            -- Bullet hit rock: remove bullet, split rock
            table.remove(bullets, bi)
            rock.collision_time = love.timer.getTime()

            -- Optionally spawn a mine 
                if #mines < 20 and math.random() < 0.05 then
                    
                    local mine = Mine.new(rock.x, rock.y, rock.angle)
                    table.insert(mines, mine)
                end

            -- Optionally spawn smaller rocks
            if rock.scale > 0.2 and #rocks < rock_number_collision_threshold then         
            
                for i = 1, 2 do
                local angle = math.random() * 2 * math.pi
                local newrock = Rock.new(rock.x, rock.y, math.deg(angle))
                newrock.scale = rock.scale * 0.7
                newrock.dx = math.cos(angle) * 2
                newrock.dy = math.sin(angle) * 2
                newrock.dr = (math.random() - 0.5) * 4
                table.insert(rocks, newrock)
                end
            end
            table.remove(rocks, _)
            break
            end
        end    
    end

        -- spawn new rocks periodically
        
    if #rocks < 2 then
        local screen_w, screen_h = love.graphics.getWidth(), love.graphics.getHeight()
        local center_x = screen_w / 2
        local center_y = screen_h / 2
        local angle = math.random() * math.pi + math.pi   
        -- local angle = 2 * math.pi
        local edge_x = center_x + math.cos(angle) * (math.max(screen_w, screen_h) / 2)
        local edge_y = center_y + math.sin(angle) * (math.max(screen_w, screen_h) / 2)
        local rock_angle_deg = math.deg(angle)
        local newrock = Rock.new(edge_x, edge_y, rock_angle_deg)
        -- Set velocity toward center
        local to_center_x = center_x - edge_x
        local to_center_y = center_y - edge_y
        local length = math.sqrt(to_center_x^2 + to_center_y^2)
        if length > 0 then
            newrock.dx = to_center_x / length * 2
            newrock.dy = to_center_y / length * 2
        else
            newrock.dx = 0
            newrock.dy = 2
        end
        newrock.dr = (math.random() - 0.5) * 4
        newrock.spawn_time = love.timer.getTime()
        table.insert(rocks, newrock)
    end

end

function love.draw()
    love.graphics.setColor(1, 1, 1)
    local screen_w, screen_h = love.graphics.getWidth(), love.graphics.getHeight()
    -- Draw mines
    for _, m in ipairs(mines or {}) do
        m:draw()
    end

    -- Draw bullets
    for _, b in ipairs(bullets) do
        b:draw()
    end
    -- Draw rocks
    for _, rock in ipairs(rocks) do
        rock:draw()
    end
    -- Draw ship and thrust at main position
    ship:draw()
    if love.keyboard.isDown("space") then
        thrust:draw()
    end
    if love.mouse.isDown(1) then
        thrust:draw()
    end
        
    light:draw(light.current_frame)


    for _, digit in ipairs(time_alive_digits) do
        digit:draw(digit.current_frame)
    end
   
    for _, char in ipairs(text) do
        char:draw(char.current_frame)
    end


    -- Check overlapping edges and draw at wrapped positions
    local overlap = ship:is_overlapping(screen_w, screen_h)
    if overlap.left then
        ship.x = ship.x + screen_w
        ship:draw()
        if love.keyboard.isDown("space") then thrust.x = thrust.x + screen_w; thrust:draw(); thrust.x = thrust.x - screen_w end
        ship.x = ship.x - screen_w
    end
    if overlap.right then
        ship.x = ship.x - screen_w
        ship:draw()
        if love.keyboard.isDown("space") then thrust.x = thrust.x - screen_w; thrust:draw(); thrust.x = thrust.x + screen_w end
        ship.x = ship.x + screen_w
    end
    if overlap.top then
        ship.y = ship.y + screen_h
        ship:draw()
        if love.keyboard.isDown("space") then thrust.y = thrust.y + screen_h; thrust:draw(); thrust.y = thrust.y - screen_h end
        ship.y = ship.y - screen_h
    end
    if overlap.bottom then
        ship.y = ship.y - screen_h
        ship:draw()
        if love.keyboard.isDown("space") then thrust.y = thrust.y - screen_h; thrust:draw(); thrust.y = thrust.y + screen_h end
        ship.y = ship.y + screen_h
    end

    -- Draw rocks at wrapped positions if overlapping edges
    for _, rock in ipairs(rocks) do
        local overlap = rock:is_overlapping(screen_w, screen_h)
        if overlap.left then
            rock.x = rock.x + screen_w
            rock:draw()
            rock.x = rock.x - screen_w
        end
        if overlap.right then
            rock.x = rock.x - screen_w
            rock:draw()
            rock.x = rock.x + screen_w
        end
        if overlap.top then
            rock.y = rock.y + screen_h
            rock:draw()
            rock.y = rock.y - screen_h
        end
        if overlap.bottom then
            rock.y = rock.y - screen_h
            rock:draw()
            rock.y = rock.y + screen_h
        end
    end
    
    
end

function love.keypressed(key)
    if key == "q" then
        love.event.quit()
    end
end

function love.mousemoved(x, y, dx, dy, istouch)
    local sensitivity = 0.5
    ship.angle = (ship.angle + dx * sensitivity) % 360
    thrust.angle = ship.angle
end