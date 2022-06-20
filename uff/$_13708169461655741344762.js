(function(){{
    var customString;
    var name =     $that.fn.toString(options);
    if (options && typeof options.handler === 'object' && hasOwnProperty(options.handler, name)) {
        //callback is a map of callback functions
        customString = options.handler[name](        $that, options);
    }
    if (typeof customString !== 'undefined') {
        return customString;
    }
    //fall back to Node's toString
    return nodeToString.call(    $that, options);
}})();