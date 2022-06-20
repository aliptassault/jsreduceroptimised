(function(){{
    var result = [];
    for (var i = 0; i < a.length - 1; i++) {
        for (var j = i + 1; j < a.length; j++) {
            if (a[0].length == 2) {
                result.push(_distance2d(a[i][0], a[i][1], a[j][0], a[j][1]));
            } else if (a[0].length == 3) {
                result.push(_distance3d(a[i][0], a[i][1], a[i][2], a[j][0], a[j][1], a[j][2]));
            }
        }
    }
    return result;
}})();