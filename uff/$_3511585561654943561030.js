(function(){{
    if (!(        $that instanceof ResultSet)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
        $that.entries = entries || [];
}})();