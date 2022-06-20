(function(){{
    // note: conversion from number to BigNumber can fail if x has >15 digits
    if (digits(x) > 15) {
        throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' + '(value: ' + x + '). ' + 'Use function bignumber(x) to convert to BigNumber.');
    }
    return new type.BigNumber(x);
}})();