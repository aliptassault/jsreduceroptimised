(function(){{
    callback(    $that.start, 'start',     $that);
    callback(    $that.end, 'end',     $that);
    if (        $that.step) {
        callback(        $that.step, 'step',         $that);
    }
}})();