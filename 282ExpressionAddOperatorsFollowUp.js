/*
输入为int 数组 和一个target 插入 + 或者 * 看看能否计算出答案 return true or false  然后可以选择使用整个数组 也可以选择只使用一部分数组 所以答案看你的选择 他们好像会人工查看代码？
*/
var isReachTarget = function(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    if(dfs(arr, target, '', i, i, 0, 0)) {
      return true;
    }
  }
  return false;
}

var dfs = function (nums, target, path, start, pos, curSum, prev) {
  
  if(curSum === target) {
    
    return true;
  }
  if(pos >= nums.length) {
    return false;
  }
  let cur = nums[pos];
  if(pos === start) {
    if(dfs(nums, target, path + cur, start, pos + 1, curSum + cur, cur)) {
      return true;
    }
  } else {
    if(dfs(nums, target, path + '+' + cur, start, pos + 1, curSum + cur, cur)) {
      return true;
    }
    if(dfs(nums, target, path + '*' + cur, start, pos + 1, curSum - prev + prev * cur, prev * cur)) {
      return true;
    }
  }
  return false;
}
var nums = [1, 1, 2, 3, 3, 3, 3];
isReachTarget(nums, 9)