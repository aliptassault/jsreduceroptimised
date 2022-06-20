(function(){{
    var y, x = new Ctor(args[0]), i = 0;
    for (; ++i < args.length;) {
        y = new Ctor(args[i]);
        if (!y.s) {
            x = y;
            break;
        } else if (x[ltgt](y)) {
            x = y;
        }
    }
    return x;
}})();