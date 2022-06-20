(function(){{
    var equal = load(__webpack_require__(30));
    var index = load(__webpack_require__(27));
    var size = load(__webpack_require__(28));
    var subset = load(__webpack_require__(22));
    /**
   * Count the multiplicity of an element in a multiset.
   * A multi-dimension array will be converted to a single-dimension array before the operation.
   *
   * Syntax:
   *
   *    math.setMultiplicity(element, set)
   *
   * Examples:
   *
   *    math.setMultiplicity(1, [1, 2, 2, 4]);    // returns 1
   *    math.setMultiplicity(2, [1, 2, 2, 4]);    // returns 2
   *
   * See also:
   *
   *    setDistinct, setSize
   *
   * @param {number | BigNumber | Fraction | Complex} e  An element in the multiset
   * @param {Array | Matrix}     a  A multiset
   * @return {number}            The number of how many times the multiset contains the element
   */
    var setMultiplicity = typed('setMultiplicity', {
        'number | BigNumber | Fraction | Complex, Array | Matrix': function (e, a) {
            if (subset(size(a), new index(0)) === 0) {
                // if empty, return 0
                return 0;
            }
            var b = flatten(Array.isArray(a) ? a : a.toArray());
            var count = 0;
            for (var i = 0; i < b.length; i++) {
                if (equal(b[i], e)) {
                    count++;
                }
            }
            return count;
        }
    });
    return setMultiplicity;
}})();