function game() {
    var content = $("<div/>").attr("id", "content").appendTo("body");
    $("<div/>").attr("id", "game").appendTo("#content");
    $("<div/>").attr("id", "ball").appendTo("#game");
    $("<div/>").attr("id", "pA").appendTo("#game");
    $("<div/>").attr("id", "pB").appendTo("#game");

    var pauseBall = false;

    var ball = {
        speed: 3,
        x: 290,
        y: 140,
        directionX: 1,
        directionY: 1,
        width: $("#ball").width(),
        height: $("#ball").height()
    };

    var pA = {
        speed: 3,
        x1: $("#pA").position().left,
        x2: $("#pA").position().left + $("#pA").width(),
        y1: $("#pA").position().top,
        y2: $("#pA").position().top + $("#pA").height(),
        update: function () {
            this.y1 = $("#pA").position().top;
            this.y2 = this.y1 + $("#pA").position().top;
        }
    };

    var pB = {
        speed: 3,
        x1: $("#pB").position().left,
        x2: $("#pB").position().left + $("#pB").width(),
        y1: $("#pB").position().top,
        y2: $("#pB").position().top + $("#pB").height(),
        update: function () {
            this.y1 = $("#pB").position().top;
            this.y2 = this.y1 + $("#pB").position().top;
        }
    }


    function moveBall() {
        var gameWidth = parseInt($("#game", ).width());
        var gameHeight = parseInt($("#game", ).height());

        if (pauseBall) return;

        if (ball.y + ball.speed * ball.directionY + ball.height > gameHeight) {
            ball.directionY = -1
        }
        if (ball.y + ball.speed * ball.directionY < 0) {
            ball.directionY = 1
        }
        if (ball.x + ball.speed * ball.directionX + ball.width > gameWidth - parseInt($("#ball").width())) {
            ball.directionX = -1
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;
            $("#ball").animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
        }
        if (ball.x + ball.speed * ball.directionX < 0) {
            ball.directionX = 1
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;
            $("#ball").animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
        }
        // left paddle
        if (ball.x + ball.speed * ball.directionX < pA.x2) {
            if (ball.y + ball.speed * ball.directionY > pA.y1 &&
                ball.y + ball.speed * ball.directionY < pA.y2) {
                ball.directionX = 1
            }
        }

        // right paddle
        if (ball.x + ball.speed * ball.directionX + $("#ball").width() > pB.x1) {
            if (ball.y + ball.speed * ball.directionY > pB.y1 &&
                ball.y + ball.speed * ball.directionY < pB.y2) {
                ball.directionX = -1
            }
        }

        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;

        $("#ball").css({ "left": ball.x, "top": ball.y });
    }

    var directions = {};
    var speed = 4;

    function charMovement(e) {
        directions[e.which] = true;
        console.log(directions);
    }

    function stop(e) {
        delete directions[e.which];
        console.log(directions);
    }

    $('html').keyup(stop).keydown(charMovement);

    function movePaddleA() {
        for (var i in directions) {
            if (pA.y1 > 0 && i == 87) {
                $("#pA").css("top", (pA.y1 - speed) + "px");
            }

            if (pA.y1 < $("#game").height() && i == 83) {
                $("#pA").css("top", (pA.y1 + speed) + "px");
            }
        }
        pA.update();
    }


    function movePaddleB() {
        for (var i in directions) {
            if (pB.y1 > 0 && i == 38) {
                $("pB").css("top", (pB.y1 - speed) + "px");
            }

            if (pB.y1 < $("#game").height() && i == 40) {
                $("pB").css("top", (pB.y1 + speed) + "px");
            }
        }
        pB.update();
    }


    setInterval(gameLoop, 1000 / 60);
    function gameLoop() {
        moveBall();
        movePaddleA();
        movePaddleB();

    }
}