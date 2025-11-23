function knightMoves(from, to) {
    if (invalidMove(from) || invalidMove(to)) {
        console.log("please check your input");
        return;
    }

    const validMoves = [
        [-2, 1], [-1, 2], [1, 2], [2, 1],
        [2, -1], [1, -2], [-1, -2], [-2, -1]
    ];

    const queue = [from];
    const visited = new Set();
    visited.add(key(from));

    const parent = new Map();

    let index = 0;

    while (index < queue.length) {
        const [cx, cy] = queue[index];

        if (cx === to[0] && cy === to[1]) {
            const path = reconstructPath(parent, from, to);
            console.log(`You made it in ${path.length - 1} moves! Here is your path:`);
            path.forEach(move => console.log(move));
            return;
        }

        for (let [dx, dy] of validMoves) {
            const x = cx + dx;
            const y = cy + dy;

            if (!invalidMove([x, y])) {
                const k = `${x},${y}`;
                if (!visited.has(k)) {
                    visited.add(k);
                    parent.set(k, key([cx, cy]));
                    queue.push([x, y]);
                }
            }
        }

        index++;
    }
}

function invalidMove(arr) {
    return arr[0] < 0 || arr[0] > 7 || arr[1] < 0 || arr[1] > 7;
}

function key(arr) {
    return `${arr[0]},${arr[1]}`;
}

function reconstructPath(parent, from, to) {
    const path = [];
    let current = key(to);

    while (current !== key(from)) {
        path.push(`[${current}]`);
        current = parent.get(current);
    }

    path.push(`[${from[0]},${from[1]}]`);
    return path.reverse();
}

knightMoves([3, 3], [4, 3]);
