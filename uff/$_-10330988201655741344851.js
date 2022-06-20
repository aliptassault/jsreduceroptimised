(function(){{
    // format the parameters like "[1, 0:5]"
    return    $that.dotNotation ? '.' +    $that.getObjectProperty() : '[' +    $that.dimensions.join(', ') + ']';
}})();