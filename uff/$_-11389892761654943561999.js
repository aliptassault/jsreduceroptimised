(function(){{
    var concat = load(__webpack_require__(64));
    // @see: comment of concat itself
    return typed('concat', {
        '...any': function (args) {
            // change last argument from one-based to zero-based
            var lastIndex = args.length - 1;
            var last = args[lastIndex];
            if (type.isNumber(last)) {
                args[lastIndex] = last - 1;
            } else if (type.isBigNumber(last)) {
                args[lastIndex] = last.minus(1);
            }
            try {
                return concat.apply(null, args);
            } catch (err) {
                throw errorTransform(err);
            }
        }
    });
}})();