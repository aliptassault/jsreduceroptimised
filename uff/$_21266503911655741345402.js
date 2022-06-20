(function(){{
    if (isNaN(        $that['n']) || isNaN(        $that['d'])) {
        return new Fraction(NaN);
    }
    if (a === undefined) {
        return new Fraction(        $that['s'] *        $that['n'] %        $that['d'], 1);
    }
    parse(a, b);
    if (0 === P['n'] && 0 ===        $that['d']) {
        Fraction(0, 0);    // Throw DivisionByZero
    }
    /*
       * First silly attempt, kinda slow
       *
       return that["sub"]({
       "n": num["n"] * Math.floor((this.n / this.d) / (num.n / num.d)),
       "d": num["d"],
       "s": this["s"]
       });*/
    /*
       * New attempt: a1 / b1 = a2 / b2 * q + r
       * => b2 * a1 = a2 * b1 * q + b1 * b2 * r
       * => (b2 * a1 % a2 * b1) / (b1 * b2)
       */
    return new Fraction(    $that['s'] * P['d'] *    $that['n'] % (P['n'] *    $that['d']), P['d'] *    $that['d']);
}})();