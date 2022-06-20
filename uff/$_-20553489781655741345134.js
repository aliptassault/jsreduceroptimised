(function(){{
    var from = getTypeOf(value);
    // check conversion is needed
    if (type === from) {
        return value;
    }
    for (var i = 0; i < typed.conversions.length; i++) {
        var conversion = typed.conversions[i];
        if (conversion.from === from && conversion.to === type) {
            return conversion.convert(value);
        }
    }
    throw new Error('Cannot convert from ' + from + ' to ' + type);
}})();