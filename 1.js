const fs = require('fs');

let a = [], b = [];

fs.readFileSync("./inputs/1.txt")
.toString()
.split("\n")
.map((line) => line.split("   ").map(Number))
.forEach(([x, y]) => {
    a.push(x)
    b.push(y)
});

a.sort();
b.sort();

const one = a.reduce((acc, v, i) => {
    return acc + Math.abs(v - b[i]);
}, 0);

console.log(one);

const two = a.reduce((acc, item) => {
    const frequency = b.filter(num => num == item).length;
    return acc + (item * frequency);
}, 0);

console.log(two);
