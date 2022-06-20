(function(){{
    var str = number.format(    $that.start, options);
    if (        $that.step != 1) {
        str += ':' + number.format(        $that.step, options);
    }
    str += ':' + number.format(    $that.end, options);
    return str;
}})();