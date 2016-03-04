window.SJ.module('qte_intro', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas, scene, animation, object, frame = 0;

            canvas.init();

            scene = canvas.createScene('tutorial', sj.config('scenes', 'tutorial'));
            object = scene.getObject('guy');

            animation = sj.animation.create(object);

            for (var i = 0; i < 6; i++) {
                animation.addFrame(object.texture, i / 16, 0, (i + 1) / 16, 1);
            }

            scene.onFrame = function () {
                animation.play();
            };

            canvas.start();
            canvas.loadScene('tutorial');
        }
    };

});
