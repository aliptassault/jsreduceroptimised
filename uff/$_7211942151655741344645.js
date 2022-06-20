(function(){{
    return Object.keys(fn.signatures || {}).reduce(function (args, signature) {
        var count = (signature.match(/,/g) || []).length + 1;
        return Math.max(args, count);
    }, -1);
}})();