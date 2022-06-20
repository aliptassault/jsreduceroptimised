(function(){{
    var entries = [];
    for (var key in        $that.properties) {
        if (            $that.properties.hasOwnProperty(key)) {
            entries.push('<span class="math-symbol math-property">' + escape(key) + '</span>' + '<span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' +            $that.properties[key].toHTML(options));
        }
    }
    return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + entries.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>';
}})();