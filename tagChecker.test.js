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

    it.todo('Expected different tags');
    it.todo('Expected # found </C>');
    it.todo('Expected </B> found #');
});