/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    const words = text.split(/[ \r\n]+/);
    this.chains = this.makeChains(words);
    
  }

  /**Accepts an array of words and generates a markov chain. Returns the chain object
   * with words as keys and next word choices as an array of values.
   */
  makeChains(words) {
    let chain = {};
    let keyWord;
    let nextWord;

    for (let i = 0; i < words.length; i++) {
      keyWord = words[i];
      nextWord = words[i+1];
      if (nextWord === undefined) {
        if (chain[keyWord] !== undefined) {
          chain[keyWord].push(null);
        } else {
          chain[keyWord] = [null];
        }
        break;
      }
      let kWHasPunc = this.hasPunctuation(keyWord);
      let nWHasPunc = this.hasPunctuation(nextWord);
      nextWord = nWHasPunc[0];

      if (kWHasPunc[1] === false) {
        if (chain[keyWord] !== undefined) {
          chain[keyWord].push(nextWord);
        } else {
          chain[keyWord] = [nextWord];
        }
      } else {
        if (chain[keyWord] !== undefined) {
          chain[keyWord].push(null);
        } else {
          chain[keyWord] = [null];
        }
      }
    }
    return chain;
  }

  hasPunctuation(word){
    if (word.endsWith(".") || 
          word.endsWith("!") || 
          word.endsWith("?")) {
      let noPunctuation = word.slice(0, word.length-1);
      return [noPunctuation, true];
    } else {
      return [word, false];
    }
  }

  /** return random text from chains */

  getText(numWords = 100) {
    console.log("this.chains is ", this.chains)
    let wordArr = Array.from(Object.keys(this.chains));

    let text = [];
    let nextWord;

    let keyWord = wordArr[Math.floor(Math.random() * wordArr.length)];
    
    while (numWords > 0){

      let wordChoices = this.chains[keyWord];
      console.log("keyWord is ", keyWord);
      console.log("wordChoices is ", wordChoices)
      nextWord = wordChoices[Math.floor(Math.random() * wordChoices.length)]
      
      if (nextWord === undefined) {
        text.push(`${keyWord}.`);
      } else {
        text.push(keyWord);
      }

      keyWord = nextWord;
      numWords--;
    }

    let returnedText = text.join(" ");
    return returnedText;

  }
}


module.exports = {
  MarkovMachine
};