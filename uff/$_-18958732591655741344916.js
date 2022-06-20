(function(){{
    var size =     $that.size()[0];
    if (size > 0) {
        if (            $that.step > 0) {
            // positive step
            return            $that.start;
        } else {
            // negative step
            return            $that.start + (size - 1) *            $that.step;
        }
    } else {
        return undefined;
    }
}})();