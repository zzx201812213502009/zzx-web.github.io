"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;
var points = [];
var str;
var str2;
var colors = [];
var twist = false;

var numTimesToSubdivide = 4;
var theta=60;
var radius=1.0;

function init (){
var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	points = [];

	if(str == '2d'){

        // initialise data for Sierpinski gasket
        // first, initialise the corners of the gasket with three points.
        var vertices = [
            -1, -1,  0,
             0,  1,  0,
             1, -1,  0
        ];

        // var u = vec3.create();
        // vec3.set( u, -1, -1, 0 );
        var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
        // var v = vec3.create();
        // vec3.set( v, 0, 1, 0 );
        var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
        // var w = vec3.create();
        // vec3.set( w, 1, -1, 0 );
        var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

        divideTriangle( u, v, w, numTimesToSubdivide );

        // configure webgl
        gl.viewport( 0, 0, canvas.width, canvas.height );
        gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

        // load shaders and initialise attribute buffers
        var program = initShaders( gl, "vertex-shader", "fragment-shader" );
        gl.useProgram( program );

        // load data into gpu
        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

        // associate out shader variables with data buffer
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
	}
	if(str == "3d"){

        // initialise data for 3d sierpinski gasket
        // first initialize the vertices of the 3d gasket
        // four vertices on unit cicle
        // initial tetrahedron with equal length sides

        var vertices = [
            0.0000, 0.0000, -1.0000,
            0.0000, 0.9428, 0.3333,
            -0.8165, -0.4714, 0.3333,
            0.8165, -0.4714, 0.3333
        ];

        // var t = vec3.create();
        // vec3.set(t, vertices[0], vertices[1], vertices[2]);
        var t = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
        // var u = vec3.create();
        // vec3.set(u, vertices[3], vertices[4], vertices[5]);
        var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
        // var v = vec3.create();
        // vec3.set(v, vertices[6], vertices[7], vertices[8]);
        var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
        // var w = vec3.create();
        // vec3.set(w, vertices[9], vertices[10], vertices[11]);
        var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );

        divideTetra(t, u, v, w, numTimesToSubdivide);

        // configure webgl
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);

        // enable hidden-surface removal
        gl.enable(gl.DEPTH_TEST);    //作深度测试

        // load shaders and initialize attribute buffers
        var program = initShaders(gl, "vertex-shader-3d", "fragment-shader-3d");
        gl.useProgram(program);

        // create buffer object, initialize it, and associate it with
        // attribute variables in vertex shader

        var vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        var vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);

	}



	if(str == "wire"){
        // initialise data for Sierpinski gasket
        // first, initialise the corners of the gasket with three points.
        if(str == "wire" && str2 != undefined ){
			// alert("is linear. and rotate");

			// first, initialise the corners of the gasket with three points.
			// R=0.6, Theta = 90, 210, -30
			var vertices = [
				radius * Math.cos(90 * Math.PI / 180.0), radius * Math.sin(90 * Math.PI / 180.0),  0,
				radius * Math.cos(210 * Math.PI / 180.0), radius * Math.sin(210 * Math.PI / 180.0),  0,
				radius * Math.cos(-30 * Math.PI / 180.0), radius * Math.sin(-30 * Math.PI / 180.0),  0
			];

		}else{
			// Three Vertices
			var vertices = [
				-1.0, -1.0, 0.0,
				 0.0,  1.0, 0.0,
				 1.0, -1.0, 0.0
			];
		}

        // var u = vec3.create();
        // vec3.set( u, -1, -1, 0 );
        var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
        // var v = vec3.create();
        // vec3.set( v, 0, 1, 0 );
        var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
        // var w = vec3.create();
        // vec3.set( w, 1, -1, 0 );
        var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

        divideWire( u, v, w, numTimesToSubdivide );

        // configure webgl
        gl.viewport( 0, 0, canvas.width, canvas.height );
        gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

        // load shaders and initialise attribute buffers
        var program = initShaders( gl, "vertex-shader", "fragment-shader" );
        gl.useProgram( program );

        // load data into gpu
        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

        // associate out shader variables with data buffer
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
	}

	if(str == '2d')renderTriangles();
	if(str == '3d')render_3d();
	if(str == 'wire'){
        if(str2 == 'NO')renderRotate();
        else if(str2 == 'YES')renderChange();
        else renderWire();
	}


}


function triangle( a, b, c ){
	//var k;
	points.push( a[0], a[1], a[2] );
	points.push( b[0], b[1], b[2] );
	points.push( c[0], c[1], c[2] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( a[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( b[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( c[k] );
}


function divideTriangle( a, b, c, count ){
	// check for end of recursion
	if( count == 0 ){
		triangle( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );  //a*alpha+b*(1-alpha)
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

//		--count;
//        点的顺序为逆时针顺序
		// three new triangles
		divideTriangle( a, ab, ca, count-1 );
		divideTriangle( b, bc, ab, count-1 );
		divideTriangle( c, ca, bc, count-1 );
	}
}


function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
}

function myClickShape(){
	var temp = document.getElementsByName("Shape");
	for(var i=0;i<temp.length;i++){
		if(temp[i].checked){
			str = temp[i].value;
		}
    }
    alert(str);
		init();
}

function myClicksChange(){
	var round = document.getElementsByName("Change");
	for(var i=0;i<round.length;i++){
		if(round[i].checked)str2 = round[i].value;

	}
	if(str2 == "NO") twist = false;
	else twist = true;
	alert(str2);
	init();
}


function myClickGo(){
    points = [];
    numTimesToSubdivide = document.getElementById("myRange").value;
    canvas = document.getElementById("gl-canvas")
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
    init();
}

function myClickRotate(){
    points = [];
    theta = document.getElementById("myChange").value;
    canvas = document.getElementById("gl-canvas")
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
    init();
}

function triangle(a, b, c, color) {
    // add colors and vertices for one triangle
    var baseColor = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 0.0
    ];

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(a[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(b[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(c[k]);
}



function tetra(a, b, c, d) {
    triangle(a, c, b, 0);
    triangle(a, c, d, 1);
    triangle(a, b, d, 2);
    triangle(b, c, d, 3);
}

function divideTetra(a, b, c, d, count) {
    // check for end of recursion
    if (count == 0) {
        tetra(a, b, c, d);
    } else {
        var ab = vec3.create();
        vec3.lerp(ab, a, b, 0.5);
        var ac = vec3.create();
        vec3.lerp(ac, a, c, 0.5);
        var ad = vec3.create();
        vec3.lerp(ad, a, d, 0.5);
        var bc = vec3.create();
        vec3.lerp(bc, b, c, 0.5);
        var bd = vec3.create();
        vec3.lerp(bd, b, d, 0.5);
        var cd = vec3.create();
        vec3.lerp(cd, c, d, 0.5);

        --count;

        divideTetra(a, ab, ac, ad, count);
        divideTetra(ab, b, bc, bd, count);
        divideTetra(ac, bc, c, cd, count);
        divideTetra(ad, bd, cd, d, count);
    }

}


function render_3d() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);
}

function triangleWire(a, b, c){
	points.push(a[0], a[1], a[2]);
	points.push(b[0], b[1], b[2]);

	points.push(b[0], b[1], b[2]);
	points.push(c[0], c[1], c[2]);

	points.push(c[0], c[1], c[2]);
	points.push(a[0], a[1], a[2]);
}


function tessellaTriangle( a, b, c ){
    //var k;
    var zerovec3 = vec3.create();
    vec3.zero( zerovec3 );
    var radian = theta * Math.PI / 180.0;

    var a_new = vec3.create();
    var b_new = vec3.create();
    var c_new = vec3.create();

    if( twist == false ){
        vec3.rotateZ( a_new, a, zerovec3, radian );
        vec3.rotateZ( b_new, b, zerovec3, radian );
        vec3.rotateZ( c_new, c, zerovec3, radian );

        points.push( a_new[0], a_new[1], a_new[2] );
        points.push( b_new[0], b_new[1], b_new[2] );
        points.push( b_new[0], b_new[1], b_new[2] );
        points.push( c_new[0], c_new[1], c_new[2] );
        points.push( c_new[0], c_new[1], c_new[2] );
        points.push( a_new[0], a_new[1], a_new[2] );
    }else{
        var d_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
        var d_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
        var d_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );

        vec3.set( a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin( d_a * radian ),
            a[0] * Math.sin( d_a * radian ) + a[1] * Math.cos( d_a * radian ), 0 );
        vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
            b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
        vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
            c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);

        points.push(a_new[0], a_new[1], a_new[2]);
        points.push(b_new[0], b_new[1], b_new[2]);
        points.push(b_new[0], b_new[1], b_new[2]);
        points.push(c_new[0], c_new[1], c_new[2]);
        points.push(c_new[0], c_new[1], c_new[2]);
        points.push(a_new[0], a_new[1], a_new[2]);

    }
}

function divideWire(a, b, c, count){
	if(count == 0){
		if(str2 != undefined){
		    tessellaTriangle( a, b, c );
		}
		else
		    triangleWire(a, b, c);
	}
	else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);

		divideWire(a, ab, ca, count-1);
		divideWire(b, bc, ab, count-1);
		divideWire(c, ca, bc, count-1);
		divideWire(ab, bc, ca, count-1);
	}
}
function renderWire(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}

function triangleRotate(a, b, c, theta){
	theta = theta * Math.PI / 180.0;

	points.push(a[0] * Math.cos(theta) - a[1] * Math.sin(theta), a[0] * Math.sin(theta) + a[1] * Math.cos(theta), a[2]);
	points.push(b[0] * Math.cos(theta) - b[1] * Math.sin(theta), b[0] * Math.sin(theta) + b[1] * Math.cos(theta), b[2]);

	points.push(b[0] * Math.cos(theta) - b[1] * Math.sin(theta), b[0] * Math.sin(theta) + b[1] * Math.cos(theta), b[2]);
	points.push(c[0] * Math.cos(theta) - c[1] * Math.sin(theta), c[0] * Math.sin(theta) + c[1] * Math.cos(theta), c[2]);

	points.push(c[0] * Math.cos(theta) - c[1] * Math.sin(theta), c[0] * Math.sin(theta) + c[1] * Math.cos(theta), c[2]);
	points.push(a[0] * Math.cos(theta) - a[1] * Math.sin(theta), a[0] * Math.sin(theta) + a[1] * Math.cos(theta), a[2]);
}

function divideRound(a, b, c, count){
	if(count == 0){
		triangleRotate(a, b, c, theta);
	}
	else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);

		divideRound(a, ab, ca, count-1);
		divideRound(b, bc, ab, count-1);
		divideRound(c, ca, bc, count-1);
		divideRound(ab, bc, ca, count-1);
	}
}
function renderRotate(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}

function triangleChange(a, b, c, theta){
	var zerovec3 = vec3.create();
	vec3.zero( zerovec3 );
	var radian;
	var a_new = vec3.create();
	var b_new = vec3.create();
	var c_new = vec3.create();
	radian = theta * Math.PI / 180.0;


	var d_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
	var d_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
	var d_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );

	vec3.set( a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin( d_a * radian ),
		a[0] * Math.sin( d_a * radian ) + a[1] * Math.cos( d_a * radian ), 0 );
	vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
		b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
	vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
		c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);

	points.push(a_new[0], a_new[1], a_new[2]);
	points.push(b_new[0], b_new[1], b_new[2]);
	points.push(b_new[0], b_new[1], b_new[2]);
	points.push(c_new[0], c_new[1], c_new[2]);
	points.push(c_new[0], c_new[1], c_new[2]);
	points.push(a_new[0], a_new[1], a_new[2]);
}

function divideChange(a, b, c, count){
	if(count == 0){
		triangleChange(a, b, c, theta);
	}
	else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);

		divideChange(a, ab, ca, count-1);
		divideChange(b, bc, ab, count-1);
		divideChange(c, ca, bc, count-1);
		divideChange(ab, bc, ca, count-1);
	}
}


function renderChange(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}
