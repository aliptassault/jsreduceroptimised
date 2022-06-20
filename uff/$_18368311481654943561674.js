(function(){{
    var x =     $that.clone();
    var ret = [];
    for (var i = 0; i < parts.length; i++) {
        // Convert x to the requested unit
        x = x.to(parts[i]);
        if (i == parts.length - 1)
            break;
        // Get the numeric value of this unit
        var xNumeric = x.toNumeric();
        // Check to see if xNumeric is nearly equal to an integer,
        // since fix can incorrectly round down if there is round-off error
        var xRounded = round(xNumeric);
        var xFixed;
        var isNearlyEqual = equal(xRounded, xNumeric);
        if (isNearlyEqual) {
            xFixed = xRounded;
        } else {
            xFixed = fix(x.toNumeric());
        }
        var y = new Unit(xFixed, parts[i].toString());
        ret.push(y);
        x = subtract(x, y);
    }
    // This little bit fixes a bug where the remainder should be 0 but is a little bit off.
    // But instead of comparing x, the remainder, with zero--we will compare the sum of
    // all the parts so far with the original value. If they are nearly equal,
    // we set the remainder to 0.
    var testSum = 0;
    for (var i = 0; i < ret.length; i++) {
        testSum = add(testSum, ret[i].value);
    }
    if (equal(testSum,         $that.value)) {
        x.value = 0;
    }
    ret.push(x);
    return ret;
}})();