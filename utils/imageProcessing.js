function getBrailleFromText(text) {
    const brailleMap = {
        'A': '⠁', 'B': '⠃', 'C': '⠉', 'D': '⠙', 'E': '⠑', 'F': '⠋', 'G': '⠛', 'H': '⠓', 'I': '⠊', 'J': '⠚',
        'K': '⠅', 'L': '⠇', 'M': '⠍', 'N': '⠝', 'O': '⠕', 'P': '⠏', 'Q': '⠟', 'R': '⠗', 'S': '⠎', 'T': '⠞',
        'U': '⠥', 'V': '⠧', 'W': '⠺', 'X': '⠭', 'Y': '⠽', 'Z': '⠵',
        '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊',
        ' ': ' ', '.': '⠲', ',': '⠂', '!': '⠖', '?': '⠢', '"': '⠶', "'": '⠄', '-': '⠤', ';': '⠆', ':': '⠒'
    };

    return text.toUpperCase().split('').map(char => brailleMap[char] || char).join('');
}

async function extractTextFromImage(file) {
    try {
        const result = await Tesseract.recognize(
            file,
            'eng',
            { logger: m => console.log(m) }
        );

        const extractedText = result.data.text.trim();
        const brailleText = getBrailleFromText(extractedText);

        return {
            extractedText,
            brailleText
        };
    } catch (error) {
        console.error('OCR Error:', error);
        throw new Error('Failed to extract text from image');
    }
}
