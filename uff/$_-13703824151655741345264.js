(function(){{
    var i, n, t = new        $that(0);
    external = false;
    for (i = 0; i < arguments.length;) {
        n = new        $that(arguments[i++]);
        if (!n.d) {
            if (n.s) {
                external = true;
                return new                $that(1 / 0);
            }
            t = n;
        } else if (t.d) {
            t = t.plus(n.times(n));
        }
    }
    external = true;
    return t.sqrt();
}})();