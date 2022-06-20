(function(){{
    var wrapper = function wrapper() {
        var args = [];
        for (var i = 0, len = arguments.length; i < len; i++) {
            var arg = arguments[i];
            args[i] = arg && arg.valueOf();
        }
        return fn.apply(math, args);
    };
    if (fn.transform) {
        wrapper.transform = fn.transform;
    }
    return wrapper;
}})();