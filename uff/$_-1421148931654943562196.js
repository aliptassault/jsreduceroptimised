(function(){{
    var add = load(__webpack_require__(18));
    var multiply = load(__webpack_require__(12));
    var divide = load(__webpack_require__(47));
    var factorial = load(__webpack_require__(69));
    var isInteger = load(__webpack_require__(48));
    var isPositive = load(__webpack_require__(55));
    /**
   * Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities.
   *
   * multinomial takes one array of integers as an argument.
   * The following condition must be enforced: every ai <= 0
   *
   * Syntax:
   *
   *     math.multinomial(a) // a is an array type
   *
   * Examples:
   *
   *    math.multinomial([1,2,1]); // returns 12
   *
   * See also:
   *
   *    combinations, factorial
   *
   * @param {number[] | BigNumber[]} a    Integer numbers of objects in the subset
   * @return {Number | BigNumber}         Multinomial coefficient.
   */
    return typed('multinomial', {
        'Array | Matrix': function (a) {
            var sum = 0;
            var denom = 1;
            deepForEach(a, function (ai) {
                if (!isInteger(ai) || !isPositive(ai)) {
                    throw new TypeError('Positive integer value expected in function multinomial');
                }
                sum = add(sum, ai);
                denom = multiply(denom, factorial(ai));
            });
            return divide(factorial(sum), denom);
        }
    });
}})();