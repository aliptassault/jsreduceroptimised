(function(){{
    if (exports.size(array).length !== 1) {
        throw new Error('Only one dimensional matrices supported');
    }
    return Array.prototype.filter.call(array, callback);
}})();