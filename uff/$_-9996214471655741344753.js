(function(){{
    var value =         $that.value, index;
    switch (        $that.valueType) {
    case 'string':
        return '\\mathtt{' + stringify(value) + '}';
    case 'number':
        index = value.toLowerCase().indexOf('e');
        if (index !== -1) {
            return value.substring(0, index) + '\\cdot10^{' + value.substring(index + 1) + '}';
        }
        return value;
    default:
        return value;
    }
}})();