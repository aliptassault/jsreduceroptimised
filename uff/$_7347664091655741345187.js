(function(){{
    var x =         $that, Ctor = x.constructor;
    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
}})();