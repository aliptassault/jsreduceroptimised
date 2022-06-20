(function(){{
    var latex = '';
    // Match everything of the form ${identifier} or ${identifier[2]} or $$
    // while submatching identifier and 2 (in the second case)
    var regex = new RegExp('\\$(?:\\{([a-z_][a-z_0-9]*)(?:\\[([0-9]+)\\])?\\}|\\$)', 'ig');
    var inputPos = 0;
    //position in the input string
    var match;
    while ((match = regex.exec(template)) !== null) {
        //go through all matches
        // add everything in front of the match to the LaTeX string
        latex += template.substring(inputPos, match.index);
        inputPos = match.index;
        if (match[0] === '$$') {
            // escaped dollar sign
            latex += '$';
            inputPos++;
        } else {
            // template parameter
            inputPos += match[0].length;
            var property = node[match[1]];
            if (!property) {
                throw new ReferenceError('Template: Property ' + match[1] + ' does not exist.');
            }
            if (match[2] === undefined) {
                //no square brackets
                switch (typeof property) {
                case 'string':
                    latex += property;
                    break;
                case 'object':
                    if (type.isNode(property)) {
                        latex += property.toTex(options);
                    } else if (Array.isArray(property)) {
                        //make array of Nodes into comma separated list
                        latex += property.map(function (arg, index) {
                            if (type.isNode(arg)) {
                                return arg.toTex(options);
                            }
                            throw new TypeError('Template: ' + match[1] + '[' + index + '] is not a Node.');
                        }).join(',');
                    } else {
                        throw new TypeError('Template: ' + match[1] + ' has to be a Node, String or array of Nodes');
                    }
                    break;
                default:
                    throw new TypeError('Template: ' + match[1] + ' has to be a Node, String or array of Nodes');
                }
            } else {
                //with square brackets
                if (type.isNode(property[match[2]] && property[match[2]])) {
                    latex += property[match[2]].toTex(options);
                } else {
                    throw new TypeError('Template: ' + match[1] + '[' + match[2] + '] is not a Node.');
                }
            }
        }
    }
    latex += template.slice(inputPos);
    //append rest of the template
    return latex;
}})();