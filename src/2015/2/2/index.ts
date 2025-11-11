export default async function runner(inputPath: string) {
  const input = await Bun.file(inputPath).text();
  
  let totalArea = 0;
  
  input.split("\n").forEach(line => {
    if (line.trim() === '') return;
    
    const [l, w, h]: number[] = line.split("x") as unknown as number[];
    
    if(!l || !w || !h) return;
    const c1 = 2*l+2*w;
    const c2 = 2*w+2*h;
    const c3 = 2*l+2*h;
    
    
    const v = l*w*h;
    
    const a = Math.min(c1, c2, c3) + v;
    totalArea += a;
  })
  
  console.log(totalArea)
}
