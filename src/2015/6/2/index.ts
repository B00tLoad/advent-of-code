export default async function runner(inputPath: string) {
  const input = await Bun.file(inputPath).text();
  
  const lights: number[][] = []
  
  for(let x = 0; x<1000; x++){
    lights[x] = [];
    for(let y = 0; y<1000; y++){
      lights[x]![y]=0;
    }
  }
  
  input.split("\n").forEach(line => {
    if(line.trim() === '') return;
    const [_1, command, x1, y1, x2, y2, _2] = line.split(/^(\w*(?:\s\w*)?)\s(\d*),(\d*)\s(?:\w*)\s(\d*),(\d*)$/gm);
    
    for(let x = parseInt(x1!); x<=parseInt(x2!); x++){
      for(let y = parseInt(y1!); y<=parseInt(y2!); y++){
        switch (command) {
          case "turn on":
            lights[x]![y]!+=1;
            break;
          case "turn off":
            lights[x]![y]! -= 1;
            lights[x]![y]! = Math.max(lights[x]![y]!, 0)
            break;
          case "toggle":
            lights[x]![y]!+=2;
            break;
        }
      }
    }
    
  })
  
  let cnt = 0;
  
  for(let x = 0; x<1000; x++){
    for(let y = 0; y<1000; y++){
      cnt+=lights[x]![y]!;
    }
  }
  console.log(cnt)
  
}
