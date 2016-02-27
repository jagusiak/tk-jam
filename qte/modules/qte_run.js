window.SJ.module('qte_run', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas,
                scene, generator = sj.qte_generator,
                keys,
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

                console.log(generator.next());

                for (var i in keys) {
                    keyObjects[keys[i]].setVisible((Math.floor(frameCounter/200) % 3) == i);
                }
            };

            sj.input.onKeyDown(function(key) {
                var code = String.fromCharCode(key).toLowerCase(), object = keyObjects[code];
                if (object && !pressed[code]) {
                    object.setDimension(object.width, object.height/2);
                    object.setPosition(object.x, object.y+object.height/2, object.z);
                    pressed[code] = true;
                }
            });

            sj.input.onKeyUp(function(key) {
                var code = String.fromCharCode(key).toLowerCase(), object = keyObjects[code];
                if (object) {
                    object.setPosition(object.x, object.y-object.height/2, object.z);
                    object.setDimension(object.width, object.height*2);
                    pressed[code] = false;
                }
            });

            canvas.start();
            canvas.loadScene('scene_1');
        }
    };

});
