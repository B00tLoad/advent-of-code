export default async function runner(inputPath: string) {
  const input = await Bun.file(inputPath).text();
  
  let totalArea = 0;
  
  input.split("\n").forEach(line => {
    if (line.trim() === '') return;
    
    const [l, w, h]: number[] = line.split("x") as unknown as number[];
    
    if(!l || !w || !h) return;
    const s1 = l*w;
    const s2 = w*h;
    const s3 = l*h;
    
    const a = 2*s1 + 2*s2 + 2*s3 + Math.min(s1, s2, s3);
    totalArea += a;
  })
  
  console.log(totalArea)
}
