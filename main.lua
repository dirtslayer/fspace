if os.getenv("LOCAL_LUA_DEBUGGER_VSCODE") == "1" then
    require("lldebugger").start()
end

local Fspace = require("fspace")
local fspace 

local Menu = require("menu")
local menu 

local SceneryInit = require("scenery/scenery")
local scenery = SceneryInit(
 {
    path = "menu";
    key = "menu";
    default = true;
 },
 {
    path = "fspace";
    key = "fspace";
 }
)



function love.load()
    love.window.setMode(1, 2)
    love.window.setMode(400, 600, {resizable=true, vsync=1, minwidth=200, minheight=300})
    love.window.setTitle("fspace")

    scenery:load()

end

--function love.mousepressed( x, y, button, istouch, presses )
--    scenery:mousepressed(x, y, button, istouch, presses)
--end

function love.update(dt)
    scenery:update(dt)
end

function love.draw()
    scenery:draw()
end

function love.keypressed(key)
    scenery:keypressed(key)
    
end

function love.mousemoved(x, y, dx, dy, istouch)
    scenery:mousemoved(x, y, dx, dy, istouch)   
end
