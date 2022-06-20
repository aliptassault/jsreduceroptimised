(function(){{
    var dimensions =     $that.dimensions.map(function (range) {
        return range.toTex(options);
    });
    return    $that.dotNotation ? '.' +    $that.getObjectProperty() + '' : '_{' + dimensions.join(',') + '}';
}})();