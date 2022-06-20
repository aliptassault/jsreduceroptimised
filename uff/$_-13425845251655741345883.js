(function(){{
    var range = load(__webpack_require__(117));
    return typed('range', {
        '...any': function (args) {
            var lastIndex = args.length - 1;
            var last = args[lastIndex];
            if (typeof last !== 'boolean') {
                // append a parameter includeEnd=true
                args.push(true);
            }
            return range.apply(null, args);
        }
    });
}})();