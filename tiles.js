var selectedTile = 0;
var mouseIsDown = false;

function setAll(a, v) {
    var i, n = a.length;
    for (i = 0; i < n; ++i) {
        a[i].style.opacity = v;
    }
}

function setMouse(event)
{
    event.preventDefault();
    mouseIsDown = true;
    getPosition(event);
}

function download()
{
    window.open(document.getElementById('town').toDataURL(), "_blank");
}

function getPosition(event)
{
    if (mouseIsDown)
    {
        var x = event.x;
        var y = event.y;
            
        var canvas = document.getElementById("town");
        
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        
        var val_x = parseInt(x/32);
        var val_y = parseInt(y/32);
        
        var context = canvas.getContext("2d");
        
        var pos = selectedTile;
        
        var pos_x = parseInt(pos%16);
        var pos_y = parseInt(pos/16);
        
        // alert(pos_x + " " + pos_y);
                
        context.drawImage(document.getElementById("tile1"), pos_x*32, (pos_y*32), 32, 32, val_x*32, val_y*32, 32, 32);
    }
}

function undoMouse(event)
{
    mouseIsDown = false;
}

function select(id)
{
    // setAll(document.getElementsByClassName('highlightit img'), .5);
    setAll(document.getElementsByClassName('tile'), "");
    document.getElementById('tile'+id).style.opacity = 1;
    selectedTile = id;
    // alert(id);
}

function drawSelector()
{
    
    document.getElementById('town').addEventListener("mousedown", setMouse, false);
    document.getElementById('town').addEventListener("mouseup", undoMouse, false);
    document.getElementById('town').addEventListener("mousemove", getPosition, false);



    for (var x=0; x<8; x++)
    {
        for (var y=0; y<16; y++)
        {
            var img = new Image();
            img.src = "outside.png";
            img.style.clip = 'rect('+(x*32)+'px, '+((y+1)*32)+'px, '+((x+1)*32)+'px, '+(y*32)+'px)';
            img.className = "tile";
            
            img.style.marginTop = "-"+(y*32);
            img.style.marginLeft = "-"+(x*32);
            
            img.style.top = (1-x%2)+(y*32)-32*(x%2)-32*((x-(x%2))/2)+x/2;
            img.style.left = (x*32)+528*(x%2)+y;
            
            var a = document.createElement('a');
            a.href =  'javascript:select('+(y+x*16)+')';
            a.className = "highlightit";
            img.id = "tile"+(y+x*16);
            
            a.appendChild(img);
            document.getElementById('tileSelect').appendChild(a);
        }
    }
    
    document.getElementById('tile0').style.opacity = 1;

    

}