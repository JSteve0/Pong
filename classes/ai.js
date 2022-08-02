class AI {
    constructor () {
        this.height = 0.15 * getHeight();
        this.width = 0.01 * getWidth();
        this.x = getWidth() - (0.05 * getWidth()) - this.width;
        this.y = (0.5 * getHeight()) - (this.height / 2);
        this.speed = getHeight() * 0.0005;
        this.score = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(deltaTime, ball) {
        let centerY = this.y + (this.height / 2);
        if (ball.x > getWidth() / 2) {
            if (ball.y > centerY) {
                this.moveDown(deltaTime);
            } else if (ball.y < centerY) {
                this.moveUp(deltaTime);
            }
        } else {
            if (centerY > getHeight() / 2) {
                this.moveUp(deltaTime);
            } else if (centerY < getHeight() / 2) {
                this.moveDown(deltaTime);
            }
        }
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
