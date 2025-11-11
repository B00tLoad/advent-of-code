import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', async (err, data) => {
    if (err) throw err;
    let count = 0;
    let grid: number[][] = []

    data.split("\n").forEach((value, index) => {
      for (let i = 0; i < value.length; i++) {
        if (grid[i] === undefined) grid[i] = []
        if (grid[i] === undefined) throw new Error();
        // @ts-ignore
        grid[i][index] = parseInt(value.charAt(i))
      }
    })

    for (let x = 0; x < grid.length; x++) {
      // @ts-ignore
      for (let y = 0; y < grid[x].length; y++) {
        const found = findWord(grid, x, y, 0)
        count+=found;
      }
    }

    console.log(count)
  })
}

function findWord(grid: number[][], x: number, y: number, elevation: number): number {
  // @ts-ignore
  if (x < 0 || x === grid.length || y < 0 || y === grid[x].length) {
    return 0;
  }
  // @ts-ignore
  if (grid[x][y] === elevation) {
    if(elevation === 9) return 1
    let found = 0;
    for (let dX = -1; dX < 2; dX++) {
      for (let dY = -1; dY < 2; dY++) {
        if (dX === 0 && dY === 0) continue;
        if(dX !== 0 && dY !== 0) continue;
        found += findWord(grid, x + dX, y + dY, elevation+1);
      }
    }
    return found;
  } else {
    return 0;
  }
}