window.SJ.module('listener', function (sj) {
    var memory = {}, score = 0, tryout;

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

    var internal_check = function (generated, letter) {
        var keys = generated.keys, length = keys.length, memkeys = Object.keys(memory), memlength = memkeys.length;
        switch (generated.type) {
            case sj.arrows.TYPE_SINGLE:
            case sj.arrows.TYPE_PAIR:
            case sj.arrows.TYPE_TRIPLE:
                var filtered = internal_filter(function (k) {
                        return keys.indexOf(k) != -1;
                    }, memory), min = internal_min(memory), max = internal_max(memory),
                    fillkeys = Object.keys(filtered), fillen = fillkeys.length;

                if (0 >= memlength) {
                    return sj.letters.STATE_IDLE;
                } else if (memlength !== fillen || 1 < Math.abs(max - min)) {
                    return sj.letters.STATE_INCORRECT;
                } else if (length > fillen) {
                    if (undefined !== letter) {
                        if (fillkeys.indexOf(letter) != -1) {
                            return sj.letters.STATE_PART;
                        } else {
                            return sj.letters.STATE_PART;
                        }
                    } else {
                        return sj.letters.STATE_PART;
                    }
                } else {
                    return sj.letters.STATE_CORRECT;
                }
            case sj.arrows.TYPE_CHOICE:
                if (1 === memlength) {
                    return 1 === Object.keys(internal_filter(function (k) {
                        return keys.indexOf(k) != -1;
                    }, memory)).length ? sj.letters.STATE_CORRECT : sj.letters.STATE_INCORRECT;
                } else if (0 >= memlength) {
                    return sj.letters.STATE_IDLE;
                }
            case sj.arrows.TYPE_SEQUENCE:
                var time = internal_min(internal_filter(function (o) {
                    return keys.indexOf(o) != -1;
                }, memory));

                for (var k in keys) {
                    var next = memory[keys[k]];
                    if (next === undefined) {
                        return sj.letters.STATE_IDLE;
                    } else if (-1 !== next && time > next) {
                        return sj.letters.STATE_INCORRECT;
                    } else if (memlength < length && undefined !== letter && keys[k] === letter) {
                        return sj.letters.STATE_PART
                    }

                    time = next;
                }

                return sj.letters.STATE_CORRECT;
            default:
                return false
        }

        return false;
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
        'check': function (generated, letter, objects) {
            var checked = internal_check(generated, letter);
            if (tryout !== checked && sj.letters.STATE_CORRECT === checked) {
                score += generated.points;
                tryout = checked;

                sj.numbers.set(objects.tenth, objects.unit, score);
            }

            return checked;
        },
        'clear': function () {
            memory = {}, tryout = undefined;
        },
		
		rankingScore: function () {
			return score;
		},
		
        resetScore: function () {
            score = 0;
        }
    };
});
