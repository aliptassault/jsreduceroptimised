(function(){{
    /**
   * Instantiate mathjs data types from their JSON representation
   * @param {string} key
   * @param {*} value
   * @returns {*} Returns the revived object
   */
    return function reviver(key, value) {
        var constructor = type[value && value.mathjs];
        if (constructor && typeof constructor.fromJSON === 'function') {
            return constructor.fromJSON(value);
        }
        return value;
    };
}})();