(function(){{
    var index = load(__webpack_require__(27));
    var concat = load(__webpack_require__(64));
    var size = load(__webpack_require__(28));
    var subset = load(__webpack_require__(22));
    var setIntersect = load(__webpack_require__(143));
    var setSymDifference = load(__webpack_require__(144));
    /**
   * Create the union of two (multi)sets.
   * Multi-dimension arrays will be converted to single-dimension arrays before the operation.
   *
   * Syntax:
   *
   *    math.setUnion(set1, set2)
   *
   * Examples:
   *
   *    math.setUnion([1, 2, 3, 4], [3, 4, 5, 6]);            // returns [1, 2, 3, 4, 5, 6]
   *    math.setUnion([[1, 2], [3, 4]], [[3, 4], [5, 6]]);    // returns [1, 2, 3, 4, 5, 6]
   *
   * See also:
   *
   *    setIntersect, setDifference
   *
   * @param {Array | Matrix}    a1  A (multi)set
   * @param {Array | Matrix}    a2  A (multi)set
   * @return {Array | Matrix}    The union of two (multi)sets
   */
    var setUnion = typed('setUnion', {
        'Array | Matrix, Array | Matrix': function (a1, a2) {
            if (subset(size(a1), new index(0)) === 0) {
                // if any of them is empty, return the other one
                return flatten(a2);
            } else if (subset(size(a2), new index(0)) === 0) {
                return flatten(a1);
            }
            var b1 = flatten(a1);
            var b2 = flatten(a2);
            return concat(setSymDifference(b1, b2), setIntersect(b1, b2));
        }
    });
    return setUnion;
}})();