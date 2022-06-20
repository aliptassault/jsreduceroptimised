(function(){{
    // matrix instance
    var me =     $that;
    var recurse = function (value, index) {
        if (isArray(value)) {
            value.forEach(function (child, i) {
                recurse(child, index.concat(i));
            });
        } else {
            callback(value, index, me);
        }
    };
    recurse(    $that._data, []);
}})();