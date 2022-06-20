(function(){{
    var name = escape(    $that.name);
    if (name == 'true' || name == 'false') {
        return '<span class="math-symbol math-boolean">' + name + '</span>';
    } else if (name == 'i') {
        return '<span class="math-symbol math-imaginary-symbol">' + name + '</span>';
    } else if (name == 'Infinity') {
        return '<span class="math-symbol math-infinity-symbol">' + name + '</span>';
    } else if (name == 'NaN') {
        return '<span class="math-symbol math-nan-symbol">' + name + '</span>';
    } else if (name == 'null') {
        return '<span class="math-symbol math-null-symbol">' + name + '</span>';
    } else if (name == 'uninitialized') {
        return '<span class="math-symbol math-uninitialized-symbol">' + name + '</span>';
    }
    return '<span class="math-symbol">' + name + '</span>';
}})();