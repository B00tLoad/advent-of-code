import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', async (err, data) => {
    if (err) throw err;
    let stones: number[] = data.split(" ").map<number>(value => parseInt(value))

    for (let x = 0; x < 25; x++) {
      let newstones: number[] = []
      stones.forEach((value) => {
        if(value === 0) {
          newstones.push(1);
        } else if(value.toString().length%2 !== 1) {
          newstones.push(parseInt(value.toString().slice(0, value.toString().length/2)))
          newstones.push(parseInt(value.toString().slice(value.toString().length/2 , value.toString().length)))
        } else {
          newstones.push(value*2024)
        }
      })
      stones = newstones
    }

    console.log(stones.length)
  })
}