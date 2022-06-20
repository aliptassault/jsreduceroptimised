(function(){{
    var isTruncated, r = new Ctor(1),
        // Max n of 9007199254740991 takes 53 loop iterations.
        // Maximum digits array length; leaves [28, 34] guard digits.
        k = Math.ceil(pr / LOG_BASE + 4);
    external = false;
    for (;;) {
        if (n % 2) {
            r = r.times(x);
            if (truncate(r.d, k))
                isTruncated = true;
        }
        n = mathfloor(n / 2);
        if (n === 0) {
            // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
            n = r.d.length - 1;
            if (isTruncated && r.d[n] === 0)
                ++r.d[n];
            break;
        }
        x = x.times(x);
        truncate(x.d, k);
    }
    external = true;
    return r;
}})();