
#### 标准模型和IE模型的区别

**IE模型元素宽度width=content+padding+border**，高度计算相同
![image.png](https://upload-images.jianshu.io/upload_images/2323089-311a6d054309f170.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**标准模型元素宽度width=content**，高度计算相同
![image.png](https://upload-images.jianshu.io/upload_images/2323089-74276bc0bb756135.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 外边距重叠

当两个垂直外边距相遇时，他们将形成一个外边距，合并后的外边距高度等于两个发生合并的外边距的高度中的较大者。
**注意**：只有普通文档流中块框的垂直外边距才会发生外边距合并，行内框、浮动框或绝对定位之间的外边距不会合并。

![image.png](https://upload-images.jianshu.io/upload_images/2323089-cdced54390e8f83c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 1. BFC 块级格式化上下文

**BFC(Block Formatting Context)。它是一个独立的渲染区域，它规定了内部的块级元素如何布局，都与这个区域外部毫不相干。**

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

**如何创建BFC**：overflow、浮动、定位、display
> 1.  overflow不为visible;
> 2.  float的值不为none；
> 3.  position为absolute或fixed
> 4.  display属性为inline-block,table,table-cell,table-caption,flex,inline-flex;

**BFC的原理（渲染规则）**

1.  BFC元素**垂直方向的边距会发生重叠**。属于**不同BFC外边距不会**发生重叠
2.  BFC的区域**不会与浮动元素**的布局重叠。
3.  BFC元素是一个**独立的容器**，外面的元素不会影响里面的元素。里面的元素也不会影响外面的元素。
4.  计算BFC高度的时候，**浮动元素也会参与计算**(清除浮动)

#### 2.【重点】清除浮动的最常用的四种方法，以及优缺点
清除浮动主要是为了解决，父元素因为子级元素浮动引起的内部高度为0的问题
#####1.额外标签法（在最后一个浮动标签后，新加一个标签，给其设置clear：both；）（不推荐）
```
.clear { clear:both; }
<div class='clear'>额外标签法</div>
```
clear：both：本质就是闭合浮动， 就是让父盒子闭合出口和入口，不让子盒子出来。
**不建议使用**
原理：添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度
优点：简单，代码少，浏览器支持好，不容易出现怪问题
缺点：添加无意义标签，语义化差，如果页面浮动布局多，就要增加很多空div，让人感觉很不爽
建议：不推荐使用，但此方法是**以前主要使用**的一种清除浮动方法
##### 2.父级添加overflow属性（父元素添加overflow:hidden）（不推荐）

通过触发BFC方式，实现清除浮动

    .fahter{
        width: 400px;
        border: 1px solid deeppink;
        overflow: hidden;
    }
    
**不建议使用**
原理：必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度
优点：简单，代码少，浏览器支持好
缺点：不能和position配合使用，因为超出的尺寸的会被隐藏，内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素
**另一种父元素添加overflow: auto;**
原理：必须定义width或zoom:1，同时不能定义height，使用overflow:auto时，浏览器会自动检查浮动区域的高度
优点：简单，代码少，浏览器支持好
缺点：内部宽高超过父级div时，会出现滚动条。
建议：不推荐使用，如果你需要出现滚动条或者确保你的代码不会出现滚动条就使用吧。

##### 3.使用after伪元素清除浮动（推荐使用-block

    .clearfix:after{
        /*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
        *zoom: 1;
        /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
 
    <body>
        <div class="fahter clearfix">
            <div class="big">big</div>
            <div class="small">small</div>
        </div>
        <div class="footer"></div>
    </body>
**推荐使用**
原理：IE8以上和非IE浏览器才支持:after，原理和方法2有点类似，zoom(IE专有属性)可解决ie6,ie7浮动问题
优点：符合闭合浮动思想，结构语义化正确浏览器支持好，不容易出现怪问题（目前：大型网站都有,使用，如：腾迅，网易，新浪等等）
缺点：代码多，不少初学者不理解原理，要两句代码结合使用，才能让主流浏览器都支持
建议：推荐使用，建议定义公共类，以减少CSS代码

##### 4.使用before和after双伪元素清除浮动-table

    .clearfix:after,.clearfix:before{
        content: "";
        display: table;
    }
    .clearfix:after{
        clear: both;
    }
    .clearfix{
        *zoom: 1;
    }
 
    <div class="fahter clearfix">
        <div class="big">big</div>
        <div class="small">small</div>
    </div>
    <div class="footer"></div>
**推荐使用**
优点：代码更简洁
缺点：用zoom:1触发hasLayout.

#### 选择器
##### 组合选择的器
| Combinators | Select |
| --- | --- |
| A(/,)B | 匹配满足A（且/或）B的任意元素。紧挨着无缝隙为且，逗号隔开为或 |
| A B | 匹配任意元素，满足条件：B是A的后代结点（B是A的子节点，或者A的子节点的子节点） |
| A > B | 匹配任意元素，满足条件：B是A的直接子节点 |
| A + B | 匹配任意元素，满足条件：B是A的下一个兄弟节点（AB有相同的父结点，并且B紧跟在A的后面） |
| A ~ B | 匹配任意元素，满足条件：B是A之后的兄弟节点中的任意一个（AB有相同的父节点，B在A之后，但不一定是紧挨着A） |

> 注：相邻兄弟选择器和通用兄弟选择器只会“向后”选择，DOM结构靠前的兄弟元素不在选择范围内。


##### 存在和值（Presence and value）属性选择器

这些属性选择器尝试匹配精确的属性值：

*   [attr]：该选择器选择包含 attr 属性的所有元素，不论 attr 的值为何。
*   [attr=val]：该选择器仅选择 attr 属性被赋值为 val 的所有元素。
*   [attr~=val]：该选择器仅选择 attr 属性的值（以空格间隔出多个值）中有包含 val 值的所有元素，比如位于被空格分隔的多个类（class）中的一个类。

##### 子串值（Substring value）属性选择器
*   [attr|=val] : 选择attr属性的值以val（包括val）或val-开头的元素（-用来处理语言编码）。
*   [attr^=val] : 选择attr属性的值以val开头（包括val）的元素。
*   [attr$=val] : 选择attr属性的值以val结尾（包括val）的元素。
*   [attr*=val] : 选择attr属性的值中包含字符串val的元素。

##### 伪类和伪元素

###### 伪类（Pseudo-class）
**动态伪类选择器 5 个**
:link 选择地址**没有被访问过**的超链接元素
:visited 选择地址**被访问过**的超链接元素
:active 选择即将**点击或按压**的元素(被激活的元素)
:focus 选择获取**焦点**的元素
:hover 选择鼠标**悬停**在上面的元素

**UI元素伪类选择器**
:enabled 选择可以使用的表单控件（没有设置disabled属性）
:disabled 选择不可以使用的表单控件（设置了disabled属性）
:checked 选择到被选中的单选按钮、复选框、下拉选项（option）
:default 选择默认元素
:valid 根据输入验证 选择**有效的**表单元素
:invalid 根据输入验证 选择**无效的**表单元素
:in-range 选择**指定范围之内**受限的input元素
:out-of-range 选择**指定范围之外**受限的input元素
:required 选择**必须填的**，有required属性选择input元素
:optional 选择**可选的**，无required属性选择input元素

**结构伪类选择器 12个**
> n 可以是整数、关键字（even，odd）、公式（2n+1）

:root 选择到根元素
:empty 选择既不能有文本内容也没有后代元素的元素

:first-child 所有子元素中的第一个
:last-child 所有子元素中的最后一个
:nth-child(n) 所有子元素中的第n个，n是个数字
:nth-last-child(n) 所有子元素中的倒数第n个，n是个数字
:only-child 选择元素的唯一子元素

:first-of-type 所有子元素中同类型的第一个
:last-of-type 所有子元素中同类型的最后一个
:nth-last-of-type(n) 所有子元素中同类型的倒数第n个，n是个数字
:nth-of-type(n) 所有子元素中同类型的第n个，n是个数字
:only-of-type 选择元素唯一类型的子元素
**否定伪类选择器**
:not(选择器) **排除**满足小括号中选择器的元素，not括号中的选择器可以是：1.标签选择器，2.类选择器，3.ID选择器，4.伪类选择器，5.属性选择器，6.通用选择器。但是不能是伪元素选择器。
```
a:not([herf*='apress']){ border: thin black solid; }
// [herf*='apress']这个是属性选择器
<a herf='http://apress.com'>Visis the Apress web</a>
```
**目标伪类选择器**
:target 选择当前**锚点指向**的元素
**语言伪类选择器**
:lang(属性值) 根据语言选择元素(lang 属性值)；
比如:`<p lang='b'>test</p>; p:lang(b){ color: #ff0000 }`

###### 伪元素（使用::是CSS3的语法，之前的CSS1、CSS2使用的是:，CSS3兼容:写法）

::after 给元素之后动态创建一个元素, 通常用 content 配合使用
::before 给元素之前动态创建一个元素, 通常用 content 配合使用
::first-letter 选择元素中第一个字母
::first-line 选择元素中第一行
::selection 用于设置**被鼠标选中的文字**样式
::placeholder 用于设置**输入框或文本域中placeholder属性**设置的文字的样式

**【重点】权重记忆口诀**：*从0开始，一个行内样式+1000，一个id选择器+100，一个属性选择器、class或者伪类+10，一个元素选择器，或者伪元素+1，通配符+0。***!important(提升样式优先级)**
>css权重值记忆图
![css权重值记忆图](https://upload-images.jianshu.io/upload_images/2323089-568b555e715eb570.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3.【重点】定位
>1.默认值 staic 设置坐标无效。
2.绝对定位 absolute 脱离文档流不占位置，默认参考html零点（浏览器零点）；如果有父级，且父级有定位，那就参考父级元素。
3.相对定位 relative 占据文档流不占位置；参考自身加载在页面中的位置。
4.固定定位 fixed 脱离文档流不占位置；元素固定在页面中，不会随着页面滚动而移动；参考浏览器零点。
5.粘性定位 sticky 页面达到一定高度时，脱离文档流；效果是吸附浏览器顶部。

#### 4.【重点】圣杯和双飞翼布局两者本质
```
<div class='middle'></div>
<div class='left'></div>
<div class='right'></div>
```
**通俗的来说就是左右两栏固定宽度，中间部分自适应的三栏布局。**
![image.png](https://upload-images.jianshu.io/upload_images/2323089-a27c3d33ed0351db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**布局相同之处**
1.  首先把left、middle、right都放出来，给它们三个设置上 **float: left** , 脱离文档流；
2.  一定记得给container设置上overflow: hidden; 可以形成BFC撑开文档
3.  left、right设置上各自的宽度，middle设置**width: 100%**;
4.  left设置 **margin-left: -100%;** right设置 **margn-left: -rightWidth;**

**接下来比较重要了：**

**圣杯布局 相对定位+padding**

5. container设置padding: 0, rightWidth, 0, leftWidth;
6. 给left、middle、right设置position: relative;
7. left设置 left: -leftWidth, right设置 right: -rightWidth;

**双飞翼布局 inner+margin**
双飞翼布局和圣杯布局很类似，不过是在middle的div里又插入一个div，通过调整内部div的margin值，实现中间栏自适应，内容写到内部div中。

**与圣杯布局不一样的地方：**

5. middle中增加inner
6. inner设置margin: 0, rightWidth, 0, leftWidth;

双飞翼布局省去了很多css，而且由于不用使用定位，可以获得比圣杯布局更小最小宽度；由于双飞翼布局会一直随着浏览器可视区域宽度减小从而不断挤压中间部分宽度。

所以需要设置给页面一个min-width > LeftWidth + RightWidth；

* * *

还有一件事就是他们在单独部分内容扩充的时候，童鞋们可能发现了 底部会参差不齐。

最简单的解决办法 / 笑哭
> 给left、middle、right设置上 padding-bottom: 9999px; margin-bottom: -9999px;

就让他变得无限高，但是又给他送回去了。
#### CSS3新特性
##### calc()函数动态计算长度值
**注意**：运算符前后都要保留一个空格
```
#div1 {
    width: calc(100% - 10px);
}
```
##### 【重点】过渡 transition 4个参数
```
transition： 1-CSS属性，2-花费时间，3-效果曲线(默认ease)，4-延迟时间(默认0)

/*所有属性从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒*/
transition：all,.5s
```
上面栗子是简写模式，也可以分开写各个属性（这个在下面就不再重复了）
```
transition-property: width;
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;
```

##### 形状转换 transform
```
transform:适用于2D或3D转换的元素
    2D：旋转-rotate(30deg)、位移-translate(30px,30px)、缩放倍数-scale(.8)、倾斜角度-skew(10deg,10deg)。
    3D过渡效果：x轴旋转-rotateX(180deg)，y-轴旋转rotateY(180deg)、某坐标旋转-rotate3d(10,10,10,90deg)。

transform-origin：转换元素的位置（围绕那个点进行转换）。默认(x,y,z)：(50%,50%,0)
```

transform:rotate(30deg);
![](https://upload-images.jianshu.io/upload_images/2323089-30e4aaefe7fa8a91.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


transform:translate(30px,30px);
![](https://upload-images.jianshu.io/upload_images/2323089-4b9dc2877b176855.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


transform:scale(.8);
![](https://upload-images.jianshu.io/upload_images/2323089-4c8644304f4ad7a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


transform: skew(10deg,10deg);
![](https://upload-images.jianshu.io/upload_images/2323089-0b429db31cd8515e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


transform:rotateX(180deg);
![](https://upload-images.jianshu.io/upload_images/2323089-304084f2964127a7.gif?imageMogr2/auto-orient/strip)


transform:rotateY(180deg);
![](https://upload-images.jianshu.io/upload_images/2323089-87a67bb6e44b1d98.gif?imageMogr2/auto-orient/strip)

transform:rotate3d(10,10,10,90deg);
![](https://upload-images.jianshu.io/upload_images/2323089-df4214fca8e3cead.gif?imageMogr2/auto-orient/strip)


##### 动画 animation

```
animation：1-动画名称，2-一个周期花费时间，运动曲线（默认ease），
3-动画延迟（默认0），4-播放次数（默认1），5-是否反向播放动画（默认normal），
6-是否暂停动画（默认running）


div{
    animation: foo 3s liner 1s;
}
@keyframes foo {
    from {...} to {...}// 或者
    0% {...} 10%,20% {...} 100% {...}// 或
    0% {...} 50% {...}
}

```
css3提供的选择器。
![](https://upload-images.jianshu.io/upload_images/2323089-273e379f02ce6eec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 阴影 box-shadow
```
box-shadow: 1-水平阴影的位置 2-垂直阴影的位置 3-模糊距离 4-阴影的大小 5-阴影的颜色 6-阴影开始方向（默认是从里往外，设置inset就是从外往里）;
```
box-shadow: 10px 10px 5px #888888;
##### 边框
```
// 1-边框图片
border-image: 1-图片url 2-图像边界向内偏移 3-图像边界的宽度(默认为边框的宽度) 4-用于指定在边框外部绘制偏移的量（默认0） 5-铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;

.demo {
    border: 15px solid transparent;
    padding: 15px;   
    border-image: url(border.png);
    border-image-slice: 30;// 图像边界向内偏移
    border-image-repeat: round;// 铺满方式-铺满（round）
    border-image-outset: 0;// 用于指定在边框外部绘制偏移的量
}
```

```
// 2-边框圆角
border-radius: n1,n2,n3,n4;
border-radius: n1,n2,n3,n4/n1,n2,n3,n4;
/*n1-n4四个值的顺序是：左上角，右上角，右下角，左下角。*/
```
##### 背景
这一块主要讲css3提供背景的三个属性
###### background-clip 制定背景绘制（显示）区域
1.默认情况（从边框开始绘制）`border-box`
2.从padding开始绘制（显示），不算border,，相当于把border那里的背景给裁剪掉！（`background-clip: padding-box;`）
3.只在内容区绘制（显示），不算padding和border，相当于把padding和border那里的背景给裁剪掉！（`background-clip: content-box;`）
###### background-origin

引用菜鸟教程的说法：background-origin属性指定background-position属性应该是相对位置
```
div
{
    border:10px dashed black;
    padding:35px;
    background:url('logo.png') no-repeat,#ccc;
    background-position:0px 0px;
}
```

下面看下，background-origin不同的三种情况
![](https://upload-images.jianshu.io/upload_images/2323089-534364e9123705a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###### background-size

这个相信很好理解，就是制定背景的大小
```
div
{
    border:1px dashed black;
    padding:35px;
    background:url('test.jpg') no-repeat;
}
```
![](https://upload-images.jianshu.io/upload_images/2323089-bd85ac58c53ca59d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 多张背景图

这个没什么，就是在一张图片，使用多张背景图片，代码如下！
```
div
{
    border:1px dashed black;
    padding:35px;
    background-size: contain;
    background:url('test.jpg') no-repeat left,url(logo.png) no-repeat right;
}
```
![](https://upload-images.jianshu.io/upload_images/2323089-7c1800335f90270f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 反射
这个也可以说是倒影，用起来也挺有趣的。
```
-webkit-box-reflect:1-方向[ above-上 | below-下 | right-右 | left-左 ]，2-偏移量，3-遮罩图片

-webkit-box-reflect: below;// 下倒影

-webkit-box-reflect: right 10px;// 右倒影（有偏移）

-webkit-box-reflect: below 0 linear-gradient(transparent, white);// 下倒影（渐变）

-webkit-box-reflect: below 0 url(shou.png);// 下倒影（图片遮罩）
```
##### 文字
###### 换行

语法：`word-break: normal|break-all|keep-all;`
栗子和运行效果
![](https://upload-images.jianshu.io/upload_images/2323089-f682abc3a72cf689.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

语法：`word-wrap: normal|break-word;`
栗子和运行效果
![](https://upload-images.jianshu.io/upload_images/2323089-33a7d9721081aea5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


超出省略号这个，主要讲`text-overflow`这个属性，我直接讲实例的原因是`text-overflow`的三个写法，`clip|ellipsis|string`。`clip`这个方式处理不美观，不优雅。`string`只在火狐兼容。
![](https://upload-images.jianshu.io/upload_images/2323089-9ea8a8558ffaf88b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###### 超出省略号
这个其实有三行代码，禁止换行，超出隐藏，超出省略号
```
div
{
    width:200px; 
    border:1px solid #000000;
    overflow:hidden;// 超出隐藏
    white-space:nowrap; // 禁止换行
    text-overflow:ellipsis;// 超出省略号
}
```

运行结果
![](https://upload-images.jianshu.io/upload_images/2323089-956c7150a690bed4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


###### 多行超出省略号

超出省略号。这个对于大家来说，不难！但是以前如果是多行超出省略号，就只能用js模拟！现在css3提供了多行省略号的方法！遗憾就是这个暂时只支持webkit浏览器！

代码如下
```
div{
    width:400px;
    margin:0 auto;
    overflow : hidden;// 
    border:1px solid #ccc;
    text-overflow: ellipsis;// 
    display: -webkit-box;// 
    -webkit-line-clamp: 2;// 
    -webkit-box-orient: vertical;// 
}
```

效果图
![](https://upload-images.jianshu.io/upload_images/2323089-237ddab363b9b3e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


这样发现边框贴着难看，要撑开一点，但是撑开上下边框不要使用padding!因为会出现下面这个效果。
![](https://upload-images.jianshu.io/upload_images/2323089-589b0765384af917.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


正确姿势是这样写
```
<style> div
{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    padding:0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
    // 撑开一点
    line-height:30px;
    height:60px;
} </style>
```

运行结果
![](https://upload-images.jianshu.io/upload_images/2323089-ce97c113cd30e8c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


这样写，就算在不是webkit内核的浏览器，也可以优雅降级（高度=行高*行数（webkit-line-clamp））！
![](https://upload-images.jianshu.io/upload_images/2323089-697123d002efd601.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


###### 文字阴影
语法：text-shadow:1-水平阴影，2-垂直阴影，3-模糊的距离，4-阴影的颜色。
栗子：`text-shadow: 0 0 10px #f00;`
效果
![](https://upload-images.jianshu.io/upload_images/2323089-74da39445cd5f984.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 颜色
这个其实就是css3提供了新的颜色表示方法。
###### rgba
一个是rgba（rgb为颜色值，a为透明度）
```
color: rgba(255,00,00,1);
background: rgba(00,00,00,.5);
```
![](https://upload-images.jianshu.io/upload_images/2323089-5fb57296bfeca619.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###### hsla

h:色相，s：饱和度，l：亮度，a：透明度
这里简单给一个例子
```
color: hsla( 112, 72%, 33%, 0.68);
background-color: hsla( 49, 65%, 60%, 0.68);
```
![](https://upload-images.jianshu.io/upload_images/2323089-a6f5071c0920296a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 渐变
[CSS3 Gradient](https://link.segmentfault.com/?enc=zhus3%2BE25DJmCwB2zJx6Eg%3D%3D.J4gAFJy55r5xwHkkQWWFcDbw14n3EKwNPMFaOmcz1KXobcLqQiK78gEWEYtWmkMl)
[再说CSS3渐变——线性渐变](https://link.segmentfault.com/?enc=Bt1JB43dVnIG%2FN78gDVFBw%3D%3D.JY5j25YyXK0vMoRmTL66fzWDtiBsVLIsmzeIQX%2Bns2A4N9ETiHK%2FWX%2FhOo3Y28wnsdqfNiZ4lrDHoA79AW6Bgw%3D%3D)
[再说CSS3渐变——径向渐变](https://link.segmentfault.com/?enc=QxaYflRIX%2Fsoh%2FxCTyYC3A%3D%3D.2PJQAgULcbP5CtAzfM7%2FPn9AJUy84XMZ7YAIDvlORLBdnxy2998emHB%2BIapH5zl7jpZUGUEGUFgwS9OrQcz9Ag%3D%3D)
[神奇的 conic-gradient 圆锥渐变](https://link.segmentfault.com/?enc=GM8aDn70ZhsDJF53l0Ux3w%3D%3D.XPxRZqz1Q3BWua3S7uV6FTw5wm8vWJZFGc8hrCay%2BJciLM12ObZVD9y9ubkokyMV)（这篇就是看我看到圆锥渐变的文章）
##### Filter（滤镜）

css3的滤镜也是一个亮点，功能强大，写法也灵活。

栗子代码如下
```
<p>原图</p>
<img src="test.jpg" />

<p>黑白色filter: grayscale(100%)</p>
<img src="test.jpg" style="filter: grayscale(100%);"/>

<p>褐色filter:sepia(1)</p>
<img src="test.jpg" style="filter:sepia(1);"/>

<p>饱和度saturate(2)</p>
<img src="test.jpg" style="filter:saturate(2);"/>

<p>色相旋转hue-rotate(90deg)</p>
<img src="test.jpg" style="filter:hue-rotate(90deg);"/>

<p>反色filter:invert(1)</p>
<img src="test.jpg" style="filter:invert(1);"/>

<p>透明度opacity(.5)</p>
<img src="test.jpg" style="filter:opacity(.5);"/>

<p>亮度brightness(.5)</p>
<img src="test.jpg" style="filter:brightness(.5);"/>

<p>对比度contrast(2)</p>
<img src="test.jpg" style="filter:contrast(2);"/>

<p>模糊blur(3px)</p>
<img src="test.jpg" style="filter:blur(3px);"/>

<p>阴影drop-shadow(5px 5px 5px #000)</p>
<img src="test.jpg" style="filter:drop-shadow(5px 5px 5px #000);"/>
```


##### 14.弹性布局

这里说的弹性布局，就是flex
[Flex 布局教程：语法篇](https://link.segmentfault.com/?enc=gn%2FcEGD1Pgk2%2Fw%2FVqgxvNA%3D%3D.0orR7%2Bn4Dc9AkpTiAsQSkmWFEiC2QFe3h2V2tTrb%2BgMZ71kioCOjkpbjIzu2hp2gMI5TqkYcM%2Bx2mMPkHTD7dQ%3D%3D)
[Flex 布局教程：实例篇](https://link.segmentfault.com/?enc=Kd8nbrwhic3I09wwupchUA%3D%3D.RkNCq5T1l9G%2FGlfOp1YL6bE78fRAB%2BghuUYPIat2%2F5rqx5m33lq5snc3UPtLVZgjRkVwRSAGUrBuJCzKiO5kMg%3D%3D)

##### 15.栅格布局

栅格化布局，就是grid；这一块和flex一样

[Grid布局指南](https://link.segmentfault.com/?enc=UrUDXxhSWRZa%2FQ%2F5DSn%2BGA%3D%3D.nwnMzcdN1MZnLiL5EGuy7nPgyUPlIuXlLcIMSsrMefdazs0C1%2BkX5LYkXQIHzhmq)

##### 16.多列布局

这一块，我也是了解过，我觉得多列应该还是挺有用的。下面我简单说下！举个例子！这个属性，建议加私有前缀，兼容性有待提高！
html
```
<div class="newspaper">
当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。
</div>
```

css
```
.newspaper
{
    column-count: 3;
    -webkit-column-count: 3;
    -moz-column-count: 3;
    
    column-rule:2px solid #000;
    -webkit-column-rule:2px solid #000;
    -mox-column-rule:2px solid #000;
}
```
![](https://upload-images.jianshu.io/upload_images/2323089-049688e2deaa7d81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 17.盒模型定义

box-sizing这个属性，网上说法是：属性允许您以特定的方式定义匹配某个区域的特定元素。

这个大家看着可能不知道在说什么，简单粗暴的理解就是：box-sizing:border-box的时候，边框和padding包含在元素的宽高之内！如下图
![](https://upload-images.jianshu.io/upload_images/2323089-adf89a81d46aac6f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


box-sizing:content-box的时候，边框和padding不包含在元素的宽高之内！如下图
![](https://upload-images.jianshu.io/upload_images/2323089-51d741744534fadc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 18.媒体查询

媒体查询，就在监听屏幕尺寸的变化，在不同尺寸的时候显示不同的样式！在做响应式的网站里面，是必不可少的一环！不过由于我最近的项目都是使用rem布局。所以媒体查询就没怎么用了！但是，媒体查询，还是很值得一看的！说不定哪一天就需要用上了！

栗子代码如下
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title></title> 
<style> body {
    background-color: pink;
}
@media screen and (max-width: 960px) {
    body {
        background-color: darkgoldenrod;
    }
}
@media screen and (max-width: 480px) {
    body {
        background-color: lightgreen;
    }
} </style>
</head>
<body>

<h1>重置浏览器窗口查看效果！</h1>
<p>如果媒体类型屏幕的可视窗口宽度小于 960 px ，背景颜色将改变。</p>
<p>如果媒体类型屏幕的可视窗口宽度小于 480 px ，背景颜色将改变。</p>

</body>
</html>
```

运行效果
![](https://upload-images.jianshu.io/upload_images/2323089-f44c006111d35fda.gif?imageMogr2/auto-orient/strip)


##### 19.混合模式
###### background-blend-mode
>multiply正片叠底、screen滤色、overlay叠加、darken变暗、lighten变亮、color-dodge颜色减淡模式、color-burn颜色加深、hard-light强光、soft-light柔光、difference差值、exclusion排除、hue色相、saturation饱和度、color颜色、luminosity亮度
```
    <p>原图</p>
    <div></div>
    
    <p>multiply正片叠底</p>
    <div style="background-blend-mode: multiply;"></div>
```
###### mix-blend-mode
>multiply正片叠底、screen滤色、overlay叠加、darken变暗、lighten变亮、color-dodge颜色减淡模式、color-burn颜色加深、hard-light强光、soft-light柔光、difference差值、exclusion排除、hue色相、saturation饱和度、color颜色、luminosity亮度
```
<style>
    div{
        padding: 20px;
        width: 480px;
        background: #09f;
    }
</style>
<body>
    <p>原图</p>
    <div><img src="test.jpg"/></div>
    
    <p>multiply正片叠底</p>
    <div><img src="test.jpg" style="mix-blend-mode: multiply;"/></div>
```
#### div居中的几种方法
##### 1. flex 布局实现 （元素已知宽度）
```
.box {            
    display: flex;            
    display: -webkit-flex;            
    justify-content: center;// 
    align-items: center;//
} 
```
##### 2. position （元素已知宽度）
父元素设置为：position: relative;
子元素设置为：position: absolute; left:50%; right50%;
然后margin 上、左减去元素自身宽度的一半距离就可以实现
```
.box{                      
    position: relative;        
}        
.box .a{            
    width: 100px;            
    height: 100px;            
    position: absolute;            
    left: 50%;            
    top: 50%;            
    margin: -50px 0 0 -50px;        
}    
```
##### 3. position transform （元素未知宽度）
如果元素未知宽度，只需将上面例子中的` margin: -50px 0 0 -50px;`替换为：**`transform: translate(-50%,-50%);`**

```
.box{            
    position: relative;        
}        
.box .a{            
    position: absolute;            
    top: 50%;            
    left: 50%;            
    transform: translate(-50%, -50%);        
}
```
##### 4. position（元素已知宽度）（left，right，top，bottom为0，maigin：auto ）

```
CSS 代码：
<style>        
.box{            
    width: 300px;            
    height: 300px;           
    background-color: red;            
    position: relative;        
}        
.box .a{            
    width: 100px;            
    height: 100px;
           
    position: absolute;            
    top: 0;            
    bottom: 0;            
    left: 0;            
    right: 0;            
    margin: auto;        
}
```

##### 使内容（文字，图片）水平垂直居中（table-cell 布局）

行元素 text-align ：center；

块元素 ：margin ：0 auto；

```
text-align : center  给元素的父级加，可以使文本或者行级元素(例如：图片)水平居中
line-height : 值为元素的高度，可以使元素的文本内容垂直居中
margin: 0 auto 使用条件：父级元素宽度可有可无，子级元素必须使块元素，而且要有宽度（否则继承父级）
```



### Sass和less
#### 1. 使用变量（Variables）
less 变量**用@定义**，sass变量**用$定义**
无需多说，看代码一目了然：
```
// sass变量
$nav-color: #F90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}

// less变量
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
 
编译为：
#header {
  width: 10px;
  height: 20px;
}
nav {
  width: 100px;
  color: #F90;
}
```
sass中变量命名使用`-`和`_`没有区别，即`$btn-left = $btn_left`,它俩是同一个变量
#### 2.混合器（Mixins）
less混合使用**选择器+();** 如：.bordered();
sass混合**使用@mixin定义，通过@include使用**
sass混合器可以传参数：
`@mixin link-colors($normal, $hover, $visited){ ... }` 
`@include link-colors(blue, red, green);`
默认参数
`@mixin link-colors($normal, $hover: $normal, $visited: $normal){ ... }`
```
// less混合器
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  .bordered();// less使用混合器
}
// sass混合器
@mixin bordered {// sass定义混合器
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  @include bordered;// sass使用混合器
}
```
#### 3.嵌套（Nesting）
less和sass几乎相同，**父选择器的标识符&;**
```
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```
**sass中属性嵌套** 如：`font-size:14px; font-color: red `可以写成 
```
.btn{
    font { 
        size: 14px; 
        color: red;
    }
}
```
**less中@规则嵌套和冒泡**
@ 规则（例如 @media 或 @supports）可以与选择器以相同的方式进行嵌套。@ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）。
```
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}

编译为：

.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```
#### 4.导入样式文件
less和sass都是**用 @import + 文件名** 导入。
sass文件中**局部样式文件用_开头命名**，导入时可以不加下划线

#### 5.sass使用选择器继承来精简CSS
这个通过@extend语法实现，如下代码:
```
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
#### 6. less专用
##### 6.1 运算（Operations）
算术运算符在加、减或比较之前**先进行单位换算**。计算的结果**以最左侧操作数的单位**类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。
```
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
```
乘法和除法不作转换。Less 将按数字的原样进行操作，并将为计算结果指定明确的单位类型。
`@base: 2cm * 3mm; // 结果是 6cm`
你还可以对颜色进行算术运算：
```
@color: #224488 / 2; //结果是 #112244
background-color: #112244 + #111; // 结果是 #223355
```
##### 6.2 转义（Escaping）
转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 ~"anything" 或 ~'anything' 形式的内容都将按原样输出，除非 interpolation。
```
@min768: ~"(min-width: 768px)";

.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
编译为：

@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
// 注意，从 Less 3.5 开始，可以简写为：
@min768: (min-width: 768px);

// 在 Less 3.5+ 版本中，许多以前需要“引号转义”的情况就不再需要了。
```
##### 6.3 函数（Functions）
Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在Less 函数手册中有详细介绍。

函数的用法非常简单。下面这个例子将介绍如何利用 percentage 函数将 0.5 转换为 50%，将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：
```
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```
参见：[函数手册](https://less.bootcss.com/functions/)

##### 6.4 命名空间和访问符
有时，出于组织结构或仅仅是为了提供一些封装的目的，你希望对混合（mixins）进行分组。你可以用 Less 更直观地实现这一需求。假设你希望将一些混合（mixins）和变量置于 #bundle 之下，为了以后方便重用或分发：
```
#bundle() {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab { ... }
  .citation { ... }
}
```
现在，如果我们希望把 .button 类混合到 #header a 中，我们可以这样做：
```
#header a {
  color: orange;
  #bundle.button();  // 还可以书写为 #bundle > .button 形式
}
```
注意：如果不希望它们出现在输出的 CSS 中，例如 #bundle .tab，请将 () 附加到命名空间（例如 #bundle()）后面。

##### 6.5 映射（Maps）
从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用。
```
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
输出符合预期：

.button {
  color: blue;
  border: 1px solid green;
}
```
参见： [映射（Maps）](https://less.bootcss.com/features/#maps-feature)

##### 6.6 作用域（Scope）
Less 中的作用域与 CSS 中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。
```
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
// 与 CSS 自定义属性一样，混合（mixin）和变量的定义不必在引用之前事先定义。
因此，下面的 Less 代码示例和上面的代码示例是相同的：

@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

#### Canvas画图
