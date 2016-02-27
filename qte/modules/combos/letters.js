window.SJ.module('letters', function (sj) {

    return {
        STATE_IDLE: 0,
        STATE_CORRECT: 1,
        STATE_INCORRECT: 2,

        KEYS: {
            KEY_A: 0, KEY_B: 1, KEY_C: 2,
            KEY_D: 3, KEY_E: 4, KEY_F: 5,
            KEY_G: 6, KEY_H: 7, KEY_I: 8,
            KEY_J: 9, KEY_K: 10, KEY_L: 11,
            KEY_M: 12, KEY_N: 13, KEY_O: 14,
            KEY_P: 15, KEY_R: 16, KEY_S: 17,
            KEY_T: 18, KEY_U: 19, KEY_W: 21,
            KEY_X: 21, KEY_Y: 22, KEY_Z: 23,
            KEY_V: 24, KEY_Q: 25,
        },

        POS_TOP: 0,
        POS_MIDDLE: 1,
        POS_BOTTOM: 2,

        POS_OFFSET: 0.10,

        BASE_X: 0.75,
        BASE_Y: 0.75,

        DIVIDER: 0.04,

        'init': function (scene) {
            var objects = {};

            for (var i in sj.letters.KEYS) {
                var obj = scene.createObject(i);

                objects[i] = obj;
                sj.letters.set(obj, i, sj.letters.STATE_IDLE, 0);
            }

            return objects;
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
