class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = {x: 0.5, y: 0.5};
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(deltaTime, paddle1, paddle2) {
        this.checkBounds();
        this.collides(paddle1);
        this.collides(paddle2);
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
    }

    checkBounds() {
        // Vertical bounds
        if ((this.y - this.radius < 0 && this.velocity.y < 0) ||
            (this.y + this.radius > getHeight() && this.velocity.y > 0)) {
            this.velocity.y = -this.velocity.y;
        }
        // Horizontal bounds
        else if ((this.x - this.radius < 0 && this.velocity.x < 0) || 
            (this.x + this.radius > getWidth() && this.velocity.x > 0)){
            this.velocity.x = -this.velocity.x;
        }
    }

    collides(paddle) {
        if (this.x - this.radius < paddle.x + paddle.width && 
            this.x - this.radius > paddle.x &&
            this.y + this.radius > paddle.y && 
            this.y - this.radius < paddle.y + paddle.height) 
        {
            this.velocity.x = -this.velocity.x;
        }
        if (this.x + this.radius < paddle.x + paddle.width && 
            this.x + this.radius > paddle.x &&
            this.y + this.radius > paddle.y && 
            this.y - this.radius < paddle.y + paddle.height) 
        {
            this.velocity.x = -this.velocity.x;
        }
    }
}
