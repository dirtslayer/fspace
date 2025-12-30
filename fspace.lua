local Fspace = {}
Fspace.__index = Fspace

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

local Box = require("box")
local boxes = {}
                    
Light = require("light")
local light

local Digit = require("digit")
local score_display = {}

local Char = require("char")
local fspace_text = {}
local gameover_text = {}

local Colors = require("colors")
local colors = Colors:new()
local prideColors = colors:get_pride_colors()

-- Physics constants
local thrust_delta = 3  -- Amount of thrust acceleration when engaged
local rotation_delta = 10  -- Amount of rotation change per frame when steering

-- Update categories for load-balanced updating
local UPDATE_CATEGORIES = {
    ANIMATION = 1,
    PHYSICS = 2,
    RENDERING = 3,
    COLLISION = 4,
    SPAWNING = 5
}
local current_update_category = UPDATE_CATEGORIES.ANIMATION

-- Game states
local GAME_STATES = {
    PLAY = 1,
    PAUSE = 2,
    GAMEOVER = 3,
}
local game_state = GAME_STATES.PLAY
function Fspace:new()
    local self = setmetatable({}, Fspace)
    return self
end

function Fspace:load()
    game_state = GAME_STATES.PLAY
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

        score_display = {
            Digit.new(60, 50, 0),
            Digit.new(40, 50, 0),
            Digit.new(20, 50, 0),
        }

        -- Create `fspace` title using helper
        fspace_text = chartext("fspace", 10, 10, 0, 20)

        -- Create `game over` text, centered on screen
        do
            local screen_w, screen_h = love.graphics.getWidth(), love.graphics.getHeight()
            local msg = "GAME OVER"
            local spacing = 20
            local start_x = (screen_w - #msg * spacing) / 2
            gameover_text = chartext(msg, start_x, screen_h / 2 - 20, 0, spacing)
        end

    end


function fire_bullet()
    local distance_from_origin = 30

    if ship.weapon_level == 0 then
        -- Find tip of ship in world coordinates
        local rad = math.rad(ship.angle + 90)
        local tip_x = ship.x   + math.cos(rad) * distance_from_origin * ship.scale
        local tip_y = ship.y  + math.sin(rad) * distance_from_origin * ship.scale
        local bullet = Bullet.new(tip_x, tip_y, ship.angle)
        local speed = 10
        bullet.dx = math.cos(rad) * speed
        bullet.dy = math.sin(rad) * speed
        table.insert(bullets, bullet)
       
    elseif ship.weapon_level == 1 then
        local rad = math.rad(ship.angle + 90)
        local forward_x = math.cos(rad)
        local forward_y = math.sin(rad)
        local perp_x = -math.sin(rad)
        local perp_y = math.cos(rad)
        local offset = 2
        local tip_x = ship.x + forward_x * distance_from_origin * ship.scale + perp_x * offset
        local tip_y = ship.y + forward_y * distance_from_origin * ship.scale + perp_y * offset
        local tip_x2 = ship.x + forward_x * distance_from_origin * ship.scale - perp_x * offset
        local tip_y2 = ship.y + forward_y * distance_from_origin * ship.scale - perp_y * offset
        local bullet = Bullet.new(tip_x, tip_y, ship.angle)
        local bullet2 = Bullet.new(tip_x2, tip_y2, ship.angle)
        local speed = 10
        bullet.color = {1, 0, 0} -- red bullet for level 1
        bullet.dx = forward_x * speed
        bullet.dy = forward_y * speed
        bullet2.color = {1, 0, 0} -- red bullet for level 1
        bullet2.dx = forward_x * speed
        bullet2.dy = forward_y * speed
        table.insert(bullets, bullet)
        table.insert(bullets, bullet2)

    elseif ship.weapon_level == 2 then
        local rad = math.rad(ship.angle + 90)
        local forward_x = math.cos(rad)
        local forward_y = math.sin(rad)
        local perp_x = -math.sin(rad)
        local perp_y = math.cos(rad)
        local offset = 3
        local tip_x = ship.x + forward_x * distance_from_origin * ship.scale - perp_x * offset
        local tip_y = ship.y + forward_y * distance_from_origin * ship.scale - perp_y * offset
        local tip_x2 = ship.x + forward_x * distance_from_origin * ship.scale
        local tip_y2 = ship.y + forward_y * distance_from_origin * ship.scale
        local tip_x3 = ship.x + forward_x * distance_from_origin * ship.scale + perp_x * offset
        local tip_y3 = ship.y + forward_y * distance_from_origin * ship.scale + perp_y * offset
        local bullet = Bullet.new(tip_x, tip_y, ship.angle)
        local bullet2 = Bullet.new(tip_x2, tip_y2, ship.angle)
        local bullet3 = Bullet.new(tip_x3, tip_y3, ship.angle)
        local speed = 10
        bullet.color = {0.5, 0, 1.0} -- purple 
        bullet.dx = forward_x * speed
        bullet.dy = forward_y * speed
        bullet2.color = {0.5, 0, 1.0} -- purple 
        bullet2.dx = forward_x * speed
        bullet2.dy = forward_y * speed
        bullet3.color = {0.5, 0, 1.0} -- purple 
        bullet3.dx = forward_x * speed
        bullet3.dy = forward_y * speed
        table.insert(bullets, bullet)
        table.insert(bullets, bullet2)
        table.insert(bullets, bullet3)
    end
    
end

function Fspace:update_color_animations(now)
    -- check the time_current_frame of fspace_text[1] and if more than 1 second
    -- rotate the colors of the prideColors table and assign to fspace_text
    if #fspace_text > 0 and fspace_text[1].time_current_frame + 1 < now then
        local first_color = table.remove(prideColors, 1)
        table.insert(prideColors, first_color)
        for i, char in ipairs(fspace_text) do
            char.color = prideColors[(i - 1) % #prideColors + 1]
        end
        fspace_text[1].time_current_frame = now
    end
end

function Fspace:update_light_animation(now)
    -- Animate light frames
    local duration = light.frame_durations[light.current_frame or 1] or 1
    if light.time_current_frame + duration < now then
        light.time_current_frame = now
        light.current_frame = (light.current_frame or 1) + 1
        if light.current_frame > #light.points then
            light.current_frame = 1
        end
    end
end

function Fspace:update_score_display(now)
    formated_score = string.format("%03d", ship.life)
    
    -- get the 1's 10's and 100's digits of ship life
    local len = #formated_score
    for i = 1, 3 do
        local digit_char = "0"
        if len - i + 1 > 0 then
            digit_char = formated_score:sub(len - i + 1, len - i + 1)
        end
        local digit_value = tonumber(digit_char) 
        score_display[i].current_frame = digit_value + 1
        score_display[i].last_update = now
    end
end

function chartext(str, start_x, y, angle, spacing)
    -- Build an array of `Char` objects for `str` starting at `start_x`,`y`.
    start_x = start_x or 10
    y = y or 10
    angle = angle or 0
    spacing = spacing or 20
    local out = {}
    local x = start_x
    for i = 1, #str do
        local c = str:sub(i,i)
        if c == ' ' then
            x = x + spacing
        else
            table.insert(out, Char.new(x, y, angle, c:lower()))
            x = x + spacing
        end
    end
    return out
end

function Fspace:update_check_GAMEOVER()
    -- If player's score (ship.life) drops below zero, set game state to GAMEOVER
    if ship and ship.life and ship.life <= 0 then
        game_state = GAME_STATES.GAMEOVER
    end
end

function Fspace:update_rocks()
    -- Update rocks
    for _, rock in ipairs(rocks) do
        rock.y = rock.y + (rock.dy or 0)
        rock.x = rock.x + (rock.dx or 0)
        rock.angle = (rock.angle + (rock.dr or 0)) % 360
    end
end

function Fspace:update_ship_rotation(dt)
    if love.keyboard.isDown("left") then
        ship.dr = ship.dr - rotation_delta
    elseif love.keyboard.isDown("right") then
        ship.dr = ship.dr + rotation_delta
    else
        ship.dr = ship.dr * 0.95
    end
    
    thrust.dr = ship.dr
    ship.angle = (ship.angle + ship.dr * dt) % 360
    thrust.angle = ship.angle
end

function Fspace:update_ship_thrust(dt)
    -- Thrust logic: add thrust vector opposite to ship's angle when space is pressed
    if love.keyboard.isDown("space") or love.mouse.isDown(1) then
        -- Thrust should be directly opposite to ship's facing direction
        local thrust_angle = (ship.angle + 90) % 360
        local rad = math.rad(thrust_angle)
        local tx = math.cos(rad) * thrust_delta
        local ty = math.sin(rad) * thrust_delta
        ship.dx = ship.dx + tx * dt
        ship.dy = ship.dy + ty * dt
    end
end

function Fspace:update_ship_physics(dt)
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
end

function Fspace:wrap_objects()
    -- Get screen size
    local screen_w, screen_h = love.graphics.getWidth(), love.graphics.getHeight()
    
    -- Wrap ship coordinates
    if ship.x < 0 then ship.x = ship.x + screen_w end
    if ship.x > screen_w then ship.x = ship.x - screen_w end
    if ship.y < 0 then ship.y = ship.y + screen_h end
    if ship.y > screen_h then ship.y = ship.y - screen_h end

    -- Wrap rock coordinates
    for _, rock in ipairs(rocks) do
        if rock.x < 0 then rock.x = rock.x + screen_w end
        if rock.x > screen_w then rock.x = rock.x - screen_w end
        if rock.y < 0 then rock.y = rock.y + screen_h end
        if rock.y > screen_h then rock.y = rock.y - screen_h end
    end
end

function Fspace:sync_visual_sprites()
    -- Move thrust sprite with ship
    thrust.x = ship.x
    thrust.y = ship.y
    thrust.angle = ship.angle

    -- Move light sprite with ship
    light.x = ship.x
    light.y = ship.y
    light.angle = ship.angle
end

function Fspace:update_bullet_firing()
    -- Fire bullet on right mouse, ctrl, alt, or f
    if love.mouse.isDown(2) or love.keyboard.isDown("lctrl") or love.keyboard.isDown("rctrl") or love.keyboard.isDown("lalt") or love.keyboard.isDown("ralt") or love.keyboard.isDown("f") then
        fire_bullet()
        bullet_fired = true
    else
        bullet_fired = false
    end
end

function Fspace:update_bullets()
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
end

function Fspace:collide_ship_with_rocks()
    local rock_number_collision_threshold = 50
    if #rocks > rock_number_collision_threshold then
        return
    end
    
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
                    -- decrease ship life on collision
                    ship.life = ship.life - 5
                    if ship.life < 0 then ship.life = 0 end
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
                end  
            end
        end
    end    
end

function Fspace:collide_ship_with_mines()
    if #mines > 20 then
        return
    end

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
            m.color = {0.7, 1.0, 0.7} -- light green to indicate recent spawn   
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
                    -- destroy mine on collision and decrease ship life
                    table.remove(mines, i)
                    ship.mine_collision_time = love.timer.getTime()
                    ship.life = ship.life - 10
                    if ship.life < 0 then ship.life = 0 end
                end
            end
        end
    end    
end

function Fspace:collide_bullets_with_rocks()
    local rock_number_collision_threshold = 50
    
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
end

function Fspace:collide_bullets_with_rocks()
    local rock_number_collision_threshold = 50
    
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

                -- Optionally spawn a box (same frequency as mines)
                if #boxes < 20 and math.random() < 0.05 then
                    local box = Box.new(rock.x, rock.y, rock.angle)
                    table.insert(boxes, box)
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
end

function Fspace:collide_bullets_with_mines()
    -- collision detection bullets and mines (AABB)
    for mi = #mines, 1, -1 do
        local mine = mines[mi]
        for bi = #bullets, 1, -1 do
            local bullet = bullets[bi]
            local bx, by = bullet.x, bullet.y
            local mine_min_x, mine_min_y, mine_max_x, mine_max_y = mine:get_bound_rect()
            mine_min_x = mine_min_x + mine.x
            mine_min_y = mine_min_y + mine.y
            mine_max_x = mine_max_x + mine.x
            mine_max_y = mine_max_y + mine.y
            
            if bx >= mine_min_x and bx <= mine_max_x and by >= mine_min_y and by <= mine_max_y then
                -- Bullet hit mine: remove both
                table.remove(bullets, bi)
                table.remove(mines, mi)
                break
            end
        end
    end
end

function Fspace:collide_ship_with_boxes()
    if #boxes > 20 then
        return
    end

    if ship.box_collision_time and love.timer.getTime() - ship.box_collision_time < 0.5 then
        ship.color = {1, 0.5, 0.5} -- flash ship light red after box collision
    else
        ship.color = {0, 1, 1} -- normal cyan color
    end

    -- collision detection ship and boxes (AABB)    
    local ship_min_x, ship_min_y, ship_max_x, ship_max_y = ship:get_bound_rect()
    ship_min_x = ship_min_x + ship.x
    ship_min_y = ship_min_y + ship.y
    ship_max_x = ship_max_x + ship.x
    ship_max_y = ship_max_y + ship.y

    for i, b in ipairs(boxes or {}) do
        -- Skip collision detection for 1.5 second after spawn
        if b.spawn_time and love.timer.getTime() - b.spawn_time < 1.5 then
            b.color = {0.7, 0.7, 1.0} -- light blue to indicate recent spawn   
        else
            if b.collision_time > 0 and love.timer.getTime() - b.collision_time < 1 then
                b.color = {1, 0, 0} -- red to indicate recent collision
            else
                b.color = {0.2, 0.2, 1.0} -- normal blue color
                local box_min_x, box_min_y, box_max_x, box_max_y = b:get_bound_rect()
                box_min_x = box_min_x + b.x
                box_min_y = box_min_y + b.y
                box_max_x = box_max_x + b.x
                box_max_y = box_max_y + b.y
                
                if not (ship_max_x < box_min_x or ship_min_x > box_max_x or ship_max_y < box_min_y or ship_min_y > box_max_y) then
                    b.collision_time = love.timer.getTime()
                    -- destroy box on collision and decrease ship life
                    table.remove(boxes, i)
                    ship.box_collision_time = love.timer.getTime()
                    ship.weapon_level = ( ship.weapon_level + 1 ) % ( ship.max_weapon_level + 1 )
                    print("Weapon level increased to ", ship.weapon_level)
                end
            end
        end
    end    
end

function Fspace:collide_bullets_with_boxes()
    -- collision detection bullets and boxes (AABB)
    for bi = #boxes, 1, -1 do
        local box = boxes[bi]
        for bii = #bullets, 1, -1 do
            local bullet = bullets[bii]
            local bx, by = bullet.x, bullet.y
            local box_min_x, box_min_y, box_max_x, box_max_y = box:get_bound_rect()
            box_min_x = box_min_x + box.x
            box_min_y = box_min_y + box.y
            box_max_x = box_max_x + box.x
            box_max_y = box_max_y + box.y
            
            if bx >= box_min_x and bx <= box_max_x and by >= box_min_y and by <= box_max_y then
                -- Bullet hit box: remove both
                table.remove(bullets, bii)
                table.remove(boxes, bi)
                break
            end
        end
    end
end

function Fspace:spawn_rocks()
    if #rocks < 2 then
        local screen_w, screen_h = love.graphics.getWidth(), love.graphics.getHeight()
        local center_x = screen_w / 2
        local center_y = screen_h / 2
        local angle = math.random() * math.pi + math.pi   
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

function Fspace:update(dt)
    local now = love.timer.getTime()

    -- Ship updates happen every frame (not scheduled)
    self:update_ship_rotation(dt)
    self:update_ship_thrust(dt)
    self:update_ship_physics(dt)
    self:sync_visual_sprites()

    -- Spin-schedule: execute one category per update call
    -- SPIN_SCHEDULE: ANIMATION
    if current_update_category == UPDATE_CATEGORIES.ANIMATION then
        self:update_color_animations(now)
        self:update_light_animation(now)
        self:update_score_display(now)
    
    -- SPIN_SCHEDULE: PHYSICS
    elseif current_update_category == UPDATE_CATEGORIES.PHYSICS then
        self:update_rocks()
        self:wrap_objects()
    
    -- SPIN_SCHEDULE: RENDERING
    elseif current_update_category == UPDATE_CATEGORIES.RENDERING then
        
        self:update_bullet_firing()
        self:update_bullets()
    
    -- SPIN_SCHEDULE: COLLISION
    elseif current_update_category == UPDATE_CATEGORIES.COLLISION then
        self:collide_ship_with_rocks()
        self:collide_ship_with_mines()
        self:collide_ship_with_boxes()
        self:collide_bullets_with_rocks()
        self:collide_bullets_with_mines()
        self:collide_bullets_with_boxes()
    
    -- SPIN_SCHEDULE: SPAWNING
    elseif current_update_category == UPDATE_CATEGORIES.SPAWNING then
        self:spawn_rocks()
    end

    -- Advance to next category in spin schedule
    current_update_category = current_update_category % 5 + 1
    -- Check for game over condition each update
    self:update_check_GAMEOVER()
end






function Fspace:draw()
    love.graphics.setColor(1, 1, 1)
    local screen_w, screen_h = love.graphics.getWidth(), love.graphics.getHeight()
    -- Draw mines
    for _, m in ipairs(mines or {}) do
        m:draw()
    end

    -- Draw boxes
    for _, b in ipairs(boxes or {}) do
        b:draw()
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


    for _, digit in ipairs(score_display) do
        digit:draw(digit.current_frame)
    end
   
    for _, char in ipairs(fspace_text) do
        char:draw(char.current_frame)
    end
    if game_state == GAME_STATES.GAMEOVER then
        for _, char in ipairs(gameover_text) do
            char:draw(char.current_frame)
        end
    end

    -- Check mines for overlapping edges and draw at wrapped positions
    for _, mine in ipairs(mines) do 
        local overlap = mine:is_overlapping(screen_w, screen_h)
        if overlap.left then
            mine.x = mine.x + screen_w
            mine:draw()
            mine.x = mine.x - screen_w
        end 
        if overlap.right then
            mine.x = mine.x - screen_w
            mine:draw()
            mine.x = mine.x + screen_w
        end
        if overlap.top then
            mine.y = mine.y + screen_h
            mine:draw()
            mine.y = mine.y - screen_h
        end
        if overlap.bottom then
            mine.y = mine.y - screen_h
            mine:draw()
            mine.y = mine.y + screen_h
        end
    end

    -- Check boxes for overlapping edges and draw at wrapped positions
    for _, box in ipairs(boxes) do 
        local overlap = box:is_overlapping(screen_w, screen_h)
        if overlap.left then
            box.x = box.x + screen_w
            box:draw()
            box.x = box.x - screen_w
        end 
        if overlap.right then
            box.x = box.x - screen_w
            box:draw()
            box.x = box.x + screen_w
        end
        if overlap.top then
            box.y = box.y + screen_h
            box:draw()
            box.y = box.y - screen_h
        end
        if overlap.bottom then
            box.y = box.y - screen_h
            box:draw()
            box.y = box.y + screen_h
        end
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

function Fspace:keypressed(key)
    if key == "q" then
        self.setScene("menu")
    end
end

function Fspace:mousemoved(x, y, dx, dy, istouch)
    local sensitivity = 0.5
    ship.angle = (ship.angle + dx * sensitivity) % 360
    thrust.angle = ship.angle
end

return Fspace