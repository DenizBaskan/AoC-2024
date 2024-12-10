const fs = require('fs');

let data = fs.readFileSync("./inputs/10.txt")
.toString()
.split("\n")
.map(line => line.split("").map(Number));

let p1 = {}, p2 = {}

function search(start, row, col) {
    const num = data[row][col];

    if (num == 9) {
        const value = row.toString() + ":" + col.toString()
        if (!p1[start].includes(value)) {
            p1[start].push(value)
        }

        p2[start]++;
        return
    }

    const left = data[row][col - 1]
    const right = data[row][col + 1]

    let up = undefined, down = undefined;

    if (row + 1 < data.length) {
        down = data[row + 1][col];
    }

    if (row - 1 >= 0) {
        up = data[row - 1][col];
    }

    if (left - 1 == num) search(start, row, col - 1)
    if (right - 1 == num) search(start, row, col + 1)
    if (up - 1 == num) search(start, row - 1, col)
    if (down - 1 == num) search(start, row + 1, col)
}

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        if (data[row][col] == 0) {
            const start = row.toString() + ":" + col.toString();
            p1[start] = [];
            p2[start] = 0;
            search(start, row, col);
        }
    }
}

let total = 0

for (const key in p1) {
    total += p1[key].length;
}

console.log(total)

total = 0

for (const key in p2) {
    total += p2[key];
}

console.log(total)
