(function(){{
    switch (arguments.length) {
    case 1:
        var arg = arguments[0];
        if (typeof arg === 'object') {
            return Complex(arg);
        }
        throw new TypeError('Input has to be an object with r and phi keys.');
    case 2:
        var r = arguments[0], phi = arguments[1];
        if (isNumber(r)) {
            if (type.isUnit(phi) && phi.hasBase('ANGLE')) {
                // convert unit to a number in radians
                phi = phi.toNumber('rad');
            }
            if (isNumber(phi)) {
                return new Complex({
                    r: r,
                    phi: phi
                });
            }
            throw new TypeError('Phi is not a number nor an angle unit.');
        } else {
            throw new TypeError('Radius r is not a number.');
        }
    default:
        throw new SyntaxError('Wrong number of arguments in function fromPolar');
    }
}})();