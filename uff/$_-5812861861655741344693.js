(function(){{
    if (err && err.isIndexError) {
        return new IndexError(err.index + 1, err.min + 1, err.max !== undefined ? err.max + 1 : undefined);
    }
    return err;
}})();