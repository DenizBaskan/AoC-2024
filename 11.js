const fs = require('fs');

let data = fs.readFileSync("./inputs/11.txt")
.toString()
.split(" ")
.map(v => Number(v));

/*
Didnt think of the fact that there are so many repeated stones
so ended up creating an insanely slow solution but oh well
*/

function blink(arr) {
    let replaced = []

    arr.forEach(v => {
        const str = v.toString();

        if (v == 0) {
            replaced.push(1)
        } else if (str.length % 2 == 0) {
            replaced.push(Number(str.substring(0, str.length / 2)))

            let s = str.substring(str.length / 2)
            
            while (s[0] == "0") {
                s = s.substring(1);
            }

            replaced.push(Number(s))
        } else {
            replaced.push(v * 2024)
        }
    })

    return replaced
}

let total = 0

p1 = [...data]
for (let i = 0; i < 25; i++) {
    p1 = blink(p1)
}

console.log(p1.length)

let mp = new Map()

for (let i = 0; i < 10; i++) {
    d = [i]
    for (let j = 0; j < 40; j++) {
        d = blink(d)
        mp.set(i.toString() + ":" + j.toString(), d.length)
    }
}

for (let i = 0; i < 75; i++) {
    if (i >= 35) {
        arr = []
        data.forEach(v => {
            const cmp = [0,1,2,3,4,5,6,7,8,9]
            if (cmp.includes(v)) {
                const key = v.toString() + ":" + (74 - i).toString()
                total += mp.get(key);
            } else {
                arr.push(v)
            }
        })
        data = arr
    }

    data = blink(data)
}

console.log(data.length + total)
