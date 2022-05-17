var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

ctx.moveTo(0, 450);
ctx.lineTo(1800,450);
ctx.moveTo(450, 0);
ctx.lineTo(450,1800);
ctx.stroke();

let targetPosition = new vec2_t(1250, 1099);
let targetVelocity = new vec2_t(0,0);
let target = new game_object_t(targetPosition, targetVelocity);
ctx.beginPath();
ctx.fillStyle = 'orange';
ctx.arc(targetPosition.x/4+450, targetPosition.y/4+450, 2, 0, Math.PI * 2, true); // Outer circle
ctx.fill();
ctx.stroke();

let followerPosition = new vec2_t(0, 0);
let followerVelocity = new vec2_t(0,0);
let follower = new game_object_t(followerPosition, followerVelocity);
ctx.beginPath();
ctx.fillStyle = 'orange';
ctx.arc(450, 450, 2, 0, Math.PI * 2, true); // Outer circle
ctx.fill();
ctx.stroke();

for (let i = 0; i < 10; i++) {
	ctx.moveTo(follower.position.x/4+450, follower.position.y/4+450);
	follow_target(target, follower);
	console.log([i, follower.position.x,follower.position.y]);
	ctx.lineTo(follower.position.x/4+450, follower.position.y/4+450);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.arc(follower.x/4+450, follower.y/4+450, 2, 0, Math.PI * 2, true); // Outer circle
	ctx.fill();
	ctx.stroke();
}

let targetPosition2 = new vec2_t(-250, -1250);
let targetVelocity2 = new vec2_t(0,0);
let target2 = new game_object_t(targetPosition2, targetVelocity2);
ctx.beginPath();
	ctx.fillStyle = 'orange';
ctx.arc(targetPosition2.x/4+450, targetPosition2.y/4+450, 2, 0, Math.PI * 2, true); // Outer circle
ctx.fill();
ctx.stroke();

for (let i = 0; i < 32; i++) {
	ctx.moveTo(follower.position.x/4+450, follower.position.y/4+450);
	follow_target(target2, follower);
	console.log([i, follower.position.x,follower.position.y]);
	ctx.lineTo(follower.position.x/4+450, follower.position.y/4+450);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.arc(follower.x/4+450, follower.y/4+450, 2, 0, Math.PI * 2, true); // Outer circle
	ctx.fill();
	ctx.stroke();
}
ctx.stroke();

function vec2_t(x,y){
	this.x = x;
	this.y = y;
}

function game_object_t(position, velocity) {
	this.position = position;
	this.velocity = velocity;
}

function follow_target(target, follower)
{
	if (follower.position.x == target.position.x && follower.position.y == target.position.y) {
		return 0;
	}
	
	let absTX = target.position.x;
	let absTY = target.position.y;
	let absFX = follower.position.x;
	let absFY = follower.position.y;
	
	let wholeWidth = Math.abs(absTX - absFX);
	let wholeHeight = Math.abs(absTY - absFY);
	
	let tang = Math.tan(wholeHeight/wholeWidth);	
	let angle = Math.atan(tang);
	let degress = angle * 180 / Math.PI;
	
	let velX = 0, velY = 0;
	let distance = Math.sqrt(Math.pow(target.position.x - follower.position.x, 2) + Math.pow(target.position.y - follower.position.y, 2));
	let changedDistance = 0;
	
	//is direction altered
	
	let step = 10.0;
	
	let hypotenusen = Math.sqrt(Math.pow(follower.velocity.x, 2) + Math.pow(follower.velocity.y, 2));
	hypotenusen += step;
	
	hypotenusen = Math.min(hypotenusen, 100);
	
	if (distance < hypotenusen) {
	    follower.position.x = target.position.x;
	    follower.position.y = target.position.y;
	    
    	follower.velocity.x = 0;
    	follower.velocity.y = 0;
	} else {
    	let velX = hypotenusen * Math.cos(angle);
    	let velY = hypotenusen * Math.cos(90 * Math.PI / 180 - angle);
    	
    	let oldX = follower.position.x;
    	let oldY = follower.position.y;

    	if (target.position.x < follower.position.x) {
    		velX = -velX;
    	}
    	
    	if (target.position.y < follower.position.y) {
    		velY = -velY;
    	}    	
    	
    	follower.velocity.x = velX;
    	follower.velocity.y = velY;
    	
    	follower.position.x += follower.velocity.x;
    	follower.position.y += follower.velocity.y;
    	
    	changedDistance = Math.sqrt(Math.pow(oldX - follower.position.x, 2) + Math.pow(oldY - follower.position.y, 2));
	}
	
	return hypotenusen;
}