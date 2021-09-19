const check = require('./tagChecker');

const correctInputs = [
    "The following text<C><B>is centred and in boldface</B></C>",
    "<B>This <\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence",
    "<B>This <\g>is <BBB>boldface</BBB> in <<*> a</B> <\\6> <<d>sentence",
];

describe('Tag checker', () => {
    it('Correct paragraph', () => {
        correctInputs.forEach(input => {
            expect(
                check(input)
            ).toBe("Correctly tagged paragraph");
        });
    });

    it('Expected all different tags', () => {
        expect(
            check("<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>")
        ).toBe("Expected </C> found </B>");
    });

    it('Expected # found </C>', () => {
        expect(
            check("<B>This should be in boldface, but there is an extra closing tag</B></C>")
        ).toBe("Expected # found </C>");
    });

    it('Expected </B> found #',() => {
        expect(
            check("<B><C>This should be centred and in boldface, but there is a missing closing tag</C>")
        ).toBe("Expected </B> found #");
    });
});