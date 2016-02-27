window.SJ.module('single', function(sj) {
    return {
        'next' : function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random;
            return {
                type: sj.arrows.TYPE_SINGLE,
                keys: [
                    r.get()
                ],
                points: 1
            };
        }
    };
});
