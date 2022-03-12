- [JS数组方法](#js数组方法)
  - [push 尾添加1~n](#push-尾添加1n)
  - [unshift 首添加1~n](#unshift-首添加1n)
  - [pop 删除最后](#pop-删除最后)
  - [shift 删除第一个](#shift-删除第一个)
  - [splice 删除/替换/添加-（索引，个数，添加替换项）](#splice-删除替换添加-索引个数添加替换项)
  - [slice 截取-（索引star，索引end-不包含）](#slice-截取-索引star索引end-不包含)
  - [contact 连接组合](#contact-连接组合)
  - [join 指定符号拼接字符串](#join-指定符号拼接字符串)
  - [sort 排序修改原数组-（a-b升序，b-a降序）](#sort-排序修改原数组-a-b升序b-a降序)
  - [reverse 翻转顺序](#reverse-翻转顺序)
  - [forEach 和 map 不会改变原数组【除非原数组的项是引用类型值，可以改变】](#foreach-和-map-不会改变原数组除非原数组的项是引用类型值可以改变)
  - [forEach 循环每一项无返回](#foreach-循环每一项无返回)
  - [map 循环每一项有返回](#map-循环每一项有返回)
  - [every 检查所有返回布尔值](#every-检查所有返回布尔值)
  - [some 查到就返回布尔值](#some-查到就返回布尔值)
  - [filter 筛选返回新数组](#filter-筛选返回新数组)
  - [find 查到就拿出来返回该项](#find-查到就拿出来返回该项)
  - [findIndex 查到就返回该项索引位置](#findindex-查到就返回该项索引位置)
  - [reduce 累计结果，前一项结果累计到下一项参与规则](#reduce-累计结果前一项结果累计到下一项参与规则)
  - [includes(指定值) 是否包含指定值](#includes指定值-是否包含指定值)
  - [indexOf(指定值) 是否包含指定值](#indexof指定值-是否包含指定值)
  - [lastIndexOf(指定值) 是否包含指定值](#lastindexof指定值-是否包含指定值)
  - [fill(r,s,e) 指定区域(s->e,e除外)内容替换成r](#fillrse-指定区域s-ee除外内容替换成r)
  - [flat 指定深度递归遍历-并拉平](#flat-指定深度递归遍历-并拉平)
  - [keys 返回包含数组中索引 的 Array Iterator对象](#keys-返回包含数组中索引-的-array-iterator对象)
  - [常用操作](#常用操作)
    - [数组去重](#数组去重)
    - [扁平化数组](#扁平化数组)
    - [统计一个字符串中出现最多的字符](#统计一个字符串中出现最多的字符)
    - [找出数组中的最大值](#找出数组中的最大值)
    - [拷贝数组](#拷贝数组)
    - [随机打乱一个数组](#随机打乱一个数组)
  - [Set 和 Map](#set-和-map)
- [立即执行函数IIFE](#立即执行函数iife)
- [类型判断](#类型判断)
- [call 和 apply](#call-和-apply)
  - [call 和 apply 的共同点](#call-和-apply-的共同点)
  - [call 和 apply 的区别](#call-和-apply-的区别)
  - [call 的写法](#call-的写法)
  - [apply 的写法](#apply-的写法)
  - [bind 的使用](#bind-的使用)
  - [总结](#总结)
- [bind](#bind)
- [作用域链(当前上下文?->父级上下文?->全局上下文)](#作用域链当前上下文-父级上下文-全局上下文)
- [闭包：](#闭包)
- [arguments](#arguments)
  - [let 和 var 区别](#let-和-var-区别)
- [事件循环](#事件循环)
### JS数组方法

>push-尾添加=>leghth
unshift-首添加=>leghth
pop-尾删除=>del
shift-首删除=>del
splice-删除&插入&替换=>[del,...]
sort-排序=>return sortArr
reverse-颠倒翻转=>return reverseArr
**不改变原数组:**
slice-截取=>[截取元素,...]
concat-连接数组或值=>连接后的newArr
join('分隔符')=>以分隔符连接后的字符串
**数组遍历方法**
forEach无返回，map返回新数组。-注：数组项是引用类型时会改变原数组。

>**定义** let arr = [], b = '';
#### push 尾添加1~n
`push(el1[,...,elN])`-**添加**一个或多个元素到数组**末尾**=>`return arr.length`;
>`b=arr.push(1,2);// 结果：b=2; arr=[1,2];`
#### unshift 首添加1~n
`unshift(el1[,...,elN])`-**添加**一个或多个元素到数组**开头**=>`return arr.length`;
>`b=arr.unshift(3,4);// 结果：b=4; arr=[3,4,1,2];`
#### pop 删除最后
`pop()`-**删除**数组**最后一个**元素=>`return del-last-el`;pop 空数组=>`return undefined`;
>`b=arr.pop();// 结果：b=2; arr=[3,4,1];`
#### shift 删除第一个
`shift()`-**删除**数组**第一个**元素=>`return del-first-el`;shift 空数组=>`return undefined`;
>`b=arr.shift();// 结果：b=3; arr=[4,1];`
#### splice 删除/替换/添加-（索引，个数，添加替换项）
`splice([statr[,del-count[,item1[,item2[,...]]]]])`-删除或替换=>return [del-el1,...,del-elN];（即以数组形式返回**删除的元素**）。
    
①`start`-开始删除的位置，从`arr[statr]`元素开始删除(包含`arr[start]`)。
1. start >= arr.length,从数组末尾添加内容。
2. start < 0,从数组倒数第start个元素开始计算，splice(-1)即splice(arr.length-1);若|start|>arr.length,则从0开始即splice(0)。

②`del-count`-删除的个数。此值省略或者del-count >= arr.length-start。则start及之后的元素全部删除。

③`item1,item2,...`-添加/插入的元素。从`start`位置开始依次插入这些元素。
>`b=arr.splice(2,'',2,3);// 结果：b=[]; arr=[4,1,2,3];`
>`b=arr.splice(2,1,5,6);// 结果：b=[2]; arr=[4,1,5,6,3];`
>`b=arr.splice(-3,2,8);// 结果：b=[5,6]; arr=[4,1,8,3];`

**【原数组不变】**    
#### slice 截取-（索引star，索引end-不包含）
`slice([begin[, end]])`-截取数组=>return [截取的元素];
从索引begin开始到索引end提取原数组元素(包含begin不包含end)。beign < 0,表示从**倒数第begin个**开始提取。省略begin则从0开始提取。begin >= arr.length返回空数组。
end >= arr.length或被省略，则提取begin到原数组末尾。
>`b=arr.slice(1,3);// 结果：b=[1,8]; arr=[4,1,8,3];`
#### contact 连接组合
`concat([val1[,val2[,...]]])`-将数组或值连接成新数组=>return newArr;
>`b=arr.concat([5,6],7);// 结果：b=[4,1,8,3,5,6,7]; arr=[4,1,8,3];`
#### join 指定符号拼接字符串
`join([separator])`-指定分隔符将一个数组（或类数组对象）每个元素连接成一个字符串=>return 此字符串;
如果只有一个元素，则不使用分隔符。
>`b=arr.join('&');// 结果：b=4&1&8&3; arr=[4,1,8,3];`

**【修改原数组】**    
#### sort 排序修改原数组-（a-b升序，b-a降序）
`sort([compare-func])`-按规则排序=>return 排序后的arr;
compare-func指定排序规则方法。省略按照`Unicode`排序。
(a,b)=>a-b;有参数a，b。a-b则升序排列；b-a则降序排列；如果数组中的元素是对象类型-如：arr=[{id:2},{id:4}]，也可以对象中某个属性为比较值排序。比如按照id的值升序或降序排列：`arr.sort((a,b)=>a.id-b.id); arr.sort((a,b)=>b.id-a.id);`
>`b=arr.sort((a,b)=>a-b);// 结果：b=[1,3,4,8]; arr=[1,3,4,8];`
>`b=arr.sort((a,b)=>b-a);// 结果：b=[8,4,3,1]; arr=[8,4,3,1];`

()=>s;无参数,s>=0无变化，s<0,与原数组顺序相反，相当于reverse()方法。
>`b=arr.sort(()=>0);// 结果：b=[8,4,3,1]; arr=[8,4,3,1];`
>`b=arr.sort(()=>1);// 结果：b=[8,4,3,1]; arr=[8,4,3,1];`
>`b=arr.sort(()=>-1);// 结果：b=[1,3,4,8]; arr=[1,3,4,8];`
>`b=arr.sort(()=>-1);// 结果：b=[8,4,3,1]; arr=[8,4,3,1];`
#### reverse 翻转顺序
`reverse()`-将数组中的元素位置倒转,并返回该数组=>return [颠倒的元素,...]
>`b=arr.reverse();// 结果：b=[1,3,4,8]; arr=[1,2,4,8];`

**【遍历数组】**
#### forEach 和 map 不会改变原数组【除非原数组的项是引用类型值，可以改变】
#### forEach 循环每一项无返回
`forEach[callback(curValue[,index[,array]])[, _this]]`-对每一项加工处理,无返回。
callback接收一至三个参数，curValue当前的需要加工项，index当前项的索引值，array正在操作的数组。_this指定回调函数的this值，箭头函数无此项。
  * 不会改变原数组【除非原数组的项是引用类型值，可以改变】
    >`let arr=[1,2,4,8]; arr.forEach(item=>item+1);// 结果 arr=[1,2,4,8];`
    >`let arr=[{name:1},{name:2}]; arr.forEach(item=>item.name+=1);// 结果 arr=[{name:1},{name:2}];`
  * 循环过程中不能执行break、continue（无效），但可以 return 终止。
  * 循环时可以跳过空-即不算循环次数，不可以跳过undefined、null-即算一次循环
#### map 循环每一项有返回
`map(callback(curValue[,index[,array]])[, _this])`-对每一项加工处理,返回新数组。同forEach
#### every 检查所有返回布尔值
`every(callback)`-检查所有元素是否符合条件，返回一个布尔值。
#### some 查到就返回布尔值
`some(callback)`-检查元素是否有符合条件的，找到一个就直接返回无需检查后面的，返回一个布尔值。
#### filter 筛选返回新数组
`filter(callback)`-筛选出符合条件的项，返回符合条件的新数组。
#### find 查到就拿出来返回该项
`find(callback)`-检查是否有符合条件的，找到第一个就把它返回，无需进行后面的，返回第一个符合条件的对象。
#### findIndex 查到就返回该项索引位置
`findIndex(callback)`--检查是否有符合条件的，找到第一个就把它的索引值返回，无需进行后面的，返回第一个符合条件的索引值。
#### reduce 累计结果，前一项结果累计到下一项参与规则
`reduce((result,cur)=>result+=cur,start)`--累加器。sum每次累加后的结果，cur当前操作的当前项，start累加结果的初始值可以省略，省略默认sum是数组的第一项。

**【查找某一项是否在数组中】**
#### includes(指定值) 是否包含指定值
`includes()`-数组是否包含指定值，包含返回true，不包含返回false。
>`arr=[1,2,4,8]; arr.includes(2); arr.includes(9);// true false`
#### indexOf(指定值) 是否包含指定值
`indexOf()`-返回指定元素在数组中的第一个索引值，没有则返回-1
>`arr=[1,2,4,2,8]; arr.indexOf(2); arr.indexOf(9);// 1  -1`
#### lastIndexOf(指定值) 是否包含指定值
`lastIndexOf()`-返回指定元素在数组中的最后一个索引值，没有则返回-1
>`arr=[1,2,4,2,8]; arr.indexOf(2); arr.indexOf(9);// 3  -1`
#### fill(r,s,e) 指定区域(s->e,e除外)内容替换成r
`fill(replace,statr,end)`-用固定值replace填充/替换数组从开始索引值statr->直到终止索引值end(不包括终止索引)的全部元素。
>`arr=[1,2,4,2,8]; arr.fill('&',1,3);// arr =[1,'&','&',2,8]`
#### flat 指定深度递归遍历-并拉平
`flat()`-默认拉平一层和flat(1)效果相同，flat(2)拉平两层，flat(n)拉平n层。
>`let arr=[1,2[3,4,[5,6]]], b=arr.flat(2);// arr不变，b=[1,2,3,4,5,6]`
#### keys 返回包含数组中索引 的 Array Iterator对象
>`arr=[1,2,3,{name:'1'},{va:'2'},{name:'3'}], b=arr.keys();`
```
for(const key of b){
    console.log(key); //依次输出 0 1 2 3 4 5
}
```


#### 常用操作
##### 数组去重
>1. 【使用对象】 if( !obj[v] ){ obj[1]=1; newArr.push(v) }
```
let arr = [1, 2, 3, 1, 1, 1, 3, 5, 3], obj = {}, newArr = [];
arr.forEach(v => {
  if(!obj[v]) {
    obj[v] = 1;
    newArr.push(v);
  }
})
console.log(newArr); // [1, 2, 3, 5]
```

>2. 【使用Set】 Array.from(new Set(arr)) 或 [...(new Set(arr))]
```
let arr = [1, 2, 3, 1, 1, 1, 3, 5, 3];
let newArr = Array.from(new Set(arr)); // Set集合的格式：{1,2,3,4}
// let newArr = [...(new Set(arr))]; // 使用ES6解构赋值
console.log(newArr); // [1, 2, 3, 5]
```

##### 扁平化数组

>1. 使用flat
```
let arr = [1, 2, [3, 4, [5]]];
let newArr = arr.flat(2);
console.log(newArr); // [1, 2, 3, 4, 5]
```

**递归实现flat**
```递归+原型链实现.flat
function MyArray(...argurs){
    MyArray.prototype.flat = (num=1)=>{
        if(argurs.length == 0) return
        let newArr = [];
        argurs.forEach((i)=>{
            if(num == 0) return newArr.push(i);
            if(Array.isArray(i)){i.__proto__ = MyArray.prototype; i.flat(num--)}
            else newArr.push(i);
        })
        return newArr
    }
    return [...argurs];
}

// 
function Myflat(arr,num=1){
    if(arr.length == 0) return [];
    let newArr = [];
    let toFlat = (arr,b)=>{
        arr.forEach((i)=>{
            console.log(b)
            if(b == 0) return newArr.push(i);
            if(Array.isArray(i)){
                if(i.length == 0) return;
                toFlat(i,--b)
            } else newArr.push(i);
        })
    }
    toFlat(arr,num);
    return newArr;
}
```

##### 统计一个字符串中出现最多的字符

使用数组将字符的`ASCII`码作为`key`制作桶

```obj+冒泡
function getMoreTimes(str){
    let obj = {},res={'str':'',num:1};
    str.split('').forEach((i)=>{
        if(obj[i]){obj[i]+=1;}
        else obj[i]=1;
    })
    for(k in obj){
        obj[k]>res.num?res.str=k:null;
    }
    return res.str
}
console.log(getMoreTimes('1111222222'))


//
let s = "ASASRKIADAA";
let arr = [];
let base = 65;													// A-Z 65-90 a-z 97-122
Array.prototype.forEach.call(s, (v) => {
  let ascii = v.charCodeAt(0) - base;
  if (arr[ascii]) {
    ++arr[ascii];
  } else arr[ascii] = 1;
})

let max = 0;
let maxIndex = 0;
arr.forEach((v, i) => {
  if (v > max) {
    max = v;
    maxIndex = i;
  }
})

console.log(String.fromCharCode(maxIndex + base), arr[maxIndex]);	// A 5

```

##### 找出数组中的最大值

遍历数组

```
let arr = [1, 2, 3, 1, 1, 1, 3, 5, 3];
let max = -Infinity;
arr.forEach(v => {
  if (v > max) max = v;
})

console.log(max);										// 5

```

使用`Math`

```
let arr = [1, 2, 3, 1, 1, 1, 3, 5, 3];
let max = Math.max(...arr);
console.log(max);											// 5

```

使用`reduce`

```
let arr = [1, 2, 3, 1, 1, 1, 3, 5, 3];
let max = arr.reduce((a, v) => {
  return a > v ? a : v;
})

console.log(max);											// 5

```

##### 拷贝数组

遍历数组使用`push`

```
let arr = [1, 2, 3, 4, 5];
let newArr = [];
arr.forEach(v => newArr.push(v));

console.log(newArr);									// [1, 2, 3, 4, 5]
复制代码
```

使用`concat`

```
let arr = [1, 2, 3, 4, 5];
let newArr = [].concat(arr);
console.log(newArr);									// [1, 2, 3, 4, 5]
复制代码
```

使用`slice`

```
let arr = [1, 2, 3, 4, 5];
let newArr = arr.slice(0);
console.log(newArr);									// [1, 2, 3, 4, 5];
复制代码
```

##### 随机打乱一个数组

随机交换N次

```
function randomInt(a, b) {
  return Number.parseInt(Math.random() * (b-a) + a);
}

let arr = [1, 2, 3, 4, 5];
let N = arr.length;
arr.forEach((v, i, arr) => {
  let ran = randomInt(0, N);
  [arr[i], arr[ran]] = [arr[ran], arr[i]];
})

console.log(arr);
复制代码
```

随机排序

```
let arr = [1, 2, 3, 4, 5];
arr.sort((v1, v2) => {
  return Math.random() >= 0.5 ? 1 : -1;
})

console.log(arr);
```
#### Set 和 Map
Set 类数组结构:{1,2,3,4,5}
每一项唯一，不重复。使用 add(元素) 添加元素，delete(元素) 删除元素，clear() 清空数据，has(元素) 查看set中是否有这一项，
应用：
1. 看数组的并集 `let res = new Set([...arr1,...arr2])`
2. 看数组的交集
```
let s1 = new Set([...arr1]), s2 = new Set([...arr2]);
let res = [...s1].filter(i=>s2.has(i))
```
3. 看数组的差集
```
let s1 = new Set([...arr1]), s2 = new Set([...arr2]);
let res = [...s1].filter(i=>!s2.has(i))
```
Map 类似对象，键值对的集合
但是 键 的范围不限制于字符串，可以是各种类型（包含对象）都可当作键。
Map也可接受一个数组为参数。Map中也不可有重复项。


###原型链示意图
>其实，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型。
那什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

![原型链示意图](https://upload-images.jianshu.io/upload_images/2323089-b30da1a17e7790e7?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###继承
>7种，原型、构造函数、组合、原型式(将传入的对象作为创建的对象的原型。)、寄生式(利用Object.create)、组合寄生式(
    `var prototype = createObj(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;`)、
    extend(es6)
#####1-原型链继承-prototype

```source-js
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性

function Parent () {
    this.name = 'kevin';
}
Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}
Child.prototype = new Parent();// ***重点  原型链
var child1 = new Child();
console.log(child1.getName()) // kevin
```
问题：
1. 引用类型的属性被所有实例共享.
2. 在创建 Child 的实例时，不能向Parent传参

#####2-构造函数继承
```
function child(name){
    parent.call(this,name)
}
```
优点：
1. 避免了引用类型的属性被所有实例共享
2. 可以在 Child 中向 Parent 传参

缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法。
#####3-组合继承
```source-js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
// prototype是函数才会有的属性
Parent.prototype.getName = function () {
    console.log(this.name)
}

// ***重点  经典函数继承
function Child (name, age) {

    Parent.call(this, name);

    this.age = age;

}// ***重点

Child.prototype = new Parent();// ***重点  原型链
Child.prototype.constructor = Child;// ***重点  原型链

var child1 = new Child('kevin', '18');

child1.colors.push('black');
```
优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
#####4-原型式继 (将传入的对象作为创建的对象的原型。)
```
function createObj(o) {
    function F(){};
    F.prototype = o;
    return new F();
}
var person = {name: 'kevin',friends: ['daisy', 'kelly']}
var person1 = createObj(person);
```
就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
```source-js
var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}
var person1 = createObj(person);
var person2 = createObj(person);
person1.name = 'person1';
console.log(person2.name); // kevin
person1.friends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
```
注意：修改`person1.name`的值，`person2.name`的值并未发生改变，并不是因为`person1`和`person2`有独立的 name 值，而是因为`person1.name = 'person1'`，给`person1`添加了 name 值，并非修改了原型上的 name 值。
#####5-寄生函数继承（利用Object.create）
```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```
缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
#####6-寄生组合继承（调用一次 Parent 构造函数，避免了在 Parent.prototype 多余的属性，保持原型链不变；）
```source-js
// ***重点  原型式继承
function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = createObj(parent.prototype);// ***重点  寄生式继承
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```
这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
#####7-es6继承extends
```
class Child extends Parent {    }
```
内部实现原理就是寄生式组合继承。
### 立即执行函数IIFE
*   当**圆括号出现在匿名函数的末尾**想要调用函数时-(func(){})()，它会默认将函数当成是函数声明。

*   当**圆括号包裹**函数时-(func(){}())，它会默认将函数作为表达式去解析，而不是函数声明。

```
//这两种模式都可以被用来立即调用一个函数表达式，利用函数的执行来创造私有变量

(function(){/* code */}());//括号内的表达式代表函数立即调用表达式

(function(){/* code */})();//括号内的表达式代表函数表达式

// 以下方式就是利用函数表达式的方式，将函数立即执行。()包裹相当于先计算包裹项，也就是表达式。
var i = function(){console.log(0);return 10;}();// 0
console.log(i)// 10
true && function(){/*code*/ console.log(1)}();// 1
0,function(){console.log(6)}();// 6

//如果你并不关心返回值，或者让你的代码尽可能的易读，你可以通过在你的函数前面带上一个一元操作符来存储字节

!function(){/* code */console.log(2)}();// 2
~function(){/* code */console.log(3)}();// 3
-function(){/* code */console.log(4)}();// 4
+function(){/* code */console.log(5)}();// 5

```

### 类型判断
####1.typeof
`typeof` 一般被用于判断一个变量的类型，我们可以利用 `typeof` 来判断`number`, `string`, `object`, `boolean`, `function`, `undefined`, `symbol` 这七种类型.
判断不是 object 类型的数据的时候，`typeof`能比较清楚的告诉我们具体是哪一类的类型。但是，很遗憾的一点是，`typeof` 在判断一个 object的数据的时候只能告诉我们这个数据是 object, 而不能细致的具体到是哪一种 object
```
let s = new String('abc');
typeof s === 'object'// true
s instanceof String // true
```
####2.instanceof
`instanceof` 主要的实现原理就是只要**右边变量的 prototype**在左边变量的**原型链**上即可。比如：
>**Foo instanceof Foo**
```
leftValue = Foo, rightValue = Foo
leftValue = Foo.__proto__ = Function.prototype
rightValue = Foo.prototype
// 第一次判断
leftValue != rightValue
leftValue = Function.prototype.__proto__ = Object.prototype
// 第二次判断
leftValue != rightValue
leftValue = Object.prototype.__proto__ = null
// 第三次判断
leftValue === null
// 返回 false
```
####3.Object.prototype.toString
我们可以利用这个方法来对一个变量的类型来进行比较准确的判断

```
Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"

```
####4.constructor
```
let a = {a:1};
a.constructor === Object;// true
a.constructor === Array;// false
```
### call 和 apply
#### call 和 apply 的共同点

它们的共同点是，都能够**改变函数执行时的上下文**，将一个对象的方法交给另一个对象来执行，并且是立即执行的。**调用 call 和 apply 的对象，必须是一个函数 Function**。

#### call 和 apply 的区别
它们的区别，主要体现在参数的写法上。
#### call 的写法
<pre class="hljs language-coq" style="box-sizing: border-box; font-family: var(--bs-font-monospace); font-size: 0.875em; direction: ltr; unicode-bidi: bidi-override; display: block; margin-top: 0px !important; margin-bottom: 1.25rem; overflow: auto; color: rgb(36, 41, 46); background: rgb(233, 236, 239); padding: 1rem; max-height: 35rem; line-height: 1.5;">
Function.call(obj,[param1[,param2[,…[,paramN]]]])
</pre>
需要注意以下几点：

*   调用 call 的对象，必须是个函数 Function。
*   call 的第一个参数，是一个对象。 Function 的调用者，将会指向这个对象。如果不传，则默认为全局对象 window。
*   第二个参数开始，可以接收任意个参数。每个参数会映射到相应位置的 Function 的参数上。但是如果将所有的参数作为数组传入，它们会作为一个整体映射到 Function 对应的第一个参数上，之后参数都为空。
```
function func (a,b,c) {}

func.call(obj, 1,2,3)
// func 接收到的参数实际上是 1,2,3

func.call(obj, [1,2,3])
// func 接收到的参数实际上是 [1,2,3],undefined,undefined
```

#### apply 的写法

<pre class="hljs language-coq" style="box-sizing: border-box; font-family: var(--bs-font-monospace); font-size: 0.875em; direction: ltr; unicode-bidi: bidi-override; display: block; margin-top: 0px !important; margin-bottom: 1.25rem; overflow: auto; color: rgb(36, 41, 46); background: rgb(233, 236, 239); padding: 1rem; max-height: 35rem; line-height: 1.5;">Function.apply(obj[,argArray])</pre>

需要注意的是：

*   它的调用者必须是函数 Function，并且只接收两个参数，第一个参数的规则与 call 一致。
*   第二个参数，必须是数组或者类数组，它们会被转换成类数组，传入 Function 中，并且会被映射到 Function 对应的参数上。这也是 call 和 apply 之间，很重要的一个区别。
```
func.apply(obj, [1,2,3])
// func 接收到的参数实际上是 1,2,3

func.apply(obj, {
    0: 1,
    1: 2,
    2: 3,
    length: 3
})
// func 接收到的参数实际上是 1,2,3
```
#### bind 的使用

最后来说说 bind。在 MDN 上的解释是：bind() 方法创建一个新的函数，在调用时设置 this 关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

它的语法如下：

<pre class="hljs language-inform7" style="box-sizing: border-box; font-family: var(--bs-font-monospace); font-size: 0.875em; direction: ltr; unicode-bidi: bidi-override; display: block; margin-top: 0px !important; margin-bottom: 1.25rem; overflow: auto; color: rgb(36, 41, 46); background: rgb(233, 236, 239); padding: 1rem; max-height: 35rem; line-height: 1.5;">Function.bind(thisArg[, arg1[, arg2[, ...]]])</pre>

bind 方法 与 apply 和 call 比较类似，也能改变函数体内的 this 指向。不同的是，**bind 方法的返回值是函数，并且需要稍后调用，才会执行**。而 apply 和 call 则是立即调用。

#### 总结
call 和 apply 的主要作用，是改变对象的执行上下文，并且是立即执行的。它们在参数上的写法略有区别。

bind 也能改变对象的执行上下文，它与 call 和 apply 不同的是，返回值是一个函数，并且需要稍后再调用一下，才会执行。
### bind
>null、undefind、无绑定参数作为参数传入apply/call或bind时，默认绑定的是window
当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：

```source-js
var value = 2;
var foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');
//当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

### 作用域链(当前上下文?->父级上下文?->全局上下文)
>由多个执行上下文的变量对象**构成的链表**就叫做作用域链。

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

>在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。(全局变量对象-VO)
### 闭包：

1.  从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2.  从实践角度：以下函数才算是闭包：
    1.  即使创建它的上下文已经销毁，它仍然存在。
    （比如，内部函数从父函数中返回）
    2.  在代码中引用了自由变量
>我的理解是: 闭包就是能够读取其他函数内部变量的函数

>由于在javascript中，只有函数内部的子函数才能读取局部变量，所以说，闭包可以简单理解成“定义在一个函数内部的函数”。

>在本质上，闭包是将函数内部和函数外部连接起来的桥梁

闭包最大用处有两个，一个是前面提到的可以**读取函数内部的变量**，另一个就是**让这些变量的值始终保持在内存中**。

**使用闭包的注意点**

1）由于闭包会使得函数中的变量都被保存在内存中，**内存消耗很大**，所以**不能滥用**闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，**将不使用的局部变量全部删除**。

2）闭包会在父函数外部，**改变父函数内部变量的值**。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
```
function f1(){
　　var n=999;
　　nAdd=function(){n+=1}
　　function f2(){
　　　　alert(n);
　　}
　　return f2;
}
var result=f1();
result(); // 999
nAdd();
result(); // 1000
```
在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。

为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

这段代码中另一个值得注意的地方，就是"nAdd=function(){n+=1}"这一行，首先在nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。
```
// 代码片段一。
    var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}

　　};

　　alert(object.getNameFunc()());// The Window

// 代码片段二。
　　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}

　　};

　　alert(object.getNameFunc()());// My Object
```
### arguments
arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引0处。
>arguments对象不是一个 Array 。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：
```
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```
对参数使用slice会阻止某些JavaScript引擎中的优化。如果你关心性能，尝试通过遍历arguments对象来构造一个新的数组。另一种方法是使用被忽视的Array构造函数作为一个函数：
```
var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
```
如果调用的参数多于正式声明接受的参数，则可以使用arguments对象。这种技术对于可以传递可变数量的参数的函数很有用。使用 arguments.length来确定传递给函数参数的个数，然后使用arguments对象来处理每个参数。要确定函数签名中（输入）参数的数量，请使用Function.length属性。

####对参数使用 typeof
>typeof参数返回 'object'。
arguments 对象只能在函数内使用。
```
console.log(typeof arguments);    // 'object'
// arguments 对象只能在函数内使用
function test(a){
    console.log(a,Object.prototype.toString.call(arguments));
    console.log(arguments[0],arguments[1]);
    console.log(typeof arguments[0]);
}
test(1);
/*
1 "[object Arguments]"
1 undefined
number
*/
```
#### let 和 var 区别
var i; 在 for 循环当中会被当做全局变量创建，每次循环都是用同一个指针。最后循环完毕，指针定位在最后一个i值。
let i; 在 for 循环当中会被当做局部变量创建，每次循环都是重新创建。顾循环里的方法调用时的i值不同。
### 事件循环
当 **当前执行栈** 执行完毕时会立刻先处理**所有微任务队列**中的事件，然后再去**宏任务队列**中取出一个事件。同一次事件循环中，微任务永远在宏任务
之前执行