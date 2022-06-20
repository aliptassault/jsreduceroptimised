(function(){{
    // asinh(c) = log(c + sqrt(c^2 + 1))
    var tmp =     $that['im'];
        $that['im'] = -    $that['re'];
        $that['re'] = tmp;
    var res =     $that['asin']();
        $that['re'] = -    $that['im'];
        $that['im'] = tmp;
    tmp = res['re'];
    res['re'] = -res['im'];
    res['im'] = tmp;
    return res;
}})();