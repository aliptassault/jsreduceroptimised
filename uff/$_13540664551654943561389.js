(function(){{
    var j, arr = [0], arrL, i = 0, strL = str.length;
    for (; i < strL;) {
        for (arrL = arr.length; arrL--;)
            arr[arrL] *= baseIn;
        arr[0] += NUMERALS.indexOf(str.charAt(i++));
        for (j = 0; j < arr.length; j++) {
            if (arr[j] > baseOut - 1) {
                if (arr[j + 1] === void 0)
                    arr[j + 1] = 0;
                arr[j + 1] += arr[j] / baseOut | 0;
                arr[j] %= baseOut;
            }
        }
    }
    return arr.reverse();
}})();