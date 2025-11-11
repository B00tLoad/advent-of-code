export default async function runner(inputPath: string) {
  const input = await Bun.file(inputPath).text();
  
  let cnt: number = 0;
  
  let houses = 1;
  
  const map: boolean[][] = [];
  
  let x: number = 0;
  let y: number = 0;
  
  let roboX: number = 0;
  let roboY: number = 0;
  
  map[0] = []
  map[0][0] = true;
  for (var char of input) {
    
    cnt++;
    if(cnt%2 === 1) {
      switch (char) {
        case '>':
          x++;
          break;
        case '<':
          x--;
          break;
        case '^':
          y++;
          break;
        case 'v':
          y--;
          break;
        default: break;
      }
      if(!map[x]) map[x] = [];
      if(map[x]![y]) {
        continue;
      }
      map[x]![y] = true;
      
      houses++;
    } else {
      switch (char) {
        case '>':
          roboX++;
          break;
        case '<':
          roboX--;
          break;
        case '^':
          roboY++;
          break;
        case 'v':
          roboY--;
          break;
        default: break;
      }
      if(!map[roboX]) map[roboX] = [];
      if(map[roboX]![roboY]) {
        continue;
      }
      map[roboX]![roboY] = true;
      
      houses++;
    }
    
  }
  
  console.log(houses);
}
