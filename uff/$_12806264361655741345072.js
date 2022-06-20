(function(){{
    var multiply = load(__webpack_require__(12));
    var pow = load(__webpack_require__(45));
    /**
   * Compute the gamma function of a value using Lanczos approximation for
   * small values, and an extended Stirling approximation for large values.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.gamma(n)
   *
   * Examples:
   *
   *    math.gamma(5);       // returns 24
   *    math.gamma(-0.5);    // returns -3.5449077018110335
   *    math.gamma(math.i);  // returns -0.15494982830180973 - 0.49801566811835596i
   *
   * See also:
   *
   *    combinations, factorial, permutations
   *
   * @param {number | Array | Matrix} n   A real or complex number
   * @return {number | Array | Matrix}    The gamma of `n`
   */
    var gamma = typed('gamma', {
        'number': function (n) {
            var t, x;
            if (isInteger(n)) {
                if (n <= 0) {
                    return isFinite(n) ? Infinity : NaN;
                }
                if (n > 171) {
                    return Infinity;    // Will overflow
                }
                var value = n - 2;
                var res = n - 1;
                while (value > 1) {
                    res *= value;
                    value--;
                }
                if (res == 0) {
                    res = 1;    // 0! is per definition 1
                }
                return res;
            }
            if (n < 0.5) {
                return Math.PI / (Math.sin(Math.PI * n) * gamma(1 - n));
            }
            if (n >= 171.35) {
                return Infinity;    // will overflow
            }
            if (n > 85) {
                // Extended Stirling Approx
                var twoN = n * n;
                var threeN = twoN * n;
                var fourN = threeN * n;
                var fiveN = fourN * n;
                return Math.sqrt(2 * Math.PI / n) * Math.pow(n / Math.E, n) * (1 + 1 / (12 * n) + 1 / (288 * twoN) - 139 / (51840 * threeN) - 571 / (2488320 * fourN) + 163879 / (209018880 * fiveN) + 5246819 / (75246796800 * fiveN * n));
            }
            --n;
            x = p[0];
            for (var i = 1; i < p.length; ++i) {
                x += p[i] / (n + i);
            }
            t = n + g + 0.5;
            return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
        },
        'Complex': function (n) {
            var t, x;
            if (n.im == 0) {
                return gamma(n.re);
            }
            n = new type.Complex(n.re - 1, n.im);
            x = new type.Complex(p[0], 0);
            for (var i = 1; i < p.length; ++i) {
                var real = n.re + i;
                // x += p[i]/(n+i)
                var den = real * real + n.im * n.im;
                if (den != 0) {
                    x.re += p[i] * real / den;
                    x.im += -(p[i] * n.im) / den;
                } else {
                    x.re = p[i] < 0 ? -Infinity : Infinity;
                }
            }
            t = new type.Complex(n.re + g + 0.5, n.im);
            var twoPiSqrt = Math.sqrt(2 * Math.PI);
            n.re += 0.5;
            var result = pow(t, n);
            if (result.im == 0) {
                // sqrt(2*PI)*result
                result.re *= twoPiSqrt;
            } else if (result.re == 0) {
                result.im *= twoPiSqrt;
            } else {
                result.re *= twoPiSqrt;
                result.im *= twoPiSqrt;
            }
            var r = Math.exp(-t.re);
            // exp(-t)
            t.re = r * Math.cos(-t.im);
            t.im = r * Math.sin(-t.im);
            return multiply(multiply(result, t), x);
        },
        'BigNumber': function (n) {
            if (n.isInteger()) {
                return n.isNegative() || n.isZero() ? new type.BigNumber(Infinity) : bigFactorial(n.minus(1));
            }
            if (!n.isFinite()) {
                return new type.BigNumber(n.isNegative() ? NaN : Infinity);
            }
            throw new Error('Integer BigNumber expected');
        },
        'Array | Matrix': function (n) {
            return deepMap(n, gamma);
        }
    });
    /**
   * Calculate factorial for a BigNumber
   * @param {BigNumber} n
   * @returns {BigNumber} Returns the factorial of n
   */
    function bigFactorial(n) {
        if (n.isZero()) {
            return new type.BigNumber(1);    // 0! is per definition 1
        }
        var precision = config.precision + (Math.log(n.toNumber()) | 0);
        var Big = type.BigNumber.clone({ precision: precision });
        var res = new Big(n);
        var value = n.toNumber() - 1;
        // number
        while (value > 1) {
            res = res.times(value);
            value--;
        }
        return new type.BigNumber(res.toPrecision(type.BigNumber.precision));
    }
    gamma.toTex = { 1: '\\Gamma\\left(${args[0]}\\right)' };
    return gamma;
}})();