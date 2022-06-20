(function(){{
    var properties = {};
    for (var key in        $that.properties) {
        if (            $that.properties.hasOwnProperty(key)) {
            properties[key] =             $that.properties[key];
        }
    }
    return new ObjectNode(properties);
}})();