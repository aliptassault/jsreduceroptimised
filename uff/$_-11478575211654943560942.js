(function(){{
    // format the parameters like "[1, 0:5]"
    var dimensions = [];
    for (var i = 0; i <        $that.dimensions.length; i++) {
        dimensions[i] =         $that.dimensions[i].toHTML();
    }
    if (        $that.dotNotation) {
        return '<span class="math-operator math-accessor-operator">.</span>' + '<span class="math-symbol math-property">' + escape(        $that.getObjectProperty()) + '</span>';
    } else {
        return '<span class="math-parenthesis math-square-parenthesis">[</span>' + dimensions.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
    }
}})();