(function(){{
    var combinations = load(__webpack_require__(70));
    var add = load(__webpack_require__(20));
    var isPositive = load(__webpack_require__(55));
    var isInteger = load(__webpack_require__(48));
    var larger = load(__webpack_require__(34));
    /**
   * The composition counts of n into k parts.
   *
   * composition only takes integer arguments.
   * The following condition must be enforced: k <= n.
   *
   * Syntax:
   *
   *   math.composition(n, k)
   *
   * Examples:
   *
   *    math.composition(5, 3); // returns 6
   *
   * See also:
   *
   *    combinations
   *
   * @param {Number | BigNumber} n    Total number of objects in the set
   * @param {Number | BigNumber} k    Number of objects in the subset
   * @return {Number | BigNumber}     Returns the composition counts of n into k parts.
   */
    var composition = typed('composition', {
        'number | BigNumber, number | BigNumber': function (n, k) {
            if (!isInteger(n) || !isPositive(n) || !isInteger(k) || !isPositive(k)) {
                throw new TypeError('Positive integer value expected in function composition');
            } else if (larger(k, n)) {
                throw new TypeError('k must be less than or equal to n in function composition');
            }
            return combinations(add(n, -1), add(k, -1));
        }
    });
    composition.toTex = undefined;
    // use default template
    return composition;
}})();