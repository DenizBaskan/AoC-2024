const fs = require('fs');

let data = fs.readFileSync("./inputs/6.txt")
.toString()
.split("\n")

for (let i = 0; i < data.length; i++) {
    const index = data[i].indexOf("^");

    if (index != -1) {
        var start = { x: index, y: i };
        break;
    }
}

data = data.map(line => line.split(""));

function compute(d) {
    let pos = {...start}, mp = {};

    while (true) {
        let future = {...pos};
        const directions = ["^", ">", "v", "<"];
    
        switch (d[pos.y][pos.x]) {
            case "^":
                future.y--;
                break;
            case ">":
                future.x++;
                break;
            case "<":
                future.x--;
                break;
            case "v":
                future.y++;
                break;
        }
    
        if (future.y < 0 || future.y >= d.length || future.x < 0 || future.x >= d.length) {
            break;
        }
        
        if (d[future.y][future.x] == "#") {
            const key = future.y + ":" + future.x + ":" + d[pos.y][pos.x];

            if (mp[key] === undefined) {
                mp[key] = 1;
            } else if (mp[key] == 1) {
                return true;
            }

            const index = directions.indexOf(d[pos.y][pos.x]);
            d[pos.y][pos.x] = directions[index == 3 ? 0 : index + 1]
        } else {
            const direction = d[pos.y][pos.x];
            pos = future;
            d[pos.y][pos.x] = direction;
        }
    }

    return d;
}

console.log(compute(JSON.parse(JSON.stringify(data))).reduce((acc, line) => {
    return acc + line.filter(v => v != "#" && v != ".").length;
}, 0));

let total = 0;

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data.length; col++) {
        const input = JSON.parse(JSON.stringify(data)) // cpy
        const prev = input[row][col];
        
        if (prev != "#" && prev != "^") {
            input[row][col] = "#"
        }
        
        if (compute(input) === true) {
            total++;
        }
    }
}

console.log(total); // 22s
