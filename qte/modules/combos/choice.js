window.SJ.module('choice', function(sj) {
    return {
        'next' : function () {
            var keys = sj.config('keys', 'keys');

            var a = keys[keys.length * Math.random() << 0];
            var b = keys[keys.length * Math.random() << 0];

            while(b === a) {
                b = keys[keys.length * Math.random() << 0];
            }

            return [
                a, b
            ];
        }
    };
});
