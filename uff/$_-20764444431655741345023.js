(function(){{
    var entries = [];
    for (var key in        $that.properties) {
        if (            $that.properties.hasOwnProperty(key)) {
            entries.push(stringify(key) + ': ' +            $that.properties[key].toString(options));
        }
    }
    return '{' + entries.join(', ') + '}';
}})();