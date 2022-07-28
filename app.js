const INTRO = 0;
const PLAYING = 1;
const OUTRO = 2;
const PAUSE = 3;

var pong = {
    canvas : document.createElement("canvas"),
    frameCount : 0,
    totalTime: 1,
    frameRate: 60,
    deltaTime : 0,
    lastRenderTime : 0,
    gameState : INTRO,
    start : function() {
        this.canvas.width = getWidth();
        this.canvas.height = getHeight();
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.ball = new Ball(getWidth() / 2, getHeight() / 2, 15);
        this.paddle = new Paddle();
        this.ai = new AI();
        this.keys = [];
        window.requestAnimationFrame(gameLoop);
    }
}

function gameLoop(timestamp) {
    pong.deltaTime = timestamp - pong.lastRenderTime;

    update(pong.deltaTime);
    draw();
    processKeys(pong.deltaTime);

    pong.totalTime += pong.deltaTime;
    pong.frameCount++;
    pong.lastRenderTime = timestamp;
    window.requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    if (pong.gameState === INTRO) {

    } else if (pong.gameState === PLAYING) {
        pong.ball.update(deltaTime, pong.paddle, pong.ai);
        pong.ai.update(deltaTime, pong.ball);
    } else if (pong.gameState === OUTRO) {

    } else if (pong.gameState === PAUSE) {

    }

    if (pong.frameCount % Math.ceil(pong.frameRate) === 0 && pong.frameCount !== 0) {
        pong.frameRate = pong.frameCount / (pong.totalTime / 1000);
    }

    if (pong.frameCount % Math.ceil(pong.frameRate * 4) === 0 && pong.frameCount !== 0) {
        pong.frameCount = 0;
        pong.totalTime = 0;
    }
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

    pong.ai.draw(pong.ctx);

    pong.ctx.font = "20px Arial"

    let frameRateTxt = pong.frameRate.toFixed(1).toString();

    pong.ctx.fillText(frameRateTxt, getWidth() - textWidth(frameRateTxt) - 5, 20);

    if (pong.gameState === INTRO) {
        pong.ctx.fillText("INTRO", 5, 20);

        let text = "Press Space To Start";
        pong.ctx.font = "50px Arial"
        pong.ctx.fillText(text, (getWidth() / 2) - (textWidth(text) / 2), getHeight() * 0.33);
    } else if (pong.gameState === PLAYING) {
        pong.ctx.fillText("PLAYING", 5, 20);
    } else if (pong.gameState === OUTRO) {
        pong.ctx.fillText("OUTRO", 5, 20);
    } else if (pong.gameState === PAUSE) {
        pong.ctx.fillText("PAUSE", 5, 20);
    }
}

function textWidth(text) {
    return pong.ctx.measureText(text).width;
}

function processKeys(deltaTime) {
    if (pong.gameState === INTRO) {
        if (pong.keys[" "]) {
            pong.gameState = PLAYING;
        }
    } else if (pong.gameState === PLAYING) {
        if (pong.keys["w"] || pong.keys["ArrowUp"]) {
            pong.paddle.moveUp(deltaTime);
        }
        if (pong.keys["s"] || pong.keys["ArrowDown"]) {
            pong.paddle.moveDown(deltaTime);
        }
    } else if (pong.gameState === OUTRO) {

    } else if (pong.gameState === PAUSE) {

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
