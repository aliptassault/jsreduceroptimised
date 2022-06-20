(function(){{
    for (var i = 0; i < array.length; i++) {
        if (isCollection(array[i])) {
            return true;
        }
    }
    return false;
}})();