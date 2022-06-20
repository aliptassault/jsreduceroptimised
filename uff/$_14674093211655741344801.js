(function(){{
    if (!options || options && !options.parenthesis || options && options.parenthesis === 'keep') {
        return '(' +        $that.content.toString(options) + ')';
    }
    return    $that.content.toString(options);
}})();