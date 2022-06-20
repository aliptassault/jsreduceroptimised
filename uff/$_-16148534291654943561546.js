(function(){{
    places = Math.pow(10, places || 0);
    return new Complex(Math.round(    $that['re'] * places) / places, Math.round(    $that['im'] * places) / places);
}})();