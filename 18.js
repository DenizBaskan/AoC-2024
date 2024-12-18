const fs = require('fs')

const data = fs.readFileSync("./inputs/18.txt").toString().split("\n")
const len = 71

function bfs(coords) {
    let queue = ["0,0"], visited = {"0,0":1}, parent = {}

    while (queue.length != 0) {
        const [x, y] = queue.shift().split(",").map(Number)

        if (x == (len-1) && y == (len-1)) break

        for (const [dx, dy] of [[1,0],[0,1],[-1,0],[0,-1]]) {
            const next = (x + dx).toString() + "," + (y + dy).toString()

            if (x + dx >= 0 && x + dx <= (len-1) && y + dy >= 0 && y + dy <= (len-1) && !coords.includes(next) && !visited[next]) {
                queue.push(next)
                parent[next] = x.toString() + "," + y.toString()
                visited[next] = 1
            }
        }
    }

    let c = (len-1).toString() + "," + (len-1).toString(), total = -1
    while (c) {
        total++
        c = parent[c]
    }

    return total
}

console.log(bfs(data.slice(0,1024)))

for (let i = 2000; i < data.length; i++) { // using force
    if (bfs(data.slice(0,i)) == 0) {
        console.log(data[i-1])
        break
    }
}
