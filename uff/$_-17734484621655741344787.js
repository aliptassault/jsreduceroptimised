(function(){{
    switch (size.length) {
    case 0:
        return format ? matrix(format) : [];
    case 1:
        return _eye(size[0], size[0], format);
    case 2:
        return _eye(size[0], size[1], format);
    default:
        throw new Error('Vector containing two values expected');
    }
}})();