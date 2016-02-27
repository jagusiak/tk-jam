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
            arrows.setDimension(32 / 160, 35 / 105);
            arrows.setPosition(0.90, 0.83, sj.letters.BASE_Z);
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
            arrows.setDimension(32 / 160, 31 / 105);
            arrows.setPosition(0.90, 0.83, sj.letters.BASE_Z);
            arrows.setVisible(true);

            var animation = sj.animation.create(arrows);

            for (var j = 0; j < 3; j++) {
                animation.addFrame(arrows.texture, 0.2 * type, j / 3, 0.2 * type + 0.2, (j + 1) / 3);
            }

            return animation;
        }
    };
});
