const INTRO = 0;
const PLAYING = 1;
const OUTRO = 2;
const PAUSE = 3;

const pong = {
    canvas: document.createElement("canvas"),
    frameCount: 0,
    totalTime: 1,
    frameRate: 60,
    deltaTime: 0,
    lastRenderTime: 0,
    gameState: INTRO,
    start: function () {
        this.canvas.width = getWidth();
        this.canvas.height = getHeight();
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.ball = new Ball();
        this.player = new Paddle();
        this.ai = new AI();
        this.keys = [];
        this.backgroundMusic = new Sound("./sounds/arcadeMusic.mp3");


        this.button = createButton('Play', 0, (getHeight() * 0.3));
        this.button.height = function () { return getHeight() * 0.3 }
        this.button.width = function () { return (pong.button.offsetWidth / 2) }
        this.button.style.left = (getWidth() / 2) - pong.button.width() + "px";
        this.button.style.animationDuration = '0s';
        this.button.onclick = function () {
            pong.gameState = PLAYING;
        }
        this.button.onmouseover = function () {
            pong.button.style.animationDuration = '0.5s';
        }
        this.button.reset = function () {
            pong.button.style.top = pong.button.height() + "px";
            pong.button.style.left = (getWidth() / 2) - pong.button.width() + "px";
        }

        this.githubLink = document.createElement("a");
        this.githubLink.innerHTML = "Author: Justin Stevens";
        this.githubLink.classList.add('link');
        this.githubLink.style.top = getHeight() - 24 + "px";
        this.githubLink.href = 'https://github.com/JSteve0'
        this.githubLink.target = '_blank';
        document.body.appendChild(this.githubLink);
        this.githubLink.reset = function () { pong.githubLink.style.top = getHeight() - 24 + "px"; }

        window.requestAnimationFrame(gameLoop);
    }
};

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
        pong.button.style.display = 'block';
    } else if (pong.gameState === PLAYING) {
        pong.button.style.display = 'none';
        pong.ball.update(deltaTime, pong.player, pong.ai);
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

    pong.ctx.fillStyle = 'white';

    pong.ctx.font = "20px Arial"

    let frameRateTxt = pong.frameRate.toFixed(1).toString();

    pong.ctx.textAlign = 'right';
    pong.ctx.fillText(frameRateTxt, getWidth() - 8, 20);
    pong.ctx.textAlign = 'left';

    if (pong.gameState === INTRO) {
        pong.ctx.fillText("INTRO", 8 , 20);
    } else if (pong.gameState === PLAYING) {
        pong.ctx.fillText("PLAYING", 8, 20);

        //Draw Center Line
        pong.ctx.beginPath();
        pong.ctx.lineWidth = 1;
        pong.ctx.strokeStyle = 'white';
        pong.ctx.moveTo(getWidth() / 2, 0);
        pong.ctx.lineTo(getWidth() / 2, getHeight());
        pong.ctx.stroke();

        //Draw Score
        pong.ctx.font = "100px Arial";
        pong.ctx.textAlign = 'right';
        pong.ctx.fillText(pong.player.score.toString(), (getWidth() / 2) - 8, 85);
        pong.ctx.textAlign = 'left';
        pong.ctx.fillText(pong.ai.score.toString(), (getWidth() / 2) + 8, 85);

        pong.ball.draw(pong.ctx);
        pong.player.draw(pong.ctx);
        pong.ai.draw(pong.ctx);
    } else if (pong.gameState === OUTRO) {
        pong.ctx.fillText("OUTRO", 8, 20);
    } else if (pong.gameState === PAUSE) {
        pong.ctx.fillText("PAUSE", 8, 20);
    }
}

function textWidth(text) {
    return pong.ctx.measureText(text).width;
}

function processKeys(deltaTime) {
    if (pong.keys["1"]) {
        pong.gameState = INTRO;
    }
    if (pong.keys["2"]) {
        pong.gameState = PLAYING;
    }
    if (pong.keys["3"]) {
        pong.gameState = OUTRO;
    }
    if (pong.keys["4"]) {
        pong.gameState = PAUSE;
    }

    if (pong.gameState === INTRO) {
        if (pong.keys[" "]) {
            pong.gameState = PLAYING;
            pong.backgroundMusic.play();
        }
    } else if (pong.gameState === PLAYING) {
        if (pong.keys["w"] || pong.keys["ArrowUp"]) {
            pong.player.moveUp(deltaTime);
        }
        if (pong.keys["s"] || pong.keys["ArrowDown"]) {
            pong.player.moveDown(deltaTime);
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
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

function resizeCanvas() {
    pong.canvas.width = window.innerWidth;
    pong.canvas.height = window.innerHeight;
    resetScreen();
}

function createButton(text, x, y) {
    let button = document.createElement("button");
    button.innerHTML = text;
    button.style.position = 'absolute';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    document.body.appendChild(button);
    return button;
}

function createButtonComplex(text, x, y, width, height, color, onClick, style) {
    let button = document.createElement("button");
    button.innerHTML = text;
    button.style.position = 'absolute';
    button.style.left = x + "px";
    button.style.top = y + "px";
    button.style.width = width + "px";
    button.style.height = height + "px";
    button.onclick = onClick;
    document.body.appendChild(button);
    return button;
}

function resetScreen() {
    pong.ball.reset();
    pong.button.reset();
    pong.githubLink.reset();
    pong.player.reset();
    pong.ai.reset();
}

// Event handler to resize the canvas when the document view is changed
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('keydown', (event) => {
    pong.keys[event.key] = true;
});
window.addEventListener('keyup', (event) => {
    pong.keys[event.key] = false;
});
