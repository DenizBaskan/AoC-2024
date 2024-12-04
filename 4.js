const fs = require('fs');

const data = fs.readFileSync("./inputs/4.txt")
.toString()
.split("\n");

let total = 0, re = new RegExp("XMAS", "g");

function compute(line) {
    const reversed = line.split("").reverse().join("");
    const a = line.match(re) || [], b = reversed.match(re) || [];
    total += a.length + b.length;
}

data.forEach(line => compute(line));

for (let col = 0; col < data[0].length; col++) {
    let line = "";
    for (let row = 0; row < data.length; row++)
        line += data[row][col];
    compute(line);
}

for (let row = 0; row < data.length; row++) {
    let offset = 0, line = "";

    while (row - offset >= 0) {
        line += data[row - offset][offset];
        offset++
    }

    compute(line);
}

for (let col = 1; col < data.length; col++) {
    let offset = 0, line = "";

    while (col + offset < data.length) {
        line += data[data.length - 1 - offset][col + offset];
        offset++
    }

    compute(line);
}

for (let row = 0; row < data.length; row++) {
    let offset = 0, line = "";

    while (row - offset >= 0) {
        line += data[row - offset][data.length - 1 - offset];
        offset++;
    }

    compute(line);
}

for (let col = data.length - 2; col != 0; col--) {
    let offset = 0, line = "";

    while (col - offset >= 0) {
        line += data[data.length - 1 - offset][col - offset];
        offset++;
    }

    compute(line);
}

console.log(total)

total = 0;

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data.length; col++) {
        try {
            let right = data[row][col] + data[row + 1][col + 1] + data[row + 2][col + 2];
            let left = data[row][col + 2] + data[row + 1][col + 1] + data[row + 2][col];

            if ((right == "MAS" || right.split("").reverse().join("") == "MAS") && (left == "MAS" || left.split("").reverse().join("") == "MAS")) {
                total++
            }
        } catch {}
    }
}

console.log(total)
