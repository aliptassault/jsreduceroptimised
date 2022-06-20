(function(){{
    if (!Array.isArray(array)) {
        //if not an array, return as is
        return array;
    }
    var flat = [];
    array.forEach(function callback(value) {
        if (Array.isArray(value)) {
            value.forEach(callback);    //traverse through sub-arrays recursively
        } else {
            flat.push(value);
        }
    });
    return flat;
}})();