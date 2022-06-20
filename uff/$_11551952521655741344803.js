(function(){{
    if (!options || options && !options.parenthesis || options && options.parenthesis === 'keep') {
        return '\\left(' +        $that.content.toTex(options) + '\\right)';
    }
    return    $that.content.toTex(options);
}})();