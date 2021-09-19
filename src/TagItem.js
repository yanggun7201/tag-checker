const { START_TAG, END_TAG } = require("./constants");

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

module.exports = TagItem;