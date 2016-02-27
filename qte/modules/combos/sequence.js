window.SJ.module('sequence', function(sj) {
    return {
        'next' : function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random,
                a = r.get(), b = r.get(), c = r.get();

            while(b === a) {
                b = r.get();
            }

            while(c === a || c === b) {
                c = r.get();
            }

            return {
                type: sj.arrows.TYPE_SEQUENCE,
                keys: [
                    a, b, c
                ],
                points: 4
            };
        }
    };
});
