/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>
#include <math.h>

using namespace std;

struct vec2_t {
    float x, y;
};

struct game_object_t {
    struct vec2_t position;
    struct vec2_t velocity;
};

float follow_target(const struct game_object_t* target, struct game_object_t* follower)
{
	if (follower->position.x == target->position.x && follower->position.y == target->position.y) {
		return 0;
	}
	
	float absTX = target->position.x;
	float absTY = target->position.y;
	float absFX = follower->position.x;
	float absFY = follower->position.y;
	
	float wholeWidth = abs(absTX - absFX);
	float wholeHeight = abs(absTY - absFY);
	
	float tang = tan(wholeHeight/wholeWidth);	
	float angle = atan(tang);
	float degress = angle * 180 / M_PI;
	
	float velX = 0, velY = 0;
	float distance = sqrt(pow(target->position.x - follower->position.x, 2) + pow(target->position.y - follower->position.y, 2));
	float changedDistance = 0;
	
	//is direction altered
	
	float step = 10.0;
	
	float hypotenusen = sqrt(pow(follower->velocity.x, 2) + pow(follower->velocity.y, 2));
	hypotenusen += step;
	
	hypotenusen = min(hypotenusen, 100.0f);
	
	if (distance < hypotenusen) {
	    follower->position.x = target->position.x;
	    follower->position.y = target->position.y;
	    
    	follower->velocity.x = 0.0f;
    	follower->velocity.y = 0.0f;
	} else {
    	float velX = hypotenusen * cos(angle);
    	float velY = hypotenusen * cos(90 * M_PI / 180 - angle);
    	
    	float oldX = follower->position.x;
    	float oldY = follower->position.y;

    	if (target->position.x < follower->position.x) {
    		velX = -velX;
    	}
    	
    	if (target->position.y < follower->position.y) {
    		velY = -velY;
    	}    	
    	
    	follower->velocity.x = velX;
    	follower->velocity.y = velY;
    	
    	follower->position.x += follower->velocity.x;
    	follower->position.y += follower->velocity.y;
    	
    	changedDistance = sqrt(pow(oldX - follower->position.x, 2) + pow(oldY - follower->position.y, 2));
	}
	
	return hypotenusen;
    
}

int main()
{
    vec2_t targetPosition {
        1250,
        1099
    };
    vec2_t targetVelocity {
        0,
        0
    };
    const game_object_t target {
        targetPosition,
        targetVelocity
    };
    
    vec2_t followerPosition {
        0,
        0
    };
    vec2_t followerVelocity {
        0,
        0
    };
    game_object_t follower {
        followerPosition,
        followerVelocity
    };
	
	for (int i = 0; i < 10; i++) {
	    float distance = follow_target(&target, &follower);
	    cout << i << ": " << follower.position.x << ", " << follower.position.y << '(' << distance << ')' << follower.velocity.x << ", " << follower.velocity.y << endl;
	}
	
    vec2_t targetPosition1 {
        -250,
        -1250
    };
    vec2_t targetVelocity1 {
        0,
        0
    };
    const game_object_t newTarget {
        targetPosition1,
        targetVelocity1
    };
	
	for (int i = 0; i < 32; i++) {
	    float distance = follow_target(&newTarget, &follower);
	    cout << i << ": " << follower.position.x << ", " << follower.position.y << '(' << distance << ')' << follower.velocity.x << ", " << follower.velocity.y << endl;
	}
}


