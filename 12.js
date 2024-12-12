const fs = require('fs');

let data = fs.readFileSync("./inputs/12.txt")
.toString()
.split("\n")

let shapes = []

function visited(indexes, row, col) {
    for (const index of indexes) {
        if (index[0] == row && index[1] == col) {
            return true
        }
    }
    return false
}

function visitedGlobal(row, col) {
    for (const shape of shapes) {
        for (const [r, c] of shape) {
            if (r == row && c == col) {
                return true
            }
        }
    }
    return false
}

function search(indexes, row, col) {
    const letter = data[row][col];
    indexes.push([row, col]);

    const left = data[row][col - 1], right = data[row][col + 1];
    let up = undefined, down = undefined;

    if (row + 1 < data.length) down = data[row + 1][col];
    if (row - 1 >= 0) up = data[row - 1][col];

    if (left == letter && !visited(indexes, row, col - 1)) search(indexes, row, col - 1)
    if (right == letter && !visited(indexes, row, col + 1)) search(indexes, row, col + 1)
    if (up == letter && !visited(indexes, row - 1, col)) search(indexes, row - 1, col)
    if (down == letter && !visited(indexes, row + 1, col)) search(indexes, row + 1, col)
}

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        if (visitedGlobal(row, col)) continue

        let indexes = []
        search(indexes, row, col)
        shapes.push(indexes)
    }
}

let total = 0;

for (const shape of shapes) {
    const area = shape.length;
    let perim = 0;

    for (const [row, col] of shape) {
        if (!visited(shape, row, col - 1)) perim++;
        if (!visited(shape, row, col + 1)) perim++;
        if (!visited(shape, row - 1, col)) perim++;
        if (!visited(shape, row + 1, col)) perim++;
    }

    total += area * perim;
}

console.log(total)

total = 0;

function mapAdd(mp, k, v) {
    if (!mp[k]) {
        mp[k] = [];
    }

    mp[k].push(v);
}

function countConsecutive(mp) {
    let total = 0;
    for (const key in mp) {
        const arr = mp[key];
        arr.sort((a, b) => a - b);
        let cons = 0;
        let last = undefined;
    
        arr.forEach(v => {
            if (v != last + 1) {
                cons++
            };
            last = v;
        })

        total += cons
    }
    return total;
}

for (const shape of shapes) {
    const area = shape.length;
    let ups = {}, downs = {}, lefts = {}, rights = {};
    for (const [row, col] of shape) {
        const letter = data[row][col];
        const left = data[row][col - 1], right = data[row][col + 1];
        let up = undefined, down = undefined;

        if (row + 1 < data.length) down = data[row + 1][col];
        if (row - 1 >= 0) up = data[row - 1][col];

        if (up != letter) mapAdd(ups, row, col)
        if (down != letter) mapAdd(downs, row, col)
        if (left != letter ) mapAdd(lefts, col, row)
        if (right != letter) mapAdd(rights, col, row)
    }

    const perim = countConsecutive(ups) + countConsecutive(downs) + countConsecutive(lefts) + countConsecutive(rights);
    total += area * perim;
}

console.log(total)
