window.SJ.module('arrows', function (sj) {
    return {
        TYPE_SINGLE: 0,
        TYPE_PAIR: 1,
        TYPE_TRIPLE: 2,
        TYPE_SEQUENCE: 3,
        TYPE_CHOICE: 4,

        'init': function (scene) {
            var arrows = scene.createObject('arrows');

            arrows.setTexture(
                sj.texture.get('arrows'),
                0,
                0,
                1,
                1
            );
            arrows.setDimension(0.09, 0.09);
            arrows.setPosition(0.75, 0.80, sj.letters.BASE_Z);
            arrows.setVisible(false);

            return arrows;
        },
        'set': function (arrows, type) {
            sj.texture.load('arrows');

            arrows.setTexture(
                sj.texture.get('arrows'),
                0.2 * type,
                0,
                0.2 * type + 0.2,
                0.33
            );
            arrows.setDimension(0.09, 0.09);
            arrows.setPosition(0.75, 0.80, sj.letters.BASE_Z);
            arrows.setVisible(true);
        }
    };
});
