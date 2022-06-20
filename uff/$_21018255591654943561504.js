(function(){{
    parse(a, b);
    // mutates P
    a =     $that['re'];
    b =     $that['im'];
    if (a === 0 && b === 0) {
        return Complex['ZERO'];
    }
    // If the exponent is real
    if (P['im'] === 0) {
        if (b === 0 && a >= 0) {
            return new Complex(Math.pow(a, P['re']), 0);
        } else if (a === 0) {
            // If base is fully imaginary
            switch ((P['re'] % 4 + 4) % 4) {
            case 0:
                return new Complex(Math.pow(b, P['re']), 0);
            case 1:
                return new Complex(0, Math.pow(b, P['re']));
            case 2:
                return new Complex(-Math.pow(b, P['re']), 0);
            case 3:
                return new Complex(0, -Math.pow(b, P['re']));
            }
        }
    }
    /* I couldn't find a good formula, so here is a derivation and optimization
       *
       * z_1^z_2 = (a + bi)^(c + di)
       *         = exp((c + di) * log(a + bi)
       *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
       * =>...
       * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
       * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
       *
       * =>...
       * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
       * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
       *
       * =>
       * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
       * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
       *
       */
    var arg = Math.atan2(b, a);
    var loh = logHypot(a, b);
    a = Math.exp(P['re'] * loh - P['im'] * arg);
    b = P['im'] * loh + P['re'] * arg;
    return new Complex(a * Math.cos(b), a * Math.sin(b));
}})();