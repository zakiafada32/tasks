// first step ->
// the fourth clue: nothing is correct
// the result of the fourth clue is remove all the same number
function firstStep(clues: Clues) {
  const fourth = 'fourth';
  const notingIsCorrect = clues[fourth];
  delete clues[fourth];
  for (const key in clues) {
    for (let i = 0; i < clues[key].length; i++) {
      const x = clues[key][i];
      if (notingIsCorrect.includes(x)) {
        clues[key][i] = -1;
      }
    }
  }
}
// second step ->
// the first clue: one number is correct but wrong placed
// the fifth clue: two numbers are correct but wrong placed
// the result of the fifth clue is either 8,4 or 2,4 (2, 8 was incorrect because the first clue would be broken).
// the result of the first clue is either 8 or 2
function secondStep(clues: Clues) {
  const first = 'first';
  const fifth = 'fifth';
  const fifthClue = clues[fifth];
  const remove: number[] = [];
  for (let i = 0; i < clues[first].length; i++) {
    if (clues[first][i] !== -1 && !fifthClue.includes(clues[first][i])) {
      remove.push(clues[first][i]);
      clues[first][i] = -1;
    }
  }

  // remove all the same number
  for (const key in clues) {
    for (let i = 0; i < clues[key].length; i++) {
      const x = clues[key][i];
      if (remove.includes(x)) {
        clues[key][i] = -1;
      }
    }
  }
}

// third step ->
// the third clue: one number is correct and well placed
// the first clue: one number is correct but wrong placed
// the result of the third clue is to remove all the numbers that contain in the first clue
function thirdStep(clues: Clues) {
  const first = 'first';
  const third = 'third';
  const firstClue = clues[first];
  const remove: number[] = [];
  for (let i = 0; i < clues[third].length; i++) {
    if (clues[third][i] !== -1 && firstClue.includes(clues[third][i])) {
      remove.push(clues[first][i]);
      clues[first][i] = -1;
    }
  }

  // remove all the same number
  for (const key in clues) {
    for (let i = 0; i < clues[key].length; i++) {
      const x = clues[key][i];
      if (remove.includes(x)) {
        clues[key][i] = -1;
      }
    }
  }
}

// fourth step ->
// at this point, the clues has been fulfilled
// rearrange the number position and push to the answer
function fourthStep(clue: Clues, answer: number[]) {
  const first = 'first';
  const second = 'second';
  const third = 'third';
  const fifth = 'fifth';

  let firstClueItem = -1;
  let secondClueItem = -1;
  let thirdClueItem = -1;
  let fifthClueItem = -1;

  // get the third clue number and push to the answer
  for (let i = 0; i < clue[third].length; i++) {
    if (clues[third][i] !== -1) {
      thirdClueItem = clues[third][i];
      answer[i] = clues[third][i];
    }
  }

  // remove all the same number with the third clue number
  for (const key in clues) {
    for (let i = 0; i < clues[key].length; i++) {
      const x = clues[key][i];
      if (thirdClueItem !== -1 && thirdClueItem === x) {
        clues[key][i] = -1;
      }
    }
  }

  // get the first clue number
  for (let i = 0; i < clue[first].length; i++) {
    if (clues[first][i] !== -1) {
      firstClueItem = clues[first][i];
    }
  }

  // push the first clue number to the answer
  for (let i = 0; i < clue[first].length; i++) {
    if (clue[first][i] === -1 && clue[fifth][i] === -1 && answer[i] === undefined) {
      answer[i] = firstClueItem;
    }
  }

  // remove all the same number with the first clue number
  for (const key in clues) {
    for (let i = 0; i < clues[key].length; i++) {
      const x = clues[key][i];
      if (firstClueItem !== -1 && firstClueItem === x) {
        clues[key][i] = -1;
      }
    }
  }

  // get the second clue number
  for (let i = 0; i < clue[second].length; i++) {
    if (clues[second][i] !== -1) {
      secondClueItem = clues[second][i];
    }
  }

  // push the second clue number to the answer
  for (let i = 0; i < clue[second].length; i++) {
    if (clue[second][i] === -1 && answer[i] === undefined) {
      answer[i] = secondClueItem;
    }
  }

  // remove all the same number with the second clue number
  for (const key in clues) {
    for (let i = 0; i < clues[key].length; i++) {
      const x = clues[key][i];
      if (secondClueItem !== -1 && secondClueItem === x) {
        clues[key][i] = -1;
      }
    }
  }

  // get the fifth clue number
  for (let i = 0; i < clue[fifth].length; i++) {
    if (clues[fifth][i] !== -1) {
      fifthClueItem = clues[fifth][i];
    }
  }

  // push the fifth clue number to the answer
  for (let i = 0; i < clue[fifth].length; i++) {
    if (clue[fifth][i] === -1 && answer[i] === undefined) {
      answer[i] = fifthClueItem;
    }
  }

  // remove all the same number with the fifth clue number
  for (const key in clues) {
    for (let i = 0; i < clues[key].length; i++) {
      const x = clues[key][i];
      if (fifthClueItem !== -1 && fifthClueItem === x) {
        clues[key][i] = -1;
      }
    }
  }
}

interface Clues {
  [key: string]: number[];
}

const clues: Clues = {
  first: [9, 2, 8, 5], // one number is correct but wrong placed
  second: [1, 9, 3, 7], // two numbers are correct but wrong placed
  third: [5, 2, 0, 1], // one number is correct and well placed
  fourth: [6, 5, 0, 7], // nothing is correct
  fifth: [8, 5, 2, 4], // two numbers are correct but wrong placed
};

const answer: number[] = [];

firstStep(clues);
console.log('first step');
console.log(clues);

secondStep(clues);
console.log('second step');
console.log(clues);

thirdStep(clues);
console.log('third step');
console.log(clues);

fourthStep(clues, answer);
console.log('fourth step');
console.log(clues);
console.log('the answer is ', answer);
