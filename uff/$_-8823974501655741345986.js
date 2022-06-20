(function(){{
    var add = load(__webpack_require__(18));
    var stirlingS2 = load(__webpack_require__(136));
    var isNegative = load(__webpack_require__(57));
    var isInteger = load(__webpack_require__(48));
    /**
   * The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S.
   * bellNumbers only takes integer arguments.
   * The following condition must be enforced: n >= 0
   *
   * Syntax:
   *
   *   math.bellNumbers(n)
   *
   * Examples:
   *
   *    math.bellNumbers(3); // returns 5;
   *    math.bellNumbers(8); // returns 4140;
   *
   * See also:
   *
   *    stirlingS2
   *
   * @param {Number | BigNumber} n    Total number of objects in the set
   * @return {Number | BigNumber}     B(n)
   */
    var bellNumbers = typed('bellNumbers', {
        'number | BigNumber': function (n) {
            if (!isInteger(n) || isNegative(n)) {
                throw new TypeError('Non-negative integer value expected in function bellNumbers');
            }
            // Sum (k=0, n) S(n,k).
            var result = 0;
            for (var i = 0; i <= n; i++) {
                result = add(result, stirlingS2(n, i));
            }
            return result;
        }
    });
    bellNumbers.toTex = { 1: '\\mathrm{B}_{${args[0]}}' };
    return bellNumbers;
}})();