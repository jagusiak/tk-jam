window.SJ.module('listener', function (sj) {
    var memory = {};

    return {
        'down': function (key, time) {
            memory[key] = -1;
        },
        'up': function (key, time) {
            if (-1 === memory[key]) {
                memory[key] = time;
            }
        },
        'check': function (generated) {
            console.log('Checking: ' + generated.type);
            console.log('Sequence (' + generated.keys.length + '): ');
            console.log(generated.keys);

            var keys = generated.keys, length = keys.length, memlength = Object.keys(memory).length;

            console.log('Memory (' + '): ');
            console.log(memory);

            switch (generated.type) {
                case 'single':
                case 'pair':
                case 'triple':
                    return length === memlength && length === keys.filter(function (k) {
                            return memory.hasOwnProperty(k);
                        }).length;
                case 'choice':
                    return 1 < keys.length && 1 === memlength && 1 === keys.filter(function (k) {
                            return memory.hasOwnProperty(k);
                        }).length;
                case 'sequence':
                    var time = 0;

                    for (var k in keys) {
                        var next = memory[keys[k]];
                        if (time > next) {
                            return false;
                        }

                        time = next;
                    }

                    return memlength === length;
                default:
                    return false
            }
        },
        'clear': function () {
            memory = {};
        }
    };
});
