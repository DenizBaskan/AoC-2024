const fs = require('fs');

const input = fs.readFileSync("./inputs/2.txt")
.toString()
.split("\n")
.map((line) => line.split(" ").map(Number));

function items_safe(items) {
    const increasing = items[1] > items[0];

    for (let i = 1; i < items.length; i++) {
        const diff = Math.abs(items[i] - items[i - 1]);
        if (![1, 2, 3].includes(diff) || (items[i] > items[i - 1]) != increasing) {
            return false;
        }
    }

    return true;
}

const one = input.reduce((acc, items) => {
    return acc + (items_safe(items) ? 1 : 0)
}, 0)

console.log(one);

const two = input.reduce((acc, items) => {
    let item_variants = [items];

    for (let i = 0; i < items.length; i++) {
        item_variants.push([...items].filter((_, j) => j != i))
    }

    for (let i = 0; i < item_variants.length; i++) {
        if (items_safe(item_variants[i])) {
            return acc + 1
        }
    }

    return acc
}, 0)

console.log(two);
