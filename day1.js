let fs = require('fs').promises;
function getSum(arr, startIndex, count, prevSum) {
  if (!prevSum) {
    let sum = 0;
    for (let i = startIndex; i < startIndex+count; i++) {
      sum += parseInt(arr[i]);
    }
    return sum;
  } else {
    prevSum -= parseInt(arr[startIndex-1]);
    prevSum += parseInt(arr[startIndex+count-1]);
    return prevSum;
  }
}
function getFalls(input, windowSize) {
  let ret = 0;
  let prevSum = getSum(input, 0, windowSize);
  for (let i = 1; i <= input.length - windowSize; i++) {
    let currentSum = getSum(input, i, windowSize, prevSum);
    if (currentSum > prevSum) {
      ret++;
    }
    prevSum = currentSum;
  }
  return ret;
}

fs.readFile('./inputs/day1.txt').then((data) => {
  const input = data.toString().split('\n');
  console.log('Falls:', getFalls(input, 1));
});