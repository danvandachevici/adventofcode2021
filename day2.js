const fs = require('fs').promises;

const position = {
  horizontal: 0,
  vertical: 0
};

fs.readFile('./inputs/day2.txt').then((data) => {
  const lines = data.toString().split('\n');
  lines.forEach((line) => {
    let [dir, val] = line.split(' ');
    switch(dir) {
      case "up": position.vertical -= parseInt(val); break;
      case "down": position.vertical += parseInt(val); break;
      case "forward": position.horizontal += parseInt(val); break;
    }
  });
  console.log(position.horizontal * position.vertical);
});