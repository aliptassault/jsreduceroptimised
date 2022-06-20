(function(){{
    if (root < 0)
        throw new Error('Root must be greater than zero');
    if (root === 0)
        throw new Error('Root must be non-zero');
    if (root % 1 !== 0)
        throw new Error('Root must be an integer');
    var arg = a.arg();
    var abs = a.abs();
    var roots = [];
    var r = Math.pow(abs, 1 / root);
    for (var k = 0; k < root; k++) {
        roots.push({
            r: r,
            phi: (arg + 2 * Math.PI * k) / root
        });
    }
    return roots;
}})();