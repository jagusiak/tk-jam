window.SJ.module('numbers', function (sj) {
    return {
        'init': function (scene) {
            var tenth = scene.createObject('tenth'), unit = scene.createObject('unit');

            tenth.setTexture(
                sj.texture.get('numbers'),
                0,
                0,
                1,
                1
            );
            tenth.setDimension(0.09, 0.09);
            tenth.setPosition(1.25, 0.10, sj.letters.BASE_Z);
            tenth.setVisible(false);

            unit.setTexture(
                sj.texture.get('numbers'),
                0,
                0,
                1,
                1
            );
            unit.setDimension(0.09, 0.09);
            unit.setPosition(1.25, 0.10, sj.letters.BASE_Z);
            unit.setVisible(false);

            return {
                tenth: tenth,
                unit: unit
            };
        },
        'set': function (tenth, unit, number) {
            sj.texture.load('numbers');

            if (10 <= number) {
                var tens = Math.floor(number / 10);

                tenth.setTexture(
                    sj.texture.get('numbers'),
                    tens * 0.1,
                    0,
                    tens * 0.1 + 0.1,
                    1
                );
                tenth.setDimension(0.09, 0.09);
                tenth.setPosition(1.25, 0.10, sj.letters.BASE_Z);
                tenth.setVisible(true);
            } else {
                tenth.setVisible(false);
            }

            var unt = number % 10;
            unit.setTexture(
                sj.texture.get('numbers'),
                unt * 0.1,
                0,
                unt * 0.1 + 0.1,
                1
            );
            unit.setDimension(0.09, 0.09);
            unit.setPosition(1.3, 0.10, sj.letters.BASE_Z);
            unit.setVisible(true);
        }
    };
});
