const {
    END_TAG,
    START_TAG,
    SUCCESS_MESSAGE,
    STOP_PROCESS,
    HTML_CHECK_REGEX,
} = require("./constants");

class TagItem {
    #openTag = null;
    #expectedOpenTag = '#';

    #closeTag = null;
    #expectedCloseTag = '#';

    get openTag() {
        return this.#openTag;
    }

    get closeTag() {
        return this.#closeTag;
    }

    get expectedOpenTag() {
        return this.#expectedOpenTag;
    }

    get expectedCloseTag() {
        return this.#expectedCloseTag;
    }

    set openTag(tag) {
        this.#openTag = tag;
        if (tag) {
            this.#expectedCloseTag = tag.replace(START_TAG, END_TAG);
        }
    }

    set closeTag(tag) {
        this.#closeTag = tag;
        if (tag) {
            this.#expectedOpenTag = tag.replace(END_TAG, START_TAG);
        }
    }
}

const check = (sentence = '') => {
    const tagStack = [];
    const matchTags = sentence.match(HTML_CHECK_REGEX);

    let result;
    matchTags.some(matchedTag => {
        if (isEndTag(matchedTag)) {
            let tagItem = tagStack.pop();
            tagItem.closeTag = matchedTag;

            if (!isValid(tagItem)) {
                result = getStatus(tagItem);
                return STOP_PROCESS;
            }
        } else {
            const tagItem = new TagItem();
            tagStack.push(tagItem);
            tagItem.openTag = matchedTag;
        }
    });

    if (result) {
        return result;
    }

    if (tagStack.length === 0) {
        return SUCCESS_MESSAGE;
    }

    return "error1";
}

const isEndTag = (tag = "") => {
    return tag.startsWith(END_TAG);
}

const getStatus = (tagItem) => {

    if (!isValid(tagItem)) {
        return `Expected ${tagItem.expectedCloseTag} found ${tagItem.closeTag}`;
    }

    // TODO
    return "error2";
}

const isValid = (tagItem) => {
    if (!tagItem.openTag) return false;
    if (!tagItem.closeTag) return true;

    return (
        tagItem.openTag === tagItem.expectedOpenTag
        &&
        tagItem.closeTag === tagItem.expectedCloseTag
    );
}

module.exports = check;