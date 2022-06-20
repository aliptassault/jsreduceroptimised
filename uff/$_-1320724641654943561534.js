(function(){{
    // acosh(c) = log(c + sqrt(c^2 - 1))
    var tmp;
    var res =     $that['acos']();
    if (res['im'] <= 0) {
        tmp = res['re'];
        res['re'] = -res['im'];
        res['im'] = tmp;
    } else {
        tmp = res['im'];
        res['im'] = -res['re'];
        res['re'] = tmp;
    }
    return res;
}})();