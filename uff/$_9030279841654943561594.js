(function(){{
    var t;
    var a =     $that['n'];
    var b =     $that['d'];
    var res = [];
    do {
        res.push(Math.floor(a / b));
        t = a % b;
        a = b;
        b = t;
    } while (a !== 1);
    return res;
}})();