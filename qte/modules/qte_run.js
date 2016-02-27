window.SJ.module('qte_run', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas,
                scene, generator = sj.qte_generator, generated = generator.next(),
                keys, listener = sj.listener,
                keyObjects = {},
                pressed = {},
                frameCounter = 0;

            canvas.init();
            scene = canvas.createScene('scene_1', sj.config('scenes', 'keys'));

            for (var i in keys) {
                var keyName = keys[i];
                keyObjects[keyName] = scene.getObject('key_' + keyName);
            }

            scene.onFrame = function () {
                frameCounter++;

                for (var i in keys) {
                    keyObjects[keys[i]].setVisible(true);
                }

                if(frameCounter % 30 === 0){
                    console.log(listener.check(generated));
                    listener.clear();

                    generated = generator.next();
                    console.log('Type: ' + generated.type + ' | Setting: ' + generated.keys);
                }
            };

            sj.input.onKeyDown(function(key) {
                listener.down(String.fromCharCode(key).toLowerCase(), frameCounter);
            });

            sj.input.onKeyUp(function(key) {
                listener.up(String.fromCharCode(key).toLowerCase(), frameCounter);
            });

            canvas.start();
            canvas.loadScene('scene_1');
        }
    };

});
