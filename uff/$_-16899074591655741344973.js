(function(){{
    callback(    $that.object, 'object',     $that);
    if (        $that.index) {
        callback(        $that.index, 'index',         $that);
    }
    callback(    $that.value, 'value',     $that);
}})();