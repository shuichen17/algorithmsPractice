/*
2. 沉船问题
Given N - board的size， List<String> - 船的坐标， List<String> - 炮弹坐标
船坐标(1A 2B, 3A 4B) ->表示有两个船左上和右下坐标点分别是船1是（1A, 2B)  船2是(3A, 4B)
炮弹坐标是(1A 2A 3A) ->表示有三个炮弹分别击打坐标点1A, 2A, 3A 
图大概就是这样 假设N = 4
    A B C D 
1  X X
2  X X
3  X X
4  X X

如果一个船全部被击中，船就会沉，如果一个船部分被击中，就是hitNotSunk. 求最后沉船的数量和hitNotSunk的数量。
这个例子返回(0, 2)
*/

var shipStatics = function (ships, bombs) {
  let sunk = 0;
  let hitNotSunk = 0;
  let bombSet = new Set(bombs);
  for(let i = 0; i < ships.length; i++) {
    let cur = ships[i].split(' ');
    let topLeft = cur[0];
    let bottomRight = cur[1];
    let row1 = topLeft.slice(0, topLeft.length - 1);
    let row2 =  bottomRight.slice(0, bottomRight.length - 1);
    let col1 = topLeft[topLeft.length - 1].charCodeAt();
    let col2 = bottomRight[bottomRight.length - 1].charCodeAt();
    let area = (row2 - row1 + 1) * (col2 - col1 + 1);
    let count = 0;
    for(let j = row1; j <= row2; j++) {
      for(let k = col1; k <= col2; k++) {
        let cell = '' + j + String.fromCharCode(k);
        if(bombSet.has(cell)) {
           count++;
        }
      }
    }
    if(count === area) {
      sunk++
    } else {
      hitNotSunk++;
    }
  }
  return [sunk, hitNotSunk];
}

//['1A 2B', '3A 4B']
//['1A', '2A', '3A']
var ships = ['1B 2C', '2D 4D'];
var bombs = ['2B', '2D', '3D', '4D', '4A'];
shipStatics(ships, bombs)