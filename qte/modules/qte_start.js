window.SJ.module('qte_start', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas,
                scene, background, animation, guy;

            canvas.init();
            scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));
            background = scene.getObject('background');
            guy = scene.getObject('guy');
            animation = sj.animation.create(guy);
            animation.setStep(1);
            for (var i = 0; i < 6; i++) {
                animation.addFrame(guy.texture, i/6, 0, (i+1)/6, 1);
            }

            scene.onFrame = function () {
                background.setTexture(background.texture, background.textureLeft + 0.2, background.textureTop, background.textureRight + 0.2, background.textureBottom);
                animation.play();
            };

            canvas.start();
            canvas.loadScene('scene_1');
        }
    };

});
