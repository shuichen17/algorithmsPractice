 
function solution(s, d, t) {
  var count = 0;
  var table = document.getElementsByTagName("table");
  var tr = table[0].getElementsByTagName("tr");
  for(var i = 0; i < tr.length; i++){
    var td = tr[i].getElementsByTagName("td");
    var start = td[1].innerHTML;
   
    var end = td[2].innerHTML;
    if(end === '') end = d;
    start = new Date(start);
    
    end = new Date(end);
    
    var diffTime = Math.abs(start.getTime() - end.getTime());
    
    var diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    var style = tr[i].style.backgroundColor;
    if(diffDay <= t && style !== '') {
      count++;
    }
    if(diffDay > t && style !== 'red') {
      count++;
    }
  }
 
  return count;
  
}
s = 1;
d = '2015-11-30';
t = 7;
console.log(solution(s, d, t))






