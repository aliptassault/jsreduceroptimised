(function(){{
    return value.toFixed(precision || 0);    // Note: the (precision || 0) is needed as the toFixed of BigNumber has an
                                             // undefined default precision instead of 0.
}})();