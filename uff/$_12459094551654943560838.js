(function(){{
    var args =     $that.args.map(function (arg) {
        //get LaTeX of the arguments
        return arg.toTex(options);
    });
    var latexConverter;
    if (math[        $that.name] && (typeof math[        $that.name].toTex === 'function' || typeof math[        $that.name].toTex === 'object' || typeof math[        $that.name].toTex === 'string')) {
        //.toTex is a callback function
        latexConverter = math[        $that.name].toTex;
    }
    var customToTex;
    switch (typeof latexConverter) {
    case 'function':
        //a callback function
        customToTex = latexConverter(        $that, options);
        break;
    case 'string':
        //a template string
        customToTex = expandTemplate(latexConverter,         $that, options);
        break;
    case 'object':
        //an object with different "converters" for different numbers of arguments
        switch (typeof latexConverter[args.length]) {
        case 'function':
            customToTex = latexConverter[args.length](            $that, options);
            break;
        case 'string':
            customToTex = expandTemplate(latexConverter[args.length],             $that, options);
            break;
        }
    }
    if (typeof customToTex !== 'undefined') {
        return customToTex;
    }
    return expandTemplate(latex.defaultTemplate,     $that, options);
}})();