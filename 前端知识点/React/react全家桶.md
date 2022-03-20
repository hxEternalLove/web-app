### react前提掌握JS基础知识点
>**判断this的指向**
**class类**
 类，实类，继承
**ES6语法规范**
 箭头函数()=>{}，模板字符串`${变量}`，解构赋值{a,b,...c}=obj，展开运算符...,
**npm包管理器**
**原型、原型链**
**数组常用方法**
**模块化**

### react用于构建用户界面的JS库
1. 发送请求获取数据
2. 处理数据（过滤、整理格式等）
3. 操作DOM呈现页面  

**原生JS缺点**
> 1.原生JS操作DOM繁琐、效率低（DOM-API操作UI）
> example：
> - document.getElementById('app')
> - document.querySelector('#app')
> - document.getElementsByTagName('span')
> 
>2.使用JS直接操作DOM，浏览器会进行大量的重绘重排
>3.原生JS没有组件化编码方案，代码复用率低。
**react特点**
> 1.采用`组件化`模式、`声明式编程`，提高开发效率及组件复用率。
> 2.在react-native中可以使用react语法进行移动端开发
> 3.使用虚拟DOM+优秀的Diffing算法，尽量减少于真实DOM的交互。

#### 声明式编程、组件化
#### 虚拟DOM、Diff算法
**虚拟DOM**
1. 本质是Object类型的对象（一般对象）
2. 虚拟DOM比较“轻”（属性值少），真实DOM比较“重”（属性值多），因为虚拟DOM是React内部使用，无需真实DOM上那么多属性。
3. 虚拟DOM最终会被React转化成真实DOM，呈现在页面上。

**创建虚拟DOM两种方法**
1. 使用JSX语法【JSX其实是原始JS写法（`下面那个`）的**语法糖**（`语法糖可以理解为简写方式，或者便捷方式`）】
一层标签：`const VDOM = <h1 id='title'>Hello, React</h1>`
多层标签：`const VDOM = <h1 id='title'><span>Hello, React</span></h1>`或者
    ```
    const VDOM = (
        <h1 id='title'>
            <span>Hello, React</span>
        </h1>
    )
    ```
2. 使用原生JS-【标签，标签属性，标签内容】(一般不用)
一层标签：`const VDOM = React.createElement('h1',{id:'title'},'Hello, React')`
多层标签：`const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello, React')`
- 容器
 `<div id='app'></div>`
- 渲染装入容器
`ReactDOM.render(VDOM,document.getElementById('app'))`
#### JSX语法规范
>JSX全称 JavaScript XML

1. 定义虚拟DOM时，不要写引号
2. 标签中混入JS表达式时要用{}
3. 样式的类名指定不要用class，要是用`className`
4. 内联样式，要用style={{key:value}}的形式去写
5. 只有一个根标签
6. 标签必须闭合
7. 标签首字母
   - 若小写字母开头，最终转化时，将标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
   - 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
#### babel
1. 以前用于 ES6转化成ES5语法，比如转化箭头函数、import
2. 将JSX转化成JS
### react-router路由库
### pubsub消息管理库
### redux集中式状态管理库
### ant-design精美UI组件库