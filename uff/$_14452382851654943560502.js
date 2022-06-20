(function(){{
    // TODO: add support for Arrays to deepExtend
    if (Array.isArray(b)) {
        throw new TypeError('Arrays are not supported by deepExtend');
    }
    for (var prop in b) {
        if (exports.hasOwnProperty(b, prop)) {
            if (b[prop] && b[prop].constructor === Object) {
                if (a[prop] === undefined) {
                    a[prop] = {};
                }
                if (a[prop].constructor === Object) {
                    deepExtend(a[prop], b[prop]);
                } else {
                    a[prop] = b[prop];
                }
            } else if (Array.isArray(b[prop])) {
                throw new TypeError('Arrays are not supported by deepExtend');
            } else {
                a[prop] = b[prop];
            }
        }
    }
    return a;
}})();