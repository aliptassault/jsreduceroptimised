(function(){{
    if (options[name] !== undefined && !contains(values, options[name])) {
        var index = findIndex(values, options[name]);
        if (index !== -1) {
            // right value, wrong casing
            // TODO: lower case values are deprecated since v3, remove this warning some day.
            console.warn('Warning: Wrong casing for configuration option "' + name + '", should be "' + values[index] + '" instead of "' + options[name] + '".');
            options[name] = values[index];    // change the option to the right casing
        } else {
            // unknown value
            console.warn('Warning: Unknown value "' + options[name] + '" for configuration option "' + name + '". Available options: ' + values.map(JSON.stringify).join(', ') + '.');
        }
    }
}})();