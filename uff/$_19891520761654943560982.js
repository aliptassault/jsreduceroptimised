(function(){{
    // Convert to string
    var a = x.d;
    // array with digits
    var r = a[0] + '';
    for (var i = 1; i < a.length; ++i) {
        var s = a[i] + '';
        for (var z = 7 - s.length; z--;) {
            s = '0' + s;
        }
        r += s;
    }
    var j;
    for (j = r.length - 1; r.charAt(j) == '0'; --j);
    var xe = x.e;
    var str = r.slice(0, j + 1 || 1);
    var strL = str.length;
    if (xe > 0) {
        if (++xe > strL) {
            // Append zeros.
            for (xe -= strL; xe--; str += '0');
        } else if (xe < strL) {
            str = str.slice(0, xe) + '.' + str.slice(xe);
        }
    }
    // Convert from base 10 (decimal) to base 2
    var arr = [0];
    for (var i = 0; i < str.length;) {
        for (var arrL = arr.length; arrL--; arr[arrL] *= 10);
        arr[0] += str.charAt(i++) << 0;
        // convert to int
        for (var j = 0; j < arr.length; ++j) {
            if (arr[j] > 1) {
                if (arr[j + 1] == null) {
                    arr[j + 1] = 0;
                }
                arr[j + 1] += arr[j] >> 1;
                arr[j] &= 1;
            }
        }
    }
    return arr.reverse();
}    /***/})();