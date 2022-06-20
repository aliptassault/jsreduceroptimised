(function(){{
    if (!(        $that instanceof DimensionError)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
        $that.actual = actual;
        $that.expected = expected;
        $that.relation = relation;
        $that.message = 'Dimension mismatch (' + (Array.isArray(actual) ? '[' + actual.join(', ') + ']' : actual) + ' ' + (    $that.relation || '!=') + ' ' + (Array.isArray(expected) ? '[' + expected.join(', ') + ']' : expected) + ')';
        $that.stack = new Error().stack;
}})();