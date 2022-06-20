(function(){{
    var s = '\\begin{bmatrix}';
        $that.items.forEach(function (node) {
        if (node.items) {
            s += node.items.map(function (childNode) {
                return childNode.toTex(options);
            }).join('&');
        } else {
            s += node.toTex(options);
        }
        // new line
        s += '\\\\';
    });
    s += '\\end{bmatrix}';
    return s;
}})();