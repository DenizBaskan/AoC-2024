const fs = require('fs');

let data = fs.readFileSync("./inputs/9.txt")
.toString()
.split("")
.map(Number);

function next_free(arr, len) {
    let build = 0

    for (let i = 0; i < arr.length; i++) {
        if (build == len) {
            return i - build;
        }

        if (arr[i] == ".") {
            build++
        } else {
            build = 0;
        }
    }

    return -1
}

function gaps_exist(arr) {
    foundDot = false

    for (let i = 0; i < arr.length; i++) {
        if (foundDot && arr[i] != ".") {
            return true
        } else if (arr[i] == ".") {
            foundDot = true;
        }
    }

    return false
}

let line = []

for (let i = 0; i < data.length; i++) {
    if (i % 2 == 0) { // file
        for (let j = 0; j < data[i]; j++) {
            line.push((i / 2).toString());
        }
    } else {
        for (let j = 0; j < data[i]; j++) {
            line.push(".")
        }
    }
}

let prev = [...line];

while (gaps_exist(line)) {
    line[next_free(line, 1)] = line[line.length - 1];
    line = line.slice(0, -1);
}

let checksum = 0;

line.forEach((v, i) => {
    if (v != ".") {
        checksum += i * Number(v);
    }
})

console.log(checksum)

checksum = 0;
line = prev;

let group = []

for (let i = line.length - 1; i >= 0; i--) {
    if (group.length == 0 && line[i] != ".") {
        group = [line[i]]
    } else if (group[0] != line[i]) {
        const free = next_free(line, group.length);

        if (free != -1 && free < i) {
            for (let j = free; j < free + group.length; j++) {
                line[j] = group[0];
            }

            for (let j = i + 1; j < i + 1 + group.length; j++) {
                line[j] = "."
            }
        }

        if (line[i] != ".") {
            group = [line[i]]
        } else {
            group = []
        }

    } else if (group[0] == line[i]) {
        group.push(line[i])
    }
}

line.forEach((v, i) => {
    if (v != "." && v != "#") {
        checksum += i * Number(v);
    }
})

console.log(checksum)
