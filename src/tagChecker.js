const {
    END_TAG,
    SUCCESS_MESSAGE,
    STOP_PROCESS,
    HTML_CHECK_REGEX,
} = require("./constants");
const TagItem = require("./TagItem");

const check = (sentence = '') => {
    const tagStack = [];
    const matchTags = sentence.match(HTML_CHECK_REGEX);

    let result;
    matchTags.some(matchedTag => {
        if (isEndTag(matchedTag)) {
            let tagItem = tagStack.pop();
            if (!tagItem) {
                tagItem = new TagItem();
            }

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

    if (tagStack.length > 0) {
        return getStatus(tagStack.pop());
    }

    return SUCCESS_MESSAGE;
}

const isEndTag = (tag = "") => {
    return tag.startsWith(END_TAG);
}

const getStatus = (tagItem) => {
    if (!tagItem.closeTag) {
        return `Expected ${tagItem.expectedCloseTag} found #`;
    }

    if (!tagItem.openTag || !isValid(tagItem)) {
        return `Expected ${tagItem.expectedCloseTag} found ${tagItem.closeTag}`;
    }

    return SUCCESS_MESSAGE;
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