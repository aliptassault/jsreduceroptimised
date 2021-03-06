(function(){{
    var matrix = load(__webpack_require__(0));
    var multiplyScalar = load(__webpack_require__(23));
    var latex = __webpack_require__(4);
    var algorithm02 = load(__webpack_require__(24));
    var algorithm09 = load(__webpack_require__(133));
    var algorithm11 = load(__webpack_require__(17));
    var algorithm13 = load(__webpack_require__(8));
    var algorithm14 = load(__webpack_require__(6));
    /**
   * Multiply two matrices element wise. The function accepts both matrices and
   * scalar values.
   *
   * Syntax:
   *
   *    math.dotMultiply(x, y)
   *
   * Examples:
   *
   *    math.dotMultiply(2, 4); // returns 8
   *
   *    a = [[9, 5], [6, 1]];
   *    b = [[3, 2], [5, 2]];
   *
   *    math.dotMultiply(a, b); // returns [[27, 10], [30, 2]]
   *    math.multiply(a, b);    // returns [[52, 28], [23, 14]]
   *
   * See also:
   *
   *    multiply, divide, dotDivide
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x Left hand value
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Right hand value
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}                    Multiplication of `x` and `y`
   */
    var dotMultiply = typed('dotMultiply', {
        'any, any': multiplyScalar,
        'Matrix, Matrix': function (x, y) {
            // result
            var c;
            // process matrix storage
            switch (x.storage()) {
            case 'sparse':
                switch (y.storage()) {
                case 'sparse':
                    // sparse .* sparse
                    c = algorithm09(x, y, multiplyScalar, false);
                    break;
                default:
                    // sparse .* dense
                    c = algorithm02(y, x, multiplyScalar, true);
                    break;
                }
                break;
            default:
                switch (y.storage()) {
                case 'sparse':
                    // dense .* sparse
                    c = algorithm02(x, y, multiplyScalar, false);
                    break;
                default:
                    // dense .* dense
                    c = algorithm13(x, y, multiplyScalar);
                    break;
                }
                break;
            }
            return c;
        },
        'Array, Array': function (x, y) {
            // use matrix implementation
            return dotMultiply(matrix(x), matrix(y)).valueOf();
        },
        'Array, Matrix': function (x, y) {
            // use matrix implementation
            return dotMultiply(matrix(x), y);
        },
        'Matrix, Array': function (x, y) {
            // use matrix implementation
            return dotMultiply(x, matrix(y));
        },
        'Matrix, any': function (x, y) {
            // result
            var c;
            // check storage format
            switch (x.storage()) {
            case 'sparse':
                c = algorithm11(x, y, multiplyScalar, false);
                break;
            default:
                c = algorithm14(x, y, multiplyScalar, false);
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
                c = algorithm11(y, x, multiplyScalar, true);
                break;
            default:
                c = algorithm14(y, x, multiplyScalar, true);
                break;
            }
            return c;
        },
        'Array, any': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(x), y, multiplyScalar, false).valueOf();
        },
        'any, Array': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(y), x, multiplyScalar, true).valueOf();
        }
    });
    dotMultiply.toTex = { 2: '\\left(${args[0]}' + latex.operators['dotMultiply'] + '${args[1]}\\right)' };
    return dotMultiply;
}})();