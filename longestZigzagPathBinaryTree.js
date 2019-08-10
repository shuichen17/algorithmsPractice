/*find the longest zigzag length starts at the root of a binary */

var TreeNode = function(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}
var root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
var branch1 = root.left;
var branch2 = root.right;
branch1.left = new TreeNode(4);
branch2.left = new TreeNode(5);


function longestZigzagPath (node) {
  let leftPath = 0; //go left then go right
  let rightPath = 0; //go right then go left
  let cur = node;
  while(cur !== null) {
    if(leftPath % 2 === 0) {
      cur = cur.left;
    
    } else {
      cur = cur.right;
    }
    leftPath++;
  }
  cur = node;
  while(cur !== null) {
    if(rightPath % 2 === 0) {
      cur = cur.right;
    } else {
      cur = cur.left;
    }
    rightPath++;
  }
  //console.log('left', leftPath)
  //console.log('right', rightPath)
  return Math.max(leftPath, rightPath);
}
longestZigzagPath(root)