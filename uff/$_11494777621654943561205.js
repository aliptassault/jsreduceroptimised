(function(){{
    var matrix = load(__webpack_require__(0));
    var divideScalar = load(__webpack_require__(19));
    var latex = __webpack_require__(4);
    var algorithm02 = load(__webpack_require__(24));
    var algorithm03 = load(__webpack_require__(15));
    var algorithm07 = load(__webpack_require__(26));
    var algorithm11 = load(__webpack_require__(17));
    var algorithm12 = load(__webpack_require__(16));
    var algorithm13 = load(__webpack_require__(8));
    var algorithm14 = load(__webpack_require__(6));
    /**
   * Divide two matrices element wise. The function accepts both matrices and
   * scalar values.
   *
   * Syntax:
   *
   *    math.dotDivide(x, y)
   *
   * Examples:
   *
   *    math.dotDivide(2, 4);   // returns 0.5
   *
   *    a = [[9, 5], [6, 1]];
   *    b = [[3, 2], [5, 2]];
   *
   *    math.dotDivide(a, b);   // returns [[3, 2.5], [1.2, 0.5]]
   *    math.divide(a, b);      // returns [[1.75, 0.75], [-1.75, 2.25]]
   *
   * See also:
   *
   *    divide, multiply, dotMultiply
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x Numerator
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Denominator
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}                    Quotient, `x ./ y`
   */
    var dotDivide = typed('dotDivide', {
        'any, any': divideScalar,
        'Matrix, Matrix': function (x, y) {
            // result
            var c;
            // process matrix storage
            switch (x.storage()) {
            case 'sparse':
                switch (y.storage()) {
                case 'sparse':
                    // sparse ./ sparse
                    c = algorithm07(x, y, divideScalar, false);
                    break;
                default:
                    // sparse ./ dense
                    c = algorithm02(y, x, divideScalar, true);
                    break;
                }
                break;
            default:
                switch (y.storage()) {
                case 'sparse':
                    // dense ./ sparse
                    c = algorithm03(x, y, divideScalar, false);
                    break;
                default:
                    // dense ./ dense
                    c = algorithm13(x, y, divideScalar);
                    break;
                }
                break;
            }
            return c;
        },
        'Array, Array': function (x, y) {
            // use matrix implementation
            return dotDivide(matrix(x), matrix(y)).valueOf();
        },
        'Array, Matrix': function (x, y) {
            // use matrix implementation
            return dotDivide(matrix(x), y);
        },
        'Matrix, Array': function (x, y) {
            // use matrix implementation
            return dotDivide(x, matrix(y));
        },
        'Matrix, any': function (x, y) {
            // result
            var c;
            // check storage format
            switch (x.storage()) {
            case 'sparse':
                c = algorithm11(x, y, divideScalar, false);
                break;
            default:
                c = algorithm14(x, y, divideScalar, false);
                break;
            }
            return c;
        },
        'any, Matrix': function (x, y) {
            // result
            var c;
            // check storage format
            switch (y.storage()) {
            case 'sparse':
                c = algorithm12(y, x, divideScalar, true);
                break;
            default:
                c = algorithm14(y, x, divideScalar, true);
                break;
            }
            return c;
        },
        'Array, any': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(x), y, divideScalar, false).valueOf();
        },
        'any, Array': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(y), x, divideScalar, true).valueOf();
        }
    });
    dotDivide.toTex = { 2: '\\left(${args[0]}' + latex.operators['dotDivide'] + '${args[1]}\\right)' };
    return dotDivide;
}})();