class Pendulum {
    constructor() {
        this.cart = null;
        this.position = { x: 0, y: 0 };
        this.infinityPosition = {
            left2: { head: 0, line: 0 },
            left: { head: 0, line: 0 },
            middle: { head: 0, line: 0 },
            right: { head: 0, line: 0 },
            right2: { head: 0, line: 0 },
        };
        this.theta = 45.0;
        this.angularVelocity = 0.0;
        this.angularAcceleration = 0.0;
        this.length = 200;
        this.radius = 50;
        this.gravity = 9.8;
        this.mass = 1.0;
        this.realLength = 20.0;
        this.friction = 0.9;
        this.force = 0.0;
    }

    show() {
        const { cart, position } = this;
        this.infinityPosition.middle.head = position.x - 2*width*floor(cart.position.x/(2*width));
        this.infinityPosition.left2.head = this.infinityPosition.middle.head - 2*width;
        this.infinityPosition.left.head = this.infinityPosition.middle.head - width;
        this.infinityPosition.right.head = this.infinityPosition.middle.head + width;
        this.infinityPosition.right2.head = this.infinityPosition.middle.head + 2*width;

        this.infinityPosition.middle.line = position.x - 2*width*floor(cart.position.x/(2*width));
        this.infinityPosition.left2.line = this.infinityPosition.middle.line - 2*width;
        this.infinityPosition.left.line = this.infinityPosition.middle.line - width;
        this.infinityPosition.right.line = this.infinityPosition.middle.line + width;
        this.infinityPosition.right2.line = this.infinityPosition.middle.line + 2*width;

        const { infinityPosition, radius } = this;
        stroke(255, 100, 100);
        strokeWeight(40);
        line(cart.infinityPosition.left2, cart.position.y, infinityPosition.left2.line, position.y);
        line(cart.infinityPosition.left, cart.position.y, infinityPosition.left.line, position.y);
        line(cart.infinityPosition.middle, cart.position.y, infinityPosition.middle.line, position.y);
        line(cart.infinityPosition.right, cart.position.y, infinityPosition.right.line, position.y);
        line(cart.infinityPosition.right2, cart.position.y, infinityPosition.right2.line, position.y);

        fill(255, 100, 100);
        strokeWeight(7);

        stroke(255);
        circle(cart.infinityPosition.left2, cart.position.y, radius);
        circle(cart.infinityPosition.left, cart.position.y, radius);
        circle(cart.infinityPosition.middle, cart.position.y, radius);
        circle(cart.infinityPosition.right, cart.position.y, radius);
        circle(cart.infinityPosition.right2, cart.position.y, radius);

        stroke(0);
        circle(this.infinityPosition.left2.head, position.y, radius);
        circle(this.infinityPosition.left.head, position.y, radius);
        circle(this.infinityPosition.middle.head, position.y, radius);
        circle(this.infinityPosition.right.head, position.y, radius);
        circle(this.infinityPosition.right2.head, position.y, radius);
    }

    update() {        
        const { cart, gravity, length, realLength } = this;
        this.angularAcceleration = (cart.acceleration*cos(this.theta) + gravity*sin(this.theta))/realLength;
        this.angularVelocity += this.angularAcceleration;
        this.angularVelocity *= 0.99;
        this.theta += this.angularVelocity;
        
        this.position.x = cart.position.x + length*sin(this.theta);
        this.position.y = cart.position.y - length*cos(this.theta);

        while (this.theta > 180) {
            this.theta -= 360;
        }
        while (this.theta < -180) {
            this.theta += 360;
        }
    }

    applyForce(force) {
        this.force = force;
    }
}