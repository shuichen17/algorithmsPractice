/*
题目给了一些business names和一个用户搜索的关键字，让你做prefix search和non-prefix search。（Case insensitive）

1. Prefix search：举个例子，输入“bur”要返回所有以bur开头的business names，比如“Burger King”，注意一个business name可能有多个word，“XXX Burger”也算满足条件。
2. Non-prefix search：只要business name里包含关键词就返回。

楼主思路如下：1. prefix 用brute force或者建prefix tree，和面试官讨论最后她说用brute force写。
            2. KMP 
最后面试官没让我写第二问，只问了时间复杂度。
========================================================================
题目居然不是yelp之前面经里经典的几道题，
给一个business_name list，比如 "Burgers", "Super Burgers", "Super Duper Burgers"
给一个search term比如“bur”，要求match前k个店名，满足其中某一个单词match prefix。
并且输出的顺序得是先输出第一个word满足的，再输出第二个word满足的，
比如对于“bur”，"Burgers"和“Super Burgers”都是match的，但是要先输出Burgers再输出Sup‍‌‌‍‌‌‍‍‌‍‌‍‍‌‍‍‍‍er Burgers
========================================================================
一开始问了些简历，然后小印哥开始自我介绍了很久，然后开始coding:
给一些bussinessName, 比如"Burger King", "kdk dnsd Burgers", "sad Burger's", "asdd das a", "Walburgers"
要求1是prefix search, 比如输入"bur"返回"Burger King", "kdk dnsd Burgers", "sad Burger's"， 返回的顺序无所谓
要求2是substring search, 返回"Burger King", "kdk dnsd Burgers", "sad Burger's", "Walburgers"

面试官印哥，一直在讨论方法没让写代码，最后剩了十分钟没写完，最后说没事的我理解你的思想就行了，不用写完, "perfect", 不知道是不是要黑我。讨论的思路如下：
lz一开始说用trie, 然后他说ok，讨论了一下时间复杂度之类的，然后我说substring search的话用KMP就行了, 然后他说不用那么复杂，先讨论要求1吧，用trie. 

我的思想是把input每个string 按空格split, 存到map里，然后trie里存split后的每个substring, 搜索prefix搜到之后去map里找对应的bussiness name即可，然后面试官问这样和每个string暴力搜有啥区别？ 我说这样一次建trie终生受益有没有？ 他说ok.
然后就是trieNode的定义, 我的思路是每个trieNode 存 isEnd 和word, 这样搜到node.isEnd的时候把string word加到result里即可。(比如burger的r存上burger)他又问那么这样时间复杂度如何？和暴力搜有啥区别？我回答了, 之后说还有另一种方法：在每个char都存上set, 搜完prefix的长度返回set即可. 小印哥又让我比较这两种方法优缺点，我就是要么牺牲时间换空间要么反之，看你选咯‍‌‌‍‌‌‍‍‌‍‌‍‍‌‍‍‍‍？小印哥说那我们开始时coding吧！
此时还剩下大概十分钟，写的差不多了还剩一个函数时面试官说行了我相信你可以写完了不用写了，然后开始问了些问题草草结束了。
希望小印哥不是黑我，感觉yelp家很重视交流，不知道没完成代码能不能过。
=========================================================================
地里很多药铺new grad面经，但是转了一圈没怎么看到ios的。
面试官很友好，一上来small talk了一会儿，然后写题。跟别的人经历类似，面试官都会跟你一上来讲解题目讲解半天，然后让你写。我是一个问题包含两part。
题目之前地里提到过。burger 搜索，然后返回所有match，case insensitive，返回的时候要字母表顺序返回。第一部分让我写prefix match，第二部分写non-prefix match
========================================================================
贡献地里，耶尔普面经，backend海投。给一个list of dictionaries, 比如
test_data = [
    {"business_name": "abc"}, 
    {"business_name": "abc ddd"}, 
    {"business_name": "aba"}, 
]
然后再给一个prefix，找出所有的business_name的值，which in 这个值有单词是以prefix开头的。
e.g.1. 比如说给出abc，要返回["abc", "abc ddd"].
e.g.2. 给出ab, 三个都要返回

follow up: 不限于prefix, 可以从一个string的任意index开始找‍‌‌‍‌‌‍‍‌‍‌‍‍‌‍‍‍‍这个prefix。
e.g.1. 给定'bc'，返回["abc", "abc ddd"], 因为bc是在这两个string里的。
==========================================================================
因为是全栈，上来先问了一些关于Angular和React的问题然后问了一些简历，并没有那些常规的bq
算法题是给一些business的名字比如"McDonald's" "Five Guys" 然后输入prefix要给出搜索建议。和常规不太一样的是输入guys也需要能返回Five Guys。我是用trie做的，中间碰到一个很坑的事情是有unicode的字符debug花了很久。不需要自己写测试但是要能compile能work. followup是假如只输入中间的字符也要能返回结果怎么做
=========================================================================

*/
/*第一问*/

var Trie = function () {
  this.root = new TrieNode();
}
var TrieNode = function () {
  this.children = new Array(27);
  this.words = new Set();
}
Trie.prototype.insert = function (list) {
   let cur = this.root;
  for (let i = 0; i < list.length; i++) {
    let temp = list[i].business_name.split(' ');
    for (let j = 0; j < temp.length; j++) {
      let word = temp[j];
      cur = this.root;
      for (let k = 0; k < word.length; k++) {
        let index = (word[k] === '\'' ? 26 : word[k].toLowerCase().charCodeAt(0) - 97);
        if (!cur.children[index]) {
          cur.children[index] = new TrieNode();
        }
        cur = cur.children[index];
        cur.words.add(i);

      }
    }
  }
  return cur;
}
var dictionaries = [
  {'business_name': 'Burgers'},
  {'business_name': 'burger kings'},
  {'business_name': 'super Burger'},
  {'business_name': 'Super Duper Burger\'s'},
  {'business_name': 'Walburgers'},
  {'business_name': 'what\'sburger'}
]

var prefixSearch = function (prefix, dictionaries) {
  let res = [];
  let node = new Trie();
  node.insert(dictionaries);
  let root = node.root;
  for (let i = 0; i < prefix.length; i++) {
    let idx = (prefix[i] === '\'' ? 26 : prefix[i].toLowerCase().charCodeAt(0) - 97);
    
    if (root.children[idx] === null) {
         return res;
    }
    root = root.children[idx];
  }
  for (let key of root.words) {
   
    res.push(dictionaries[key].business_name);
  }
  return res;
}

prefixSearch('Bur', dictionaries)


