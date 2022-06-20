(function(){{
    if (x.re > y.re) {
        return 1;
    }
    if (x.re < y.re) {
        return -1;
    }
    if (x.im > y.im) {
        return 1;
    }
    if (x.im < y.im) {
        return -1;
    }
    return 0;
}})();