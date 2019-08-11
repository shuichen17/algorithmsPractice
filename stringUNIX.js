/*
一个string的UNIX就是这个string里有几个unique的character。给一个有uppercase letters组成的string，求它每个substring的UNIX的和。比如‘ABCA’

'A' - 1
'AB' - 2
'ABC' - 3
'ABCA' - 2
'B' - 1
'BC' - 2
'BCA' - 3
'C' - 1
'CA' - 2
'A' - 1

result = 18
===================================================================
给一个String ex: "ACAX"其substring和仅出现一次的char个数.  (Position: SE-Payment)
A 1
AC 2
ACA 1
ACAX 2
C 1
CA 2
CAX 3
A 1
AX 2
X 1
相加等于16 返回16
*/

var unixSum = function (str) {
  let res = 0;
  let temp = '';
  let dp = [];
  let pos = 0;
  dp[pos] = 0;
  for(let i = 0; i < str.length; i++) {
       temp = temp + str[i];
       dp[pos + 1] = 1;
       res = res + dp[pos + 1];
       pos = pos + 1;
       for(let j = i + 1; j < str.length; j++) {
         temp = temp + str[j];
         
         if(temp.indexOf(temp[j]) === temp.lastIndexOf(temp[j])){
            dp[pos + 1] = dp[pos] + 1;
            
         } else {
           dp[pos + 1] = dp[pos] - 1;
         }
         res = res + dp[pos + 1];
         pos = pos + 1;
       }
       temp = '';
       
  }
  console.log(dp)
  return res;
}
// 'ACAX'
unixSum('ABCA')
