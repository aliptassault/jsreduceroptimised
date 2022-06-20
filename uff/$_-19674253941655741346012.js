(function(){{
    var matrix = load(__webpack_require__(0));
    /**
   * Filter the items in an array or one dimensional matrix.
   *
   * Syntax:
   *
   *    math.filter(x, test)
   *
   * Examples:
   *
   *    function isPositive (x) {
   *      return x > 0;
   *    }
   *    math.filter([6, -2, -1, 4, 3], isPositive); // returns [6, 4, 3]
   *
   *    math.filter(["23", "foo", "100", "55", "bar"], /[0-9]+/); // returns ["23", "100", "55"]
   *
   * See also:
   *
   *    forEach, map, sort
   *
   * @param {Matrix | Array} x    A one dimensional matrix or array to filter
   * @param {Function | RegExp} test
   *        A function or regular expression to test items.
   *        All entries for which `test` returns true are returned.
   *        When `test` is a function, it is invoked with three parameters:
   *        the value of the element, the index of the element, and the
   *        matrix/array being traversed. The function must return a boolean.
   * @return {Matrix | Array} Returns the filtered matrix.
   */
    var filter = typed('filter', {
        'Array, function': _filterCallback,
        'Matrix, function': function (x, test) {
            return matrix(_filterCallback(x.toArray(), test));
        },
        'Array, RegExp': filterRegExp,
        'Matrix, RegExp': function (x, test) {
            return matrix(filterRegExp(x.toArray(), test));
        }
    });
    filter.toTex = undefined;
    // use default template
    return filter;
}})();