(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var implicit = options && options.implicit ? options.implicit : 'hide';
    var args =     $that.args;
    var parens = calculateNecessaryParentheses(    $that, parenthesis, implicit, args, true);
    var op = latex.operators[    $that.fn];
    op = typeof op === 'undefined' ?     $that.op : op;
    //fall back to using this.op
    if (args.length === 1) {
        //unary operators
        var assoc = operators.getAssociativity(        $that, parenthesis);
        var operand = args[0].toTex(options);
        if (parens[0]) {
            operand = '\\left(' + operand + '\\right)';
        }
        if (assoc === 'right') {
            //prefix operator
            return op + operand;
        } else if (assoc === 'left') {
            //postfix operator
            return operand + op;
        }
        //fall back to postfix
        return operand + op;
    } else if (args.length === 2) {
        //binary operators
        var lhs = args[0];
        //left hand side
        var lhsTex = lhs.toTex(options);
        if (parens[0]) {
            lhsTex = '\\left(' + lhsTex + '\\right)';
        }
        var rhs = args[1];
        //right hand side
        var rhsTex = rhs.toTex(options);
        if (parens[1]) {
            rhsTex = '\\left(' + rhsTex + '\\right)';
        }
        //handle some exceptions (due to the way LaTeX works)
        var lhsIdentifier;
        if (parenthesis === 'keep') {
            lhsIdentifier = lhs.getIdentifier();
        } else {
            //Ignore ParenthesisNodes if in 'keep' mode
            lhsIdentifier = lhs.getContent().getIdentifier();
        }
        switch (            $that.getIdentifier()) {
        case 'OperatorNode:divide':
            //op contains '\\frac' at this point
            return op + '{' + lhsTex + '}' + '{' + rhsTex + '}';
        case 'OperatorNode:pow':
            lhsTex = '{' + lhsTex + '}';
            rhsTex = '{' + rhsTex + '}';
            switch (lhsIdentifier) {
            case 'ConditionalNode':
            //
            case 'OperatorNode:divide':
                lhsTex = '\\left(' + lhsTex + '\\right)';
            }
        case 'OperatorNode:multiply':
            if (                $that.implicit && implicit === 'hide') {
                return lhsTex + '~' + rhsTex;
            }
        }
        return lhsTex + op + rhsTex;
    } else if (args.length > 2 && (        $that.getIdentifier() === 'OperatorNode:add' ||        $that.getIdentifier() === 'OperatorNode:multiply')) {
        var texifiedArgs = args.map(function (arg, index) {
            arg = arg.toTex(options);
            if (parens[index]) {
                arg = '\\left(' + arg + '\\right)';
            }
            return arg;
        });
        if (            $that.getIdentifier() === 'OperatorNode:multiply' &&            $that.implicit) {
            return texifiedArgs.join('~');
        }
        return texifiedArgs.join(op);
    } else {
        //fall back to formatting as a function call
        //as this is a fallback, it doesn't use
        //fancy function names
        return '\\mathrm{' +        $that.fn + '}\\left(' + args.map(function (arg) {
            return arg.toTex(options);
        }).join(',') + '\\right)';
    }
}})();