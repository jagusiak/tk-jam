window.SJ.module('qte_generator', function(sj) {
    return {
        'next' : function() {
            var types = [sj.single, sj.pair, sj.choice, sj.sequence];
            return types[types.length * Math.random() << 0]
        }
    };

});
