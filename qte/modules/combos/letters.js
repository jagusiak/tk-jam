window.SJ.module('letters', function (sj) {

    return {
        STATE_IDLE: 0,
        STATE_CORRECT: 1,
        STATE_INCORRECT: 2,

        POS_TOP: 0,
        POS_MIDDLE: 1,
        POS_BOTTOM: 2,

        POS_OFFSET: 0.10,

        BASE_X: 0.75,
        BASE_Y: 0.75,

        DIVIDER: 0.33,

        'init': function (scene) {
            var objects = {}, iterator = 0;
            for (var i in sj.config('keys', 'keys')) {
                var obj = scene.createObject(i);

                objects[i] = obj;
                sj.letters.set(obj, iterator++, sj.letters.STATE_IDLE, 0);
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
