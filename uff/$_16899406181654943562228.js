(function(){{
    /**
   * Interpolate values into a string template.
   *
   * Syntax:
   *
   *     math.print(template, values)
   *     math.print(template, values, precision)
   *     math.print(template, values, options)
   *
   * Example usage:
   *
   *     // the following outputs: 'Lucy is 5 years old'
   *     math.print('Lucy is $age years old', {age: 5});
   *
   *     // the following outputs: 'The value of pi is 3.141592654'
   *     math.print('The value of pi is $pi', {pi: math.pi}, 10);
   *
   *     // the following outputs: 'hello Mary! The date is 2013-03-23'
   *     math.print('Hello $user.name! The date is $date', {
   *       user: {
   *         name: 'Mary',
   *       },
   *       date: new Date(2013, 2, 23).toISOString().substring(0, 10)
   *     });
   *
   * See also:
   *
   *     format
   *
   * @param {string} template     A string containing variable placeholders.
   * @param {Object} values       An object containing variables which will
   *                              be filled in in the template.
   * @param {number | Object} [options]  Formatting options,
   *                              or the number of digits to format numbers.
   *                              See function math.format for a description
   *                              of all options.
   * @return {string} Interpolated string
   */
    var print = typed('print', {
        'string, Object': _print,
        'string, Object, number | Object': _print
    });
    print.toTex = undefined;
    // use default template
    return print;
}})();