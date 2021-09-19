class TagItem {
    #openTag = null;
    #closeTag = null;

    get openTag() {
        return this.#openTag;
    }

    get closeTag() {
        return this.#closeTag;
    }

    set openTag(tag) {
        this.#openTag = tag;
    }

    set closeTag(tag) {
        this.#closeTag = tag;
    }
}

const check = (sentence = '') => {
    const tagStack = [];
    const matchTags = sentence.match(checkRegex);

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

    if (result){
        return result;
    }

    if (tagStack.length === 0) {
        return SUCCESS_MESSAGE;
    }

    return "error";
}

const checkRegex = /<\/?[A-Z]*>/g;
const STOP_PROCESS = true;
const SUCCESS_MESSAGE = 'Correctly tagged paragraph';

const isEndTag = (tag = "") => {
    return tag.startsWith("</");
}

const getStatus = (tagItem) => {
    // TODO
    return "error";
}

const isValid = (tagItem) => {
    if (!tagItem.openTag) return false;
    if (!tagItem.closeTag) return true;

    return tagItem.openTag === (tagItem.closeTag.replace("</", "<"));
}

module.exports = check;