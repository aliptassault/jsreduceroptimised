(function(){{
    var entries = [];
    for (var key in        $that.properties) {
        if (            $that.properties.hasOwnProperty(key)) {
            entries.push('\\mathbf{' + key + ':} & ' +            $that.properties[key].toTex(options) + '\\\\');
        }
    }
    return '\\left\\{\\begin{array}{ll}' + entries.join('\n') + '\\end{array}\\right\\}';
}})();