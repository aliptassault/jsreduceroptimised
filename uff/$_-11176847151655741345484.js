(function(){{
    var res =     $that.clone();
    for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
        // Dimensions arrays may be of different lengths. Default to 0.
        res.dimensions[i] = (        $that.dimensions[i] || 0) * p;
    }
    // Adjust the power of each unit in the list
    for (var i = 0; i < res.units.length; i++) {
        res.units[i].power *= p;
    }
    if (res.value != null) {
        res.value = pow(res.value, p);    // only allow numeric output, we don't want to return a Complex number
                                          //if (!isNumeric(res.value)) {
                                          //  res.value = NaN;
                                          //}
                                          // Update: Complex supported now
    } else {
        res.value = null;
    }
    // Trigger lazy evaluation of the unit list
    res.isUnitListSimplified = false;
    return getNumericIfUnitless(res);
}})();