class Paddle {
    constructor () {
        this.x = 0.05 * getWidth();
        this.height = 0.2 * getHeight();
        this.width = 0.015 * getWidth();
        this.y = (0.5 * getHeight()) - (this.height / 2);
        this.speed = 0.5;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp(deltaTime) {
        if (this.y > 0) {
            this.y -= this.speed * deltaTime;
        }
    }

    moveDown(deltaTime) {
        if (this.y + this.height < getHeight()) {
            this.y += this.speed * deltaTime;
        }
    }
}
