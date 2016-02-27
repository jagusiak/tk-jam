window.SJ.module('qte_game', function(sj) {
    var canvas, scene, currentLocation = 0, canvasWidth = 1.5, speed = 0.02, runAnimation, jumpAnimation,
    loadAnimations = function() {
        var guy = scene.getObject('guy'), texture = sj.texture.get("jump");
        runAnimation = sj.animation.create(guy);
        jumpAnimation = sj.animation.create(guy);
        jumpAnimation.setStep(2);

        for (var i = 0; i < 6; i++) {
            runAnimation.addFrame(guy.texture, i/6, 0, (i+1)/6, 1);
        }
        for (i = 0; i < 4; i++) {
            jumpAnimation.addFrame(texture, i/6, 0, (i+1)/6, 1);
        }
    },
    run = function() {
        var background, obstacle, obstaclePosition;
        canvas = sj.canvas;
        canvas.init();
        scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));
        background = scene.getObject('background');
        obstacle = scene.getObject('zoltamorda');
        obstaclePosition = -1;
        obstacle.setPosition(obstaclePosition, background.y, background.z);

        loadAnimations();

        scene.onFrame = function() {
            background.setPosition(currentLocation - Math.floor(currentLocation/1.5)*1.5,background.y, background.z);
            jumpAnimation.play();
            if (obstacle.x > 0.2 && obstacle.x < 0.7) {
                speed = 0.05;
                jumpAnimation.setStep(1);
            } else {
                speed = 0.02;
                jumpAnimation.setStep(2);
            }
            currentLocation += speed;
            obstacle.setPosition(obstacle.x + speed, obstacle.y, obstacle.z);
        };

        canvas.start();
        canvas.loadScene('scene_1');
    };


    return {
        'init' : run
    };

});
