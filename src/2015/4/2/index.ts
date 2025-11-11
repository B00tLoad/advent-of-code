export default async function runner(inputPath: string){
  const input = (await Bun.file(inputPath).text()).trimEnd();
  
  let i = 1;
  while (true){
    const hash = Bun.MD5.hash(`${input}${i}`, "hex")
    if(hash.startsWith("000000")) {
      console.log(i);
      return;
    }
    i++;
  }
}
