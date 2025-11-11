export default async function runner(inputPath:string){
  const input = await Bun.file(inputPath).text();
  
  let diff = 0;
  
  input.split("\n").forEach(line => {
    if(line.trim() === '') return;
    const eLength = line.trim().length;
    
    const cLine = `"${line.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}"`;
    const cLength = cLine.length;
    
    
    const ecDiff = cLength-eLength;
    diff += ecDiff;
  })
  
  console.log(diff)
}
