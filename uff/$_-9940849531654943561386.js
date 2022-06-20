(function(){{
    if (i !== ~~i || i < min || i > max) {
        throw Error(invalidArgument + i);
    }
}})();