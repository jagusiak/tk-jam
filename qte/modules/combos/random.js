window.SJ.module('random', function(sj) {
    return {
        'get' : function () {
            var keys = sj.config('keys', 'keys'),
                distrib = {},
                rand, selected,
                sum = 0;

            for (var i in keys) {
                sum += parseFloat(keys[i]);
                distrib[i] = sum;
            }

            rand = Math.random() * sum;

            for (var j in distrib) {
                if (distrib[j] >= rand) {
                    return j;
                }
            }
        }
    };
});
