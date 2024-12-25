const MORSE_CODE = {
    'A': '.-',    'B': '-...',  'C': '-.-.', 'D': '-..',
    'E': '.',     'F': '..-.',  'G': '--.',  'H': '....',
    'I': '..',    'J': '.---',  'K': '-.-',  'L': '.-..',
    'M': '--',    'N': '-.',    'O': '---',  'P': '.--.',
    'Q': '--.-',  'R': '.-.',   'S': '...',  'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',  'X': '-..-',
    'Y': '-.--',  'Z': '--..', 
    '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
    ' ': ' '
};

// 直接暴露到全局作用域
window.MORSE_CODE = MORSE_CODE;

class MorseTranslator {
    constructor() {
        this.reverseMorse = Object.fromEntries(
            Object.entries(MORSE_CODE).map(([key, value]) => [value, key])
        );
    }

    textToMorse(text) {
        return text
            .toUpperCase()
            .split('')
            .map(char => MORSE_CODE[char] || char)
            .join(' ')
            .replace(/\s+/g, ' ');
    }

    morseToText(morse) {
        return morse
            .split(' ')
            .map(code => this.reverseMorse[code] || code)
            .join('');
    }

    isMorseCode(text) {
        return /^[.\- ]+$/.test(text);
    }
} 

// 重要：将类暴露到全局作用域
window.MorseTranslator = MorseTranslator; 