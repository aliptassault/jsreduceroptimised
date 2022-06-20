(function(){{
    var err;
    var name = getName(fns);
    var signatures = {};
    for (var i = 0; i < fns.length; i++) {
        var fn = fns[i];
        // test whether this is a typed-function
        if (!(typeof fn.signatures === 'object')) {
            err = new TypeError('Function is no typed-function (index: ' + i + ')');
            err.data = { index: i };
            throw err;
        }
        // merge the signatures
        for (var signature in fn.signatures) {
            if (fn.signatures.hasOwnProperty(signature)) {
                if (signatures.hasOwnProperty(signature)) {
                    if (fn.signatures[signature] !== signatures[signature]) {
                        err = new Error('Signature "' + signature + '" is defined twice');
                        err.data = { signature: signature };
                        throw err;
                    }    // else: both signatures point to the same function, that's fine
                } else {
                    signatures[signature] = fn.signatures[signature];
                }
            }
        }
    }
    return _typed(name, signatures);
}})();