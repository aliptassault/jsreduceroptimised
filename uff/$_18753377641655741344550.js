(function(){{
    var customString;
    if (options && typeof options === 'object') {
        switch (typeof options.handler) {
        case 'object':
        case 'undefined':
            break;
        case 'function':
            customString = options.handler(            $that, options);
            break;
        default:
            throw new TypeError('Object or function expected as callback');
        }
    }
    if (typeof customString !== 'undefined') {
        return customString;
    }
    return    $that.toHTML(options);
}})();