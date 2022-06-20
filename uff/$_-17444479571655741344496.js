(function(){{
    // initialize array for this level
    var cv = [];
    // check we reach the last level
    if (level === s.length - 1) {
        // loop arrays in last level
        for (var i = 0; i < n; i++) {
            // invoke callback and store value
            cv[i] = f(av[i], bv[i]);
        }
    } else {
        // iterate current level
        for (var j = 0; j < n; j++) {
            // iterate next level
            cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
        }
    }
    return cv;
}})();