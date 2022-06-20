(function(){{
    // TODO: refactor this function, it's to complicated and contains duplicate code
    if (options.wrap && typeof value === 'function') {
        // create a wrapper around the function
        value = _wrap(value);
    }
    if (isTypedFunction(math[name]) && isTypedFunction(value)) {
        if (options.override) {
            // give the typed function the right name
            value = typed(name, value.signatures);
        } else {
            // merge the existing and typed function
            value = typed(math[name], value);
        }
        math[name] = value;
        _importTransform(name, value);
        math.emit('import', name, function resolver() {
            return value;
        });
        return;
    }
    if (math[name] === undefined || options.override) {
        math[name] = value;
        _importTransform(name, value);
        math.emit('import', name, function resolver() {
            return value;
        });
        return;
    }
    if (!options.silent) {
        throw new Error('Cannot import "' + name + '": already exists');
    }
}})();