/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }


  /** set markov chains */

  makeChains() {
    let chains = new Map();
    let words = this.words;
    new Set(words).forEach(word => chains.set(word, []));

    for (let i in words) {
      let word = words[i];
      let next = words[parseInt(i)+1] || null;
      chains.get(word).push(next);
    }
    return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let chains = this.makeChains();
    let optionalWords = Array.from(chains.keys());
    let index = Math.floor(Math.random() * chains.size);
    let word = optionalWords[index];
    let result =[word];

    for (let i=1; i < numWords; i++) {
      let chain = chains.get(word);   
      if (chain[0]) {
        index = Math.floor(Math.random() * chain.length);
        word = chain[index];
        result.push(word);
      } else break;
    }
    return result.join(" ");
  }
}

module.exports = { MarkovMachine };
