window.SJ.module('qte_game', function (sj) {
    var canvas, scene, currentLocation = 0, canvasWidth = 1.5, speed = 0.02, runAnimation, jumpAnimation, slideAnimation, stinkAnimation,
        loadAnimations = function () {
            var guy = scene.getObject('guy'), stink = scene.getObject('stink');
            runAnimation = sj.animation.create(guy);
            jumpAnimation = sj.animation.create(guy);
            slideAnimation = sj.animation.create(guy);
            stinkAnimation = sj.animation.create(stink);
            jumpAnimation.setStep(5);
            jumpAnimation.setLooped(false);
            stinkAnimation.setStep(4);
            slideAnimation.setStep(5);
            slideAnimation.setLooped(false);
            slideAnimation = sj.animation.create(guy);

            for (var i = 0; i < 6; i++) {
                runAnimation.addFrame(guy.texture, i / 14, 0, (i + 1) / 14, 1);
            }
            for (i = 6; i < 10; i++) {
                jumpAnimation.addFrame(guy.texture, i / 14, 0, (i + 1) / 14, 1);
            }
			for (i = 11; i < 13; i++) {
                slideAnimation.addFrame(guy.texture, i / 14, 0, (i + 1) / 14, 1);
            }
            for (i = 0; i < 2; i++) {
                stinkAnimation.addFrame(stink.texture, i / 2, 0, (i + 1) / 2, 1);
            }
        },
        run = function () {
            var background, obstacle, currentAnimation, guy,
                frame = 0,
                letters, letter, letterObjects = [],
                listener,
                generator, generated, progress;
            canvas = sj.canvas;
            canvas.init();
            scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));
            background = scene.getObject('background');
            obstacle = scene.getObject('tree');
            obstacle.setPosition(-1, obstacle.y, obstacle.z);
            progress = scene.getObject("progress");
            guy = scene.getObject('guy');

            generator = sj.qte_generator;
            generated = generator.next();

            letters = sj.letters;
            letterObjects = letters.init(scene);

            listener = sj.listener;

            loadAnimations();

            currentAnimation = runAnimation;

            scene.onFrame = function () {
                var leftSeconds = 10 - Math.floor(frame/25);
                frame++;
                progress.setTexture(progress.texture, 0, 0, leftSeconds/10,1);
                progress.setPosition(0.02*leftSeconds + 0.03, 0.03, 10);
                progress.setDimension(0.04*leftSeconds, 0.04);

                if (leftSeconds < 0) {
                    stinkAnimation.play();
                    scene.getObject("stink").setVisible(true);
                    guy.setTexture(guy.texture, 13/14, 0, 1, 1);
                    return;
                }


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
                        currentAnimation.setCurrentFrame(0);
                    }
                    speed = 0.02;
                    runAnimation.setStep(2);
                }
                currentLocation += speed;
                obstacle.setPosition(obstacle.x + speed, obstacle.y, obstacle.z);

                if (obstacle.x > 1.8) {
                    obstacle.setPosition(-0.5, obstacle.y, obstacle.z);
                }

                for (var obj in generated.keys) {
                    var ident = generated.keys[obj];
                    letters.state(letterObjects[ident], listener.partial(generated, ident));
                }

                if (frame % 60 === 0) {
                    listener.clear();
                    generated = generator.next();

                    for (var obj in sj.config('keys', 'keys')) {
                        var ind = generated.keys.indexOf(obj), letter = letterObjects[obj];
                        if (ind != -1) {
                            letters.position(letter, ind);

                            letter.setVisible(true);
                        } else {
                            letter.setVisible(false);
                        }
                    }
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
