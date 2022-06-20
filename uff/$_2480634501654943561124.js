(function(){{
    return '\\begin{cases} {' +    $that.trueExpr.toTex(options) + '}, &\\quad{\\text{if }\\;' +    $that.condition.toTex(options) + '}\\\\{' +    $that.falseExpr.toTex(options) + '}, &\\quad{\\text{otherwise}}\\end{cases}';
}})();