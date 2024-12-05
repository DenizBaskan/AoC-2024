const fs = require('fs');

const data = fs.readFileSync("./inputs/5.txt")
.toString()
.split("\n\n");

const numbers = data[1].split("\n").map(line => { return line.split(",").map(Number) });
let rules = {};

data[0].split("\n").map(line => { return line.split("|").map(Number) }).forEach(([x, y]) => {
    if (!rules[x]) {
        rules[x] = [];
    }
    rules[x].push(y);
})


let total = 0;

console.log(numbers.reduce((acc, set) => {
    let before = [set[0]];

    for (let i = 1; i < set.length; i++) {
        const num = set[i];

        for (const b of before) {
            if ((rules[num] || []).includes(b)) {
                for(const n of set) {
                    let tmp = [];

                    (rules[n] || []).forEach(t => {
                        if (set.includes(t)) {
                            tmp.push(t);
                        }
                    })

                    if (tmp.length == ((set.length - 1) / 2)) {
                        total += n;
                        return acc;
                    }
                }
            }
        }
        
        before.push(num);
    }

    return acc + set[(set.length - 1) / 2];
}, 0))

console.log(total);
