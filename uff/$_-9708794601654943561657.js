(function(){{
    if (typeof base === 'string') {
        base = BASE_UNITS[base];
    }
    if (!base)
        return false;
    // All dimensions must be the same
    for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
        if (Math.abs((            $that.dimensions[i] || 0) - (base.dimensions[i] || 0)) > 1e-12) {
            return false;
        }
    }
    return true;
}})();