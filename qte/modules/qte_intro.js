window.SJ.module('qte_intro', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas, scene, animation, object, frame = 0;



            canvas.init();

            scene = canvas.createScene('welcome', sj.config('scenes', 'welcome'));
            object = scene.getObject('guy');

            animation = sj.animation.create(object);

            for (var i = 0; i < 6; i++) {
                animation.addFrame(object.texture, i / 11, 0, (i + 1) / 11, 1);
            }

            scene.onFrame = function () {
                frame++;
                scene.getObject("any_key").setVisible(Math.floor(frame/10) % 2);

                animation.play();
            };

            canvas.start();
            canvas.loadScene('welcome');
        }
    };

});
