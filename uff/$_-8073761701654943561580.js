(function(){{
    parse(a, b);
    // gcd(a / b, c / d) = gcd(a, c) / lcm(b, d)
    return new Fraction(gcd(P['n'],     $that['n']), P['d'] *    $that['d'] / gcd(P['d'],     $that['d']));
}})();