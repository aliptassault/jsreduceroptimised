(function(){{
    parse(a, b);
    // lcm(a / b, c / d) = lcm(a, c) / gcd(b, d)
    if (P['n'] === 0 &&        $that['n'] === 0) {
        return new Fraction();
    }
    return new Fraction(P['n'] *    $that['n'] / gcd(P['n'],     $that['n']), gcd(P['d'],     $that['d']));
}})();