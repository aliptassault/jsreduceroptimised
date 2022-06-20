(function(){{
    var array = [];
        $that.forEach(function (value, index, obj) {
        array[index[0]] = callback(value, index, obj);
    });
    return array;
}})();