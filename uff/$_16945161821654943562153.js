(function(){{
    var add = load(__webpack_require__(18));
    var divide = load(__webpack_require__(47));
    var multiply = load(__webpack_require__(12));
    var combinations = load(__webpack_require__(70));
    var isNegative = load(__webpack_require__(57));
    var isInteger = load(__webpack_require__(48));
    /**
   * The Catalan Numbers enumerate combinatorial structures of many different types.
   * catalan only takes integer arguments.
   * The following condition must be enforced: n >= 0
   *
   * Syntax:
   *
   *   math.catalan(n)
   *
   * Examples:
   *
   *    math.catalan(3); // returns 5;
   *    math.catalan(8); // returns 1430;
   *
   * See also:
   *
   *    bellNumbers
   *
   * @param {Number | BigNumber} n    nth Catalan number
   * @return {Number | BigNumber}     Cn(n)
   */
    var catalan = typed('catalan', {
        'number | BigNumber': function (n) {
            if (!isInteger(n) || isNegative(n)) {
                throw new TypeError('Non-negative integer value expected in function catalan');
            }
            return divide(combinations(multiply(n, 2), n), add(n, 1));
        }
    });
    catalan.toTex = { 1: '\\mathrm{C}_{${args[0]}}' };
    return catalan;
}})();