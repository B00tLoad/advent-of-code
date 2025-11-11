export default async function runner(input: string){
  const inStr = await Bun.file(input).text();
  
  let floor = 0;
  let index = 0;
  for(const char of inStr){
    index++;
    if(char === '('){
      floor++;
    } else if(char === ')'){
      floor--;
    }
    if(floor === -1){
      console.log(index);
      break;
    }
  }
}
