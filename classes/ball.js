class Ball {
    constructor() {
        this.x = getWidth() / 2;
        this.y = getHeight() / 2;
        this.radius = 12;
        this.maxSpeed = getWidth() * 0.0005;
        this.maxAngle = 50;
        this.velocity = {x: getWidth() * 0.0002, y: 0};
        this.orginalVelocity = {x: getWidth() * 0.0002, y: 0};
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(deltaTime, paddle1, paddle2) {
        this.checkBounds(paddle1, paddle2);
        this.collides(paddle1);
        this.collides(paddle2);
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
    }

    checkBounds(paddle1, paddle2) {
        // Vertical bounds
        if ((this.y - this.radius < 0 && this.velocity.y < 0) ||
            (this.y + this.radius > getHeight() && this.velocity.y > 0)) {
            this.velocity.y = -this.velocity.y;
        }
        // Left bound
        else if (this.x - this.radius < 0 && this.velocity.x < 0) {
            paddle1.score++;
            this.reset();
            this.velocity.x = -Math.abs(this.velocity.x);
        }
        // Right bound
        else if (this.x + this.radius > getWidth() && this.velocity.x > 0) {
            paddle2.score++;
            this.reset();
            this.velocity.x = Math.abs(this.velocity.x);
        }
    }

    reset() {
        this.x = getWidth() / 2;
        this.y = getHeight() / 2;
        this.orginalVelocity = {x: getWidth() * 0.0002, y: 0};
        this.velocity.x = this.orginalVelocity.x;
        this.velocity.y = this.orginalVelocity.y;
    }

    collides(paddle) {
        if (this.x - this.radius < paddle.x + paddle.width &&
            this.x - this.radius > paddle.x &&
            this.y + this.radius > paddle.y &&
            this.y - this.radius < paddle.y + paddle.height &&
            this.velocity.x < 0)
        {
            let paddleCenter = paddle.y + (paddle.height / 2);
            let difference = this.y - paddleCenter;
            let angle = (this.maxAngle * difference) / (paddle.height * 0.5);
            angle *= (Math.PI / 180); // Convert to radians
            this.velocity.x = Math.abs(this.maxSpeed * Math.cos(angle));
            this.velocity.y = this.maxSpeed * Math.sin(angle);
        }
        if (this.x + this.radius < paddle.x + paddle.width &&
            this.x + this.radius > paddle.x &&
            this.y + this.radius > paddle.y && 
            this.y - this.radius < paddle.y + paddle.height &&
            this.velocity.x > 0)
        {
            let paddleCenter = paddle.y + (paddle.height / 2);
            let difference = this.y - paddleCenter;
            let angle = (this.maxAngle * difference) / (paddle.height * 0.5);
            angle *= (Math.PI / 180); // Convert to radians
            this.velocity.x = -Math.abs(this.maxSpeed * Math.cos(angle));
            this.velocity.y = this.maxSpeed * Math.sin(angle)
        }
    }
}
