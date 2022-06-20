(function(){{
    if (!fn.signatures) {
        throw new TypeError('Function is no typed-function');
    }
    // normalize input
    var arr;
    if (typeof signature === 'string') {
        arr = signature.split(',');
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].trim();
        }
    } else if (Array.isArray(signature)) {
        arr = signature;
    } else {
        throw new TypeError('String array or a comma separated string expected');
    }
    var str = arr.join(',');
    // find an exact match
    var match = fn.signatures[str];
    if (match) {
        return match;
    }
    // TODO: extend find to match non-exact signatures
    throw new TypeError('Signature not found (signature: ' + (fn.name || 'unnamed') + '(' + arr.join(', ') + '))');
}})();