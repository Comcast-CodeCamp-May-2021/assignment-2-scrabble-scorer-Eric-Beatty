// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

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

function transform(oldPointStructure) {
  let pointStructure = {};
  for (const key in oldPointStructure) {
    let letterArray = oldPointStructure[key]
    for (i = 0; i < letterArray.length; i++){
    pointStructure[letterArray[i]] = Number(key);
  } 
  } return pointStructure
};

let newPointStructure = transform(oldPointStructure);


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
   console.log(`Let's play some scrabble!\n`);
   let word = input.question("Enter a word to score: ");
   return word; 
};

function simpleScore(word) {
	word = word.toUpperCase();
  let letterPoints = 0;

	for (let i = 0; i < word.length; i++) {
       letterPoints++
		 }
 
	return letterPoints;
}

function vowelBonusScore(word) {
	word = word.toUpperCase();
	let vowels = ["A", "E", "I", "O", "U"];
  let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
    if (vowels[i].includes(word[i])) {
      letterPoints+=3
    }
      else {
        letterPoints++
      }
    }
	return letterPoints;
}
	   
function scrabbleScore(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
	  for (const letter in newPointStructure) {
		 if (word[i] === letter) {
			letterPoints += newPointStructure[letter];
		 }
	  }
	}
	return letterPoints;;
}

let scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point",
    scoreFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels and 3 pts, consconants are 1pt.",
    scoreFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoreFunction: scrabbleScore
  }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n");
  selection = -1;
  while (selection <0 || selection > 2 || isNaN(selection)) {
  selection =  Number(input.question(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\nEnter 0, 1, or 2: \n`)); 
    if (scoringAlgorithms[selection]){
    return scoringAlgorithms[selection]
    }
  }
}


function runProgram() {
   console.clear();
   let userWord = initialPrompt();
   let userSelection = scorerPrompt();
   console.log(`${userWord}: ${userSelection.scoreFunction(userWord)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
    transform: transform,
    oldPointStructure: oldPointStructure,
    simpleScore: simpleScore,
    vowelBonusScore: vowelBonusScore,
    scrabbleScore: scrabbleScore,
    scoringAlgorithms: scoringAlgorithms,
    newPointStructure: newPointStructure,
	 runProgram: runProgram,
	 scorerPrompt: scorerPrompt
};

