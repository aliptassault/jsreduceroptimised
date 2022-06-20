(function(){{
    // atanh(c) = log((1+c) / (1-c)) / 2
    var a =     $that['re'];
    var b =     $that['im'];
    var noIM = a > 1 && b === 0;
    var oneMinus = 1 - a;
    var onePlus = 1 + a;
    var d = oneMinus * oneMinus + b * b;
    var x = d !== 0 ? new Complex((onePlus * oneMinus - b * b) / d, (b * oneMinus + onePlus * b) / d) : new Complex(a !== -1 ? a / 0 : 0, b !== 0 ? b / 0 : 0);
    var temp = x['re'];
    x['re'] = logHypot(x['re'], x['im']) / 2;
    x['im'] = Math.atan2(x['im'], temp) / 2;
    if (noIM) {
        x['im'] = -x['im'];
    }
    return x;
}})();