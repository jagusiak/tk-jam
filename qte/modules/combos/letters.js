window.SJ.module('letters', function (sj) {

    return {
        STATE_IDLE: 0,
        STATE_CORRECT: 1,
        STATE_INCORRECT: 2,

        KEY_A: 0, KEY_B: 1, KEY_C: 2,
        KEY_D: 3, KEY_E: 4, KEY_F: 5,
        KEY_G: 7, KEY_H: 8, KEY_I: 9,
        KEY_J: 10, KEY_K: 11, KEY_L: 12,
        KEY_M: 13, KEY_N: 14, KEY_O: 15,
        KEY_P: 16, KEY_R: 17, KEY_S: 18,
        KEY_T: 19, KEY_U: 20, KEY_W: 21,
        KEY_X: 22, KEY_Y: 23, KEY_Z: 24,

        POS_TOP: 0,
        POS_MIDDLE: 1,
        POS_BOTTOM: 2,

        POS_OFFSET: 0.10,

        BASE_X: 0.75,
        BASE_Y: 0.75,

        DIVIDER: 0.33,

        'init': function () {

        },
        'set': function (object, letter, state, position) {
            var letters, left = state * sj.letters.DIVIDER, top = letter * sj.letters.DIVIDER;

            sj.texture.load('letters');

            object.setTexture(
                sj.texture.get('letters'),
                left,
                top,
                left + sj.letters.DIVIDER,
                top + sj.letters.DIVIDER);
            object.setDimension(0.09, 0.09);
            object.setPosition(0.75, 0.728 + position * sj.letters.POS_OFFSET, 10);
            object.setVisible(true);
        },
        'position': function (object, position) {
            object.setPosition(object.x, position * sj.letters.POS_OFFSET, object.z);
        },
        'state': function (object, state) {
            var left = state * sj.letters.DIVIDER;

            console.log(left);

            object.setTexture(object.texture, left, object.textureTop, left + sj.letters.DIVIDER, object.textureBottom);

        }
    };

});
