(function(){{
    var value = escape(    $that.value);
    switch (        $that.valueType) {
    case 'number':
        return '<span class="math-number">' + value + '</span>';
    case 'string':
        return '<span class="math-string">' + value + '</span>';
    case 'boolean':
        return '<span class="math-boolean">' + value + '</span>';
    case 'null':
        return '<span class="math-null-symbol">' + value + '</span>';
    case 'undefined':
        return '<span class="math-undefined">' + value + '</span>';
    default:
        return '<span class="math-symbol">' + value + '</span>';
    }
}})();