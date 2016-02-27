window.SJ.module('sequence', function(sj) {
    return {
        'next' : function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random,
                a = r.get(), b = r.get();

            while(b === a) {
                b = r.get();
            }

            return {
                type: 'sequence',
                keys: [
                    a, b
                ]
            };
        }
    };
});
