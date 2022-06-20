(function(){{
    if (sd > LN10_PRECISION) {
        // Reset global state in case the exception is caught.
        external = true;
        if (pr)
            Ctor.precision = pr;
        throw Error(precisionLimitExceeded);
    }
    return finalise(new Ctor(LN10), sd, 1, true);
}})();