var maze = new Array()
var sides = new Array("Border-Top", "Border-Right")
for (var rows=0; rows<17; rows++)
maze[rows] = new Array()
maze[0][0] = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)
maze[0][1] = new Array(0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1)
maze[1][0] = new Array(0,1,0,0,1,1,0,0,0,0,1,1,1,1,1,0)
maze[1][1] = new Array(1,0,1,0,0,0,1,1,0,0,0,0,0,0,1,1)
maze[2][0] = new Array(0,0,1,0,1,0,0,1,0,1,1,1,1,1,0,0)
maze[2][1] = new Array(1,0,1,1,0,1,0,0,1,0,0,0,0,0,1,1)
maze[3][0] = new Array(0,1,0,0,0,0,1,1,1,1,0,1,1,1,1,0)
maze[3][1] = new Array(1,0,1,0,1,1,0,0,0,0,0,0,0,0,1,1)
maze[4][0] = new Array(0,0,1,1,0,1,0,1,1,1,1,1,1,1,0,0)
maze[4][1] = new Array(1,1,0,1,0,1,0,1,0,0,0,0,0,0,1,1)
maze[5][0] = new Array(0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,0)
maze[5][1] = new Array(1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1)
maze[6][0] = new Array(0,0,0,1,1,1,1,0,1,1,0,1,1,1,1,1)
maze[6][1] = new Array(0,1,0,1,0,0,1,1,0,1,0,1,0,1,0,1)
maze[7][0] = new Array(1,0,1,1,1,1,0,0,1,0,0,0,0,0,0,0)
maze[7][1] = new Array(0,0,0,0,0,1,1,0,1,1,1,0,1,0,1,1)
maze[8][0] = new Array(0,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0)
maze[8][1] = new Array(1,0,0,0,0,1,1,0,1,1,0,0,0,1,1,1)
maze[9][0] = new Array(0,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0)
maze[9][1] = new Array(1,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1)
maze[10][0] = new Array(0,0,0,1,1,1,0,1,1,1,1,0,1,1,0,0)
maze[10][1] = new Array(0,1,1,0,0,0,0,0,0,0,1,0,0,0,1,1)
maze[11][0] = new Array(1,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0)
maze[11][1] = new Array(0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1)
maze[12][0] = new Array(0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0)
maze[12][1] = new Array(1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,1)
maze[13][0] = new Array(0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,0)
maze[13][1] = new Array(1,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1)
maze[14][0] = new Array(0,0,0,0,1,1,1,1,1,0,0,1,1,1,0,0)
maze[14][1] = new Array(1,1,0,1,0,0,0,0,0,1,1,0,0,0,1,1)
maze[15][0] = new Array(0,0,1,1,0,0,1,1,1,1,0,0,1,1,1,0)
maze[15][1] = new Array(1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1)
maze[16][0] = new Array(0,0,0,0,0,1,1,1,1,0,1,0,1,1,0,1)
maze[16][1] = new Array(1,1,0,1,0,0,0,1,0,0,1,0,0,1,0,1)
function testNext(nxt) {
if ((table2.rows[start.rows].cells[start.cols].style.backgroundColor=="yellow") && (nxt.style.backgroundColor=='yellow')) {
message.innerText="I see you changed your mind."
table2.rows[start.rows].cells[start.cols].style.backgroundColor=""
return false
}
return true
}
function moveIt() {
if (!progress) return
switch (event.keyCode) {
case 37: // left
if (maze[start.rows][1][start.cols-1]==0) {
if (testNext(table2.rows[start.rows].cells[start.cols-1]))
message.innerText="Going west..."
start.cols--
document.all.table2.rows[start.rows].cells[start.cols].style.backgroundColor="yellow"
} else
message.innerText="Ouch... you can't go west."
break;
case 38: // up
if (maze[start.rows][0][start.cols]==0) {
if (testNext(table2.rows[start.rows-1].cells[start.cols]))
message.innerText="Going north..."
start.rows--
document.all.table2.rows[start.rows].cells[start.cols].style.backgroundColor="yellow"
} else
message.innerText="Ouch... you can't go north."
break;
case 39: // right
if (maze[start.rows][1][start.cols]==0) {
if (testNext(table2.rows[start.rows].cells[start.cols+1]))
message.innerText="Going east..."
start.cols++
document.all.table2.rows[start.rows].cells[start.cols].style.backgroundColor="yellow"
}
else
message.innerText="Ouch... you can't go east."
break;
case 40: //down
if (maze[start.rows+1]==null) return
if (maze[start.rows+1][0][start.cols]==0) {
if (testNext(table2.rows[start.rows+1].cells[start.cols]))
message.innerText="Going south..."
start.rows++
document.all.table2.rows[start.rows].cells[start.cols].style.backgroundColor="yellow"
} else
message.innerText="Ouch... you can't go south."
break;
}
if (document.all.table2.rows[start.rows].cells[start.cols].innerText=="end") {
message.innerText="You Win!"
progress=false
}
}

