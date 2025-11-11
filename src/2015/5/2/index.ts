export default async function runner(inputPath: string){
  const input = await Bun.file(inputPath).text();
  
  let nice = 0;
  
  ["aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj"]
  
  input.split("\n").forEach(line => {
      if(line.trim() === "") return;
      if(!_hasDoubleWithGap(line)) return;
      if(!_hasDoublePair(line)) return;
      nice++;
      return;
    }
  )
  console.log(nice)
}

function _hasDoublePair(string: string){
  let ret = false;
  
  string.split('').forEach((value, index, array) => {
    const search = `${value}${array[index+1]}`
    if(string.substring(index+2).indexOf(search) !== -1) ret = true;
  })
  
  return ret;
}

function _hasDoubleWithGap(string: string) {
  let ret = false;
  string.split('').forEach((value, index, array) => {
    if(array[index+2] === value) {
      ret = true;
    }
  })
  return ret;
}
