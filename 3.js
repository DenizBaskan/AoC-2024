const fs = require('fs');

let input = fs.readFileSync("./inputs/3.txt")
.toString();

const re = new RegExp("mul\\(-?\\d+,-?\\d+\\)", "g");

function compute(data) {
    console.log(data.match(re)
    .reduce((acc, m) => {
        let [a, b] = m.substring(4, m.length - 1).split(",").map(Number);
        return acc + (a * b)
    }, 0));
}

compute(input);

let mul = true, allowed = [];

for (let i = 0; i < input.length; i++) {
    if (input.substring(i).startsWith("do()")) {
        mul = true;
    } else if (input.substring(i).startsWith("don't()")) {
        mul = false;
    }
    
    if (mul) {
        allowed.push(i);
    }
}

const newMem = allowed.map(i => {
    return input[i]
}).join("")

compute(newMem);
