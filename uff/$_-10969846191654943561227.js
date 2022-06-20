(function(){{
    var index = load(__webpack_require__(27));
    var concat = load(__webpack_require__(64));
    var size = load(__webpack_require__(28));
    var sort = load(__webpack_require__(140));
    var subset = load(__webpack_require__(22));
    var setDifference = load(__webpack_require__(142));
    /**
   * Create the symmetric difference of two (multi)sets.
   * Multi-dimension arrays will be converted to single-dimension arrays before the operation.
   *
   * Syntax:
   *
   *    math.setSymDifference(set1, set2)
   *
   * Examples:
   *
   *    math.setSymDifference([1, 2, 3, 4], [3, 4, 5, 6]);            // returns [1, 2, 5, 6]
   *    math.setSymDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]]);    // returns [1, 2, 5, 6]
   *
   * See also:
   *
   *    setUnion, setIntersect, setDifference
   *
   * @param {Array | Matrix}    a1  A (multi)set
   * @param {Array | Matrix}    a2  A (multi)set
   * @return {Array | Matrix}    The symmetric difference of two (multi)sets
   */
    var setSymDifference = typed('setSymDifference', {
        'Array | Matrix, Array | Matrix': function (a1, a2) {
            if (subset(size(a1), new index(0)) === 0) {
                // if any of them is empty, return the other one
                return flatten(a2);
            } else if (subset(size(a2), new index(0)) === 0) {
                return flatten(a1);
            }
            var b1 = flatten(a1);
            var b2 = flatten(a2);
            return concat(setDifference(b1, b2), setDifference(b2, b1));
        }
    });
    return setSymDifference;
}})();