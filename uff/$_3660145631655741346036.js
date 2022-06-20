(function(){{
    var equal = load(__webpack_require__(30));
    var index = load(__webpack_require__(27));
    var matrix = load(__webpack_require__(43));
    var size = load(__webpack_require__(28));
    var subset = load(__webpack_require__(22));
    var compareNatural = load(__webpack_require__(31));
    /**
   * Collect the distinct elements of a multiset.
   * A multi-dimension array will be converted to a single-dimension array before the operation.
   *
   * Syntax:
   *
   *    math.setDistinct(set)
   *
   * Examples:
   *
   *    math.setDistinct([1, 1, 1, 2, 2, 3]);        // returns [1, 2, 3]
   *
   * See also:
   *
   *    setMultiplicity
   *
   * @param {Array | Matrix}    a  A multiset
   * @return {Array | Matrix}    A set containing the distinc elements of the multiset
   */
    var setDistinct = typed('setDistinct', {
        'Array | Matrix': function (a) {
            if (subset(size(a), new index(0)) === 0) {
                // if empty, return empty
                var result = [];
            } else {
                var b = flatten(Array.isArray(a) ? a : a.toArray()).sort(compareNatural);
                var result = [];
                result.push(b[0]);
                for (var i = 1; i < b.length; i++) {
                    if (!equal(b[i], b[i - 1])) {
                        result.push(b[i]);
                    }
                }
            }
            // return an array, if the input was an array
            if (Array.isArray(a)) {
                return result;
            }
            // return a matrix otherwise
            return new matrix(result);
        }
    });
    return setDistinct;
}})();