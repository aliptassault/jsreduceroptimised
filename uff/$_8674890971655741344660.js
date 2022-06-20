(function(){{
    var last = size[size.length - 1];
    if (typeof last === 'string') {
        var format = size.pop();
        return _zeros(size, format);
    } else if (config.matrix === 'Array') {
        return _zeros(size);
    } else {
        return _zeros(size, 'default');
    }
}})();