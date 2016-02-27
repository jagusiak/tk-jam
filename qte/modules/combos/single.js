window.SJ.module('single', function(sj) {
    return {
        'next' : function () {
            var keys = sj.config('keys', 'keys');
            return [
                keys[keys.length * Math.random() << 0]
            ];
        }
    };
});
