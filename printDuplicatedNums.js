/* 一个int数组 里面会有重复的数字，返回一个duplicated number array e.g. [1,2,3,4,5] -> [] , [1,1,2,3,3,3,3] ->[1,3,3], [2,2] ->[2] 
但是题目里面又说了一句 if a number shows up three times it should show up twice in the answer as it duplicates twice 然后我就懵了啊 到底是more than 3？ 还是 给的example出问题了？
*/
/*第一种 sorted array */
var printDuplivate = function(arr) {
  let count = 1;
  let num = arr[0];
  let res = [];
  for (let i = 1; i < arr.length; i++) {
    if (num === arr[i]) {
      count++;
    } else {
      if (count >= 3) {
        res.push(num, num);
      } else if (count === 2) {
        res.push(num);
      }
      num = arr[i];

      count = 1;
    }

  }
  if(count >= 3) {
    res.push(arr[arr.length - 1], arr[arr.length - 1]);
  } else if (count === 2) {
    res.push(arr[arr.length - 1]);
  }
  return res;

} 

//[1,2,3,4,5]
//[1,1,2,3,3,3,3]

/*var nums = [2, 2]
printDuplivate(nums)
*/
/*第二种， unsorte array */
var printDuplivateUnsorted = function (arr) {
  let obj = {};
  let res = [];
  for(let i = 0; i < arr.length; i++) {
    if(obj[arr[i]] === undefined) {
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++;
      }
  }
  for(let key in obj) {
    if(obj[key] === 2) {
      res.push(Number(key));
    } else if (obj[key] >= 3) {
      res.push(Number(key), Number(key));
    }
  }
  return res;
}
var nums = [1, 3, 2, 3, 4, 1, 2, 3, 2]
printDuplivateUnsorted(nums)