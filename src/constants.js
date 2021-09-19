const START_TAG = "<";
const END_TAG = "</";
const HTML_CHECK_REGEX = /<\/?[A-Z]*>/g;
const STOP_PROCESS = true;
const SUCCESS_MESSAGE = 'Correctly tagged paragraph';

module.exports = {
    HTML_CHECK_REGEX,
    STOP_PROCESS,
    SUCCESS_MESSAGE,
    START_TAG,
    END_TAG
}