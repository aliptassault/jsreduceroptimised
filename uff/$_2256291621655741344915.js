(function(){{
    var len = 0, start =         $that.start, step =         $that.step, end =         $that.end, diff = end - start;
    if (number.sign(step) == number.sign(diff)) {
        len = Math.ceil(diff / step);
    } else if (diff == 0) {
        len = 0;
    }
    if (isNaN(len)) {
        len = 0;
    }
    return [len];
}})();