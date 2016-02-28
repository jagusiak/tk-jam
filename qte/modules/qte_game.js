window.SJ.module('qte_game', function (sj) {
    var canvas, scene, currentLocation = 0, canvasWidth = 1.5, speed = 0.02, speed_add = 0, runAnimation, jumpAnimation, slideAnimation, stinkAnimation,
        loadAnimations = function () {
            var guy = scene.getObject('guy'), stink = scene.getObject('stink');
            runAnimation = sj.animation.create(guy);
            jumpAnimation = sj.animation.create(guy);
            slideAnimation = sj.animation.create(guy);
            stinkAnimation = sj.animation.create(stink);
            jumpAnimation.setStep(4);
            jumpAnimation.setLooped(false);
            stinkAnimation.setStep(4);
            slideAnimation.setStep(7);
            slideAnimation.setLooped(false);


            for (var i = 0; i < 6; i++) {
                runAnimation.addFrame(guy.texture, i / 16, 0, (i + 1) / 16, 1);
            }
            for (i = 6; i < 10; i++) {
                jumpAnimation.addFrame(guy.texture, i / 16, 0, (i + 1) / 16, 1);
            }
            for (i = 11; i < 13; i++) {
                slideAnimation.addFrame(guy.texture, i / 16, 0, (i + 1) / 16, 1);
            }
            for (i = 0; i < 2; i++) {
                stinkAnimation.addFrame(stink.texture, i / 2, 0, (i + 1) / 2, 1);
            }
        },
        run = function () {
            var background, obstacle, currentAnimation, guy,
                frame = 0, phase_counter = 0,
                letters, letter, letterObjects = [],
                numbers, numberObjects = [],
                arrows, arrowObject, arrowAnimation,
                listener, blinking = false,
                generator, generated, progress, generateObstacle = true, obstacles = [],
                downObstacles = ['ob_0', 'ob_1', 'ob_2'], upObstacles = ['ob_3','ob_4', 'ob_5', 'ob_6'], j = 0, currentObstacle, done = false;
            canvas = sj.canvas;
            canvas.init();

            if (!scene) {
                scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));
            }
            background = scene.getObject('background');

            progress = scene.getObject("progress");
            guy = scene.getObject('guy');

            loadAnimations();

            sj.sound.load('soundtrack');
            sj.sound.get('soundtrack').play();

            for (var n in downObstacles) {
                obstacles[j] = scene.getObject(downObstacles[n]);
                obstacles[j]['animation'] = jumpAnimation;
                j++;
            }

            for (n in upObstacles) {
                obstacles[j] = scene.getObject(upObstacles[n]);
                obstacles[j]['animation'] = slideAnimation;
                j++;
            }

            numbers = sj.numbers;
            numberObjects = numbers.init(scene);

            generator = sj.qte_generator;
            generated = generator.next();

            letters = sj.letters;
            letterObjects = letters.init(scene);

            arrows = sj.arrows;
            arrowObject = arrows.init(scene);

            listener = sj.listener;
            currentAnimation = runAnimation;

            scene.onFrame = function () {
                var leftSeconds = 10 - Math.floor(frame / 25), select;
                frame++;

                progress.setTexture(progress.texture, 0, 0, leftSeconds / 10, 1);
                progress.setPosition(0.02 * leftSeconds + 0.03, 0.03, 10);
                progress.setDimension(0.04 * leftSeconds, 0.04);

                if (leftSeconds < 0) {
                    stinkAnimation.play();
                    scene.getObject("stink").setVisible(true);
                    scene.getObject("any_key").setVisible(true);
                    guy.setTexture(guy.texture, 14 / 16, 0, 15 / 16, 1);
                    sj.input.onKeyDown(function () {
                        frame = 0;
                        scene.getObject("stink").setVisible(false);
                        scene.getObject("any_key").setVisible(false);
                        generateObstacle = true;
                        for (var o in obstacles) {
                            obstacles[o].setVisible(false);
                        }
                        currentObstacle = undefined;
                        blinking = 0;
                        guy.setVisible(true);

                        sj.input.onKeyDown(function (key) {
                            listener.down(String.fromCharCode(key).toLowerCase(), frame);
                        });

                        sj.input.onKeyUp(function (key) {
                            listener.up(String.fromCharCode(key).toLowerCase(), frame);
                        });

                        listener.resetScore();

                        sj.numbers.set(numberObjects.tenth, numberObjects.unit, 0);
                        sj.sound.get('soundtrack').play();
                    });
                    return;
                }

                if (generateObstacle) {
                    select = Math.floor(Math.random() * obstacles.length);
                    while (obstacles[select].visible) {
                        select = Math.floor(Math.random() * obstacles.length);
                    }
                    var o = obstacles[select];
                    o.setPosition(frame < 5 ? -0.7 : -0.4, o.y, o.z);
                    o.setVisible(true);
                    generateObstacle = false;
                }

                if (frame - blinking < 0) {
                    guy.setVisible(frame % 2);
                } else {
                    guy.setVisible(true);
                }

                background.setPosition(currentLocation - Math.floor(currentLocation / 1.5) * 1.5, background.y, background.z);
                currentAnimation.play();
                if (currentAnimation.hasStopped()) {
                    currentAnimation = runAnimation;
                }


                currentLocation += speed;
                if (undefined !== arrowAnimation) {
                    arrowAnimation.play();
                }

                for (select in obstacles) {
                    var ob = obstacles[select];
                    if (ob.visible) {
                        ob.setPosition(ob.x + speed, ob.y, ob.z);
                        if (ob.x > 1.8) {
                            ob.setVisible(false);
                        }
                        if (ob.x > -0.5 && ob.x < 0.50 && !currentObstacle) {
                            currentObstacle = ob;
                            phase_counter = 0;

                            listener.clear();
                            generated = generator.next();

                            arrowAnimation = arrows.set(arrowObject, generated.type);

                            for (var obj in sj.config('keys', 'keys')) {
                                console.log(obj + " : " + generated.keys.join());
                                var ind = generated.keys.indexOf(obj), letter = letterObjects[obj];
                                if (ind != -1) {
                                    letters.position(letter, ind);

                                    letter.setVisible(true);
                                } else {
                                    letter.setVisible(false);
                                }
                            }
                            speed = 0.02;
                            done = false;


                        }
                        if (currentObstacle && currentObstacle.x > 0.50) {
                            generateObstacle = true;
                            if (done) {
                                currentAnimation = currentObstacle.animation;
                                currentAnimation.setCurrentFrame(0);
                            } else {
                                blinking = frame + 20;

                                // wyłącz
                            }
                            currentObstacle = undefined;
                            listener.clear();
                        }
                    }

                }

                if (done) {
                    speed = 0.06;
                }

                if (currentObstacle) {
                    for (var object in generated.keys) {
                        var ident = generated.keys[object], check = listener.check(generated, ident, numberObjects);

                        letters.state(letterObjects[ident], check);

                        if (sj.letters.STATE_CORRECT === check) {
                            done = true;
                            listener.clear();
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
