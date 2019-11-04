window.onload = function()
{
    var canvasWidth = 900;
    var canvasWidth = 600;
    var blocSize = 30;
    var ctx;
    var delay = 1000;
    var xCoord = 0;
    var yCoord = 0;
    var snakee;
    
    init();
    
    function init()
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasWidth;
        canvas.style.border = "1px solid" ;
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6,4],[5,4],[4,4]]);
        refreshCanvas();
        
        
    }
    
    function refreshCanvas()
    {
        xCoord += 5;
        yCoord += 5;
        ctx.clearRect(0,0,canvasWidth, canvasWidth);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(30 ,30 ,100, 50);  
        setTimeout(refreshCanvas,delay);
    }
    
function Snake(body)
    {
        this.body = body;
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
    }
    
    
}