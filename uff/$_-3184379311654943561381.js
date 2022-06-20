(function(){{
    var x =         $that, Ctor = x.constructor;
    if (sd === void 0) {
        sd = Ctor.precision;
        rm = Ctor.rounding;
    } else {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0)
            rm = Ctor.rounding;
        else
            checkInt32(rm, 0, 8);
    }
    return finalise(new Ctor(x), sd, rm);
}})();