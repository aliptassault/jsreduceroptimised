(function(){{
    var matrix = load(__webpack_require__(0));
    var algorithm01 = load(__webpack_require__(33));
    var algorithm02 = load(__webpack_require__(24));
    var algorithm06 = load(__webpack_require__(68));
    var algorithm11 = load(__webpack_require__(17));
    var algorithm13 = load(__webpack_require__(8));
    var algorithm14 = load(__webpack_require__(6));
    /**
   * Calculate the nth root of a value.
   * The principal nth root of a positive real number A, is the positive real
   * solution of the equation
   *
   *     x^root = A
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *     math.nthRoot(a)
   *     math.nthRoot(a, root)
   *
   * Examples:
   *
   *     math.nthRoot(9, 2);    // returns 3, as 3^2 == 9
   *     math.sqrt(9);          // returns 3, as 3^2 == 9
   *     math.nthRoot(64, 3);   // returns 4, as 4^3 == 64
   *
   * See also:
   *
   *     sqrt, pow
   *
   * @param {number | BigNumber | Array | Matrix | Complex} a
   *              Value for which to calculate the nth root
   * @param {number | BigNumber} [root=2]    The root.
   * @return {number | Complex | Array | Matrix} Returns the nth root of `a`
   */
    var nthRoot = typed('nthRoot', {
        'number': function (x) {
            return _nthRoot(x, 2);
        },
        'number, number': _nthRoot,
        'BigNumber': function (x) {
            return _bigNthRoot(x, new type.BigNumber(2));
        },
        'Complex': function (x) {
            return _nthComplexRoot(x, 2);
        },
        'Complex, number': _nthComplexRoot,
        'BigNumber, BigNumber': _bigNthRoot,
        'Array | Matrix': function (x) {
            return nthRoot(x, 2);
        },
        'Matrix, Matrix': function (x, y) {
            // result
            var c;
            // process matrix storage
            switch (x.storage()) {
            case 'sparse':
                switch (y.storage()) {
                case 'sparse':
                    // density must be one (no zeros in matrix)
                    if (y.density() === 1) {
                        // sparse + sparse
                        c = algorithm06(x, y, nthRoot);
                    } else {
                        // throw exception
                        throw new Error('Root must be non-zero');
                    }
                    break;
                default:
                    // sparse + dense
                    c = algorithm02(y, x, nthRoot, true);
                    break;
                }
                break;
            default:
                switch (y.storage()) {
                case 'sparse':
                    // density must be one (no zeros in matrix)
                    if (y.density() === 1) {
                        // dense + sparse
                        c = algorithm01(x, y, nthRoot, false);
                    } else {
                        // throw exception
                        throw new Error('Root must be non-zero');
                    }
                    break;
                default:
                    // dense + dense
                    c = algorithm13(x, y, nthRoot);
                    break;
                }
                break;
            }
            return c;
        },
        'Array, Array': function (x, y) {
            // use matrix implementation
            return nthRoot(matrix(x), matrix(y)).valueOf();
        },
        'Array, Matrix': function (x, y) {
            // use matrix implementation
            return nthRoot(matrix(x), y);
        },
        'Matrix, Array': function (x, y) {
            // use matrix implementation
            return nthRoot(x, matrix(y));
        },
        'Matrix, number | BigNumber': function (x, y) {
            // result
            var c;
            // check storage format
            switch (x.storage()) {
            case 'sparse':
                c = algorithm11(x, y, nthRoot, false);
                break;
            default:
                c = algorithm14(x, y, nthRoot, false);
                break;
            }
            return c;
        },
        'number | BigNumber, Matrix': function (x, y) {
            // result
            var c;
            // check storage format
            switch (y.storage()) {
            case 'sparse':
                // density must be one (no zeros in matrix)
                if (y.density() === 1) {
                    // sparse - scalar
                    c = algorithm11(y, x, nthRoot, true);
                } else {
                    // throw exception
                    throw new Error('Root must be non-zero');
                }
                break;
            default:
                c = algorithm14(y, x, nthRoot, true);
                break;
            }
            return c;
        },
        'Array, number | BigNumber': function (x, y) {
            // use matrix implementation
            return nthRoot(matrix(x), y).valueOf();
        },
        'number | BigNumber, Array': function (x, y) {
            // use matrix implementation
            return nthRoot(x, matrix(y)).valueOf();
        }
    });
    nthRoot.toTex = { 2: '\\sqrt[${args[1]}]{${args[0]}}' };
    return nthRoot;
    /**
   * Calculate the nth root of a for BigNumbers, solve x^root == a
   * http://rosettacode.org/wiki/Nth_root#JavaScript
   * @param {BigNumber} a
   * @param {BigNumber} root
   * @private
   */
    function _bigNthRoot(a, root) {
        var precision = type.BigNumber.precision;
        var Big = type.BigNumber.clone({ precision: precision + 2 });
        var zero = new type.BigNumber(0);
        var one = new Big(1);
        var inv = root.isNegative();
        if (inv) {
            root = root.neg();
        }
        if (root.isZero()) {
            throw new Error('Root must be non-zero');
        }
        if (a.isNegative() && !root.abs().mod(2).equals(1)) {
            throw new Error('Root must be odd when a is negative.');
        }
        // edge cases zero and infinity
        if (a.isZero()) {
            return inv ? new Big(Infinity) : 0;
        }
        if (!a.isFinite()) {
            return inv ? zero : a;
        }
        var x = a.abs().pow(one.div(root));
        // If a < 0, we require that root is an odd integer,
        // so (-1) ^ (1/root) = -1
        x = a.isNeg() ? x.neg() : x;
        return new type.BigNumber((inv ? one.div(x) : x).toPrecision(precision));
    }
}})();