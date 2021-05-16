class Cart {
    constructor() {
        this.pendulum = null;
        this.infinityPosition = { left2: 0, left: 0, middle: 0, right: 0, right2: 0 };
        this.size = { x: 100, y: 100 };
        this.isPIDEnabled = true;
        this.position = { x: width/2, y: height/2 };
        this.velocity = 0.0;
        this.acceleration = 0.0;
        this.mass = 50.0;
        this.force = 0.0;
        this.velocityLimit = 10.0;
        this.pidForce = 0.0;
        this.pid = new PID(38, 0.0115, 12.5);
    }

    show() {
        const { position } = this;
        this.infinityPosition.middle = position.x - 2*width*floor(position.x/(2*width));
        this.infinityPosition.left2 = this.infinityPosition.middle - 2*width;
        this.infinityPosition.left = this.infinityPosition.middle - width;
        this.infinityPosition.right = this.infinityPosition.middle + width;
        this.infinityPosition.right2 = this.infinityPosition.middle + 2*width; 
        
        const { infinityPosition, size } = this;
        fill(0);
        noStroke();
        rect(infinityPosition.left2 - size.x/2, position.y - size.y/2, size.x, size.y);
        rect(infinityPosition.left - size.x/2, position.y - size.y/2, size.x, size.y);
        rect(infinityPosition.middle - size.x/2, position.y - size.y/2, size.x, size.y);
        rect(infinityPosition.right - size.x/2, position.y - size.y/2, size.x, size.y);
        rect(infinityPosition.right2 - size.x/2, position.y - size.y/2, size.x, size.y);
    }

    update() {
        const { pendulum, mass, velocityLimit } = this;
        this.applyPID();
        this.acceleration = (
                this.force
                + this.pidForce
                + pendulum.mass*pendulum.realLength*pendulum.angularAcceleration*cos(pendulum.theta)
                - pendulum.mass*pendulum.realLength*sin(pendulum.theta)-pendulum.angularVelocity**2
            )/(mass + pendulum.mass);
        this.velocity += this.acceleration;
        this.velocity *= 0.99;
        if (this.velocity >= velocityLimit) {
            this.velocity = velocityLimit;
        } else if (this.velocity <= -velocityLimit) {
            this.velocity = -velocityLimit;
        }
        this.position.x += this.velocity;
        this.force = 0.0;
        this.pidForce = 0.0;
    }

    applyPID() {
        if (!this.isPIDEnabled) return;
        const { theta, angularVelocity } = this.pendulum;

        let desired = 0;
        if (theta < -135 && theta > -180) {
            if (angularVelocity > 0) {
                desired = -45;
            } else {
                desired = 46;
            }
        } else if (theta > 135 && theta < 180) {
            if (angularVelocity > 0) {
                desired = -46;
            } else {
                desired = 45;
            }
        }
        const pidError = this.pid.apply(desired, theta);
        this.applyPIDForce(pidError);
    }

    applyForce(force) {
        this.force = force;
    }

    applyPIDForce(force) {
        this.pidForce = force;
    }
}