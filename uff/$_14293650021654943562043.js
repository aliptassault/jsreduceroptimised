(function(){{
    //TODO add min, max etc
    if ((node.name == 'log' || node.name == 'nthRoot') && node.args.length == 2) {
        return;
    }
    // There should be an incorrect number of arguments if we reach here
    // Change all args to constants to avoid unidentified
    // symbol error when compiling function
    for (var i = 0; i < node.args.length; ++i) {
        node.args[i] = new ConstantNode(0);
    }
    node.compile().eval();
    throw new Error('Expected TypeError, but none found');
}})();