(function () {
    var canvas;
    var ctx;

    var ballX = 200;
    var ballY = 10;
    var ballSpeedX = 10;
    var ballSpeedY = 5;

    var paddle1X = 5;
    var paddle1Y = 250;
    var paddle2X;
    var paddle2Y = 250;

    var player1Score = 0;
    var player2Score = 0;
    var winGame = 4;
    var winScreen = false;

    const PADDLE_HEIGHT = 100;
    const PADDLE_WIDTH = 20;
    const PADDLE_THICKNESS = 20;

    window.onload = function () {
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');

        handleFrame();

        canvas.addEventListener('mousedown', handleMouseClick);

        canvas.addEventListener('mousemove', function (evt) {
            var mousePos = calcMousePos(evt);
            paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;

        });
    };

    function handleFrame() {
        window.requestAnimationFrame(handleFrame);

        moveEverything();
        drawEverything();
    }

    function handleMouseClick(evt) {
        if (winScreen) {
            player1Score = 0;
            player2Score = 0;
            winScreen = false;
        }
    }

    function calcMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;

        return {
            x: mouseX,
            y: mouseY
        };
    }

    function computerMovement() {

        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);

        if (paddle2YCenter < ballY - 8) {
            paddle2Y += 6;
        } else if (paddle2YCenter > ballY + 8) {
            paddle2Y -= 6;
        }
    }


    function moveEverything() {

        computerMovement();


        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballX > canvas.width) {

            if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY * 0.33;
            } else {
                player1Score++;
                ballReset();
            }
        }
        if (ballX < 0) {

            if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY * 0.33;
            } else {
                player2Score++;
                ballReset();
            }

        }

        if (ballY > canvas.height) {
            ballSpeedY = -ballSpeedY;
        }
        if (ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }
    }

    function ballReset() {

        if (player1Score == winGame || player2Score == winGame) {
            winScreen = true;
        }

        ballSpeedX = -ballSpeedX;
        ballSpeedY = 8;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }

    function drawEverything() {
        colorRect(0, 0, canvas.width, canvas.height, 'black');

        colorRect(PADDLE_WIDTH, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
        colorRect(canvas.width - PADDLE_WIDTH * 2, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
        colorBall(ballX, ballY, 10, true, 'white');

        ctx.fillText(player1Score, 100, 100);
        ctx.fillText(player2Score, canvas.width - 100, 100);
    };

    function colorRect(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    };

    function colorBall(x, y, radius, bool, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, radius, 0, 2 * Math.PI, bool);
        ctx.closePath();
        ctx.fill();
    };
})();