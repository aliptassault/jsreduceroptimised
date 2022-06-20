(function(){{
    var other =     $that;
    if (valuelessUnit) {
        // Allow getting the numeric value without converting to a different unit
        other =         $that.to(valuelessUnit);
    }
    other.simplifyUnitListLazy();
    if (other._isDerived()) {
        return other._denormalize(other.value);
    } else {
        return other._denormalize(other.value, other.units[0].prefix.value);
    }
}})();