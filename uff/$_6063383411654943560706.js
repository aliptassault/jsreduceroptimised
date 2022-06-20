(function(){{
    var hasBigNumbers = false;
    size.forEach(function (value, index, arr) {
        if (type.isBigNumber(value)) {
            hasBigNumbers = true;
            arr[index] = value.toNumber();
        }
    });
    return hasBigNumbers;
}})();