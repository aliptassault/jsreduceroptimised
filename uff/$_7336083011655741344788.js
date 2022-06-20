(function(){{
    var argPrecedence = operators.getPrecedence(arg, parenthesis);
    var assocWithArg = operators.isAssociativeWith(root, arg, parenthesis);
    var argAssociativity = operators.getAssociativity(arg, parenthesis);
    if (argPrecedence === null) {
        //if the argument has no defined precedence, no parens are needed
        return false;
    } else if (precedence === argPrecedence && associativity === argAssociativity && !assocWithArg) {
        return true;
    } else if (argPrecedence < precedence) {
        return true;
    }
    return false;
}})();