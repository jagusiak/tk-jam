window.SJ.module('choice', function (sj) {
    return {
        'next': function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random,
                a = r.get(), b = r.get();

            while (b === a) {
                b = r.get();
            }

            return {
                type: sj.arrows.TYPE_CHOICE,
                keys: [
                    a, b
                ],
                points: 1
            };
        }
    };
});
