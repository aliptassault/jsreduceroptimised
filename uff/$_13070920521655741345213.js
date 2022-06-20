(function(){{
    var k, y, len = x.d.length;
    // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
    // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1
    // Estimate the optimum number of times to use the argument reduction.
    if (len < 32) {
        k = Math.ceil(len / 3);
        y = Math.pow(4, -k).toString();
    } else {
        k = 16;
        y = '2.3283064365386962890625e-10';
    }
    Ctor.precision += k;
    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
    // Reverse argument reduction
    for (var i = k; i--;) {
        var cos2x = x.times(x);
        x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
    }
    Ctor.precision -= k;
    return x;
}})();