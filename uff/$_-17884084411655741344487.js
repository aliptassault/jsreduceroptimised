(function(){{
    var prop, i, len;
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) {
            return false;
        }
        if (a.length != b.length) {
            return false;
        }
        for (i = 0, len = a.length; i < len; i++) {
            if (!exports.deepEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (a instanceof Object) {
        if (Array.isArray(b) || !(b instanceof Object)) {
            return false;
        }
        for (prop in a) {
            //noinspection JSUnfilteredForInLoop
            if (!exports.deepEqual(a[prop], b[prop])) {
                return false;
            }
        }
        for (prop in b) {
            //noinspection JSUnfilteredForInLoop
            if (!exports.deepEqual(a[prop], b[prop])) {
                return false;
            }
        }
        return true;
    } else {
        return typeof a === typeof b && a == b;
    }
}})();