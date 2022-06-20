(function(){{
    var min = load(__webpack_require__(116));
    return typed('min', {
        '...any': function (args) {
            // change last argument dim from one-based to zero-based
            if (args.length == 2 && isCollection(args[0])) {
                var dim = args[1];
                if (type.isNumber(dim)) {
                    args[1] = dim - 1;
                } else if (type.isBigNumber(dim)) {
                    args[1] = dim.minus(1);
                }
            }
            try {
                return min.apply(null, args);
            } catch (err) {
                throw errorTransform(err);
            }
        }
    });
}})();