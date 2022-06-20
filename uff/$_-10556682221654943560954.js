(function(){{
    return new RangeNode(    $that._ifNode(callback(    $that.start, 'start',     $that)),     $that._ifNode(callback(    $that.end, 'end',     $that)),     $that.step &&    $that._ifNode(callback(    $that.step, 'step',     $that)));
}})();