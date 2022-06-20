(function(){{
    if (precision !== undefined) {
        return value.toExponential(precision - 1);    // Note the offset of one
    } else {
        return value.toExponential();
    }
}})();