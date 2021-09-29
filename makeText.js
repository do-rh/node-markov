/** Command-line tool to generate Markov text. */

const fsP = require("fs/promises");
const { MarkovMachine } = require("./markov");
const filePath = process.argv[2];

/**Accepts a filepath for a text file, 
 * reads it and returns an instance of the MarkovMachine */
async function makeText(filepath) {
    let contents;
    try {
        contents = await fsP.readFile(filepath, "utf8");
    } catch (err) {
        console.log("file not read. Error: ", err);
        process.exit(1);
    }
    const markovMachine = new MarkovMachine(contents);
    markovMachine.getText();
    // return markovMachine;
}

makeText(filePath);
// console.log("mm is ", mm)
// mm.getText();

