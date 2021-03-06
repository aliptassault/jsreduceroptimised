(function(){{
    var distribution = load(__webpack_require__(89));
    /**
   * Random pick one or more values from a one dimensional array.
   * Array elements are picked using a random function with uniform or weighted distribution.
   *
   * Syntax:
   *
   *     math.pickRandom(array)
   *     math.pickRandom(array, number)
   *     math.pickRandom(array, weights)
   *     math.pickRandom(array, number, weights)
   *     math.pickRandom(array, weights, number)
   *
   * Examples:
   *
   *     math.pickRandom([3, 6, 12, 2]);                  // returns one of the values in the array
   *     math.pickRandom([3, 6, 12, 2], 2);               // returns an array of two of the values in the array
   *     math.pickRandom([3, 6, 12, 2], [1, 3, 2, 1]);    // returns one of the values in the array with weighted distribution
   *     math.pickRandom([3, 6, 12, 2], 2, [1, 3, 2, 1]); // returns an array of two of the values in the array with weighted distribution
   *     math.pickRandom([3, 6, 12, 2], [1, 3, 2, 1], 2); // returns an array of two of the values in the array with weighted distribution
   *
   * See also:
   *
   *     random, randomInt
   *
   * @param {Array} array     A one dimensional array
   * @param {Int} number      An int or float
   * @param {Array} weights   An array of ints or floats
   * @return {number} One of the elements of the provided input array
   * @return {array} An array of elements of the provided input array
   */
    // TODO: rework pickRandom to a typed-function
    var pickRandom = distribution('uniform').pickRandom;
    pickRandom.toTex = undefined;
    // use default template
    return pickRandom;
}})();