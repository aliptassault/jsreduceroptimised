(function(){{
    /**
   * Compute the erf function of a value using a rational Chebyshev
   * approximations for different intervals of x.
   *
   * This is a translation of W. J. Cody's Fortran implementation from 1987
   * ( http://www.netlib.org/specfun/erf ). See the AMS publication
   * "Rational Chebyshev Approximations for the Error Function" by W. J. Cody
   * for an explanation of this process.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.erf(x)
   *
   * Examples:
   *
   *    math.erf(0.2);    // returns 0.22270258921047847
   *    math.erf(-0.5);   // returns -0.5204998778130465
   *    math.erf(4);      // returns 0.9999999845827421
   *
   * @param {number | Array | Matrix} x   A real number
   * @return {number | Array | Matrix}    The erf of `x`
   */
    var erf = typed('erf', {
        'number': function (x) {
            var y = Math.abs(x);
            if (y >= MAX_NUM) {
                return sign(x);
            }
            if (y <= THRESH) {
                return sign(x) * erf1(y);
            }
            if (y <= 4) {
                return sign(x) * (1 - erfc2(y));
            }
            return sign(x) * (1 - erfc3(y));
        },
        // TODO: Not sure if there's a way to guarantee some degree of accuracy here.
        //  Perhaps it would be best to set the precision of the number to that which
        //  is guaranteed by erf()
        'BigNumber': function (n) {
            return new type.BigNumber(erf(n.toNumber()));
        },
        'Array | Matrix': function (n) {
            return deepMap(n, erf);
        }    // TODO: For complex numbers, use the approximation for the Faddeeva function
             //  from "More Efficient Computation of the Complex Error Function" (AMS)
    });
    /**
   * Approximates the error function erf() for x <= 0.46875 using this function:
   *               n
   * erf(x) = x * sum (p_j * x^(2j)) / (q_j * x^(2j))
   *              j=0
   */
    function erf1(y) {
        var ysq = y * y;
        var xnum = P[0][4] * ysq;
        var xden = ysq;
        var i;
        for (i = 0; i < 3; i += 1) {
            xnum = (xnum + P[0][i]) * ysq;
            xden = (xden + Q[0][i]) * ysq;
        }
        return y * (xnum + P[0][3]) / (xden + Q[0][3]);
    }
    /**
   * Approximates the complement of the error function erfc() for
   * 0.46875 <= x <= 4.0 using this function:
   *                       n
   * erfc(x) = e^(-x^2) * sum (p_j * x^j) / (q_j * x^j)
   *                      j=0
   */
    function erfc2(y) {
        var xnum = P[1][8] * y;
        var xden = y;
        var i;
        for (i = 0; i < 7; i += 1) {
            xnum = (xnum + P[1][i]) * y;
            xden = (xden + Q[1][i]) * y;
        }
        var result = (xnum + P[1][7]) / (xden + Q[1][7]);
        var ysq = parseInt(y * 16) / 16;
        var del = (y - ysq) * (y + ysq);
        return Math.exp(-ysq * ysq) * Math.exp(-del) * result;
    }
    /**
   * Approximates the complement of the error function erfc() for x > 4.0 using
   * this function:
   *
   * erfc(x) = (e^(-x^2) / x) * [ 1/sqrt(pi) +
   *               n
   *    1/(x^2) * sum (p_j * x^(-2j)) / (q_j * x^(-2j)) ]
   *              j=0
   */
    function erfc3(y) {
        var ysq = 1 / (y * y);
        var xnum = P[2][5] * ysq;
        var xden = ysq;
        var i;
        for (i = 0; i < 4; i += 1) {
            xnum = (xnum + P[2][i]) * ysq;
            xden = (xden + Q[2][i]) * ysq;
        }
        var result = ysq * (xnum + P[2][4]) / (xden + Q[2][4]);
        result = (SQRPI - result) / y;
        ysq = parseInt(y * 16) / 16;
        var del = (y - ysq) * (y + ysq);
        return Math.exp(-ysq * ysq) * Math.exp(-del) * result;
    }
    erf.toTex = { 1: 'erf\\left(${args[0]}\\right)' };
    return erf;
}})();