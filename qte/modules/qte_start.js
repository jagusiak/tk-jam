window.SJ.module('qte_start', function (sj) {

    return {
        'init': function () {
            var canvas,
                scene, background, frame = 0,
                animation, guy,
                letters = sj.letters, letter, letterObjects = [],
                listener,
                generator, generated;

            canvas = sj.canvas;
            canvas.init();

            generator = sj.qte_generator;
            generated = generator.next();

            listener = sj.listener;

            scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));

            for (var i = 0; i < 1; i++) {
                var letterObj = scene.createObject('a');
                letterObjects['a'] = letterObj;
                letters.set(letterObj, i, i, i);
            }

            background = scene.getObject('background');
            guy = scene.getObject('guy');

            animation = sj.animation.create(guy);
            animation.setStep(4);

            for (var i = 0; i < 6; i++) {
                animation.addFrame(guy.texture, i / 6, 0, (i + 1) / 6, 1);
            }

            scene.onFrame = function () {
                frame++;

                background.setTexture(
                    background.texture,
                    background.textureLeft + 0.1,
                    background.textureTop,
                    background.textureRight + 0.1,
                    background.textureBottom);
                animation.play();

                for (var obj in letterObjects) {
                    letters.state(letterObjects[obj], letters.STATE_CORRECT);
                }

                if (frame % 30) {
                    listener.clear();
                    generated = generator.next();
                }
            };

            sj.input.onKeyDown(function(key) {
                listener.down(String.fromCharCode(key).toLowerCase(), frame);
            });

            sj.input.onKeyUp(function(key) {
                listener.up(String.fromCharCode(key).toLowerCase(), frame);
            });

            canvas.start();
            canvas.loadScene('scene_1');
        }
    };

});
