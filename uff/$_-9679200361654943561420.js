(function(){{
    var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
    external = false;
    x2 = x.times(x);
    u = new Ctor(y);
    for (;;) {
        t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
        u = isHyperbolic ? y.plus(t) : y.minus(t);
        y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
        t = u.plus(y);
        if (t.d[k] !== void 0) {
            for (j = k; t.d[j] === u.d[j] && j--;);
            if (j == -1)
                break;
        }
        j = u;
        u = y;
        y = t;
        t = j;
        i++;
    }
    external = true;
    t.d.length = k + 1;
    return t;
}})();