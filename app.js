let lastRender = 0;

var pong = {
    canvas : document.createElement("canvas"),
    frameCount : 0,
    start : function() {
        this.canvas.width = getWidth();
        this.canvas.height = getHeight();
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.ball = new Ball(getWidth() / 2, getHeight() / 2, 25);
        this.paddle = new Paddle();
        this.keys = []
        window.requestAnimationFrame(gameLoop);
    }
}

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastRender;

    update(deltaTime);
    draw();
    processKeys(deltaTime);

    lastRender = timestamp;
    window.requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    pong.ball.update(deltaTime);
}

function draw() {
    background('black');

    //Draw Center Line
    pong.ctx.beginPath();
    pong.ctx.lineWidth = 1;
    pong.ctx.strokeStyle = 'white';
    pong.ctx.moveTo(getWidth() / 2, 0);
    pong.ctx.lineTo(getWidth() / 2, getHeight());
    pong.ctx.stroke();

    pong.ball.draw(pong.ctx);

    pong.paddle.draw(pong.ctx);
}

function processKeys(deltaTime) {
    if (pong.keys["w"] || pong.keys["ArrowUp"]) {
        pong.paddle.moveUp(deltaTime);
    }
    if (pong.keys["s"] || pong.keys["ArrowDown"]) {
        pong.paddle.moveDown(deltaTime);
    }
}

function background(color) {
    pong.ctx.fillStyle = color;
    pong.ctx.fillRect(0, 0, getWidth(), getHeight());
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

function resizeCanvas() {
    pong.canvas.width = window.innerWidth;
    pong.canvas.height = window.innerHeight;
}

// Event handler to resize the canvas when the document view is changed
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('keydown', (event) => {
    pong.keys[event.key] = true;
});
window.addEventListener('keyup', (event) => {
    pong.keys[event.key] = false;
});