import fs from 'node:fs';

type FenceArea = {price: number, area: number, fence: number}
type Vec2d = {x: number, y: number}

const calculationIndex: Set<string> = new Set();

const neighbors: Vec2d[] = [{x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x:1, y:0}]

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', async (err, data) => {
    if (err) throw err;
    const rows: string[] = data.split("\n")
    const grid: string[][] = rows.map(row => [...row])

    let cost = 0;

    grid.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if(grid[colIndex] === undefined) grid[colIndex] = []
        grid[colIndex][rowIndex] = value
      })
    })

    /*for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < (grid[x]??[]).length; y++) {
        if(calculationIndex.has(`${x};${y}`)) continue
        const r = calculateFencePrice(grid, x, y)
        console.log(r)
        cost += r.price
      }
    }*/

    const r = calculateFencePrice(grid, 0, 0)
    console.log(r)
    cost += r.price

    console.log(cost)

  })
}

function calculateFencePrice(grid: string[][], x: number, y: number, previous: string = "", lookupindex: Set<string> = new Set()): FenceArea {

  let area: number = 1, fence: number = 0

  if(x<0 || y<0 || grid.length<x || (grid[x]??[]).length<y) return {price: 0, area: 0, fence: 1};

  const current = ((grid[x]??[])[y])??""
  if(current !== previous && previous !== "") return {area: 0, price: 0, fence: 1}

  if (lookupindex.has(`${x};${y}`)) return {price: 0, fence: 0, area: 0}

  console.log(x,y, lookupindex)

  lookupindex.add(`${x};${y}`)

  if(current === previous) {
    calculationIndex.add(`${x};${y}`)
  }

  for (const n of neighbors) {
    const r = calculateFencePrice(grid, x+n.x, y+n.y, current, lookupindex)
    fence += r.fence
    area += r.area
  }

  return {fence: fence, area: area, price: fence*area}
}