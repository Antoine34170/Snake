window.onload = function()
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blocSize = 30;
    var ctx;
    var delay = 1000;
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
        snakee = new Snake([[3,4],[4,4],[6,4]]);
        refreshCanvas();
    }
    
    function refreshCanvas()
    {
      
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        snakee.draw(); 
        setTimeout(refreshCanvas,delay);
    }
    
    function drawBlock(ctx, position)
    {
        var x = position[0] * blocSize;
        var y = position[1] * blocSize;
        ctx.fillRect(x,y, blocSize, blocSize)
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
        this.advance = function()
    }
    
    
    
}