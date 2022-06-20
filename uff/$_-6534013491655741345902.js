(function(){{
    try {
        return _toNumber(math[fnname].apply(null, args));
    } catch (ignore) {
        // sometimes the implicit type conversion causes the evaluation to fail, so we'll try again after removing Fractions
        args = args.map(function (x) {
            if (type.isFraction(x)) {
                return x.valueOf();
            }
            return x;
        });
        return _toNumber(math[fnname].apply(null, args));
    }
}})();