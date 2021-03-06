(function(){{
    var matrix = load(__webpack_require__(0));
    var algorithm03 = load(__webpack_require__(15));
    var algorithm05 = load(__webpack_require__(60));
    var algorithm12 = load(__webpack_require__(16));
    var algorithm13 = load(__webpack_require__(8));
    var algorithm14 = load(__webpack_require__(6));
    /**
   * Compare two values. Returns 1 when x > y, -1 when x < y, and 0 when x == y.
   *
   * x and y are considered equal when the relative difference between x and y
   * is smaller than the configured epsilon. The function cannot be used to
   * compare values smaller than approximately 2.22e-16.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.compare(x, y)
   *
   * Examples:
   *
   *    math.compare(6, 1);           // returns 1
   *    math.compare(2, 3);           // returns -1
   *    math.compare(7, 7);           // returns 0
   *
   *    var a = math.unit('5 cm');
   *    var b = math.unit('40 mm');
   *    math.compare(a, b);           // returns 1
   *
   *    math.compare(2, [1, 2, 3]);   // returns [1, 0, -1]
   *
   * See also:
   *
   *    equal, unequal, smaller, smallerEq, larger, largerEq, compareNatural
   *
   * @param  {number | BigNumber | Fraction | Unit | string | Array | Matrix} x First value to compare
   * @param  {number | BigNumber | Fraction | Unit | string | Array | Matrix} y Second value to compare
   * @return {number | BigNumber | Fraction | Array | Matrix} Returns the result of the comparison: 1, 0 or -1.
   */
    var compare = typed('compare', {
        'boolean, boolean': function (x, y) {
            return x === y ? 0 : x > y ? 1 : -1;
        },
        'number, number': function (x, y) {
            return x === y || nearlyEqual(x, y, config.epsilon) ? 0 : x > y ? 1 : -1;
        },
        'BigNumber, BigNumber': function (x, y) {
            return x.eq(y) || bigNearlyEqual(x, y, config.epsilon) ? new type.BigNumber(0) : new type.BigNumber(x.cmp(y));
        },
        'Fraction, Fraction': function (x, y) {
            return new type.Fraction(x.compare(y));
        },
        'Complex, Complex': function () {
            throw new TypeError('No ordering relation is defined for complex numbers');
        },
        'Unit, Unit': function (x, y) {
            if (!x.equalBase(y)) {
                throw new Error('Cannot compare units with different base');
            }
            return compare(x.value, y.value);
        },
        'string, string': function (x, y) {
            return x === y ? 0 : x > y ? 1 : -1;
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
                    c = algorithm05(x, y, compare);
                    break;
                default:
                    // sparse + dense
                    c = algorithm03(y, x, compare, true);
                    break;
                }
                break;
            default:
                switch (y.storage()) {
                case 'sparse':
                    // dense + sparse
                    c = algorithm03(x, y, compare, false);
                    break;
                default:
                    // dense + dense
                    c = algorithm13(x, y, compare);
                    break;
                }
                break;
            }
            return c;
        },
        'Array, Array': function (x, y) {
            // use matrix implementation
            return compare(matrix(x), matrix(y)).valueOf();
        },
        'Array, Matrix': function (x, y) {
            // use matrix implementation
            return compare(matrix(x), y);
        },
        'Matrix, Array': function (x, y) {
            // use matrix implementation
            return compare(x, matrix(y));
        },
        'Matrix, any': function (x, y) {
            // result
            var c;
            // check storage format
            switch (x.storage()) {
            case 'sparse':
                c = algorithm12(x, y, compare, false);
                break;
            default:
                c = algorithm14(x, y, compare, false);
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
                c = algorithm12(y, x, compare, true);
                break;
            default:
                c = algorithm14(y, x, compare, true);
                break;
            }
            return c;
        },
        'Array, any': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(x), y, compare, false).valueOf();
        },
        'any, Array': function (x, y) {
            // use matrix implementation
            return algorithm14(matrix(y), x, compare, true).valueOf();
        }
    });
    compare.toTex = undefined;
    // use default template
    return compare;
}})();