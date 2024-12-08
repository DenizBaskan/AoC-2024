const fs = require('fs');

let data = fs.readFileSync("./inputs/8.txt")
.toString()
.split("\n")
.map(line => line.split("")) // grid

let grid = {};

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        const item = data[row][col];

        if (item != "#" && item != ".") {
            if (grid[item] === undefined) {
                grid[item] = [];
            }

            grid[item].push({row, col});
        }
    }
}

let locations = []

for (const key in grid) {
    for (const first of grid[key]) {
        for (const second of grid[key]) {
            if (first.row != second.row && first.col != second.col) {
                const antinodes = [
                    {x: first.col + (first.col - second.col), y: first.row + (first.row - second.row)},
                    {x: second.col + (second.col - first.col), y: second.row + (second.row - first.row)}
                ]

                antinodes.forEach(antinode => {
                    if (antinode.x >= 0 && antinode.x < data[0].length && antinode.y >= 0 && antinode.y < data.length) {
                        if (locations.filter(l => l.x == antinode.x && l.y == antinode.y).length == 0) {
                            locations.push(antinode);
                        }
                    }
                })
            }
        }
    }
}

console.log(locations.length)
locations = []

for (const key in grid) {
    for (const first of grid[key]) {
        for (const second of grid[key]) {
            if (first.row != second.row && first.col != second.col) {
                const offsets = [
                    {pos: { x: first.col, y: first.row }, x : first.col - second.col, y: first.row - second.row},
                    {pos: { x: second.col, y: second.row }, x: second.col - first.col, y: second.row - first.row}
                ]

                offsets.forEach(offset => {
                    while (offset.pos.x >= 0 && offset.pos.x < data[0].length && offset.pos.y >= 0 && offset.pos.y < data.length) {
                        if (locations.filter(l => l.x == offset.pos.x && l.y == offset.pos.y).length == 0) {
                            locations.push({ x: offset.pos.x, y: offset.pos.y });
                        }

                        offset.pos.x += offset.x;
                        offset.pos.y += offset.y;
                    }
                })
            }
        }
    }
}

console.log(locations.length)
