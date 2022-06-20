(function(){{
    for (var key in        $that.properties) {
        if (            $that.properties.hasOwnProperty(key)) {
            callback(            $that.properties[key], 'properties[' + stringify(key) + ']',             $that);
        }
    }
}})();