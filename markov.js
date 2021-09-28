/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    const words = text.split(/[ \r\n]+/);
    const chains = this.makeChains(words);
    
  }

  /**Accepts an array of words and generates a markov chain. Returns the chain object
   * with words as keys and next word choices as an array of values.
   */
  makeChains(words) {
    let chain = {};
    let keyWord;
    let nextWord;

    for (i = 0; i < words.length; i++) {
      keyWord = words[i];
      nextWord = words[i+1];
      if (chain[keyWord] !== undefined) {
        chain[keyWord].push(nextWord);
      } else {
        chain[keyWord] = [nextWord];
      }
    }
    return chain;
  }


  /** return random text from chains */

  getText(numWords = 100) {
    // MORE CODE HERE
  }
}


module.exports = {
  MarkovMachine
};