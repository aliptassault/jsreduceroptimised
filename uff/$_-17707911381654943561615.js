(function(){{
    // check row is on the bottom side
    if (bottom - top === 0)
        return bottom;
    // loop rows [top, bottom[
    for (var r = top; r < bottom; r++) {
        // check we found value index
        if (index[r] === i)
            return r;
    }
    // we did not find row
    return top;
}})();