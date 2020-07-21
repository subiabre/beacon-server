"use strict";

class ConsoleString
{
    static colors = {
        FgBlack: "\x1b[30m",
        FgRed: "\x1b[31m",
        FgGreen: "\x1b[32m",
        FgYellow: "\x1b[33m",
        FgBlue: "\x1b[34m",
        FgMagenta: "\x1b[35m",
        FgCyan: "\x1b[36m",
        FgWhite: "\x1b[37m",

        BgBlack: "\x1b[40m",
        BgRed: "\x1b[41m",
        BgGreen: "\x1b[42m",
        BgYellow: "\x1b[43m",
        BgBlue: "\x1b[44m",
        BgMagenta: "\x1b[45m",
        BgCyan: "\x1b[46m",
        BgWhite: "\x1b[47m"
    };

    constructor(string)
    {
        this.string = string;
    }

    /**
     * Get an string with x padding to the left
     * @param {Number} padding 
     */
    tab(padding = 8)
    {
        this.string = ' '.repeat(padding) + this.string;

        return this;
    }

    /**
     * Set an string of the given color
     * @param {String} color Bash color code
     */
    color(color)
    {
        this.string = color + this.string + "\x1b[0m";

        return this;
    }

    /**
     * Output the string to console
     */
    log()
    {
        console.log(this.string)
    }
}

module.exports = ConsoleString;
