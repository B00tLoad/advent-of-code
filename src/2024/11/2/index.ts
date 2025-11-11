import fs from 'node:fs';

const cache: Map<string, number> = new Map();

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', async (err, data) => {
    if (err) throw err;
    let stones: string[] = data.split(" ")

    let count: number = 0

    stones.forEach(stone => {count+=solveStone(stone, 75)})

    console.log(count)
  })
}

function solveStone(input: string, depth: number): number{
  const cachekey = `${input};${depth}`
  if(depth === 0) return 1;
  if(cache.has(cachekey)) {
    return cache.get(cachekey)??0
  }
  if(parseInt(input) === 0) {
    const result = solveStone("1", depth-1)
    cache.set(cachekey, result)
    return result
  } else if(input.length%2 !== 1) {
    const slicepoint = input.length/2
    const stoneA: number = solveStone(input.slice(0, slicepoint), depth-1)
    const stoneB: number = solveStone(input.slice(slicepoint), depth-1)
    const result = stoneA+stoneB
    cache.set(cachekey, result)
    return result
  } else {
    const result = solveStone((parseInt(input)*2024).toString(), depth-1)
    cache.set(cachekey, result)
    return result
  }
}