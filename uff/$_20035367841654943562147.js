(function(){{
    var latex = __webpack_require__(4);
    var matrix = load(__webpack_require__(0));
    var equalScalar = load(__webpack_require__(11));
    var zeros = load(__webpack_require__(38));
    var algorithm01 = load(__webpack_require__(33));
    var algorithm02 = load(__webpack_require__(24));
    var algorithm08 = load(__webpack_require__(87));
    var algorithm10 = load(__webpack_require__(36));
    var algorithm11 = load(__webpack_require__(17));
    var algorithm13 = load(__webpack_require__(8));
    var algorithm14 = load(__webpack_require__(6));
    /**
   * Bitwise right arithmetic shift of a value x by y number of bits, `x >> y`.
   * For matrices, the function is evaluated element wise.
   * For units, the function is evaluated on the best prefix base.
   *
   * Syntax:
   *
   *    math.rightArithShift(x, y)
   *
   * Examples:
   *
   *    math.rightArithShift(4, 2);               // returns number 1
   *
   *    math.rightArithShift([16, -32, 64], 4);   // returns Array [1, -2, 3]
   *
   * See also:
   *
   *    bitAnd, bitNot, bitOr, bitXor, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x Value to be shifted
   * @param  {number | BigNumber} y Amount of shifts
   * @return {number | BigNumber | Array | Matrix} `x` sign-filled shifted right `y` times
   */
    var rightArithShift = typed('rightArithShift', {
        'number, number': function (x, y) {
            if (!isInteger(x) || !isInteger(y)) {
                throw new Error('Integers expected in function rightArithShift');
            }
            return x >> y;
        },
        'BigNumber, BigNumber': bigRightArithShift,
        'Matrix, Matrix': function (x, y) {
            // result
            var c;
            // process matrix storage
            switch (x.storage()) {
            case 'sparse':
                switch (y.storage()) {
                case 'sparse':
                    // sparse & sparse
                    c = algorithm08(x, y, rightArithShift, false);
                    break;
                default:
                    // sparse & dense
                    c = algorithm02(y, x, rightArithShift, true);
                    break;
                }
                break;
            default:
                switch (y.storage()) {
                case 'sparse':
                    // dense & sparse
                    c = algorithm01(x, y, rightArithShift, false);
                    break;
                default:
                    // dense & dense
                    c = algorithm13(x, y, rightArithShift);
                    break;
                }
                break;
            }
            return c;
        },
        'Array, Array': function (x, y) {
            // use matrix implementation
            return rightArithShift(matrix(x), matrix(y)).valueOf();
        },
        'Array, Matrix': function (x, y) {
            // use matrix implementation
            return rightArithShift(matrix(x), y);
        },
        'Matrix, Array': function (x, y) {
            // use matrix implementation
            return rightArithShift(x, matrix(y));
        },
        'Matrix, number | BigNumber': function (x, y) {
            // check scalar
            if (!equalScalar(y, 0)) {
                // result
                var c;
                // check storage format
                switch (x.storage()) {
                case 'sparse':
                    c = algorithm11(x, y, rightArithShift, false);
                    break;
                default:
                    c = algorithm14(x, y, rightArithShift, false);
                    break;
                }
                return c;
            }
            return x.clone();
        },
        'number | BigNumber, Matrix': function (x, y) {
            // check scalar
            if (!equalScalar(x, 0)) {
                // result
                var c;
                // check storage format
                switch (y.storage()) {
                case 'sparse':
                    c = algorithm10(y, x, rightArithShift, true);
                    break;
                default:
                    c = algorithm14(y, x, rightArithShift, true);
                    break;
                }
                return c;
            }
            return zeros(y.size(), y.storage());
        },
        'Array, number | BigNumber': function (x, y) {
            // use matrix implementation
            return rightArithShift(matrix(x), y).valueOf();
        },
        'number | BigNumber, Array': function (x, y) {
            // use matrix implementation
            return rightArithShift(x, matrix(y)).valueOf();
        }
    });
    rightArithShift.toTex = { 2: '\\left(${args[0]}' + latex.operators['rightArithShift'] + '${args[1]}\\right)' };
    return rightArithShift;
}})();