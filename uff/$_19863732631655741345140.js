(function(){{
    if (value && typeof value.transform === 'function') {
        math.expression.transform[name] = value.transform;
        if (allowedInExpressions(name)) {
            math.expression.mathWithTransform[name] = value.transform;
        }
    } else {
        // remove existing transform
        delete math.expression.transform[name];
        if (allowedInExpressions(name)) {
            math.expression.mathWithTransform[name] = value;
        }
    }
}})();