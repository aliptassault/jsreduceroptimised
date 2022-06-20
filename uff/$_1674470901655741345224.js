(function(){{
    if (sd > PI_PRECISION)
        throw Error(precisionLimitExceeded);
    return finalise(new Ctor(PI), sd, rm, true);
}})();