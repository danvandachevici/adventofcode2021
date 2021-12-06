const fs = require('fs').promises;


function getGammaAndEpsilon(lines) {
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
  return [gamma, epsilon];
}

function getFilteredNumber(lines, index, inverse) {
  if (lines.length === 1) {
    return parseInt(lines[0], 2);
  }
  let sum = 0;
  // find majority
  lines.forEach(line => sum += parseInt(line[index]));
  let maj = 0;
  if (sum >= lines.length/2) maj = 1;
  // filter by majority
  let filterBy = maj;
  if (inverse) {
    filterBy = 1-maj;
  }
  let newLines = lines.filter(line => parseInt(line[index]) === filterBy);

  return getFilteredNumber(newLines, index+1, inverse);
}

fs.readFile('./inputs/day3.txt').then((data) => {
  const lines = data.toString().split('\n');
  const [gamma, epsilon] = getGammaAndEpsilon(lines);
  console.log('Power consumption:', gamma * epsilon);

  const oxygen = getFilteredNumber(lines, 0, 0);
  const co2 = getFilteredNumber(lines, 0, 1);
  console.log('Life support rating:', oxygen * co2);
});