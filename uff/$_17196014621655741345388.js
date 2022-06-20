(function(){{
    var temp = Error.apply(    $that, arguments);
    temp.name =     $that.name = name;
        $that.stack = temp.stack;
        $that.message = temp.message;
}})();