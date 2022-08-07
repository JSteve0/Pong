class Paddle {
    constructor () {
        this.height = 0.15 * getHeight();
        this.width = 0.01 * getWidth();
        this.x = 0.05 * getWidth();
        this.y = (0.5 * getHeight()) - (this.height / 2);
        this.speed = getHeight() * 0.0005;
        this.score = 0;
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

    reset() {
        this.height = 0.15 * getHeight();
        this.width = 0.01 * getWidth();
        this.x = 0.05 * getWidth();
        this.y = (0.5 * getHeight()) - (this.height / 2);
        this.speed = getHeight() * 0.0005;
    }

}
