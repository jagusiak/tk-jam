window.SJ.module('qte_generator', function (sj) {
    return {
        'next': function () {
            var types = [sj.single, sj.pair, sj.choice, sj.sequence, sj.triple],
                random = types[types.length * Math.random() << 0];

            return random.next();
        }
    };
});
