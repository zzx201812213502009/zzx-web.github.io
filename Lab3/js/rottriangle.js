"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var direction = 1;
var delay = 200;

function changeDir(){
	direction *= -1;
}

function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	var vertices = [
		 0,  1,  0,
		-0.866,  -0.5,  0,
		 0.866,  -0.5,  0,
	];

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var a_Position = gl.getAttribLocation( program, "a_Position" );
	gl.vertexAttribPointer( a_Position, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( a_Position );

	thetaLoc = gl.getUniformLocation( program, "theta" );

	// document.getElementById( "controls" ).onclick = function( event ){
	// 	switch( event.target.index ){
	// 		case 0:
	// 			direction *= -1;
	// 			break;
	// 		case 1:
	// 			delay /= 2.0;
	// 			break;
	// 		case 2:
	// 			delay *= 2.0;
	// 			break;	
	// 	}
	// };

	renderSquare();
}

function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += direction * 0.1;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	else if( theta < -2 * Math.PI )
		theta += ( 2 * Math.PI );

	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 3 );

	// update and render
	setTimeout( function (){ requestAnimFrame( renderSquare ); }, delay );
}
function change_(){
	var n=document.getElementById("controls").value;
	if(n==1){
		delay /= 0.5;
	}
	if(n==2){
		delay /= 1.5;
	}
	if(n==3){
		delay /= 2.0;
	}
	if(n==4){
		direction *= -1;
	}
}