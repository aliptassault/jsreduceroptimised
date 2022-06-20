(function(){{
    var x =         $that, Ctor = x.constructor;
    x = new Ctor(x);
    if (dp === void 0)
        return x;
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
        rm = Ctor.rounding;
    else
        checkInt32(rm, 0, 8);
    return finalise(x, dp + x.e + 1, rm);
}})();