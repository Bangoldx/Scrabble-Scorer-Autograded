// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let prompt = input.question("Let's play some scrabble!\n\nEnter a word: ");

   while (isNaN(prompt) === false) {
      prompt = input.question("INVALID ENTRY:\n\nEnter a word: ");
   }

   return prompt;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
   return word.length;
};

const vowelBonusStructure = {
   3: ["A", "E", "I", "O", "U"],
   1: ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"]
};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (const pointValue in vowelBonusStructure) {
         if (vowelBonusStructure[pointValue].includes(word[i])) {
            letterPoints += Number(pointValue);
         }
      }
   }
   return letterPoints;
};

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (letter in newPointStructure) {
         if (word[i] === letter) {
            letterPoints += newPointStructure[letter]
         }
      }
   }
   return letterPoints;
};

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let prompt = input.question("Which scoring algorithm would you like to use?\n\n" +
      `0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n` +
      `1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n` +
      `2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n` +
      "Enter 0, 1, or 2: ")

   while (prompt < 0 || prompt > 2 || prompt === ""|| isNaN(prompt) === true) {
      prompt = input.question("INVALID ENTRY: Which scoring algorithm would you like to use?\n\n" +
         `0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n` +
         `1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n` +
         `2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n` +
         "Enter 0, 1, or 2: ")
   }

   return Number(prompt)
}

function transform(obj) {
   let transformed = {};

   for (let key in obj) {
      for (let i = 0; i < obj[key].length; i++) {
         transformed[obj[key][i].toLowerCase()] = Number(key)
      }
   }
   return transformed;
};

function runProgram() {
   let word = initialPrompt();
   let scorer = scorerPrompt();
   console.log(`Score for ${word} is: ${scoringAlgorithms[scorer].scorerFunction(word)}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
