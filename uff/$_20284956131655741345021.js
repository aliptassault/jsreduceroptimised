(function(){{
    var properties = {};
    for (var key in        $that.properties) {
        if (            $that.properties.hasOwnProperty(key)) {
            properties[key] =             $that._ifNode(callback(            $that.properties[key], 'properties[' + stringify(key) + ']',             $that));
        }
    }
    return new ObjectNode(properties);
}})();