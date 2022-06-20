(function(){{
    var w = digits[0];
    // Add the number of digits of the first word of the digits array.
    for (e *= LOG_BASE; w >= 10; w /= 10)
        e++;
    return e;
}})();