(function(){{
    places = Math.pow(10, places || 0);
    if (isNaN(        $that['n']) || isNaN(        $that['d'])) {
        return new Fraction(NaN);
    }
    return new Fraction(Math.floor(places *    $that['s'] *    $that['n'] /    $that['d']), places);
}})();