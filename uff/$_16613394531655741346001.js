(function(){{
    var yDiff = y2 - y1;
    var xDiff = x2 - x1;
    var radicant = yDiff * yDiff + xDiff * xDiff;
    var result = Math.pow(radicant, 0.5);
    return result;
}})();