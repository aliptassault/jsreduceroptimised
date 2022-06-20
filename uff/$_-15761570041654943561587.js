(function(){{
    if (m < 0) {
        return new Fraction(Math.pow(        $that['s'] *        $that['d'], -m), Math.pow(        $that['n'], -m));
    } else {
        return new Fraction(Math.pow(        $that['s'] *        $that['n'], m), Math.pow(        $that['d'], m));
    }
}})();