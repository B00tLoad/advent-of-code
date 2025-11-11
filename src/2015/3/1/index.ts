export default async function runner(inputPath: string) {
  const input = await Bun.file(inputPath).text();
  
  let houses = 1;
  
  const map: boolean[][] = [];
  
  let x: number = 0;
  let y: number = 0;
  
  
  map[0] = []
  map[0][0] = true;
  
  for (var char of input) {
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
      }
      if(!map[x]) map[x] = [];
      if(map[x][y]) continue;
      map[x][y] = true;
      
      houses++;
    
  }
  
  console.log(houses);
}
