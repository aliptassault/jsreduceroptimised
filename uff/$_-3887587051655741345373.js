(function(){{
    places = Math.pow(10, places || 0);
    return new Complex(Math.floor(    $that['re'] * places) / places, Math.floor(    $that['im'] * places) / places);
}})();