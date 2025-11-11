export default async function runner(input: string){
  const inStr = await Bun.file(input).text();
  
  let floor = 0;
  for(const char of inStr){
    if(char === '('){
      floor++;
    } else if(char === ')'){
      floor--;
    }
  }
  
  console.log(floor);
}
