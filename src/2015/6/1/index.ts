export default async function runner(inputPath: string) {
  const input = await Bun.file(inputPath).text();
  
  const lights: boolean[][] = []
  
  for(let x = 0; x<1000; x++){
    lights[x] = [];
    for(let y = 0; y<1000; y++){
      lights[x]![y]=false;
    }
  }
  
  input.split("\n").forEach(line => {
    if(line.trim() === '') return;
    const [_1, command, x1, y1, x2, y2, _2] = line.split(/^(\w*(?:\s\w*)?)\s(\d*),(\d*)\s(?:\w*)\s(\d*),(\d*)$/gm);
    
    console.log(line, x1, x2, y1, y2, command)
    
    for(let x = parseInt(x1!); x<=parseInt(x2!); x++){
      for(let y = parseInt(y1!); y<=parseInt(y2!); y++){
        switch (command) {
          case "turn on":
            lights[x]![y]=true;
            break;
          case "turn off":
            lights[x]![y]=false;
            break;
          case "toggle":
            lights[x]![y]=!lights[x]![y];
            break;
          }
      }
    }
    
  })
  
  let cnt = 0;
  
  for(let x = 0; x<1000; x++){
    for(let y = 0; y<1000; y++){
      if (lights[x]![y]) cnt++;
    }
  }
  console.log(cnt)
  
}
