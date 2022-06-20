(function(){{
    for (; d % 2 === 0; d /= 2) {
    }
    for (; d % 5 === 0; d /= 5) {
    }
    if (d === 1)
        // Catch non-cyclic numbers
        return 0;
    // If we would like to compute really large numbers quicker, we could make use of Fermat's little theorem:
    // 10^(d-1) % d == 1
    // However, we don't need such large numbers and MAX_CYCLE_LEN should be the capstone,
    // as we want to translate the numbers to strings.
    var rem = 10 % d;
    for (var t = 1; rem !== 1; t++) {
        rem = rem * 10 % d;
        if (t > MAX_CYCLE_LEN)
            return 0;    // Returning 0 here means that we don't print it as a cyclic number. It's likely that the answer is `d-1`
    }
    return t;
}})();