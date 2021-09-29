/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    const words = text.split(/[ \r\n]+/);
    this.markovChains = this.makeChains(words);

  }

  /**Accepts an array of words and generates a markov chain. Returns the chain object
   * with words as keys and next word choices as an array of values.*/
  makeChains(words) {
    let chain = {};
    let keyWord;
    let nextWord;

    for (let i = 0; i < words.length; i++) {
      keyWord = words[i];
      nextWord = words[i + 1] || null;

      //returns removed punctuation or false for no need to change
      let noPuncKeyWord = MarkovMachine.hasPunctuation(keyWord);

      if (noPuncKeyWord !== true) {
        keyWord = noPuncKeyWord;
        nextWord = null;
      }

      //initialize array if doesn't exist in object
      if (chain[keyWord] === undefined) {
        chain[keyWord] = [];
      }

      //if nextword is not null, check if there is punctuation. if it is null, keep as null.
      if (nextWord !== null) {
        let noPuncNextWord = MarkovMachine.hasPunctuation(nextWord);
        if (noPuncNextWord !== true) {
          nextWord = noPuncNextWord;
        }
      }

      chain[keyWord].push(nextWord);
    }

    return chain;
  }

  static randomlyPickElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  static randomlyPickElementNotNull(array) {
    let randomChoice;
    randomChoice = array[Math.floor(Math.random() * array.length)];
    while (randomChoice === null) {
      randomChoice = array[Math.floor(Math.random() * array.length)];
    }
    return randomChoice;
  }


  static hasPunctuation(word) {
    if (word.endsWith(".") ||
      word.endsWith("!") ||
      word.endsWith("?")) {
      let noPunctuation = word.slice(0, word.length - 1);
      return noPunctuation;
    } else {
      return true;
    }
  }

  /** return random text from chains */

  getText(numWords = 100) {
    let outputText = [];
    
    let keys = Array.from(Object.keys(this.markovChains));
    let keyWord = MarkovMachine.randomlyPickElementNotNull(keys);
    let nextWord;

    while (numWords > 0) {
      let wordChoices = this.markovChains[keyWord];
      nextWord = MarkovMachine.randomlyPickElement(wordChoices);

      if (nextWord === null) {
        outputText.push(`${keyWord}.`);
        keyWord = MarkovMachine.randomlyPickElementNotNull(keys);

      } else {
        outputText.push(keyWord);
        keyWord = nextWord;

      }

      numWords--;
    }

    let returnedText = outputText.join(" ");
    return returnedText;

  }
}


module.exports = {
  MarkovMachine
};