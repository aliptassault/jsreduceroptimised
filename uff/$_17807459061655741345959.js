(function(){{
    var matrix = load(__webpack_require__(0));
    var latex = __webpack_require__(4);
    var algorithm02 = load(__webpack_require__(24));
    var algorithm03 = load(__webpack_require__(15));
    var algorithm05 = load(__webpack_require__(60));
    var algorithm11 = load(__webpack_require__(17));
    var algorithm12 = load(__webpack_require__(16));
    var algorithm13 = load(__webpack_require__(8));
    var algorithm14 = load(__webpack_require__(6));
    /**
   * Calculates the modulus, the remainder of an integer division.
   *
   * For matrices, the function is evaluated element wise.
   *
   * The modulus is defined as:
   *
   *     x - y * floor(x / y)
   *
   * See http://en.wikipedia.org/wiki/Modulo_operation.
   *
   * Syntax:
   *
   *    math.mod(x, y)
   *
   * Examples:
   *
   *    math.mod(8, 3);                // returns 2
   *    math.mod(11, 2);               // returns 1
   *
   *    function isOdd(x) {
   *      return math.mod(x, 2) != 0;
   *    }
   *
   *    isOdd(2);                      // returns false
   *    isOdd(3);                      // returns true
   *
   * See also:
   *
   *    divide
   *
   * @param  {number | BigNumber | Fraction | Array | Matrix} x Dividend
   * @param  {number | BigNumber | Fraction | Array | Matrix} y Divisor
   * @return {number | BigNumber | Fraction | Array | Matrix} Returns the remainder of `x` divided by `y`.
   */
    var mod = typed('mod', {
        'number, number': _mod,
        'BigNumber, BigNumber': function (x, y) {
            return y.isZero() ? x : x.mod(y);
        },
        'Fraction, Fraction': function (x, y) {
            return x.mod(y);
        },
        'Matrix, Matrix': function (x, y) {
            // result
            var c;
            // process matrix storage
            switch (x.storage()) {
            case 'sparse':
                switch (y.storage()) {
                case 'sparse':
                    // mod(sparse, sparse)
                    c = algorithm05(x, y, mod, false);
                    break;
                default:
                    // mod(sparse, dense)
                    c = algorithm02(y, x, mod, true);
                    break;
                }
                break;
            default:
                switch (y.storage()) {
                case 'sparse':
                    // mod(dense, sparse)
                    c = algorithm03(x, y, mod, false);
                    break;
                default:
                    // mod(dense, dense)
                    c = algorithm13(x, y, mod);
                    break;
                }
                break;
            }
            return c;
        },
        'Array, Array': function (x, y) {
            // use matrix implementation
            return mod(matrix(x), matrix(y)).valueOf();
        },
        'Array, Matrix': function (x, y) {
            // use matrix implementation
            return mod(matrix(x), y);
        },
        'Matrix, Array': function (x, y) {
            // use matrix implementation
            return mod(x, matrix(y));
        },
        'Matrix, any': function (x, y) {
            // result
            var c;
            // check storage format
            switch (x.storage()) {
            case 'sparse':
                c = algorithm11(x, y, mod, false);
                break;
            default:
                c = algorithm14(x, y, mod, false);
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
                c = algorithm12(y, x, mod, true);
                break;
            default:
                c = algorithm14(y, x, mod, true);
                break;
            }
            return c;
        },
        'Array, any': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(x), y, mod, false).valueOf();
        },
        'any, Array': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(y), x, mod, true).valueOf();
        }
    });
    mod.toTex = { 2: '\\left(${args[0]}' + latex.operators['mod'] + '${args[1]}\\right)' };
    return mod;
    /**
   * Calculate the modulus of two numbers
   * @param {number} x
   * @param {number} y
   * @returns {number} res
   * @private
   */
    function _mod(x, y) {
        if (y > 0) {
            // We don't use JavaScript's % operator here as this doesn't work
            // correctly for x < 0 and x == 0
            // see http://en.wikipedia.org/wiki/Modulo_operation
            return x - y * Math.floor(x / y);
        } else if (y === 0) {
            return x;
        } else {
            // y < 0
            // TODO: implement mod for a negative divisor
            throw new Error('Cannot calculate mod for a negative divisor');
        }
    }
}})();