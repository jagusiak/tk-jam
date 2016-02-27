window.SJ.module('numbers', function (sj) {
    return {
        'init': function (scene) {
            var objects = {};

            for (var i = 0; i < 10; i++) {
                var number = scene.createObject(i);

                objects[i] = number;
                sj.numbers.valueOf(number, i);
            }

            return objects;
        },
        'valueOf': function (object, number) {
            sj.texture.load('numbers');

            object.setTexture(
                sj.texture.get('numbers'),
                number * 0.1,
                0,
                number * 0.1 + 0.1,
                1
            );
            object.setDimension(0.09, 0.09);
            object.setPosition(1.3, 0.10, sj.letters.BASE_Z);
            object.setVisible(false);
        }
    };
});
