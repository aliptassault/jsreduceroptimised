(function(){{
    return template.replace(/\$([\w\.]+)/g, function (original, key) {
        var keys = key.split('.');
        var value = values[keys.shift()];
        while (keys.length && value !== undefined) {
            var k = keys.shift();
            value = k ? value[k] : value + '.';
        }
        if (value !== undefined) {
            if (!isString(value)) {
                return format(value, options);
            } else {
                return value;
            }
        }
        return original;
    });
}})();