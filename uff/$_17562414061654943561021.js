(function(){{
    var x =     $that.start;
    var step =     $that.step;
    var end =     $that.end;
    var i = 0;
    if (step > 0) {
        while (x < end) {
            callback(x, [i],             $that);
            x += step;
            i++;
        }
    } else if (step < 0) {
        while (x > end) {
            callback(x, [i],             $that);
            x += step;
            i++;
        }
    }
}})();