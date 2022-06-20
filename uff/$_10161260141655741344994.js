(function(){{
    if (!(node instanceof ConditionalNode)) {
        throw new TypeError('No valid ConditionalNode');
    }
    /**
     * Test whether a condition is met
     * @param {*} condition
     * @returns {boolean} true if condition is true or non-zero, else false
     */
    defs.testCondition = function (condition) {
        if (typeof condition === 'number' || typeof condition === 'boolean' || typeof condition === 'string') {
            return condition ? true : false;
        }
        if (condition) {
            if (type.isBigNumber(condition)) {
                return condition.isZero() ? false : true;
            }
            if (type.isComplex(condition)) {
                return condition.re || condition.im ? true : false;
            }
            if (type.isUnit(condition)) {
                return condition.value ? true : false;
            }
        }
        if (condition === null || condition === undefined) {
            return false;
        }
        throw new TypeError('Unsupported type of condition "' + defs.math['typeof'](condition) + '"');
    };
    return 'testCondition(' + compile(node.condition, defs, args) + ') ? ' + '( ' + compile(node.trueExpr, defs, args) + ') : ' + '( ' + compile(node.falseExpr, defs, args) + ')';
}})();