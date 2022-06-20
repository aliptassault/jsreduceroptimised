(function(){{
    var m = copy ?     $that.clone() :     $that;
    m._data = array.reshape(m._data, size);
    m._size = size.slice(0);
    return m;
}})();