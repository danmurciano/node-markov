const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');


function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function readFile(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    generateText(data);
  });
}

async function readWebPage(url) {
  try {
    let res = await axios.get(url);
    generateText(res.data);
  } catch(err) {
    console.error(`Error fetching ${path}: ${err}`);
    process.exit(1);
  }
}


let path = process.argv[3];

if (process.argv[2] === "file") {
  readFile(path)
} else if (process.argv[2] === "url") {
  readWebPage(path)
} else {
  console.error("Method provided is not valid");
  process.exit(1);
}
