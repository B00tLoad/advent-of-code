export default async function runner(inputPath:string){
  const input = await Bun.file(inputPath).text();
  
  let diff = 0;
  
  input.split("\n").forEach(line => {
    if(line.trim() === '') return;
    const cLength = line.trim().length;
    // DO NOT DO THIS!!!!!! THIS IS UNSAFE!!!!!!
    const eLength = eval(`${line.trim()}.length`);
    const ecDiff = cLength-eLength;
    diff += ecDiff;
  })
  
  console.log(diff)
}
