(function(){{
    var matrix = load(__webpack_require__(0));
    var algorithm03 = load(__webpack_require__(15));
    var algorithm07 = load(__webpack_require__(26));
    var algorithm12 = load(__webpack_require__(16));
    var algorithm13 = load(__webpack_require__(8));
    var algorithm14 = load(__webpack_require__(6));
    var latex = __webpack_require__(4);
    /**
   * Test whether value x is smaller than y.
   *
   * The function returns true when x is smaller than y and the relative
   * difference between x and y is smaller than the configured epsilon. The
   * function cannot be used to compare values smaller than approximately 2.22e-16.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.smaller(x, y)
   *
   * Examples:
   *
   *    math.smaller(2, 3);            // returns true
   *    math.smaller(5, 2 * 2);        // returns false
   *
   *    var a = math.unit('5 cm');
   *    var b = math.unit('2 inch');
   *    math.smaller(a, b);            // returns true
   *
   * See also:
   *
   *    equal, unequal, smallerEq, smaller, smallerEq, compare
   *
   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
   * @return {boolean | Array | Matrix} Returns true when the x is smaller than y, else returns false
   */
    var smaller = typed('smaller', {
        'boolean, boolean': function (x, y) {
            return x < y;
        },
        'number, number': function (x, y) {
            return x < y && !nearlyEqual(x, y, config.epsilon);
        },
        'BigNumber, BigNumber': function (x, y) {
            return x.lt(y) && !bigNearlyEqual(x, y, config.epsilon);
        },
        'Fraction, Fraction': function (x, y) {
            return x.compare(y) === -1;
        },
        'Complex, Complex': function (x, y) {
            throw new TypeError('No ordering relation is defined for complex numbers');
        },
        'Unit, Unit': function (x, y) {
            if (!x.equalBase(y)) {
                throw new Error('Cannot compare units with different base');
            }
            return smaller(x.value, y.value);
        },
        'string, string': function (x, y) {
            return x < y;
        },
        'Matrix, Matrix': function (x, y) {
            // result
            var c;
            // process matrix storage
            switch (x.storage()) {
            case 'sparse':
                switch (y.storage()) {
                case 'sparse':
                    // sparse + sparse
                    c = algorithm07(x, y, smaller);
                    break;
                default:
                    // sparse + dense
                    c = algorithm03(y, x, smaller, true);
                    break;
                }
                break;
            default:
                switch (y.storage()) {
                case 'sparse':
                    // dense + sparse
                    c = algorithm03(x, y, smaller, false);
                    break;
                default:
                    // dense + dense
                    c = algorithm13(x, y, smaller);
                    break;
                }
                break;
            }
            return c;
        },
        'Array, Array': function (x, y) {
            // use matrix implementation
            return smaller(matrix(x), matrix(y)).valueOf();
        },
        'Array, Matrix': function (x, y) {
            // use matrix implementation
            return smaller(matrix(x), y);
        },
        'Matrix, Array': function (x, y) {
            // use matrix implementation
            return smaller(x, matrix(y));
        },
        'Matrix, any': function (x, y) {
            // result
            var c;
            // check storage format
            switch (x.storage()) {
            case 'sparse':
                c = algorithm12(x, y, smaller, false);
                break;
            default:
                c = algorithm14(x, y, smaller, false);
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
                c = algorithm12(y, x, smaller, true);
                break;
            default:
                c = algorithm14(y, x, smaller, true);
                break;
            }
            return c;
        },
        'Array, any': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(x), y, smaller, false).valueOf();
        },
        'any, Array': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(y), x, smaller, true).valueOf();
        }
    });
    smaller.toTex = { 2: '\\left(${args[0]}' + latex.operators['smaller'] + '${args[1]}\\right)' };
    return smaller;
}})();