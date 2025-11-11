import fs from 'node:fs';

type Vec2d = {x: number, y: number};

const directions: Vec2d[] = [ {x: 1, y: 0}, {x: 0, y: 1}, {x:-1, y:0}, {x: 0, y: -1}]

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', async (err, data) => {
    if (err) throw err;
    let grid: boolean[][] = []

    let start: Vec2d
    let end: Vec2d

    data.split("\n").forEach((value, index) => {
      for (let i = 0; i < value.length; i++) {
        if (grid[i] === undefined) grid[i] = [];
        (grid[i]??[])[index] = value.charAt(i)==='#'
        if(value.charAt(i) === 'S') start={x: i, y: index}
        if(value.charAt(i) === 'E') end={x: i, y: index}
      }
    })

    const count: number = solve(start, end)

    console.log(count)
  })
}

function solve(start: Vec2d, end: Vec2d): number {
  let r :number = 0

  return r
}

function move(location: Vec2d, direction: number, grid: boolean[][]): number {
  const newLocation: Vec2d = {x: location.x, y: location.y}
  newLocation.x += (directions[direction]??{x: 0, y: 1}).x
  newLocation.y += (directions[direction]??{x: 0, y: 1}).y

  if(grid[newLocation.x]??[][newLocation.y])  return -1;
  location = newLocation;

  const m:number = move(location, direction, grid)
  const t:number = turn(location, direction, grid)
  if(m===-1 && t === -1) return -1;
  if(m===-1) return t;
  if(t===-1) return m;
  return (m<t ? m : t)
}

function turn(location: Vec2d, direction: number, grid: boolean[][]): number {
  direction = (direction +1)%4
  const m:number = move(location, direction, grid)
  const t:number = turn(location, direction, grid)
  if(m===-1 && t === -1) return -1;
  if(m===-1) return t;
  if(t===-1) return m;
  return (m<t ? m : t)
}