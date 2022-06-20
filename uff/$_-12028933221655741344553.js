(function(){{
    var customTex;
    if (options && typeof options == 'object') {
        switch (typeof options.handler) {
        case 'object':
        case 'undefined':
            break;
        case 'function':
            customTex = options.handler(            $that, options);
            break;
        default:
            throw new TypeError('Object or function expected as callback');
        }
    }
    if (typeof customTex !== 'undefined') {
        return customTex;
    }
    return    $that._toTex(options);
}})();