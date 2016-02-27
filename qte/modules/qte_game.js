window.SJ.module('qte_game', function (sj) {
    var canvas, scene, currentLocation = 0, canvasWidth = 1.5, speed = 0.02, runAnimation, jumpAnimation,
        loadAnimations = function () {
            var guy = scene.getObject('guy');
            runAnimation = sj.animation.create(guy);
            jumpAnimation = sj.animation.create(guy);
            jumpAnimation.setStep(5);
            jumpAnimation.setLooped(false);

            for (var i = 0; i < 6; i++) {
                runAnimation.addFrame(guy.texture, i / 11, 0, (i + 1) / 11, 1);
            }
            for (i = 6; i < 10; i++) {
                jumpAnimation.addFrame(guy.texture, i / 11, 0, (i + 1) / 11, 1);
            }
        },
        run = function () {
            var background, obstacle, obstaclePosition, currentAnimation,
                frame = 0,
                letters = sj.letters, letter, letterObjects = [],
                listener,
                generator, generated;
            canvas = sj.canvas;
            canvas.init();
            scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));
            background = scene.getObject('background');
            obstacle = scene.getObject('tree');
            obstaclePosition = -1;


            obstacle.setPosition(obstaclePosition, obstacle.y, obstacle.z);

            generator = sj.qte_generator;
            generated = generator.next();

            listener = sj.listener;

            for (var i = 0; i < 1; i++) {
                var letterObj = scene.createObject('a');
                letterObjects['a'] = letterObj;
                letters.set(letterObj, i, i, i);
            }

            loadAnimations();

            currentAnimation = runAnimation;

            scene.onFrame = function () {
                frame++;

                background.setPosition(currentLocation - Math.floor(currentLocation / 1.5) * 1.5, background.y, background.z);
                currentAnimation.play();
                if (currentAnimation.hasStopped()) {
                    currentAnimation = runAnimation;
                }
                if (obstacle.x > 0.2 && obstacle.x < 0.5) {
                    speed = 0.05;
                    runAnimation.setStep(1);
                } else {
                    if (speed > 0.02) {
                        currentAnimation = jumpAnimation;
                        jumpAnimation.setCurrentFrame(0);
                        console.log("jump");
                    }
                    speed = 0.02;
                    runAnimation.setStep(2);
                }
                currentLocation += speed;
                obstacle.setPosition(obstacle.x + speed, obstacle.y, obstacle.z);

                if (obstacle.x > 1.8) {
                    obstacle.setPosition(-0.5, obstacle.y, obstacle.z);
                }

                for (var obj in letterObjects) {
                    letters.state(letterObjects[obj], listener.partial('a'));
                }

                if (frame % 30 === 0) {
                    listener.clear();
                    generated = generator.next();
                }
            };

            sj.input.onKeyDown(function (key) {
                listener.down(String.fromCharCode(key).toLowerCase(), frame);
            });

            sj.input.onKeyUp(function (key) {
                listener.up(String.fromCharCode(key).toLowerCase(), frame);
            });

            canvas.start();
            canvas.loadScene('scene_1');
        };


    return {
        'init': run
    };

});
