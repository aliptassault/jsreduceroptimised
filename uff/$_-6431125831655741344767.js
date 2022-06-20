(function(){{
    var customTex;
    if (options && typeof options.handler === 'object' && hasOwnProperty(options.handler,         $that.name)) {
        //callback is a map of callback functions
        customTex = options.handler[        $that.name](        $that, options);
    }
    if (typeof customTex !== 'undefined') {
        return customTex;
    }
    //fall back to Node's toTex
    return nodeToTex.call(    $that, options);
}})();