/*
Write a function:

function solution(A);

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000..1,000,000].

其实这题是 leetcode 41
*/
/*Space: O(n) */
function solution(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    let res = [];
    for(let i = 0; i < A.length; i++) {
        if(A[i] >= 0) {
            res[A[i]] = true;
        }
    }
    ```
    for(let i = 1; i <= res.length; i++) {
        if(res[i] === undefined) {
            return i;
        }
    }
    return 1;
}
```

/*space: O(1)*/
var missingInteger = function (arr) {
  let n = arr.length;
  for(let i = 0; i < arr.length; i++) {
    while(arr[i] >= 1 && arr[i] <= n && arr[arr[i] - 1] !== arr[i]) {
      let temp = arr[arr[i] - 1];
      arr[arr[i] - 1] = arr[i];
      arr[i] = temp;
    }
  }
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] !== i + 1) return i + 1;
  }
  return n + 1;
}
var nums = [1,2,0];
missingInteger(nums)
