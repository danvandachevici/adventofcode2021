const fs = require('fs').promises;

function findAndMarkNumber(matrices, sums, number, mIndex) {
  let ret = 0;
  let wonby;
  matrices[mIndex].forEach((line) => {
    line.forEach((elem, idx) => {
      if (elem === number) {
        line[idx] = 'c';
        sums[mIndex] -= number;
        // since I'm here, check if bingo:
        // check line
        if (line.join('') === 'c'.repeat(line.length)) {
          // bingo!
          wonby='line';
          ret = sums[mIndex]*number;
          return;
        }
        // check column
        for (let i = 0; i < matrices[mIndex].length; i++) {
          if (matrices[mIndex][i][idx] !== 'c') {
            return 0;
          }
        }
        wonby='column';
        ret = sums[mIndex]*number;
        return;
      }
    });
    if (ret > 0) {
      return;
    }
  });
  if (ret > 0) {
    // bingo!
    console.log('Matrix:', mIndex, 'number', number, wonby);
    return ret;
  }
  return null;
}

function createMatrices(lines) {
  let matricesArray = [];
  let sumsArray = [];
  let index = 2;
  let curMatrix = [];
  let curSum = 0;
  while (index < lines.length) {
    if (lines[index] === '' || index == lines.length-1) {
      // matrix is done, remember it
      if (!curMatrix.length) {
        index++;
        continue;
      }
      if (index == lines.length-1) {
        // parse line
        let temp = lines[index].split(/\s+/).map(n => parseInt(n));
        // curSum of the line, multiplied by prev lines
        curSum = temp.reduce((prev, cur) => prev + cur, curSum);
        // push new line in matrix
        curMatrix.push(temp);
      }
      matricesArray.push(curMatrix);
      // remember sum as well
      sumsArray.push(curSum);
      // init sum
      curSum = 0;
      // new matrix
      curMatrix = [];
    } else {
      // parse line
      let temp = lines[index].split(/\s+/).filter(n => n !== '').map(n => parseInt(n));
      // curSum of the line, multiplied by prev lines
      curSum = temp.reduce((prev, cur) => prev + cur, curSum);
      // push new line in matrix
      curMatrix.push(temp);
    }
    index++;
  }
  return [matricesArray, sumsArray];
}

fs.readFile('./inputs/day4.txt').then((data) => {
  // remove from here - down
//   data = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
// 8  2 23  4 24
// 21  9 14 16  7
// 6 10  3 18  5
// 1 12 20 15 19

// 3 15  0  2 22
// 9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
// 2  0 12  3  7`
  // remove from here - up
  const lines = data.toString().split('\n');
  const randomNumbers = lines[0].split(',').map(n => parseInt(n));
  const [matricesArr, sumsArr] = createMatrices(lines);

  // let the bingo game begin!
  for (let i = 0; i < randomNumbers.length; i++) {
    for (let j = 0; j < matricesArr.length; j++) {
      let ret = findAndMarkNumber(matricesArr, sumsArr, randomNumbers[i], j);
      if (ret) {
        // bingo
        console.log(ret);
        matricesArr.splice(j, 1);
        sumsArr.splice(j, 1);
        j--;
        // matricesArr[j].forEach(line => line.fill('c'));
        // return;
      }
    }
  }
});