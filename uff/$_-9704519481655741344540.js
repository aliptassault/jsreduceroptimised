(function(){{
    if (!isSafeMethod(object, method)) {
        throw new Error('No access to method "' + method + '"');
    }
}})();