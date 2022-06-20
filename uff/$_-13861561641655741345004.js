(function(){{
    if (!(node instanceof FunctionAssignmentNode)) {
        throw new TypeError('No valid FunctionAssignmentNode');
    }
    defs.typed = typed;
    defs.setSafeProperty = setSafeProperty;
    // validate params
    // FIXME: rename parameters to safe, internal names
    // we extend the original args and add the args to the child object
    // and create a mapping from the unsafe param name to a safe, internal one
    var childArgs = Object.create(args);
    var jsParams = map(node.params, function (param) {
        childArgs[param] = getUniqueArgumentName(childArgs);
        return childArgs[param];
    });
    // compile the function expression with the child args
    var jsExpr = compile(node.expr, defs, childArgs);
    var jsName = stringify(node.name);
    return 'setSafeProperty(scope, ' + jsName + ', ' + '  (function () {' + '    var fn = typed(' + jsName + ', {' + '      ' + stringify(join(node.types, ',')) + ': function (' + join(jsParams, ',') + ') {' + '        return ' + jsExpr + '' + '      }' + '    });' + '    fn.syntax = ' + stringify(node.name + '(' + join(node.params, ', ') + ')') + ';' + '    return fn;' + '  })())';
}})();