(function(){{
    if (a.re > b.re) {
        return 1;
    }
    if (a.re < b.re) {
        return -1;
    }
    if (a.im > b.im) {
        return 1;
    }
    if (a.im < b.im) {
        return -1;
    }
    return 0;
}})();