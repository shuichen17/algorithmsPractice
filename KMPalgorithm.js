/*参考视频： 
01     https://www.youtube.com/watch?v=dgPabAsTFa8
02：   https://www.youtube.com/watch?v=3IFxpozBs2I
*/

var prefixTable = function (pattern) {
  let n = pattern.length;
  let prefix = new Array(n).fill(0);
  let i = 1;
  let len = 0;
  while(i < n) {
    if(pattern[i] === pattern[len]) {
      prefix[i] = len + 1;
      len++;
      i++;
    } else {
      if(len > 0) {
        len = prefix[len - 1];
      } else {
        prefix[i] = len;
        i++;
      }
    }
  }
  return prefix;
}

function movePrefixTable(table) {
  let n = table.length;
  for(let i = n - 1; i > 0; i--) {
    table[i] = table[i - 1];
  }
  table[0] = -1;
  return table;
}

function kmpSearch (text, pattern) {
 let n = pattern.length;
 let m = text.length;
 let prefix = prefixTable(pattern);
 let table = movePrefixTable(prefix);
 let i = 0;
 let j = 0;
 let flag = false;
 while(i < m) {
   if(j === n - 1 && text[i] === pattern[j]) {
     flag = true;
     console.log('position:', i - j);
     j = table[j];
   }
   if(text[i] === pattern[j]) {
     i++;
     j++;
   } else {
     j = table[j];
     if(j === -1) {
       i++;
       j++;
     }
   }
 }
  if(flag === false) console.log('not found')
}
var p = 'ABABCABAA';
var text = 'ABABAUCABAADFE';
kmpSearch(text, p);
