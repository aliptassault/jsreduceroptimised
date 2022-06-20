(function(){{
    var isUnit = false;
    if (typeof math[        $that.name] === 'undefined' && isValuelessUnit(        $that.name)) {
        isUnit = true;
    }
    var symbol = latex.toSymbol(    $that.name, isUnit);
    if (symbol[0] === '\\') {
        //no space needed if the symbol starts with '\'
        return symbol;
    }
    //the space prevents symbols from breaking stuff like '\cdot' if it's written right before the symbol
    return ' ' + symbol;
}})();