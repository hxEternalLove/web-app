>其实，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型。
那什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。
####原型链示意图
![原型链示意图](https://upload-images.jianshu.io/upload_images/2323089-b30da1a17e7790e7?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
####继承
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
#####4-原型式继承
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
#####5-寄生函数继承
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
#####6-寄生组合继承
```source-js
// ***重点  原型式继承
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);// ***重点  寄生式继承
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
####作用域链

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。



####ECMAScript中，闭包指的是：

1.  从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2.  从实践角度：以下函数才算是闭包：
    1.  即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
    2.  在代码中引用了自由变量
>MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数。

#### 立即执行函数IIFE
*   当圆括号出现在匿名函数的末尾想要调用函数时，它会默认将函数当成是函数声明。

*   当圆括号包裹函数时，它会默认将函数作为表达式去解析，而不是函数声明。

```
//这两种模式都可以被用来立即调用一个函数表达式，利用函数的执行来创造私有变量

(function(){/* code */}());//Crockford recommends this one，括号内的表达式代表函数立即调用表达式
(function(){/* code */})();//But this one works just as well，括号内的表达式代表函数表达式

var i = function(){return 10;}();
true && function(){/*code*/}();
0,function(){}();

//如果你并不关心返回值，或者让你的代码尽可能的易读，你可以通过在你的函数前面带上一个一元操作符来存储字节

!function(){/* code */}();
~function(){/* code */}();
-function(){/* code */}();
+function(){/* code */}();
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
`instanceof` 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。比如：
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

####总结
call 和 apply 的主要作用，是改变对象的执行上下文，并且是立即执行的。它们在参数上的写法略有区别。

bind 也能改变对象的执行上下文，它与 call 和 apply 不同的是，返回值是一个函数，并且需要稍后再调用一下，才会执行。
###bind
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
###ECMAScript中，闭包指的是：

1.  从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2.  从实践角度：以下函数才算是闭包：
    1.  即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
    2.  在代码中引用了自由变量

在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。(全局变量对象-VO)
>闭包就是能够读取其他函数内部变量的函数。
在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

闭包最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。

使用闭包的注意点

1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
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
##事件循环
**当当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行**