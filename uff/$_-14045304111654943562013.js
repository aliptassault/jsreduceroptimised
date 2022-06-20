(function(){{
    var subset = load(__webpack_require__(22));
    return typed('subset', {
        '...any': function (args) {
            try {
                return subset.apply(null, args);
            } catch (err) {
                throw errorTransform(err);
            }
        }
    });
}})();