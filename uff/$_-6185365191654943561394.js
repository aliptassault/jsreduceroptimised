(function(){{
    var i = 0;
    // Subtract b from a.
    for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
    }
    // Remove leading zeros.
    for (; !a[0] && a.length > 1;)
        a.shift();
}})();