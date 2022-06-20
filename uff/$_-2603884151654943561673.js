(function(){{
    if (        $that.units.length !== 1) {
        throw new Error('Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!');
    }
    if (Math.abs(        $that.units[0].power - Math.round(        $that.units[0].power)) >= 1e-14) {
        throw new Error('Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!');
    }
    // find the best prefix value (resulting in the value of which
    // the absolute value of the log10 is closest to zero,
    // though with a little offset of 1.2 for nicer values: you get a
    // sequence 1mm 100mm 500mm 0.6m 1m 10m 100m 500m 0.6km 1km ...
    // Note: the units value can be any numeric type, but to find the best
    // prefix it's enough to work with limited precision of a regular number
    // Update: using mathjs abs since we also allow complex numbers
    var absValue = abs(    $that.value);
    var absUnitValue = abs(    $that.units[0].unit.value);
    var bestPrefix =     $that.units[0].prefix;
    if (absValue === 0) {
        return bestPrefix;
    }
    var power =     $that.units[0].power;
    var bestDiff = Math.log(absValue / Math.pow(bestPrefix.value * absUnitValue, power)) / Math.LN10 - 1.2;
    if (bestDiff > -2.200001 && bestDiff < 1.800001)
        return bestPrefix;
    // Allow the original prefix
    bestDiff = Math.abs(bestDiff);
    var prefixes =     $that.units[0].unit.prefixes;
    for (var p in prefixes) {
        if (prefixes.hasOwnProperty(p)) {
            var prefix = prefixes[p];
            if (prefix.scientific) {
                var diff = Math.abs(Math.log(absValue / Math.pow(prefix.value * absUnitValue, power)) / Math.LN10 - 1.2);
                if (diff < bestDiff || diff === bestDiff && prefix.name.length < bestPrefix.name.length) {
                    // choose the prefix with the smallest diff, or if equal, choose the one
                    // with the shortest name (can happen with SHORTLONG for example)
                    bestPrefix = prefix;
                    bestDiff = diff;
                }
            }
        }
    }
    return bestPrefix;
}})();