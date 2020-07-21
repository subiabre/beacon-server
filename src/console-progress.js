"use strict";

const CColor = require('ccolor');
const ConsoleProgressBar = require("console-progress-bar");

// Constants.
const MAX_PERCENT_VALUE = 100;
const PROGRESS_BAR_MAX_VALUE = 100;
const PROGRESS_BAR_START_CHARS = ' ';
const PROGRESS_BAR_END_CHARS = ' ';
const PROGRESS_BAR_NOT_FILLED_PART_CHARS = '░';
const PROGRESS_BAR_FILLED_PART_CHARS = ' ';
const PROGRESS_BAR_CHARS_LENGTH = 50;

class ConsoleProgress extends ConsoleProgressBar
{
    /**
     * Like the parent one but returning instead of printing
     */
    show()
    {
        // Define params.
        this.percent = Math.floor((this.value / this.maxValue) * MAX_PERCENT_VALUE);
        const filledParts = Math.floor((this.value / this.maxValue) * this.charsLength);
        const notFilledParts = this.charsLength - filledParts;
        const filledPartsCharsString = ''.padStart(filledParts, this.filledPartChars);
        const notFilledPartCharsString = ''.padStart(notFilledParts, this.notFilledPartChars);

        // Check if filled parts amount chnaged.
        if (filledParts === this.filledParts) {
        return;
        }
        this.filledParts = filledParts;

        // Show progress bar.
        const progressBarString = `${CColor.whiteBackground(this.startChars)}${addColor(filledPartsCharsString, this.percent)}${
        notFilledPartCharsString}${CColor.whiteBackground(this.endChars)}`;
        const newLineIfLast = this.percent === MAX_PERCENT_VALUE ? '\n' : '';
            
        process.stdout.cursorTo(8);
        process.stdout.write(`${progressBarString}${newLineIfLast}`);
    }
}

/**
 * Add color.
 * @param {string} progressBarString - Progress bar string.
 * @param {number} percent - Percent.
 * @returns {string}
 */
function addColor(progressBarString, percent) {
    // Set color accordance to percent value.
    switch (percent) {
      case 100:
        return CColor.greenBackground(progressBarString);
      default:
        return CColor.cyanBackground(progressBarString);
    }
  }

module.exports = ConsoleProgress;
