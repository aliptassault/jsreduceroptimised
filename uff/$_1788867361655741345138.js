(function(){{
    var self =     $that;
    function listener() {
        self.off(name, listener);
        callback.apply(ctx, arguments);
    }
    ;
    listener._ = callback;
    return    $that.on(name, listener, ctx);
}})();