const fs = require('fs');

let data = fs.readFileSync("./inputs/14.txt")
.toString()
.split("\n")

const gx = 101, gy = 103, s = 100;
const bx = ((gx - 1) / 2), by = ((gy - 1) / 2);
const qs = [[[0, bx-1], [0, by-1]], [[bx+1, gx-1], [0, by-1]], [[0, bx-1], [by+1, gy-1]], [[bx+1, gx-1], [by+1, gy-1]]]

let pos = []

for (const line of data) {
    const [px, py] = line.split("p=")[1].split(" ")[0].split(",").map(Number)
    const [vx, vy] = line.split("v=")[1].split(",").map(Number)

    pos.push({p: [px, py], v: [vx, vy]});
}

const mp = {}

for (let t = 0; t < s; t++) {
    pos.forEach(({p, v}, i) => {
        p[0] += v[0];
        p[1] += v[1];

        if (p[0] < 0) p[0] = gx - (0 - p[0]);
        if (p[1] < 0) p[1] = gy - (0 - p[1]);
        if (p[0] >= gx) p[0] = (p[0] - gx);
        if (p[1] >= gy) p[1] = (p[1] - gy);
    
        pos[i] = {p, v};

        if (t == s - 1) {
            const key = p[0].toString() + ":" + p[1].toString();
            if (!mp[key]) {
                mp[key] = 0;
            }

            mp[key]++;
        }
    })
}

function rng(x, y, rx, ry) {
    if (x >= rx[0] && x <= rx[1] && y >= ry[0] && y <= ry[1]) return true
    return false
}

qr = [0, 0, 0, 0]

for (const key in mp) {
    const [x, y] = key.split(":").map(Number);

    qs.forEach(([rx, ry], i) => {
        if (rng(x, y, rx, ry)) qr[i] += mp[key];
    })
}

console.log(qr[0] * qr[1] * qr[2] * qr[3])
let t = 0;

while (true) {
    pos.forEach(({p, v}, i) => {
        p[0] += v[0];
        p[1] += v[1];

        if (p[0] < 0) p[0] = gx - (0 - p[0]);
        if (p[1] < 0) p[1] = gy - (0 - p[1]);
        if (p[0] >= gx) p[0] = (p[0] - gx);
        if (p[1] >= gy) p[1] = (p[1] - gy);
    
        pos[i] = {p, v};

        const key = p[0].toString() + ":" + p[1].toString();
        if (!mp[key]) {
            mp[key] = 0;
        }
        
        mp[key]++;
    })

    let rows = {}

    pos.forEach(({p, _}) => {
        if (!rows[p[1]]) {
            rows[p[1]] = [];
        }

        rows[p[1]].push(p[0])
    })
    
    let pic = ""

    for (let i = 0; i < gy; i++) {
        if (!rows[i]) {
            pic += Array(gx).fill(".").join("") + "\n"
        } else {
            let str = ""
            for (let j = 0; j < gx; j++) {
                if (rows[i].includes(j)) {
                    str += "*"
                } else {
                    str += "."
                }
            }
            pic += str + "\n"
        }
    }

    if ((t-67)%103==0) { // change to ur shit
        console.log(pic, t)
    }

    t++;

}

/*

Helper script for manual part 2 solve

*/
