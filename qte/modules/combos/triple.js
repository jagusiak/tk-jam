window.SJ.module('triple', function(sj) {
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
                type: 'triple',
                keys: [
                    a, b, c
                ]
            }
        }
    };
});
