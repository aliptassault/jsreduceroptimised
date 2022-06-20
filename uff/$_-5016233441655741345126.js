(function(){{
    var obj;
    for (var i = 0; i < typed.types.length; i++) {
        var entry = typed.types[i];
        if (entry.name === 'Object') {
            // Array and Date are also Object, so test for Object afterwards
            obj = entry;
        } else {
            if (entry.test(x))
                return entry.name;
        }
    }
    // at last, test whether an object
    if (obj && obj.test(x))
        return obj.name;
    return 'unknown';
}})();