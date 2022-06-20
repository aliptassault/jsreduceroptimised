(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var implicit = options && options.implicit ? options.implicit : 'hide';
    var args =     $that.args;
    var parens = calculateNecessaryParentheses(    $that, parenthesis, implicit, args, false);
    if (args.length === 1) {
        //unary operators
        var assoc = operators.getAssociativity(        $that, parenthesis);
        var operand = args[0].toHTML(options);
        if (parens[0]) {
            operand = '<span class="math-parenthesis math-round-parenthesis">(</span>' + operand + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }
        if (assoc === 'right') {
            //prefix operator
            return '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + escape(            $that.op) + '</span>' + operand;
        } else if (assoc === 'left') {
            //postfix
            return '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + escape(            $that.op) + '</span>' + operand;
        }
        //fall back to postfix
        return '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + escape(        $that.op) + '</span>' + operand;
    } else if (args.length == 2) {
        // binary operatoes
        var lhs = args[0].toHTML(options);
        //left hand side
        var rhs = args[1].toHTML(options);
        //right hand side
        if (parens[0]) {
            //left hand side in parenthesis?
            lhs = '<span class="math-parenthesis math-round-parenthesis">(</span>' + lhs + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }
        if (parens[1]) {
            //right hand side in parenthesis?
            rhs = '<span class="math-parenthesis math-round-parenthesis">(</span>' + rhs + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }
        if (            $that.implicit &&            $that.getIdentifier() === 'OperatorNode:multiply' && implicit == 'hide') {
            return lhs + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + rhs;
        }
        return lhs + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape(        $that.op) + '</span>' + rhs;
    } else if (args.length > 2 && (        $that.getIdentifier() === 'OperatorNode:add' ||        $that.getIdentifier() === 'OperatorNode:multiply')) {
        var stringifiedArgs = args.map(function (arg, index) {
            arg = arg.toHTML(options);
            if (parens[index]) {
                //put in parenthesis?
                arg = '<span class="math-parenthesis math-round-parenthesis">(</span>' + arg + '<span class="math-parenthesis math-round-parenthesis">)</span>';
            }
            return arg;
        });
        if (            $that.implicit &&            $that.getIdentifier() === 'OperatorNode:multiply' && implicit === 'hide') {
            return stringifiedArgs.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>');
        }
        return stringifiedArgs.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape(        $that.op) + '</span>');
    } else {
        //fallback to formatting as a function call
        return '<span class="math-function">' + escape(        $that.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + stringifiedArgs.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
    }
}})();