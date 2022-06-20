(function(){{
    'use strict';
    function factory(type, config, load) {
        var cs_flip = load(__webpack_require__(83));
        /**
   * Flips the value if it is negative of returns the same value otherwise.
   *
   * @param {Number}  i               The value to flip
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
        var cs_unflip = function (i) {
            // flip the value if it is negative
            return i < 0 ? cs_flip(i) : i;
        };
        return cs_unflip;
    }
    exports.name = 'cs_unflip';
    exports.path = 'sparse';
    exports.factory = factory;    /***/
}})();