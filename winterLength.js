/*2. 在一个array中找到一个index使得这个index的所有左边数字都比右边的数字要小。
要求左边的数字尽可能的最少然后返回左边这部分一共有多少个数字。
比如[-5, -5, -5, -42, 6, 8]的话，答案就是4
*/
/*Time Complexity: O(n^2)*/
var winterLength = function(arr) {

  for (let i = 0; i < arr.length; i++) {
    let left_max = -Number.MAX_VALUE;
    let right_min = Number.MAX_VALUE;
    let k = 0;
    let j = i + 1;
    while(k <= i) {
       left_max = Math.max(left_max, arr[k]);
       k++;
    }
    while(j < arr.length) {
      right_min = Math.min(right_min, arr[j]);
      j++;
    }
    if(left_max < right_min) {
      return i + 1;
    }
  }
}
/*Time Complexity: O(n)*/
var winterLength = function(arr) {
  let dp = new Array(arr.length);
  dp[0] = arr[0];
  for(let i = 1; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1], arr[i]);
  }
  
  let right_min = arr[arr.length - 1];
  let index = -1;
  for(let i = arr.length - 2; i >= 0; i--) {
    if(dp[i] < right_min) {
      index = i;
    }
    right_min = Math.min(right_min, arr[i]);
  }
  return index + 1;
}
//[-5, -5, -5, -42, 6, 12]
//[5, -2, 3, 8, 6]
//[3, 1, 4, 1, 5, 7]
var nums = [3, 1, 4, 1, 5, 7];
winterLength(nums)


