(function(){{
    // only allow setting safe properties of a plain object
    if (isPlainObject(object) && isSafeProperty(object, prop)) {
        return object[prop] = value;
    }
    throw new Error('No access to property "' + prop + '"');
}})();