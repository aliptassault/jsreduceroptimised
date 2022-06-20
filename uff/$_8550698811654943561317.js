(function(){{
    var w, d =         $that.d, n = NaN;
    if (d) {
        w = d.length - 1;
        n = (w - mathfloor(        $that.e / LOG_BASE)) * LOG_BASE;
        // Subtract the number of trailing zeros of the last word.
        w = d[w];
        if (w)
            for (; w % 10 == 0; w /= 10)
                n--;
        if (n < 0)
            n = 0;
    }
    return n;
}})();