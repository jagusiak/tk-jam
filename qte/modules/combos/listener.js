window.SJ.module('listener', function (sj) {
    var memory = {};

    var internal_min = function (obj) {
        var local;

        for (var i in obj) {
            if (obj[i] !== -1) {
                if (undefined === local) {
                    local = obj[i];
                } else if (obj[i] != -1 && local > obj[i]) {
                    local = obj[i];
                }
            }
        }

        return local;
    };

    var internal_max = function (obj) {
        var local;

        for (var i in obj) {
            if (obj[i] !== -1) {
                if (undefined === local) {
                    local = obj[i];
                } else if (local < obj[i]) {
                    local = obj[i];
                }
            }
        }

        return local;
    };

    var internal_filter = function (func, obj) {
        var filtered = {};

        for (var i in obj) {
            if (func(i)) {
                filtered[i] = obj[i];
            }
        }

        return filtered;
    };

    return {
        'down': function (key, time) {
            memory[key] = -1;
        },
        'up': function (key, time) {
            if (undefined !== memory[key] && -1 === memory[key]) {
                memory[key] = time;
            }
        },
        'check': function (generated) {
            var keys = generated.keys, length = keys.length, memkeys = Object.keys(memory), memlength = memkeys.length;
            switch (generated.type) {
                case 'single':
                case 'pair':
                case 'triple':
                    var filtered = internal_filter(function (k) {
                        return keys.indexOf(k) != -1;
                    }, memory), min = internal_min(memory), max = internal_max(memory);

                    return memlength === length && length === Object.keys(filtered).length
                        && undefined !== min && undefined !== max
                        && 0 === Math.abs(max - min);
                case 'choice':
                    return 1 < length && 1 === memlength && 1 === Object.keys(internal_filter(function (k) {
                            return keys.indexOf(k) != -1;
                        }, memory)).length;
                case 'sequence':
                    var time = internal_min(internal_filter(function (o) {
                        return keys.indexOf(o) != -1;
                    }, memory));

                    for (var k in keys) {
                        var next = memory[keys[k]];
                        if (next === undefined || time > next) {
                            return false;
                        }

                        time = next;
                    }

                    return memlength === length;
                default:
                    return false
            }

            return false;
        },
        'clear': function () {
            memory = {};
        }
    };
});
