window.onload = function()
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blocSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth/blocSize;
    var HeightInBlocks = canvasHeight/blocSize;
   
    
   
    
    
        
    init();
    
    function init()
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid" ;
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        
        //declaration serpent + la pomme en coord aléatoire
        snakee = new Snake([[6,4],[5,4],[4,4]], "right");
        applee = new Apple([10,10]);
        
         //déclaration des coord aléatoire de la pomme en debut de game
        xCoord = parseInt(Math.random(canvasWidth) * canvasWidth) ;
        yCoord = parseInt(Math.random(canvasHeight) * canvasHeight) ;
        /*console.log("x : " + xCoord +" et y vaut " + yCoord);*/
        refreshCanvas();
    }
    
    function refreshCanvas()
    {
        snakee.advance();
        if (snakee.checkCollision())
        {
            // GAME OVER
         
        }
        else
        {
            ctx.clearRect(0,0,canvasWidth, canvasHeight);
            snakee.draw(); 
            applee.draw();
            setTimeout(refreshCanvas,delay);
        }
    }
    // CODAGE REMPLISSAGE CARRE
    function drawBlock(ctx, position)
    {
        var x = position[0] * blocSize;
        var y = position[1] * blocSize;
        ctx.fillRect(x,y, blocSize, blocSize)
    }
// SERPENT    
function Snake(body,direction)
    {
        this.body = body;
        this.direction = direction;
        //CODAGE DU REMPLISSAGE DU SNAKE + COULEUR
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i=0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i]);
                
            }
            ctx.restore();
        }
        // CODAGE DU MOUVEMENT DU SNAKE
        this.advance = function()
        {
            var nextPosition = this.body[0].slice();
            switch(this.direction)
                {
                    case "left": 
                        nextPosition[0] -= 1;
                        break;   
                    case "right": 
                        nextPosition[0] += 1;
                            break; 
                    case "up": 
                        nextPosition[1] -= 1;
                            break; 
                    case "down": 
                        nextPosition[1] += 1;
                        break; 
                    default:
                        throw("Invalid Direction");
                }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        //CODAGE DIRECTION + TEST SAISIE
        this.setDirection = function(newDirection)
        {
            var allowedDirection;
            switch(this.direction)
            {
                case "left": 
                    allowedDirection = ["up","down"];
                    break;   
                case "right": 
                    allowedDirection = ["up","down"];
                    break; 
                case "up": 
                    allowedDirection = ["left","right"];
                    break; 
                case "down": 
                    allowedDirection = ["left","right"];
                    break;
                default:
                        throw("Invalid Direction");
             }
            if (allowedDirection.indexOf(newDirection) > -1)
            {
                   this.direction = newDirection; 
            }
                
        };
        
        // TEST DE COLLISION MUR + SNAKE
        this.checkCollision = function()
        {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks -1;
            var maxY = HeightInBlocks -1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY; 
            while (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
            {
                wallCollision = true;
            }
            
            for(var i=0; i<rest.length; i++)
            {
                if(snakeX === rest[i][0] && snakeY === rest[i][1])
                {
                    snakeCollision = true;
                }
            }
        return wallCollision || snakeCollision;
        };
    }   
    //LA POMME
    function Apple(position)
    {
        this.position = position;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blocSize / 2;
            var x = position[0]*blocSize + radius;
            var y = position[1]*blocSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        }
    }

    
    document.onkeydown = function handleKeyDown(e)
    {
        var key = e.keyCode
        var newDirection;
        switch(key)
            {
                case 37: 
                    newDirection = "left";     
                    break;
                case 38:  
                    newDirection = "up"; 
                    break;
                case 39: 
                    newDirection = "right"; 
                    break;
                case 40:     
                    newDirection = "down"; 
                    break;
                default:
                     return;
            }
        snakee.setDirection(newDirection);
    }
    
}