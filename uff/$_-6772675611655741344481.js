(function(){{
    return value.toExponential().replace(/e.*$/, '')    // remove exponential notation
.replace(/^0\.?0*|\./, '')    // remove decimal point and leading zeros
.length;
}})();