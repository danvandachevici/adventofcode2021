const fs = require('fs').promises;

fs.readFile('./inputs/day3.txt').then((data) => {
  const lines = data.toString().split('\n');
  const bitsum = new Array(lines[0].length);
  bitsum.fill(0);
  lines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      bitsum[i] += parseInt(line[i]);
    }
  });
  let gammaArr = [];
  let epsilonArr = [];
  bitsum.forEach((digit) => {
    gammaArr.push(digit > lines.length/2 ? 1 : 0);
    epsilonArr.push(digit > lines.length/2 ? 0 : 1);
  });
  let gamma = parseInt(gammaArr.join(''), 2);
  let epsilon = parseInt(epsilonArr.join(''), 2);

  console.log(gamma * epsilon);
});