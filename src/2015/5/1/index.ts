export default async function runner(inputPath: string){
  const input = await Bun.file(inputPath).text();
  
  let nice = 0;
  
  ["aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj"]
  
  input.split("\n").forEach(line => {
      if(line.trim() === "") return;
      if(_countVowels(line)<3) {
        return;
      }
      if(line.indexOf("ab") !== -1) return;
      if(line.indexOf("cd") !== -1) return;
      if(line.indexOf("pq") !== -1) return;
      if(line.indexOf("xy") !== -1) return;
      if(!_hasDouble(line)) return;
    nice++;
    return;
    }
  )
  console.log(nice)
}

function _countVowels(string: string){
  return string.split('').filter(value => 'aeiou'.indexOf(value)!==-1).length
}

function _hasDouble(string: string) {
  let ret = false;
  string.split('').forEach((value, index, array) => {
    if(array[index+1] === value) {
      ret = true;
    }
  })
  return ret;
}
